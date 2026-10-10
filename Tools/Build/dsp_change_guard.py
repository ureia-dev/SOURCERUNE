#!/usr/bin/env python3
"""Fail-closed PR gate for SOURCERUNE sound-processing changes.

This ordinary Fast guard never grants DSP exceptions. A DSP edit requires a
separate explicit user-approved exception process and a verified remote
pre-edit restore point. It must not be bypassed in the same DSP PR.
"""
import argparse
import subprocess
import sys


EXACT = {
    "Source/Plugin/VST3/Plugin.cpp",
    "Source/State/ParameterIds.h",
    "Source/State/NativeParameterIds.h",
    "Assets/FactoryPresets/scene_presets_v1.json",
    "Web/App/data/scene_presets_v1.json",
}


def protected(path: str) -> bool:
    low = path.lower()
    return (
        path.startswith("Source/DSP/")
        or path in EXACT
        or (path.startswith("Web/App/") and (
            low.endswith((".wasm", ".wat"))
            or "worklet" in low
            or "/dsp" in low
            or "/audio_engine" in low
            or "/audio_processor" in low
        ))
    )


def changed_paths(base: str, head: str) -> list[str]:
    command = ["git", "diff", "--name-only", "-z", "--diff-filter=ACDMRT",
               base, head, "--"]
    data = subprocess.check_output(command)
    return [x.decode("utf-8") for x in data.split(b"\0") if x]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True)
    parser.add_argument("--head", required=True)
    args = parser.parse_args()
    try:
        changed = changed_paths(args.base, args.head)
    except subprocess.CalledProcessError as exc:
        print(f"DSP GUARD ERROR: unable to compare refs; fail closed: {exc}", file=sys.stderr)
        return 2
    touched = sorted(p for p in changed if protected(p))
    if touched:
        print("DSP HARD LOCK: FAIL. Protected sound-path changes detected:", file=sys.stderr)
        for path in touched:
            print("  - " + path, file=sys.stderr)
        print(
            "STOP. No DSP algorithm/parameter/sound-processing changes without "
            "user approval, three recorded verifications AND a verified new "
            "GitHub remote restore point made BEFORE each DSP edit. "
            "Do not bypass this guard inside the same PR. "
            "See docs/architecture/DSP_FREEZE_AND_RESTORE_POLICY.md.",
            file=sys.stderr,
        )
        return 1
    print(f"DSP HARD LOCK: PASS. {len(changed)} changed paths; no guarded DSP paths.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
