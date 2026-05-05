# Get Started with Gemini Live API (WebSockets)
**Source:** [[raw/Get started with Gemini Live API using WebSockets    Gemini API.md]]
**Ingested:** 2026-05-05

## Summary
A low-level guide for direct WebSocket integration with the Gemini Live API, bypassing the SDK. It details the manual handling of the bidirectional JSON protocol.

## Key Takeaways
- **Authentication:** API key passed as a query parameter in the WSS URL.
- **Setup:** First message must be `BidiGenerateContentSetup`.
- **Message Types:** `BidiGenerateContentClientMessage` (Client -> Server) and `BidiGenerateContentServerMessage` (Server -> Client).
- **Data Encoding:** Audio and video data must be base64-encoded within the JSON payload.
- **Implementation:** Requires manual implementation of tool call routing and response construction.

## Related
- [[entities/gemini_multimodal_live_api.md]]
