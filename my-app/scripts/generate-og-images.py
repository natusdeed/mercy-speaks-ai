"""
Generate 1200x630 Open Graph share images for Mercy Speaks Digital.
Run: py scripts/generate-og-images.py
Outputs: public/og-default.png and public/og/*.png
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT_DIR = PUBLIC / "og"
W, H = 1200, 630
BG = (2, 6, 23)  # #020617
CYAN = (6, 182, 212)  # #06b6d4
PURPLE = (139, 92, 246)  # #8b5cf6
TEXT = (241, 245, 249)  # slate-100
MUTED = (148, 163, 184)  # slate-400
FONT_REG = Path(r"C:\Windows\Fonts\segoeui.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")

PAGES: list[tuple[str, str, str]] = [
    # filename (without .png), eyebrow, headline
    ("home", "Mercy Speaks Digital", "AI receptionists, websites &\nautomation for small business"),
    ("pricing", "Transparent pricing", "Plans that capture leads\nand book appointments"),
    ("ai-phone-receptionist", "AI Phone Receptionist", "Never miss a call —\nanswers 24/7"),
    ("website-design", "Website Design", "Premium sites that\nconvert visitors"),
    ("voice-agents", "Voice Agents", "Natural voice AI that\nhandles real conversations"),
    ("about", "About us", "Houston-area web &\nAI automation agency"),
    ("contact", "Get in touch", "Talk with us about\nyour next install"),
]


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(str(path), size)
    except OSError:
        return ImageFont.load_default()


def radial_glow(size: tuple[int, int], color: tuple[int, int, int], center: tuple[float, float], radius: float, opacity: float) -> Image.Image:
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    px = layer.load()
    cx, cy = center
    r, g, b = color
    max_a = int(255 * opacity)
    for y in range(size[1]):
        for x in range(size[0]):
            d = math.hypot(x - cx, y - cy) / radius
            if d >= 1:
                continue
            a = int(max_a * (1 - d) ** 2)
            if a > 0:
                px[x, y] = (r, g, b, a)
    return layer.filter(ImageFilter.GaussianBlur(48))


def load_mark(size: int = 96) -> Image.Image:
    """Prefer circular avatar; fall back to favicon."""
    for candidate in (
        PUBLIC / "images" / "Mercy-avatar.png",
        PUBLIC / "favicon-512x512.png",
        PUBLIC / "icon.png",
    ):
        if candidate.exists():
            img = Image.open(candidate).convert("RGBA")
            img = img.resize((size, size), Image.Resampling.LANCZOS)
            # Circular mask for square marks
            mask = Image.new("L", (size, size), 0)
            ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
            out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
            out.paste(img, (0, 0), mask)
            # Thin cyan ring
            ring = Image.new("RGBA", (size, size), (0, 0, 0, 0))
            ImageDraw.Draw(ring).ellipse((1, 1, size - 2, size - 2), outline=(*CYAN, 200), width=3)
            out = Image.alpha_composite(out, ring)
            return out
    # Fallback: cyan/purple disc with initial
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    d.ellipse((0, 0, size - 1, size - 1), fill=(*CYAN, 40), outline=(*CYAN, 220), width=3)
    font = load_font(FONT_BOLD, int(size * 0.45))
    d.text((size // 2, size // 2), "M", fill=TEXT + (255,), font=font, anchor="mm")
    return out


def wrap_lines(text: str) -> list[str]:
    return [line.strip() for line in text.split("\n") if line.strip()]


def render_card(eyebrow: str, headline: str) -> Image.Image:
    base = Image.new("RGB", (W, H), BG)
    canvas = base.convert("RGBA")

    # Atmospheric glows (downsampled for speed, then upscaled blur)
    glow_size = (W // 2, H // 2)
    cyan_glow = radial_glow(glow_size, CYAN, (glow_size[0] * 0.28, glow_size[1] * 0.35), glow_size[0] * 0.55, 0.45)
    purple_glow = radial_glow(glow_size, PURPLE, (glow_size[0] * 0.78, glow_size[1] * 0.72), glow_size[0] * 0.6, 0.4)
    cyan_glow = cyan_glow.resize((W, H), Image.Resampling.BILINEAR)
    purple_glow = purple_glow.resize((W, H), Image.Resampling.BILINEAR)
    canvas = Image.alpha_composite(canvas, cyan_glow)
    canvas = Image.alpha_composite(canvas, purple_glow)

    draw = ImageDraw.Draw(canvas)

    # Soft border frame
    inset = 28
    draw.rounded_rectangle(
        (inset, inset, W - inset, H - inset),
        radius=28,
        outline=(*CYAN, 55),
        width=2,
    )

    # Brand row
    mark = load_mark(88)
    pad_x, pad_y = 72, 72
    canvas.paste(mark, (pad_x, pad_y), mark)

    brand_font = load_font(FONT_BOLD, 36)
    draw.text((pad_x + 108, pad_y + 22), "Mercy Speaks Digital", fill=TEXT + (255,), font=brand_font)

    # Eyebrow
    eye_font = load_font(FONT_REG, 28)
    draw.text((pad_x, 210), eyebrow.upper(), fill=(*CYAN, 255), font=eye_font)

    # Accent line under eyebrow
    draw.rounded_rectangle((pad_x, 252, pad_x + 72, 258), radius=3, fill=(*PURPLE, 220))

    # Headline
    head_font = load_font(FONT_BOLD, 58)
    y = 280
    for line in wrap_lines(headline):
        draw.text((pad_x, y), line, fill=TEXT + (255,), font=head_font)
        y += 72

    # Footer tagline
    foot_font = load_font(FONT_REG, 24)
    draw.text(
        (pad_x, H - 88),
        "mercyspeaksdigital.com",
        fill=MUTED + (255,),
        font=foot_font,
    )

    return canvas.convert("RGB")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    default = render_card("Mercy Speaks Digital", "AI receptionists, websites &\nautomation for small business")
    default_path = PUBLIC / "og-default.png"
    default.save(default_path, "PNG", optimize=True)
    print(f"Wrote {default_path.relative_to(ROOT)} ({default.size[0]}x{default.size[1]})")

    for slug, eyebrow, headline in PAGES:
        img = render_card(eyebrow, headline)
        path = OUT_DIR / f"{slug}.png"
        img.save(path, "PNG", optimize=True)
        print(f"Wrote {path.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
