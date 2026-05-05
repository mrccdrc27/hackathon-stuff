# Gemini Live API Plugin (LiveKit)
**Source:** [[raw/Gemini Live API plugin.md]]
**Ingested:** 2026-05-05

## Summary
LiveKit's Google plugin provides a `RealtimeModel` class to integrate Gemini Live API into LiveKit Agents, enabling natural voice conversations within the LiveKit ecosystem.

## Key Takeaways
- **Compatibility:** `gemini-3.1-flash-live-preview` has limitations (ignores `update_instructions`, `update_chat_ctx`, and `send_client_content` after session start).
- **Features:** Supports native thinking mode (`thinkingLevel`), video input sampling (1 FPS by default), and turn detection (Server VAD or LiveKit VAD).
- **Architecture:** Can be used in a "half-cascade" mode with separate TTS for complete control over speech output.
- **Deployment:** Requires `GOOGLE_API_KEY` (Gemini API) or `GOOGLE_APPLICATION_CREDENTIALS` (Vertex AI).

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[concepts/agent_architecture.md]]
