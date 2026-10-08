# UI_01 — 核准清潔 REF 10× 掃描交接（第一張）

本文件是本輪**新來源**：使用者核准、直接提供的無說明 UI_01 PNG，原圖 1508×808，RGBA。**先鎖 UI_01；UI_02 下一張才做。**

## 來源與精度閘

- 原圖 SHA256：`96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916`；10 倍像素複製 PNG SHA256：`94044c004f47b01f214cf62cfc3c306fd1afcf7c4c82b5a62e0fb4967bae53a8`。
- 原圖：1508×808；10×：15080×8080。由**每一個來源像素原樣複製成 10×10 方塊**，沒有 AI 插值或憑空補畫。原圖座標 (x,y,w,h)，10× 各值全部乘 10。
- **重大注意**：現有 `UI_01_REF_COORDS.json` 的 1499×807 plugin-local 是舊 1536×1024 海報內部 shell。新圖 1508×808 **不是同一座標原點**，不得直接覆寫舊規格或拿兩份數值硬判定差錯。
- 這張圖片的人工候選框一律 `APPROX`；只有直接依色彩輪廓定位的部件可列 `PIXEL-OBSERVED-COLORED-EDGE`，這也不保證所有內邊界都精確。
- **圖片 binary 目前仍未上傳 GitHub**：已在工作容器完成原圖/10×圖，但此連接器只能提交 UTF-8 文字或接收已編碼的二進位內容，不能直接把本回合 PNG bytes 送入 repo。GitHub 此次只先交付完整掃描文件、JSON、重建程式與待補齊路徑。不可把 README 當成 PNG。

## 逐項物件 — 原圖座標／10× 可公式重算

總計 **142** 個物件/子元件；類型統計：brand 1、browser_preview 1、button 35、button_select 5、canvas 1、checkbox 9、dynamic_curve 1、dynamic_marker 4、dynamic_meter 2、dynamic_readout 1、dynamic_text 3、dynamic_tooltip 1、dynamic_value_panel 1、graph 1、grid 1、icon 9、image 4、interactive_graph 1、knob 9、live_graph 1、macro_panel 7、node 5、panel 4、rail 1、scale 5、select 7、semantic_card 4、slider 1、tab 3、text 11、topbar 1、waveform 1、workspace 1。

| 物件 ID | 所屬區塊 | x,y,w,h（1508×808） | 類型 | 畫面可見內容 | 等級 |
|---|---|---|---|---|---|
| `CANVAS` | ROOT | 0,0,1508,808 | canvas | 核准無說明 PNG | PIXEL-EXACT-DIMENSIONS |
| `HEADER` | CANVAS | 4,0,1499,57 | topbar |  | APPROX |
| `WORKSPACE` | CANVAS | 4,57,1499,523 | workspace |  | APPROX |
| `LEFT_RAIL` | CANVAS | 4,57,325,523 | rail |  | APPROX |
| `SCENE_PANEL` | CANVAS | 337,57,969,268 | panel |  | APPROX |
| `ANALYSIS_PANEL` | CANVAS | 337,332,969,243 | panel |  | APPROX |
| `RIGHT_METER_RAIL` | CANVAS | 1314,57,180,383 | panel |  | APPROX |
| `BOTTOM_STRIP` | CANVAS | 4,580,1499,228 | panel |  | APPROX |
| `BRAND_LOGO` | HEADER | 17,7,210,41 | brand | SCENE / ACOUSTIC REALITY ENGINE | APPROX |
| `HEADER_CLOSE` | HEADER | 500,11,40,35 | button | X | APPROX |
| `HEADER_EMPTY_TOOL` | HEADER | 543,11,41,36 | button |  | APPROX |
| `PRESET_SELECTOR` | HEADER | 593,10,336,36 | select | Car Pass By - City Street | APPROX |
| `HEADER_PRESET_ICON` | HEADER | 599,20,22,19 | icon | clock/scene | APPROX |
| `HEADER_AB_A` | HEADER | 989,11,46,33 | button | A | APPROX |
| `HEADER_AB_B` | HEADER | 1035,11,46,33 | button | B | APPROX |
| `HEADER_COPY` | HEADER | 1098,13,47,29 | button | COPY | APPROX |
| `HEADER_PASTE` | HEADER | 1146,13,58,29 | button | PASTE | APPROX |
| `HEADER_GEAR` | HEADER | 1464,15,28,28 | button | gear | APPROX |
| `CARD_SOURCE` | LEFT_RAIL | 15,59,313,138 | semantic_card | SOURCE / Car Speaker | APPROX |
| `CARD_SOURCE_ICON` | CARD_SOURCE | 24,71,45,41 | icon | car | APPROX |
| `CARD_SOURCE_TITLE` | CARD_SOURCE | 82,70,175,19 | text | SOURCE | APPROX |
| `CARD_SOURCE_NAME` | CARD_SOURCE | 82,91,175,23 | text | Car Speaker | APPROX |
| `CARD_SOURCE_HEADER_CHEVRON` | CARD_SOURCE | 245,92,12,18 | icon | › | APPROX |
| `CARD_SOURCE_EDIT` | CARD_SOURCE | 273,73,51,35 | button | Edit | APPROX |
| `CARD_SOURCE_ART` | CARD_SOURCE | 24,119,237,71 | image | speaker photo | APPROX |
| `CARD_SOURCE_ARROW` | CARD_SOURCE | 273,119,51,71 | button | › | APPROX |
| `CARD_TRANSMISSION` | LEFT_RAIL | 15,204,313,131 | semantic_card | TRANSMISSION / Mobile Call | APPROX |
| `CARD_TRANSMISSION_ICON` | CARD_TRANSMISSION | 24,216,45,41 | icon | phone | APPROX |
| `CARD_TRANSMISSION_TITLE` | CARD_TRANSMISSION | 82,215,175,19 | text | TRANSMISSION | APPROX |
| `CARD_TRANSMISSION_NAME` | CARD_TRANSMISSION | 82,236,175,23 | text | Mobile Call | APPROX |
| `CARD_TRANSMISSION_HEADER_CHEVRON` | CARD_TRANSMISSION | 245,237,12,18 | icon | › | APPROX |
| `CARD_TRANSMISSION_EDIT` | CARD_TRANSMISSION | 273,218,51,35 | button | Edit | APPROX |
| `CARD_TRANSMISSION_ART` | CARD_TRANSMISSION | 24,260,237,69 | image | call phone photo | APPROX |
| `CARD_TRANSMISSION_ARROW` | CARD_TRANSMISSION | 273,260,51,69 | button | › | APPROX |
| `CARD_WALL_COVER` | LEFT_RAIL | 15,343,313,132 | semantic_card | WALL / COVER / Wooden Door | APPROX |
| `CARD_WALL_COVER_ICON` | CARD_WALL_COVER | 24,355,45,41 | icon | door | APPROX |
| `CARD_WALL_COVER_TITLE` | CARD_WALL_COVER | 82,354,175,19 | text | WALL / COVER | APPROX |
| `CARD_WALL_COVER_NAME` | CARD_WALL_COVER | 82,375,175,23 | text | Wooden Door | APPROX |
| `CARD_WALL_COVER_HEADER_CHEVRON` | CARD_WALL_COVER | 245,376,12,18 | icon | › | APPROX |
| `CARD_WALL_COVER_EDIT` | CARD_WALL_COVER | 273,357,51,35 | button | Edit | APPROX |
| `CARD_WALL_COVER_ART` | CARD_WALL_COVER | 24,399,237,70 | image | wood door photo | APPROX |
| `CARD_WALL_COVER_ARROW` | CARD_WALL_COVER | 273,399,51,70 | button | › | APPROX |
| `CARD_SPACE_ENVIRONMENT` | LEFT_RAIL | 15,482,313,97 | semantic_card | SPACE / ENVIRONMENT / City Street | APPROX |
| `CARD_SPACE_ENVIRONMENT_ICON` | CARD_SPACE_ENVIRONMENT | 24,494,45,41 | icon | cube | APPROX |
| `CARD_SPACE_ENVIRONMENT_TITLE` | CARD_SPACE_ENVIRONMENT | 82,493,175,19 | text | SPACE / ENVIRONMENT | APPROX |
| `CARD_SPACE_ENVIRONMENT_NAME` | CARD_SPACE_ENVIRONMENT | 82,514,175,23 | text | City Street | APPROX |
| `CARD_SPACE_ENVIRONMENT_HEADER_CHEVRON` | CARD_SPACE_ENVIRONMENT | 245,515,12,18 | icon | › | APPROX |
| `CARD_SPACE_ENVIRONMENT_EDIT` | CARD_SPACE_ENVIRONMENT | 273,496,51,35 | button | Edit | APPROX |
| `CARD_SPACE_ENVIRONMENT_ART` | CARD_SPACE_ENVIRONMENT | 24,536,237,37 | image | street photo | APPROX |
| `CARD_SPACE_ENVIRONMENT_ARROW` | CARD_SPACE_ENVIRONMENT | 273,536,51,37 | button | › | APPROX |
| `SCENE_TITLE` | SCENE_PANEL | 350,69,135,22 | text | SCENE VIEW | APPROX |
| `MODE_APPROACH` | SCENE_PANEL | 687,69,80,30 | button | Approach | APPROX |
| `MODE_PASS_BY` | SCENE_PANEL | 770,69,80,30 | button | Pass By | APPROX |
| `MODE_LEAVE` | SCENE_PANEL | 853,69,74,30 | button | Leave | APPROX |
| `MODE_MANUAL` | SCENE_PANEL | 929,69,80,30 | button | Manual | APPROX |
| `SCENE_ZOOM` | SCENE_PANEL | 1121,75,129,22 | slider | Zoom | APPROX |
| `SCENE_ZOOM_RESET` | SCENE_PANEL | 1261,81,37,15 | button | RESET | APPROX |
| `SCENE_GRAPH` | SCENE_PANEL | 397,94,805,149 | graph | 0–10秒 / 1–100公尺 | APPROX |
| `SCENE_GRID` | SCENE_PANEL | 400,96,794,144 | grid | grid | APPROX |
| `SCENE_Y_AXIS` | SCENE_PANEL | 349,104,44,133 | scale | 100m;50m;10m;1m | APPROX |
| `SCENE_X_AXIS` | SCENE_PANEL | 393,250,803,22 | scale | 0s;2s;4s;6s;8s;10s | APPROX |
| `SCENE_PATH` | SCENE_PANEL | 399,144,801,98 | dynamic_curve | cyan distance path | APPROX |
| `SCENE_CAR` | SCENE_PANEL | 769,117,47,32 | dynamic_marker | car glyph | APPROX |
| `SCENE_DISTANCE_CALLOUT` | SCENE_PANEL | 531,141,68,57 | dynamic_tooltip | 25.0m / 0.8s | APPROX |
| `SCENE_SYNC_LINE` | SCENE_PANEL | 470,108,6,141 | dynamic_marker | sync line | APPROX |
| `SCENE_STATS` | SCENE_PANEL | 1201,103,95,140 | dynamic_value_panel | Start80m;Closest3m;End120m | APPROX |
| `SCENE_SYNC_BUTTON` | SCENE_PANEL | 1200,250,97,31 | button | Sync to DAW | APPROX |
| `SCENE_WAVEFORM` | SCENE_PANEL | 348,278,947,42 | waveform | waveform + markers | APPROX |
| `SCENE_WAVEFORM_START` | SCENE_PANEL | 549,276,23,43 | dynamic_marker | start | APPROX |
| `SCENE_WAVEFORM_END` | SCENE_PANEL | 1091,276,20,43 | dynamic_marker | end | APPROX |
| `ANALYSIS_TAB_SPECTRUM` | ANALYSIS_PANEL | 345,339,108,30 | tab | SPECTRUM | APPROX |
| `ANALYSIS_TAB_SPACE_RESPONSE` | ANALYSIS_PANEL | 455,339,138,30 | tab | SPACE RESPONSE | APPROX |
| `ANALYSIS_TAB_SIGNAL_FLOW` | ANALYSIS_PANEL | 593,339,119,30 | tab | SIGNAL FLOW | APPROX |
| `ANALYSIS_PRE` | ANALYSIS_PANEL | 945,340,74,29 | button_select | Pre | APPROX |
| `ANALYSIS_POST` | ANALYSIS_PANEL | 1026,340,72,29 | button_select | Post | APPROX |
| `ANALYSIS_RTA` | ANALYSIS_PANEL | 1112,340,38,29 | button_select | RTA | APPROX |
| `ANALYSIS_SMOOTHING` | ANALYSIS_PANEL | 1154,340,48,29 | button_select | 1/3 | APPROX |
| `ANALYSIS_CHANNEL` | ANALYSIS_PANEL | 1211,340,88,29 | button_select | L+R | APPROX |
| `SPECTRUM_PLOT` | ANALYSIS_PANEL | 396,377,897,151 | live_graph | blue spectrum + white compare | APPROX |
| `SPECTRUM_Y_TICKS` | SPECTRUM_PLOT | 348,372,43,160 | scale | 0;-12;-24;-36;-48;-60 | APPROX |
| `SPECTRUM_X_TICKS` | SPECTRUM_PLOT | 388,530,907,28 | scale | 20;50;100;200;500;1K;2K;5K;10K;20K | APPROX |
| `METER_IN_LABEL` | RIGHT_METER_RAIL | 1336,87,37,21 | text | IN | APPROX |
| `METER_OUT_LABEL` | RIGHT_METER_RAIL | 1430,87,47,21 | text | OUT | APPROX |
| `METER_IN_SLOT` | RIGHT_METER_RAIL | 1337,113,27,179 | dynamic_meter | Input meter | APPROX |
| `METER_OUT_SLOT` | RIGHT_METER_RAIL | 1441,113,26,179 | dynamic_meter | Output meter | APPROX |
| `METER_DB_TICKS` | RIGHT_METER_RAIL | 1380,108,33,201 | scale | 0;-6;-12;-24;-36;-60 | APPROX |
| `METER_IN_VALUE` | RIGHT_METER_RAIL | 1325,303,80,22 | dynamic_text | -18.2 dB | APPROX |
| `METER_OUT_VALUE` | RIGHT_METER_RAIL | 1426,303,72,22 | dynamic_text | -19.1 dB | APPROX |
| `METER_PEAK` | RIGHT_METER_RAIL | 1325,334,77,30 | button | Peak | APPROX |
| `METER_RMS` | RIGHT_METER_RAIL | 1406,334,78,30 | button | RMS | APPROX |
| `METER_LUFS` | RIGHT_METER_RAIL | 1325,379,146,57 | dynamic_readout | LUFS -23.6 | APPROX |
| `MACRO_MOTION` | BOTTOM_STRIP | 14,587,272,216 | macro_panel | MOTION | PIXEL-OBSERVED-COLORED-EDGE |
| `MACRO_BAD_SIGNAL` | BOTTOM_STRIP | 292,587,178,216 | macro_panel | BAD SIGNAL | PIXEL-OBSERVED-COLORED-EDGE |
| `MACRO_CONDITION` | BOTTOM_STRIP | 477,587,203,216 | macro_panel | CONDITION | PIXEL-OBSERVED-COLORED-EDGE |
| `MACRO_INTELLIGIBILITY` | BOTTOM_STRIP | 687,587,200,216 | macro_panel | INTELLIGIBILITY | PIXEL-OBSERVED-COLORED-EDGE |
| `MACRO_AMBIENCE` | BOTTOM_STRIP | 895,587,157,216 | macro_panel | AMBIENCE | PIXEL-OBSERVED-COLORED-EDGE |
| `MACRO_MIX` | BOTTOM_STRIP | 1058,587,116,216 | macro_panel | MIX | APPROX |
| `MACRO_EQ_TONE` | BOTTOM_STRIP | 1181,587,313,216 | macro_panel | EQ / TONE (ADVANCED) | APPROX |
| `MOTION_DISTANCE` | MACRO_MOTION | 25,664,63,55 | knob | DISTANCE 25.0 m | APPROX |
| `MOTION_SPEED` | MACRO_MOTION | 108,664,41,44 | knob | SPEED 60% | APPROX |
| `MOTION_DOPPLER` | MACRO_MOTION | 171,664,41,44 | knob | DOPPLER 70% | APPROX |
| `MOTION_WIDTH` | MACRO_MOTION | 234,664,41,44 | knob | WIDTH 40% | APPROX |
| `MOTION_BUTTON_APPROACH` | MACRO_MOTION | 27,754,78,36 | button | APPROACH | APPROX |
| `MOTION_BUTTON_PASS_BY` | MACRO_MOTION | 112,754,82,36 | button | PASS_BY | APPROX |
| `MOTION_BUTTON_LEAVE` | MACRO_MOTION | 196,754,79,36 | button | LEAVE | APPROX |
| `BAD_AMOUNT` | MACRO_BAD_SIGNAL | 306,665,56,56 | knob | 20% | APPROX |
| `BAD_TYPE` | MACRO_BAD_SIGNAL | 372,634,87,31 | select | Mobile | APPROX |
| `BAD_CHECK_STATIC` | MACRO_BAD_SIGNAL | 372,681,88,19 | checkbox | Static | APPROX |
| `BAD_CHECK_DROPOUT` | MACRO_BAD_SIGNAL | 372,705,88,19 | checkbox | Dropout | APPROX |
| `BAD_CHECK_INTERFERENCE` | MACRO_BAD_SIGNAL | 372,729,88,19 | checkbox | Interference | APPROX |
| `BAD_CHECK_LOW_BITRATE` | MACRO_BAD_SIGNAL | 372,753,88,19 | checkbox | Low Bitrate | APPROX |
| `CONDITION_AMOUNT` | MACRO_CONDITION | 498,664,65,60 | knob | Amount 40% | APPROX |
| `CONDITION_TYPE` | MACRO_CONDITION | 573,635,97,30 | select | USED | APPROX |
| `CONDITION_USED` | MACRO_CONDITION | 511,729,45,30 | dynamic_text | 30% USED | APPROX |
| `CONDITION_CHECK_1` | MACRO_CONDITION | 579,681,89,20 | checkbox | Rattle | APPROX |
| `CONDITION_CHECK_2` | MACRO_CONDITION | 579,705,89,20 | checkbox | Wow/Flutter | APPROX |
| `INTELLIGIBILITY_MAIN` | MACRO_INTELLIGIBILITY | 701,662,68,72 | knob | 75% | APPROX |
| `INTELLIGIBILITY_MODE_1` | MACRO_INTELLIGIBILITY | 790,634,89,32 | button | Natural | APPROX |
| `INTELLIGIBILITY_MODE_2` | MACRO_INTELLIGIBILITY | 790,670,89,32 | button | More Clear | APPROX |
| `INTELLIGIBILITY_MODE_3` | MACRO_INTELLIGIBILITY | 790,706,89,32 | button | Muffled | APPROX |
| `INTELLIGIBILITY_CHECK_1` | MACRO_INTELLIGIBILITY | 703,746,92,19 | checkbox | Presence | APPROX |
| `INTELLIGIBILITY_CHECK_2` | MACRO_INTELLIGIBILITY | 703,770,92,19 | checkbox | Dynamic | APPROX |
| `AMBIENCE_TYPE` | MACRO_AMBIENCE | 910,636,129,28 | select | Traffic | APPROX |
| `AMBIENCE_AMOUNT` | MACRO_AMBIENCE | 918,672,58,56 | knob | 40% | APPROX |
| `AMBIENCE_S` | MACRO_AMBIENCE | 977,672,32,29 | button | S | APPROX |
| `AMBIENCE_M` | MACRO_AMBIENCE | 1011,672,32,29 | button | M | APPROX |
| `AMBIENCE_DUCK` | MACRO_AMBIENCE | 982,715,63,22 | checkbox | Duck | APPROX |
| `AMBIENCE_WAVEFORM` | MACRO_AMBIENCE | 905,751,137,50 | browser_preview | waveform | APPROX |
| `MIX_KNOB` | MACRO_MIX | 1084,636,72,72 | knob | 100% | APPROX |
| `MIX_WET` | MACRO_MIX | 1079,740,78,27 | button | Wet | APPROX |
| `MIX_PHASE` | MACRO_MIX | 1079,772,78,26 | button | Ø | APPROX |
| `EQ_ON` | MACRO_EQ_TONE | 1384,598,60,32 | button | On | APPROX |
| `EQ_POWER` | MACRO_EQ_TONE | 1454,598,32,32 | button | power | APPROX |
| `EQ_GRAPH` | MACRO_EQ_TONE | 1217,637,267,88 | interactive_graph | colored multi-node EQ curve | APPROX |
| `EQ_NODE_1` | EQ_GRAPH | 1244,675,12,12 | node | EQ handle | APPROX |
| `EQ_NODE_2` | EQ_GRAPH | 1296,664,12,12 | node | EQ handle | APPROX |
| `EQ_NODE_3` | EQ_GRAPH | 1348,687,12,12 | node | EQ handle | APPROX |
| `EQ_NODE_4` | EQ_GRAPH | 1392,665,12,12 | node | EQ handle | APPROX |
| `EQ_NODE_5` | EQ_GRAPH | 1441,682,12,12 | node | EQ handle | APPROX |
| `EQ_HPF` | MACRO_EQ_TONE | 1192,766,76,32 | select | HPF 40 Hz | APPROX |
| `EQ_LPF` | MACRO_EQ_TONE | 1279,766,78,32 | select | LPF 14.0 kHz | APPROX |
| `EQ_TONE` | MACRO_EQ_TONE | 1366,766,119,32 | select | TONE Natural | APPROX |

## 功能／程式分工（不等於已驗收）

- **Global**：Preset（選取）、A/B、COPY/PASTE、Gear；X/空白按鈕用途 **未知**。
- **左四卡**：SOURCE、TRANSMISSION、WALL/COVER、SPACE/ENVIRONMENT，每卡有可見圖示、現用名稱、EDIT、縮圖、右箭頭；對照 `renderModules()` 的 live 圖片庫與 Advanced。
- **Scene**：Approach/Pass By/Leave/Manual、Zoom、重設、距離與時間曲線、汽車與點位、Start/Closest/End、Waveform、Time handles、Sync to DAW。數字和波形是參考畫面，Runtime 應即時運算。
- **Analysis**：Spectrum、Space Response、Signal Flow、Pre/Post、RTA、1/3、L+R、頻率軸、dB 軸、動態比較曲線。
- **Meter**：IN/OUT、Peak/RMS、LUFS 與即時數值。**REF 畫出 LUFS 不代表真實 LUFS 演算法已完成**。
- **底部七區**：MOTION（四旋鈕與三模式）、BAD SIGNAL（Amount、類型、4 Checkbox）、CONDITION（Amount/Used/2 Checkbox）、INTELLIGIBILITY（Amount、三模式、2 Checkbox）、AMBIENCE（類型、Amount、S/M、Duck、小波形）、MIX（Amount、Wet、Ø）、EQ/TONE（On、Power、彩色節點、HPF/LPF/Tone）。
- 每個記錄中的 `expected_function_unverified` 是**預期功能**，`web_binding_candidate` 是**對照線索**；尚未核實 Web 所有事件、VST3 實作、參數本體、AAX/DAW 或真音訊效果，不可由圖認定完成。
- 圖上 BRAND 為 SCENE，但目前 Web 頁頭為 SOURCERUNE；不因 REF 本輪掃描自行改品牌。EQ 曲線圖有五個視覺點，亦不等於授權新增第五個 DSP band。

## GitHub 路徑與剩餘作業

- 原始 PNG 目標：`Assets/UI/UI_01/UI_01_REF/UI_01_REF_ORIGINAL_1508x808.png`，`PENDING-BINARY-UPLOAD`。
- 10× PNG 目標：`Assets/UI/UI_01/UI_01_REF/UI_01_REF_10X_PIXEL.png`，`PENDING-BINARY-UPLOAD`。
- 程式：`tools/ref_scan/upscale_png_stream.py`，可把正式原圖無損逐掃描列放大；不能把其他重新生成的 AI 圖片代替這張原圖。
- 尺寸／位置／元件／可見文案／預期功能資料：`docs/product/reference/UI_01_REF_CLEAN_SCAN_20261008.json`（此檔）及本文件。
- GitHub repo 已有的 1499×807 MD/JSON 不覆寫；真正 1:1 Web REF 疊圖、字型與細節/箭頭、hover/bypass、Native 畫面、臨界色與擬合結果尚待獨立檢查。

## 品質門檻

- **完成**：原圖與 10× 真像素複製、尺寸+SHA、物件清冊、同時標原圖與 10× 座標、預期功能與程式核對路徑。
- **未完成**：PNG binary 入 repo、每個字形精細基線真量測、每種互動實測、Native VST3 畫面證據、UI_02 逐張掃描；這些不可報 DONE。

