#pragma once
#include "../Common/UISectionIds.h"
#include <array>

namespace sourcerune::ui::ui02
{
inline constexpr int kReferenceWidth = 1672;
inline constexpr int kReferenceHeight = 941;
inline constexpr int kTopBarHeight = 78;
inline constexpr int kLeftRailWidth = 334;
inline constexpr int kCenterWidth = 972;
inline constexpr int kRightRailWidth = 322;
inline constexpr int kSceneVisualHeight = 358;
inline constexpr int kMotionDeckHeight = 283;
inline constexpr int kBottomMacroHeight = 172;

enum class Area
{
    TopGlobal,
    RuntimeStrip,
    PrimarySpatialScene,
    SceneComponentDock,
    LowerAnalysis,
    RightMeters,
    BottomMacros,
    DetailDrawer,
};

inline constexpr std::array<Section, 4> kSceneComponentDock {
    Section::Source,
    Section::Transmission,
    Section::WallCover,
    Section::SpaceEnvironment,
};

inline constexpr std::array<Section, 7> kFastBottomMacros {
    Section::Motion,
    Section::Transmission,
    Section::Condition,
    Section::Intelligibility,
    Section::Ambience,
    Section::MixOutput,
    Section::EqTone,
};

inline constexpr std::array<Section, 12> kDetailDrawer {
    Section::Source,
    Section::Transmission,
    Section::Condition,
    Section::WallCover,
    Section::Motion,
    Section::SpaceEnvironment,
    Section::Ambience,
    Section::Intelligibility,
    Section::EqTone,
    Section::MixOutput,
    Section::Feedback,
    Section::Generators,
};

static_assert (kSceneComponentDock.size() == 4);
static_assert (kFastBottomMacros.size() == 7);
static_assert (kDetailDrawer.size() == 12);
} // namespace sourcerune::ui::ui02
