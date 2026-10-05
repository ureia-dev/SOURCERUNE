# UI_01 Exact Layout Reference V1

Reference image: 1536 × 1024, with explanatory callouts outside the plugin shell.

## Pixel scan
- Plugin shell: x 17…1516, y 116…923 → approx **1499 × 807**
- Top/global bar: y 116…173 → **57 px**
- Main content start: y 174
- Bottom macro start: y 702
- Bottom macro end: y 918
- Shell bottom: y 923

## Main columns
- Left scene modules: x 27…340 → **313 px**
- Gap: approx **10 px**
- Center: x 350…1317 → **967 px**
- Gap: approx **10 px**
- Right meters: x 1328…1507 → **179 px**

Normalized against usable inner width, target weighting is approximately:
- Left: **21%**
- Center: **66%**
- Right: **12%**

## Center vertical
- Scene/Motion: y 174…436 → **262 px**
- Gap: approx **8 px**
- Spectrum/response: y 444…691 → **247 px**

## Left rail
Four semantic cards fill approx **520 px**, target card height **124 px** with 8 px gaps.

## Bottom fast controls
Reference boundaries yield the following width weighting:
- Motion **1.80**
- Bad Signal **1.18**
- Condition **1.31**
- Intelligibility **1.31**
- Ambience **1.03**
- Mix **0.76**
- EQ/Tone **2.05**

## Runtime rule
The technical scene graph, spectrum, meters, labels, values, curves and waveforms remain live. The reference image is never used as a full-screen implementation bitmap.
