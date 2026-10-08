# UI_02 — 真實原圖 RGB 邊界證據：2.5× 對應

原圖 `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png` 1672×941 RGB SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。有效檢視倍率 **2.5×**，PNG **4180×2353**，SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`；不是舊版 10 倍。941×2.5=2352.5，因此輸出像素採 **ROUND_HALF_UP** 到 2353；分析座標保留原值×2.5 浮點精度。

保留 PR #53 所掃的 15 組 RGB 邊界差分原始像素 ROI 和 score；只將座標從原圖 ×2.5 記錄，不重算或偽造像素差分。此為 `PIXEL-OBSERVED-BORDER-CANDIDATE`，不是每個元件 bbox 或文字 baseline 的精確核准。

| 部分 | 軸 | ROI（1×） | 最高峰 1× | 2.5× | 分數 |
|---|---|---|---:|---:|---:|
| `TOPBAR_HORIZONTAL` | row | 0,1672,70,93 | 77 | 192.5 | 51048 |
| `SOURCE_CARD_BOUNDARY` | row | 13,346,289,311 | 298 | 745 | 12793 |
| `TRANSMISSION_CARD_BOUNDARY` | row | 13,346,473,495 | 492 | 1230 | 14695 |
| `WALL_COVER_CARD_BOUNDARY` | row | 13,346,722,747 | 723 | 1807.5 | 18263 |
| `SCENE_TO_MOTION_MATERIAL` | row | 356,1300,433,454 | 448 | 1120 | 37229 |
| `MOTION_DECK_TO_STRIP` | row | 356,1300,720,748 | 740 | 1850 | 4378 |
| `SPACE_AMBIENCE` | row | 1310,1637,361,387 | 380 | 950 | 9394 |
| `BOTTOM_START` | row | 0,1672,732,759 | 751 | 1877.5 | 60120 |
| `BOTTOM_END` | row | 0,1672,907,926 | 922 | 2305 | 44080 |
| `LEFT_CENTER_DIVIDER` | column | 333,365,86,727 | 348 | 870 | 34595 |
| `CENTER_RIGHT_DIVIDER` | column | 1290,1340,85,727 | 1328 | 3320 | 23792 |
| `BOTTOM_BAD_CONDITION` | column | 339,369,744,912 | 349 | 872.5 | 3638 |
| `BOTTOM_CONDITION_INTELL` | column | 663,688,744,912 | 674 | 1685 | 4279 |
| `BOTTOM_INTELL_MIX` | column | 969,995,744,912 | 982 | 2455 | 4619 |
| `BOTTOM_MIX_EQ` | column | 1289,1322,744,912 | 1309 | 3272.5 | 2128 |

其他次候選及其 2.5× 座標在 JSON。Scene/Motion 素材界面與 Runtime 配置可能不同，不得擅改聲音或模組配置。
