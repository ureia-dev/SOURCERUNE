#pragma once
#include <string_view>

namespace sourcerune::ui::skin
{
struct Insets
{
    int left;
    int top;
    int right;
    int bottom;
};

inline constexpr std::string_view kShellBgAsset =
    "Assets/UI/Runtime/Common/Shell/RT_SHELL_BG.png";
inline constexpr std::string_view kTopBarBgAsset =
    "Assets/UI/Runtime/Common/Shell/RT_TOPBAR_BG.png";
inline constexpr std::string_view kPanelFrameAsset =
    "Assets/UI/Runtime/Common/Shell/RT_PANEL_FRAME.png";
inline constexpr std::string_view kCardFrameAsset =
    "Assets/UI/Runtime/Common/Shell/RT_CARD_FRAME.png";

inline constexpr Insets kShellBgInsetsPx2x { 24, 24, 24, 24 };
inline constexpr Insets kTopBarBgInsetsPx2x { 20, 20, 20, 20 };
inline constexpr Insets kPanelFrameInsetsPx2x { 22, 22, 22, 22 };
inline constexpr Insets kCardFrameInsetsPx2x { 20, 20, 20, 20 };
inline constexpr bool kFrameChromeBehindLiveContent = true;

inline constexpr int kGearButtonSize = 38;
inline constexpr int kGearIconSize = 28;
inline constexpr int kPresetArrowButtonWidth = 42;
inline constexpr int kPresetArrowButtonHeight = 42;
inline constexpr int kPresetArrowIconWidth = 26;
inline constexpr int kPresetArrowIconHeight = 38;
inline constexpr int kPresetFolderButtonWidth = 44;
inline constexpr int kPresetFolderButtonHeight = 42;
inline constexpr int kPresetFolderIconSize = 28;

static_assert (kShellBgInsetsPx2x.left == kShellBgInsetsPx2x.right);
static_assert (kPanelFrameInsetsPx2x.top == kPanelFrameInsetsPx2x.bottom);
static_assert (kCardFrameInsetsPx2x.left == 20);
} // namespace sourcerune::ui::skin
