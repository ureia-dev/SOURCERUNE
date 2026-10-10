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

## EQ / TONE — HPF first (2026-10-10)

The bottom-right **HPF** is a real adjustable stereo 12 dB/oct Butterworth
high-pass (RBJ/W3C biquad), not a static EQ graphic. UI_01 and UI_02 share
existing public parameter `hpf` (20–1000 Hz, 1 Hz step), `EQ_TONE` module
bypass, one gesture per Undo, keyboard and wheel. **20 Hz is exact OFF**;
this preserves previous saved scenes by default. A single C++ header
`Source/DSP/Tone/Hpf.h` implements both the Native stereo stage and the
independent 1538-byte `audio/hpf.wasm` used in Web AudioWorklet after the
original MVP scene module. OFF skips HPF processing and extra buffer copies;
no oversampling, no audio-callback allocations or trig, cutoff changes are
smoothed. The UI response curve shows the HPF only, not a claim that the other
four EQ bands are processing audio.

Web renderer evidence must be read from the committed
`preview/rendered/geometry-report.json` (`knobSmoke.hpf`) and
`render-log.txt`, **not merely Pages success**. Native source supports host
IDs 42 (HPF) and 1102 (EQ bypass) with v1 11-parameter state recall, but an
updated VST3 host package/DAW test must be independently verified. The
remaining LPF, four parametric EQ bands and Final Tone DSP remain PENDING.
Current post-scene HPF is a deliberately scoped MVP stage; moving tone before
MIX in the final full scene chain remains a separate parity milestone.

## Final EQ — exactly three active bands (2026-10-10)

This extends the previously approved real HPF (Tone/Hpf.h) without replacing it: a new shared C++ Tone/Parametric3.h provides 12 dB/oct LPF and **only Band 1, Band 2, Band 3** RBJ peaking EQ; no fourth-band processing. Public b4Freq/b4Gain/b4Q IDs 53–55 are **retired and reserved**, not exposed or renumbered. The 74 existing Factory presets require no rewriting. Neutral bands skip processing, LPF at 20 kHz is an inactive stage, EQ bypass has a bounded low-CPU idle path. Web uses the same C++ standalone EQ WASM loaded by AudioWorklet after the existing HPF; VST3 adds compatible host parameters (23 total) and reads older 11/13-value states. The two Web layouts share HPF + LPF + three draggable EQ graph nodes and Advanced values; Final Tone itself remains state-only. An actual compiled WASM, one-shot browser audit and separate Native/VST3 host evidence are required before claiming each platform is verified.

### WASM render gate (2026-10-10)

The shared low-CPU three-band EQ WASM must be **compiled and instantiated** before the Web Preview reports success; `Source/DSP/Tone/Parametric3Wasm.cpp` now supplies the tiny freestanding memory functions used by clang. Prior Web Preview `38032145505` failed at `env.memcpy` and is **not** a successful deployment. This Web/App README update triggers the existing Pages build, which builds `eq3.wasm`, executes real Chromium UI_01/UI_02 EQ tests, publishes the binary, and saves the true audit log. Its result must be inspected, not inferred from the green job status. No extra safety/stress iterations or tests.

### EQ five-node Chromium gate

In the original one-shot Pages UI audit, `auditMiniEq` must enumerate *all* five nodes with Puppeteer's `$$eval`, not the single-element `$eval`. The initial 2026-10-10 audit failed on that test-harness typo; only the post-fix true Chromium `geometry-report.json`/`render-log.txt` can establish five-point drag and Undo pass. The HTML page/binary/low-CPU DSP are unchanged by this fix.

### Floating EQ interaction parity (2026-10-10)

Approved UX reference only: private VVChain UI_A `assets/ui/candidates/UI_A/UI_A位置與大小說明.md`, `docs/index.html`, `Source/PluginEditor.cpp`, main `e388fa86`. These are **interaction references, never DSP imports**. SOURCERUNE's existing 12 dB/oct HPF, LPF and **exactly 3 Bell bands** retain their own algorithm, state IDs, asset/REF dimensions, and 74 Factory Presets.

`Web/App/eq_interactions.js` (loaded by `app.js`) shares one body-fixed clipped-safe compact floating editor across both UI_01 and UI_02. On EQ hover: short FREQ/GAIN/Q editor; HPF and LPF display FREQ only. Pointer XY: relative logarithmic Freq + relative vertical Bell Gain; Shift fine. Point wheel: Bell Q, HPF/LPF 1 Hz. Popup: direct typed numeric entry (Enter commits/Escape cancels), vertical numeric drag (Shift fine), single-step Freq 1 Hz/Gain 0.1 dB/Q .01 mouse wheel with touchpad-delta accumulation/no acceleration, click outside/hover tunnel and 260 ms safe auto-hide. Bell point double-click resets only Gain=0, preserving Freq and Q; HPF double-click returns OFF at 20 Hz; LPF double-click returns 20 kHz. Graph `eq_graph.js` auto-fits visible +/-6/12/18 dB for the three Bell gains only; **display zoom never modifies audio parameters, automation, recall, curves' response equations or latency**. Point actions are undoable atomic gesture snapshots. VVChain-only Dynamic EQ/M-S/SOLO/type menus are not invented; existing Advanced remains available.

Web Chrome `Tests/Web/knob_smoke.cjs` contains actual hover, wheel, drag, text and dismiss checks in both layouts; after deployment inspect `preview/rendered/geometry-report.json` and `render-log.txt`. The public Native VST3 currently has only generic host parameters, no implemented custom GUI, so native popup/point parity is **PENDING**, not reported as shipped. DSP algorithms and preset files untouched.

### EQ interaction audit correction

Web Preview #38034071507 compiled EQ WASM and deployed Web, but real Chromium did **not** pass: new small-popup smoke incorrectly used Puppeteer `$eval` to call `.map` on one input. Fixed **all three** numeric-field enumerations to `$$eval`; the existing one-shot UI_01/UI_02 browser gate must be rerun and the written render report checked before reporting success. No UI or DSP behavior changed in this correction.
