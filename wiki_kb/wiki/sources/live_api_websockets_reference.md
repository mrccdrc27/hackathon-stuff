# Live API - WebSockets API Reference
**Source:** [[raw/Live API - WebSockets API reference    Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
A comprehensive reference for the stateful WebSocket-based Live API. It details the connection process, message formats, and server events for bi-directional streaming.

## Key Takeaways
- **Connection:** `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent`.
- **Client Messages:** `setup` (initial config), `clientContent` (incremental history), `realtimeInput` (audio/video/text streams), `toolResponse` (function results).
- **Server Messages:** `setupComplete`, `serverContent` (model output/transcripts), `toolCall` (function requests), `goAway` (pre-disconnect notice), `sessionResumptionUpdate`.
- **VAD Control:** `AutomaticActivityDetection` can be configured (sensitivity, padding, silence) or disabled for manual `activityStart`/`activityEnd` signaling.
- **Context Management:** Supports `slidingWindow` and `triggerTokens` for context window compression.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[sources/get_started_gemini_live_websockets.md]]
