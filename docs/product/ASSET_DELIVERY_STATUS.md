# SOURCERUNE Asset Delivery Status

Audit date: **2026-10-05 — V3**

## 1. Current repository PNG reality

Current committed PNG files under `Assets/UI`: **761**.

This total must be split correctly:

- Legacy semantic + reference PNG currently present: **650**
- Reusable Runtime chrome PNG (P0 + P1 + P2): **111**
- Total currently committed: **761**

Do not compare the 761 total directly with the old 678-package target; the additional 111 files are the new decomposed Runtime UI library.

## 2. Legacy V2 semantic catalog

Semantic catalog baseline: **224 assets**
- SOURCE 64
- TRANSMISSION 24
- WALL / COVER 32
- SPACE / ENVIRONMENT 56
- SCENE PRESET HERO 48

Expected legacy image delivery:
- Shared: 224 PNG
- UI_01: 224 PNG
- UI_02: 224 PNG
- Runtime/master semantic total: **672 PNG**
- ReferenceSheets: **6 PNG**
- Legacy package total: **678 PNG**

Current legacy semantic/reference presence:
- Shared: **220 / 224**
- UI_01: **200 / 224**
- UI_02: **224 / 224**
- Runtime/master semantic: **644 / 672**
- ReferenceSheets: **6 / 6**
- Legacy semantic/reference total present: **650 / 678**

Missing legacy PNG: **28**
- `UI_01/TRANSMISSION/TRN_005…TRN_024`: 20
- `Shared/SPACE_ENVIRONMENT/SPC_053…SPC_056`: 4
- `UI_01/SPACE_ENVIRONMENT/SPC_053…SPC_056`: 4

These 28 files exist in the user-provided `SOURCERUNE_UI_ASSETS_V2.zip`; they are missing only from the current GitHub tree.

## 3. Runtime chrome status

Reusable decomposed Runtime UI assets are complete through P2:

- P0: complete and Web-bound
- P1: complete and Web-bound
- P2: complete and Web-bound
- Current Runtime PNG total: **111**

Runtime chrome is separate from semantic imagery.

Rules:
- full-interface screenshots are forbidden as implementation assets;
- text, values, spectrum, EQ curves, meters, motion paths, waveform, source/listener coordinates and automation state remain code-driven;
- reusable shell/control/chrome is stored under `Assets/UI/Runtime/`.

## 4. Expanded SCENE PRESET HERO requirement

Factory preset data now contains **SCN_001…SCN_074**.

Existing legacy art contains only **SCN_001…SCN_048**.

Therefore `SCN_049…SCN_074` still require:
- 26 Shared hero cards
- 26 UI_01 hero cards
- 26 UI_02 hero cards
- **78 new PNG**

Every output is a **separate single PNG file**. A 26-tile atlas may be generated only as a reference sheet after the individual files exist.

## 5. Projected completed PNG count

If no additional Runtime chrome is added:

- Current: 761
- Restore missing legacy: +28
- New Scene Hero 49–74: +78
- Projected complete total: **867 PNG**

## 6. Source of truth

- Runtime component inventory: `docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md`
- Runtime manifests: `Assets/UI/Runtime/p0_skin_manifest_v1.json`, `p1_skin_manifest_v1.json`, `p2_skin_manifest_v1.json`
- Semantic V2 manifest: `Assets/UI/asset_manifest_v2.csv`
- New Scene Hero production contract: `docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md`
- New Scene Hero machine manifest: `Assets/UI/scene_hero_049_074_manifest_v1.json`
