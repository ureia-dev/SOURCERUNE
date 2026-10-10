# Native VST3 MVP

Linux x86_64 bundle built and loaded in the SDK mini-host. This is **not** macOS/Windows, full Steinberg validator, commercial DAW, user audition or release acceptance. Native UI_01/UI_02 embedding remains pending; use a host's generic parameter editor. Web remains available at https://ureia-dev.github.io/SOURCERUNE/Web/App/ .

The plugin directly links `Source/DSP/SceneProcessor.cpp`; no second algorithm. Mono/stereo 32-bit float, 8–192 kHz advertised (48 kHz stereo tested), zero structural latency. Eleven exposed parameters: six DSP controls, two model selectors, two module bypasses, global bypass. Other public IDs remain reserved, not silently renumbered. Native numerical mappings are in `Source/State/NativeParameterIds.h`.

State format: little-endian magic `0x53524E31`, version `1`, eleven normalized doubles in that header's order. Invalid/truncated/out-of-range state is rejected before mutation. Recall supports this MVP state only, not Web JSON or all 74 Factory scenes yet. Model selection uses the same discrete normalization as SDK StringListParameter. Automation is **block-rate** (last queue point), smoothed by the shared DSP; sample-offset automation is pending.

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

One SDK mini-host case verifies actual bundle/factory loading, 11 unique IDs and defaults, stereo audio against the shared core, block parameter changes, exact bypass, state save/restore and offline audio parity. It does not automatically run in Fast. SDK automatic full validator is off to avoid adding an unapproved safety/stress suite; existing project test gates and counts are unchanged.

Next: approved macOS/Windows Release build runners, DAW load/recall verification, sample-accurate automation, full state/preset parity and native UI integration. Pro Tools requires a later AAX target, not this VST3.
