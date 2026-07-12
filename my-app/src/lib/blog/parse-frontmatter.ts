/**
 * Minimal YAML-ish frontmatter parser for blog posts.
 * Supports: strings, booleans, numbers, and simple string arrays.
 */

export type FrontmatterValue = string | number | boolean | string[];

export type ParsedMarkdownFile = {
  data: Record<string, FrontmatterValue>;
  content: string;
};

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(raw: string): FrontmatterValue {
  const value = stripQuotes(raw);
  if (value === "true") return true;
  if (value === "false") return false;
  if (value !== "" && !Number.isNaN(Number(value)) && /^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  return value;
}

/**
 * Parse `---` frontmatter at the top of a markdown file.
 */
export function parseFrontmatter(source: string): ParsedMarkdownFile {
  const normalized = source.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---")) {
    return { data: {}, content: normalized.trimStart() };
  }

  const end = normalized.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: normalized.trimStart() };
  }

  const rawMatter = normalized.slice(3, end).replace(/^\r?\n/, "");
  const content = normalized.slice(end + 4).replace(/^\r?\n/, "");
  const data: Record<string, FrontmatterValue> = {};

  const lines = rawMatter.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }

    const match = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (!match) {
      i += 1;
      continue;
    }

    const key = match[1];
    const rest = match[2].trim();

    if (rest === "" || rest === "[]") {
      // Inline empty array or start of block list
      const items: string[] = [];
      if (rest === "[]") {
        data[key] = items;
        i += 1;
        continue;
      }
      i += 1;
      while (i < lines.length) {
        const listLine = lines[i];
        const listMatch = listLine.match(/^\s*-\s+(.*)$/);
        if (!listMatch) break;
        items.push(stripQuotes(listMatch[1]));
        i += 1;
      }
      data[key] = items;
      continue;
    }

    if (rest.startsWith("[") && rest.endsWith("]")) {
      const inner = rest.slice(1, -1).trim();
      data[key] = inner
        ? inner.split(",").map((part) => stripQuotes(part.trim())).filter(Boolean)
        : [];
      i += 1;
      continue;
    }

    data[key] = parseScalar(rest);
    i += 1;
  }

  return { data, content: content.trimStart() };
}
