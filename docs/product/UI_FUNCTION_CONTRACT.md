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
- EQ interaction (UI_01 and UI_02 WEB): hover each of the five graph points to show a compact editable numeric box; cut points expose only Frequency, Bell points expose Frequency/Gain/Q. Pointer XY changes Bell frequency/gain, horizontal Frequency for HPF/LPF; Shift enables fine drag. Point wheel changes Bell Q (VVChain-style signed direction) or cut frequency. Numeric rows allow click-to-type, Enter commit/Escape cancel, vertical drag/Shift fine, one-step wheel with delta accumulation (Freq 1Hz, Gain .1dB, Q .01); bell double-click resets **Gain only**. Popup follows node and safely auto-hides after leaving node-to-popup tunnel. Entire drag creates one Undo history entry. EQ graph visual Y axis is always fixed at +/-12dB (no auto +/-6/12/18 switching); values beyond the visible scale may be clipped visually but their real Freq/Gain/Q and DSP ranges are never restricted, altered or silently clamped. Graph zoom affects no state/preset/automation/latency.
- Native VST3 generic host parameters are exposed but Native custom graphical editor/mouse parity is **PENDING**; never equate Web editor evidence with Native. VVChain-specific Dynamic EQ/M-S/SOLO/curve menu is **not** a requested SOURCE EQ parameter or signal-processing feature.

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

### EQ Zoom In / Focus editor — APPROVED PLANNING ONLY, NOT YET IMPLEMENTED

Decision 2026-10-10: retain existing right-bottom EQ card and its five fully working Web control nodes unchanged. Add **one Zoom In icon button in the EQ card header** adjacent to existing EQ Power (without moving the existing Power, graph, or REF card bounds). This is **not** a gain-range zoom and does not alter the fixed +/-12dB axis.

- **Surface**: show a single larger floating EQ Focus panel **inside the existing plugin/app window**, not another OS-native plugin instance, browser tab, popup window or AudioContext. Default logical size target 900x500px at the UI's reference coordinate scale, centre-aligned above the two layouts; max 90% of the available internal plugin width/height and fallback responsive scaling as needed. Its header can be repositioned within plugin bounds, with a minimum visible header; no automatic host resizing is required. Preserve all UI_01/UI_02 REF geometry and the original mini EQ. Use muted existing graphical style instead of inventing a new PNG or a wholesale redesign.
- **Focus panel controls**: EQ / TONE title, same on/off state, Zoom Out/Close (X), large logarithmic frequency graph 20Hz–20kHz and fixed labelled +12,+6,0,-6,-12dB Y lines. Five draggable SVG points: HPF, Band 1, Band 2, Band 3, LPF. Enlarged Freq/Gain/Q live readouts for Bell 1–3 and Freq only for HPF/LPF. Reuse existing VVChain-inspired hover float numeric editor, click-to-type Enter/Escape, horizontal Freq/vertical Gain, Shift fine, Q-wheel, popup-row-wheel, Bell double-click Gain 0 and atomic Undo/Redo. Final Tone remains pending sound function and must not be presented as implemented.
- **ONE shared live state**: mini and focus are two presentation sizes for *the same* `state.params`, stable public parameter IDs, existing AudioWorklet/C++ DSP and Presets. Editing in focus immediately updates the mini graph and all external/Advanced values; closing focus preserves all modifications. Never copy/mirror independent EQ state, never add a second processing stage. Only the frontmost graph processes mouse gestures; underlying mini graph stays visible but inactive while focus is open. Opening/closing never creates Undo/history entries. A/B snapshots, reset, preset load, UI_01/UI_02 switching, global bypass, host automation and state recall must not leave stale control values.
- **Architecture/performance**: `eq_graph.js` remains the single curve generator; existing `eq_interactions.js` must support an active graph instance/switchable root and clean unregister on popup close/re-render. Avoid a second permanent SVG event binding, duplicate global listeners, second FFT, polling, continuous animation loops, per-sample graph work or DSP/oversampling changes. Recompute render-only response only on relevant EQ state updates. Small popup currently renders on document body and needs correct focus overlay stacking (float editor above focus); focus panel should use a single logical plugin coordinate system even if the outer UI scales via CSS transforms.
- **Accessibility/escape**: header button has Zoom In accessible label; clear keyboard-focus order; on opening move focus into Focus title/control; Esc first cancels an active numeric edit, otherwise closes Focus and restores focus to Zoom In; Close/Zoom Out explicitly restores keyboard focus. Pointer drag captures/release correctly even if exited panel; prevent underlying `data-open=EQ_TONE` Advanced click from firing. Disabled/interrupted drag must not leave captured pointer or half-written Undo.
- **Acceptance before DONE**: UI_01 & UI_02 one-shot real Chromium test on approved reference viewports: fixed +/-12dB before, during & after editing; open/close/reopen, 5 draggable graph nodes, Q wheel on Bell only, tooltip/edit typing, Shift fine, Bell double-click and atomic Undo/Redo, no card overflow/other controls covered when closed; test keyboard focus, background mini gesture suppression, viewport-scaled coordinates and state/preset persistence; verify existing 74 Factory Presets, HPF/LPF and three C++ bands unchanged. Native VST3 custom EQ UI is not implemented yet, so **Native Zoom panel parity and Host verification = PENDING**, never claim Web gate proves Native readiness.

This is the **locked implementation plan**, not a claim that the Zoom In button/focus panel currently exists. A later user request to implement/deploy should work from this plan rather than change the EQ filter algorithms.
