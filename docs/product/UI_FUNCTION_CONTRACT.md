# SOURCERUNE UI Function Contract

SOURCERUNE ships with two first-class UI layouts:

- `UI_01`
- `UI_02`

Both layouts control the **same DSP engine, same parameter IDs, same state schema, same presets, and same VST3/WEB behavior**. A UI layout is never allowed to create a second sound implementation.

## Shared required functions

Both UI_01 and UI_02 must expose the following product functions.

### Global
- Global bypass.
- Input and output gain where defined by the product state.
- Main MIX: Original ↔ Full Scene.
- Preset load/save.
- A/B/C/D scene snapshots.
- Undo/redo where supported by the runtime.
- Visible build/version identifier in WEB TEST.

### SOURCE
- Source/device model selector.
- Device/source character amount where the selected model supports it.
- Per-module bypass.
- Always-visible current source/model name.

### TRANSMISSION
- Clean / Telephone / Cellular / Low-Bitrate Call / AM-FM-like / Walkie / Dispatch-style Radio / Intercom / Bad Reception / VoIP-style families.
- Bad Signal amount.
- Dropout / packet-loss / interference behavior through simplified product controls.
- Per-module bypass.

### CONDITION
- Device condition: NEW / USED / OLD / DAMAGED or normalized 0–100 mapping.
- Rattle/buzz/compression/instability behavior as model-appropriate.
- Per-module bypass.

### WALL / COVER
- Cover/material selector.
- Amount 0–100.
- Material transmission / resonance / leak behavior through the shared DSP engine.
- Per-module bypass.

### DISTANCE + MOTION
- STATIC.
- APPROACH.
- PASS BY.
- LEAVE.
- MANUAL.
- Start Distance.
- Closest Distance.
- End Distance.
- Current Distance in metres.
- Speed in real units (km/h).
- Doppler 0–100.
- Width/Perspective control.
- DAW/host timeline sync when available.
- WEB TEST equivalent transport timeline.
- Set Start / Set Closest / Set End workflow.
- Per-module bypass where technically meaningful.

### SPACE / ENVIRONMENT
- Space/environment selector.
- Indoor / outdoor / vehicle families.
- Direct / Early / Tail balance internally represented.
- Space amount / decay / character controls exposed according to approved UI.
- Per-module bypass.

### AMBIENCE
- Ambience type selector.
- Level.
- DUCK.
- Deterministic Seed.
- New Seed.
- Per-module bypass.

### INTELLIGIBILITY
- Intelligibility 0–100.
- Approved mode choices.
- Dialogue/detail preservation without defeating the scene.
- Per-module bypass.

### EQ / TONE
- Advanced final tone section.
- HPF.
- LPF.
- **3-band EQ**: exactly Band 1–3 (Freq / Gain / Q); older Band 4 retired and never processed. The HPF and LPF remain independent stages.
- Final tone shaping.
- Per-module bypass.

### Analysis / visual feedback
- Spectrum: input/output comparison.
- Space Response: Direct / Early / Tail view.
- Signal Flow: actual DSP order, never a fake UI-only order.
- IN / OUT meters.
- Peak.
- RMS.
- LUFS.
- Important numeric values remain visible; do not hide essential values behind hover-only behavior.

## Runtime parity

### VST3
- Host automation.
- Stable parameter IDs.
- Save/reopen recall.
- Duplicate/copy behavior.
- Offline render.
- Timeline locate/jump behavior.

### WEB
- Same public processing parameters.
- Same scene/state semantics.
- Local audio file loading in TEST.
- Play/stop/loop/seek in TEST.
- Parameter/state import/export.
- Deterministic seed control.
- Meter/analyzer parity where practical.
- WebAssembly + AudioWorklet realtime engine.

## Non-negotiable rule

A function may be presented differently in UI_01 and UI_02, but a layout must not silently omit a core processing capability. If a control is collapsed into Advanced, the underlying parameter must still exist and remain recall-safe.
