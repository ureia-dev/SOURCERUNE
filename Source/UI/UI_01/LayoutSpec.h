#pragma once
#include "../Common/UISectionIds.h"
#include "../Common/RuntimeSkinSpec.h"
#include <array>

namespace sourcerune::ui::ui01
{
inline constexpr int kReferenceWidth = 1499;
inline constexpr int kReferenceHeight = 807;
inline constexpr float fitScale (float availableWidth, float availableHeight) noexcept
{
    const auto sx = availableWidth / static_cast<float> (kReferenceWidth);
    const auto sy = availableHeight / static_cast<float> (kReferenceHeight);
    return sx < sy ? sx : sy;
}

inline constexpr int kTopBarHeight = 58;
inline constexpr int kLeftRailWidth = 313;
inline constexpr int kCenterWidth = 967;
inline constexpr int kMeterRailWidth = 179;
inline constexpr int kSceneHeight = 262;
inline constexpr int kAnalysisHeight = 247;
inline constexpr int kBottomMacroHeight = 216;
inline constexpr int kMacroStripHeight = 221;
inline constexpr int kShellBottomPadding = 5;
inline constexpr int kModuleCardHeight = 124; // legacy/fallback only
inline constexpr int kSourceCardHeight = 137;
inline constexpr int kTransmissionCardHeight = 125;
inline constexpr int kWallCardHeight = 131;
inline constexpr int kSpaceCardHeight = 108;
inline constexpr int kSourceToTransmissionGap = 6;
inline constexpr int kTransmissionToWallGap = 8;
inline constexpr int kWallToSpaceGap = 6;
inline constexpr int kModuleRailHeight = 521;
inline constexpr int kModuleGap = 8;
inline constexpr int kWorkspaceGap = 10;
inline constexpr int kWorkspacePaddingX = 10;
inline constexpr int kWorkspacePaddingBottom = 8;
inline constexpr int kWorkspaceHeight = 528;
inline constexpr int kMeterRailHeight = 520; // workspace allocation
inline constexpr int kMeterRailContentHeight = 376;
inline constexpr int kMeterSlotWidth = 20;
inline constexpr int kMeterSlotHeight = 178;
inline constexpr int kMeterModeTop = 273;
inline constexpr int kMeterModeHeight = 30;
inline constexpr bool kShowMeterModeToggle = true;
inline constexpr int kSceneHeaderHeight = 34;
inline constexpr int kSceneGraphHeight = 186;
inline constexpr int kAnalysisTabHeight = 37;
inline constexpr int kMacroKnobMotion = 55;
inline constexpr int kMacroKnobStandard = 68;
inline constexpr int kMacroKnobMix = 82;
inline constexpr int kBottomMotionWidth = 269;
inline constexpr int kBottomBadSignalWidth = 178;
inline constexpr int kBottomConditionWidth = 201;
inline constexpr int kBottomIntelligibilityWidth = 201;
inline constexpr int kBottomAmbienceWidth = 155;
inline constexpr int kBottomMixWidth = 115;
inline constexpr int kBottomEqWidth = 312;
inline constexpr int kBottomGridGap = 8;

enum class Area
{
    TopGlobal,
    RuntimeStrip,
    LeftSceneModules,
    CenterScene,
    CenterAnalysis,
    RightMeters,
    BottomMacros,
    DetailDrawer,
};

inline constexpr std::array<Section, 4> kLeftSceneModules {
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

static_assert (kReferenceWidth == 2 * kWorkspacePaddingX
    + kLeftRailWidth + 2 * kWorkspaceGap + kCenterWidth + kMeterRailWidth);
static_assert (kReferenceHeight == kTopBarHeight + kWorkspaceHeight + kMacroStripHeight);
static_assert (kModuleRailHeight == kSourceCardHeight + kSourceToTransmissionGap
    + kTransmissionCardHeight + kTransmissionToWallGap
    + kWallCardHeight + kWallToSpaceGap + kSpaceCardHeight);
static_assert (kReferenceWidth == 2 * kWorkspacePaddingX
    + kBottomMotionWidth + kBottomBadSignalWidth + kBottomConditionWidth
    + kBottomIntelligibilityWidth + kBottomAmbienceWidth + kBottomMixWidth
    + kBottomEqWidth + 6 * kBottomGridGap);
static_assert (kMacroStripHeight == kBottomMacroHeight + kShellBottomPadding);

static_assert (kLeftSceneModules.size() == 4);
static_assert (kFastBottomMacros.size() == 7);
static_assert (kDetailDrawer.size() == 12);
} // namespace sourcerune::ui::ui01
