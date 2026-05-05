# Gemini API Reference
**Source:** [[raw/Gemini API reference    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
The Gemini API reference outlines the standard, streaming, and real-time APIs for interacting with Gemini models. It categorizes endpoints into content generation (REST), streaming (SSE), and the Live API (WebSockets).

## Key Takeaways
- **Standard (`generateContent`):** REST endpoint for non-interactive tasks.
- **Streaming (`streamGenerateContent`):** SSE-based for faster user experience.
- **Live API (`BidiGenerateContent`):** Stateful WebSocket API for bi-directional, real-time conversation.
- **Core Objects:** `Content` (message turn), `Part` (data piece like text/image), and `Blob` (raw media bytes).
- **Platform APIs:** Includes File API (for large/reusable files) and Token Counting.

## Related
- [[entities/gemini_multimodal_live_api.md]]
