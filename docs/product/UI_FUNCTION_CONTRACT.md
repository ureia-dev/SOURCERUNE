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
- EQ interaction (UI_01 and UI_02 WEB, latest approved 2026-10-10): **mini window NEVER opens floating numeric boxes** on hover, drag, wheel or selected/keyboard focus; popup numeric Freq/Gain/Q belongs only in the **large Focus** window. Mini is direct five-node graph (HPF, Band 1–3, LPF) and has **no standalone HPF range slider**. Earlier behavior superseded. Focus: hover each of the five graph points to show a compact editable numeric box; cut points expose only Frequency, Bell points expose Frequency/Gain/Q. Pointer XY changes Bell frequency/gain, horizontal Frequency for HPF/LPF; Shift enables fine drag. Point wheel changes Bell Q (VVChain-style signed direction) or cut frequency. Numeric rows allow click-to-type, Enter commit/Escape cancel, vertical drag/Shift fine, one-step wheel with delta accumulation (Freq 1Hz, Gain .1dB, Q .01); bell double-click resets **Gain only**. Popup follows node and safely auto-hides after leaving node-to-popup tunnel. Entire drag creates one Undo history entry. EQ graph visual Y axis is always fixed at +/-24dB (no auto +/-6/12/18 switching; the approved 2026-10-10 visual override); values beyond the visible scale may be clipped visually but their real Freq/Gain/Q and DSP ranges are never restricted, altered or silently clamped. Graph zoom affects no state/preset/automation/latency.
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

### Latest user update: selected mini EQ numeric row and new filter proposals (2026-10-10)

- On the lower **inside area of the small EQ card** (user red annotation), keep a **permanent compact band selector and FREQ / GAIN / Q controls**. Selecting a graph point changes the field mapping: B1/B2/B3 show their real live Freq/Gain/Q; HPF/LPF show live Frequency but disabled GAIN/Q, because current shared DSP does not have shelf gain or cutoff Q. Mouse wheel one existing parameter-schema step, upward/downward relative drag with Shift fine, click and type Enter/Escape, one atomic Undo per drag; no small popup on hover/click; Focus still has existing float info. Avoid resizing the parent REF card. User image `image(5).png` shows specifically the bottom blank area and must be interpreted as numeric editing, not another stand-alone filter bar.
- Source for EQ analyzer appearance is **chen2622113/VVChain** main `5767e459`, `docs/index.html` `drawEQ()` and `Source/PluginEditor.cpp`: existing SOURCE logarithmic/power/smoothing analyzer is extended by identical monotone Cubic Hermite visual interpolation; no extra FFT/C++/audio computation.
- User explicitly requests **HPF slope wheel cycling through exactly 6, 12, 18, 24, 32, 48, 96 dB/oct**, plus **HPF↔High Shelf** and **LPF↔Low Shelf** modes. They **change the actual sound**; they MUST NOT be UI-only fake controls. Current 12 dB/oct cut DSP is locked under `DSP_FREEZE_AND_RESTORE_POLICY.md`. Prepare separate exact C++/WASM/Native public-state design and PRE/REVIEW validation before requesting authorization. Especially **32 dB/oct cannot honestly be presented as an ordinary exact integer 6 dB/oct cascade** and needs a precisely approved special design. This work is `NEEDS-DSP-APPROVAL` until then; no schema IDs, Native values, Factory preset or filter coefficients changed by the mini UI PR.
- The latest physical interface remains five color-coded nodes; visible markers keep tiny well-proportioned sizes, no opaque black focus rectangle, both mini and Focus ±24dB FIXED.

### Latest 5-point compact EQ / VVChain visual analyzer override (2026-10-10)

**This newer user instruction supersedes all historical mini HPF slider and mini popup descriptions.** The right-bottom small EQ graph has all **five independently draggable nodes: HPF, B1, B2, B3, LPF**. There is no separate HPF control bar; compact text status under the graph is non-interactive and reflects only the two cutoffs. Hover/drag/focus/wheel in small EQ never creates a floating value editor or an opaque black selection rectangle. The larger Focus editor **does** retain the bound hover numeric Freq/Gain/Q editor and all eleven working parameter dials. Single parameter state and Undo/Redo remain unchanged.

**Exact vibrant reference palette** on EQ visual: HPF green #22c55e, Band 1 red #ef4444, Band 2 yellow #facc15, Band 3 blue #3b82f6, LPF pink #f472b6, plus a five-stop response gradient. Keep visible nodes very small with independent transparent 18/22px pointer hit areas. No opaque box around focused/selected ellipse; use an unobtrusive colored node rim for focus.

**Spectrum display reference**: read chen2622113/VVChain private docs/index.html as a visual/analyzer-only reference, not as DSP or audio processing source. Use logarithmic 20Hz–20kHz spacing, nearby power-bin aggregation/interpolation, seven-tap weighted frequency smoothing and asymmetric visual attack/release, lightly filled translucent graph with a subtle trace behind the true EQ frequency response. Reuse **existing** SOURCERUNE post-DSP outAn AnalyserNode samples and one FFT read per main spectrum frame; no second AudioContext, FFT, new audio node, new C++ filter, DSP path alteration or artificial frequency spectrum. One visual update per ~42ms only while playing/visible; stop and clear when paused. **±24dB is EQ response display only, not analyzer amplitude scale nor DSP Gain range.**

Scope is Web UI_01/UI_02 graph presentation + gestures only. Native custom graphical editor and true Host visual parity remain PENDING, and Final Tone/slope extensions remain PENDING. Required verification: Fast DSP guard/CI plus one existing real Chromium Web Preview smoke in both layouts, including actual HPF C++ WASM audio smoke. Keep REF card bounds unchanged.
### Latest EQ visual + control resolution (2026-10-10, supersedes fixed ±12)

- **Approved target** is the professionally proportioned five-point EQ shown in the recent user-approved concept. The real small card and larger Focus reuse a single SVG / existing shared DSP with just HPF, Bell Band 1–3, LPF. Two displays show the very same **fixed ±24 dB graph range**, no automatic gain-dependent zoom; true Bell Gain remains **−18 to +18 dB** and filtering/stereo/CPU algorithm remains unchanged. No fabricated 24 dB/oct controls: actual HPF/LPF is **fixed 12 dB/oct** as presently implemented.
- Render thin smoothly antialiased five-color response gradient (from the actual EQ response, not a fake FFT), faint response-area fill, low-contrast frequency + dB grid. Visible point diameter ~4.5px mini and ~6.9px Focus with independent transparent hit regions ~18px / 22px. Use CSS-pixel-correct ellipse radii to counteract non-uniform SVG preserveAspectRatio=none. Zoom transitions and viewport resize recalculate actual radii. Colors and small dots follow the accepted reference but avoid excessive neon contrast.
- Focus includes **11 working controls** HPF Freq, B1–B3 Freq/Gain/Q, LPF Freq; distinct from merely decorative renderer. Reuse the existing VVChain-inspired gestures (vertical drag, Shift fine, wheel incremental, Arrow keys, double-click default, numeric hover/click/edit). Each control writes the existing state and calls the original AudioWorklet update, never a second DSP, and participates in a single atomic Undo/Redo transaction. ARIA slider min/max/value and keyboard activation of numeric editor are included in the final review pass.
- Analytic 10+10+10 coordinate tests and two actual browser correction/review gates are recorded in `docs/product/reference/EQ_24DB_MOUSE_PRECISION_AUDIT_20261010.md`. PR [#104](https://github.com/ureia-dev/SOURCERUNE/pull/104) merged at `22674d4c`; Fast #38047626674 passed DSP protected-path guard and existing bounded DSP smoke. True [Web Preview #38047739428](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38047739428), saved report source commit `22674d4c`, **UI_01 & UI_02 geometry.ok, eqMouse.ok and eqFocus.ok true**; mini visible 4.4–4.5 px circle, Focus 6.9 px circle, 11 true knobs, Bell Q wheel, Undo/Redo, fixed range 24 on several Gain cases, true audio engine unchanged. **最終兩次修正真 Chrome 已完成 PASS**：PR [#105](https://github.com/ureia-dev/SOURCERUNE/pull/105) 合併 `c2a03a1f8f7ec2d8def4d2351d9589b1d3fef6fb`，Fast #38048132628 PASS；[Web Preview #38048168497](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38048168497) `geometry-report.json` source `c2a03a1f`，UI_01、UI_02 `geometry.ok`、`knobSmoke.eq.ok`、`eqMouse.ok`、`eqFocus.ok` 均 true，特別 `eqFocus.accessibleSliders=true`、`keyboardPopup=true`。兩版 11 個控制均有 ARIA slider min/max/value/text、鍵盤 Q 調整 Undo 正常、Enter 進入數值編輯；render log 結尾 `render audit completed successfully`，網站部署成功。既存非阻塞 localhost 初次 curl failed 和一筆 404 仍另案。**DSP changed NO；Native EQ 圖形 Host 尚 PENDING**。
- The concept image shows extra filter-mode, phase and per-band bypass UI. Those are **NOT REAL SOURCERUNE DSP features** today and must not appear as fake working controls. Native VST3 custom graphical editor, phase view, altered filter slope and final Tone DSP remain PENDING unless separately approved and implemented under DSP freeze.

### EQ Zoom In / Focus editor — WEB IMPLEMENTED & CHROMIUM VERIFIED; NATIVE GUI PENDING

Decision 2026-10-10, implementation PR #102: retain existing right-bottom EQ card and its five fully working Web control nodes unchanged. Added **one Zoom In icon button in the EQ card header** adjacent to existing EQ Power (without moving the existing Power, graph, or REF card bounds). This is **not** a gain-range zoom; **as of PR #104, both mini and Focus graph axes stay fixed +/-24dB**, regardless of the actual Bell Gain range.

- **Surface**: show a single larger floating EQ Focus panel **inside the existing plugin/app window**, not another OS-native plugin instance, browser tab, popup window or AudioContext. Default logical size target 900x500px at the UI's reference coordinate scale, centre-aligned above the two layouts; max 90% of the available internal plugin width/height and fallback responsive scaling as needed. Its header can be repositioned within plugin bounds, with a minimum visible header; no automatic host resizing is required. Preserve all UI_01/UI_02 REF geometry and the original mini EQ. Use muted existing graphical style instead of inventing a new PNG or a wholesale redesign.
- **Focus panel controls**: EQ / TONE title, same on/off state, Zoom Out/Close (X), large logarithmic frequency graph 20Hz–20kHz and fixed labelled +24,+12,0,-12,-24dB Y lines. Five draggable SVG points: HPF, Band 1, Band 2, Band 3, LPF. Enlarged Freq/Gain/Q live readouts for Bell 1–3 and Freq only for HPF/LPF. Reuse existing VVChain-inspired hover float numeric editor, click-to-type Enter/Escape, horizontal Freq/vertical Gain, Shift fine, Q-wheel, popup-row-wheel, Bell double-click Gain 0 and atomic Undo/Redo. Final Tone remains pending sound function and must not be presented as implemented.
- **ONE shared live state**: mini and focus are two presentation sizes for *the same* `state.params`, stable public parameter IDs, existing AudioWorklet/C++ DSP and Presets. Editing in focus immediately updates the mini graph and all external/Advanced values; closing focus preserves all modifications. Never copy/mirror independent EQ state, never add a second processing stage. Only the frontmost graph processes mouse gestures; underlying mini graph stays visible but inactive while focus is open. Opening/closing never creates Undo/history entries. A/B snapshots, reset, preset load, UI_01/UI_02 switching, global bypass, host automation and state recall must not leave stale control values.
- **Architecture/performance**: `eq_graph.js` remains the single curve generator; existing `eq_interactions.js` must support an active graph instance/switchable root and clean unregister on popup close/re-render. Avoid a second permanent SVG event binding, duplicate global listeners, second FFT, polling, continuous animation loops, per-sample graph work or DSP/oversampling changes. Recompute render-only response only on relevant EQ state updates. Small popup currently renders on document body and needs correct focus overlay stacking (float editor above focus); focus panel should use a single logical plugin coordinate system even if the outer UI scales via CSS transforms.
- **Accessibility/escape**: header button has Zoom In accessible label; clear keyboard-focus order; on opening move focus into Focus title/control; Esc first cancels an active numeric edit, otherwise closes Focus and restores focus to Zoom In; Close/Zoom Out explicitly restores keyboard focus. Pointer drag captures/release correctly even if exited panel; prevent underlying `data-open=EQ_TONE` Advanced click from firing. Disabled/interrupted drag must not leave captured pointer or half-written Undo.
- **Acceptance before DONE**: UI_01 & UI_02 one-shot real Chromium test on approved reference viewports: fixed +/-24dB before, during & after editing; open/close/reopen, 5 draggable graph nodes, Q wheel on Bell only, tooltip/edit typing, Shift fine, Bell double-click and atomic Undo/Redo, no card overflow/other controls covered when closed; test keyboard focus, background mini gesture suppression, viewport-scaled coordinates and state/preset persistence; verify existing 74 Factory Presets, HPF/LPF and three C++ bands unchanged. Native VST3 custom EQ UI is not implemented yet, so **Native Zoom panel parity and Host verification = PENDING**, never claim Web gate proves Native readiness.

**Actual Web release evidence**: PR [#102](https://github.com/ureia-dev/SOURCERUNE/pull/102) merged as `dacad91676e92c6bc555b36ab2437ef65624ee61`; original Fast CI #38037200663 including DSP protected-path guard PASS. Real Chromium [Web Preview #38037254808](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38037254808) `geometry-report.json` source commit `dacad916`: UI_01 & UI_02 `knobSmoke.eqFocus.ok=true`, five points present on the exact moved interactive SVG, mini graph inert and same response, B2 Gain draggable +0.0→+1.6 dB, Q wheel 1→0.90, undo/redo, reopen, popup readout, Escape, Zoom Out, X, resized viewport containment and fixed ±12 all pass; written `render-log.txt` ends `render audit completed successfully`. Visual baseline/geometry audits also PASS; an existing non-blocking HTTP 404 remains independently pending. The full exact host/browser accessibility, preset/import and Native VST3 custom editor are separately marked PENDING when not measured. Implementation `Web/App/eq_focus.js`, `eq_focus_v1.css`, `app.js`, `eq_interactions.js` and original unchanged `eq_graph.js`. **DSP changed: NO**, no new DSP restore point was needed; no Source/DSP/AudioWorklet/Native/preset changes. **This subfeature is WEB DONE only; Native custom editor/Host and other EQ/Tone gaps remain PENDING**.
