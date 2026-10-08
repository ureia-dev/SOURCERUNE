# SOURCERUNE Web App — UI Foundation V1

This is the first functional browser UI shell for both UI_01 and UI_02.

Implemented now:
- UI_01 / UI_02 presentation switch with shared state
- four semantic asset selectors backed by the 224-item V2 catalog
- live source/listener Scene View with 3D/Top presentation switch
- Motion/Bad Signal/Condition/Intelligibility/Ambience/Mix/Speed macros
- Spectrum / Space Response / Signal Flow tabs
- local audio loading, play/stop/loop
- real pass-through Peak/RMS metering and spectrum from Web Audio
- A/B/C/D in-memory UI snapshots
- scene preset browser wiring
- image-path wiring with graceful fallback while PNGs are absent

Important: current audio is intentionally **pass-through**. No fake browser DSP is implemented. The next DSP phase must connect the shared C++ engine through Wasm/AudioWorklet.

## UI state / browser manual acceptance (Web TEST)

These are reproducible **manual checks**, not a claim of completed human visual QA. Run both `?ui=UI_01` and `?ui=UI_02` where relevant.

1. Open **PRESET VISUALS** with no Factory preset selected: the Scene Hero library should show a valid preview (first available entry), with no initialization error.
2. Load a Factory scene, reopen **PRESET VISUALS**: its active Hero must be previewed and marked selected; selecting another Hero loads that preset.
3. Select **SPACE RESPONSE** or **SIGNAL FLOW**, change UI_01/UI_02, Undo/Redo or restore a Snapshot: the active tab button and displayed panel must both match the restored `state.tab`.
4. Load different Factory/User presets, then Undo/Redo or restore a Snapshot: preset dropdown and Scene title must follow the active restored `state.preset` (or show the neutral scene title when no preset is selected).
5. Save a User preset: its newly saved name must appear immediately as the Scene title, with the dropdown selection updated.
6. Confirm no change to audio pass-through, DSP, control parameter IDs, original REF geometry or native UI layout.

Fast CI checks source syntax/structure; browser interaction and subjective visual approval are **separate** from CI and require actual Web TEST observation.
