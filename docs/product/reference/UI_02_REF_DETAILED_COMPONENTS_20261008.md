# UI_02：完整 REF 逐元件 10 倍掃描與功能對照

## 來源鎖定

- 正式 GitHub 原圖：`Assets/UI/UI_02/UI_02_REF/UI_02_REF.png`；**1672×941 RGB**，SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。
- 純像素複製 10x：`Assets/UI/UI_02/UI_02_REF/UI_02_REF_10X_PIXEL.png`；**16720×9410**，SHA256 `bc7aa52be5db2ae0cce9d70e6e6841288c86229bb64f8e059047a83b24cff389`。
- 比對過 GitHub Actions artifact 所輸出的真原圖與 runner 雜湊；**不是** ChatGPT/imagegen 產生的近似版本。
- 以下人工框標示為 `APPROX-VISUAL`，原圖／10x 座標透過乘 10 產生，不會把目測當成已精確逐字 baseline。
- 原有 `UI_02_REF_COORDS.json` 含已鎖定大幾何區，**維持唯一既有權威**；更細的圖面辨識是本補充表。

## 現場清冊

- 共 **139** 個獨立紀錄。類型：button 24、card 5、dynamic_callout 1、dynamic_icon 1、dynamic_marker 6、dynamic_readout 4、dynamic_text 8、icon 16、interactive_graph 1、knob 8、live_graph 1、live_meter 4、live_path 1、logo 1、macro_panel 5、meter_frame 2、node 3、panel 1、photo 6、scale 4、scene 1、select 8、slider 2、symbol 1、text 22、toggle 1、waveform 2。
- 元素有：歸屬區、ID、型態、1x／10x 矩形、中心點、畫面文案、功能候選、Web selector 線索、視覺座標可信度、runtime 尚未實測狀態。

| 元件 | 所屬 | x,y,w,h（1×） | x,y,w,h（10×） | 內容 | 功能 |
|---|---|---|---|---|---|
| `BRAND_LOGO_ICON` | GLOBAL | 29,21,70,42 | 290,210,700,420 | blue acoustic line symbol |  |
| `BRAND_NAME` | GLOBAL | 112,15,159,31 | 1120,150,1590,310 | SCENE |  |
| `BRAND_SUBTITLE` | GLOBAL | 111,48,176,20 | 1110,480,1760,200 | AUDIO REALITY ENGINE |  |
| `TOPBAR_PREVIOUS` | GLOBAL | 429,16,49,46 | 4290,160,490,460 | ‹ | Previous preset |
| `TOPBAR_NEXT` | GLOBAL | 479,16,47,46 | 4790,160,470,460 | › | Next preset |
| `TOPBAR_PRESET_SELECTOR` | GLOBAL | 527,16,333,46 | 5270,160,3330,460 | Car Pass By - City Street | Preset load |
| `TOPBAR_PRESET_ARROW` | GLOBAL | 828,32,23,16 | 8280,320,230,160 | ▾ | Preset dropdown |
| `TOPBAR_SHUFFLE` | GLOBAL | 876,26,31,27 | 8760,260,310,270 | crossed arrows | SHUFFLE SEMANTICS UNAPPROVED; NO BINDING |
| `TOPBAR_SNAPSHOT_A` | GLOBAL | 935,17,35,45 | 9350,170,350,450 | A | Recall/store Snapshot A |
| `TOPBAR_SNAPSHOT_B` | GLOBAL | 969,17,35,45 | 9690,170,350,450 | B | Recall/store Snapshot B |
| `TOPBAR_FOLDER` | GLOBAL | 1038,29,28,23 | 10380,290,280,230 | folder icon | Open preset library |
| `TOPBAR_SETTINGS` | GLOBAL | 1604,26,27,27 | 16040,260,270,270 | gear icon | Open Settings |
| `TOPBAR_INPUT_LABEL` | GLOBAL | 1151,14,65,30 | 11510,140,650,300 | INPUT | Shows input meters |
| `TOPBAR_INPUT_METER_BG` | GLOBAL | 1207,10,167,62 | 12070,100,1670,620 | input stereo bars | Live input meter |
| `TOPBAR_INPUT_METER_UPPER` | GLOBAL | 1218,18,140,9 | 12180,180,1400,90 | Input upper channel | Live scale and fill |
| `TOPBAR_INPUT_METER_LOWER` | GLOBAL | 1218,32,140,9 | 12180,320,1400,90 | Input lower channel | Live scale and fill |
| `TOPBAR_INPUT_SCALE` | GLOBAL | 1209,49,158,18 | 12090,490,1580,180 | -60 -36 -24 -12 -6 0 | Live/static meter tick labeling |
| `TOPBAR_OUTPUT_LABEL` | GLOBAL | 1388,14,77,30 | 13880,140,770,300 | OUTPUT | Shows output meters |
| `TOPBAR_OUTPUT_METER_BG` | GLOBAL | 1461,10,129,62 | 14610,100,1290,620 | output stereo bars | Live output meter |
| `TOPBAR_OUTPUT_METER_UPPER` | GLOBAL | 1469,18,108,9 | 14690,180,1080,90 | Output upper channel | Live scale and fill |
| `TOPBAR_OUTPUT_METER_LOWER` | GLOBAL | 1469,32,108,9 | 14690,320,1080,90 | Output lower channel | Live scale and fill |
| `TOPBAR_OUTPUT_SCALE` | GLOBAL | 1468,49,121,18 | 14680,490,1210,180 | -60 -36 -24 -12 -6 0 | Live/static meter ticks |
| `CARD_SOURCE_FRAME` | CARD_SOURCE | 14,87,329,205 | 140,870,3290,2050 | SOURCE / Car Speaker | Card model/asset selection |
| `CARD_SOURCE_ICON` | CARD_SOURCE | 32,106,39,40 | 320,1060,390,400 | car |  |
| `CARD_SOURCE_TITLE` | CARD_SOURCE | 95,104,166,27 | 950,1040,1660,270 | SOURCE |  |
| `CARD_SOURCE_SELECTED` | CARD_SOURCE | 99,133,190,26 | 990,1330,1900,260 | Car Speaker | Selected semantic model; click to switch |
| `CARD_SOURCE_SMALL_CHEVRON` | CARD_SOURCE | 275,138,15,13 | 2750,1380,150,130 | ⌄ | Next semantic item? Unknown |
| `CARD_SOURCE_HEADER_NEXT` | CARD_SOURCE | 296,133,27,32 | 2960,1330,270,320 | › | Asset navigation candidate |
| `CARD_SOURCE_HERO_IMAGE` | CARD_SOURCE | 31,168,295,116 | 310,1680,2950,1160 | SOURCE photographic semantic art | Swap selected image |
| `CARD_SOURCE_IMAGE_PREV` | CARD_SOURCE | 35,206,31,41 | 350,2060,310,410 | ‹ | Previous available semantic artwork |
| `CARD_SOURCE_IMAGE_NEXT` | CARD_SOURCE | 292,206,31,41 | 2920,2060,310,410 | › | Next available semantic artwork |
| `CARD_TRANSMISSION_FRAME` | CARD_TRANSMISSION | 14,303,329,174 | 140,3030,3290,1740 | TRANSMISSION / Mobile Call | Card model/asset selection |
| `CARD_TRANSMISSION_ICON` | CARD_TRANSMISSION | 32,322,39,40 | 320,3220,390,400 | phone |  |
| `CARD_TRANSMISSION_TITLE` | CARD_TRANSMISSION | 95,320,166,27 | 950,3200,1660,270 | TRANSMISSION |  |
| `CARD_TRANSMISSION_SELECTED` | CARD_TRANSMISSION | 99,349,190,26 | 990,3490,1900,260 | Mobile Call | Selected semantic model; click to switch |
| `CARD_TRANSMISSION_SMALL_CHEVRON` | CARD_TRANSMISSION | 275,354,15,13 | 2750,3540,150,130 | ⌄ | Next semantic item? Unknown |
| `CARD_TRANSMISSION_HEADER_NEXT` | CARD_TRANSMISSION | 296,349,27,32 | 2960,3490,270,320 | › | Asset navigation candidate |
| `CARD_TRANSMISSION_HERO_IMAGE` | CARD_TRANSMISSION | 30,382,297,84 | 300,3820,2970,840 | TRANSMISSION photographic semantic art | Swap selected image |
| `CARD_TRANSMISSION_IMAGE_PREV` | CARD_TRANSMISSION | 34,404,31,41 | 340,4040,310,410 | ‹ | Previous available semantic artwork |
| `CARD_TRANSMISSION_IMAGE_NEXT` | CARD_TRANSMISSION | 293,404,31,41 | 2930,4040,310,410 | › | Next available semantic artwork |
| `CARD_WALL_COVER_FRAME` | CARD_WALL_COVER | 14,488,329,241 | 140,4880,3290,2410 | WALL / COVER / None | Card model/asset selection |
| `CARD_WALL_COVER_ICON` | CARD_WALL_COVER | 32,507,39,40 | 320,5070,390,400 | cube/cover |  |
| `CARD_WALL_COVER_TITLE` | CARD_WALL_COVER | 95,505,166,27 | 950,5050,1660,270 | WALL / COVER |  |
| `CARD_WALL_COVER_SELECTED` | CARD_WALL_COVER | 99,534,190,26 | 990,5340,1900,260 | None | Selected semantic model; click to switch |
| `CARD_WALL_COVER_SMALL_CHEVRON` | CARD_WALL_COVER | 275,539,15,13 | 2750,5390,150,130 | ⌄ | Next semantic item? Unknown |
| `CARD_WALL_COVER_HEADER_NEXT` | CARD_WALL_COVER | 296,534,27,32 | 2960,5340,270,320 | › | Asset navigation candidate |
| `CARD_WALL_COVER_HERO_IMAGE` | CARD_WALL_COVER | 30,570,297,144 | 300,5700,2970,1440 | WALL_COVER photographic semantic art | Swap selected image |
| `CARD_WALL_COVER_IMAGE_PREV` | CARD_WALL_COVER | 34,622,31,41 | 340,6220,310,410 | ‹ | Previous available semantic artwork |
| `CARD_WALL_COVER_IMAGE_NEXT` | CARD_WALL_COVER | 293,622,31,41 | 2930,6220,310,410 | › | Next available semantic artwork |
| `CARD_SPACE_ENVIRONMENT_FRAME` | CARD_SPACE_ENVIRONMENT | 1310,87,326,281 | 13100,870,3260,2810 | SPACE / ENVIRONMENT / City Street | Card model/asset selection |
| `CARD_SPACE_ENVIRONMENT_ICON` | CARD_SPACE_ENVIRONMENT | 1328,106,39,40 | 13280,1060,390,400 | building |  |
| `CARD_SPACE_ENVIRONMENT_TITLE` | CARD_SPACE_ENVIRONMENT | 1389,104,226,27 | 13890,1040,2260,270 | SPACE / ENVIRONMENT |  |
| `CARD_SPACE_ENVIRONMENT_SELECT` | CARD_SPACE_ENVIRONMENT | 1390,152,205,39 | 13900,1520,2050,390 | City Street | Choose semantic SPACE_ENVIRONMENT |
| `CARD_SPACE_ENVIRONMENT_HERO_IMAGE` | CARD_SPACE_ENVIRONMENT | 1328,204,290,148 | 13280,2040,2900,1480 | SPACE_ENVIRONMENT photographic semantic art | Swap selected image |
| `CARD_SPACE_ENVIRONMENT_IMAGE_PREV` | CARD_SPACE_ENVIRONMENT | 1332,258,31,41 | 13320,2580,310,410 | ‹ | Previous available semantic artwork |
| `CARD_SPACE_ENVIRONMENT_IMAGE_NEXT` | CARD_SPACE_ENVIRONMENT | 1584,258,31,41 | 15840,2580,310,410 | › | Next available semantic artwork |
| `CARD_AMBIENCE_FRAME` | CARD_AMBIENCE | 1310,376,326,354 | 13100,3760,3260,3540 | AMBIENCE / Traffic | Card model/asset selection |
| `CARD_AMBIENCE_ICON` | CARD_AMBIENCE | 1328,395,39,40 | 13280,3950,390,400 | waveform |  |
| `CARD_AMBIENCE_TITLE` | CARD_AMBIENCE | 1389,393,226,27 | 13890,3930,2260,270 | AMBIENCE |  |
| `CARD_AMBIENCE_SELECT` | CARD_AMBIENCE | 1390,441,205,39 | 13900,4410,2050,390 | Traffic | Choose semantic AMBIENCE |
| `CARD_AMBIENCE_HERO_IMAGE` | CARD_AMBIENCE | 1328,490,290,156 | 13280,4900,2900,1560 | AMBIENCE photographic semantic art | Swap selected image |
| `CARD_AMBIENCE_IMAGE_PREV` | CARD_AMBIENCE | 1332,548,31,41 | 13320,5480,310,410 | ‹ | Previous available semantic artwork |
| `CARD_AMBIENCE_IMAGE_NEXT` | CARD_AMBIENCE | 1584,548,31,41 | 15840,5480,310,410 | › | Next available semantic artwork |
| `SCENE_CONTAINER` | SCENE | 355,86,944,357 | 3550,860,9440,3570 | City street at night, moving car and listener | Scene/motion renderer |
| `SCENE_PHOTO_BACKGROUND` | SCENE | 356,87,941,354 | 3560,870,9410,3540 | Wet night urban street, moving vehicle and person | Scenario texture from selected space/environment |
| `SCENE_3D_VIEW_BUTTON` | SCENE | 1027,101,96,38 | 10270,1010,960,380 | 3D View | Switch 3D perspective |
| `SCENE_TOP_VIEW_BUTTON` | SCENE | 1124,101,99,38 | 11240,1010,990,380 | Top View | Switch top-down perspective |
| `SCENE_FULLSCREEN` | SCENE | 1240,100,43,39 | 12400,1000,430,390 | ⛶ | Fullscreen |
| `SCENE_CAR_GLYPH` | SCENE | 556,296,60,37 | 5560,2960,600,370 | moving car source glow | Live moving emitter marker |
| `SCENE_SOURCE_CALLOUT` | SCENE | 498,213,151,58 | 4980,2130,1510,580 | Source / Car Speaker | Labels emitter and source model |
| `SCENE_SOURCE_POINTER` | SCENE | 564,281,42,37 | 5640,2810,420,370 | Source location | Drag/move via motion path (verify) |
| `SCENE_LISTENER_GLYPH` | SCENE | 987,325,61,48 | 9870,3250,610,480 | white listener node / target rings | Live listener marker |
| `SCENE_LISTENER_LABEL` | SCENE | 1040,326,83,33 | 10400,3260,830,330 | Listener | Listener name label |
| `SCENE_TRANSPORT_WAVE` | SCENE | 696,320,327,48 | 6960,3200,3270,480 | white moving sound wave | Waveform must stay live |
| `SCENE_MOTION_DOTTED_PATH` | SCENE | 590,332,409,23 | 5900,3320,4090,230 | cyan dotted emitter→listener line | Source path must remain dynamic |
| `MOTION_DECK` | MOTION | 355,444,944,286 | 3550,4440,9440,2860 | large distance dial + 3 knobs + mini path | Motion & distance controller |
| `DISTANCE_DIAL_RING` | MOTION | 397,391,348,322 | 3970,3910,3480,3220 | blue circular distance dial; native base 300px | Adjust distance, pointer live |
| `DISTANCE_CENTER_VALUE` | MOTION | 499,525,181,55 | 4990,5250,1810,550 | 25.0 m | Current distance metres |
| `DISTANCE_CAPTION` | MOTION | 522,583,114,26 | 5220,5830,1140,260 | DISTANCE |  |
| `DISTANCE_INFINITY` | MOTION | 547,618,40,26 | 5470,6180,400,260 | ∞ | Signal/scale meaning pending |
| `DISTANCE_MINI_SLIDER` | MOTION | 463,655,208,15 | 4630,6550,2080,150 | blue progress 0.2–100 | Distance adjustment |
| `DISTANCE_SLIDER_TICKS` | MOTION | 461,677,217,26 | 4610,6770,2170,260 | 0.2 / 1 / 5 / 20 / 100 | Distance scale labels |
| `MOTION_ICON` | MOTION | 780,468,29,22 | 7800,4680,290,220 | car symbol |  |
| `MOTION_TITLE` | MOTION | 822,460,115,34 | 8220,4600,1150,340 | MOTION |  |
| `MOTION_MODE` | MOTION | 927,455,254,44 | 9270,4550,2540,440 | Pass By | Select STATIC/Approach/Pass By/Leave/Manual |
| `MOTION_GRAPH` | MOTION | 779,510,494,94 | 7790,5100,4940,940 | motion arc over time | Live distance/motion envelope |
| `MOTION_GRAPH_CAR` | MOTION | 993,511,57,27 | 9930,5110,570,270 | moving car on arc | Follow motion state |
| `MOTION_GRAPH_START` | MOTION | 798,581,40,27 | 7980,5810,400,270 | Start point | Set start timing |
| `MOTION_GRAPH_CLOSEST` | MOTION | 1005,539,38,68 | 10050,5390,380,680 | Closest point | Set closest timing |
| `MOTION_GRAPH_END` | MOTION | 1217,577,42,29 | 12170,5770,420,290 | End point | Set end timing |
| `MOTION_START_VALUE` | MOTION | 791,600,78,52 | 7910,6000,780,520 | Start 80 m | Start Distance |
| `MOTION_CLOSEST_VALUE` | MOTION | 988,600,80,52 | 9880,6000,800,520 | Closest 3 m | Closest Distance |
| `MOTION_END_VALUE` | MOTION | 1198,600,86,52 | 11980,6000,860,520 | End 120 m | End Distance |
| `MOTION_SPEED_KNOB` | MOTION | 791,663,54,54 | 7910,6630,540,540 | SPEED circular cap | Drag/wheel/keyboard to adjust |
| `MOTION_SPEED_LABEL` | MOTION | 866,666,81,25 | 8660,6660,810,250 | Speed |  |
| `MOTION_SPEED_VALUE` | MOTION | 867,691,65,27 | 8670,6910,650,270 | 60% | Current SPEED state |
| `MOTION_DOPPLER_KNOB` | MOTION | 963,663,54,54 | 9630,6630,540,540 | DOPPLER circular cap | Drag/wheel/keyboard to adjust |
| `MOTION_DOPPLER_LABEL` | MOTION | 1038,666,81,25 | 10380,6660,810,250 | Doppler |  |
| `MOTION_DOPPLER_VALUE` | MOTION | 1039,691,65,27 | 10390,6910,650,270 | 70% | Current DOPPLER state |
| `MOTION_WIDTH_KNOB` | MOTION | 1151,663,54,54 | 11510,6630,540,540 | WIDTH circular cap | Drag/wheel/keyboard to adjust |
| `MOTION_WIDTH_LABEL` | MOTION | 1226,666,81,25 | 12260,6660,810,250 | Width |  |
| `MOTION_WIDTH_VALUE` | MOTION | 1227,691,65,27 | 12270,6910,650,270 | 40% | Current WIDTH state |
| `AMBIENCE_LEVEL_SLIDER` | AMBIENCE | 1331,677,231,12 | 13310,6770,2310,120 | horizontal level cyan | Ambience level adjustment |
| `AMBIENCE_LEVEL_VALUE` | AMBIENCE | 1574,671,57,33 | 15740,6710,570,330 | 70% | Ambience level (reference sample) |
| `BOTTOM_BAD_SIGNAL_FRAME` | BOTTOM | 14,744,330,168 | 140,7440,3300,1680 | BAD SIGNAL | Module available; open Advanced |
| `BOTTOM_CONDITION_FRAME` | BOTTOM | 357,744,309,168 | 3570,7440,3090,1680 | CONDITION | Module available; open Advanced |
| `BOTTOM_INTELLIGIBILITY_FRAME` | BOTTOM | 679,744,290,168 | 6790,7440,2900,1680 | INTELLIGIBILITY | Module available; open Advanced |
| `BOTTOM_MIX_FRAME` | BOTTOM | 981,744,312,168 | 9810,7440,3120,1680 | MIX | Module available; open Advanced |
| `BOTTOM_EQ_FRAME` | BOTTOM | 1305,744,328,168 | 13050,7440,3280,1680 | EQ / TONE (ADVANCED) | Module available; open Advanced |
| `BAD_SIGNAL_ICON` | BOTTOM_BAD_SIGNAL | 43,760,39,37 | 430,7600,390,370 | BAD_SIGNAL icon |  |
| `BAD_SIGNAL_TITLE` | BOTTOM_BAD_SIGNAL | 95,762,217,34 | 950,7620,2170,340 | BAD SIGNAL |  |
| `CONDITION_ICON` | BOTTOM_CONDITION | 386,760,39,37 | 3860,7600,390,370 | CONDITION icon |  |
| `CONDITION_TITLE` | BOTTOM_CONDITION | 438,762,197,34 | 4380,7620,1970,340 | CONDITION |  |
| `INTELLIGIBILITY_ICON` | BOTTOM_INTELLIGIBILITY | 708,760,39,37 | 7080,7600,390,370 | INTELLIGIBILITY icon |  |
| `INTELLIGIBILITY_TITLE` | BOTTOM_INTELLIGIBILITY | 760,762,178,34 | 7600,7620,1780,340 | INTELLIGIBILITY |  |
| `MIX_ICON` | BOTTOM_MIX | 1010,760,39,37 | 10100,7600,390,370 | MIX icon |  |
| `MIX_TITLE` | BOTTOM_MIX | 1062,762,200,34 | 10620,7620,2000,340 | MIX |  |
| `EQ_TONE_ICON` | BOTTOM_EQ_TONE | 1334,760,39,37 | 13340,7600,390,370 | EQ_TONE icon |  |
| `EQ_TONE_TITLE` | BOTTOM_EQ_TONE | 1386,762,216,34 | 13860,7620,2160,340 | EQ / TONE (ADVANCED) |  |
| `BAD_SIGNAL_AMOUNT_KNOB` | BOTTOM_BAD_SIGNAL | 57,802,85,86 | 570,8020,850,860 | Amount blue perimeter 20% | Transmission degradation intensity |
| `BAD_SIGNAL_AMOUNT_VALUE` | BOTTOM_BAD_SIGNAL | 156,829,66,37 | 1560,8290,660,370 | 20% | Bad Signal intensity |
| `BAD_SIGNAL_WAVEFORM` | BOTTOM_BAD_SIGNAL | 218,813,109,24 | 2180,8130,1090,240 | cyan waveform preview | Preview from selected transmission state |
| `BAD_SIGNAL_MODE_SELECTOR` | BOTTOM_BAD_SIGNAL | 218,857,109,36 | 2180,8570,1090,360 | Mobile | Select transmission family |
| `CONDITION_AMOUNT_KNOB` | BOTTOM_CONDITION | 390,800,82,89 | 3900,8000,820,890 | Condition knob Used | Condition amount |
| `CONDITION_SELECTOR` | BOTTOM_CONDITION | 488,817,162,45 | 4880,8170,1620,450 | Used | Select device condition family |
| `INTELLIGIBILITY_KNOB` | BOTTOM_INTELLIGIBILITY | 716,803,94,89 | 7160,8030,940,890 | Intelligibility knob 75% | Intelligibility amount |
| `INTELLIGIBILITY_VALUE` | BOTTOM_INTELLIGIBILITY | 831,823,101,40 | 8310,8230,1010,400 | 75% | Current intelligibility value |
| `MIX_KNOB` | BOTTOM_MIX | 1035,796,86,86 | 10350,7960,860,860 | Wet mix 100% | Mix original/full scene |
| `MIX_VALUE` | BOTTOM_MIX | 1061,878,64,27 | 10610,8780,640,270 | 100% | Current Mix amount |
| `MIX_MODE_SELECTOR` | BOTTOM_MIX | 1157,822,113,43 | 11570,8220,1130,430 | Wet | Select Wet |
| `MIX_NEXT_CHEVRON` | BOTTOM_MIX | 1259,765,22,23 | 12590,7650,220,230 | › | Open detail candidate |
| `EQ_HEADER_ENABLE` | BOTTOM_EQ_TONE | 1546,761,33,22 | 15460,7610,330,220 | On/Off graphic | EQ bypass state |
| `EQ_POWER` | BOTTOM_EQ_TONE | 1582,756,36,39 | 15820,7560,360,390 | power | EQ on/off |
| `EQ_GRAPH` | BOTTOM_EQ_TONE | 1330,799,288,83 | 13300,7990,2880,830 | sloping spectrum response curve | EQ response must remain dynamically computed |
| `EQ_CURVE_POINT_A` | BOTTOM_EQ_TONE | 1330,825,14,14 | 13300,8250,140,140 | 100Hz sample node | EQ node? actual DSP bands count pending |
| `EQ_CURVE_POINT_B` | BOTTOM_EQ_TONE | 1440,819,14,14 | 14400,8190,140,140 | ~1K sample node | EQ node? actual DSP bands count pending |
| `EQ_CURVE_POINT_C` | BOTTOM_EQ_TONE | 1559,859,14,14 | 15590,8590,140,140 | 10K sample node | EQ node? actual DSP bands count pending |
| `EQ_CURVE_TICKS` | BOTTOM_EQ_TONE | 1330,879,270,24 | 13300,8790,2700,240 | 100 / 1K / 10K | EQ chart frequency labels |
| `EQ_TONE_SELECT` | BOTTOM_EQ_TONE | 1500,800,113,33 | 15000,8000,1130,330 | Natural | Select final tone mode |

## 功能重要分界

- **圖像確定可見**：SOURCE=Car Speaker、TRANSMISSION=Mobile Call、WALL/COVER=None、SPACE/ENVIRONMENT=City Street、AMBIENCE=Traffic；畫面另有 **70% Ambience**、25.0 m Distance、Speed 60%、Doppler 70%、Width 40%、底部 Bad Signal 20%、Intelligibility 75%、Mix 100%、Condition Used、Tone Natural。
- **Shuffle 缺口**：Icon 可見，但尚未有正式操作語意，暫不自行發明。原圖含 A/B、Folder、Prev/Next、Preset、Settings，真正使用者操作須以 Web／Native bindings 獨立驗收。
- **執行狀態不可由圖片推定**：即使 REF 顯示 source、listener、路徑、交通圖像、音波、EQ 曲線，仍要由 live 圖像／狀態生成，不可用截圖預烘焙作 Plugin runtime。
- **元件差別**：UI_02 是右側 SPACE/ENVIRONMENT＋AMBIENCE，中央大型 Distance/Motion、底部五區；不得套用 UI_01 的左四卡／底七區。
- **每個原圖 bbox 值屬畫面候選**；如果要升級到 REF-CONFIRMED 精度，必須做指定部件局部 1:1 疊圖與 10× 邊界實測，並保留 pixel-evidence／片段 SHA。不以本清單直接改 CSS/DSP。

## 仍待分離驗證

- 按鈕選中、Hover/Press/Disabled、各種 Interaction、Motion drag/wheel/keyboard、Meter / LUFS 的真處理邏輯，並非已驗收。
- 本輪不修改 Web、Native renderer、C++ DSP、Preset 或 CI safety 次數。

## 技術路徑

- 大框：`docs/product/reference/UI_02_REF_COORDS.json`；原圖及 10x：`Assets/UI/UI_02/UI_02_REF/`。
- 程式比對：`Web/App/index.html`、`Web/App/app.js`、`Source/UI/UI_02/LayoutSpec.h`、`docs/product/UI_FUNCTION_CONTRACT.md`。
- 自動生成大框與像素色相證據：`tools/ref_scan/scan_ui02_binary.py`（原始產出另外在 `UI_02_REF_10X_SCAN_20261008.json/.md`）。

