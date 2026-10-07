# UI_01 REF Pixel Spec

Source of truth: approved UI_01 REF, 1536×1024 poster; plugin shell origin approximately (17,116), shell size 1499×807. Coordinates below are plugin-local unless explicitly marked APPROX.

Status vocabulary: CONFIRMED / APPROX / EXISTS-RUNTIME / MISSING-IN-RUNTIME / NEEDS-NEW-ASSET / CODE-DRAWN.

## Shell and major regions

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Shell | 0 | 0 | 1499 | 807 | CONFIRMED |
| Topbar | 0 | 0 | 1499 | 58 | CONFIRMED |
| Workspace | 0 | 58 | 1499 | 528 | CONFIRMED |
| Left rail | 10 | 58 | 313 | 520 | CONFIRMED |
| Center | 333 | 58 | 967 | 517 | APPROX |
| Meter rail | 1310 | 58 | 179 | 520 | APPROX |
| Bottom macro strip | 0 | 586 | 1499 | 221 | CONFIRMED |

## Left semantic cards

| Object | y | h | gap-after | Runtime |
|---|---:|---:|---:|---|
| SOURCE | 58 | 136 | 7 | EXISTS-RUNTIME |
| TRANSMISSION | 201 | 132 | 7 | EXISTS-RUNTIME |
| WALL/COVER | 340 | 132 | 6 | EXISTS-RUNTIME |
| SPACE/ENVIRONMENT | 478 | 97 | — | EXISTS-RUNTIME |

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


## Bottom knob/control geometry — checkpoint 09

This checkpoint separates **confirmed runtime geometry** from REF geometry that is still awaiting a direct overlay scan. No runtime knob position is promoted to REF-confirmed merely because it exists in CSS.

### Current live knob geometry

| Region/control | Runtime face diameter | REF status | Implementation |
|---|---:|---|---|
| MOTION: Distance / Speed / Doppler / Width | 55 px | APPROX | existing S knob base + live pointer/value |
| BAD SIGNAL: Amount | 68 px | APPROX | existing knob base + live pointer/value |
| CONDITION: Amount | 68 px | APPROX | existing knob base + live pointer/value |
| INTELLIGIBILITY: Amount | 68 px | APPROX | existing knob base + live pointer/value |
| AMBIENCE: Amount | 68 px | APPROX | existing knob base + live pointer/value |
| MIX: Wet | 82 px | APPROX | existing knob base + live pointer/value |

Current pointer contract is CODE-DRAWN: start angle = -135°, sweep = 270°, pointer width = 2 px, pointer top = 15% of face diameter, pointer length = 27% of face diameter, transform origin = 50% / 130%. The numeric value is live centered text; the control label is live text below the face with a 4 px runtime gap.

Current knob ring is also CODE-DRAWN: conic active/inactive ring, radial mask approximately 73–82% radius. This is **not yet REF-CONFIRMED** and must be replaced by measured REF tick geometry if the approved REF shows discrete tick marks rather than a continuous arc.

### Bottom panel widths and derived center zones

The confirmed UI_01 bottom panel widths remain:

```text
MOTION 269 | BAD SIGNAL 178 | CONDITION 201 | INTELLIGIBILITY 201 |
AMBIENCE 155 | MIX 115 | EQ/TONE 312
inter-panel gap ≈ 8 px
```

Knob centers inside those panels remain APPROX because panel padding, title baseline, selector/preview occupancy and optical centering must be measured from the REF itself. Do not infer a REF center by simply dividing the CSS panel width.

### Text geometry still required from REF overlay

For every knob, the following are explicitly pending and must remain APPROX until measured directly from the approved REF:

- value bounding box x/y/w/h and baseline;
- label bounding box x/y/w/h and baseline;
- discrete tick positions/angles and tick lengths, if present;
- exact face center x/y;
- face outer diameter versus cap diameter;
- pointer visible length and pointer pivot;
- title-to-knob vertical gap;
- knob-to-mode-button / selector / preview gap.

Asset decision: existing knob-base PNGs are reusable first. Tick rings, pointers, values and labels stay live CSS/SVG/text. A new knob PNG is only justified if a later direct REF overlay proves the existing cap material itself cannot converge.


## Checkpoint 20 — left-rail parity

Native LayoutSpec and Web V7 both currently encode the same provisional stack: 137 + 6 + 125 + 8 + 131 + 6 + 108 = 521 px. The workspace side-rail content target remains 520 px.

This confirms Native/Web parity only. The four card heights and three gaps remain APPROX until approved REF evidence resolves the shared one-pixel boundary. The eventual correction must update Native and Web together and close exactly to 520 px. No asset change is implied.


## Checkpoint 21 — left-rail exact 520 px closure

A direct pixel scan of the approved four-card REF was repeated using one coordinate convention only: `[x0,x1) / [y0,y1)`, with right/bottom edges exclusive.

Confirmed full-reference vertical bounds:

```text
SOURCE             [174,310) = 136 px
gap                 [310,317) =   7 px
TRANSMISSION       [317,449) = 132 px
gap                 [449,456) =   7 px
WALL/COVER         [456,588) = 132 px
gap                 [588,594) =   6 px
SPACE/ENVIRONMENT  [594,691) =  97 px
bottom residual     [691,694) =   3 px
---------------------------------------
workspace content                 520 px
```

Plugin-local coordinates are therefore SOURCE y58/h136, TRANSMISSION y201/h132, WALL/COVER y340/h132, SPACE/ENVIRONMENT y478/h97, with a 3 px residual below the last card.

The earlier 521 px result was caused by including lower workspace/divider pixels in the SPACE/ENVIRONMENT card and by mixed inclusive/exclusive edge counting. No arbitrary 1 px compensation was used.

Status: **CONFIRMED / Web-Native update required together / no new asset required.**


## Checkpoint 25 — render audit baseline aligned

The live `Web/App/geometry_audit.js` UI_01 checks are now aligned with the confirmed checkpoint 21 left-rail geometry:

```text
SOURCE             y58  h136
TRANSMISSION       y201 h132
WALL/COVER         y340 h132
SPACE/ENVIRONMENT  y478 h97
module rail              h520
```

The automated audit previously still checked the superseded 521 px reconstruction (137/125/131/108), so it could report a false pass against obsolete geometry. The audit now checks the same values used by REF coordinates, Web V7 and Native LayoutSpec.

Status: **PARITY-CONFIRMED / automated geometry gate corrected.**


## Checkpoint 26 — left-card internal rectangles

Direct scan of the approved four-card REF establishes a shared horizontal template for the UI_01 semantic cards.

| Element | x | w | Status |
|---|---:|---:|---|
| Card | 10 | 313 | CONFIRMED |
| Module icon box | 19 (SOURCE/WALL/SPACE), 18 (TRANSMISSION) | 47–48 | CONFIRMED |
| Title/name text start | 80–82 | — | APPROX text pixels |
| Header chevron | 244 | ≈5 | APPROX |
| Edit button | 270 | 48 | CONFIRMED |
| Semantic image holder | 19 | 239 | CONFIRMED |
| Right arrow box | 269 | 49 | CONFIRMED |

Vertical rectangles:

```text
SOURCE:
  icon  y68  h42
  Edit  y72  h34
  image y115 h72
  arrow y115 h72

TRANSMISSION:
  icon  y209 h43
  Edit  y213 h34
  image y257 h70
  arrow y257 h70

WALL/COVER:
  icon  y348 h43
  Edit  y353 h34
  image y397 h69
  arrow y397 h70

SPACE/ENVIRONMENT:
  icon  y485 h42
  Edit  y489 h34
  image y533 h35
  arrow y532 h36
```

Text pixels begin at x≈80–82. Title glyph height is ≈10–11 px; item-name glyph height is ≈12–13 px. Exact font family remains **unknown** and must not be promoted to confirmed from raster evidence alone.

Asset classification:
- module icons: **EXISTS-RUNTIME**
- semantic art: **EXISTS-RUNTIME**
- right arrow: **EXISTS-RUNTIME**
- Edit cap: existing common button cap should be tested first
- labels/names/chevrons: **CODE-DRAWN / live text/icon**
- dedicated REF crops: **forbidden**

Status: **major internal rectangles CONFIRMED; typography metrics remain APPROX.**


## Checkpoint 27 — left-card holder/action geometry implemented

Web V7 now uses the confirmed checkpoint 26 rectangles rather than the old equal internal template.

Implemented:
- semantic image holder x = card + 9 px; right residual = 65 px;
- Edit cap width/height = 48×34 px, right residual = 5 px;
- right-arrow hit box width = 49 px, right residual = 5 px;
- per-card image top/bottom and arrow top/height match the approved REF scan.

Per-card vertical implementation:

```text
SOURCE:       image top57 bottom7; Edit top14; arrow top57 h72
TRANSMISSION: image top56 bottom6; Edit top12; arrow top56 h70
WALL/COVER:   image top57 bottom6; Edit top13; arrow top57 h70
SPACE:        image top55 bottom7; Edit top11; arrow top54 h36
```

This checkpoint intentionally does **not** change module-icon box geometry or title/name typography. Those remain the next independent scan/fix so a typography/icon adjustment cannot contaminate the now-confirmed holder/action rectangles.

Status: **IMPLEMENTED / semantic art unchanged / REF crops not used.**


## Checkpoint 28 — left-card icon geometry

Approved REF icon rectangles already measured in checkpoint 26:

- SOURCE: x19 y68 w47 h42 — CONFIRMED
- TRANSMISSION: x18 y209 w48 h43 — CONFIRMED
- WALL/COVER: x19 y348 w47 h43 — CONFIRMED
- SPACE/ENVIRONMENT: x19 y485 w47 h42 — CONFIRMED

Icon artwork remains EXISTS-RUNTIME using existing independent PNG assets. Title/name and chevron raster bounds remain APPROX; font family remains unknown and text stays live runtime. Icon geometry must not be used to infer typography metrics.

Status: ICON GEOMETRY CONFIRMED / TYPOGRAPHY APPROX / no runtime change.


## Checkpoint 30 — left-card live typography raster bounds

Approved REF raster evidence is sufficient to lock the **observed glyph bounding regions**, but not the font family or vector font metrics. Text therefore remains live runtime and the font family remains `unknown`.

| Card | Title bbox | Item-name bbox | Chevron bbox | Status |
|---|---|---|---|---|
| SOURCE | x81 y72 w50 h11 | x81 y93 w86 h17 | x244 y96 w5 h8 | APPROX raster text/icon |
| TRANSMISSION | x80 y214 w98 h11 | x82 y235 w76 h13 | x244 y237 w5 h9 | APPROX raster text/icon |
| WALL/COVER | x81 y353 w93 h11 | x81 y374 w99 h13 | x244 y377 w5 h9 | APPROX raster text/icon |
| SPACE/ENVIRONMENT | x81 y490 w149 h11 | x81 y511 w77 h13 | x244 y513 w5 h9 | APPROX raster text/icon |

Shared alignment evidence: title/name starts cluster at x80–82; chevrons align at x244. Title glyph height is approximately 10–11 px. Item-name glyph height is approximately 12–13 px except SOURCE, whose observed raster region is taller and must not be normalized without stronger REF evidence.

The following remain **APPROX / unknown**: font family, nominal font size, weight, tracking, line-height, exact baseline, antialiasing metrics, and optical kerning. These values must not be promoted to CONFIRMED from raster bounds alone. Implementation remains **CODE-DRAWN / live text/icon**; no text PNG or REF crop is permitted.

Status: **RASTER BOUNDS DOCUMENTED / FONT METRICS NOT CONFIRMED / no runtime change.**


## Checkpoint 34 — UI_01 center Scene structural geometry

The approved UI_01 geometry and the current Native/Web contracts converge on the following center Scene structure. Coordinates are plugin-local.

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Center column | 333 | 58 | 967 | 517 | CONFIRMED from shell/column closure |
| Scene panel | 333 | 58 | 967 | 262 | CONFIRMED |
| Scene header band | 333 | 58 | 967 | 34 | CONFIRMED |
| Scene live SVG viewport box | 333 | 92 | 967 | 186 | CONFIRMED box height; contents live |
| Scene residual below SVG | 333 | 278 | 967 | 42 | CONFIRMED residual total |
| Scene waveform runtime strip | x≈342 | y≈278 | w≈949 | h=38 | APPROX runtime implementation, REF split not yet promoted |
| Scene bottom residual | — | y≈316 | — | 4 | APPROX runtime implementation |
| Scene → Analysis gap | 333 | 320 | 967 | 8 | CONFIRMED |
| Analysis panel | 333 | 328 | 967 | 247 | CONFIRMED |

Closure:

```text
Scene 262 + gap 8 + Analysis 247 = 517 px
Scene: header 34 + SVG 186 + residual 42 = 262 px
Current runtime residual split: waveform 38 + bottom 4 = 42 px
```

The UI_01 live scene profile is applied by `app.js` at runtime, not by baking a REF image:

- SVG DOM viewport box remains 967×186 in plugin space.
- UI_01 internal SVG viewBox is live-switched to `0 140 1000 192`.
- Listener runtime anchor is switched to `translate(500 250)` in SVG implementation coordinates.
- Motion path is live-switched to `M110 300 C340 225 650 225 900 300`.
- Source position, motion-car position, distance line, distance callout and labels continue to update from live state.

Important coordinate rule: the 1000×420 / cropped `0 140 1000 192` SVG implementation space is **not REF poster pixel space**. Internal marker/path coordinates therefore remain CODE-DRAWN / implementation-space and must not be mislabeled as REF-confirmed plugin coordinates.

Layer/asset classification:

- Scene grid bed: **EXISTS-RUNTIME**, independent `RT_SCENE_GRID.png`.
- Distance callout bed: **EXISTS-RUNTIME**, independent `RT_DISTANCE_CALLOUT.png`.
- Waveform strip bed: **EXISTS-RUNTIME**, independent `RT_WAVEFORM_STRIP_BG.png`.
- Source/Listener markers: **EXISTS-RUNTIME**, independent idle/active PNG states.
- Start/Closest/End points: **EXISTS-RUNTIME**, independent idle/hover/selected PNG states.
- Motion-car glyph: **EXISTS-RUNTIME**, independent PNG.
- Motion path, distance line, dynamic Source/Listener positions, distance text and waveform trace: **CODE-DRAWN / live runtime**.
- Scene buildings/floor treatment currently remain live SVG/CSS and are **MISSING-IN-SPEC / material REF overlay pending**, not automatically missing assets.

No whole Scene screenshot or REF crop is permitted as a runtime component.

Status: **SCENE STRUCTURAL BOX MODEL CONFIRMED / INTERNAL LIVE OBJECT REF COORDINATES STILL APPROX**.


## Checkpoint 37 — UI_01 Spectrum / Analysis structural geometry

Plugin-local major geometry:

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Analysis panel | 333 | 328 | 967 | 247 | CONFIRMED |
| Tabs band | 333 | 328 | 967 | 37 | CONFIRMED |
| Tab content region | 333 | 365 | 967 | 210 | CONFIRMED by panel closure |
| Spectrum runtime canvas inset | x≈340 | y≈365 | w≈953 | h≈203 | APPROX runtime CSS, REF fine overlay pending |
| Space Response live SVG | x≈333 | y≈389 | w≈967 | h≈184 | APPROX runtime CSS |
| Space legend | x≈333 | y≈365 | w≈967 | h≈24 | APPROX runtime CSS |

Closure:

```text
37 tabs + 210 content = 247 px
```

The three visible analysis modes remain live runtime surfaces:

- **SPECTRUM**: live `canvas#spectrumCanvas`; analyzer trace is CODE-DRAWN.
- **SPACE RESPONSE**: live SVG curves `directCurve / earlyCurve / tailCurve`; curves are CODE-DRAWN.
- **SIGNAL FLOW**: live DOM nodes/arrows generated from current routing/bypass state; CODE-DRAWN.

The graph bed is an existing independent reusable runtime asset: `Assets/UI/Runtime/Common/Analysis/RT_GRAPH_GRID.png`, tiled at runtime underneath Spectrum and Space Response. Existing EQ-node states (`RT_EQ_NODE_IDLE/HOVER/SELECTED.png`) and Signal Flow node cap states also exist in Common/Analysis. Their presence is inventory evidence only; no REF coordinate is inferred from the asset itself.

Tab labels, graph labels, axis/tick labels and dynamic values stay live text. Font family/metrics remain `unknown` / APPROX unless directly measured from the approved REF. A baked Spectrum, baked Space Response curve, baked Signal Flow or baked text PNG is forbidden.

Status: **ANALYSIS PANEL/TABS CONFIRMED / FINE GRAPH INSETS AND TYPOGRAPHY APPROX / LIVE DATA PRESERVED**.


## Checkpoint 40 — UI_01 right Meter allocation / layer completion

The right workspace column is part of the confirmed shell closure, so its allocation is no longer APPROX:

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Meter workspace allocation | 1310 | 58 | 179 | 520 | CONFIRMED |
| Meter live content block | 1310 | 58 | 179 | 376 | CONFIRMED |
| Meter visual bed | 1310 | 58 | 179 | 266 | CONFIRMED |
| IN block | 1324 | 85 | 40 | 213 | CONFIRMED |
| OUT block | 1424 | 85 | 40 | 213 | CONFIRMED |
| IN slot | 1334 | 112 | 20 | 178 | CONFIRMED |
| OUT slot | 1434 | 112 | 20 | 178 | CONFIRMED |
| Center dB scale column | 1386 | 107 | 28 | ≈214 | APPROX vertical raster/text extent; column placement confirmed |
| Peak/RMS control | 1320 | 331 | 159 | 30 | CONFIRMED |
| LUFS region | 1320 | 365 | 159 | 69 | CONFIRMED |

Runtime layering contract:

1. `RT_METER_FRAME.png`: existing independent frame/slot raster, **EXISTS-RUNTIME**.
2. `RT_METER_SEGMENT.png`: existing independent segment raster repeated vertically by the live meter fill, **EXISTS-RUNTIME**.
3. Meter fill amount/level math: **CODE-DRAWN / live runtime**; never bake a fixed level into a PNG.
4. Scale labels `0 / -6 / -12 / -24 / -36 / -60`, IN/OUT labels, Peak/RMS text, LUFS label/value: **CODE-DRAWN / live text**.
5. Typography remains APPROX unless directly measured; current runtime monospace choice is implementation evidence, not proof of REF font identity.

The lower 144 px of the 520 px workspace allocation is intentional unused/allocation space relative to the 376 px meter content block and must not be filled by stretching the meter.

No dedicated baked scale-label image or baked meter fill is required.

Status: **METER ALLOCATION + CORE GEOMETRY CONFIRMED / TYPOGRAPHY FINE METRICS APPROX**.


## Checkpoint 43 — UI_01 bottom seven-panel structural geometry

The bottom strip occupies plugin-local y=586..807 and closes exactly to the shell bottom.

| Panel | Runtime data-open | x | y | w | h | Status |
|---|---|---:|---:|---:|---:|---|
| MOTION | MOTION | 10 | 586 | 269 | 216 | CONFIRMED |
| BAD SIGNAL | TRANSMISSION | 287 | 586 | 178 | 216 | CONFIRMED |
| CONDITION | CONDITION | 473 | 586 | 201 | 216 | CONFIRMED |
| INTELLIGIBILITY | INTELLIGIBILITY | 682 | 586 | 201 | 216 | CONFIRMED |
| AMBIENCE | AMBIENCE | 891 | 586 | 155 | 216 | CONFIRMED |
| MIX | MIX | 1054 | 586 | 115 | 216 | CONFIRMED |
| EQ / TONE | EQ_TONE | 1177 | 586 | 312 | 216 | CONFIRMED |

Shared geometry:

```text
left padding 10
panels: 269 + 178 + 201 + 201 + 155 + 115 + 312
six gaps: 6 × 8
right padding 10
= 1499 px

macro content height 216 + shell bottom residual 5 = 221 px
```

Current live control-size contracts (runtime evidence; face centers/fine optical placement still APPROX until REF overlay):

- MOTION Distance / Speed / Doppler / Width knob face: 55 px.
- BAD SIGNAL Amount: 68 px.
- CONDITION Amount: 68 px.
- INTELLIGIBILITY Amount: 68 px.
- AMBIENCE Amount: 68 px.
- MIX Wet: 82 px.
- EQ / TONE graph: live mini-EQ SVG; no baked curve.

Existing reusable runtime control assets include `RT_KNOB_S_BASE.png`, `RT_KNOB_M_BASE.png`, `RT_KNOB_L_BASE.png`, button/segment/dropdown caps and slider track/thumb states. Knob pointer, active ring, numeric value and labels stay live.

Important naming contract: the second visible panel is **BAD SIGNAL**, but its runtime navigation/data-open key is `TRANSMISSION`; documentation must preserve this distinction rather than renaming the visible panel to TRANSMISSION.

Status: **SEVEN PANEL BOUNDARIES CONFIRMED / INTERNAL CONTROL FINE GEOMETRY PARTLY APPROX**.
