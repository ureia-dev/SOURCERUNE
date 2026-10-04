# SOURCERUNE

SOURCERUNE is an audio-post/worldizing scene processor focused on source transformation, transmission, occlusion, distance and motion, acoustic space, ambience, intelligibility, and reliable recall.

## Mainline targets

SOURCERUNE now has two equal mainline runtime targets:

- **VST3** — native DAW/plugin build.
- **WEB** — browser test/product runtime built from the same C++ DSP core through WebAssembly.

AAX is not part of the current mainline. It may be added later as a secondary target without changing the core DSP architecture.

## Architecture rules

- C++20 shared DSP/scene/state core.
- VST3 and WEB must share algorithms and parameter/state definitions; no separate "web-only sound".
- WEB audio processing must run through WebAssembly/AudioWorklet, not the browser UI thread.
- Low-CPU native sample-rate processing; no routine oversampling baseline.
- Deterministic state/render behavior where applicable.
- Modular scene engine with directly testable DSP stages.
- WEB has a dedicated TEST harness for fast listening, regression, and parameter verification.

See:
- `docs/architecture/PROJECT_STRUCTURE.md`
- `docs/architecture/STRUCTURE_REVIEW_100.md`
- `docs/architecture/WEB_RUNTIME.md`
