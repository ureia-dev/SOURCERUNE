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
