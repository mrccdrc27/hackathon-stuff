# Get Started with Gemini Live API (SDK)
**Source:** [[raw/Get started with Gemini Live API using the Google GenAI SDK    Gemini API.md]]
**Ingested:** 2026-05-05

## Summary
A technical guide for integrating the Gemini Live API using the Google GenAI SDK (Python/JavaScript). It focuses on asynchronous session management and real-time data streaming.

## Key Takeaways
- **Session:** Managed via `client.aio.live.connect`.
- **Modality Handling:** `send_realtime_input` for sending text, raw 16-bit PCM audio (16kHz), and JPEG/PNG video frames.
- **Reception:** Async iteration over `session.receive()` to handle `server_content` (audio chunks, transcriptions).
- **Tool Calling:** Logic for executing local functions and returning `FunctionResponse` to the model turn.

## Related
- [[entities/gemini_multimodal_live_api.md]]
