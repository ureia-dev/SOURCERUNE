# UI_02 — 唯一正式原圖、精確 10 倍 PNG、座標／控制清冊

- **核准完整原圖**：`UI_02_REF.png`，1672×941 RGB，SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`。這是既存正式檔案，已由 GitHub Actions 讀檔及 Artifact 取得、SHA 核對。
- **精確 10× 原像素副本**：`UI_02_REF_10X_PIXEL.png`，16720×9410，SHA-256 `bc7aa52be5db2ae0cce9d70e6e6841288c86229bb64f8e059047a83b24cff389`。每個原像素重複成 10×10；和容器獨立重建的 byte SHA 完全一致。
- **帶框預覽**：`UI_02_REF_SCAN_OVERLAY_1X.png`（供查座標的靜態標註，不可當 runtime UI）。

## 唯一權威與分工

1. `docs/product/reference/UI_02_REF_COORDS.json`：原本已核准／有據可查的主要幾何與座標空間，**維持最高優先，不由目測覆寫**。
2. `docs/product/reference/UI_02_REF_10X_SCAN_20261008.json`／MD：從 GitHub 原始 PNG 產生的 25 大框、8 topbar 錨點、8 控制尺寸、檔案身分與 10 倍換算。
3. `docs/product/reference/UI_02_REF_DETAILED_COMPONENTS_20261008.json`／MD：139 個逐項可見部件、文字與數值、1×／10×、功能與 Web binding 線索。手工目測框標 `APPROX-VISUAL`；實際控制狀態與 Host 驗證 `PENDING`。
4. `docs/product/reference/UI_02_REF_PIXEL_EDGE_EVIDENCE_20261008.json`／MD：15 組真正的 RGB 相鄰像素差分定位證據，標 `PIXEL-OBSERVED-BORDER-CANDIDATE`，**不是**全元件 bbox 或 baseline 終審。
5. `tools/ref_scan/upscale_png_stream.py` 與 `scan_ui02_binary.py` 可重製；臨時自動化 workflow 已移除。

## 禁止混用

- 本 REF 屬 UI_02，不能用 UI_01 七模組／1499×807 歷史座標替換。UI_01 當次核准的清潔原圖是另一個 1508×808 PNG，現有 MD/JSON，**原圖與 10× PNG bytes 尚未在 GitHub**，保持 `PENDING-BINARY-UPLOAD`。
- REF 是視覺比對的依據，**不可把整張圖片裁成 runtime 背景**；Scene、Meter、EQ 曲線、動態值、指針、波形必須 live code。沒有完成 Web/Native 真實互動與 DSP 測試時不可報 DONE。
