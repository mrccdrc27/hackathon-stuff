# Gemini API - Ephemeral Tokens
**Source:** [[raw/Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
Ephemeral tokens are short-lived authentication tokens used for secure client-to-server WebSocket connections to the Gemini Live API. They mitigate security risks associated with deploying long-lived API keys in client-side applications.

## Key Takeaways
- **Workflow:** Backend authenticates -> Backend requests ephemeral token from Gemini provisioning -> Backend sends token to client -> Client connects via WebSocket.
- **Expiration:** Default is 1 minute to start a session and 30 minutes to send messages.
- **Session Resumption:** Reconnection every 10 minutes is required within the token's lifetime.
- **Constraints:** Tokens can be locked to specific configurations (model, temperature, modalities) to enforce server-side settings.

## Related
- [[entities/gemini_multimodal_live_api.md]]
