# SOURCERUNE Factory Preset Portfolio Rebalance — 2026-10-05

## Decision

Research-weighted active Factory Preset portfolio: **50 presets**.

- **SOURCE / EMITTER: 20 (40%)**
- **MOTION / DISTANCE: 15 (30%)**
- **SPACE / ENVIRONMENT: 15 (30%)**
- **Reserve: 24 previous presets kept in the same preset JSON under `reservePresets`**

This rebalance uses the eight-stage forum/pro-community research already performed for SOURCERUNE. It favors recurring professional needs: emitter/device worldizing, telephone/radio/intercom/PA/TV playback, distance/perspective, approach/leave/pass-by, vehicle motion, ADR/room matching, indoor/outdoor spaces, wall/cover/occlusion and intelligibility.

## Main corrections versus the previous 48

1. Reduced repeated telephone/radio/PA variants that added little new workflow coverage.
2. Increased real motion coverage beyond repeated car pass-by presets.
3. Added human-scale movement: approach, pass-by and leave.
4. Added train/subway/bus/vehicle movement cases.
5. Added broader environment anchors: office ADR, bathroom, stairwell, warehouse, tunnel, open field, forest, canyon, beach, sedan and airplane cabin.
6. Added concrete-wall occlusion as a high-mass counterpart to wooden door/floor-ceiling cases.
7. Added Flat TV and Baby Monitor to improve emitter diversity.
8. Source/environment presets explicitly set `motionMode: STATIC` so they do not inherit the generic PASS_BY default.
9. New presets are marked `research-weighted-v3-audition-required`; new scene hero art is marked `art-required-research-v3` until visual assets are produced and auditioned.

## Active list

1. `SCN_001_Mobile_Call_Busy_Sidewalk` — Mobile Call - Busy Sidewalk — SOURCE_EMITTER
2. `SCN_003_Office_Desk_Phone_Small_Office` — Office Desk Phone - Small Office — SOURCE_EMITTER
3. `SCN_006_Payphone_Street_Corner` — Payphone - Street Corner — SOURCE_EMITTER
4. `SCN_007_Conference_Call_Glass_Office` — Conference Call - Glass Office — SOURCE_EMITTER
5. `SCN_011_Walkie_Talkie_Construction_Site` — Walkie Talkie - Construction Site — SOURCE_EMITTER
6. `SCN_012_Police_Radio_Street_Exterior` — Police Radio - Street Exterior — SOURCE_EMITTER
7. `SCN_016_Aviation_Headset_Cockpit_Style` — Aviation Headset - Cockpit Style — SOURCE_EMITTER
8. `SCN_017_Security_Intercom_Building_Entrance` — Security Intercom - Building Entrance — SOURCE_EMITTER
9. `SCN_018_Drive_Thru_Speaker_Fast_Food_Lane` — Drive-Thru Speaker - Fast Food Lane — SOURCE_EMITTER
10. `SCN_021_Bullhorn_Street_Protest` — Bullhorn - Street Protest — SOURCE_EMITTER
11. `SCN_022_Stadium_PA` — Stadium PA — SOURCE_EMITTER
12. `SCN_023_Train_Station_Announcement` — Train Station Announcement — SOURCE_EMITTER
13. `SCN_027_Airplane_Cabin_PA` — Airplane Cabin PA — SOURCE_EMITTER
14. `SCN_041_Subway_Car_Announcement` — Subway Car Announcement — SOURCE_EMITTER
15. `SCN_043_Cheap_Wireless_Speaker_In_Room` — Cheap Wireless Speaker In Room — SOURCE_EMITTER
16. `SCN_045_CCTV_Security_Monitor_Audio` — CCTV / Security Monitor Audio — SOURCE_EMITTER
17. `SCN_046_Cassette_Recorder_Kitchen_Table` — Cassette Recorder - Kitchen Table — SOURCE_EMITTER
18. `SCN_047_Vintage_Radio_Living_Room` — Vintage Radio - Living Room — SOURCE_EMITTER
19. `SCN_049_Flat_TV_Living_Room` — Flat TV - Living Room — SOURCE_EMITTER
20. `SCN_050_Baby_Monitor_Bedroom` — Baby Monitor - Bedroom — SOURCE_EMITTER
21. `SCN_037_Car_Pass_By_City_Street` — Car Pass By - City Street — MOTION_DISTANCE
22. `SCN_040_Truck_Cab_Radio_Highway_Pull_Away` — Truck Cab Radio - Highway Pull Away — MOTION_DISTANCE
23. `SCN_042_Bus_PA_Curb_Arrival` — Bus PA - Curb Arrival — MOTION_DISTANCE
24. `SCN_051_Voice_Approaches_Hallway` — Voice Approaches - Hallway — MOTION_DISTANCE
25. `SCN_052_Voice_Walks_Past_Quiet_Street` — Voice Walks Past - Quiet Street — MOTION_DISTANCE
26. `SCN_053_Voice_Leaves_Down_Corridor` — Voice Leaves - Down Corridor — MOTION_DISTANCE
27. `SCN_054_Train_Approaches_Platform` — Train PA Approaches - Platform — MOTION_DISTANCE
28. `SCN_055_Train_Passes_Platform` — Train PA Pass By - Platform — MOTION_DISTANCE
29. `SCN_056_Subway_Announcement_Pulls_Away` — Subway Announcement - Pull Away — MOTION_DISTANCE
30. `SCN_057_Bullhorn_Marcher_Approaches` — Bullhorn Marcher Approaches — MOTION_DISTANCE
31. `SCN_058_Portable_PA_Pass_By_Courtyard` — Portable PA Pass By - Courtyard — MOTION_DISTANCE
32. `SCN_059_Car_Radio_Closed_Window_Pass_By` — Car Radio Through Window - Pass By — MOTION_DISTANCE
33. `SCN_060_Phone_In_Backpack_Walk_By_Concourse` — Phone In Backpack - Walk By Concourse — MOTION_DISTANCE
34. `SCN_061_Bus_PA_Pulls_Away_From_Stop` — Bus PA Pull Away - Bus Stop — MOTION_DISTANCE
35. `SCN_062_Car_Door_Speaker_Approaches_Parking_Lot` — Car Door Speaker Approaches - Parking Lot — MOTION_DISTANCE
36. `SCN_029_Upstairs_TV_Through_Wall` — Upstairs TV Through Wall — SPACE_ENVIRONMENT
37. `SCN_033_Voice_Behind_Closed_Wooden_Door` — Voice Behind Closed Wooden Door — SPACE_ENVIRONMENT
38. `SCN_036_Radio_In_Car_Trunk` — Radio In Car Trunk — SPACE_ENVIRONMENT
39. `SCN_063_ADR_Small_Office` — ADR Match - Small Office — SPACE_ENVIRONMENT
40. `SCN_064_Direct_Voice_Bathroom` — Direct Voice - Bathroom — SPACE_ENVIRONMENT
41. `SCN_065_Direct_Voice_Stairwell` — Direct Voice - Stairwell — SPACE_ENVIRONMENT
42. `SCN_066_Direct_Voice_Warehouse` — Direct Voice - Warehouse — SPACE_ENVIRONMENT
43. `SCN_067_Direct_Voice_Tunnel_Underpass` — Direct Voice - Tunnel / Underpass — SPACE_ENVIRONMENT
44. `SCN_068_Direct_Voice_Open_Field` — Direct Voice - Open Field — SPACE_ENVIRONMENT
45. `SCN_069_Direct_Voice_Forest` — Direct Voice - Forest — SPACE_ENVIRONMENT
46. `SCN_070_Direct_Voice_Canyon` — Direct Voice - Canyon — SPACE_ENVIRONMENT
47. `SCN_071_Direct_Voice_Beach` — Direct Voice - Beach — SPACE_ENVIRONMENT
48. `SCN_072_Direct_Voice_Sedan_Interior` — Direct Voice - Sedan Interior — SPACE_ENVIRONMENT
49. `SCN_073_Direct_Voice_Airplane_Cabin` — Direct Voice - Airplane Cabin — SPACE_ENVIRONMENT
50. `SCN_074_Voice_Behind_Concrete_Wall` — Voice Behind Concrete Wall — SPACE_ENVIRONMENT

## Reserve list

1. `SCN_002_Mobile_Call_Weak_Signal` — Mobile Call - Weak Signal — Variant overlap: weak-signal behavior remains available through TRANSMISSION/Bad Signal; active list prioritizes emitter diversity.
2. `SCN_004_Hotel_Phone_Corridor_Spill` — Hotel Phone - Corridor Spill — Emitter/space overlap with desk-phone and dedicated environment presets.
3. `SCN_005_Prison_Visiting_Phone` — Prison Visiting Phone — Useful but niche; security-intercom family already represented in active set.
4. `SCN_008_Cordless_Phone_Living_Room` — Cordless Phone - Living Room — Low incremental emitter value versus desk/payphone/conference/mobile coverage.
5. `SCN_009_Phone_In_Pocket_Busy_Street` — Phone In Pocket - Busy Street — Static covered-phone case superseded by broader motion/cover combinations.
6. `SCN_010_Phone_In_Backpack_Station_Concourse` — Phone In Backpack - Station Concourse — Superseded by active moving backpack-phone concourse preset.
7. `SCN_013_Dispatch_Radio_Vehicle_Interior` — Dispatch Radio - Vehicle Interior — Radio-family overlap with police/walkie plus stronger motion/vehicle scenes.
8. `SCN_014_Helicopter_Intercom_Clear` — Helicopter Intercom - Clear — Intercom family retained through aviation/security; helicopter variant kept as reserve.
9. `SCN_015_Helicopter_Intercom_Half_Understandable` — Helicopter Intercom - Half Understandable — Variant overlap; intelligibility and bad-signal controls remain available.
10. `SCN_019_Radio_In_Back_Office` — Radio In Back Office — Static radio/office combination has low incremental value.
11. `SCN_020_Car_Radio_Out_of_Range` — Car Radio - Out of Range — Bad-signal use case retained in module controls; active portfolio prioritizes motion and source diversity.
12. `SCN_024_Airport_Gate_Announcement` — Airport Gate Announcement — PA overlap with active ceiling/station/stadium/airplane presets.
13. `SCN_025_Ceiling_PA_Shopping_Mall` — Ceiling PA - Shopping Mall — PA overlap; ceiling PA remains active in station context.
14. `SCN_026_Bus_Interior_Announcement` — Bus Interior Announcement — Static vehicle-PA overlap; active bus motion presets cover the stronger workflow need.
15. `SCN_028_Captain_Announcement` — Captain Announcement — Near-duplicate of active Airplane Cabin PA.
16. `SCN_030_Party_At_The_Neighbors` — Party At The Neighbors — Barrier case overlap; active set keeps more diagnostic wall/door/floor cases.
17. `SCN_031_Restaurant_Kitchen_Through_Door` — Restaurant Kitchen Through Door — Door-occlusion overlap with active direct-voice wooden-door case.
18. `SCN_032_TV_In_Living_Room_From_Hallway` — TV In Living Room From Hallway — TV/door overlap; active set keeps flat-TV source plus stronger barrier exemplars.
19. `SCN_034_Voice_Behind_Glass_Window` — Voice Behind Glass Window — Lower-priority barrier versus wood/concrete/floor-ceiling; retained as reserve.
20. `SCN_035_Phone_Inside_Suitcase` — Phone Inside Suitcase — Niche cover case; module asset remains manually selectable.
21. `SCN_038_Car_Pass_By_Parking_Lot` — Car Pass By - Parking Lot — Redundant car pass-by; replaced by broader motion variety.
22. `SCN_039_Car_Door_Speaker_Slow_Drive_By` — Car Door Speaker - Slow Drive By — Redundant car pass-by; human-scale and vehicle approach/leave cases now cover motion range.
23. `SCN_044_Toy_Recorder_Bedroom` — Toy Recorder - Bedroom — Niche lo-fi emitter; retained as reserve.
24. `SCN_048_Small_Guitar_Combo_Garage_Room` — Small Guitar Combo - Garage Room — Lower relevance to primary post/worldizing focus than active broadcast/comms/playback emitters.

## Guardrails

- Reserve presets are not deleted.
- Reserve catalog entries use `SCENE_PRESET_RESERVE`, so they no longer appear as active Factory scenes.
- Existing SOURCE / TRANSMISSION / WALL_COVER / SPACE_ENVIRONMENT catalog assets remain selectable manually.
- No DSP implementation was changed.
- No GitHub Actions workflow was added or executed.
- Numerical values are starting points for audition, not claimed as final acoustic truth.
