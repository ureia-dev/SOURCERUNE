# SOURCERUNE Asset Delivery Status

Audit date: **2026-10-06 — V4**

## 1. Current repository PNG reality

Legacy V2 semantic/reference delivery is now **complete**:

- Shared: **224 / 224**
- UI_01: **224 / 224**
- UI_02: **224 / 224**
- Runtime/master semantic: **672 / 672**
- ReferenceSheets: **6 / 6**
- Legacy semantic/reference total: **678 / 678**

Reusable Runtime chrome:
- P0: complete and bound
- P1: complete and bound
- P2: complete and bound
- Runtime PNG total: **111**

Current committed/branch PNG total after legacy repair: **789**.

## 2. Legacy V2 completion

The four remaining Shared SPACE/ENVIRONMENT masters were restored from the original user-provided `SOURCERUNE_UI_ASSETS_V2.zip` exact bytes:

- `SPC_053_Drive_Thru_Window.png`
- `SPC_054_Security_Checkpoint.png`
- `SPC_055_Prison_Visiting_Room.png`
- `SPC_056_Phone_Booth.png`

The old 28-file gap is now **0**.

## 3. Runtime chrome status

Reusable decomposed Runtime UI assets are complete through P2.

Rules remain:
- full-interface screenshots are forbidden as implementation assets;
- text, values, spectrum, EQ curves, meters, motion paths, waveform, source/listener coordinates and automation state remain code-driven;
- reusable shell/control/chrome is stored under `Assets/UI/Runtime/`;
- UI_01 and UI_02 share the Runtime skin contract with Native LayoutSpec.

## 4. Expanded SCENE PRESET HERO requirement

Factory preset data contains **SCN_001…SCN_074**.

Existing approved semantic art contains **SCN_001…SCN_048**.

Still required for `SCN_049…SCN_074`:
- 26 Shared hero cards
- 26 UI_01 hero cards
- 26 UI_02 hero cards
- **78 new independent PNG files**

Every output is a separate single PNG. Atlas sheets are reference-only and may be generated only after the independent files exist.

## 5. Projected completed PNG count

If Runtime chrome remains at 111 PNG:

- Current after legacy completion: **789**
- New Scene Hero 49–74: **+78**
- Projected total: **867 PNG**

## 6. Source of truth

- Canonical Web geometry: `Web/App/ref_geometry_lock_v5.css`
- Runtime component inventory: `docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md`
- Runtime manifests: `Assets/UI/Runtime/p0_skin_manifest_v1.json`, `p1_skin_manifest_v1.json`, `p2_skin_manifest_v1.json`
- Native geometry: `Source/UI/UI_01/LayoutSpec.h`, `Source/UI/UI_02/LayoutSpec.h`
- Semantic V2 manifest: `Assets/UI/asset_manifest_v2.csv`
- Scene Hero production contract: `docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md`
- Scene Hero machine manifest: `Assets/UI/scene_hero_049_074_manifest_v1.json`
