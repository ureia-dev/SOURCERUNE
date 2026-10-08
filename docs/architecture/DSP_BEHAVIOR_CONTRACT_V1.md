# SOURCERUNE DSP Behavior Contract V1

SOURCERUNE is a result-oriented acoustic scene/worldizing engine.

Canonical order:
INPUT → TRANSMISSION → SOURCE → CONDITION → COVER → DISTANCE / MOTION → SPACE / ENVIRONMENT → AMBIENCE → INTELLIGIBILITY → TONE → MIX / OUTPUT

## DSP 主責與非 IR 強制依賴（永久跨對話規則）

- 正式責任契約：**[DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md](DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md)**。
- GPT／開發助手負責聲學研究、算法與 C++ DSP 實作、可重現音訊測試、CPU/phase/latency/alias 驗證、Web/VST3 parity、bug 修正、可試聽構建；使用者主要負責最終主觀試聽、音質方向與決策。
- SOURCE／WALL/COVER／SPACE／AMBIENCE 以程序化／可解釋模型優先。**不以使用者提供 IR、錄音、專業聲學量測或資料集為開發／基本運作必要條件。** 合法 IR/量測可作自備研發參考、校準或另行核准的可選功能，授權／provenance 必須可驗證。
- 技術測試通過 ≠ 使用者已試聽核准；只有文件合同 ≠ 可運行 DSP 已完成。兩者應分別回報。

## CPU / realtime / latency
- Native sample-rate / 1× baseline; no routine oversampling.
- Prefer ADAA, band-limited or similarly low-CPU anti-aliasing for nonlinear stages when audibly equivalent.
- Inactive modules should approach near-zero work.
- Analyzer/UI work stops or heavily throttles when hidden.
- Structural latency is fixed and host-reportable for a given build/configuration.
- Variable-delay buffers used by motion/distance are preallocated off the realtime callback.
- No steady-state allocation, file/network I/O, blocking locks, model construction, DOM/UI work or unbounded logging in realtime.
- Scene/model changes are prepared off realtime and entered with bounded smoothing/crossfade.

## Model behavior
SOURCE may include response/resonance, compression, frequency-dependent nonlinear behavior, source-appropriate buzz/rattle, directivity and plausible variation.

Bad Signal is medium-aware and may drive bandwidth loss, noise/static, dropout/packet loss, bitrate/codec artifacts, interference and signal compression.

CONDITION is separate from Bad Signal and may include rattle, buzz, compression, imbalance, wow/flutter, intermittent contact and instability.

WALL/COVER models transmission loss, frequency-dependent loss/absorption, short reflections, panel/cavity resonance and edge leakage.

SPACE uses sparse early reflections plus a low-CPU algorithmic/FDN-style late field where appropriate. Outdoors emphasize direct path, ground/lateral reflections and air absorption.

MOTION can drive distance, gain, air loss, direct/environment ratio, stereo width, reflection timing, Doppler and perspective.

AMBIENCE is deterministic, procedural and effectively endless. Crowd/background-conversation can be unintelligible procedural language-flavoured texture.

INTELLIGIBILITY preserves useful dialogue detail while keeping the scene, using dynamic spectral/transient/consonant-preservation behavior.

Prefer generated/modelled Source, Cover, Space and Ambience. External measurements remain R&D/calibration material unless provenance and redistribution rights are recorded.
