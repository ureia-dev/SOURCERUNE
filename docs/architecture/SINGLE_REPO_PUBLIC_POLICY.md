# SINGLE_REPO_PUBLIC_POLICY

Status: **LOCKED for current development phase**

SOURCERUNE stays in one public repository: `ureia-dev/SOURCERUNE`.

## Why

The current priority is rapid VST3 + WEB iteration, fast WEB TEST deployment, and direct parity debugging between shared C++ DSP and the browser build. Splitting the project into a public frontend repository plus private core repository would add cross-repository build, authentication, artifact-transfer and deployment steps.

## Rule

Until this policy is explicitly changed:

- keep shared C++ Core/DSP/Scene/State here;
- keep VST3 adapter here;
- keep WEB/Wasm/AudioWorklet/TestHarness here;
- keep UI_01/UI_02 assets and implementation here;
- keep tests and factory preset definitions here;
- do not create a `SOURCERUNE-Core` dependency;
- do not add deployment tokens merely to shuttle build artifacts between repositories.

## WEB TEST

WEB TEST remains a first-class target and should be deployable directly from this repository.

## Security note

Public-repository status means source committed here is publicly readable. This tradeoff is consciously accepted for the current phase in favor of development speed. Revisit before release if source-protection becomes the higher priority.
