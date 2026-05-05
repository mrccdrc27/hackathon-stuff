# Research: AI Meeting Facilitation & Integration Feasibility

This document evaluates the feasibility of integrating an AI agent (Gemini-powered) into live team communications for real-time note-taking and facilitation, as proposed in the **Engineering Orchestration Framework**.

## 1. Core Technology: Gemini Multimodal Live API
The **Gemini Multimodal Live API** is the primary engine for this domain. It differs from standard LLM APIs by supporting **bidirectional, stateful streaming** via WebSockets.

| Feature | Specification |
| :--- | :--- |
| **Protocol** | WebSockets (WSS) |
| **Audio Input** | Raw PCM, 16-bit, 16kHz, Little-endian, Mono |
| **Audio Output** | Raw PCM, 16-bit, 24kHz, Little-endian, Mono |
| **Latency** | Sub-second (Voice-to-Voice) |
| **Key Capability** | **Barge-in:** Users can interrupt the AI, and it will stop and listen immediately. |

---

## 2. Integration Pathways

### A. Discord / Third-Party App Integration (Invite-to-App)
**Feasibility: High (Technical complexity in audio routing)**
The goal is to have a bot join a voice channel, listen to multiple speakers, and respond in real-time.

*   **Mechanism:** Discord uses the **Opus** audio codec and UDP for voice. A bot (Node.js/Python) must join the channel, subscribe to user streams, and decode Opus to raw PCM.
*   **Workflow:**
    1.  Bot joins Discord Voice Channel.
    2.  `discord.js` (or similar) decodes user audio -> PCM 16kHz.
    3.  Stream PCM to Gemini via WebSocket.
    4.  Receive 24kHz PCM from Gemini -> Encode to Opus.
    5.  Play Opus stream back into the Discord channel.
*   **Pros:** Native environment for most dev teams; no new platform to adopt.
*   **Cons:** Discord's API limits one audio stream per bot; handling multiple simultaneous speakers requires mixing or separate processing per user (expensive).

### B. Self-Hosted Platform (Host Your Own)
**Feasibility: Very High (Recommended path via LiveKit)**
Building a custom WebRTC-based conference room where the AI is a native participant.

*   **Mechanism:** Use **LiveKit** (an open-source WebRTC stack). LiveKit has a dedicated `livekit-plugins-google` plugin that integrates directly with the Gemini Realtime Model.
*   **Workflow:**
    1.  Deploy a LiveKit Server.
    2.  Use the **LiveKit Agents** framework to create a worker that joins the room.
    3.  The agent uses the Gemini Realtime plugin to process audio/video frames natively.
*   **Pros:** **Lowest latency** (no extra hops); handles video (multimodal context); scales horizontally with LiveKit's SFU architecture.
*   **Cons:** Requires infrastructure management (servers, TURN/STUN).

### C. Enterprise Meeting Bots (Zoom, Google Meet, Teams)
**Feasibility: High (Via Infrastructure-as-a-Service like Recall.ai)**
"Inviting" a bot to a standard calendar meeting.

*   **Mechanism:** Use **Recall.ai**. They provide a unified API that sends a "headless browser" participant into any major meeting platform.
*   **Workflow:**
    1.  Call Recall.ai API with a meeting URL.
    2.  Recall.ai sends a bot to record and stream media.
    3.  Use the Recall.ai **Real-time Media API** to pipe audio into Gemini.
    4.  Use the **Output Media API** to allow Gemini's voice to be heard in the meeting.
*   **Pros:** Works with the tools clients/leads already use (Zoom/Meet); no browser automation maintenance.
*   **Cons:** Usage fees (~$0.50/hour); 3rd-party data processing.

---

## 3. Feasibility Summary & Recommendations

| Approach | Setup Time | Latency | Maintenance | User Friction |
| :--- | :--- | :--- | :--- | :--- |
| **Discord Bot** | Medium | Low | Medium | Zero |
| **LiveKit (Self-Host)**| High | **Lowest** | High | High (New URL) |
| **Recall.ai (Bot)** | **Low** | Medium | **Low** | Zero |

### Recommendation:
1.  **For Internal Hackathon/Fast Prototype:** Use **Discord**. It fits the "developer vibe" and avoids building a whole UI.
2.  **For Production Project Management Tool:** Use **Recall.ai**. Being able to join a user's existing Google Meet or Zoom link is critical for non-technical stakeholder alignment (as per Section 3.C in `ARCHITECTURE.md`).
3.  **For Advanced Facilitation (Vision + Audio):** Use **LiveKit**. If the AI needs to "see" a demo or a screen share to facilitate (e.g., "I see you're showing the CORS error on line 42"), LiveKit's native multimodal pipeline is superior.
