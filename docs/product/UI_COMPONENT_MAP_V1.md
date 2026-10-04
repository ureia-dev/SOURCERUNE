# SOURCERUNE UI Component Map V1

Status: **COMPLETE FUNCTION-PARTITION BASELINE**

Both UI_01 and UI_02 expose the same approved product capabilities and state IDs. Presentation differs; sound/state semantics do not.

## Shared global controls
Global Bypass; Input Gain; Output Gain; Original ↔ Full Scene Mix; factory scene preset load; user preset save/load; state Import/Export; A/B/C/D snapshots; Undo/Redo; build/runtime status; local WEB audio load; Play/Stop/Loop/Seek; deterministic Seed; DAW/WEB Sync.

## Complete processing/control groups

- **SOURCE** — selector, Character, bypass, current model.
- **TRANSMISSION** — selector, Bad Signal, Dropout/Packet Loss, Interference, Codec Damage, bypass.
- **CONDITION** — NEW/USED/OLD/DAMAGED, amount, Rattle, Buzz, Device Compression, Instability, bypass.
- **WALL / COVER** — selector, Amount, Leak, Panel/Cavity Resonance, bypass.
- **MOTION / DISTANCE** — STATIC/APPROACH/PASS BY/LEAVE/MANUAL, Start/Closest/End/Current Distance, Speed km/h, Doppler, Width, Perspective, Motion Position, Sync, Set Start/Closest/End, bypass.
- **SPACE / ENVIRONMENT** — selector, Amount, Decay, Character, Direct, Early, Tail, bypass.
- **AMBIENCE** — Room Tone, Office/HVAC, Traffic, Crowd, Wind, Rain, Electrical, Vehicle, Public Space, Radio Static, macro, Level, DUCK, Seed/New Seed, bypass.
- **INTELLIGIBILITY** — 0–100, Natural/Dialogue/Aggressive, bypass.
- **EQ / TONE** — HPF, LPF, four bands each with Freq/Gain/Q, Final Tone, bypass.
- **MIX / OUTPUT** — Input Gain, Mix, Output Gain.
- **FEEDBACK** — controlled Amount/Tone/bypass for PA/Megaphone/Walkie use.
- **GENERATORS** — DTMF, Dial Tone, Busy Tone, Radio Carrier, Test Tone, Static, Hum, Level, On/Off.
- **ANALYSIS** — Spectrum, Space Response, actual Signal Flow, IN/OUT meters, Peak IN/OUT, RMS IN/OUT, LUFS slot, Reset Peak.

LUFS remains visibly pending until a valid loudness implementation is connected; no fake value is shown.

## UI_01 partition
```text
TOP      Global / Preset / State / Transport / UI switch
RUNTIME  Engine / SR / Block / Seed / Sync / Seek / State
LEFT     SOURCE / TRANSMISSION / WALL-COVER / SPACE
CENTER   Scene View + Motion + permanent values
CENTER2  Spectrum / Space Response / Signal Flow
RIGHT    IN / OUT meters + Peak/RMS/LUFS
BOTTOM   Motion / Bad Signal / Condition / Intelligibility / Ambience / Mix / EQ-Tone
DETAIL   Complete detailed drawer for every approved control group
```

## UI_02 partition
```text
TOP       Same global/state/transport contract
MAIN      Enlarged Scene View + 3D/Top + source/listener/path
UNDER     Horizontal SOURCE / TRANSMISSION / WALL-COVER / SPACE scene dock
LOWER     Spectrum / Space Response / Signal Flow
RIGHT     Fixed metering
BOTTOM    Same fast macros
DETAIL    Same complete detailed drawer
```

UI_02 is therefore structurally distinct rather than a recolored UI_01.

Machine-readable control schema: `Web/App/data/ui_controls.json`.
