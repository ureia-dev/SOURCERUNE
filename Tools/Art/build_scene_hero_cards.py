#!/usr/bin/env python3
"""Build SOURCERUNE SCENE_PRESET_HERO cards as independent PNG files.

The photographic scene and deterministic UI card chrome are intentionally
separate. This tool never generates text inside AI artwork and never slices
runtime cards out of an atlas.

Examples:
  python Tools/Art/build_scene_hero_cards.py \
    --id SCN_049_Flat_TV_Living_Room \
    --name "Flat TV - Living Room" \
    --photo scene_master.png

Batch:
  python Tools/Art/build_scene_hero_cards.py \
    --manifest Assets/UI/scene_hero_049_074_manifest_v1.json \
    --photo-dir ArtMasters/SceneHero
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps


TARGETS = {
    "Shared": {
        "size": (226, 115),
        "header_h": 28,
        "number_w": 36,
        "font_px": 13,
        "number_px": 14,
        "photo_rect": (3, 29, 223, 113),
    },
    "UI_01": {
        "size": (384, 144),
        "header_h": 35,
        "number_w": 60,
        "font_px": 18,
        "number_px": 23,
        "photo_rect": (4, 36, 380, 143),
    },
    "UI_02": {
        "size": (512, 256),
        "header_h": 64,
        "number_w": 83,
        "font_px": 31,
        "number_px": 38,
        "photo_rect": (4, 65, 508, 255),
    },
}

PALETTE = {
    "header_top": (5, 18, 25, 255),
    "header_bottom": (7, 24, 32, 255),
    "outer": (7, 39, 53, 255),
    "inner": (20, 62, 79, 255),
    "divider": (15, 50, 65, 255),
    "text": (229, 237, 240, 255),
    "shadow": (0, 0, 0, 215),
}


def find_font(explicit: str | None = None) -> str:
    candidates = []
    if explicit:
        candidates.append(explicit)
    candidates += [
        "/usr/share/fonts/truetype/roboto/unhinted/RobotoCondensed-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf",
        r"C:\Windows\Fonts\arialnb.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
    ]
    for c in candidates:
        if c and Path(c).exists():
            return c
    raise FileNotFoundError(
        "No condensed bold font found. Pass --font with a local font path. "
        "Do not commit font binaries to this repository."
    )


def gradient(size: tuple[int, int], top: tuple[int, ...], bottom: tuple[int, ...]) -> Image.Image:
    w, h = size
    im = Image.new("RGBA", size)
    px = im.load()
    for y in range(h):
        t = y / max(1, h - 1)
        col = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(4))
        for x in range(w):
            px[x, y] = col
    return im


def fit_cover(src: Image.Image, size: tuple[int, int], focal_x: float = 0.5, focal_y: float = 0.5) -> Image.Image:
    """Cover-crop while keeping a normalized focal point in frame."""
    src = src.convert("RGB")
    tw, th = size
    scale = max(tw / src.width, th / src.height)
    rw, rh = max(1, round(src.width * scale)), max(1, round(src.height * scale))
    rs = src.resize((rw, rh), Image.Resampling.LANCZOS)

    max_x = max(0, rw - tw)
    max_y = max(0, rh - th)
    cx = min(1.0, max(0.0, focal_x)) * rw
    cy = min(1.0, max(0.0, focal_y)) * rh
    left = int(round(min(max(0, cx - tw / 2), max_x)))
    top = int(round(min(max(0, cy - th / 2), max_y)))
    return rs.crop((left, top, left + tw, top + th))


def fit_font(draw: ImageDraw.ImageDraw, text: str, font_path: str, start_px: int, max_width: int) -> ImageFont.FreeTypeFont:
    px = start_px
    while px >= 7:
        font = ImageFont.truetype(font_path, px)
        box = draw.textbbox((0, 0), text, font=font, stroke_width=0)
        if box[2] - box[0] <= max_width:
            return font
        px -= 1
    return ImageFont.truetype(font_path, 7)


def draw_text_with_shadow(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.FreeTypeFont) -> None:
    x, y = xy
    draw.text((x + 1, y + 2), text, font=font, fill=PALETTE["shadow"])
    draw.text((x, y), text, font=font, fill=PALETTE["text"])


def title_from_id(scene_id: str) -> int:
    try:
        return int(scene_id.split("_", 2)[1])
    except Exception as exc:
        raise ValueError(f"Scene ID must look like SCN_049_Name, got {scene_id!r}") from exc


def build_card(
    photo_path: Path,
    scene_id: str,
    name: str,
    target_name: str,
    out_path: Path,
    font_path: str,
    focal_x: float = 0.5,
    focal_y: float = 0.5,
) -> None:
    spec = TARGETS[target_name]
    w, h = spec["size"]
    header_h = spec["header_h"]
    number_w = spec["number_w"]
    photo_rect = spec["photo_rect"]
    number = title_from_id(scene_id)

    card = Image.new("RGBA", (w, h), (3, 10, 14, 255))
    hdr = gradient((w - 6, header_h - 4), PALETTE["header_top"], PALETTE["header_bottom"])
    card.alpha_composite(hdr, (3, 2))

    # Image region: independent crop for each target.
    x0, y0, x1, y1 = photo_rect
    scene = Image.open(photo_path).convert("RGB")
    scene = ImageEnhance.Contrast(scene).enhance(1.02)
    scene = ImageEnhance.Color(scene).enhance(0.92)
    fitted = fit_cover(scene, (x1 - x0, y1 - y0), focal_x, focal_y)
    card.paste(fitted, (x0, y0))

    d = ImageDraw.Draw(card)

    # Outer and inner cold-blue frame based on legacy SCENE cards.
    d.rounded_rectangle((1, 1, w - 2, h - 2), radius=max(3, round(h * 0.035)), outline=PALETTE["outer"], width=2)
    d.line((3, header_h, w - 4, header_h), fill=PALETTE["inner"], width=2)
    d.line((number_w, 3, number_w, header_h - 1), fill=PALETTE["divider"], width=2)

    title = name.upper().replace("/", " / ")
    title_font = fit_font(d, title, font_path, spec["font_px"], w - number_w - 16)
    number_font = ImageFont.truetype(font_path, spec["number_px"])

    nb = d.textbbox((0, 0), str(number), font=number_font)
    ny = max(2, (header_h - (nb[3] - nb[1])) // 2 - nb[1])
    draw_text_with_shadow(d, (max(5, (number_w - (nb[2] - nb[0])) // 2), ny), str(number), number_font)

    tb = d.textbbox((0, 0), title, font=title_font)
    ty = max(2, (header_h - (tb[3] - tb[1])) // 2 - tb[1])
    draw_text_with_shadow(d, (number_w + 10, ty), title, title_font)

    # Photo border kept separate from photo itself.
    d.rounded_rectangle(
        (x0, y0, x1 - 1, y1 - 1),
        radius=max(2, round(h * 0.025)),
        outline=(24, 68, 84, 220),
        width=1,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    card.convert("RGB").save(out_path, "PNG", optimize=True)


def output_path(root: Path, target_name: str, scene_id: str) -> Path:
    return root / "Assets" / "UI" / target_name / "SCENE_PRESET_HERO" / f"{scene_id}.png"


def build_one(
    root: Path,
    scene_id: str,
    name: str,
    photo: Path,
    font_path: str,
    focal_x: float,
    focal_y: float,
) -> list[Path]:
    outputs = []
    for target in TARGETS:
        out = output_path(root, target, scene_id)
        build_card(photo, scene_id, name, target, out, font_path, focal_x, focal_y)
        outputs.append(out)
    return outputs


def batch(args: argparse.Namespace, font_path: str) -> int:
    data = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    scenes = data["scenes"]
    built = 0
    missing = []
    for scene in scenes:
        scene_id = scene["id"]
        photo_candidates = [
            Path(args.photo_dir) / f"{scene_id}.png",
            Path(args.photo_dir) / f"{scene_id}.jpg",
            Path(args.photo_dir) / f"{scene_id}.jpeg",
            Path(args.photo_dir) / f"{scene_id}.webp",
        ]
        photo = next((p for p in photo_candidates if p.exists()), None)
        if not photo:
            missing.append(scene_id)
            continue
        build_one(
            Path(args.out_root),
            scene_id,
            scene["name"],
            photo,
            font_path,
            args.focal_x,
            args.focal_y,
        )
        built += 1

    print(f"Built {built} scenes / {built * 3} PNG")
    if missing:
        print("Missing photo masters:")
        for x in missing:
            print(" -", x)
        return 2
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--id")
    ap.add_argument("--name")
    ap.add_argument("--photo")
    ap.add_argument("--manifest")
    ap.add_argument("--photo-dir")
    ap.add_argument("--out-root", default=".")
    ap.add_argument("--font")
    ap.add_argument("--focal-x", type=float, default=0.5)
    ap.add_argument("--focal-y", type=float, default=0.5)
    args = ap.parse_args()

    font_path = find_font(args.font)

    if args.manifest:
        if not args.photo_dir:
            ap.error("--manifest requires --photo-dir")
        return batch(args, font_path)

    if not (args.id and args.name and args.photo):
        ap.error("single-scene mode requires --id, --name and --photo")

    outputs = build_one(
        Path(args.out_root),
        args.id,
        args.name,
        Path(args.photo),
        font_path,
        args.focal_x,
        args.focal_y,
    )
    for p in outputs:
        print(p)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
