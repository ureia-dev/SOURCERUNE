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

## Host/plugin boundary
11. AAX is first-class from day one.
12. VST3 is first-class from day one.
13. Host wrappers stay outside DSP modules.
14. AudioProcessor state glue stays separate from algorithms.
15. Centralize parameter IDs.
16. Freeze public parameter IDs after first public release.
17. Keep host-relevant parameter ordering stable.
18. Add state-schema versioning before presets exist.
19. Reserve migration code before state format evolves.
20. Offline-render behavior must be testable without UI.

## Realtime safety
21. No heap allocation in normal audio processing.
22. No file I/O on audio thread.
23. No blocking mutex on audio thread.
24. No engine construction/destruction on audio thread.
25. No model/IR loading on audio thread.
26. No latency changes during playback.
27. Preallocate variable-delay memory.
28. Prepare scene/model changes off-thread.
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
67. Motion can derive from host position when available.
68. Provide fallback when host position is incomplete.
69. Offline bounce remains deterministic.
70. Test loop boundaries and timeline jumps.

## Space
71. Separate sparse early reflections from late diffuse field.
72. Avoid continuously swapping large IRs for motion.
73. Outdoor spaces must not become generic long reverbs.
74. Direct/early/late levels remain internally distinct.
75. Keep early-reflection tap counts CPU-bounded.
76. Reuse late-field topology across space presets.
77. Smooth decay/absorption controls.
78. Prepare room-model changes off audio thread.
79. No routine oversampling in space baseline.
80. Explicitly test mono/stereo/future layout assumptions.

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

## UI/tests/maintenance
91. UI assets stay outside C++ source folders.
92. UI analyzers stay decoupled from processing.
93. Analyzer work throttles/stops when editor is closed.
94. Keep Unit/DSP/Host/Performance test groups separate.
95. Add allocation/stress tests before CPU claims.
96. Version golden-reference metadata and tolerances.
97. Developer tools must not become runtime dependencies.
98. Explicitly list/review third-party dependencies.
99. Avoid catch-all Common/Helpers dumping grounds.
100. Require architecture review before any new top-level directory.

## Accepted result

The first structure is module-oriented rather than screen-oriented. It minimizes host/DSP coupling, keeps realtime ownership explicit, allows direct testing of every acoustic stage, and leaves room for AAX/offline-host work without a later repository rewrite.
