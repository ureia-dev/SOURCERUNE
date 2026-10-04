# SOURCERUNE Project Structure

Status: architecture-first skeleton. DSP implementation is intentionally not started yet.

## Design priorities

1. Pro Tools/AAX is a first-class host target, not a later port.
2. VST3 remains a first-class format.
3. Native sample-rate processing is the baseline; oversampling is not part of the default architecture.
4. Audio-thread code must avoid allocation, locks, file I/O, engine construction, and variable-latency changes.
5. Every major scene stage is independently testable and bypassable.
6. Host automation, session recall, offline rendering, timeline jumps, duplicate-track behavior, and deterministic state are architectural requirements.
7. Expensive UI analysis work is isolated from audio processing and must throttle or stop when not visible.
8. Scene changes are prepared off the audio thread and applied clicklessly.

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
│  ├─ UI/
│  └─ Utils/
├─ Assets/
│  ├─ UI/
│  └─ FactoryPresets/
├─ Tests/
│  ├─ Unit/
│  ├─ DSP/
│  ├─ Host/
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

UI grouping may differ, but Signal Flow must mirror the real DSP order.

## Ownership rules

- `Source/Plugin`: JUCE/host boundary only; no acoustic algorithms.
- `Source/Scene`: fixed scene pipeline and cross-module coordination.
- `Source/DSP/*`: independent realtime-safe DSP stages.
- `Source/State`: stable parameter IDs, state schema, migrations, deterministic seeds, snapshots.
- `Source/UI`: UI_01 implementation, meters, interaction; never owns recall-critical DSP state.
- `Tools`: offline calibration/generation/dev utilities; never linked into runtime unless explicitly approved.
- `third_party`: only approved dependencies with license/provenance review.

## Dependency direction

```text
Core
  ↑
DSP modules
  ↑
Scene
  ↑
State / Plugin boundary
  ↑
UI
```

Avoid DSP depending on UI or host-specific code.

## Realtime contract

No normal audio callback path may perform:
- heap allocation/deallocation,
- file/network I/O,
- blocking locks,
- engine/model construction,
- uncontrolled logging,
- UI work,
- plugin-latency changes.

Scene/model changes are prepared off-thread and transitioned with bounded smoothing/crossfades.

## Build/test separation

When implementation begins, DSP/core tests must be buildable without plugin wrappers. AAX-specific integration stays isolated from core DSP. Test categories are intentionally split into Unit, DSP, Host, Performance and Golden-reference checks.

## Change rule

Before adding a new top-level directory or moving ownership between modules, update this document first or in the same commit.
