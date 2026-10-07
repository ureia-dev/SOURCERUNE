#pragma once
#include "../Common/UISectionIds.h"
#include "../Common/RuntimeSkinSpec.h"
#include <array>

namespace sourcerune::ui::ui02
{
inline constexpr int kReferenceWidth = 1672;
inline constexpr int kReferenceHeight = 941;
inline constexpr float fitScale (float availableWidth, float availableHeight) noexcept
{
    const auto sx = availableWidth / static_cast<float> (kReferenceWidth);
    const auto sy = availableHeight / static_cast<float> (kReferenceHeight);
    return sx < sy ? sx : sy;
}

inline constexpr int kTopBarHeight = 78;
inline constexpr int kLeftRailWidth = 334;
inline constexpr int kCenterWidth = 972;
inline constexpr int kRightRailWidth = 322;
inline constexpr int kSceneVisualHeight = 358;
inline constexpr int kMotionDeckHeight = 283;
inline constexpr int kBottomMacroHeight = 172;
inline constexpr int kMacroStripHeight = 210;
inline constexpr int kMacroTopGap = 20;
inline constexpr int kShellBottomPadding = 18;
inline constexpr int kAmbienceTop = 380;
inline constexpr int kMeterTop = 8;
inline constexpr int kSourceCardHeight = 213;
inline constexpr int kTransmissionCardHeight = 166;
inline constexpr int kWallCardHeight = 247;
inline constexpr int kSpaceCardHeight = 285;
inline constexpr int kAmbienceCardHeight = 350;
inline constexpr int kDistanceDialDiameter = 300;
inline constexpr int kMotionSmallKnobDiameter = 54;
inline constexpr int kBottomMacroKnobDiameter = 76;
inline constexpr int kGridRow1 = 213;
inline constexpr int kGridRow2 = 63;
inline constexpr int kGridRow3 = 94;
inline constexpr int kGridRow4 = 247;
inline constexpr int kBottomGridGap = 11;
inline constexpr int kBottomBadSignalWidth = 337;
inline constexpr int kBottomConditionWidth = 315;
inline constexpr int kBottomIntelligibilityWidth = 297;
inline constexpr int kBottomMixWidth = 316;
inline constexpr int kBottomEqWidth = 337;
inline constexpr int kWorkspaceGap = 9;
inline constexpr int kWorkspacePaddingX = 13;
inline constexpr int kWorkspacePaddingTop = 8;
inline constexpr int kWorkspaceHeight = 653;
inline constexpr int kScenePanelHeight = 641;
inline constexpr int kMeterRight = 72;
inline constexpr int kMeterWidth = 440;

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
