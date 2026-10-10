# SOURCERUNE Web App — Shared DSP MVP

This is the first functional browser UI shell for both UI_01 and UI_02.

Implemented now:
- UI_01 / UI_02 presentation switch with shared state
- four semantic asset selectors backed by the 224-item V2 catalog
- live source/listener Scene View with 3D/Top presentation switch
- Motion/Bad Signal/Condition/Intelligibility/Ambience/Mix/Speed macros
- Spectrum / Space Response / Signal Flow tabs
- local audio loading, play/pause/stop/loop using the visible Web audition bar
- real shared C++ / WASM / AudioWorklet processing, input/output Peak/RMS and output spectrum
- A/B/C/D in-memory UI snapshots
- scene preset browser wiring
- image-path wiring with graceful fallback while PNGs are absent

Audio is now processed by `Source/DSP/SceneProcessor.cpp`. Open the hosted Web App (HTTPS), choose **LOAD AUDIO → PLAY**, adjust SOURCE Character or TRANSMISSION Bad Signal/Bandwidth Loss, and compare **GLOBAL BYPASS**. PLAY toggles PAUSE. Files stay local.

Supported provisional models: SOURCE 001/002/003/011/040 (earpiece, bottom speaker, speakerphone, walkie, megaphone); TRANSMISSION 001/002/003/005/011 (direct, narrowband, PSTN, GSM bandwidth only, walkie). Other models skip that module and show a pending notice. All 74 presets remain selectable; only supported SOURCE/TRANSMISSION and Mix/Gain currently affect sound. Codec/noise/dropout/Condition/Cover/Motion/Space/Ambience/Intelligibility/EQ and LUFS remain pending. This is not a measured-device or full-scene simulation yet.

Native VST3 uses the same C++ source and has a Linux SDK mini-host checkpoint; macOS/Windows DAW verification remains pending. Build and validation commands: `Source/DSP/README.md` and `Source/Plugin/VST3/README.md`.

## UI state / browser manual acceptance (Web TEST)

These are reproducible **manual checks**, not a claim of completed human visual QA. Run both `?ui=UI_01` and `?ui=UI_02` where relevant.

1. Open **PRESET VISUALS** with no Factory preset selected: the Scene Hero library should show a valid preview (first available entry), with no initialization error.
2. Load a Factory scene, reopen **PRESET VISUALS**: its active Hero must be previewed and marked selected; selecting another Hero loads that preset.
3. Select **SPACE RESPONSE** or **SIGNAL FLOW**, change UI_01/UI_02, Undo/Redo or restore a Snapshot: the active tab button and displayed panel must both match the restored `state.tab`.
4. Load different Factory/User presets, then Undo/Redo or restore a Snapshot: preset dropdown and Scene title must follow the active restored `state.preset` (or show the neutral scene title when no preset is selected).
5. Save a User preset: its newly saved name must appear immediately as the Scene title, with the dropdown selection updated.
6. Compare processed sound with GLOBAL BYPASS; original public parameter IDs and plugin shell geometry remain unchanged. Web transport lives outside the plugin shell.

Fast CI checks source syntax/structure; browser interaction and subjective visual approval are **separate** from CI and require actual Web TEST observation.

## Round macro knob controls (UI_01 and UI_02)

All **visible round macro knobs** share the existing published state IDs and
schema limits: drag **up/down** to adjust, hold **Shift** during drag for fine
movement, hover and scroll for one schema step, use arrow keys / Page Up or Down
/ Home / End, or double-click for the schema default. Each drag is one Undo
entry. The displayed values, Advanced drawer, state recall, and currently
supported AudioWorklet parameters use the same state.

The UI_02 **Ambience** exposed horizontal slider intentionally remains a
horizontal slider. The current-distance display is read-only and derived from
the existing motion parameters. This interaction wiring does **not** imply
that Condition, Ambience, Intelligibility or other unfinished DSP has been
implemented. The VST3 native host currently uses its generic parameter editor;
custom native round knob artwork and full Web/Native parity are still pending.

One-shot real-browser regression evidence is collected in the existing Web
Preview render audit using `Tests/Web/knob_smoke.cjs`. The action may be green
while the optional render-audit step itself failed; always inspect
`Web/App/preview/rendered/render-log.txt` and the fresh
`geometry-report.json` for `UI_01.knobSmoke` and `UI_02.knobSmoke`.

## Main UI metal knobs and adaptive Advanced panel (2026-10-10)

The approved metal knob assets are **visible live elements**, with transparent
input hit targets pinned exactly over their painted faces. Turning a knob on
either main UI does **not** open Advanced: the card header / EDIT does.
The detail dialog is independent of the scaled UI shell, supports click outside,
Escape and CLOSE to dismiss, and grows from compact 470px controls to wider
750px / 940px sections according to actual content (viewport capped).

Web Preview #38025580778 is the real Chromium proof for all 8 UI_01 round
macro knobs and 4 visible UI_02 bottom round knobs. It also verifies the
approved knob PNG actually decodes, shared values and Undo/Redo, and the
Adaptive dialog at 470/750/940px on both layouts. The UI_02 Ambience bar
retains its horizontal slider behaviour. The three scene-area small motion
dials (Speed/Doppler/Width) are included in the subsequent one-shot browser
smoke so their pointer/wheel/keyboard path is explicitly tracked too.

This is Web UI wiring; unsupported DSP and the Native VST3 custom editor
remain pending. No Factory Presets, parameter IDs or approved UI geometry are
changed.

## Active EQ revision (2026-10-10)

Right-side EQ mini graph has exactly 5 draggable nodes: HPF, LPF and Band 1–3 (three peaking filters). Left/right adjusts frequency; up/down adjusts gain for a bell; mousewheel adjusts one schema step, Shift fine drag follows future refinement, double-click resets; one drag is one Undo entry. Every control edits Web shared state and the common C++/WASM sound engine, while the Native VST3 generic editor uses the same shared engine with 23 host params. Legacy Band 4 keys from imported state are ignored, never used as a hidden DSP stage. Final Tone remains a saved parameter only and is still pending sound behavior. The waveform/spectrum display is not the EQ graph.
