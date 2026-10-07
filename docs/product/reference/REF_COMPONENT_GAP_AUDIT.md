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
