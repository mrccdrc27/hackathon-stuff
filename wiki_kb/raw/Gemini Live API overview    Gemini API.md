---
title: "Gemini Live API overview  |  Gemini API"
source: "https://ai.google.dev/gemini-api/docs/live-api"
author:
published:
created: 2026-05-05
description:
tags:
  - "clippings"
---
The Live API enables low-latency, real-time voice and vision interactions with Gemini. It processes continuous streams of audio, images, and text to deliver immediate, human-like spoken responses, creating a natural conversational experience for your users.

![Live API Overview](https://ai.google.dev/static/gemini-api/docs/images/live-api-overview.png)

## Use cases

Live API can be used to build real-time voice agents for a variety of industries, including:

- **E-commerce and retail:** Shopping assistants that offer personalized recommendations and support agents that resolve customer issues.
- **Gaming:** Interactive non-player characters (NPCs), in-game help assistants, and real-time translation of in-game content.
- **Next-gen interfaces:** Voice- and video-enabled experiences in robotics, smart glasses, and vehicles.
- **Healthcare:** Health companions for patient support and education.
- **Financial services:** AI advisors for wealth management and investment guidance.
- **Education:** AI mentors and learner companions that provide personalized instruction and feedback.

## Key features

Live API offers a comprehensive set of features for building robust voice agents:

- [**Multilingual support**](https://ai.google.dev/gemini-api/docs/live-guide#supported-languages): Converse in 70 supported languages.
- [**Barge-in**](https://ai.google.dev/gemini-api/docs/live-guide#interruptions): Users can interrupt the model at any time for responsive interactions.
- [**Tool use**](https://ai.google.dev/gemini-api/docs/live-tools): Integrates tools like function calling and Google Search for dynamic interactions.
- [**Audio transcriptions**](https://ai.google.dev/gemini-api/docs/live-guide#audio-transcription): Provides text transcripts of both user input and model output.
- [**Proactive audio**](https://ai.google.dev/gemini-api/docs/live-guide#proactive-audio): Lets you control when the model responds and in what contexts.
- [**Affective dialog**](https://ai.google.dev/gemini-api/docs/live-guide#affective-dialog): Adapts response style and tone to match the user's input expression.

## Technical specifications

The following table outlines the technical specifications for the Live API:

| Category | Details |
| --- | --- |
| Input modalities | Audio (raw 16-bit PCM audio, 16kHz, little-endian), images (JPEG <= 1FPS), text |
| Output modalities | Audio (raw 16-bit PCM audio, 24kHz, little-endian) |
| Protocol | Stateful WebSocket connection (WSS) |

## Choose an implementation approach

When integrating with Live API, you'll need to choose one of the following implementation approaches:

- **Server-to-server**: Your backend connects to the Live API using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). Typically, your client sends stream data (audio, video, text) to your server, which then forwards it to the Live API.
- **Client-to-server**: Your frontend code connects directly to the Live API using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to stream data, bypassing your backend.

## Get started

Select the guide that matches your development environment:

## Partner integrations

To streamline the development of real-time audio and video apps, you can use a third-party integration that supports the Gemini Live API over WebRTC or WebSockets.