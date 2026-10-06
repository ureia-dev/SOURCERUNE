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
inline constexpr int kModuleCardHeight = 124;
inline constexpr int kModuleGap = 8;
inline constexpr int kWorkspaceGap = 10;
inline constexpr int kWorkspacePaddingX = 10;
inline constexpr int kWorkspacePaddingBottom = 8;
inline constexpr int kWorkspaceHeight = 528;
inline constexpr int kMeterRailHeight = 520;
inline constexpr int kSceneHeaderHeight = 34;
inline constexpr int kSceneGraphHeight = 186;
inline constexpr int kAnalysisTabHeight = 37;
inline constexpr int kMacroKnobMotion = 55;
inline constexpr int kMacroKnobStandard = 68;
inline constexpr int kMacroKnobMix = 82;

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

static_assert (kLeftSceneModules.size() == 4);
static_assert (kFastBottomMacros.size() == 7);
static_assert (kDetailDrawer.size() == 12);
} // namespace sourcerune::ui::ui01
