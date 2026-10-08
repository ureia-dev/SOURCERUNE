# UI_02 — 139 個可見元件、文字、功能及 2.5 倍座標

原圖 `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png` 1672×941 RGB SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。有效檢視倍率 **2.5×**，PNG **4180×2353**，SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`；不是舊版 10 倍。941×2.5=2352.5，因此輸出像素採 **ROUND_HALF_UP** 到 2353；分析座標保留原值×2.5 浮點精度。

139 筆沿用 PR #53 已核對的同一來源畫面及原始 1× 視覺候選框，逐筆換成 **2.5×**，未重新猜測。所有 `APPROX-VISUAL` 仍為估計，並非 139 筆逐像素已驗。原始文本、按鈕名稱、可能功能及 Web selector 線索完整保留於 JSON，實際互動/host parity 為 PENDING。

類別統計：button 24、card 5、dynamic_callout 1、dynamic_icon 1、dynamic_marker 6、dynamic_readout 4、dynamic_text 8、icon 16、interactive_graph 1、knob 8、live_graph 1、live_meter 4、live_path 1、logo 1、macro_panel 5、meter_frame 2、node 3、panel 1、photo 6、scale 4、scene 1、select 8、slider 2、symbol 1、text 22、toggle 1、waveform 2。

| ID | 區域 | 1× x,y,w,h | 2.5× x,y,w,h | 中心 1× → 2.5× | 型態 | 可見內容 | 預期功能 | 可信度 |
|---|---|---|---|---|---|---|---|---|
| `BRAND_LOGO_ICON` | GLOBAL | 29, 21, 70, 42 | 72.5, 52.5, 175, 105 | 64,42→160,105 | logo | blue acoustic line symbol |  | APPROX-VISUAL |
| `BRAND_NAME` | GLOBAL | 112, 15, 159, 31 | 280, 37.5, 397.5, 77.5 | 191.5,30.5→478.75,76.25 | text | SCENE |  | APPROX-VISUAL |
| `BRAND_SUBTITLE` | GLOBAL | 111, 48, 176, 20 | 277.5, 120, 440, 50 | 199,58→497.5,145 | text | AUDIO REALITY ENGINE |  | APPROX-VISUAL |
| `TOPBAR_PREVIOUS` | GLOBAL | 429, 16, 49, 46 | 1072.5, 40, 122.5, 115 | 453.5,39→1133.75,97.5 | button | ‹ | Previous preset | APPROX-VISUAL |
| `TOPBAR_NEXT` | GLOBAL | 479, 16, 47, 46 | 1197.5, 40, 117.5, 115 | 502.5,39→1256.25,97.5 | button | › | Next preset | APPROX-VISUAL |
| `TOPBAR_PRESET_SELECTOR` | GLOBAL | 527, 16, 333, 46 | 1317.5, 40, 832.5, 115 | 693.5,39→1733.75,97.5 | select | Car Pass By - City Street | Preset load | APPROX-VISUAL |
| `TOPBAR_PRESET_ARROW` | GLOBAL | 828, 32, 23, 16 | 2070, 80, 57.5, 40 | 839.5,40→2098.75,100 | icon | ▾ | Preset dropdown | APPROX-VISUAL |
| `TOPBAR_SHUFFLE` | GLOBAL | 876, 26, 31, 27 | 2190, 65, 77.5, 67.5 | 891.5,39.5→2228.75,98.75 | icon | crossed arrows | SHUFFLE SEMANTICS UNAPPROVED; NO BINDING | APPROX-VISUAL+MISSING-RUNTIME |
| `TOPBAR_SNAPSHOT_A` | GLOBAL | 935, 17, 35, 45 | 2337.5, 42.5, 87.5, 112.5 | 952.5,39.5→2381.25,98.75 | button | A | Recall/store Snapshot A | APPROX-VISUAL |
| `TOPBAR_SNAPSHOT_B` | GLOBAL | 969, 17, 35, 45 | 2422.5, 42.5, 87.5, 112.5 | 986.5,39.5→2466.25,98.75 | button | B | Recall/store Snapshot B | APPROX-VISUAL |
| `TOPBAR_FOLDER` | GLOBAL | 1038, 29, 28, 23 | 2595, 72.5, 70, 57.5 | 1052,40.5→2630,101.25 | button | folder icon | Open preset library | APPROX-VISUAL |
| `TOPBAR_SETTINGS` | GLOBAL | 1604, 26, 27, 27 | 4010, 65, 67.5, 67.5 | 1617.5,39.5→4043.75,98.75 | button | gear icon | Open Settings | APPROX-VISUAL |
| `TOPBAR_INPUT_LABEL` | GLOBAL | 1151, 14, 65, 30 | 2877.5, 35, 162.5, 75 | 1183.5,29→2958.75,72.5 | text | INPUT | Shows input meters | APPROX-VISUAL |
| `TOPBAR_INPUT_METER_BG` | GLOBAL | 1207, 10, 167, 62 | 3017.5, 25, 417.5, 155 | 1290.5,41→3226.25,102.5 | meter_frame | input stereo bars | Live input meter | APPROX-VISUAL |
| `TOPBAR_INPUT_METER_UPPER` | GLOBAL | 1218, 18, 140, 9 | 3045, 45, 350, 22.5 | 1288,22.5→3220,56.25 | live_meter | Input upper channel | Live scale and fill | APPROX-VISUAL |
| `TOPBAR_INPUT_METER_LOWER` | GLOBAL | 1218, 32, 140, 9 | 3045, 80, 350, 22.5 | 1288,36.5→3220,91.25 | live_meter | Input lower channel | Live scale and fill | APPROX-VISUAL |
| `TOPBAR_INPUT_SCALE` | GLOBAL | 1209, 49, 158, 18 | 3022.5, 122.5, 395, 45 | 1288,58→3220,145 | scale | -60 -36 -24 -12 -6 0 | Live/static meter tick labeling | APPROX-VISUAL |
| `TOPBAR_OUTPUT_LABEL` | GLOBAL | 1388, 14, 77, 30 | 3470, 35, 192.5, 75 | 1426.5,29→3566.25,72.5 | text | OUTPUT | Shows output meters | APPROX-VISUAL |
| `TOPBAR_OUTPUT_METER_BG` | GLOBAL | 1461, 10, 129, 62 | 3652.5, 25, 322.5, 155 | 1525.5,41→3813.75,102.5 | meter_frame | output stereo bars | Live output meter | APPROX-VISUAL |
| `TOPBAR_OUTPUT_METER_UPPER` | GLOBAL | 1469, 18, 108, 9 | 3672.5, 45, 270, 22.5 | 1523,22.5→3807.5,56.25 | live_meter | Output upper channel | Live scale and fill | APPROX-VISUAL |
| `TOPBAR_OUTPUT_METER_LOWER` | GLOBAL | 1469, 32, 108, 9 | 3672.5, 80, 270, 22.5 | 1523,36.5→3807.5,91.25 | live_meter | Output lower channel | Live scale and fill | APPROX-VISUAL |
| `TOPBAR_OUTPUT_SCALE` | GLOBAL | 1468, 49, 121, 18 | 3670, 122.5, 302.5, 45 | 1528.5,58→3821.25,145 | scale | -60 -36 -24 -12 -6 0 | Live/static meter ticks | APPROX-VISUAL |
| `CARD_SOURCE_FRAME` | CARD_SOURCE | 14, 87, 329, 205 | 35, 217.5, 822.5, 512.5 | 178.5,189.5→446.25,473.75 | card | SOURCE / Car Speaker | Card model/asset selection | SPEC-DERIVED+APPROX-BORDER |
| `CARD_SOURCE_ICON` | CARD_SOURCE | 32, 106, 39, 40 | 80, 265, 97.5, 100 | 51.5,126→128.75,315 | icon | car |  | APPROX-VISUAL |
| `CARD_SOURCE_TITLE` | CARD_SOURCE | 95, 104, 166, 27 | 237.5, 260, 415, 67.5 | 178,117.5→445,293.75 | text | SOURCE |  | APPROX-VISUAL |
| `CARD_SOURCE_SELECTED` | CARD_SOURCE | 99, 133, 190, 26 | 247.5, 332.5, 475, 65 | 194,146→485,365 | text | Car Speaker | Selected semantic model; click to switch | APPROX-VISUAL |
| `CARD_SOURCE_SMALL_CHEVRON` | CARD_SOURCE | 275, 138, 15, 13 | 687.5, 345, 37.5, 32.5 | 282.5,144.5→706.25,361.25 | icon | ⌄ | Next semantic item? Unknown | APPROX-VISUAL |
| `CARD_SOURCE_HEADER_NEXT` | CARD_SOURCE | 296, 133, 27, 32 | 740, 332.5, 67.5, 80 | 309.5,149→773.75,372.5 | button | › | Asset navigation candidate | APPROX-VISUAL |
| `CARD_SOURCE_HERO_IMAGE` | CARD_SOURCE | 31, 168, 295, 116 | 77.5, 420, 737.5, 290 | 178.5,226→446.25,565 | photo | SOURCE photographic semantic art | Swap selected image | APPROX-VISUAL |
| `CARD_SOURCE_IMAGE_PREV` | CARD_SOURCE | 35, 206, 31, 41 | 87.5, 515, 77.5, 102.5 | 50.5,226.5→126.25,566.25 | button | ‹ | Previous available semantic artwork | APPROX-VISUAL |
| `CARD_SOURCE_IMAGE_NEXT` | CARD_SOURCE | 292, 206, 31, 41 | 730, 515, 77.5, 102.5 | 307.5,226.5→768.75,566.25 | button | › | Next available semantic artwork | APPROX-VISUAL |
| `CARD_TRANSMISSION_FRAME` | CARD_TRANSMISSION | 14, 303, 329, 174 | 35, 757.5, 822.5, 435 | 178.5,390→446.25,975 | card | TRANSMISSION / Mobile Call | Card model/asset selection | SPEC-DERIVED+APPROX-BORDER |
| `CARD_TRANSMISSION_ICON` | CARD_TRANSMISSION | 32, 322, 39, 40 | 80, 805, 97.5, 100 | 51.5,342→128.75,855 | icon | phone |  | APPROX-VISUAL |
| `CARD_TRANSMISSION_TITLE` | CARD_TRANSMISSION | 95, 320, 166, 27 | 237.5, 800, 415, 67.5 | 178,333.5→445,833.75 | text | TRANSMISSION |  | APPROX-VISUAL |
| `CARD_TRANSMISSION_SELECTED` | CARD_TRANSMISSION | 99, 349, 190, 26 | 247.5, 872.5, 475, 65 | 194,362→485,905 | text | Mobile Call | Selected semantic model; click to switch | APPROX-VISUAL |
| `CARD_TRANSMISSION_SMALL_CHEVRON` | CARD_TRANSMISSION | 275, 354, 15, 13 | 687.5, 885, 37.5, 32.5 | 282.5,360.5→706.25,901.25 | icon | ⌄ | Next semantic item? Unknown | APPROX-VISUAL |
| `CARD_TRANSMISSION_HEADER_NEXT` | CARD_TRANSMISSION | 296, 349, 27, 32 | 740, 872.5, 67.5, 80 | 309.5,365→773.75,912.5 | button | › | Asset navigation candidate | APPROX-VISUAL |
| `CARD_TRANSMISSION_HERO_IMAGE` | CARD_TRANSMISSION | 30, 382, 297, 84 | 75, 955, 742.5, 210 | 178.5,424→446.25,1060 | photo | TRANSMISSION photographic semantic art | Swap selected image | APPROX-VISUAL |
| `CARD_TRANSMISSION_IMAGE_PREV` | CARD_TRANSMISSION | 34, 404, 31, 41 | 85, 1010, 77.5, 102.5 | 49.5,424.5→123.75,1061.25 | button | ‹ | Previous available semantic artwork | APPROX-VISUAL |
| `CARD_TRANSMISSION_IMAGE_NEXT` | CARD_TRANSMISSION | 293, 404, 31, 41 | 732.5, 1010, 77.5, 102.5 | 308.5,424.5→771.25,1061.25 | button | › | Next available semantic artwork | APPROX-VISUAL |
| `CARD_WALL_COVER_FRAME` | CARD_WALL_COVER | 14, 488, 329, 241 | 35, 1220, 822.5, 602.5 | 178.5,608.5→446.25,1521.25 | card | WALL / COVER / None | Card model/asset selection | SPEC-DERIVED+APPROX-BORDER |
| `CARD_WALL_COVER_ICON` | CARD_WALL_COVER | 32, 507, 39, 40 | 80, 1267.5, 97.5, 100 | 51.5,527→128.75,1317.5 | icon | cube/cover |  | APPROX-VISUAL |
| `CARD_WALL_COVER_TITLE` | CARD_WALL_COVER | 95, 505, 166, 27 | 237.5, 1262.5, 415, 67.5 | 178,518.5→445,1296.25 | text | WALL / COVER |  | APPROX-VISUAL |
| `CARD_WALL_COVER_SELECTED` | CARD_WALL_COVER | 99, 534, 190, 26 | 247.5, 1335, 475, 65 | 194,547→485,1367.5 | text | None | Selected semantic model; click to switch | APPROX-VISUAL |
| `CARD_WALL_COVER_SMALL_CHEVRON` | CARD_WALL_COVER | 275, 539, 15, 13 | 687.5, 1347.5, 37.5, 32.5 | 282.5,545.5→706.25,1363.75 | icon | ⌄ | Next semantic item? Unknown | APPROX-VISUAL |
| `CARD_WALL_COVER_HEADER_NEXT` | CARD_WALL_COVER | 296, 534, 27, 32 | 740, 1335, 67.5, 80 | 309.5,550→773.75,1375 | button | › | Asset navigation candidate | APPROX-VISUAL |
| `CARD_WALL_COVER_HERO_IMAGE` | CARD_WALL_COVER | 30, 570, 297, 144 | 75, 1425, 742.5, 360 | 178.5,642→446.25,1605 | photo | WALL_COVER photographic semantic art | Swap selected image | APPROX-VISUAL |
| `CARD_WALL_COVER_IMAGE_PREV` | CARD_WALL_COVER | 34, 622, 31, 41 | 85, 1555, 77.5, 102.5 | 49.5,642.5→123.75,1606.25 | button | ‹ | Previous available semantic artwork | APPROX-VISUAL |
| `CARD_WALL_COVER_IMAGE_NEXT` | CARD_WALL_COVER | 293, 622, 31, 41 | 732.5, 1555, 77.5, 102.5 | 308.5,642.5→771.25,1606.25 | button | › | Next available semantic artwork | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_FRAME` | CARD_SPACE_ENVIRONMENT | 1310, 87, 326, 281 | 3275, 217.5, 815, 702.5 | 1473,227.5→3682.5,568.75 | card | SPACE / ENVIRONMENT / City Street | Card model/asset selection | SPEC-DERIVED+APPROX-BORDER |
| `CARD_SPACE_ENVIRONMENT_ICON` | CARD_SPACE_ENVIRONMENT | 1328, 106, 39, 40 | 3320, 265, 97.5, 100 | 1347.5,126→3368.75,315 | icon | building |  | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_TITLE` | CARD_SPACE_ENVIRONMENT | 1389, 104, 226, 27 | 3472.5, 260, 565, 67.5 | 1502,117.5→3755,293.75 | text | SPACE / ENVIRONMENT |  | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_SELECT` | CARD_SPACE_ENVIRONMENT | 1390, 152, 205, 39 | 3475, 380, 512.5, 97.5 | 1492.5,171.5→3731.25,428.75 | select | City Street | Choose semantic SPACE_ENVIRONMENT | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_HERO_IMAGE` | CARD_SPACE_ENVIRONMENT | 1328, 204, 290, 148 | 3320, 510, 725, 370 | 1473,278→3682.5,695 | photo | SPACE_ENVIRONMENT photographic semantic art | Swap selected image | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_IMAGE_PREV` | CARD_SPACE_ENVIRONMENT | 1332, 258, 31, 41 | 3330, 645, 77.5, 102.5 | 1347.5,278.5→3368.75,696.25 | button | ‹ | Previous available semantic artwork | APPROX-VISUAL |
| `CARD_SPACE_ENVIRONMENT_IMAGE_NEXT` | CARD_SPACE_ENVIRONMENT | 1584, 258, 31, 41 | 3960, 645, 77.5, 102.5 | 1599.5,278.5→3998.75,696.25 | button | › | Next available semantic artwork | APPROX-VISUAL |
| `CARD_AMBIENCE_FRAME` | CARD_AMBIENCE | 1310, 376, 326, 354 | 3275, 940, 815, 885 | 1473,553→3682.5,1382.5 | card | AMBIENCE / Traffic | Card model/asset selection | SPEC-DERIVED+APPROX-BORDER |
| `CARD_AMBIENCE_ICON` | CARD_AMBIENCE | 1328, 395, 39, 40 | 3320, 987.5, 97.5, 100 | 1347.5,415→3368.75,1037.5 | icon | waveform |  | APPROX-VISUAL |
| `CARD_AMBIENCE_TITLE` | CARD_AMBIENCE | 1389, 393, 226, 27 | 3472.5, 982.5, 565, 67.5 | 1502,406.5→3755,1016.25 | text | AMBIENCE |  | APPROX-VISUAL |
| `CARD_AMBIENCE_SELECT` | CARD_AMBIENCE | 1390, 441, 205, 39 | 3475, 1102.5, 512.5, 97.5 | 1492.5,460.5→3731.25,1151.25 | select | Traffic | Choose semantic AMBIENCE | APPROX-VISUAL |
| `CARD_AMBIENCE_HERO_IMAGE` | CARD_AMBIENCE | 1328, 490, 290, 156 | 3320, 1225, 725, 390 | 1473,568→3682.5,1420 | photo | AMBIENCE photographic semantic art | Swap selected image | APPROX-VISUAL |
| `CARD_AMBIENCE_IMAGE_PREV` | CARD_AMBIENCE | 1332, 548, 31, 41 | 3330, 1370, 77.5, 102.5 | 1347.5,568.5→3368.75,1421.25 | button | ‹ | Previous available semantic artwork | APPROX-VISUAL |
| `CARD_AMBIENCE_IMAGE_NEXT` | CARD_AMBIENCE | 1584, 548, 31, 41 | 3960, 1370, 77.5, 102.5 | 1599.5,568.5→3998.75,1421.25 | button | › | Next available semantic artwork | APPROX-VISUAL |
| `SCENE_CONTAINER` | SCENE | 355, 86, 944, 357 | 887.5, 215, 2360, 892.5 | 827,264.5→2067.5,661.25 | scene | City street at night, moving car and listener | Scene/motion renderer | SPEC-DERIVED+APPROX-BORDER |
| `SCENE_PHOTO_BACKGROUND` | SCENE | 356, 87, 941, 354 | 890, 217.5, 2352.5, 885 | 826.5,264→2066.25,660 | photo | Wet night urban street, moving vehicle and person | Scenario texture from selected space/environment | APPROX-VISUAL |
| `SCENE_3D_VIEW_BUTTON` | SCENE | 1027, 101, 96, 38 | 2567.5, 252.5, 240, 95 | 1075,120→2687.5,300 | button | 3D View | Switch 3D perspective | APPROX-VISUAL |
| `SCENE_TOP_VIEW_BUTTON` | SCENE | 1124, 101, 99, 38 | 2810, 252.5, 247.5, 95 | 1173.5,120→2933.75,300 | button | Top View | Switch top-down perspective | APPROX-VISUAL |
| `SCENE_FULLSCREEN` | SCENE | 1240, 100, 43, 39 | 3100, 250, 107.5, 97.5 | 1261.5,119.5→3153.75,298.75 | button | ⛶ | Fullscreen | APPROX-VISUAL |
| `SCENE_CAR_GLYPH` | SCENE | 556, 296, 60, 37 | 1390, 740, 150, 92.5 | 586,314.5→1465,786.25 | dynamic_marker | moving car source glow | Live moving emitter marker | APPROX-VISUAL |
| `SCENE_SOURCE_CALLOUT` | SCENE | 498, 213, 151, 58 | 1245, 532.5, 377.5, 145 | 573.5,242→1433.75,605 | dynamic_callout | Source / Car Speaker | Labels emitter and source model | APPROX-VISUAL |
| `SCENE_SOURCE_POINTER` | SCENE | 564, 281, 42, 37 | 1410, 702.5, 105, 92.5 | 585,299.5→1462.5,748.75 | dynamic_marker | Source location | Drag/move via motion path (verify) | APPROX-VISUAL |
| `SCENE_LISTENER_GLYPH` | SCENE | 987, 325, 61, 48 | 2467.5, 812.5, 152.5, 120 | 1017.5,349→2543.75,872.5 | dynamic_marker | white listener node / target rings | Live listener marker | APPROX-VISUAL |
| `SCENE_LISTENER_LABEL` | SCENE | 1040, 326, 83, 33 | 2600, 815, 207.5, 82.5 | 1081.5,342.5→2703.75,856.25 | dynamic_text | Listener | Listener name label | APPROX-VISUAL |
| `SCENE_TRANSPORT_WAVE` | SCENE | 696, 320, 327, 48 | 1740, 800, 817.5, 120 | 859.5,344→2148.75,860 | waveform | white moving sound wave | Waveform must stay live | APPROX-VISUAL |
| `SCENE_MOTION_DOTTED_PATH` | SCENE | 590, 332, 409, 23 | 1475, 830, 1022.5, 57.5 | 794.5,343.5→1986.25,858.75 | live_path | cyan dotted emitter→listener line | Source path must remain dynamic | APPROX-VISUAL |
| `MOTION_DECK` | MOTION | 355, 444, 944, 286 | 887.5, 1110, 2360, 715 | 827,587→2067.5,1467.5 | panel | large distance dial + 3 knobs + mini path | Motion & distance controller | SPEC-DERIVED+APPROX-BORDER |
| `DISTANCE_DIAL_RING` | MOTION | 397, 391, 348, 322 | 992.5, 977.5, 870, 805 | 571,552→1427.5,1380 | knob | blue circular distance dial; native base 300px | Adjust distance, pointer live | APPROX-VISUAL |
| `DISTANCE_CENTER_VALUE` | MOTION | 499, 525, 181, 55 | 1247.5, 1312.5, 452.5, 137.5 | 589.5,552.5→1473.75,1381.25 | dynamic_text | 25.0 m | Current distance metres | APPROX-VISUAL |
| `DISTANCE_CAPTION` | MOTION | 522, 583, 114, 26 | 1305, 1457.5, 285, 65 | 579,596→1447.5,1490 | text | DISTANCE |  | APPROX-VISUAL |
| `DISTANCE_INFINITY` | MOTION | 547, 618, 40, 26 | 1367.5, 1545, 100, 65 | 567,631→1417.5,1577.5 | symbol | ∞ | Signal/scale meaning pending | APPROX-VISUAL |
| `DISTANCE_MINI_SLIDER` | MOTION | 463, 655, 208, 15 | 1157.5, 1637.5, 520, 37.5 | 567,662.5→1417.5,1656.25 | slider | blue progress 0.2–100 | Distance adjustment | APPROX-VISUAL |
| `DISTANCE_SLIDER_TICKS` | MOTION | 461, 677, 217, 26 | 1152.5, 1692.5, 542.5, 65 | 569.5,690→1423.75,1725 | scale | 0.2 / 1 / 5 / 20 / 100 | Distance scale labels | APPROX-VISUAL |
| `MOTION_ICON` | MOTION | 780, 468, 29, 22 | 1950, 1170, 72.5, 55 | 794.5,479→1986.25,1197.5 | icon | car symbol |  | APPROX-VISUAL |
| `MOTION_TITLE` | MOTION | 822, 460, 115, 34 | 2055, 1150, 287.5, 85 | 879.5,477→2198.75,1192.5 | text | MOTION |  | APPROX-VISUAL |
| `MOTION_MODE` | MOTION | 927, 455, 254, 44 | 2317.5, 1137.5, 635, 110 | 1054,477→2635,1192.5 | select | Pass By | Select STATIC/Approach/Pass By/Leave/Manual | APPROX-VISUAL |
| `MOTION_GRAPH` | MOTION | 779, 510, 494, 94 | 1947.5, 1275, 1235, 235 | 1026,557→2565,1392.5 | interactive_graph | motion arc over time | Live distance/motion envelope | APPROX-VISUAL |
| `MOTION_GRAPH_CAR` | MOTION | 993, 511, 57, 27 | 2482.5, 1277.5, 142.5, 67.5 | 1021.5,524.5→2553.75,1311.25 | dynamic_icon | moving car on arc | Follow motion state | APPROX-VISUAL |
| `MOTION_GRAPH_START` | MOTION | 798, 581, 40, 27 | 1995, 1452.5, 100, 67.5 | 818,594.5→2045,1486.25 | dynamic_marker | Start point | Set start timing | APPROX-VISUAL |
| `MOTION_GRAPH_CLOSEST` | MOTION | 1005, 539, 38, 68 | 2512.5, 1347.5, 95, 170 | 1024,573→2560,1432.5 | dynamic_marker | Closest point | Set closest timing | APPROX-VISUAL |
| `MOTION_GRAPH_END` | MOTION | 1217, 577, 42, 29 | 3042.5, 1442.5, 105, 72.5 | 1238,591.5→3095,1478.75 | dynamic_marker | End point | Set end timing | APPROX-VISUAL |
| `MOTION_START_VALUE` | MOTION | 791, 600, 78, 52 | 1977.5, 1500, 195, 130 | 830,626→2075,1565 | dynamic_readout | Start 80 m | Start Distance | APPROX-VISUAL |
| `MOTION_CLOSEST_VALUE` | MOTION | 988, 600, 80, 52 | 2470, 1500, 200, 130 | 1028,626→2570,1565 | dynamic_readout | Closest 3 m | Closest Distance | APPROX-VISUAL |
| `MOTION_END_VALUE` | MOTION | 1198, 600, 86, 52 | 2995, 1500, 215, 130 | 1241,626→3102.5,1565 | dynamic_readout | End 120 m | End Distance | APPROX-VISUAL |
| `MOTION_SPEED_KNOB` | MOTION | 791, 663, 54, 54 | 1977.5, 1657.5, 135, 135 | 818,690→2045,1725 | knob | SPEED circular cap | Drag/wheel/keyboard to adjust | APPROX-VISUAL |
| `MOTION_SPEED_LABEL` | MOTION | 866, 666, 81, 25 | 2165, 1665, 202.5, 62.5 | 906.5,678.5→2266.25,1696.25 | text | Speed |  | APPROX-VISUAL |
| `MOTION_SPEED_VALUE` | MOTION | 867, 691, 65, 27 | 2167.5, 1727.5, 162.5, 67.5 | 899.5,704.5→2248.75,1761.25 | dynamic_text | 60% | Current SPEED state | APPROX-VISUAL |
| `MOTION_DOPPLER_KNOB` | MOTION | 963, 663, 54, 54 | 2407.5, 1657.5, 135, 135 | 990,690→2475,1725 | knob | DOPPLER circular cap | Drag/wheel/keyboard to adjust | APPROX-VISUAL |
| `MOTION_DOPPLER_LABEL` | MOTION | 1038, 666, 81, 25 | 2595, 1665, 202.5, 62.5 | 1078.5,678.5→2696.25,1696.25 | text | Doppler |  | APPROX-VISUAL |
| `MOTION_DOPPLER_VALUE` | MOTION | 1039, 691, 65, 27 | 2597.5, 1727.5, 162.5, 67.5 | 1071.5,704.5→2678.75,1761.25 | dynamic_text | 70% | Current DOPPLER state | APPROX-VISUAL |
| `MOTION_WIDTH_KNOB` | MOTION | 1151, 663, 54, 54 | 2877.5, 1657.5, 135, 135 | 1178,690→2945,1725 | knob | WIDTH circular cap | Drag/wheel/keyboard to adjust | APPROX-VISUAL |
| `MOTION_WIDTH_LABEL` | MOTION | 1226, 666, 81, 25 | 3065, 1665, 202.5, 62.5 | 1266.5,678.5→3166.25,1696.25 | text | Width |  | APPROX-VISUAL |
| `MOTION_WIDTH_VALUE` | MOTION | 1227, 691, 65, 27 | 3067.5, 1727.5, 162.5, 67.5 | 1259.5,704.5→3148.75,1761.25 | dynamic_text | 40% | Current WIDTH state | APPROX-VISUAL |
| `AMBIENCE_LEVEL_SLIDER` | AMBIENCE | 1331, 677, 231, 12 | 3327.5, 1692.5, 577.5, 30 | 1446.5,683→3616.25,1707.5 | slider | horizontal level cyan | Ambience level adjustment | APPROX-VISUAL |
| `AMBIENCE_LEVEL_VALUE` | AMBIENCE | 1574, 671, 57, 33 | 3935, 1677.5, 142.5, 82.5 | 1602.5,687.5→4006.25,1718.75 | dynamic_readout | 70% | Ambience level (reference sample) | APPROX-VISUAL |
| `BOTTOM_BAD_SIGNAL_FRAME` | BOTTOM | 14, 744, 330, 168 | 35, 1860, 825, 420 | 179,828→447.5,2070 | macro_panel | BAD SIGNAL | Module available; open Advanced | SPEC-DERIVED+APPROX-BORDER |
| `BOTTOM_CONDITION_FRAME` | BOTTOM | 357, 744, 309, 168 | 892.5, 1860, 772.5, 420 | 511.5,828→1278.75,2070 | macro_panel | CONDITION | Module available; open Advanced | SPEC-DERIVED+APPROX-BORDER |
| `BOTTOM_INTELLIGIBILITY_FRAME` | BOTTOM | 679, 744, 290, 168 | 1697.5, 1860, 725, 420 | 824,828→2060,2070 | macro_panel | INTELLIGIBILITY | Module available; open Advanced | SPEC-DERIVED+APPROX-BORDER |
| `BOTTOM_MIX_FRAME` | BOTTOM | 981, 744, 312, 168 | 2452.5, 1860, 780, 420 | 1137,828→2842.5,2070 | macro_panel | MIX | Module available; open Advanced | SPEC-DERIVED+APPROX-BORDER |
| `BOTTOM_EQ_FRAME` | BOTTOM | 1305, 744, 328, 168 | 3262.5, 1860, 820, 420 | 1469,828→3672.5,2070 | macro_panel | EQ / TONE (ADVANCED) | Module available; open Advanced | SPEC-DERIVED+APPROX-BORDER |
| `BAD_SIGNAL_ICON` | BOTTOM_BAD_SIGNAL | 43, 760, 39, 37 | 107.5, 1900, 97.5, 92.5 | 62.5,778.5→156.25,1946.25 | icon | BAD_SIGNAL icon |  | APPROX-VISUAL |
| `BAD_SIGNAL_TITLE` | BOTTOM_BAD_SIGNAL | 95, 762, 217, 34 | 237.5, 1905, 542.5, 85 | 203.5,779→508.75,1947.5 | text | BAD SIGNAL |  | APPROX-VISUAL |
| `CONDITION_ICON` | BOTTOM_CONDITION | 386, 760, 39, 37 | 965, 1900, 97.5, 92.5 | 405.5,778.5→1013.75,1946.25 | icon | CONDITION icon |  | APPROX-VISUAL |
| `CONDITION_TITLE` | BOTTOM_CONDITION | 438, 762, 197, 34 | 1095, 1905, 492.5, 85 | 536.5,779→1341.25,1947.5 | text | CONDITION |  | APPROX-VISUAL |
| `INTELLIGIBILITY_ICON` | BOTTOM_INTELLIGIBILITY | 708, 760, 39, 37 | 1770, 1900, 97.5, 92.5 | 727.5,778.5→1818.75,1946.25 | icon | INTELLIGIBILITY icon |  | APPROX-VISUAL |
| `INTELLIGIBILITY_TITLE` | BOTTOM_INTELLIGIBILITY | 760, 762, 178, 34 | 1900, 1905, 445, 85 | 849,779→2122.5,1947.5 | text | INTELLIGIBILITY |  | APPROX-VISUAL |
| `MIX_ICON` | BOTTOM_MIX | 1010, 760, 39, 37 | 2525, 1900, 97.5, 92.5 | 1029.5,778.5→2573.75,1946.25 | icon | MIX icon |  | APPROX-VISUAL |
| `MIX_TITLE` | BOTTOM_MIX | 1062, 762, 200, 34 | 2655, 1905, 500, 85 | 1162,779→2905,1947.5 | text | MIX |  | APPROX-VISUAL |
| `EQ_TONE_ICON` | BOTTOM_EQ_TONE | 1334, 760, 39, 37 | 3335, 1900, 97.5, 92.5 | 1353.5,778.5→3383.75,1946.25 | icon | EQ_TONE icon |  | APPROX-VISUAL |
| `EQ_TONE_TITLE` | BOTTOM_EQ_TONE | 1386, 762, 216, 34 | 3465, 1905, 540, 85 | 1494,779→3735,1947.5 | text | EQ / TONE (ADVANCED) |  | APPROX-VISUAL |
| `BAD_SIGNAL_AMOUNT_KNOB` | BOTTOM_BAD_SIGNAL | 57, 802, 85, 86 | 142.5, 2005, 212.5, 215 | 99.5,845→248.75,2112.5 | knob | Amount blue perimeter 20% | Transmission degradation intensity | APPROX-VISUAL |
| `BAD_SIGNAL_AMOUNT_VALUE` | BOTTOM_BAD_SIGNAL | 156, 829, 66, 37 | 390, 2072.5, 165, 92.5 | 189,847.5→472.5,2118.75 | dynamic_text | 20% | Bad Signal intensity | APPROX-VISUAL |
| `BAD_SIGNAL_WAVEFORM` | BOTTOM_BAD_SIGNAL | 218, 813, 109, 24 | 545, 2032.5, 272.5, 60 | 272.5,825→681.25,2062.5 | waveform | cyan waveform preview | Preview from selected transmission state | APPROX-VISUAL |
| `BAD_SIGNAL_MODE_SELECTOR` | BOTTOM_BAD_SIGNAL | 218, 857, 109, 36 | 545, 2142.5, 272.5, 90 | 272.5,875→681.25,2187.5 | select | Mobile | Select transmission family | APPROX-VISUAL |
| `CONDITION_AMOUNT_KNOB` | BOTTOM_CONDITION | 390, 800, 82, 89 | 975, 2000, 205, 222.5 | 431,844.5→1077.5,2111.25 | knob | Condition knob Used | Condition amount | APPROX-VISUAL |
| `CONDITION_SELECTOR` | BOTTOM_CONDITION | 488, 817, 162, 45 | 1220, 2042.5, 405, 112.5 | 569,839.5→1422.5,2098.75 | select | Used | Select device condition family | APPROX-VISUAL |
| `INTELLIGIBILITY_KNOB` | BOTTOM_INTELLIGIBILITY | 716, 803, 94, 89 | 1790, 2007.5, 235, 222.5 | 763,847.5→1907.5,2118.75 | knob | Intelligibility knob 75% | Intelligibility amount | APPROX-VISUAL |
| `INTELLIGIBILITY_VALUE` | BOTTOM_INTELLIGIBILITY | 831, 823, 101, 40 | 2077.5, 2057.5, 252.5, 100 | 881.5,843→2203.75,2107.5 | dynamic_text | 75% | Current intelligibility value | APPROX-VISUAL |
| `MIX_KNOB` | BOTTOM_MIX | 1035, 796, 86, 86 | 2587.5, 1990, 215, 215 | 1078,839→2695,2097.5 | knob | Wet mix 100% | Mix original/full scene | APPROX-VISUAL |
| `MIX_VALUE` | BOTTOM_MIX | 1061, 878, 64, 27 | 2652.5, 2195, 160, 67.5 | 1093,891.5→2732.5,2228.75 | dynamic_text | 100% | Current Mix amount | APPROX-VISUAL |
| `MIX_MODE_SELECTOR` | BOTTOM_MIX | 1157, 822, 113, 43 | 2892.5, 2055, 282.5, 107.5 | 1213.5,843.5→3033.75,2108.75 | select | Wet | Select Wet | APPROX-VISUAL |
| `MIX_NEXT_CHEVRON` | BOTTOM_MIX | 1259, 765, 22, 23 | 3147.5, 1912.5, 55, 57.5 | 1270,776.5→3175,1941.25 | button | › | Open detail candidate | APPROX-VISUAL |
| `EQ_HEADER_ENABLE` | BOTTOM_EQ_TONE | 1546, 761, 33, 22 | 3865, 1902.5, 82.5, 55 | 1562.5,772→3906.25,1930 | toggle | On/Off graphic | EQ bypass state | APPROX-VISUAL |
| `EQ_POWER` | BOTTOM_EQ_TONE | 1582, 756, 36, 39 | 3955, 1890, 90, 97.5 | 1600,775.5→4000,1938.75 | button | power | EQ on/off | APPROX-VISUAL |
| `EQ_GRAPH` | BOTTOM_EQ_TONE | 1330, 799, 288, 83 | 3325, 1997.5, 720, 207.5 | 1474,840.5→3685,2101.25 | live_graph | sloping spectrum response curve | EQ response must remain dynamically computed | APPROX-VISUAL |
| `EQ_CURVE_POINT_A` | BOTTOM_EQ_TONE | 1330, 825, 14, 14 | 3325, 2062.5, 35, 35 | 1337,832→3342.5,2080 | node | 100Hz sample node | EQ node? actual DSP bands count pending | APPROX-VISUAL |
| `EQ_CURVE_POINT_B` | BOTTOM_EQ_TONE | 1440, 819, 14, 14 | 3600, 2047.5, 35, 35 | 1447,826→3617.5,2065 | node | ~1K sample node | EQ node? actual DSP bands count pending | APPROX-VISUAL |
| `EQ_CURVE_POINT_C` | BOTTOM_EQ_TONE | 1559, 859, 14, 14 | 3897.5, 2147.5, 35, 35 | 1566,866→3915,2165 | node | 10K sample node | EQ node? actual DSP bands count pending | APPROX-VISUAL |
| `EQ_CURVE_TICKS` | BOTTOM_EQ_TONE | 1330, 879, 270, 24 | 3325, 2197.5, 675, 60 | 1465,891→3662.5,2227.5 | scale | 100 / 1K / 10K | EQ chart frequency labels | APPROX-VISUAL |
| `EQ_TONE_SELECT` | BOTTOM_EQ_TONE | 1500, 800, 113, 33 | 3750, 2000, 282.5, 82.5 | 1556.5,816.5→3891.25,2041.25 | select | Natural | Select final tone mode | APPROX-VISUAL |

操作/狀態需另外核對 click、hover、drag、wheel、key、enabled/disabled、bypass、參數及預設、Web/VST Automation，靜態 REF 不能當實作驗收。
