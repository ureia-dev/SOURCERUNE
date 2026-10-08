# UI_02 — 原始 REF 邊界的真像素差分掃描

來源為真正的 GitHub `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png`，RGB 1672×941，SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。
相鄰列／相鄰欄每隔 3 像素取樣 RGB 絕對色差。ROI 與強度保留在 JSON，可從原始 PNG 重現，不從 runtime CSS 或 AI 補畫推斷。10 倍座標是原座標 ×10。

| 區塊 | 方向 | ROI [x0,x1,y0,y1] | 原圖首位像素候選 | 10 倍 | 差分得分 |
|---|---|---|---:|---:|---:|
| TOPBAR_HORIZONTAL | row | 0,1672,70,93 | 77 | 770 | 51048 |
| SOURCE_CARD_BOUNDARY | row | 13,346,289,311 | 298 | 2980 | 12793 |
| TRANSMISSION_CARD_BOUNDARY | row | 13,346,473,495 | 492 | 4920 | 14695 |
| WALL_COVER_CARD_BOUNDARY | row | 13,346,722,747 | 723 | 7230 | 18263 |
| SCENE_TO_MOTION_MATERIAL | row | 356,1300,433,454 | 448 | 4480 | 37229 |
| MOTION_DECK_TO_STRIP | row | 356,1300,720,748 | 740 | 7400 | 4378 |
| SPACE_AMBIENCE | row | 1310,1637,361,387 | 380 | 3800 | 9394 |
| BOTTOM_START | row | 0,1672,732,759 | 751 | 7510 | 60120 |
| BOTTOM_END | row | 0,1672,907,926 | 922 | 9220 | 44080 |
| LEFT_CENTER_DIVIDER | column | 333,365,86,727 | 348 | 3480 | 34595 |
| CENTER_RIGHT_DIVIDER | column | 1290,1340,85,727 | 1328 | 13280 | 23792 |
| BOTTOM_BAD_CONDITION | column | 339,369,744,912 | 349 | 3490 | 3638 |
| BOTTOM_CONDITION_INTELL | column | 663,688,744,912 | 674 | 6740 | 4279 |
| BOTTOM_INTELL_MIX | column | 969,995,744,912 | 982 | 9820 | 4619 |
| BOTTOM_MIX_EQ | column | 1289,1322,744,912 | 1309 | 13090 | 2128 |

重要：掃描結果是像素色差最高位置，不自動等於外框。例如 Scene→Motion 的美術材質強邊在 y448，而已核准 runtime 分配值是 y444；兩者可以同時正確。
主要分界 y77、x348、x1328、底部 y751–753 與 y922–924 和既有 REF 規格互相支持；各字型 baseline、hover 狀態、所有控制 hitbox 仍應個別驗證。
