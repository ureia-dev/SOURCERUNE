#pragma once
#include "ParameterIds.h"
#include <array>
namespace sourcerune::state::native {
// Permanent numeric host IDs. Existing public-array indices are retained;
// unimplemented IDs stay reserved. Do not renumber on expansion.
inline constexpr std::array<unsigned,13> ids{0,1,5,57,58,59,1000,1001,1100,1101,2000,42,1102};
inline constexpr std::array<double,13> defaults{.5,.2,0,.5,1,.5,.5,.75,0,0,0,0,0};
inline constexpr std::array<int,5> sourceModels{1,2,3,11,40};
inline constexpr std::array<int,5> transmissionModels{1,2,3,5,11};
static_assert(sourcerune::state::ids::kPublicParameters[57].id=="inputGain");
static_assert(sourcerune::state::ids::kPublicParameters[58].id=="mix");
static_assert(sourcerune::state::ids::kPublicParameters[59].id=="outputGain");
static_assert(sourcerune::state::ids::kPublicParameters[42].id=="hpf");
inline int index(unsigned id){for(unsigned i=0;i<ids.size();++i)if(ids[i]==id)return int(i);return -1;}
}
