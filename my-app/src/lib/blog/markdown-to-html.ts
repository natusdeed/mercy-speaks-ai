import type { BlogFaq, BlogHeading } from "@/lib/blog/types";

/** Slugify heading text for stable TOC / fragment ids. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=|{}\[\]\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = splitTableRow(line);
  if (cells.length === 0) return false;
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inline markdown: links, bold, italic, code, images. */
function renderInline(text: string): string {
  let s = escapeHtml(text);

  // Images ![alt](url)
  s = s.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, alt: string, url: string, title?: string) => {
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      return `<img src="${escapeHtml(url)}" alt="${alt}"${titleAttr} loading="lazy" />`;
    }
  );

  // Links [text](url)
  s = s.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, label: string, url: string, title?: string) => {
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      const external = /^https?:\/\//i.test(url);
      const rel = external ? ' rel="noopener noreferrer"' : "";
      const target = external ? ' target="_blank"' : "";
      return `<a href="${escapeHtml(url)}"${titleAttr}${target}${rel}>${label}</a>`;
    }
  );

  // Inline code
  s = s.replace(/`([^`]+)`/g, (_m, code: string) => `<code>${code}</code>`);

  // Bold **text** or __text__
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic *text* or _text_
  s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  s = s.replace(/(^|[^_])_([^_]+)_(?!_)/g, "$1<em>$2</em>");

  return s;
}

function uniqueHeadingId(base: string, used: Set<string>): string {
  let id = base || "section";
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

export type MarkdownRenderResult = {
  html: string;
  headings: BlogHeading[];
};

/**
 * Convert a constrained markdown subset to HTML.
 * Supports: headings, paragraphs, lists, blockquotes, code fences, hr, links,
 * emphasis, and GFM pipe tables. H2s get stable `id` attributes for TOC anchors.
 */
export function markdownToHtml(markdown: string): MarkdownRenderResult {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlParts: string[] = [];
  const headings: BlogHeading[] = [];
  const usedIds = new Set<string>();

  let i = 0;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    htmlParts.push(`<p>${renderInline(text)}</p>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      flushParagraph();
      const lang = line.slice(3).trim();
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // closing ```
      const langClass = lang ? ` class="language-${escapeHtml(lang)}"` : "";
      htmlParts.push(
        `<pre><code${langClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`
      );
      continue;
    }

    // GFM pipe table: header + separator + body rows
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      flushParagraph();
      const headers = splitTableRow(line);
      i += 2; // skip header + separator
      const bodyRows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        bodyRows.push(splitTableRow(lines[i]));
        i += 1;
      }
      const thead = `<thead><tr>${headers
        .map((cell) => `<th>${renderInline(cell)}</th>`)
        .join("")}</tr></thead>`;
      const tbody = `<tbody>${bodyRows
        .map(
          (row) =>
            `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`
        )
        .join("")}</tbody>`;
      htmlParts.push(
        `<div class="blog-table-wrap"><table>${thead}${tbody}</table></div>`
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushParagraph();
      htmlParts.push("<hr />");
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = uniqueHeadingId(slugifyHeading(text), usedIds);
      if (level === 2) {
        headings.push({ id, text });
      }
      htmlParts.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      htmlParts.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i += 1;
      }
      htmlParts.push(
        `<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      htmlParts.push(
        `<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`
      );
      continue;
    }

    // Blank line ends paragraph
    if (!line.trim()) {
      flushParagraph();
      i += 1;
      continue;
    }

    paragraph.push(line.trim());
    i += 1;
  }

  flushParagraph();

  return { html: htmlParts.join("\n"), headings };
}

/**
 * Pull Q&A pairs from a FAQ H2 section (H3 = question, following paragraphs = answer).
 * Used for FAQPage JSON-LD on blog posts.
 */
export function extractFaqsFromMarkdown(markdown: string): BlogFaq[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const faqs: BlogFaq[] = [];
  let inFaq = false;
  let currentQuestion: string | null = null;
  let answerParts: string[] = [];

  const flush = () => {
    if (!currentQuestion) return;
    const answer = answerParts.join(" ").replace(/\s+/g, " ").trim();
    if (answer) {
      faqs.push({ question: currentQuestion, answer });
    }
    currentQuestion = null;
    answerParts = [];
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flush();
      inFaq = /faq|frequently asked/i.test(h2[1]);
      continue;
    }

    if (!inFaq) continue;

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flush();
      currentQuestion = h3[1].trim();
      continue;
    }

    if (!currentQuestion) continue;
    if (/^#{1,4}\s+/.test(line)) {
      flush();
      inFaq = false;
      continue;
    }
    if (!line.trim()) continue;
    if (/^\s*[-*+]\s+/.test(line)) {
      answerParts.push(line.replace(/^\s*[-*+]\s+/, "").trim());
      continue;
    }
    answerParts.push(line.trim());
  }

  flush();
  return faqs;
}

/** Rough reading time from markdown body (≈200 wpm). */
export function estimateReadingTimeMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
