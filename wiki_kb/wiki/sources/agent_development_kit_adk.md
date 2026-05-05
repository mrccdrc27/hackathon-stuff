# Agent Development Kit (ADK)
**Source:** [[raw/Agent Development Kit (ADK).md]]
**Ingested:** 2026-05-05

## Summary
The Agent Development Kit (ADK) provides a toolkit for building multi-agent systems with low-latency bidirectional voice and video interaction using the Gemini Live API. It supports text, audio, and video inputs/outputs and allows for human-like voice conversations with interruption capabilities.

## Key Takeaways
- ADK Gemini Live API Toolkit enables real-time multimodal interaction (voice/video/text).
- Supports streaming tools that allow agents to monitor and react to live data (e.g., stock prices, video streams).
- Includes development guides for `LiveRequestQueue` (upstream flow), `run_live()` (event handling), and `RunConfig` (session/quota management).
- Demonstrates integration with FastAPI and WebSocket for production-ready implementations.

## Related
- [[concepts/agent_architecture.md]]
- [[entities/gemini_multimodal_live_api.md]]
