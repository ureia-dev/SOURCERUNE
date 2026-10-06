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
