# Native UI implementation handoff

## Rule

The WEB layout now proves the complete UI control surface. The native VST3 editor must implement the same sections, not a reduced subset.

## Native implementation order

1. Build shared reusable controls for:
   - module header/bypass,
   - numeric readout,
   - slider/knob,
   - segmented selector,
   - asset/model selector,
   - meter,
   - spectrum/response view,
   - state/preset toolbar.

2. Implement UI_01 areas from `Source/UI/UI_01/LayoutSpec.h`.

3. Implement UI_02 areas from `Source/UI/UI_02/LayoutSpec.h`.

4. Bind both layouts to one state/parameter layer.

5. Verify layout switching changes presentation only.

## Completeness gate

A native UI build is not considered complete unless every group present in `Web/App/data/ui_controls.json` is reachable in both UI_01 and UI_02.

Feedback and Generators may remain in the detailed/advanced area, but they may not disappear.

## Non-DSP status

The current WEB audio path remains pass-through. These UI files are structure/state contracts only and do not pretend the final acoustic DSP is implemented.
