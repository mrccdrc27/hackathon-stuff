# Session Management with Live API
**Source:** [[raw/Session management with Live API    Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
A guide on managing session persistence, lifetime, and resumption within the Live API. It addresses challenges like time limits and connection resets.

## Key Takeaways
- **Session Limits:** 15 mins (audio) or 2 mins (audio-video) without compression.
- **Context Window Compression:** Use `slidingWindow` to extend sessions indefinitely by discarding old turns.
- **Connection Limits:** WebSocket connections reset ~10 mins.
- **Session Resumption:** Use `sessionResumption` handles (valid for 2 hours) to maintain state across different connections.
- **Server Signals:** `GoAway` (with `timeLeft` duration) warns of impending disconnect; `generationComplete` signals end of model response.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[sources/live_api_best_practices.md]]
