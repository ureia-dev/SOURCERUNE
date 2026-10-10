# Native VST3 MVP

Linux x86_64 bundle built and loaded in the SDK mini-host. This is **not** macOS/Windows, full Steinberg validator, commercial DAW, user audition or release acceptance. Native UI_01/UI_02 embedding remains pending; use a host's generic parameter editor. Web remains available at https://ureia-dev.github.io/SOURCERUNE/Web/App/ .

The plugin directly links `Source/DSP/SceneProcessor.cpp`; no second algorithm. Mono/stereo 32-bit float, 8–192 kHz advertised (48 kHz stereo tested), zero structural latency. The previous eleven host parameters keep their original stable IDs; the HPF stage adds IDs **42 (HPF cutoff 20–1000 Hz)** and **1102 (EQ/TONE bypass)**, for thirteen exposed parameters. The HPF is implemented in shared C++ and placed after the current scene-MVP mix. Host testing of this expanded version remains PENDING. Other public IDs remain reserved, not silently renumbered. Native numerical mappings are in `Source/State/NativeParameterIds.h`.

State format: little-endian magic `0x53524E31`, current version **`2`** with thirteen normalized doubles in that header's order. The reader still accepts old **version `1` / 11-double** projects and supplies neutral HPF defaults (20 Hz OFF). Invalid/truncated/out-of-range state is rejected before mutation. Recall supports this MVP state only, not Web JSON or all 74 Factory scenes yet. Model selection uses the same discrete normalization as SDK StringListParameter. Automation is **block-rate** (last queue point), smoothed by the shared DSP; sample-offset automation is pending.

## Build (Release tier; manual)

Requires CMake 3.25+, C++20 compiler, network for the first SDK fetch. Official SDK 3.8.1 commit is pinned in root CMake; its MIT notice is copied into the bundle. No DAW directories are written and no plugin symlinks are installed.

```sh
cmake -S . -B build/native -DCMAKE_BUILD_TYPE=Release -DSOURCERUNE_BUILD_HOST_SMOKE=ON
cmake --build build/native --config Release --target SOURCERUNE sourcerune_host_smoke
```

For an existing SDK checkout with submodules, pass `-DSOURCERUNE_VST3_SDK=/absolute/path/to/vst3sdk`.

Linux output: `build/native/VST3/Release/SOURCERUNE.vst3`. Windows/macOS CMake paths and bundles are **not yet validated**; no installation or signing claim.

## Bounded integration check (Deep tier; manual)

```sh
build/native/bin/Release/sourcerune_host_smoke "$PWD/build/native/VST3/Release/SOURCERUNE.vst3"
```

One SDK mini-host case verifies actual bundle/factory loading, the original 11 IDs/defaults (the source for 13-ID checks is updated but the expanded bundle still needs a new mini-host run), stereo audio against the shared core, block parameter changes, exact bypass, state save/restore and offline audio parity. It does not automatically run in Fast. SDK automatic full validator is off to avoid adding an unapproved safety/stress suite; existing project test gates and counts are unchanged.

Next: approved macOS/Windows Release build runners, DAW load/recall verification, sample-accurate automation, full state/preset parity and native UI integration. Pro Tools requires a later AAX target, not this VST3.

**2026-10-10 acceptance boundary:** Web AudioWorklet actual shared-HPF WASM confirmed at 48kHz ([Web Preview #38031171637](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38031171637)); the Native VST3 **source and host parameter mapping** were updated, but a newly built 13-parameter native VST3 bundle loaded in a real Host is **PENDING**, not established by the previous 11-parameter SDK smoke. Sample-offset automation and fully custom UI_01/UI_02 Native editor remain pending.
