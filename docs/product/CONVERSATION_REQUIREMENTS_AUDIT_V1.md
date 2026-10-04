# Conversation Requirements Audit V1 — 10 Explicit Passes

This file records ten explicit audit dimensions against the full SOURCERUNE design conversation.

## Pass 1 — Product / signal flow
PASS. Canonical order is preserved:
INPUT → TRANSMISSION → SOURCE → CONDITION → COVER → DISTANCE/MOTION → SPACE → AMBIENCE → INTELLIGIBILITY → TONE → MIX/OUTPUT.
VST3 and WEB remain one shared DSP/state architecture.

## Pass 2 — CPU / realtime / latency
PASS after fixes.
Now explicitly includes:
- inactive-module near-zero work,
- hidden analyzer/UI throttling,
- fixed host-reportable structural latency,
- preallocated variable-delay buffers,
- no realtime allocation/locks/I/O/model construction,
- off-thread scene preparation + bounded smoothing/crossfade,
- native-rate baseline,
- ADAA/band-limited low-CPU nonlinear preference.

## Pass 3 — SOURCE
PASS.
64 semantic SOURCE assets remain present, including the intentionally retained small amp subset.
Model contract now explicitly includes response/resonance, compression, nonlinear behavior and directivity.

## Pass 4 — TRANSMISSION / Bad Signal
PASS after fixes.
24 transmission choices remain.
Advanced schema now restores:
- Bandwidth Loss,
- Noise / Static,
- Dropout / Packet Loss,
- Bitrate Artifacts,
- Interference,
- Signal Compression.
Bad Signal is explicitly medium-aware.

## Pass 5 — CONDITION
PASS after fixes.
Existing NEW / USED / OLD / DAMAGED, Rattle, Buzz, Device Compression and Instability remain.
Restored omissions:
- Imbalance,
- Wow / Flutter,
- Intermittent Contact.

## Pass 6 — WALL/COVER + SPACE
PASS.
32 Cover + 56 Space assets remain.
Engine contract now explicitly covers:
- transmission loss / absorption,
- short reflections,
- panel/cavity resonance,
- edge leakage,
- sparse early reflections,
- FDN-style low-CPU late field,
- outdoor ground/lateral reflections,
- air absorption.

## Pass 7 — MOTION / timeline
PASS.
STATIC / APPROACH / PASS BY / LEAVE / MANUAL, Start/Closest/End, Current Distance, Speed, Doppler, Width, Perspective, Sync and Set Start/Closest/End are retained.
Motion macro behavior now explicitly includes distance, gain, air loss, direct/env balance, width, reflection timing, Doppler and perspective.

## Pass 8 — AMBIENCE / INTELLIGIBILITY / utilities
PASS.
Seed/New Seed, Duck, ambience families, Intelligibility modes, Feedback and Generators remain.
Engine contract now explicitly restores:
- deterministic procedural/endless ambience,
- unintelligible procedural crowd-language texture,
- consonant/transient/detail preservation intent.

## Pass 9 — UI / visual assets / factory scenes
PASS for semantic/UI mapping, with one delivery gap.
Verified:
- UI_01 and UI_02 are distinct first-class layouts,
- 224 semantic visual assets,
- 48 Scene Preset Hero identities,
- 48/48 hero-to-state mappings,
- preset visual browser wiring,
- 64 public advanced controls,
- all factory preset selection IDs and parameter references are valid.

Remaining gap:
- GitHub still contains **0 PNG binaries**. Manifest/style/path/UI bindings exist, but the image files themselves are not committed.

Known current environment proxies in Scene Preset V1:
- Airport Gate → Lobby,
- Highway exterior → Open Field,
- Garage Room → Workshop.

## Pass 10 — State / VST3-WEB parity / research / legal / scope
PASS for contracts; implementation work remains.
Added/verified:
- 64-entry stable public parameter-ID registry,
- host automation/recall/offline/parity/golden requirements,
- deferred-beyond-V1 scope,
- research evidence-ledger methodology,
- provenance/licensing policy and ledger.

## Cross-validation results

- UI control count: **64**
- Scene preset mappings: **48**
- Missing Scene Hero mappings: **0**
- Invalid preset parameter IDs: **0**
- Invalid preset asset references: **0**
- Invalid preset bypass groups: **0**
- JavaScript syntax: **PASS**
- Preset Visuals button: **PASS**
- Factory preset state loader: **PASS**
- Stable parameter registry entries: **64**
- PNG files committed to repo: **0**

## Still pending — not forgotten

1. actual C++ DSP implementation,
2. Wasm + AudioWorklet bridge,
3. native VST3 parameter/automation binding,
4. real LUFS implementation,
5. real WEB/VST3 golden/parity runs,
6. listening/audition tuning of all 48 factory scene presets,
7. committing the actual PNG binaries,
8. large-scale population of the research ledger,
9. GitHub Pages publication for a direct WEB TEST URL.

No item above is marked completed before evidence exists.
