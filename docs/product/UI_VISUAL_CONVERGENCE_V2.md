# SOURCERUNE UI Visual Convergence V2

Status: **REFERENCE-CONVERGED IMPLEMENTATION PASS — 2026-10-05**

This pass is the second stage after structural layout convergence. It focuses on the actual visual density and control composition visible in the two approved UI references.

## Non-negotiable rule

The approved references are composition targets only. The shipped UI remains assembled from:

1. semantic images,
2. reusable runtime PNG chrome,
3. live controls / SVG / canvas / text.

No complete UI screenshot is used as implementation artwork.

## UI_01 fine targets

Reference plugin shell: approximately **1499 × 807**.

### Left semantic rail
- 4 cards.
- Target card height: **124 px**.
- Gap: **8 px**.
- Semantic image occupies the lower image region.
- UI_01 keeps a single right-side cycling affordance.
- EDIT remains an explicit engineering action.

### Center
- Scene header: **34 px**.
- Live Scene graph region: **186 px**.
- Motion waveform strip fills the remaining scene panel depth.
- Analysis tabs: **37 px**.
- Spectrum / Response content: approximately **210 px**.

### Bottom fast controls
The previous one-slider-per-module presentation was removed.

Current composition:
- Motion: Distance readout + Speed / Doppler / Width knobs + Approach / Pass By / Leave.
- Bad Signal: Amount knob + current transmission + static/dropout/interference/bitrate readouts.
- Condition: Amount knob + condition mode + rattle/wow-flutter readouts.
- Intelligibility: Amount knob + Natural / Dialogue / Aggressive mode.
- Ambience: type + Amount knob + compact waveform visual.
- Mix: large Wet knob.
- EQ/Tone: live mini EQ graph + HPF / LPF / Tone summary.

Knob targets:
- Motion: **55 px** class.
- General macro: **68 px** class.
- Mix: **82 px** class.

UI_01 keeps the approved category border accents:
cyan / red / amber / green / purple / neutral.

## UI_02 fine targets

Reference: **1672 × 941**.

### Semantic cards
- Source: approx **196 px**.
- Transmission: approx **183 px**.
- Wall/Cover: approx **244 px**.
- Space/Environment: approx **279 px**.
- Card images expose real Previous / Next controls.
- Right title action is a chevron, not an EDIT text button.

### Main Scene
The central photography now prefers the selected Factory Scene Hero when approved artwork exists. It falls back to selected SPACE_ENVIRONMENT art when the current hero is still marked art-required.

Source / Listener remain runtime overlays using reusable marker PNGs.

### Motion deck
- Scene photo region: **358 px**.
- Lower motion deck: **283 px**.
- Large Distance dial target: **300 px**.
- Speed / Doppler / Width visual knob target: **54 px**.
- Motion mode is a real runtime select.
- Motion path is a live SVG that changes for Static / Approach / Pass By / Leave and tracks current motion position.

### Right rail
SPACE / ENVIRONMENT remains semantic art.

AMBIENCE is intentionally different from UI_01:
- type selector,
- contextual scene image,
- horizontal amount slider,
- live percentage readout.

This follows the approved UI_02 reference instead of forcing the UI_01 knob presentation into both layouts.

### Bottom row
Motion is integrated into the central motion deck, while Ambience is in the right rail. Bottom modules are:
- Bad Signal
- Condition
- Intelligibility
- Mix
- EQ/Tone

Standard bottom macro knob target: **76 px**.

## Functional changes included

- Previous/Next semantic asset cycling is real and updates state.
- UI_02 motion mode selector updates the same public motionMode state.
- UI_02 motion path SVG updates from the live motion mode and current motion value.
- Current distance in UI_01 macro and UI_02 deck remains live.
- UI_02 scene photo resolves from current Factory hero when available.
- No DSP algorithm was changed.

## Validation

Branch checks before merge:
- app.js syntax: PASS
- visual_convergence_v2.css brace balance: PASS
- runtime asset references: 0 missing
- motion-deck DOM + bindings: PASS
- semantic asset cycling binding: PASS
- scene-marker runtime PNG bindings: PASS

## Remaining visual work after V2

- final typography optical alignment after native font rendering is available,
- real SCN_049…SCN_074 scene artwork,
- the previously identified 28 missing legacy semantic PNG slots,
- final Web ↔ native pixel parity once native rendering is available.
