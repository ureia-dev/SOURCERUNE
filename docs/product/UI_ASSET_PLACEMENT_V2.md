# SOURCERUNE Asset Placement V2 — UI_01 / UI_02

Status: **LOCKED semantic placement; pixel coordinates remain controlled by each UI layout spec.**

## Asset inventory

The approved V2 inventory contains 224 semantic assets:

| Group | Count |
|---|---:|
| SOURCE | 64 |
| TRANSMISSION | 24 |
| WALL / COVER | 32 |
| SPACE / ENVIRONMENT | 56 |
| SCENE PRESET HERO | 48 |
| **Total** | **224** |

Each semantic asset has three intended files:
- Shared master/card crop
- UI_01 runtime crop
- UI_02 runtime crop

That produces **672 runtime/master PNG slots**, plus atlas/reference sheets.

## Canonical paths

```text
Assets/UI/
├─ Shared/
│  ├─ SOURCE/
│  ├─ TRANSMISSION/
│  ├─ WALL_COVER/
│  ├─ SPACE_ENVIRONMENT/
│  └─ SCENE_PRESET_HERO/
├─ UI_01/
│  ├─ SOURCE/
│  ├─ TRANSMISSION/
│  ├─ WALL_COVER/
│  ├─ SPACE_ENVIRONMENT/
│  └─ SCENE_PRESET_HERO/
├─ UI_02/
│  ├─ SOURCE/
│  ├─ TRANSMISSION/
│  ├─ WALL_COVER/
│  ├─ SPACE_ENVIRONMENT/
│  └─ SCENE_PRESET_HERO/
└─ ReferenceSheets/
```

## UI_01 placement

UI_01 is the engineer-oriented layout.

### Left rail
1. SOURCE card → `UI_01/SOURCE/*`
2. TRANSMISSION card → `UI_01/TRANSMISSION/*`
3. WALL / COVER card → `UI_01/WALL_COVER/*`
4. SPACE / ENVIRONMENT card → `UI_01/SPACE_ENVIRONMENT/*`

The image is supporting artwork only. The module name, selected item name, bypass state and controls are rendered separately by the UI.

### Center
The central Scene View remains a live functional visualization and must not be replaced by a static preset image.

### Preset browser / hover preview
`UI_01/SCENE_PRESET_HERO/*` is used for:
- preset browser preview,
- hover/selection preview,
- optional scene-loading transition,
- documentation/example cards.

It is **not** the DSP Scene View itself.

### Runtime crop target
- nominal image slot: **384 × 144**
- responsive scaling allowed
- cover/crop rather than stretch
- no baked labels

## UI_02 placement

UI_02 is the more scene/spatial-visual layout.

### Scene/source selectors
The same four semantic libraries are used:
- SOURCE
- TRANSMISSION
- WALL / COVER
- SPACE / ENVIRONMENT

UI_02 is allowed to show larger imagery and more spatial context than UI_01, but selection must point to exactly the same parameter/state IDs.

### Preset browser / visual scene preview
`UI_02/SCENE_PRESET_HERO/*` may occupy a larger preview area than in UI_01.

### Live spatial view
The 3D / Top View, source/listener path, motion path, distance and perspective remain live UI elements. A scene-preset hero image cannot replace them.

### Runtime crop target
- nominal image slot: **512 × 256**
- responsive scaling allowed
- cover/crop rather than stretch
- no baked labels

## Shared behavior

Switching UI_01 ↔ UI_02:
- never changes audio,
- never remaps a preset,
- never changes the random seed,
- never changes automation meaning,
- never changes SOURCE / TRANSMISSION / COVER / SPACE selections,
- only changes presentation/layout.

## Data binding

The CSV/registry ID is the source of truth. UI code should bind by stable asset ID, never by display-name string.

Examples:
- `SRC_031_Car_Dashboard_Speaker`
- `TRN_006_GSM_Weak`
- `CVR_022_Solid_Wooden_Door`
- `SPC_022_Busy_City_Street`
- `SCN_037_Car_Pass_By_City_Street`

## Asset loading rules

- Do not scan directory names on the realtime audio thread.
- Resolve asset IDs at UI/state load time.
- Missing image assets must fall back to a neutral generic thumbnail without affecting DSP state.
- Image availability is never allowed to change preset audio behavior.
