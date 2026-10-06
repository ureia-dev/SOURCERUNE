# UI_01 REF Pixel Spec

Source of truth: approved UI_01 REF, 1536×1024 poster; plugin shell origin approximately (17,116), shell size 1499×807. Coordinates below are plugin-local unless explicitly marked APPROX.

Status vocabulary: CONFIRMED / APPROX / EXISTS-RUNTIME / MISSING-IN-RUNTIME / NEEDS-NEW-ASSET / CODE-DRAWN.

## Shell and major regions

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Shell | 0 | 0 | 1499 | 807 | CONFIRMED |
| Topbar | 0 | 0 | 1499 | 58 | CONFIRMED |
| Workspace | 0 | 58 | 1499 | 528 | CONFIRMED |
| Left rail | 10 | 58 | 313 | 521 | APPROX |
| Center | 333 | 58 | 967 | 517 | APPROX |
| Meter rail | 1310 | 58 | 179 | 520 | APPROX |
| Bottom macro strip | 0 | 586 | 1499 | 221 | CONFIRMED |

## Left semantic cards

| Object | y | h | gap-after | Runtime |
|---|---:|---:|---:|---|
| SOURCE | 58 | 137 | 6 | EXISTS-RUNTIME |
| TRANSMISSION | 201 | 125 | 8 | EXISTS-RUNTIME |
| WALL/COVER | 334 | 131 | 6 | EXISTS-RUNTIME |
| SPACE/ENVIRONMENT | 471 | 108 | — | EXISTS-RUNTIME |

SOURCE measured internal anchors: image left inset ≈9; image top inset ≈58; image ≈238×68; right action column ≈47; bottom residual ≈10. Other card internals remain APPROX until their per-pixel internal scan is completed.

## Center

Scene panel: 262 h; header 34 h; graph 186 h. Scene→Analysis gap ≈8. Analysis panel 247 h; tabs 37 h. Spectrum frame starts about 315 px plugin-local. Major geometry is CONFIRMED close to current runtime and must not be stretched merely to match side-rail bottom.

Dynamic layers remain CODE-DRAWN: Spectrum, EQ/response curves, waveform, Motion path, Source/Listener coordinates, scene points, meter fill and live numeric values.

## Bottom seven panels

REF-derived widths: Motion 269; Bad Signal 178; Condition 201; Intelligibility 201; Ambience 155; Mix 115; EQ/Tone 312; gaps ≈8. Status: CONFIRMED major boundaries.

## Runtime visual assets already present

EXISTS-RUNTIME: shell/topbar/panel/card frames; section dividers; button/segment/dropdown/icon-button caps; checkbox/toggle/slider; S/M/L knob bases; meter frame/segment; graph grid; EQ nodes; scene source/listener/point markers; motion-car glyph; UI_01 scene grid, distance callout and waveform-strip bed; module icons; image arrows.

## Pending fine scan

Text bounding boxes/baselines, exact font identity, all knob center/pointer/tick geometry, meter labels/ticks, individual topbar controls, all internal card image/action rectangles, shadow/glow radii and exact colors remain APPROX until measured. Unknown font identity must stay `unknown`.


## Meter rail fine geometry — checkpoint 07

Validated against the current main V9 meter reconstruction. These are runtime geometry anchors derived from the approved REF and are suitable as the next overlay baseline.

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Meter rail | 0 | 0 | 179 | 376 | CONFIRMED |
| Meter visual bed | 0 | 0 | 179 | 266 | CONFIRMED |
| IN meter block | 14 | 27 | 40 | 213 | CONFIRMED |
| OUT meter block | 114 | 27 | 40 | 213 | CONFIRMED |
| IN slot | 24 | 54 | 20 | 178 | CONFIRMED |
| OUT slot | 124 | 54 | 20 | 178 | CONFIRMED |
| Center dB labels | 76 | 49 | 28 | ≈214 | CONFIRMED |
| Peak/RMS toggle | 10 | 273 | 159 | 30 | CONFIRMED |
| Meter values bed | 0 | 239 | 179 | 137 | CONFIRMED |
| LUFS area | 10 | 307 | 159 | 69 | CONFIRMED |

Meter scale live text is `0 / -6 / -12 / -24 / -36 / -60`, centered in the 28 px middle column. Current runtime uses 9 px monospace at ≈35.6 px line advance. IN/OUT labels occupy 40×16 top boxes. Peak/RMS labels are live text in two equal toggle cells separated by 5 px. LUFS label/value remain live runtime text; no fake LUFS value is permitted.

Asset classification: meter frame/segments = EXISTS-RUNTIME; scale labels and values = CODE-DRAWN/live text; dedicated baked meter-label PNG = not required unless a later REF overlay proves typography cannot converge with live text.

## Scene live-object geometry contract — checkpoint 08

The following scene objects are confirmed as live runtime layers and must never be replaced by REF crops:

- Motion path: SVG cubic path, CODE-DRAWN.
- Start / closest / end points: independent runtime marker PNGs, EXISTS-RUNTIME.
- Motion car glyph: independent runtime PNG, EXISTS-RUNTIME.
- Listener marker: 64×64 runtime PNG centered on its live scene coordinate, EXISTS-RUNTIME.
- Source marker: 64×64 runtime PNG centered on its live scene coordinate, EXISTS-RUNTIME.
- Distance line: live SVG line, CODE-DRAWN.
- Distance callout bed: 80×54 UI_01 runtime PNG, EXISTS-RUNTIME.
- Distance value / SOURCE / LISTENER labels: live text, CODE-DRAWN.
- Scene waveform: live canvas inside an independent waveform-strip bed, CODE-DRAWN + EXISTS-RUNTIME bed.
- Spectrum: live canvas, CODE-DRAWN.
- Space-response Direct / Early / Tail curves: live SVG paths, CODE-DRAWN.

The current SVG uses a 1000×420 internal coordinate system; these SVG coordinates are implementation-space values and are **not** to be confused with REF poster pixels. Final REF-local marker coordinates remain APPROX until image-overlay measurement is completed.
