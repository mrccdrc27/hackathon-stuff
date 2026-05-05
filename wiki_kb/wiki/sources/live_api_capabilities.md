# Live API Capabilities Guide
**Source:** [[raw/Live API capabilities guide    Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
A detailed guide on the modalities, interaction patterns, and model differences within the Live API ecosystem.

## Key Takeaways
- **Model Comparison (3.1 vs 2.5):** 3.1 uses `thinkingLevel`, supports simultaneous multi-part server events, but lacks proactive audio/affective dialog and async function calling (as of current preview).
- **Modalities:** Supports raw 16-bit PCM (16kHz in, 24kHz out), JPEG/PNG video (max 1 FPS), and real-time text.
- **Transcription:** Separate toggles for `input_audio_transcription` and `output_audio_transcription`.
- **VAD:** Automatic VAD is the default; cancellation of generation occurs immediately upon detected interruption.
- **Constraints:** Audio-only sessions ~15 mins, audio-video ~2 mins without compression/resumption.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[sources/gemini_3_1_flash_live_preview.md]]
