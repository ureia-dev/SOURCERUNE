#!/usr/bin/env python3
"""Reproduce approved 2.5x REF with nearest-neighbor source-pixel sampling.

Historical script path kept for compatibility with existing GitHub documents.
The active fractional 2.5x method is Pillow nearest-neighbor, not retired
integer 10x streaming replication. Image output carries no invented detail.
"""
import argparse
import hashlib
from pathlib import Path
from PIL import Image

def magnify(source, output, factor=2.5):
    if not 0 < factor <= 8:
        raise ValueError("factor must satisfy 0 < factor <= 8")
    with Image.open(source) as image:
        rgba = image.convert("RGBA")
        size = (round(rgba.width * factor), round(rgba.height * factor))
        result = rgba.resize(size, resample=Image.Resampling.NEAREST)
        result.save(output, format="PNG")
    digest = hashlib.sha256(Path(output).read_bytes()).hexdigest()
    print(f"PNG {source} -> {output} ({size[0]}x{size[1]}) SHA256={digest}")
    return digest

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("input_png")
    p.add_argument("output_png")
    p.add_argument("--factor", type=float, default=2.5)
    args = p.parse_args()
    magnify(args.input_png, args.output_png, args.factor)
