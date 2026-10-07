# UI_02 REF Pixel Spec

Source of truth: approved UI_02 REF, 1672×941.

## Major geometry

| Object | x/y | size | Status |
|---|---|---|---|
| Top/main boundary | y≈77 | topbar 78 h | CONFIRMED |
| Left/main divider | x≈348 | — | CONFIRMED |
| Center/right divider | x≈1328 | — | CONFIRMED |
| Bottom macro top | y≈751–753 | — | CONFIRMED |
| Bottom lower border | y≈922–923 | — | CONFIRMED |

Upper grid rows: 213 / 63 / 94 / 247 with 9 px gaps. Semantic card heights: SOURCE 213; TRANSMISSION 166; WALL/COVER 247; SPACE 285; AMBIENCE 350. Center scene visual 358; motion deck 283.

Bottom five widths: Bad Signal 337; Condition 315; Intelligibility 297; Mix 316; EQ/Tone 337; gap 11; horizontal padding 13. Status: CONFIRMED.

Distance dial diameter: 300; Motion small knob diameter: 54; bottom macro knob diameter: 76. Status: EXISTS-RUNTIME geometry contract / fine pointer scan pending.

## Topbar anchors

Prev x≈435–484; Next 484–534; Preset 534–872; crossed-arrow tool 881–930; A/B 949–1020; Folder 1036–1096; meter region begins ≈1167 and ends ≈1604; Gear center x≈1642. Status: CONFIRMED major bounds.

## Runtime composition rule

Scene environment image comes from existing semantic SPACE_ENVIRONMENT art. Live markers/path/values remain CODE-DRAWN. Do not bake REF crops.

## Pending fine scan

All text bounding boxes/baselines, font identity, knob pointer/tick angles, internal card image bounds, meter tick labels, scene markers, shadows/highlights/material parameters remain APPROX until measured. Font name remains `unknown` unless independently verified.


## Checkpoint 46 — UI_02 complete major structural geometry

Using the approved UI_02 REF-derived Native/Web contract, the major plugin-local rectangles close exactly inside 1672×941.

### Shell / workspace

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| Shell | 0 | 0 | 1672 | 941 | CONFIRMED |
| Topbar | 0 | 0 | 1672 | 78 | CONFIRMED |
| Workspace allocation | 0 | 78 | 1672 | 653 | CONFIRMED |
| Workspace content left column | 13 | 86 | 334 | 644 | CONFIRMED structural allocation |
| Workspace center column | 356 | 86 | 972 | 644 | CONFIRMED structural allocation |
| Workspace right column | 1337 | 86 | 322 | 644 | CONFIRMED structural allocation |
| Workspace bottom residual | — | 730 | — | 1 | CONFIRMED by closure |
| Bottom macro strip | 0 | 731 | 1672 | 210 | CONFIRMED |

Horizontal closure:

```text
13 + 334 + 9 + 972 + 9 + 322 + 13 = 1672
```

Vertical workspace grid closure:

```text
8 top padding
+ 213 + 9 + 63 + 9 + 94 + 9 + 247
+ 1 bottom residual
= 653
```

### Upper grid / semantic cards

| Object | x | y | w | h | Status |
|---|---:|---:|---:|---:|---|
| SOURCE | 13 | 86 | 334 | 213 | CONFIRMED |
| TRANSMISSION | 13 | 308 | 334 | 166 | CONFIRMED |
| WALL/COVER | 13 | 483 | 334 | 247 | CONFIRMED |
| SPACE/ENVIRONMENT | 1337 | 86 | 322 | 285 | CONFIRMED |
| AMBIENCE | 1337 | 380 | 322 | 350 | CONFIRMED |
| Center Scene panel | 356 | 86 | 972 | 641 | CONFIRMED |
| Scene visual | 356 | 86 | 972 | 358 | CONFIRMED |
| Motion deck | 356 | 444 | 972 | 283 | CONFIRMED |

Scene closure:

```text
358 scene visual + 283 motion deck = 641 px
```

### Bottom five visible panels

The UI_02 bottom strip contains a 20 px top gap, five visible 172 px panels, and an 18 px shell-bottom residual.

| Visible panel | Runtime data-open | x | y | w | h | Status |
|---|---|---:|---:|---:|---:|---|
| BAD SIGNAL | TRANSMISSION | 13 | 751 | 337 | 172 | CONFIRMED |
| CONDITION | CONDITION | 361 | 751 | 315 | 172 | CONFIRMED |
| INTELLIGIBILITY | INTELLIGIBILITY | 687 | 751 | 297 | 172 | CONFIRMED |
| MIX | MIX | 995 | 751 | 316 | 172 | CONFIRMED |
| EQ / TONE | EQ_TONE | 1322 | 751 | 337 | 172 | CONFIRMED |

Bottom closure:

```text
20 top gap + 172 panel height + 18 bottom residual = 210 px
13 + 337 + 11 + 315 + 11 + 297 + 11 + 316 + 11 + 337 + 13 = 1672 px
```

MOTION is not a bottom panel in UI_02; its controls live inside the center Motion deck. AMBIENCE is a right-side 322×350 card, not part of the five-column bottom strip.

### Top meter allocation

Current REF-derived runtime geometry places the compact horizontal meter at:

- x = 1160 (1672 − 72 right inset − 440 width)
- y = 8
- w = 440
- h = 62
- individual live meter slot = 150×15

The meter fill remains live and must never be baked.

Status: **UI_02 MAJOR STRUCTURE CONFIRMED / FINE INTERNAL CONTROL AND TYPOGRAPHY SCAN STILL PENDING**.
