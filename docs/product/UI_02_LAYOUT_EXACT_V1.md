# UI_02 Exact Layout Reference V1

Reference image: **1672 × 941**.

## Pixel scan
- Top/global bar: y 0…77 → **78 px**
- Main body start: y approx 86
- Main body bottom: y approx 730
- Bottom macro strip start: y 751
- Bottom macro strip end: y 923

## Main columns
- Left selector rail: x 13…347 → **334 px**
- Center scene: x 356…1328 → **972 px**
- Right scene/ambience rail: x 1337…1659 → **322 px**
- Inter-column gaps: approx **9 px**

Normalized target weighting:
- Left: **20.3%**
- Center: **59.1%**
- Right: **19.6%**

## Left/right vertical scan
A four-row internal grid is used to reproduce the asymmetric reference:
- 196 px
- 74 px
- 100 px
- 244 px
with 9 px gaps.

This lets:
- SOURCE occupy row 1
- TRANSMISSION occupy rows 2–3
- WALL/COVER occupy row 4
- SPACE/ENVIRONMENT occupy right rows 1–2
- AMBIENCE occupy the remaining right-side height

## Center scene
- Upper visual scene target: approx **358 px**
- Lower distance/motion deck target: approx **283 px**
- Total center scene: approx **641 px**

The selected `SPACE_ENVIRONMENT` UI_02 crop is used as the live scene background. Source/listener/path remain runtime SVG overlays.

## Meter behavior
UI_02 uses horizontal IN/OUT meters in the top bar. Meter fill remains live code; only the frame/texture is raster.

## Bottom modules
Motion is integrated into the center deck and Ambience is in the right rail. Therefore the bottom row contains:
- Bad Signal
- Condition
- Intelligibility
- Mix
- EQ/Tone

## Runtime rule
No whole-UI screenshot is used. All content remains modular and interactive.
