# Gemini Multimodal Live API

The primary engine for real-time voice, vision, and text interaction in the orchestration framework.

## Capabilities
- **Multimodal I/O:** Supports raw PCM audio (16kHz in, 24kHz out), JPEG/PNG video frames (up to 1 FPS), and real-time text.
- **Bi-directional Streaming:** Stateful WebSocket-based API (`BidiGenerateContent`) for low-latency conversations.
- **Barge-in:** Natural interruption handling via server-side Voice Activity Detection (VAD).
- **Thinking Mode:** Integrated reasoning via `thinkingLevel` (3.1) or `thinkingBudget` (2.5).
- **Tool Use:** Native support for synchronous (and 2.5 asynchronous) function calling and Google Search grounding.
- **Session Management:** Robust context window compression (sliding window) and session resumption handles for unlimited duration.
- **Security:** Ephemeral tokens for secure client-to-server implementations.

## Technical Specifications
- **Audio:** 16-bit PCM, little-endian.
- **Latency:** Sub-second response time optimized for real-time dialogue.
- **Token Usage:** ~25 tokens per second of audio.

## Sources
- [[sources/gemini_3_1_flash_live_preview.md]]
- [[sources/gemini_live_api_overview.md]]
- [[sources/live_api_websockets_reference.md]]
- [[sources/live_api_best_practices.md]]
- [[sources/live_api_capabilities.md]]
- [[sources/session_management_live_api.md]]
- [[sources/tool_use_live_api.md]]
- [[sources/meeting_integration_research.md]]
- [[sources/feasibility_analysis.md]]
