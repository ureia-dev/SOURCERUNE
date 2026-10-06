# SOURCERUNE REF Pixel Audit V6

Audit date: 2026-10-06

Method: direct pixel-gradient scan + long-line Hough detection against the two approved reference PNGs. This is a geometry audit only. Reference screenshots are never used as implementation assets.

## UI_01 approved REF

Reference image: 1536 x 1024 with explanatory callouts around the plugin.

High-confidence detected anchors:
- plugin outer left edge: x ~17
- plugin outer right edge: x ~1516
- plugin top edge: y ~115/116
- top/main boundary: y ~172/173
- scene/analysis boundary: y ~434/436
- bottom macro top: y ~701/703
- bottom macro lower border: y ~916/918
- shell lower edge: y ~923/924
- left/main split: x ~349/350
- center/meter split: x ~1317/1328 border pair

Bottom macro long vertical lines:
- first panel: left ~27/29, right ~296/298
- second: left ~304/306, right ~482/484
- third: left ~490/492, right ~691/693
- fourth: left ~699/701, right ~900/902
- fifth: left ~908/910, right ~1063/1065
- sixth: left ~1071/1073, right ~1186/1188
- seventh: left ~1194/1195, right ~1505/1507

Conclusion: current V5 UI_01 canonical geometry is already within low-single-digit-pixel tolerance in the major shell/column/bottom-strip geometry. Do not destabilize UI_01 until a rendered overlay shows a concrete mismatch.

## UI_02 approved REF

Reference image: 1672 x 941.

High-confidence detected anchors:
- top/main boundary: y ~77
- left/main divider: x ~348
- center/right divider: x ~1328
- bottom macro top: y ~751/753
- bottom macro lower border: y ~922/923

### Bottom five panels

Long vertical border lines detected:
- Bad Signal: x ~14 ... 349
- Condition: x ~361 ... 675
- Intelligibility: x ~687 ... 983
- Mix: x ~995 ... 1310
- EQ/Tone: x ~1323 ... 1656/1658

The current V5 fractional grid (1.08 / 1.08 / 1 / .98 / 1.35 with 9 px gaps) mathematically places these dividers too far left, especially Mix/EQ. This is a confirmed geometry mismatch.

Derived V6 target grid:
- columns: 337 px / 315 px / 297 px / 316 px / 337 px
- column gap: 11 px
- horizontal padding remains 13 px

This reproduces the detected border positions to approximately 0-2 px after frame inset.

### Left/right upper cards

Long horizontal lines and gradient anchors indicate:
- main content top: y ~86
- source lower / next-card region: y ~299 ... 308
- transmission lower / wall transition: y ~471 ... 483
- right SPACE lower edge: y ~371
- right AMBIENCE top edge: y ~380

The V5 rows (196 / 74 / 100 / 244) make SOURCE too short and move the left-card transitions upward.

Derived V6 target rows:
- row 1: 213 px
- row 2: 63 px
- row 3: 94 px
- row 4: 247 px
- grid gap: 9 px

Derived semantic card heights:
- SOURCE: 213 px
- TRANSMISSION span: 63 + 9 + 94 = 166 px
- WALL/COVER: 247 px
- SPACE span: 213 + 9 + 63 = 285 px
- AMBIENCE: top ~380 px, height ~350 px

The center scene visual/motion deck V5 values (358 / 283) remain consistent enough with the REF and are not changed in this pass.

## V6 change scope

Change only the confirmed UI_02 geometry mismatches:
1. upper rail grid rows and matching native constants;
2. right ambience top/height;
3. bottom five-panel exact pixel columns/gap.

Do not change DSP, presets, parameter semantics, UI_01 geometry, live graph logic, or runtime asset composition.


## UI_01 central internal scan — follow-up

Direct edge/Hough scan of the approved UI_01 REF confirms the current central stack is already aligned closely enough that no geometry override is justified:

- Scene panel outer: y ~173…436
- Header lower edge: y ~208
- Scene SVG / graph region: approximately y 208…394
- Waveform strip: approximately y 394…432
- Scene-to-analysis gap: approximately 8 px
- Analysis panel start: y ~444
- Tab strip: approximately y 444…481
- Spectrum plotted frame: approximately y 489…684

These align with the current runtime contract:
- Scene panel 262 px
- Scene header 34 px
- Scene graph 186 px
- Analysis panel 247 px
- Analysis tabs 37 px
- Center gap 8 px

Decision: **no UI_01 center geometry change in this pass**. Preserve the current values until a rendered runtime overlay proves a specific delta.


## Topbar pixel scan — follow-up

### UI_01
Detected control groups:
- left auxiliary two-button group: x ~512…601
- preset selector: x ~606…940 (about 334 px)
- post-preset / A-B region: x ~947…1095
- Copy/Paste group: x ~1110…1214
- Gear visual center: x ~1488

The first UI_01 auxiliary X-style button has ambiguous product semantics in the historical REF. Do not invent behavior merely to fill the visual slot. Geometry may reserve the slot until its host/runtime function is mapped.

### UI_02
Detected control groups:
- Prev/Next/Preset outer group: x ~435…872
- Prev: x ~435…484
- Next: x ~484…534
- Preset: x ~534…872
- post-preset crossed-arrow tool: x ~881…930
- A/B: x ~949…1020
- Folder: x ~1036…1096
- Input/Output meter area begins around x ~1167 and runs to about x ~1604
- Gear visual center: x ~1642

Confirmed current mismatches:
1. UI_02 Folder control currently precedes A/B in DOM/flex order; REF places Folder after A/B.
2. UI_02 lacks the post-preset crossed-arrow tool.
3. UI_02 topbar starts within only a few pixels of the REF but individual widths/order still require exact locking.
