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
