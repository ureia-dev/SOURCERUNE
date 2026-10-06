# UI_01 Pixel Audit V1

Reference shell target: **1499 × 807 px**

## Checkpoint 01 — outer shell / primary columns

Measured/locked values from the approved UI_01 reference and current `ref_geometry_lock_v5.css`:

- shell width: 1499 px
- left padding: 10 px
- left rail: 313 px
- column gap 1: 10 px
- center: 967 px
- column gap 2: 10 px
- right meter rail: 179 px
- right padding: 10 px

Closure:

```text
10 + 313 + 10 + 967 + 10 + 179 + 10 = 1499
delta = 0 px
```

Status: **PASS — no geometry change required.**

Next checkpoint: UI_01 vertical shell closure only.


## Checkpoint 02 — vertical shell closure

Canonical current values:

- shell height: 807 px
- topbar: 58 px
- workspace: 528 px
- bottom macro strip: 221 px

Closure:

```text
58 + 528 + 221 = 807
delta = 0 px
```

Bottom macro internal closure:

```text
216 macro + 5 shell-bottom = 221
delta = 0 px
```

Workspace side-rail closure:

```text
4 × 124 cards + 3 × 8 gaps = 520 px
520 content + 8 workspace bottom = 528 px
delta = 0 px
```

Center stack:

```text
262 scene + 8 gap + 247 analysis = 517 px
available workspace content height = 520 px
difference = 3 px
```

The 3 px difference is **intentional and REF-derived**, not a geometry bug.  
The approved reference scan places the center analysis bottom at approximately y=691, while the left/right rails continue to approximately y=694. Therefore the center stack is expected to finish about 3 px earlier than the side rails.

Status: **PASS — do not stretch Scene or Analysis by 3 px.**

Next checkpoint: UI_01 left semantic-card internal geometry only.


## Checkpoint 03 — SOURCE semantic card internal geometry

Formal reference locked for this audit: the approved **four-card UI_01** reference (SOURCE / TRANSMISSION / WALL-COVER / SPACE-ENVIRONMENT).  
The older annotated five-card reference containing CONDITION in the left rail is explicitly **not** used for production geometry.

Pixel scan of the first SOURCE card, in full-reference coordinates:

- card outer top: approximately y = 174 px
- card outer bottom transition: approximately y = 310 px
- effective SOURCE card height: approximately **136 px**
- semantic image visible top: y = 232 px
- semantic image visible bottom: y = 300 px
- image height: approximately **68 px**
- semantic image left: x = 37 px
- semantic image right: x = 274–275 px
- image width: approximately **238 px**
- Edit/action column: x = 287–334 px
- Edit control top band: approximately y = 184–225 px
- image-cycle/right-arrow panel: approximately x = 287–334 px, y = 232–300 px
- header/icon/text band before semantic image: approximately **58 px**

Relative to the left rail/card origin (x approximately 28 px, y approximately 174 px):

```text
semantic image left inset   ≈ 9 px
semantic image top inset    ≈ 58 px
semantic image width        ≈ 238 px
semantic image height       ≈ 68 px
right action column width   ≈ 47 px
bottom residual/padding     ≈ 10 px
```

### Current runtime mismatch found

Current V5 runtime assumes:

```text
all cards = 124 px
module-art top = 48 px
module-art left = 8 px
module-art right = 47 px
module-art bottom = 8 px
module-cycle-next top = 72 px
module-cycle-next height = 42 px
```

The SOURCE reference does **not** support an equal-height 124 px template:

- SOURCE card is roughly 12 px taller than the current 124 px assumption.
- semantic image begins roughly 10 px lower than current `top:48px`.
- the visible image ends before the action column; current `right:47px` likely makes the image too wide.
- the reference right-arrow area spans essentially the full semantic-image height; current 42 px cycle hit area is too short although its center is near the correct vertical center.

Status: **MEASURED — implementation intentionally deferred until all four card heights are scanned.**

Do not change the rail template from this checkpoint alone; doing so would shift the remaining cards without verified heights.

Next checkpoint: TRANSMISSION card internal geometry only.


## Checkpoint 04 — TRANSMISSION semantic card geometry

Approved four-card UI_01 REF scan:

- card top: y ≈ 318 px
- card bottom: y ≈ 443 px
- effective height: ≈ **125 px**
- gap from SOURCE: ≈ **6 px**
- semantic image left inset: ≈ 9 px
- right action/cycle column: ≈ 47 px
- status: **APPROX / REF-SCANNED**

## Checkpoint 05 — WALL/COVER semantic card geometry

- card top: y ≈ 451 px
- card bottom: y ≈ 582 px
- effective height: ≈ **131 px**
- gap from TRANSMISSION: ≈ **8 px**
- semantic image left inset: ≈ 9 px
- right action/cycle column: ≈ 47 px
- status: **APPROX / REF-SCANNED**

## Checkpoint 06 — SPACE/ENVIRONMENT semantic card geometry

- card top: y ≈ 588 px
- card bottom: y ≈ 696 px
- effective height: ≈ **108 px**
- gap from WALL/COVER: ≈ **6 px**
- status: **APPROX / REF-SCANNED**

### Four-card rail closure

```text
137 SOURCE
+ 6 gap
+ 125 TRANSMISSION
+ 8 gap
+ 131 WALL/COVER
+ 6 gap
+ 108 SPACE/ENVIRONMENT
= 521 px
```

This replaces the obsolete equal-height 4×124 assumption. The latest native LayoutSpec on main already contains these unequal REF-derived heights, so future web/runtime convergence must preserve them rather than reverting to V5 equal cards.
