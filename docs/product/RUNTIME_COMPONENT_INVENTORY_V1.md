# SOURCERUNE Runtime Component Inventory V1

Status: **IMPLEMENTATION BASELINE — HIGH-PRECISION AUDIT 2026-10-05**

This document converts the approved UI_01 / UI_02 visual direction into reusable runtime pieces. The rule is strict:

> **Do not ship a full-interface screenshot as the UI.**  
> The interface is assembled from semantic artwork + reusable UI chrome + live code-drawn controls/graphs.

## 1. Sources audited

- Supplied UI_01 reference image: **1536 × 1024** including explanatory callouts. The actual plugin shell occupies approximately **x=17…1516, y=116…923** (about **1499 × 807 px**; ±2 px from anti-aliasing).
- Supplied UI_02 reference image: **1672 × 941**.
- `Web/App/styles.css`, `components.css`, `UI_01/ui01.css`, `UI_02/ui02.css`.
- `Source/UI/UI_01/LayoutSpec.h` and `Source/UI/UI_02/LayoutSpec.h`.
- `Web/App/data/ui_controls.json`.
- V2 semantic image library under `Assets/UI`.

The code layout remains authoritative for responsive behavior; the supplied images are authoritative for art direction and relative emphasis.

## 2. Current semantic-image audit

Expected legacy V2 delivery:
- Shared: 224 PNG
- UI_01: 224 PNG
- UI_02: 224 PNG
- ReferenceSheets: 6 PNG
- **Total expected: 678 PNG**

Current GitHub `main` audit:
- Total PNG under `Assets/UI`: **650**
- ReferenceSheets: **6**
- Runtime/master semantic PNG present: **644 / 672**
- Missing: **28 PNG**

Missing exact files:
- UI_01 TRANSMISSION `TRN_005` through `TRN_024`: **20**
- Shared SPACE_ENVIRONMENT `SPC_053` through `SPC_056`: **4**
- UI_01 SPACE_ENVIRONMENT `SPC_053` through `SPC_056`: **4**

Separately, the preset portfolio now contains SCN_001…SCN_074. The old V2 art set contains only SCN_001…SCN_048. Therefore **SCN_049…SCN_074 still require 26 semantic scenes × 3 exports = 78 PNG** after style approval.

## 3. What is already usable vs what is not

### Existing semantic content — keep
- SOURCE device art.
- TRANSMISSION art.
- WALL/COVER art.
- SPACE/ENVIRONMENT art.
- SCENE PRESET HERO 001…048.
- UI_01 384×144 crops.
- UI_02 512×256 crops.

These are **content images inside cards / selectors / preview regions**. They are not panel chrome.

### Missing runtime component library
There is currently no committed dedicated runtime chrome library for:
- panel skins,
- reusable button skins,
- reusable dropdown skins,
- knob bases,
- slider thumbs/tracks,
- meter frames/segments,
- scene markers,
- EQ nodes,
- common module icons,
- 9-slice modal/drawer frames.

Those are the pieces defined below.

## 4. UI_01 structural baseline

Reference-image measured boundaries (design reference only; ±2 px):
- Plugin shell: x≈17–1516, y≈116–923.
- Top/global bar: y≈116–172.
- Left scene-module rail: x≈27–340, y≈174–694.
- Center main area: x≈350–1317.
- Right fixed meters: x≈1328–1507.
- Scene/Motion panel: y≈174–436.
- Analysis panel: y≈444–691.
- Bottom fast modules: y≈702–918.

Code baseline:
- Workspace columns: **250 px / minmax(680 px, 1fr) / 128 px**.
- Module card minimum height: **106 px**.
- Scene panel minimum height: **470 px**.
- Advanced grid: **6 columns**.
- UI_01 semantic image crop: **384 × 144**.

## 5. UI_02 structural baseline

Reference-image measured boundaries (design reference only; ±3 px):
- Full canvas: **1672 × 941**.
- Top/global bar: y≈0–77.
- Main body begins around y≈86.
- Left selector rail: x≈13–347.
- Primary scene area: x≈356–1328.
- Right SPACE/AMBIENCE rail: x≈1336–1659.
- Lower macro strip: y≈752–923.

Code baseline:
- Workspace: **minmax(820 px,1fr) + 128 px fixed meter rail**.
- Center rows: **minmax(590 px,1fr) + 184 px**.
- Scene panel min-height: **590 px**.
- Scene SVG min-height: **420 px**.
- Scene component dock: **4 columns, each min 180 px**.
- Module card min-height: **112 px**.
- UI_02 semantic image crop: **512 × 256**.

## 6. Runtime component inventory

| ID | UI | Group | Implementation | Purpose | Master target | States | Status |
|---|---|---|---|---|---|---|---|
| `RT_SHELL_BG` | COMMON | Shell | **PNG_9SLICE** | 全插件最底層霧黑/金屬感底板；不可烘焙內容 | 96x96 @2x master | default | NEW_P0 |
| `RT_PANEL_FRAME` | COMMON | Shell | **PNG_9SLICE** | 所有大 panel 共用外框、內陰影、1px 金屬邊 | 96x96 @2x master | default/focus | NEW_P0 |
| `RT_CARD_FRAME` | COMMON | Shell | **PNG_9SLICE** | SOURCE/TRANSMISSION/WALL/SPACE 小卡共用框 | 80x80 @2x master | default/hover/selected/bypassed | NEW_P0 |
| `RT_CARD_IMAGE_MASK` | COMMON | Shell | **CODE** | 圖片圓角/裁切遮罩；不做整張 PNG | runtime | default | CODE |
| `RT_SECTION_DIVIDER_H` | COMMON | Shell | **PNG_TILE** | 水平分隔線/亮邊 | 128x8 @2x | default | ASSET_READY_P1_V1 |
| `RT_SECTION_DIVIDER_V` | COMMON | Shell | **PNG_TILE** | 垂直分隔線/亮邊 | 8x128 @2x | default | ASSET_READY_P1_V1 |
| `RT_ACCENT_LINE` | COMMON | Shell | **CODE** | cyan/amber/green/purple 狀態線由程式換色 | runtime | state color | CODE |
| `RT_TOPBAR_BG` | COMMON | Global | **PNG_9SLICE** | 頂部工具列底板 | 96x64 @2x | default | NEW_P0 |
| `RT_PRESETBAR_BG` | UI_01 | Global | **PNG_9SLICE** | UI_01 preset/state bar | 96x56 @2x | default | ASSET_READY_P1_V1 |
| `RT_RUNTIME_STRIP_BG` | UI_01 | Global | **PNG_9SLICE** | ENGINE/SR/BLOCK/SEED/SYNC/SEEK/STATE 條 | 96x48 @2x | default | ASSET_READY_P1_V1 |
| `RT_LOGO_MARK` | COMMON | Brand | **PNG_FIXED** | SOURCERUNE 圖形標誌；透明底 | 96x96 @2x | default | ASSET_READY_P1_V1 |
| `RT_BUTTON_CAP` | COMMON | Control | **PNG_9SLICE** | 一般按鈕共用 | 96x56 @2x | idle/hover/pressed/disabled | NEW_P0 |
| `RT_SEGMENT_CAP` | COMMON | Control | **PNG_9SLICE** | A/B、3D/Top、Approach/PassBy/Leave 等 segmented | 88x52 @2x | idle/hover/active/disabled | NEW_P0 |
| `RT_DROPDOWN_CAP` | COMMON | Control | **PNG_9SLICE** | Preset/Selector/Mode 下拉框 | 112x56 @2x | idle/hover/open/disabled | NEW_P0 |
| `RT_DROPDOWN_CARET` | COMMON | Control | **VECTOR_OR_PNG** | 下拉箭頭 | 24x24 @2x | idle/hover | ASSET_READY_P1_V1 |
| `RT_ICON_BUTTON_CAP` | COMMON | Control | **PNG_9SLICE** | 齒輪/資料夾/箭頭/全螢幕等 icon-only button | 64x56 @2x | idle/hover/pressed/active | NEW_P0 |
| `RT_CHECKBOX` | COMMON | Control | **PNG_FIXED** | Static/Dropout/Interference/Duck 等 checkbox | 32x32 @2x | off/on/disabled | ASSET_READY_P1_V1 |
| `RT_BYPASS_TOGGLE` | COMMON | Control | **PNG_FIXED** | 模組 bypass/On | 64x32 @2x | off/on/disabled | ASSET_READY_P1_V1 |
| `RT_SLIDER_TRACK` | COMMON | Control | **PNG_9SLICE** | 水平 slider track | 128x16 @2x | default | NEW_P0 |
| `RT_SLIDER_FILL` | COMMON | Control | **CODE** | fill 長度與色彩動態 | runtime | dynamic | CODE |
| `RT_SLIDER_THUMB` | COMMON | Control | **PNG_FIXED** | slider thumb | 32x32 @2x | idle/hover/drag | NEW_P0 |
| `RT_KNOB_S_BASE` | COMMON | Control | **PNG_FIXED** | 小 knob 底座，Bad Signal/Condition/Speed/Doppler/Width | 112x112 @2x | default | NEW_P0 |
| `RT_KNOB_M_BASE` | COMMON | Control | **PNG_FIXED** | 中 knob，Ambience/Mix/Intelligibility | 144x144 @2x | default | NEW_P0 |
| `RT_KNOB_L_BASE` | UI_02 | Control | **PNG_FIXED** | UI_02 大 Distance dial 底座 | 640x640 @2x | default | NEW_P0 |
| `RT_KNOB_ARC` | COMMON | Control | **CODE** | 數值弧線、顏色、進度，不做死圖 | runtime | dynamic | CODE |
| `RT_KNOB_POINTER` | COMMON | Control | **CODE** | 指示線/點由參數角度旋轉 | runtime | dynamic | CODE |
| `RT_METER_FRAME` | COMMON | Meter | **PNG_9SLICE** | IN/OUT meter 槽外框 | 64x256 @2x | default | NEW_P0 |
| `RT_METER_SEGMENT` | COMMON | Meter | **PNG_FIXED** | meter LED 單段形狀；顏色由程式控制 | 20x10 @2x | default | ASSET_READY_P1_V1 |
| `RT_METER_FILL` | COMMON | Meter | **CODE** | 即時電平、Peak Hold、RMS/LUFS 值 | runtime | dynamic | CODE |
| `RT_GRAPH_GRID` | COMMON | Analysis | **PNG_TILE** | Spectrum/EQ/Response 共用暗色格線底 | 128x128 @2x | default | NEW_P0 |
| `RT_SPECTRUM_CURVE` | COMMON | Analysis | **CODE** | 頻譜曲線與填色即時計算 | runtime | pre/post | CODE |
| `RT_EQ_CURVE` | COMMON | Analysis | **CODE** | HPF/LPF/4-band node + curve | runtime | dynamic | CODE |
| `RT_EQ_NODE` | COMMON | Analysis | **PNG_FIXED** | EQ node 圓點/光暈 | 28x28 @2x | idle/hover/selected | ASSET_READY_P1_V1 |
| `RT_RESPONSE_CURVE` | COMMON | Analysis | **CODE** | Direct/Early/Tail response | runtime | dynamic | CODE |
| `RT_FLOW_NODE_CAP` | COMMON | Analysis | **PNG_9SLICE** | Signal Flow node 背景 | 80x44 @2x | default/bypassed/selected | ASSET_READY_P2_V1 |
| `RT_SCENE_GRID` | UI_01 | Scene | **PNG_TILE** | UI_01 Scene View 技術格線底 | 128x128 @2x | default | ASSET_READY_P1_V1 |
| `RT_SCENE_ENV_IMAGE` | UI_02 | Scene | **SEMANTIC_EXISTING** | UI_02 大型場景底圖，優先由 SPACE_ENVIRONMENT runtime crop 提供 | 512x256 source, cover-scaled | selection dependent | EXISTING |
| `RT_SCENE_SOURCE_MARKER` | COMMON | Scene | **HYBRID** | Source marker cap/icon；位置/標籤/值由 code | 64x64 @2x | idle/selected/drag | NEW_P0 |
| `RT_SCENE_LISTENER_MARKER` | COMMON | Scene | **HYBRID** | Listener marker cap；位置/標籤由 code | 64x64 @2x | idle/selected | NEW_P0 |
| `RT_SCENE_PATH` | COMMON | Scene | **CODE** | source-listener 線/運動曲線/波形軌跡 | runtime | dynamic | CODE |
| `RT_SCENE_POINT` | COMMON | Scene | **PNG_FIXED** | Start/Closest/End handle | 28x28 @2x | idle/hover/selected | ASSET_READY_P1_V1 |
| `RT_DISTANCE_CALLOUT` | UI_01 | Scene | **PNG_9SLICE** | 25.0m / 0.8s 類浮窗底 | 96x64 @2x | default | ASSET_READY_P2_V1 |
| `RT_MOTION_CAR_GLYPH` | COMMON | Scene | **VECTOR_OR_PNG** | Motion path 車輛 glyph | 56x40 @2x | default | ASSET_READY_P1_V1 |
| `RT_WAVEFORM_STRIP_BG` | UI_01 | Scene | **PNG_9SLICE** | UI_01 motion waveform/trim strip 底 | 96x40 @2x | default | ASSET_READY_P2_V1 |
| `RT_WAVEFORM` | COMMON | Scene | **CODE** | 音訊 waveform/seek/trim 動態 | runtime | dynamic | CODE |
| `RT_IMAGE_ARROW_L` | COMMON | AssetCard | **PNG_FIXED** | 卡片圖片左箭頭 | 32x48 @2x | idle/hover | ASSET_READY_P1_V1 |
| `RT_IMAGE_ARROW_R` | COMMON | AssetCard | **PNG_FIXED** | 卡片圖片右箭頭 | 32x48 @2x | idle/hover | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_SOURCE` | COMMON | Icon | **VECTOR_OR_PNG** | SOURCE icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_TRANSMISSION` | COMMON | Icon | **VECTOR_OR_PNG** | TRANSMISSION icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_WALL` | COMMON | Icon | **VECTOR_OR_PNG** | WALL/COVER icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_SPACE` | COMMON | Icon | **VECTOR_OR_PNG** | SPACE/ENVIRONMENT icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_MOTION` | COMMON | Icon | **VECTOR_OR_PNG** | MOTION icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_BADSIGNAL` | COMMON | Icon | **VECTOR_OR_PNG** | BAD SIGNAL icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_CONDITION` | COMMON | Icon | **VECTOR_OR_PNG** | CONDITION icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_INTELLIGIBILITY` | COMMON | Icon | **VECTOR_OR_PNG** | INTELLIGIBILITY icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_AMBIENCE` | COMMON | Icon | **VECTOR_OR_PNG** | AMBIENCE icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_MIX` | COMMON | Icon | **VECTOR_OR_PNG** | MIX icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_MODULE_ICON_EQ` | COMMON | Icon | **VECTOR_OR_PNG** | EQ/TONE icon | 40x40 @2x | default/active | ASSET_READY_P1_V1 |
| `RT_TOOL_ICON_GEAR` | COMMON | Icon | **VECTOR_OR_PNG** | Settings | 32x32 @2x | idle/hover | ASSET_READY_P1_V1 |
| `RT_TOOL_ICON_FOLDER` | COMMON | Icon | **VECTOR_OR_PNG** | Load/Save/Folder | 32x32 @2x | idle/hover | ASSET_READY_P1_V1 |
| `RT_TOOL_ICON_UNDO` | COMMON | Icon | **VECTOR_OR_PNG** | Undo | 32x32 @2x | idle/hover/disabled | ASSET_READY_P2_V1 |
| `RT_TOOL_ICON_REDO` | COMMON | Icon | **VECTOR_OR_PNG** | Redo | 32x32 @2x | idle/hover/disabled | ASSET_READY_P2_V1 |
| `RT_TOOL_ICON_FULLSCREEN` | UI_02 | Icon | **VECTOR_OR_PNG** | Scene fullscreen | 32x32 @2x | idle/hover/active | ASSET_READY_P2_V1 |
| `RT_TOOL_ICON_COPY` | COMMON | Icon | **VECTOR_OR_PNG** | Copy state | 32x32 @2x | idle/hover | ASSET_READY_P2_V1 |
| `RT_TOOL_ICON_PASTE` | COMMON | Icon | **VECTOR_OR_PNG** | Paste state | 32x32 @2x | idle/hover/disabled | ASSET_READY_P2_V1 |
| `RT_AMBIENCE_WAVE_GLYPH` | COMMON | Ambience | **CODE** | Ambience 小 waveform/動態線條，避免為每種 ambience 新造大圖 | runtime | dynamic | CODE |
| `RT_ASSET_BROWSER_FRAME` | COMMON | Browser | **PNG_9SLICE** | Asset browser modal frame | 128x128 @2x | default | ASSET_READY_P2_V1 |
| `RT_ASSET_PREVIEW_FRAME` | COMMON | Browser | **PNG_9SLICE** | Browser preview artwork frame | 96x96 @2x | default/selected | ASSET_READY_P2_V1 |
| `RT_ADV_DRAWER_FRAME` | COMMON | Advanced | **PNG_9SLICE** | Advanced drawer panel | 96x96 @2x | open | ASSET_READY_P2_V1 |
| `RT_ADV_CONTROL_CARD` | COMMON | Advanced | **PNG_9SLICE** | Detailed-control cell | 80x80 @2x | default/active/bypassed | ASSET_READY_P2_V1 |

## 7. Rendering rule by type

### PNG_9SLICE
Use PNG only for material/edge/shadow language. The center must be stretchable. Do not bake labels, values or selected names.

### PNG_FIXED
Use only for fixed-form visual pieces such as knob body, slider thumb, marker cap or meter segment.

### VECTOR_OR_PNG
Icons may be authored as vector masters and exported to PNG for native/runtime use. They must remain monochrome/duotone and recolorable where practical.

### CODE
These must remain code-driven:
- text,
- parameter values,
- meter level,
- peak/RMS/LUFS numbers,
- spectrum,
- EQ curve,
- Space Response curves,
- motion path,
- distance line,
- waveform,
- current source/listener positions,
- automation state,
- hover/selection logic,
- bypass opacity,
- accent colors.

### HYBRID
Use a reusable PNG cap/icon under live code labels/coordinates.

## 8. Priority

### P0 — build first
Panel/card frame, topbar, button, segmented button, dropdown, icon-button cap, slider track/thumb, S/M/L knob bases, meter frame, graph grid, source/listener markers.

These are sufficient to stop the UI from looking like CSS-only scaffolding while preserving real runtime behavior.

### P1 — second pass
Dividers, caret, checkbox, bypass toggle, EQ node, Scene grid, point handles, image arrows, all module icons, gear/folder and other common tools.

### P2 — polish / drawers
Signal-flow node cap, distance callout, waveform-strip frame, undo/redo/copy/paste/fullscreen icons, browser frame, preview frame, advanced drawer/control-card skins.

## 9. Folder contract

```text
Assets/UI/Runtime/
├─ Common/
│  ├─ Shell/
│  ├─ Controls/
│  ├─ Meter/
│  ├─ Analysis/
│  ├─ Scene/
│  └─ Icons/
├─ UI_01/
│  └─ Scene/
└─ UI_02/
   └─ Scene/
```

Semantic imagery remains where it is:
```text
Assets/UI/Shared/
Assets/UI/UI_01/
Assets/UI/UI_02/
```

Do not mix semantic content images with reusable runtime chrome.

## 10. Naming / export rules

- Stable uppercase IDs as filenames, e.g. `RT_BUTTON_CAP_IDLE.png`.
- State suffixes: `_IDLE`, `_HOVER`, `_PRESSED`, `_ACTIVE`, `_DISABLED`.
- 9-slice assets must document inset pixels in the manifest.
- Master art is authored at **2×** whenever raster.
- Runtime downscale is allowed; runtime upscaling beyond master size is not.
- No baked text except reference sheets.
- No semantic name is inferred from filename display text; bindings use stable IDs.
- UI_01 ↔ UI_02 switching changes layout only, never DSP/state.

## 11. Non-negotiable visual direction

Follow `VISUAL_STYLE_V2.md` and the supplied UI references:
- dark professional post-production tool,
- restrained neutral/cool base,
- no rainbow module dashboard,
- no decorative AI-art look,
- no full-screen screenshot replacement,
- no excessive bloom or neon,
- no fake analyzer/meter values,
- no baked control text,
- central scene is a live visualization,
- images support controls rather than replace them.

## 12. Completion gate for Runtime Components V1

V1 is considered visually complete only when:
1. Every P0 item exists and is bound in WEB.
2. The same P0 pieces can be reused by native VST3.
3. UI_01 and UI_02 can render without using a full-interface screenshot.
4. Semantic image missing count is zero for the legacy 672 slots.
5. SCN_049…SCN_074 artwork is separately completed and does not alter runtime chrome.
6. Dynamic graphs/meters/scene paths remain live code.

## 13. P0 implementation status — 2026-10-05

P0 V1 is now implemented as reusable raster/runtime pieces rather than a full-interface screenshot.

- **17 P0 logical components** have asset-ready status.
- **33 individual PNG files** are present under `Assets/UI/Runtime/Common/`.
- Raster masters are authored at **2×**.
- 9-slice inset metadata is stored in `Assets/UI/Runtime/p0_skin_manifest_v1.json`.
- WEB skin binding is implemented in `Web/App/runtime_skin_p0.css` and loaded after the UI_01/UI_02 layout CSS.
- Static path QA confirms **33 / 33 referenced runtime PNG paths resolve** on the implementation branch.
- Native VST3 may reuse the exact same `Assets/UI/Runtime/Common/*` pieces; no DSP or parameter semantics are encoded in the images.
- Spectrum/EQ/response curves, meter fills and numeric values, motion/path geometry, text and automation state remain live code.

P0 visual assets are an implementation baseline and can receive later art-polish revisions without changing stable control/state IDs.


## 13. P1 implementation status

P1 completed on 2026-10-05.

- **28 logical P1 components**
- **52 individual PNG files**
- P1 manifest: `Assets/UI/Runtime/p1_skin_manifest_v1.json`
- Web skin: `Web/App/runtime_skin_p1.css`
- Live-bound scene pieces: Scene Grid, Start/Closest/End point art, moving car glyph.
- CSS-bound pieces: Logo, UI_01 preset/runtime bars, dividers, dropdown caret, checkbox, meter segment texture, module/macro icons, folder icon.
- Asset-ready but intentionally not force-bound yet: Bypass Toggle, EQ Node, Image Arrows, Gear Icon. These await a matching runtime control rather than adding decorative/non-functional controls.
- Dynamic scene/path/parameter/meter behavior remains code-driven.
- No DSP changes.
\n\n## 13. Runtime P2 completion — 2026-10-05\n\nP2 is implemented as modular runtime assets, not a UI screenshot.\n\n- 26 independent PNG assets added.\n- Signal Flow nodes now have default / bypassed / selected states.\n- UI_01 has a reusable distance callout and a live waveform strip background.\n- Undo / Redo / Copy / Paste / Fullscreen icon families are available and Web-bound.\n- Asset Browser and Advanced Drawer use reusable panel/card chrome.\n- Copy/Paste state and scene fullscreen are functional Web controls.\n- Waveform pixels are drawn live from the analyser; only the strip chrome is raster.\n- No DSP behavior was changed.\n