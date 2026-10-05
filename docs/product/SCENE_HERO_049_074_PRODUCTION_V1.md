# SCENE PRESET HERO 049–074 Production V1

## Purpose

Extend the approved SCENE PRESET HERO visual system from 48 to 74 scenes without changing the established visual language.

**Every scene is a separate single image asset.**  
The required production count is **26 scenes × 3 exports = 78 independent PNG files**.

A combined 26-tile or 74-tile atlas is allowed only as a review/reference sheet after all individual assets exist.

## Style master

Primary reference:
`Assets/UI/ReferenceSheets/SCENE_PRESET_HERO_48_ATLAS.png`

The existing 48 scenes establish the style:
- grounded cinematic photorealism;
- practical post-production situations rather than abstract illustration;
- medium/wide environmental storytelling;
- restrained warm/cool filmic grade;
- realistic practical lights and plausible exposure;
- emitter/person integrated into the environment;
- no glossy product advertisement;
- no sci-fi/fantasy visual language;
- no extreme portrait bokeh;
- no AI-generated title text.

## Deterministic card construction

The scene photograph and the card chrome are separate concerns.

1. Produce a clean photographic scene master with generous safe area.
2. Apply the existing Scene Hero title/header/frame system deterministically.
3. Number and title are typeset by the build/compositing process, never generated inside the image.
4. Export three independent targets:
   - Shared: **226 × 115**
   - UI_01: **384 × 144**
   - UI_02: **512 × 256**
5. Verify each crop individually. Never crop one atlas tile and call that the runtime asset.

## Composition rules

- UI_01 is wider and shall retain the key subject in a horizontal engineering-card crop.
- UI_02 needs more vertical environmental information and must preserve the scene's spatial story.
- Important subjects stay inside the central safe zone so both crops survive.
- Motion scenes must communicate direction through staging, not exaggerated speed streaks.
- WALL/COVER scenes must show the actual barrier relationship.
- Environment scenes must visibly read as the stated place before reading the person.

## 26 scene briefs

### 049 — Flat TV - Living Room
Modern flat-screen television as the audible source in a believable living room; medium-wide room composition, TV glow, sofa/table cues, practical warm lamp light, broadcast/talk-program feel rather than product glamour.

### 050 — Baby Monitor - Bedroom
Baby monitor clearly identifiable in a real bedroom/nursery; crib and domestic room context, intimate low-light practical lighting, device is part of scene rather than isolated product shot.

### 051 — Voice Approaches - Hallway
Person at the far-to-mid end of a realistic hallway walking toward listener/camera; corridor perspective is dominant, person medium-small, direct voice situation.

### 052 — Voice Walks Past - Quiet Street
Person walking laterally past listener on a quiet street; medium-wide sidewalk/street composition, restrained motion cue, night/dusk practical street light, not fashion photography.

### 053 — Voice Leaves - Down Corridor
Person walking away down a corridor; back turned, strong recession/vanishing lines, environment larger than subject.

### 054 — Train PA Approaches - Platform
Train approaching platform with public-address context visible or implied; platform geometry and train approach direction must read immediately.

### 055 — Train PA Pass By - Platform
Train passing a platform laterally; believable transport scene, modest natural motion blur, PA/public-transport context, not action-poster styling.

### 056 — Subway Announcement - Pull Away
Subway train pulling away from platform; rear/side departure direction clearly readable, realistic station environment.

### 057 — Bullhorn Marcher Approaches
Marcher/speaker approaching with handheld bullhorn; observational documentary framing, modest crowd context, megaphone readable but not heroic poster composition.

### 058 — Portable PA Pass By - Courtyard
Portable PA speaker moving through an architectural courtyard, carried or wheeled by a person; environment and moving emitter both readable.

### 059 — Car Radio Through Window - Pass By
Car passing listener with audible radio behind a closed side window; car motion and closed-window barrier both visually readable.

### 060 — Phone In Backpack - Walk By Concourse
Person walking through station concourse with phone inside backpack; backpack is readable, concourse movement and crowd/architecture context visible.

### 061 — Bus PA Pull Away - Bus Stop
Bus pulling away from a stop with onboard PA context; departure direction readable, bus-stop environment visible.

### 062 — Car Door Speaker Approaches - Parking Lot
Car approaching in parking lot with door-speaker source context; front/three-quarter approach, parking-lot geometry, realistic night/evening lighting.

### 063 — ADR Match - Small Office
ADR voice placed into a small office; one person/dialogue perspective in modest office, desk/glass/office cues, neutral production-realism.

### 064 — Direct Voice - Bathroom
Direct speaking voice in hard reflective bathroom; person plus tile/mirror/sink cues, small-room reflections visually implied.

### 065 — Direct Voice - Stairwell
Direct voice in stairwell; person in concrete/painted stairwell, vertical geometry and hard reflections dominant.

### 066 — Direct Voice - Warehouse
Direct voice in warehouse; person small-to-medium within large industrial interior, depth, steel/concrete, long-space perspective.

### 067 — Direct Voice - Tunnel / Underpass
Direct voice in tunnel or underpass; person within long hard reflective passage, strong depth and practical lamps.

### 068 — Direct Voice - Open Field
Direct voice in open field; person in broad minimally reflective landscape, horizon/sky/grass, simple natural daylight/dusk.

### 069 — Direct Voice - Forest
Direct voice in forest; person among trees, irregular natural absorption/scattering feel, grounded documentary realism.

### 070 — Direct Voice - Canyon
Direct voice in canyon; person small against canyon walls/rock, long outdoor reflection potential, natural scale emphasized.

### 071 — Direct Voice - Beach
Direct voice at beach; person near open shoreline, water/horizon/wind context, broad minimally enclosed environment.

### 072 — Direct Voice - Sedan Interior
Direct voice inside sedan; person seated in realistic car cabin, dashboard/window/interior cues, compact enclosed acoustic context.

### 073 — Direct Voice - Airplane Cabin
Direct voice inside airplane cabin; seated passenger/crew context, rows/windows/overhead panels, realistic commercial aircraft interior.

### 074 — Voice Behind Concrete Wall
Voice behind concrete wall; two-space barrier story or visible heavy concrete partition, person/source clearly separated from listener side by high-mass wall.


## Acceptance gate

A scene is approved only when:
- it visually belongs beside SCN_001–048;
- all three independent PNG exports exist;
- title/number/frame match the legacy card system;
- no generated text artifacts are present;
- visual subject/location matches the preset semantics;
- crop is valid in Shared, UI_01 and UI_02;
- file name exactly matches the preset `heroId`.

Until then, the preset remains marked art-required / audition-required.
