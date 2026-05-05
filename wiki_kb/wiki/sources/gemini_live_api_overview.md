# Gemini Live API Overview
**Source:** [[raw/Gemini Live API overview    Gemini API.md]]
**Ingested:** 2026-05-05

## Summary
The Live API enables low-latency, real-time voice and vision interactions. It processes continuous streams of audio, images, and text to deliver human-like spoken responses.

## Key Takeaways
- **Capabilities:** Multilingual support (70+ languages), Barge-in (interruption), Tool use (function calling/Search), Audio transcriptions, Proactive audio, and Affective dialog.
- **Technical Specs:** Input (16kHz PCM audio, JPEG <= 1FPS, text), Output (24kHz PCM audio), Protocol (Stateful WebSocket/WSS).
- **Implementation:** Supports both Server-to-Server and Client-to-Server (using ephemeral tokens) approaches.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[concepts/meeting_facilitation.md]]
