---
title: "Gemini Live API plugin"
source: "https://docs.livekit.io/agents/models/realtime/plugins/gemini/"
author:
published:
created: 2026-05-05
description: "How to use the Gemini Live API with LiveKit Agents."
tags:
  - "clippings"
---
Available in

Python

|

Node.js

[

Try the playground

Chat with a voice assistant built with LiveKit and the Gemini Live API

![Try the playground](https://docs.livekit.io/_next/image/?url=%2Fimages%2Fagents%2Fgemini-playground-thumb.png&w=640&q=75)](https://gemini.livekit.io/)

## Overview

Google's [Gemini Live API](https://ai.google.dev/gemini-api/docs/live) enables low-latency, two-way interactions that use text, audio, and video input, with audio and text output. LiveKit's Google plugin includes a `RealtimeModel` class that allows you to use this API to create agents with natural, human-like voice conversations.

### Installation

Install the Google plugin:

```shell
uv add "livekit-agents[google]~=1.5"
```

```shell
pnpm add "@livekit/agents-plugin-google@1.x"
```

### Authentication

The Google plugin requires authentication based on your chosen service:

- For Vertex AI, you must set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the service account key file. For more information about mounting files as secrets when deploying to LiveKit Cloud, see [File-mounted secrets](https://docs.livekit.io/deploy/agents/secrets/#file-mounted-secrets).
- For the Google Gemini API, set the `GOOGLE_API_KEY` environment variable.

### Usage

Use the Gemini Live API within an `AgentSession`. For example, you can use it in the [Voice AI quickstart](https://docs.livekit.io/agents/start/voice-ai/).

```python
from livekit.plugins import google

session = AgentSession(
    llm=google.realtime.RealtimeModel(
        voice="Puck",
        temperature=0.8,
        instructions="You are a helpful assistant",
    ),
)
```

```typescript
import * as google from '@livekit/agents-plugin-google';

const session = new voice.AgentSession({
   llm: new google.beta.realtime.RealtimeModel({
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      voice: "Puck",
      temperature: 0.8,
      instructions: "You are a helpful assistant",
   }),
});
```

### Parameters

This section describes some of the available parameters. For a complete reference of all available parameters, see the plugin reference links in the [Additional resources](#additional-resources) section.

**`instructions`** `string`

System instructions to better control the model's output and specify tone and sentiment of responses. To learn more, see [System instructions](https://ai.google.dev/gemini-api/docs/live#system-instructions).

**`model`**

Required

`LiveAPIModels | string` Default: `gemini-2.5-flash`

Live API model to use.

**`api_key`**

Required

`string` Env: `GOOGLE_API_KEY`

Google Gemini API key.

**`voice`**

Required

`Voice | string` Default: `Puck`

Name of the Gemini Live API voice. For a full list, see [Voices](https://ai.google.dev/gemini-api/docs/live#change-voices).

**`modalities`** `list[Modality]` Default: `["AUDIO"]`

List of response modalities to use. Set to `["TEXT"]` to use the model in text-only mode with a [separate TTS plugin](#separate-tts).

**`vertexai`**

Required

`boolean` Default: `false`

If set to true, use Vertex AI.

**`project`** `string` Env: `GOOGLE_CLOUD_PROJECT`

Google Cloud project ID to use for the API (if `vertexai=True`). By default, it uses the project in the service account key file (set using the `GOOGLE_APPLICATION_CREDENTIALS` environment variable).

**`location`** `string` Env: `GOOGLE_CLOUD_LOCATION`

Google Cloud location to use for the API (if `vertexai=True`). By default, it uses the location from the service account key file or `us-central1`.

**`thinking_config`** `ThinkingConfig`

Configuration for the model's thinking mode, if supported. For more information, see [Thinking](#thinking).

**`enable_affective_dialog`** `boolean` Default: `false`

Enable affective dialog on supported native audio models. Not supported on Gemini 3.1 models. For more information, see [Affective dialog](https://ai.google.dev/gemini-api/docs/live-guide#affective-dialog).

**`proactivity`** `boolean` Default: `false`

Enable proactive audio, where the model can decide not to respond to certain inputs. Requires a native audio model. Not supported on Gemini 3.1 models. For more information, see [Proactive audio](https://ai.google.dev/gemini-api/docs/live-guide#proactive-audio).

## Gemini 3.1 compatibility

**Caution**

`gemini-3.1-flash-live-preview` has known compatibility limitations with LiveKit Agents. A long-term fix is being investigated, but for now some features don't work with this model. This section documents the current state.

Gemini 3.1 Flash Live Preview restricts `send_client_content` to initial history seeding only. After the first model turn, the model rejects `send_client_content` with a 1007 error. `generate_reply()`, `update_instructions()`, and `update_chat_ctx()` are not compatible with 3.1 models. The plugin logs a warning and the call is ignored. The session still stores the updated values internally, but the changes aren't sent to the model mid-session.

Because `update_instructions()` is not supported mid-session, agent handoffs that use `session.update_agent()` are also affected. Multi-agent architectures that rely on switching agents with different instructions during a session don't work with 3.1 models at this time.

Basic voice conversations, tool calling, and audio I/O work normally with 3.1.

### Other breaking changes

These changes also apply when migrating from Gemini 2.5 to 3.1:

- Affective dialog and proactive audio are not supported. Remove these options from your configuration.
- Asynchronous function calling is not supported. The model pauses and waits for your tool response before continuing.
- The `thinkingConfig` parameter uses `thinkingLevel` (options: `"minimal"`, `"low"`, `"medium"`, `"high"`) instead of `thinkingBudget`. The default is `"minimal"` for lowest latency.

### Migrating from 2.5 to 3.1

To use the 3.1 model, update the model parameter:

```python
session = AgentSession(
    llm=google.realtime.RealtimeModel(
        model="gemini-3.1-flash-live-preview",
        voice="Puck",
        instructions="You are a helpful assistant",
    ),
)
```

```typescript
const session = new voice.AgentSession({
   llm: new google.beta.realtime.RealtimeModel({
      model: "gemini-3.1-flash-live-preview",
      voice: "Puck",
      instructions: "You are a helpful assistant",
   }),
});
```

Additional changes when migrating:

- Remove `enable_affective_dialog` and `proactivity` parameters if set.
- Replace `thinkingBudget` with `thinkingLevel` in your `thinking_config`.
- `generate_reply()`, `update_instructions()`, and `update_chat_ctx()` are not compatible with 3.1. Calls are ignored with a warning.

For the full list of changes, see [Google's migration guide](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-live-preview#migrating).

## Provider tools

See [Gemini LLM provider tools](https://docs.livekit.io/agents/models/llm/gemini/#provider-tools) for more information about tools that enable the model to use built-in capabilities executed on the model server.

## Turn detection

The Gemini Live API includes built-in VAD-based turn detection, enabled by default. To use LiveKit's turn detection model instead, configure the model to disable automatic activity detection. A separate streaming STT model is required in order to use LiveKit's turn detection model.

```python
from google.genai import types
from livekit.agents import AgentSession, TurnHandlingOptions
from livekit.plugins.turn_detector.multilingual import MultilingualModel

session = AgentSession(
   turn_handling=TurnHandlingOptions(
      turn_detection=MultilingualModel(),
   ),
   llm=google.realtime.RealtimeModel(
      realtime_input_config=types.RealtimeInputConfig(
         automatic_activity_detection=types.AutomaticActivityDetection(
            disabled=True,
         ),
      ),
      input_audio_transcription=None,
   ),
   stt="deepgram/nova-3",
)
```

```typescript
import * as google from '@livekit/agents-plugin-google';
import * as livekit from '@livekit/agents-plugin-livekit';

const session = new voice.AgentSession({
   llm: new google.beta.realtime.RealtimeModel({
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      realtimeInputConfig: {
         automaticActivityDetection: {
            disabled: true,
         },
      },
   }),
   stt: "deepgram/nova-3",
   turnHandling: {
      turnDetection: new livekit.turnDetector.MultilingualModel(),
   },
});
```

## Thinking

Native audio Gemini models support thinking. You can configure its behavior with the `thinking_config` parameter. Note that Gemini 3.1 uses `thinkingLevel` instead of `thinkingBudget` — see [Gemini 3.1 compatibility](#gemini-3-1-compatibility) for details.

By default, the model's thoughts are forwarded like other transcripts. To disable this, set `include_thoughts=False`:

```python
from google.genai import types

# ...

session = AgentSession(
    llm=google.realtime.RealtimeModel(
        thinking_config=types.ThinkingConfig(
            include_thoughts=False,
        ),
    ),
)
```

```typescript
import * as google from '@livekit/agents-plugin-google';

// ...

const session = new voice.AgentSession({
   llm: new google.beta.realtime.RealtimeModel({
      thinkingConfig: {
         includeThoughts: false,
      },
   }),
});
```

For other available parameters, such as `thinking_budget`, see the [Gemini thinking docs](https://ai.google.dev/gemini-api/docs/thinking).

## Video input

ONLY Available in

Python

The Gemini Live API supports live video input. When enabled, the agent receives frames from the user's camera or screen share and streams them natively within the Gemini realtime protocol alongside the audio session.

To enable video, set `video_input=True` in your `RoomOptions`:

```python
class VideoAssistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="You are a helpful voice assistant with live video input from your user.",
            llm=google.realtime.RealtimeModel(
                voice="Puck",
                temperature=0.8,
            ),
        )

server = AgentServer()

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: JobContext):
    session = AgentSession()

    await session.start(
        agent=VideoAssistant(),
        room=ctx.room,
        room_options=room_io.RoomOptions(
            video_input=True,
        ),
    )
```

```python
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    JobContext,
    room_io,
)
from livekit.plugins import google
```

By default, the agent samples one frame per second while the user speaks and one frame every three seconds otherwise. To control the frame rate, pass a [`video_sampler`](https://docs.livekit.io/agents/logic/sessions/#video_sampler) to the `AgentSession`.

For more details on video input configuration, see [Live video input](https://docs.livekit.io/agents/multimodality/vision/video/#live-video-input).

## Usage with separate TTS

**Note**

Please refer to [this open Google issue](https://github.com/googleapis/python-genai/issues/1780) and note that this architecture only works with non-native-audio models.

You can combine Gemini Live API and a separate [TTS instance](https://docs.livekit.io/agents/models/tts/) to build a half-cascade architecture. This configuration allows you to gain the benefits of realtime speech comprehension while maintaining complete control over the speech output.

```python
from google.genai.types import Modality

session = AgentSession(
    llm=google.realtime.RealtimeModel(modalities=[Modality.TEXT]),
    tts="cartesia/sonic-3",
)
```

```typescript
import * as google from '@livekit/agents-plugin-google';

const session = new voice.AgentSession({
   llm: new google.beta.realtime.RealtimeModel({
      model: "gemini-2.5-flash-native-audio-preview-12-2025",
      modalities: [google.types.Modality.TEXT],
   }),
   tts: "cartesia/sonic-3",
});
```

## Additional resources

The following resources provide more information about using Gemini with LiveKit Agents.

### Python plugin

[Reference](https://docs.livekit.io/reference/python/livekit/plugins/google/realtime/index.html) [GitHub](https://github.com/livekit/agents/tree/main/livekit-plugins/livekit-plugins-google) [PyPI](https://pypi.org/project/livekit-plugins-google/)

### Node.js plugin

## [Gemini docs](https://ai.google.dev/gemini-api/docs/live)

Gemini Live API documentation.

## [Voice AI quickstart](https://docs.livekit.io/agents/start/voice-ai/)

Get started with LiveKit Agents and Gemini Live API.

## [Google AI ecosystem guide](https://docs.livekit.io/agents/integrations/google/)

Overview of the entire Google AI and LiveKit Agents integration.

## [Gemini Live vision assistant](https://docs.livekit.io/reference/recipes/gemini_live_vision/)

Build a vision-aware voice assistant with Gemini Live.