# UI_02 REF — 使用者核准 2.5× 最新版

原圖 `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png` 1672×941 RGB SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。有效檢視倍率 **2.5×**，PNG **4180×2353**，SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`；不是舊版 10 倍。941×2.5=2352.5，因此輸出像素採 **ROUND_HALF_UP** 到 2353；分析座標保留原值×2.5 浮點精度。

- 正式 GitHub 原圖 `UI_02_REF.png`：**已在 repo**，原始內容 SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`，Git blob `dbb2c3cde3ee53ec3424b5d0f79b0dcd9fad1b59`；GitHub artifact 已完整取得並用 PIL 核對 1672×941 RGB。
- 正式放大圖 `UI_02_REF_2_5X_PIXEL.png`：**PNG 已本機製作**，4180×2353，SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`。**GitHub binary 已真實入庫：一次性 Action #1 全步驟成功，commit `47a702691503b672655b2f0d527d67473104ce25`；Git tree 含真 PNG blob，runner SHA-256 與原圖、2.5× PNG、overlay 三份均一致，42/42 像素映射 PASS**。
- 標註圖 `UI_02_REF_SCAN_OVERLAY_1X.png`：原圖彩框 SHA-256 `afeae3e51a8d8b9631b764a0eca59436d5d662679310a51573b8e820a2826300`，只作視覺定位。
- `docs/product/reference/UI_02_REF_2_5X_SCAN_20261009.{json,md}`：25 大框＋頂部錨點/控制直徑。
- `docs/product/reference/UI_02_REF_2_5X_DETAILED_COMPONENTS_20261009.{json,md}`：139 個可見元件、內容、操作候選、Web 綁定線索、1×/2.5×座標、中心點、信賴度。
- `docs/product/reference/UI_02_REF_2_5X_PIXEL_EDGE_EVIDENCE_20261009.{json,md}`：15 組真 RGB 差分；不冒稱已完成每字 baseline。
- 重新產製：`python tools/ref_scan/materialize_ui02_2p5.py`；只依同一張真正原圖生成，非 AI 補畫。
- **禁止**裁整張 REF 當 Plugin 正式背景；不得憑圖推定 Shuffle 行為、LUFS 真計算、或 VST3 主機自動化已完成。

**核實來源**：[GitHub Actions #1](https://github.com/ureia-dev/SOURCERUNE/actions/runs/37811957946)，只執行一次性 REF Materialization，並已移除臨時 workflow。Web／VST3 的實機音訊及互動驗收仍為 PENDING。
