# Live API Best Practices
**Source:** [[raw/Live API best practices    Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
Guidelines for optimizing Gemini Live API performance, focusing on system instruction design, tool definition, and session management.

## Key Takeaways
- **System Instructions:** Define persona, conversational rules (one-time vs. loops), and tool calls in distinct sentences. Use "unmistakably" for precision.
- **Streaming:** Send audio in 20ms-40ms chunks. Handle interruptions by immediately discarding client-side buffers when `"interrupted": true` is received.
- **Audio Specs:** Resample microphone to 16kHz before sending. Audio output is 24kHz.
- **Session Health:** Enable context window compression (tokens grow @ 25/sec). Use session resumption handles (valid for 2 hours) to reconnect seamlessly.
- **Proactive Greeting:** Live API expects user input first; seed the session with a command to have the model initiate the conversation.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[concepts/agent_architecture.md]]
