# SOURCERUNE Visual Style V2

Status: **LOCKED visual direction for the current asset library**

This document defines the approved professional visual language for SOURCE, TRANSMISSION, WALL/COVER, SPACE/ENVIRONMENT, and SCENE PRESET HERO imagery.

## Goal

The artwork must feel like it was art-directed and finished by a senior plugin/UI illustration team, not like generic generated concept art or a low-cost media library.

The images are functional audio-post assets. They must communicate the acoustic idea immediately at small size while remaining restrained enough to sit inside a premium professional plugin.

## Core visual rules

1. **Midtone-first contrast**
   - Do not crush blacks.
   - Do not clip highlights.
   - Avoid glossy HDR or cinematic-advertising contrast.
   - Preserve material texture in shadows.

2. **No artificial teal/orange grading**
   - Neutral/cool base is allowed.
   - Cyan belongs mainly to UI accents, not as a full-scene color wash.
   - Warm light is used only where physically plausible.

3. **Deep readable focus**
   - Avoid shallow-depth-of-field portraits.
   - Avoid exaggerated bokeh.
   - Environments should read spatially from foreground through background.
   - Default visual feel is approximately a restrained 35–50 mm documentary/product lens, not a dramatic cinema lens.

4. **Matte materials**
   - Metals, plastics, wood, cloth and glass should be believable and tactile.
   - Avoid wet-look specular highlights and exaggerated microcontrast.

5. **Controlled saturation**
   - Most scenes stay neutral.
   - Strong colors are reserved for objects that genuinely have them: emergency lights, toy devices, signal indicators, signage, etc.

6. **Consistent perspective**
   - Similar asset types should share camera height and visual scale.
   - Avoid random extreme wide-angle or hero low-angle compositions.

7. **Functional silhouette**
   - At plugin-card size, the user must understand the object/environment without reading a paragraph.
   - The subject cannot disappear into decorative background detail.

8. **No baked UI text in runtime crops**
   - Asset names, values, badges, states, and preset labels are rendered by the plugin/Web UI.
   - Atlas sheets may contain labels for design review only.
   - UI_01 and UI_02 runtime crops should remain text-free.

9. **No brand dependency**
   - Generic device archetypes only.
   - No trademark logos.
   - No one-to-one copy of a recognizable protected industrial design when a generic representation is sufficient.

10. **No decorative sci-fi treatment**
    - SOURCERUNE may look modern, but the imagery itself is grounded in real acoustic objects and spaces.
    - No unnecessary holograms, bloom, neon outlines, glowing fog, or game-HUD overlays.

## Color system

The imagery is subordinate to the UI.

- Deep charcoal / midnight blue: framing/background.
- Slate / steel gray: neutral structures and device materials.
- Silver gray: high-value readable surfaces.
- Accent cyan: selection/focus/UI line language.
- Warm amber: physically motivated lamps/tungsten/accent states.
- Natural stone / wood / concrete / greenery / sky: environment-specific material colors.

The goal is visual cohesion, not forcing every image into the same blue tint.

## Category-specific art direction

### SOURCE
- Device/object first.
- Quiet background.
- Product-photography clarity without consumer-ad gloss.
- Preserve enough context to understand what part actually emits sound.

### TRANSMISSION
- Diagrammatic / signal-oriented.
- Waveforms, bandwidth, link quality and dropout can be abstract.
- Avoid turning every transmission item into another photograph of a phone or radio.

### WALL / COVER
- Material and obstruction relationship first.
- Show thickness, density or enclosure where useful.
- The artwork must suggest why the sound changes.

### SPACE / ENVIRONMENT
- Spatial depth, boundaries and reflective/absorptive surfaces are important.
- Architecture should be plausible.
- Avoid postcard/travel-photography styling.

### SCENE PRESET HERO
- May combine source + transmission context + cover + distance/motion + environment.
- Preserve dramatic readability, but keep grading restrained.
- The scene should explain the preset at a glance rather than merely look cinematic.

## Approval test

Before an asset is accepted:
- readable at small card size,
- no accidental logo/brand marks,
- no excessive bokeh,
- no teal/orange wash,
- no crushed blacks,
- no implausible lighting,
- consistent with adjacent assets,
- acoustic meaning is clear,
- supports UI_01 and UI_02 crops,
- does not contain runtime text that should be drawn by code.
