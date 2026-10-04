#pragma once
#include <array>
#include <string_view>

namespace sourcerune::ui
{
enum class Section
{
    Global,
    Runtime,
    Source,
    Transmission,
    Condition,
    WallCover,
    Motion,
    SpaceEnvironment,
    Ambience,
    Intelligibility,
    EqTone,
    MixOutput,
    Analysis,
    Metering,
    Feedback,
    Generators,
    PresetsState,
    Snapshots,
    Transport,
};

inline constexpr std::array<Section, 19> kCompleteSectionInventory {
    Section::Global,
    Section::Runtime,
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
    Section::Analysis,
    Section::Metering,
    Section::Feedback,
    Section::Generators,
    Section::PresetsState,
    Section::Snapshots,
    Section::Transport,
};

constexpr std::string_view toString (Section section) noexcept
{
    switch (section)
    {
        case Section::Global: return "GLOBAL";
        case Section::Runtime: return "RUNTIME";
        case Section::Source: return "SOURCE";
        case Section::Transmission: return "TRANSMISSION";
        case Section::Condition: return "CONDITION";
        case Section::WallCover: return "WALL_COVER";
        case Section::Motion: return "MOTION";
        case Section::SpaceEnvironment: return "SPACE_ENVIRONMENT";
        case Section::Ambience: return "AMBIENCE";
        case Section::Intelligibility: return "INTELLIGIBILITY";
        case Section::EqTone: return "EQ_TONE";
        case Section::MixOutput: return "MIX_OUTPUT";
        case Section::Analysis: return "ANALYSIS";
        case Section::Metering: return "METERING";
        case Section::Feedback: return "FEEDBACK";
        case Section::Generators: return "GENERATORS";
        case Section::PresetsState: return "PRESETS_STATE";
        case Section::Snapshots: return "SNAPSHOTS";
        case Section::Transport: return "TRANSPORT";
    }
    return "UNKNOWN";
}
} // namespace sourcerune::ui
