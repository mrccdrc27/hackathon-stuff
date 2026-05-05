# Conversational AI - Google Gemini Live (Agora)
**Source:** [[raw/Conversational AI  Google Gemini Live.md]]
**Ingested:** 2026-05-05

## Summary
Agora provides integration for Google Gemini Live within its Conversational AI Engine. It enables end-to-end voice processing, effectively disabling separate ASR, LLM, and TTS components when enabled.

## Key Takeaways
- Supports multiple VAD modes: Server VAD (vendor-side) and Agora VAD.
- Configurable parameters for voice identifiers (e.g., Charon, Aoede), affective dialog (tone adaptation), and proactive audio.
- Utilizes `mllm` configuration for session joining, message history, and modality management (audio input/output).

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[concepts/meeting_facilitation.md]]
