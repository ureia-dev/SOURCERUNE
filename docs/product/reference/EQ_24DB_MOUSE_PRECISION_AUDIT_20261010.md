# EQ 固定 ±24dB：10＋10＋10＋2 規劃與可重現檢查

本輪只動 Web 圖形與滑鼠操作：不修改 C++、WASM、AudioWorklet、EQ 演算法、穩定參數 ID 或 74 個 Factory Preset。Native 自訂 GUI 仍 PENDING。已完成以下 **30 個不同的數值計算**，不是增加 30 次 CI／壓測。

## 試算 10 組比例

以 SVG viewBox 100×100、preserveAspectRatio=none，實際 CSS 像素半徑 mini=2.25px、Focus=3.45px，視圖半徑 rx=100*r/width、ry=100*r/height。透明命中半徑 mini=9px、Focus=11px。

1) 270×94 mini→直徑4.5px，圓長寬比1；2) 307×72 mini→4.5px，比1；3) 205×45 mini→4.5px，比1；4) 345×70 mini→4.5px，比1；5) 540×144 HiDPI mini→4.5px，比1；6) 727×230 Focus→6.9px，比1；7) 768×215 Focus→6.9px，比1；8) 535×165 Focus resize→6.9px，比1；9) 310×95 Focus narrow→6.9px，比1；10) 1454×524 HiDPI Focus→6.9px，比1。**以上為數學試算，待真 Chrome 複核**。

## 精算 10 組 X 軸對數座標

頻率位置公式 `100*log10(f/20)/3`。20→0%；30→5.8697%；50→13.2647%；100→23.2990%；200→33.3333%；500→46.5980%；1000→56.6323%；2000→66.6667%；5000→79.9313%；20000→100%。不動 EQ transfer-function 及 DSP。

## 改善計算 10 組 Y 軸值

顯示公式 `y=50−gain/24*34`（永遠固定 ±24 dB）：−24→84，−18→75.5，−12→67，−6→58.5，0→50，+6→41.5，+12→33，+18→24.5，+24→16，−3→54.25。**真正 Bell Gain 仍然是 −18～+18dB**，沒有臆造 24dB/oct 濾波選項。

視覺工程選擇：1.15px 細曲線、彩色漸層、小圓環、深色網格、由真正 EQ 回應到零線的低對比透明區、降低多餘 glow。功能工程選擇：Focus 下方 11 個真 Freq/Gain/Q 控制，mouse up/down drag、Wheel、Shift 微調、keyboard Arrow、Undo/Redo；維持單一 SVG、單一參數來源，絕不增加 DSP/FFT。

## 最終修正／驗證兩關（不能提前宣稱通過）

(1) Chrome UI_01+UI_02 實測小、大兩圖節點皆為真正等比例小圓：mini 2.5～6px 直徑、Focus 4～9px、透明命中≥14px／18px，重開／resize 正常。

(2) Chrome UI_01+UI_02 真實拖曳、Q wheel、直接數值輸入、11 真 dials、單次 Undo／Redo、固定24dB、縮放關閉正常，`render-log.txt` 必須結束 `render audit completed successfully`、`geometry-report.json` 同一 SHA 全通過。Fast 正常一次；不擅增安全重複測試。

兩個 Browser Gate 結果在此文件完成後補入，測試腳本本身不等於已通過。
