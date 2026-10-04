# SOURCERUNE Project Structure

Status: architecture-first skeleton. DSP implementation is intentionally not started yet.

## Mainline architecture decision

The two mainline targets are:

1. **VST3** — native plugin/DAW target.
2. **WEB** — browser runtime and TEST environment.

Both targets must use the same C++ DSP, Scene, and State code. The WEB build is not a simplified rewrite of the audio engine.

AAX is deferred as a possible secondary target and must not distort the VST3/WEB architecture.

## Design priorities

1. VST3 and WEB are equal first-class targets.
2. Shared DSP/state behavior is the source of truth for both targets.
3. Native sample-rate processing is the baseline; routine oversampling is not part of the default architecture.
4. Audio-thread/worklet code must avoid allocation, locks, file I/O, engine construction, and unbounded work.
5. Every major scene stage is independently testable and bypassable.
6. VST3 host automation/recall and WEB state/transport behavior are architectural requirements.
7. WEB TEST must allow rapid listening and regression checks without a DAW.
8. Expensive UI analysis work stays outside realtime processing.
9. Scene/model changes are prepared outside realtime processing and applied clicklessly.

## Repository visibility / deployment policy

For the current development phase, SOURCERUNE remains a **single public repository**.

- Do not split DSP/Core and WEB into separate repositories at this stage.
- Keep VST3, WEB, DSP, UI, tests, presets and documentation in this repository so build/deploy iteration remains fast.
- WEB TEST remains directly deployable from this repository.
- This is a workflow decision, not a signal-processing decision: VST3 and WEB still share the same C++ DSP/Scene/State implementation.
- If commercial source-protection requirements later outweigh iteration cost, repository separation can be revisited deliberately; it is not part of the current architecture.


## Planned repository layout

```text
SOURCERUNE/
├─ CMakeLists.txt
├─ README.md
├─ cmake/
├─ Source/
│  ├─ Core/
│  ├─ DSP/
│  │  ├─ Source/
│  │  ├─ Transmission/
│  │  ├─ Condition/
│  │  ├─ Cover/
│  │  ├─ Motion/
│  │  ├─ Space/
│  │  ├─ Ambience/
│  │  ├─ Intelligibility/
│  │  └─ Tone/
│  ├─ Scene/
│  ├─ State/
│  ├─ Plugin/
│  │  └─ VST3/
│  ├─ UI/
│  └─ Utils/
├─ Web/
│  ├─ App/                 # Browser UI shell
│  ├─ Wasm/                # Emscripten bindings / C++↔JS boundary
│  ├─ AudioWorklet/        # Realtime browser audio runner
│  ├─ TestHarness/         # Dedicated TEST webpage
│  └─ Assets/              # Web-only static assets
├─ Assets/
│  ├─ UI/
│  └─ FactoryPresets/
├─ Tests/
│  ├─ Unit/
│  ├─ DSP/
│  ├─ VST3/
│  ├─ Web/
│  ├─ Performance/
│  └─ Golden/
├─ Tools/
├─ scripts/
├─ third_party/
└─ docs/
   ├─ architecture/
   ├─ product/
   ├─ research/
   ├─ test/
   └─ legal/
```

## Canonical processing order

```text
INPUT
→ TRANSMISSION
→ SOURCE
→ CONDITION
→ COVER
→ DISTANCE / MOTION
→ SPACE
→ AMBIENCE
→ INTELLIGIBILITY
→ TONE
→ MIX / OUTPUT
```

VST3 and WEB must execute the same canonical order.

## Ownership rules

- `Source/Core`: realtime-safe primitives/common types.
- `Source/DSP/*`: independent realtime-safe DSP stages.
- `Source/Scene`: fixed scene pipeline and cross-module coordination.
- `Source/State`: one parameter/state schema shared by VST3 and WEB.
- `Source/Plugin/VST3`: VST3/JUCE host adapter only; no acoustic algorithms.
- `Source/UI`: reusable product UI concepts/components where practical.
- `Web/Wasm`: thin bindings into shared C++ engine.
- `Web/AudioWorklet`: browser realtime scheduling/transport bridge.
- `Web/App`: browser UI/state shell.
- `Web/TestHarness`: development listening and regression page.
- `Tools`: offline calibration/generation/dev utilities.
- `third_party`: approved dependencies with explicit license/provenance review.

## Dependency direction

```text
Core
  ↑
DSP modules
  ↑
Scene
  ↑
State
  ↑
├─ VST3 adapter
└─ WEB Wasm/Worklet adapter
       ↑
      UIs
```

Neither DSP nor Scene may depend on browser APIs, JUCE editor code, or VST3 host APIs.

## Realtime contract

No normal VST3 audio callback or WEB AudioWorklet DSP path may perform:
- heap allocation/deallocation during steady-state processing,
- file/network I/O,
- blocking locks,
- engine/model construction,
- uncontrolled logging,
- DOM/UI work,
- unbounded per-block work.

Scene/model changes are prepared outside realtime processing and transitioned with bounded smoothing/crossfades.

## WEB TEST requirement

The WEB TEST target is permanent, not throwaway. It must eventually provide:
- local audio-file loading,
- transport/play/stop/loop,
- input/output/bypass comparison,
- access to all public parameters,
- preset/state save/load,
- deterministic seed controls,
- meters and basic analyzer views,
- automated golden/parity tests,
- clear build/version identifier.

## Change rule

Before adding a new top-level directory or moving ownership between modules, update this document first or in the same commit.
