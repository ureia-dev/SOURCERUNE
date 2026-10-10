"""Package a built VST3 MVP; invoked only after the manual host smoke passes."""
import argparse
import hashlib
import platform
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import zipfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--platform", choices=["macOS-universal", "Windows-x64"], required=True)
    parser.add_argument("--commit", required=True)
    parser.add_argument("--bundle", type=Path, default=Path("build/native/VST3/Release/SOURCERUNE.vst3"))
    parser.add_argument("--output", type=Path, default=Path("build/packages"))
    args = parser.parse_args()
    if not re.fullmatch(r"[0-9a-f]{40}", args.commit):
        parser.error("--commit must be the full source commit SHA")
    is_mac = args.platform == "macOS-universal"
    expected_os = "Darwin" if is_mac else "Windows"
    if platform.system() != expected_os:
        parser.error(f"Package {args.platform} on its native {expected_os} build runner")
    binary = args.bundle / ("Contents/MacOS/SOURCERUNE" if is_mac else "Contents/x86_64-win/SOURCERUNE.vst3")
    if not binary.is_file() or binary.stat().st_size == 0:
        parser.error(f"Missing native plugin binary: {binary}")
    if not (args.bundle / "Contents/Resources/LICENSE.txt").is_file():
        parser.error("Missing bundled VST3 SDK license")
    args.output.mkdir(parents=True, exist_ok=True)
    name = f"SOURCERUNE-{args.platform}-{args.commit[:12]}"
    archive = (args.output / f"{name}.zip").resolve()
    install = ("Copy the complete SOURCERUNE.vst3 bundle to ~/Library/Audio/Plug-Ins/VST3/.\n"
               "Universal arm64 + x86_64; host smoke runs only on the runner's native architecture.\n"
               "Ad-hoc signed only; no Apple Developer ID or notarization. macOS may block loading.\n"
               if is_mac else
               "Copy the complete SOURCERUNE.vst3 directory to C:\\Program Files\\Common Files\\VST3\\.\n"
               "Windows x64 only; Microsoft Visual C++ 2015-2022 x64 runtime may be required.\n")
    with tempfile.TemporaryDirectory() as temp:
        stage = Path(temp) / name
        stage.mkdir()
        shutil.copytree(args.bundle, stage / "SOURCERUNE.vst3", symlinks=True)
        (stage / "INSTALL.txt").write_text(
            f"SOURCERUNE 0.1.0 VST3 MVP preview\nSource commit: {args.commit}\n\n{install}\n"
            "Restart/rescan your VST3 DAW and open its generic parameter editor.\n"
            "Try SOURCE/TRANSMISSION, Bandwidth Loss, Mix and Global Bypass.\n"
            "Pro Tools requires AAX and cannot use this VST3 directly.\n\n"
            "Bounded SDK mini-host check is not commercial DAW or user-audition acceptance.\n"
            "Native UI, full presets, sample-offset automation and release validation are pending.\n",
            encoding="utf-8")
        if is_mac:
            subprocess.run(["ditto", "-c", "-k", "--sequesterRsrc", "--keepParent", str(stage), str(archive)], check=True)
        else:
            with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zip_file:
                for file in sorted(stage.rglob("*")):
                    if file.is_file():
                        zip_file.write(file, file.relative_to(stage.parent))
    with zipfile.ZipFile(archive) as zip_file:
        if zip_file.testzip() is not None:
            raise RuntimeError("Archive CRC check failed")
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    archive.with_suffix(".zip.sha256").write_text(f"{digest}  {archive.name}\n", encoding="utf-8")
    print(f"Packaged {archive.name}: {archive.stat().st_size} bytes, SHA-256 {digest}")


if __name__ == "__main__":
    main()
