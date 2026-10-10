# Native VST3 MVP

Linux x86_64 bundle built and loaded in the SDK mini-host. This is **not** macOS/Windows, full Steinberg validator, commercial DAW, user audition or release acceptance. Native UI_01/UI_02 embedding remains pending; use a host's generic parameter editor. Web remains available at https://ureia-dev.github.io/SOURCERUNE/Web/App/ .

The plugin directly links `Source/DSP/SceneProcessor.cpp`; no second algorithm. Mono/stereo 32-bit float, 8–192 kHz advertised (48 kHz stereo tested), zero structural latency. The original eleven host parameters retain their stable IDs. Current main exposes **23 parameters**, adding HPF (42), EQ/TONE bypass (1102), LPF (43), and three Bell bands (44–52). Shared C++ Tone processing follows the scene-MVP mix. Host testing of this expanded version remains PENDING. Other public IDs remain reserved, not silently renumbered. Native numerical mappings are in `Source/State/NativeParameterIds.h`.

State format: little-endian magic `0x53524E31`, current version **`3`** with twenty-three normalized doubles in that header's order. The reader accepts previous version 1 (11 values) and version 2 (13 values), supplying defaults for the newly added controls. Invalid/truncated/out-of-range state is rejected before mutation. Recall supports this MVP state only, not Web JSON or all 74 Factory scenes yet. Model selection uses the same discrete normalization as SDK StringListParameter. Automation is **block-rate** (last queue point), smoothed by the shared DSP; sample-offset automation is pending.

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

One SDK mini-host case verifies actual bundle/factory loading, all 23 stable IDs/defaults (test source updated on main; the expanded bundle still needs a new mini-host run), stereo audio against the shared core, block parameter changes, exact bypass, state save/restore and offline audio parity. It does not automatically run in Fast. SDK automatic full validator is off to avoid adding an unapproved safety/stress suite; existing project test gates and counts are unchanged.

## Downloadable previews (manual Release)

The user approved the Mac/Windows Release matrix on 2026-10-10. In GitHub Actions → **SOURCERUNE CI** → **Run workflow**, choose the intended branch and `validation_level: release`. Fast and Deep must pass first. Release then builds macOS universal (arm64 + x86_64, deployment target 11.0) and Windows x64, runs the existing bounded SDK host once on each runner, and uploads a ZIP plus SHA-256 checksum for 30 days. PRs still run Fast only.

Mac uses the standard `macos-15` runner; Windows uses `windows-2022` and VS 2022. Runner labels: https://docs.github.com/en/actions/reference/runners/github-hosted-runners . The Mac ZIP preserves bundle permissions with `ditto`; both packages include `INSTALL.txt`, the exact source commit and the SDK license. Upload is gated on build, host and packaging success. Mac checks both binary architectures but runs the host only in the runner's native architecture.

These are MVP previews: Mac is ad-hoc signed, not Developer ID signed or notarized. Windows is unsigned and may need the Microsoft Visual C++ x64 runtime. No signing secrets are required. No automated DAW installation, full validator, extra stress rounds or GitHub Release publication is added. Cross-platform builds remain **pending until a successful manual run is recorded**.

Next: run this approved manual Release, then DAW load/recall verification, sample-accurate automation, full state/preset parity and native UI integration. Pro Tools requires a later AAX target, not this VST3.
