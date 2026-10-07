# REF Component Gap Audit

Current main inventory: Runtime/Common 108 PNG; Runtime/UI_01 5 PNG; Runtime/UI_02 0 PNG; Shared semantic art 224 PNG; UI_01 semantic art 224 PNG; UI_02 semantic art 224 PNG.

## Present and reusable
Shell/topbar/panel/card frames and dividers; general control caps; S/M/L knob bases; meter frame/segment; graph grid and EQ nodes; scene markers/points and motion glyph; UI_01 preset/runtime strip, scene grid, distance callout and waveform strip; semantic SOURCE/TRANSMISSION/WALL_COVER/SPACE_ENVIRONMENT art.

## REF gap candidates
- UI01_CARD_EDIT_CAP_IDLE / HOVER — validate Common button cap first; independent 9-slice only if overlay proves mismatch.
- UI01_METER_SCALE_LABELS — live text/CSS; geometry still missing from fine spec.
- UI01_KNOB_TICK_RINGS — CSS/SVG/live code; fine geometry pending.
- UI02_POST_PRESET_SHUFFLE — existing RT_TOOL_ICON_SHUFFLE assets; binding verification needed.
- UI02_TOPBAR_FOLDER — existing RT_TOOL_ICON_FOLDER assets; order verification needed.
- UI02_DISTANCE_DIAL_TICKS — CSS/SVG/live code; fine geometry pending.
- UI02_MOTION_KNOB_TICKS — CSS/SVG/live code; fine geometry pending.
- UI02_METER_SCALE_LABELS — live text/CSS; fine geometry pending.
- UI02_SCENE_ENV_BED — use existing semantic SPACE_ENVIRONMENT art.
- UI02_CARD_CHROME — reuse RT_CARD_FRAME first; validate against REF before creating a dedicated asset.

## Material audit
Metal/graphite panel grain, meter recess, knob-cap highlight, rubberized ring, cyan/amber glow and card-image bevel are MISSING-IN-SPEC until measured. This does not automatically mean MISSING-ASSET. Compare reusable Common runtime assets/CSS against REF first.

Never crop REF screenshots into runtime assets. Resolve every true gap as existing PNG, independent new PNG/9-slice, or live CSS/SVG/code.


## Gap reclassification — checkpoint 10

The audit now distinguishes four classes so that an unmeasured visual difference is not mislabeled as a missing binary asset.

| Candidate | Repo evidence | Current classification | Preferred implementation |
|---|---|---|---|
| UI01 knob cap/base S/M/L | Common runtime knob bases exist | EXISTS-RUNTIME | existing PNG |
| UI01 knob pointer | live pseudo-element exists | CODE-DRAWN | CSS/SVG live |
| UI01 knob active/inactive ring | live conic/radial mask exists | CODE-DRAWN / REF geometry pending | CSS/SVG live |
| UI01 knob discrete tick ring | no dedicated confirmed asset required yet | MISSING-IN-SPEC | CSS/SVG live after REF scan |
| UI01 knob value/label | live text exists | CODE-DRAWN | live text |
| UI01 meter frame/segments | Common runtime assets exist | EXISTS-RUNTIME | existing PNG |
| UI01 meter scale labels | live text geometry specified in checkpoint 07 | CODE-DRAWN | live text |
| UI01 Scene source/listener/points | independent runtime markers exist | EXISTS-RUNTIME | existing PNG |
| UI01 Scene motion/distance paths | live SVG exists | CODE-DRAWN | SVG live |
| UI01 Spectrum / response / waveform | live canvas/SVG exists | CODE-DRAWN | live code |
| UI01 card semantic images | UI_01 semantic library exists | EXISTS-RUNTIME | existing semantic PNG |
| UI01 card right arrow | Common arrow assets exist | EXISTS-RUNTIME | existing PNG |
| UI01 card Edit cap | Common button cap exists; REF material match unverified | EXISTS-RUNTIME / MISSING-IN-SPEC | existing cap first |
| UI02 semantic images | UI_02 semantic library exists | EXISTS-RUNTIME | existing semantic PNG |
| UI02 dedicated chrome directory | no dedicated Runtime/UI_02 PNG layer | NOT-AUTOMATIC-GAP | reuse Common first, create only after overlay proof |
| UI02 shuffle icon | Common shuffle states exist | EXISTS-RUNTIME | existing PNG |
| UI02 folder icon | Common folder states exist | EXISTS-RUNTIME | existing PNG |
| UI02 knob ticks / distance dial ticks | fine REF geometry not yet recorded | MISSING-IN-SPEC | CSS/SVG live |

### True missing-asset rule

A component may be promoted to **NEEDS-NEW-ASSET** only when all three conditions are met:

1. the approved REF clearly contains a raster/material element that cannot reasonably remain live code;
2. no equivalent independent Common/UI_01/UI_02 runtime asset exists after filename/manifests inspection;
3. reuse of the nearest existing asset fails a geometry/material overlay comparison.

Until those conditions are met, metal/graphite grain, recesses, bevels, cap highlights, rubber rings, cyan/amber glow and similar appearance differences remain **MISSING-IN-SPEC**, not automatically missing files.

This prevents unnecessary duplicate PNG generation and keeps values, labels, ticks, meters, curves, paths and coordinates live.


## Checkpoint 13 — left-rail edge convention / 1 px mismatch queue

The approved UI_01 scan currently yields the following **APPROX edge-inclusive measurements**:

```text
SOURCE 137
gap 6
TRANSMISSION 125
gap 8
WALL/COVER 131
gap 6
SPACE/ENVIRONMENT 108
----------------------
measured span = 521 px
runtime content box = 520 px
delta = +1 px
```

This is **not yet evidence that one card must be reduced by 1 px**. The most likely unresolved cause is mixed edge convention: poster scans may count both boundary pixels while CSS box geometry measures the distance between edges. Until a direct overlay identifies the exact shared boundary, all four non-equal card heights remain APPROX and the runtime 4×124 template must not be replaced by an arbitrary 1 px correction.

Resolution rule for the implementation checkpoint:

1. Lock a single coordinate convention: `[x0, x1)` / `[y0, y1)` (right/bottom exclusive).
2. Re-measure all four card outer boundaries from the same approved REF using that convention.
3. Require exact closure to the 520 px workspace content box before changing CSS.
4. If the four-card/gap sum still equals 521 px after exclusive-edge conversion, locate the actual 1 px overlap/border row in the REF rather than subtracting 1 px from a visually chosen card.
5. Only then promote the affected boundaries from APPROX to CONFIRMED and implement the non-equal template.

Status: **MISMATCH-QUEUED / NO RUNTIME CHANGE**.

### Related asset decision

The mismatch is geometry-only. It does not justify new card PNGs or REF crops. Existing semantic images, module icons and arrow assets remain reusable; card frame/background should remain independent runtime chrome / 9-slice or CSS unless a later material scan proves otherwise.


## Runtime geometry consistency audit — checkpoint 15

Direct repository verification found a concrete implementation/spec mismatch in the UI_01 left rail:

| Item | Approved REF contract | Current runtime evidence | Classification | Action |
|---|---|---|---|---|
| UI01_LEFT_RAIL_CONTENT_BOX | 520 px | workspace side-rail contract = 520 px | CONFIRMED | preserve 520 px target |
| UI01_LEFT_RAIL_CARD_STACK | exact 520 px closure required | V7 CSS uses 137 + 6 + 125 + 8 + 131 + 6 + 108 = 521 px | MISSING-IN-RUNTIME / geometry mismatch | do not promote V7 values to final; remeasure shared borders |
| UI01_SOURCE_CARD_HEIGHT | pending exclusive-edge overlay | 137 px | APPROX | no arbitrary correction |
| UI01_TRANSMISSION_CARD_HEIGHT | pending exclusive-edge overlay | 125 px | APPROX | no arbitrary correction |
| UI01_WALL_COVER_CARD_HEIGHT | pending exclusive-edge overlay | 131 px | APPROX | no arbitrary correction |
| UI01_SPACE_ENVIRONMENT_CARD_HEIGHT | pending exclusive-edge overlay | 108 px | APPROX | no arbitrary correction |

The current `Web/App/ref_geometry_lock_v7.css` is therefore a **provisional reconstruction**, not a confirmed REF lock. Its `.module-rail{height:521px}` and four card dimensions must not be treated as source-of-truth merely because they exist in runtime code.

This is a geometry defect, not an asset defect. No new PNG, REF crop, knob material, card frame, or semantic image is justified by this mismatch. The correction gate remains: one direct approved-REF scan under the right/bottom-exclusive convention must identify the shared 1 px border/overlap row and produce exact 520 px closure before runtime dimensions are changed.

Status: **IMPLEMENTATION-AHEAD-OF-SPEC / CORRECTION-GATED**.


## Checkpoint 19 — Native/Web parity gate

Repository verification shows Native LayoutSpec and Web V7 currently carry the same provisional UI_01 left-rail geometry: SOURCE 137, gap 6, TRANSMISSION 125, gap 8, WALL/COVER 131, gap 6, SPACE/ENVIRONMENT 108, total 521 px. The approved workspace content target remains 520 px.

Native/Web agreement is therefore parity evidence only; it does not promote these REF measurements from APPROX to CONFIRMED. Both implementations are IMPLEMENTATION-AHEAD-OF-SPEC for this one-pixel closure.

When the approved REF identifies the shared edge/overlap row, Native and Web must be corrected together and verified to close at exactly 520 px. Until then, no independent one-pixel compensation and no new raster asset is allowed.

Status: PARITY-CONFIRMED / REF-CLOSURE-PENDING.


## Checkpoint 21 — UI_01 left-rail mismatch resolved

Direct approved-REF measurement under a single right/bottom-exclusive convention resolved the 521/520 discrepancy.

```text
136 SOURCE + 7 gap + 132 TRANSMISSION + 7 gap
+ 132 WALL/COVER + 6 gap + 97 SPACE/ENVIRONMENT
+ 3 bottom residual = 520 px
```

Root cause: the previous SPACE/ENVIRONMENT measurement included lower workspace/divider pixels, while earlier card boundaries mixed inclusive and exclusive edge conventions.

Classification changes:
- `UI01_LEFT_RAIL_CARD_STACK`: **CONFIRMED / EXISTS-RUNTIME**
- `UI01_LEFT_RAIL_CONTENT_BOX`: **CONFIRMED / 520 px**
- new PNG/material requirement: **NONE**
- Web and Native geometry must use the same confirmed values above.

The previous checkpoints 13/15/19 remain historical diagnostics and are superseded by this resolution.


## Checkpoint 23 — UI_01 left-card semantic artwork availability

Repository audit confirms the remaining UI_01 semantic-card artwork is already present as independent assets rather than missing REF crops:

- TRANSMISSION: dedicated UI_01 `TRN_*` artwork plus Shared equivalents; ReferenceSheets includes `TRANSMISSION_24_ATLAS.png`.
- WALL/COVER: dedicated UI_01 `CVR_*` artwork plus Shared equivalents; ReferenceSheets includes `WALL_COVER_32_ATLAS.png`.
- SPACE/ENVIRONMENT: dedicated UI_01 `SPC_*` artwork plus Shared equivalents; ReferenceSheets includes `SPACE_ENVIRONMENT_56_ATLAS.png`.

Classification for all three semantic artwork families: **EXISTS-RUNTIME / existing PNG**. No replacement semantic artwork should be generated and no REF screenshot/crop may be used.

The unresolved items are geometry/specification, not semantic-image availability: image-holder bounds, title/text baseline, Edit/action-column bounds, arrow rectangle, internal padding/gaps, and card chrome/material layering remain **APPROX / MISSING-IN-SPEC** until measured from the approved full UI_01 REF. Reference atlases prove artwork inventory only and must not be used to infer plugin-local coordinates.


## Checkpoint 26 — UI_01 left-card internal asset decision

The approved REF scan confirms that the four left cards share the same reusable horizontal structure: independent module icon, live title/name, Edit button cap, semantic image holder, and independent right-arrow box.

No new semantic image, arrow, or module-icon asset is missing. The only unresolved visual question is whether the existing Common Edit/button cap matches the REF material closely enough; keep it **EXISTS-RUNTIME / MISSING-IN-SPEC** until overlay comparison.

Potential new raster assets from the left cards: **0 confirmed**.


## Checkpoint 32 — UI_01 left-card typography gap classification

Checkpoint 30/31 establishes raster glyph bounds only. The left-card title, item-name and chevron remain **CODE-DRAWN / live text-icon**; there is no justified raster-text asset gap.

| Component | Classification | Preferred implementation |
|---|---|---|
| UI01_LEFT_CARD_TITLE_TEXT | CODE-DRAWN / font metrics APPROX | live text |
| UI01_LEFT_CARD_ITEM_NAME | CODE-DRAWN / font metrics APPROX | live text |
| UI01_LEFT_CARD_CHEVRON | CODE-DRAWN / raster bounds APPROX | live icon/CSS/SVG |
| UI01_LEFT_CARD_TEXT_PNG | NOT REQUIRED | do not create |

Observed alignment evidence is x≈80–82 for title/name starts and x≈244 for chevrons. Font family remains `unknown`; nominal font size, weight, tracking, line-height, exact baseline, antialiasing and optical kerning remain **MISSING-IN-SPEC / APPROX**, not **NEEDS-NEW-ASSET**.

No REF crop or baked text PNG is permitted. If later overlay proves live typography cannot converge, first adjust live CSS/font metrics; only a non-text material element may qualify for a new raster asset under the true-missing-asset rule.


## Checkpoint 36 — UI_01 Scene component/material gap audit

The center Scene is not missing a monolithic raster. Existing independent runtime parts already cover the major raster roles:

| Component | Classification | Preferred implementation |
|---|---|---|
| UI01_SCENE_GRID_BED | EXISTS-RUNTIME | existing PNG `RT_SCENE_GRID.png` |
| UI01_SCENE_DISTANCE_CALLOUT | EXISTS-RUNTIME | existing PNG `RT_DISTANCE_CALLOUT.png` |
| UI01_SCENE_WAVEFORM_BED | EXISTS-RUNTIME | existing PNG `RT_WAVEFORM_STRIP_BG.png` |
| UI01_SCENE_SOURCE_MARKER_IDLE/ACTIVE | EXISTS-RUNTIME | existing independent PNG states |
| UI01_SCENE_LISTENER_MARKER_IDLE/ACTIVE | EXISTS-RUNTIME | existing independent PNG states |
| UI01_SCENE_POINT_IDLE/HOVER/SELECTED | EXISTS-RUNTIME | existing independent PNG states |
| UI01_SCENE_MOTION_CAR | EXISTS-RUNTIME | existing PNG |
| UI01_SCENE_MOTION_PATH | CODE-DRAWN | live SVG |
| UI01_SCENE_DISTANCE_LINE | CODE-DRAWN | live SVG |
| UI01_SCENE_DYNAMIC_POSITIONS | CODE-DRAWN | live state/transform |
| UI01_SCENE_DISTANCE_TEXT | CODE-DRAWN | live text |
| UI01_SCENE_WAVEFORM_TRACE | CODE-DRAWN | live canvas |
| UI01_SCENE_BUILDINGS_FLOOR_MATERIAL | MISSING-IN-SPEC | keep current SVG/CSS until REF material overlay proves a raster need |

Current true new raster requirement for Scene: **0 confirmed**.

The approved Scene structural boxes are already represented by Web/Native geometry. Internal SVG implementation coordinates are not REF coordinates and must remain separate in documentation. No full Scene screenshot, REF crop, baked motion path, baked distance text, or baked waveform is allowed.

Also note the resolved Web cascade regression: the last-loaded `ref_geometry_lock_v11.css` previously reintroduced the superseded 521 px left rail and old semantic-image top offsets. Checkpoint 33 aligned V11 to the confirmed 520 px left-rail contract and Checkpoint 27 holder tops. This is a runtime parity fix, not an asset gap.

Status: **SCENE ASSET INVENTORY SUFFICIENT / MATERIAL DETAIL REF OVERLAY PENDING**.


## Checkpoint 39 — UI_01 Analysis component gap audit

| Component | Classification | Preferred implementation |
|---|---|---|
| UI01_ANALYSIS_GRAPH_GRID | EXISTS-RUNTIME | existing PNG `RT_GRAPH_GRID.png` |
| UI01_ANALYSIS_EQ_NODE_IDLE/HOVER/SELECTED | EXISTS-RUNTIME | existing independent PNG states |
| UI01_ANALYSIS_FLOW_NODE_DEFAULT/SELECTED/BYPASSED | EXISTS-RUNTIME | existing independent PNG states |
| UI01_SPECTRUM_TRACE | CODE-DRAWN | live canvas |
| UI01_SPACE_RESPONSE_DIRECT/EARLY/TAIL | CODE-DRAWN | live SVG |
| UI01_SIGNAL_FLOW_NODES/ARROWS | CODE-DRAWN | live DOM/state |
| UI01_ANALYSIS_TAB_LABELS | CODE-DRAWN / typography APPROX | live text |
| UI01_ANALYSIS_AXIS_TICKS_LABELS | MISSING-IN-SPEC / CODE-DRAWN | live text after REF fine scan |
| UI01_ANALYSIS_BAKED_GRAPH | NOT REQUIRED | do not create |

No new Analysis raster asset is currently justified. Fine graph inset, axis/tick geometry, tab typography and material/shadow details remain **MISSING-IN-SPEC / APPROX** until approved REF overlay measurement. Existing graph grid and node assets must be reused first.

Status: **ANALYSIS ASSET INVENTORY SUFFICIENT / FINE SPEC PENDING**.


## Checkpoint 42 — UI_01 Meter component gap audit completion

| Component | Classification | Preferred implementation |
|---|---|---|
| UI01_METER_FRAME | EXISTS-RUNTIME | existing PNG `RT_METER_FRAME.png` |
| UI01_METER_SEGMENT | EXISTS-RUNTIME | existing PNG `RT_METER_SEGMENT.png` repeated by live fill |
| UI01_METER_FILL | CODE-DRAWN | live level math / dynamic height |
| UI01_METER_SCALE_LABELS | CODE-DRAWN / typography APPROX | live text |
| UI01_METER_IN_OUT_LABELS | CODE-DRAWN / typography APPROX | live text |
| UI01_METER_PEAK_RMS | EXISTS-RUNTIME control geometry + live text | CSS/live state |
| UI01_METER_LUFS | CODE-DRAWN | live text/value; no fake value |
| UI01_METER_BAKED_LEVEL | NOT REQUIRED | do not create |

No new Meter raster asset is justified. Remaining uncertainty is typography/material fine matching only and stays **MISSING-IN-SPEC / APPROX**, not NEEDS-NEW-ASSET.

Status: **METER ASSET INVENTORY COMPLETE FOR CURRENT REF CONTRACT**.


## Checkpoint 45 — UI_01 bottom seven-panel component gap audit

| Component | Classification | Preferred implementation |
|---|---|---|
| UI01_BOTTOM_KNOB_S/M/L_BASES | EXISTS-RUNTIME | existing PNG knob bases |
| UI01_BOTTOM_KNOB_POINTERS | CODE-DRAWN | live CSS/SVG |
| UI01_BOTTOM_KNOB_ACTIVE_RINGS | CODE-DRAWN / REF fine geometry pending | live CSS/SVG |
| UI01_BOTTOM_KNOB_VALUES_LABELS | CODE-DRAWN / typography APPROX | live text |
| UI01_BOTTOM_MODE_BUTTONS | EXISTS-RUNTIME control caps + live text | existing segment/button caps |
| UI01_BOTTOM_DROPDOWNS | EXISTS-RUNTIME | existing dropdown cap/caret states |
| UI01_BOTTOM_SLIDERS | EXISTS-RUNTIME | existing track/thumb states |
| UI01_BAD_SIGNAL_DEVICE_TEXT | CODE-DRAWN | live selected TRANSMISSION name |
| UI01_AMBIENCE_PREVIEW | EXISTS-RUNTIME semantic art | existing SPACE/ENVIRONMENT PNG |
| UI01_AMBIENCE_WAVE | CODE-DRAWN | live/CSS decorative waveform |
| UI01_EQ_TONE_GRAPH | CODE-DRAWN | live mini-EQ SVG |
| UI01_EQ_TONE_TEXT_VALUES | CODE-DRAWN | live text |

Current confirmed new raster requirement for the bottom seven panels: **0**.

Remaining work is fine REF measurement of knob centers, ring/tick geometry, label/value baselines, title baselines, mode-button/select/preview rectangles and optical material matching. These remain **MISSING-IN-SPEC / APPROX**, not NEEDS-NEW-ASSET.

Status: **BOTTOM PANEL ASSET INVENTORY SUFFICIENT / FINE INTERNAL REF GEOMETRY PENDING**.


## Checkpoint 48 — UI_02 major component gap classification

UI_02 currently has no dedicated `Assets/UI/Runtime/UI_02/**` raster layer, but this is **not** equivalent to “UI_02 is missing its assets.” The current approved composition can reuse Common runtime controls plus UI_02 semantic libraries and live code.

| Component | Classification | Preferred implementation |
|---|---|---|
| UI02_SOURCE / TRANSMISSION / WALL_COVER / SPACE semantic art | EXISTS-RUNTIME | existing UI_02 semantic PNGs |
| UI02_AMBIENCE environment art | EXISTS-RUNTIME | existing SPACE/ENVIRONMENT semantic PNG |
| UI02_SCENE_ENVIRONMENT_BED | EXISTS-RUNTIME semantic source + live composition | existing semantic art, no REF crop |
| UI02_SCENE_MARKERS/PATH/DISTANCE | EXISTS-RUNTIME + CODE-DRAWN | Common markers + live SVG/state |
| UI02_TOPBAR_PREV/NEXT | EXISTS-RUNTIME | existing image-arrow PNG states |
| UI02_TOPBAR_SHUFFLE | EXISTS-RUNTIME | existing Common shuffle icon states |
| UI02_TOPBAR_FOLDER | EXISTS-RUNTIME | existing Common folder icon states |
| UI02_TOPBAR_GEAR | EXISTS-RUNTIME | existing Common gear icon states |
| UI02_TOPBAR_METER | CODE-DRAWN / existing meter primitives | live horizontal fill |
| UI02_DISTANCE_DIAL | CODE-DRAWN + reusable knob/control material | live control; tick geometry pending |
| UI02_MOTION_SMALL_KNOBS | EXISTS-RUNTIME control bases + live pointer/text | existing knob bases |
| UI02_BOTTOM_MACRO_KNOBS | EXISTS-RUNTIME control bases + live pointer/text | existing knob bases |
| UI02_CARD_CHROME | NOT-AUTOMATIC-GAP | reuse Common frame/CSS first; new raster only after overlay proof |
| UI02_TEXT / VALUES / LABELS | CODE-DRAWN | live text; font family unknown until proven |

True confirmed new UI_02 raster requirement at this checkpoint: **0**.

The lack of a dedicated Runtime/UI_02 directory therefore remains a packaging/organization fact, not evidence for NEEDS-NEW-ASSET. New PNG/9-slice material is allowed only after a direct REF overlay proves Common/runtime material cannot converge.

Status: **UI_02 MAJOR ASSET INVENTORY SUFFICIENT / FINE MATERIAL AND STATE AUDIT CONTINUES**.
