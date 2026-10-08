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
// UI_02 top horizontal meter: match validated Web runtime allocation.
// REF-fine typography/anchor positions remain APPROX.
inline constexpr int kMeterHeight = 62;
inline constexpr int kMeterRowHeight = 54;
inline constexpr int kMeterSlotWidth = 150;
inline constexpr int kMeterSlotHeight = 15;
inline constexpr int kMeterLabelWidth = 48;
inline constexpr int kMeterLabelToSlotGap = 8;
inline constexpr int kMeterBlockGap = 22;
inline constexpr int kMeterFlexResidual = 6;
inline constexpr int kSourceCardHeight = 213;
inline constexpr int kTransmissionCardHeight = 166;
inline constexpr int kWallCardHeight = 247;
inline constexpr int kSpaceCardHeight = 285;
inline constexpr int kAmbienceCardHeight = 350;

// Shared UI_02 semantic-card interior: Web runtime-exact template only.
// REF-fine card internals and font metrics remain APPROX until original bitmap overlay.
inline constexpr int kCardMetaHeight = 74;
inline constexpr int kCardMetaPaddingTop = 15;
inline constexpr int kCardMetaPaddingRight = 62;
inline constexpr int kCardMetaPaddingBottom = 8;
inline constexpr int kCardMetaPaddingLeft = 18;
inline constexpr int kCardImageTop = 74;
inline constexpr int kCardImageSideInset = 14;
inline constexpr int kCardImageBottomInset = 14;
inline constexpr int kCardActionSize = 32;
inline constexpr int kCardActionTop = 13;
inline constexpr int kCardActionRight = 12;
inline constexpr int kCardCycleHitWidth = 38;
inline constexpr int kCardCycleHitHeight = 62;
inline constexpr int kCardCycleBottom = 42;
inline constexpr int kCardCyclePrevLeft = 17;
inline constexpr int kCardCycleNextRight = 17;
inline constexpr int kCardCycleIconWidth = 20;
inline constexpr int kCardCycleIconHeight = 32;
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
inline constexpr bool kShowMeterModeToggle = false;

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

// UI_02 places Motion in the center deck and Ambience in the right rail.
// Only these five sections are visually allocated to the bottom macro row.
// The full feature inventory remains accessible through kDetailDrawer.
inline constexpr Section kCenterMotionDeck = Section::Motion;
inline constexpr Section kRightAmbienceCard = Section::Ambience;
inline constexpr std::array<Section, 5> kFastBottomMacros {
    Section::Transmission, // visible BAD SIGNAL panel
    Section::Condition,
    Section::Intelligibility,
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
    + kLeftRailWidth + 2 * kWorkspaceGap + kCenterWidth + kRightRailWidth);
static_assert (kReferenceHeight == kTopBarHeight + kWorkspaceHeight + kMacroStripHeight);
static_assert (kTransmissionCardHeight == kGridRow2 + kWorkspaceGap + kGridRow3);
static_assert (kSpaceCardHeight == kGridRow1 + kWorkspaceGap + kGridRow2);
static_assert (kMacroStripHeight == kMacroTopGap + kBottomMacroHeight + kShellBottomPadding);
static_assert (kMeterWidth == 2 * (kMeterLabelWidth + kMeterLabelToSlotGap + kMeterSlotWidth)
    + kMeterBlockGap + kMeterFlexResidual);
static_assert (kMeterHeight >= kMeterRowHeight && kMeterSlotHeight < kMeterRowHeight);
static_assert (kReferenceWidth == 2 * kWorkspacePaddingX
    + kBottomBadSignalWidth + kBottomConditionWidth + kBottomIntelligibilityWidth
    + kBottomMixWidth + kBottomEqWidth + 4 * kBottomGridGap);

static_assert (kCardImageTop == kCardMetaHeight);
static_assert (kCardMetaPaddingTop + kCardMetaPaddingBottom < kCardMetaHeight);
static_assert (kCardCycleIconWidth <= kCardCycleHitWidth && kCardCycleIconHeight <= kCardCycleHitHeight);
static_assert (kCardActionSize <= kCardMetaHeight);
static_assert (kSceneComponentDock.size() == 4);
static_assert (kFastBottomMacros.size() == 5);
static_assert (kFastBottomMacros[0] == Section::Transmission);
static_assert (kFastBottomMacros[4] == Section::EqTone);
static_assert (kCenterMotionDeck == Section::Motion && kRightAmbienceCard == Section::Ambience);
static_assert (kDetailDrawer.size() == 12);
} // namespace sourcerune::ui::ui02
