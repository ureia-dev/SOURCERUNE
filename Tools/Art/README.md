# Scene Hero Art Tooling

`build_scene_hero_cards.py` builds the three required **independent** PNG exports for one Scene Hero photographic master.

The tool intentionally keeps AI/photo generation separate from runtime card construction.

## Input master rule

Provide one clean scene photograph/master per Scene ID:
```text
ArtMasters/SceneHero/
  SCN_049_Flat_TV_Living_Room.png
  ...
  SCN_074_Voice_Behind_Concrete_Wall.png
```

Do not put scene number or title into the photo master.

## Batch

```bash
python Tools/Art/build_scene_hero_cards.py \
  --manifest Assets/UI/scene_hero_049_074_manifest_v1.json \
  --photo-dir ArtMasters/SceneHero
```

Outputs:
- `Assets/UI/Shared/SCENE_PRESET_HERO/*.png`
- `Assets/UI/UI_01/SCENE_PRESET_HERO/*.png`
- `Assets/UI/UI_02/SCENE_PRESET_HERO/*.png`

Each Scene produces exactly **3 separate PNG files**.

## Font

The script searches for a local condensed bold font and supports `--font` for a local override.

**Do not commit or distribute font binaries through this repo.**

## Focal point

Use `--focal-x` / `--focal-y` (0…1) to bias the crop for a single scene if needed. Batch defaults to center-safe composition, so photographic masters should leave margin around the main subject.
