# SOURCERUNE — 100 Structure Review Gates

These are 100 explicit architecture checks used to refine the initial repository structure before DSP implementation.

## Product boundary
1. Keep SOURCERUNE independent from existing plugin codebases.
2. Keep company/brand identity outside core source until chosen.
3. Treat SOURCERUNE as a product model/name, not company namespace.
4. Do not bake temporary marketing taglines into namespaces.
5. Keep licensing/packaging separate from DSP.
6. Reserve legal/provenance documentation.
7. Reserve research evidence without shipping research assets.
8. Separate factory presets from user runtime storage.
9. Keep experiments out of production source folders.
10. Gate implementation behind architecture docs.

## VST3 / WEB boundary
11. VST3 is a first-class mainline target.
12. WEB is a first-class mainline target.
13. VST3 and WEB share one C++ DSP engine.
14. WEB must not maintain a second algorithm implementation in JavaScript.
15. Centralize parameter IDs and ranges for both targets.
16. Freeze public parameter IDs after first public release.
17. Keep state schema portable between VST3 and WEB where semantics match.
18. Add state-schema versioning before presets exist.
19. Reserve migration code before state format evolves.
20. Keep AAX deferred and isolated from current mainline decisions.

## Realtime safety
21. No heap allocation in steady-state realtime processing.
22. No file I/O on realtime audio paths.
23. No blocking mutex on realtime audio paths.
24. No engine construction/destruction on realtime audio paths.
25. No model/IR loading on realtime audio paths.
26. No structural latency changes during VST3 playback.
27. Preallocate variable-delay memory.
28. Prepare scene/model changes outside realtime processing.
29. Crossfade state/model transitions.
30. Handle denormals explicitly.

## DSP modularity
31. Source modelling gets its own module.
32. Transmission gets its own module.
33. Condition/age/damage gets its own module.
34. Cover/wall transmission gets its own module.
35. Distance/Motion/Doppler gets its own module.
36. Space early/late response gets its own module.
37. Ambience generation gets its own module.
38. Intelligibility gets its own module.
39. Final Tone/EQ gets its own module.
40. Mix/output coordination stays outside scene stages.

## Signal flow
41. Define one canonical DSP order.
42. UI layout must not redefine DSP order.
43. Signal Flow view mirrors real order.
44. Define bypass semantics per stage.
45. Bypassed stages should perform near-zero work.
46. Define wet/dry ownership once.
47. Input/output gain ownership must be unambiguous.
48. Define nonlinear gain-staging location.
49. Define ambience injection point.
50. Define intelligibility-stage location.

## Source/transmission
51. Separate device acoustics from transmission degradation.
52. Avoid one giant mixed-purpose futz class.
53. Compose source models from low-cost blocks.
54. Isolate nonlinear behavior from static filtering.
55. Keep radio/phone/dropout independent from room acoustics.
56. Bad Signal cannot alter structural latency.
57. Random transmission events must be deterministic when required.
58. Condition modulation must be bounded and click-safe.
59. Do not require external samples for source models.
60. Calibration/generation stays outside runtime DSP.

## Cover/distance/motion
61. Occlusion stays separate from distance attenuation.
62. Cover resonance stays separate from direct transmission loss.
63. Trajectory representation stays separate from Doppler DSP.
64. Fractional-delay buffers have fixed/preallocated capacity.
65. Timeline seeks safely reinitialize derived state.
66. Static distance works with motion disabled.
67. VST3 motion can derive from host position when available.
68. WEB TEST exposes an equivalent controllable transport timeline.
69. Offline/deterministic renders remain reproducible.
70. Test loop boundaries and timeline jumps in both runtimes.

## Space
71. Separate sparse early reflections from late diffuse field.
72. Avoid continuously swapping large IRs for motion.
73. Outdoor spaces must not become generic long reverbs.
74. Direct/early/late levels remain internally distinct.
75. Keep early-reflection tap counts CPU-bounded.
76. Reuse late-field topology across space presets.
77. Smooth decay/absorption controls.
78. Prepare room-model changes outside realtime processing.
79. No routine oversampling in space baseline.
80. Explicitly test channel-layout assumptions.

## Ambience/determinism
81. Procedural ambience is independent from UI playback state.
82. Store random seed in state.
83. Same state + same timeline renders reproducibly.
84. New Seed is explicit, never silent reseeding.
85. Ambience ducking belongs inside ambience subsystem.
86. Avoid obvious loop points.
87. Keep event generation CPU-bounded.
88. Language-flavoured murmur stays separate from intelligible speech assets.
89. Licensed external samples are optional, not foundational.
90. Track provenance of all third-party material.

## WEB parity / UI / tests
91. WEB DSP runs in WebAssembly/AudioWorklet, never normal DOM timing.
92. Browser UI cannot own recall-critical DSP state.
93. Analyzer/UI work throttles when hidden or inactive.
94. Keep Unit/DSP/VST3/Web/Performance tests separate.
95. Maintain VST3↔WEB parameter/state parity tests.
96. Maintain shared golden DSP tests for both targets.
97. WEB TEST must expose every public processing parameter.
98. WEB TEST must support reproducible local-file listening tests.
99. Developer tools must not become runtime dependencies.
100. Require architecture review before any new top-level directory.

## Accepted result

The structure now treats VST3 and WEB as equal mainline outputs of one shared acoustic engine. The browser TEST version is a permanent validation/runtime target rather than a disposable demo.
