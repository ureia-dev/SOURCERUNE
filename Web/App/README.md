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
