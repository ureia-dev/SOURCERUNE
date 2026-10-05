# SOURCERUNE Asset Delivery Status

Audit date: **2026-10-05**

## Legacy V2 semantic catalog

Semantic catalog baseline: **224 assets**
- SOURCE 64
- TRANSMISSION 24
- WALL / COVER 32
- SPACE / ENVIRONMENT 56
- SCENE PRESET HERO 48

Expected legacy master/runtime slots:
- Shared: 224 PNG
- UI_01: 224 PNG
- UI_02: 224 PNG
- Runtime/master total: **672 PNG**
- ReferenceSheets: **6 PNG**
- Grand total: **678 PNG**

## Current repository reality

Current committed PNG files under `Assets/UI`: **650**.

Breakdown:
- ReferenceSheets: 6 / 6
- Shared: 220 / 224
- UI_01: 200 / 224
- UI_02: 224 / 224

Legacy runtime/master semantic PNG present: **644 / 672**.

Missing: **28 PNG**:
- `UI_01/TRANSMISSION/TRN_005…TRN_024`: 20
- `Shared/SPACE_ENVIRONMENT/SPC_053…SPC_056`: 4
- `UI_01/SPACE_ENVIRONMENT/SPC_053…SPC_056`: 4

## Expanded scene-preset requirement

Factory preset data now includes **SCN_001…SCN_074**.

The legacy V2 image set still contains only **SCN_001…SCN_048**.

Therefore the new scenes `SCN_049…SCN_074` require:
- 26 Shared scene images
- 26 UI_01 scene crops
- 26 UI_02 scene crops
- **78 additional PNG**

These new scene images are separate from the runtime chrome component library.

## Runtime chrome

Reusable runtime UI chrome is specified in:
- `docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md`
- `Assets/UI/runtime_component_manifest_v1.json`

Do not confuse:
1. semantic content images,
2. reusable runtime chrome,
3. live code-drawn controls/graphs.

A complete UI must assemble all three rather than using a full-interface screenshot.
\n\n## Runtime chrome progress — 2026-10-05\n\n- P0: complete and Web-bound.\n- P1: complete and Web-bound.\n- P2: complete and Web-bound (**26 independent PNG assets**).\n- Runtime screenshots remain forbidden as implementation assets.\n- Live waveform, meters, spectrum, curves, text and positions remain code-driven.\n