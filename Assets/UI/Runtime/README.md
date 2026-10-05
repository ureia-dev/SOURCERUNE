# SOURCERUNE Runtime P0 Skin V1

This folder contains **reusable runtime UI pieces**, not screenshots of the full interface.

## P0 V1 contents

- Shell / panel / card / topbar skins
- General button: idle / hover / pressed / disabled
- Segmented button: idle / hover / active / disabled
- Dropdown: idle / hover / open / disabled
- Icon button: idle / hover / pressed / active
- Slider track + idle / hover / drag thumbs
- Small / medium / large knob bases
- Meter frame
- Analysis graph-grid tile
- Source and Listener markers: idle / active

**33 PNG files total.**

## Rules

- Raster masters are authored at 2×.
- Stretchable chrome uses 9-slice insets from `p0_skin_manifest_v1.json`.
- Do not bake runtime labels, values, meter levels, analyzer curves or motion geometry into these files.
- Text, values, knob arcs/pointers, meter fill, spectrum, EQ, Space Response, motion path, waveform and runtime state remain code-driven.
- SOURCE / TRANSMISSION / WALL_COVER / SPACE_ENVIRONMENT / SCENE_PRESET_HERO semantic art remains in the existing semantic asset folders.
- Never replace UI_01 or UI_02 with a full-interface screenshot.

This is the first implementation baseline. Visual QA can refine these pieces without changing DSP or parameter/state semantics.
