#pragma once
#include "ParameterIds.h"
#include <array>
namespace sourcerune::state::native {
// Permanent numeric host IDs. Existing public-array indices are retained;
// unimplemented IDs stay reserved. Do not renumber on expansion.
inline constexpr std::array<unsigned,23> ids{
    0,1,5,57,58,59,1000,1001,1100,1101,2000, // unchanged legacy slot layout
    42,43,44,45,46,47,48,49,50,51,52,1102 // HPF, LPF, 3 bells, EQ bypass
};
inline constexpr std::array<double,23> defaults{
    .5,.2,0,.5,1,.5,.5,.75,0,0,0,
    0,1,100.0/19980.0,.5,.6/11.9,580.0/19980.0,.5,.9/11.9,
    2380.0/19980.0,.5,.9/11.9,0
};
// Public b4Freq/b4Gain/b4Q numeric IDs 53..55 are RETIRED/RESERVED.
static_assert(sourcerune::state::ids::kPublicParameters[42].id=="hpf");
static_assert(sourcerune::state::ids::kPublicParameters[52].id=="b3Q");
inline constexpr std::array<int,5> sourceModels{1,2,3,11,40};
inline constexpr std::array<int,5> transmissionModels{1,2,3,5,11};
static_assert(sourcerune::state::ids::kPublicParameters[57].id=="inputGain");
static_assert(sourcerune::state::ids::kPublicParameters[58].id=="mix");
static_assert(sourcerune::state::ids::kPublicParameters[59].id=="outputGain");
inline int index(unsigned id){for(unsigned i=0;i<ids.size();++i)if(ids[i]==id)return int(i);return -1;}
}
