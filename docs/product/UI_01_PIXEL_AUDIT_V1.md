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
