---
title: "Live API - WebSockets API reference  |  Gemini API  |  Google AI for Developers"
source: "https://ai.google.dev/api/live"
author:
published:
created: 2026-05-05
description:
tags:
  - "clippings"
---
The Live API is a stateful API that uses [WebSockets](https://en.wikipedia.org/wiki/WebSocket). In this section, you'll find additional details regarding the WebSockets API.

## Sessions

A WebSocket connection establishes a session between the client and the Gemini server. After a client initiates a new connection the session can exchange messages with the server to:

- Send text, audio, or video to the Gemini server.
- Receive audio, text, or function call requests from the Gemini server.

### WebSocket connection

To start a session, connect to this websocket endpoint:

```
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent
```

### Session configuration

The initial message sent after establishing the WebSocket connection sets the session configuration, which includes the model, generation parameters, system instructions, and tools.

You cannot update the configuration while the connection is open. However, you can change the configuration parameters, except the model, when pausing and resuming via the [session resumption mechanism](#BidiGenerateContentSetup.FIELDS.SessionResumptionConfig.BidiGenerateContentSetup.session_resumption).

See the following example configuration. Note that the name casing in SDKs may vary. You can look up the [Python SDK configuration options here](https://github.com/googleapis/python-genai/blob/main/google/genai/types.py).

```json
{
  "model": string,
  "generationConfig": {
    "candidateCount": integer,
    "maxOutputTokens": integer,
    "temperature": number,
    "topP": number,
    "topK": integer,
    "presencePenalty": number,
    "frequencyPenalty": number,
    "responseModalities": [string],
    "speechConfig": object,
    "mediaResolution": object
  },
  "systemInstruction": string,
  "tools": [object]
}
```

For more information on the API field, see [generationConfig](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig).

## Send messages

To exchange messages over the WebSocket connection, the client must send a JSON object over an open WebSocket connection. The JSON object must have **exactly one** of the fields from the following object set:

```json
{
  "setup": BidiGenerateContentSetup,
  "clientContent": BidiGenerateContentClientContent,
  "realtimeInput": BidiGenerateContentRealtimeInput,
  "toolResponse": BidiGenerateContentToolResponse
}
```

### Supported client messages

See the supported client messages in the following table:

| Message | Description |
| --- | --- |
| `BidiGenerateContentSetup` | Session configuration to be sent in the first message |
| `BidiGenerateContentClientContent` | Incremental content update of the current conversation delivered from the client |
| `BidiGenerateContentRealtimeInput` | Real time audio, video, or text input |
| `BidiGenerateContentToolResponse` | Response to a `ToolCallMessage` received from the server |

## Receive messages

To receive messages from Gemini, listen for the WebSocket 'message' event, and then parse the result according to the definition of the supported server messages.

See the following:

```
async with client.aio.live.connect(model='...', config=config) as session:
    await session.send(input='Hello world!', end_of_turn=True)
    async for message in session.receive():
        print(message)
```

Server messages may have a [`usageMetadata`](#UsageMetadata) field but will otherwise include **exactly one** of the other fields from the [`BidiGenerateContentServerMessage`](#BidiGenerateContentServerMessage) message. (The `messageType` union is not expressed in JSON so the field will appear at the top-level of the message.)

## Messages and events

### ActivityEnd

This type has no fields.

Marks the end of user activity.

### ActivityHandling

The different ways of handling user activity.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Enums</th></tr></thead><tbody><tr><td><code>ACTIVITY_HANDLING_UNSPECIFIED</code></td><td>If unspecified, the default behavior is <code>START_OF_ACTIVITY_INTERRUPTS</code>.</td></tr><tr><td><code>START_OF_ACTIVITY_INTERRUPTS</code></td><td>If true, start of activity will interrupt the model's response (also called "barge in"). The model's current response will be cut-off in the moment of the interruption. This is the default behavior.</td></tr><tr><td><code>NO_INTERRUPTION</code></td><td>The model's response will not be interrupted.</td></tr></tbody></table>

### ActivityStart

This type has no fields.

Marks the start of user activity.

### AudioTranscriptionConfig

This type has no fields.

The audio transcription configuration.

### AutomaticActivityDetection

Configures automatic detection of activity.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>disabled</code></td><td><p><code>bool</code></p><p>Optional. If enabled (the default), detected voice and text input count as activity. If disabled, the client must send activity signals.</p></td></tr><tr><td><code>startOfSpeechSensitivity</code></td><td><p><code>StartSensitivity</code></p><p>Optional. Determines how likely speech is to be detected.</p></td></tr><tr><td><code>prefixPaddingMs</code></td><td><p><code>int32</code></p><p>Optional. The required duration of detected speech before start-of-speech is committed. The lower this value, the more sensitive the start-of-speech detection is and shorter speech can be recognized. However, this also increases the probability of false positives.</p></td></tr><tr><td><code>endOfSpeechSensitivity</code></td><td><p><code>EndSensitivity</code></p><p>Optional. Determines how likely detected speech is ended.</p></td></tr><tr><td><code>silenceDurationMs</code></td><td><p><code>int32</code></p><p>Optional. The required duration of detected non-speech (e.g. silence) before end-of-speech is committed. The larger this value, the longer speech gaps can be without interrupting the user's activity but this will increase the model's latency.</p></td></tr></tbody></table>

### BidiGenerateContentClientContent

Incremental update of the current conversation delivered from the client. All of the content here is unconditionally appended to the conversation history and used as part of the prompt to the model to generate content.

A message here will interrupt any current model generation.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>turns[]</code></td><td><p><code>Content</code></p><p>Optional. The content appended to the current conversation with the model.</p><p>For single-turn queries, this is a single instance. For multi-turn queries, this is a repeated field that contains conversation history and the latest request.</p></td></tr><tr><td><code>turnComplete</code></td><td><p><code>bool</code></p><p>Optional. If true, indicates that the server content generation should start with the currently accumulated prompt. Otherwise, the server awaits additional messages before starting generation.</p></td></tr></tbody></table>

### BidiGenerateContentRealtimeInput

User input that is sent in real time.

The different modalities (audio, video and text) are handled as concurrent streams. The ordering across these streams is not guaranteed.

This is different from `BidiGenerateContentClientContent` in a few ways:

- Can be sent continuously without interruption to model generation.
- If there is a need to mix data interleaved across the `BidiGenerateContentClientContent` and the `BidiGenerateContentRealtimeInput`, the server attempts to optimize for best response, but there are no guarantees.
- End of turn is not explicitly specified, but is rather derived from user activity (for example, end of speech).
- Even before the end of turn, the data is processed incrementally to optimize for a fast start of the response from the model.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>mediaChunks[]</code></td><td><p><code>Blob</code></p><p>Optional. Inlined bytes data for media input. Multiple <code>mediaChunks</code> are not supported, all but the first will be ignored.</p><p>DEPRECATED: Use one of <code>audio</code>, <code>video</code>, or <code>text</code> instead.</p></td></tr><tr><td><code>audio</code></td><td><p><code>Blob</code></p><p>Optional. These form the realtime audio input stream.</p></td></tr><tr><td><code>video</code></td><td><p><code>Blob</code></p><p>Optional. These form the realtime video input stream.</p></td></tr><tr><td><code>activityStart</code></td><td><p><code>ActivityStart</code></p><p>Optional. Marks the start of user activity. This can only be sent if automatic (i.e. server-side) activity detection is disabled.</p></td></tr><tr><td><code>activityEnd</code></td><td><p><code>ActivityEnd</code></p><p>Optional. Marks the end of user activity. This can only be sent if automatic (i.e. server-side) activity detection is disabled.</p></td></tr><tr><td><code>audioStreamEnd</code></td><td><p><code>bool</code></p><p>Optional. Indicates that the audio stream has ended, e.g. because the microphone was turned off.</p><p>This should only be sent when automatic activity detection is enabled (which is the default).</p><p>The client can reopen the stream by sending an audio message.</p></td></tr><tr><td><code>text</code></td><td><p><code>string</code></p><p>Optional. These form the realtime text input stream.</p></td></tr></tbody></table>

### BidiGenerateContentServerContent

Incremental server update generated by the model in response to client messages.

Content is generated as quickly as possible, and not in real time. Clients may choose to buffer and play it out in real time.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>generationComplete</code></td><td><p><code>bool</code></p><p>Output only. If true, indicates that the model is done generating.</p><p>When model is interrupted while generating there will be no 'generation_complete' message in interrupted turn, it will go through 'interrupted > turn_complete'.</p><p>When model assumes realtime playback there will be delay between generation_complete and turn_complete that is caused by model waiting for playback to finish.</p></td></tr><tr><td><code>turnComplete</code></td><td><p><code>bool</code></p><p>Output only. If true, indicates that the model has completed its turn. Generation will only start in response to additional client messages.</p></td></tr><tr><td><code>interrupted</code></td><td><p><code>bool</code></p><p>Output only. If true, indicates that a client message has interrupted current model generation. If the client is playing out the content in real time, this is a good signal to stop and empty the current playback queue.</p></td></tr><tr><td><code>inputTranscription</code></td><td><p><code>BidiGenerateContentTranscription</code></p><p>Output only. Input audio transcription. The transcription is sent independently of the other server messages and there is no guaranteed ordering.</p></td></tr><tr><td><code>outputTranscription</code></td><td><p><code>BidiGenerateContentTranscription</code></p><p>Output only. Output audio transcription. The transcription is sent independently of the other server messages and there is no guaranteed ordering, in particular not between <code>serverContent</code> and this <code>outputTranscription</code>.</p></td></tr><tr><td><code>modelTurn</code></td><td><p><code>Content</code></p><p>Output only. The content that the model has generated as part of the current conversation with the user.</p></td></tr></tbody></table>

### BidiGenerateContentServerMessage

Response message for the BidiGenerateContent call.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td colspan="2">Union field <code>messageType</code>. The type of the message. <code>messageType</code> can be only one of the following:</td></tr><tr><td><code>setupComplete</code></td><td><p><code>BidiGenerateContentSetupComplete</code></p><p>Output only. Sent in response to a <code>BidiGenerateContentSetup</code> message from the client when setup is complete.</p></td></tr><tr><td><code>serverContent</code></td><td><p><code>BidiGenerateContentServerContent</code></p><p>Output only. Content generated by the model in response to client messages.</p></td></tr><tr><td><code>toolCall</code></td><td><p><code>BidiGenerateContentToolCall</code></p><p>Output only. Request for the client to execute the <code>functionCalls</code> and return the responses with the matching <code>id</code> s.</p></td></tr><tr><td><code>toolCallCancellation</code></td><td><p><code>BidiGenerateContentToolCallCancellation</code></p><p>Output only. Notification for the client that a previously issued <code>ToolCallMessage</code> with the specified <code>id</code> s should be cancelled.</p></td></tr><tr><td><code>goAway</code></td><td><p><code>GoAway</code></p><p>Output only. A notice that the server will soon disconnect.</p></td></tr><tr><td><code>sessionResumptionUpdate</code></td><td><p><code>SessionResumptionUpdate</code></p><p>Output only. Update of the session resumption state.</p></td></tr></tbody></table>

### BidiGenerateContentSetup

Message to be sent in the first (and only in the first) `BidiGenerateContentClientMessage`. Contains configuration that will apply for the duration of the streaming RPC.

Clients should wait for a `BidiGenerateContentSetupComplete` message before sending any additional messages.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>model</code></td><td><p><code>string</code></p><p>Required. The model's resource name. This serves as an ID for the Model to use.</p><p>Format: <code>models/{model}</code></p></td></tr><tr><td><code>generationConfig</code></td><td><p><code>GenerationConfig</code></p><p>Optional. Generation config.</p><p>The following fields are not supported:</p><ul><li><code>responseLogprobs</code></li><li><code>responseMimeType</code></li><li><code>logprobs</code></li><li><code>responseSchema</code></li><li><code>stopSequence</code></li><li><code>routingConfig</code></li><li><code>audioTimestamp</code></li></ul></td></tr><tr><td><code>systemInstruction</code></td><td><p><code>Content</code></p><p>Optional. The user provided system instructions for the model.</p><p>Note: Only text should be used in parts and content in each part will be in a separate paragraph.</p></td></tr><tr><td><code>tools[]</code></td><td><p><code>Tool</code></p><p>Optional. A list of <code>Tools</code> the model may use to generate the next response.</p><p>A <code>Tool</code> is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model.</p></td></tr><tr><td><code>realtimeInputConfig</code></td><td><p><code>RealtimeInputConfig</code></p><p>Optional. Configures the handling of realtime input.</p></td></tr><tr><td><code>sessionResumption</code></td><td><p><code>SessionResumptionConfig</code></p><p>Optional. Configures session resumption mechanism.</p><p>If included, the server will send <code>SessionResumptionUpdate</code> messages.</p></td></tr><tr><td><code>contextWindowCompression</code></td><td><p><code>ContextWindowCompressionConfig</code></p><p>Optional. Configures a context window compression mechanism.</p><p>If included, the server will automatically reduce the size of the context when it exceeds the configured length.</p></td></tr><tr><td><code>inputAudioTranscription</code></td><td><p><code>AudioTranscriptionConfig</code></p><p>Optional. If set, enables transcription of voice input. The transcription aligns with the input audio language, if configured.</p></td></tr><tr><td><code>outputAudioTranscription</code></td><td><p><code>AudioTranscriptionConfig</code></p><p>Optional. If set, enables transcription of the model's audio output. The transcription aligns with the language code specified for the output audio, if configured.</p></td></tr><tr><td><code>proactivity</code></td><td><p><code>ProactivityConfig</code></p><p>Optional. Configures the proactivity of the model.</p><p>This allows the model to respond proactively to the input and to ignore irrelevant input.</p></td></tr><tr><td><code>historyConfig</code></td><td><p><code>HistoryConfig</code></p><p>Optional. Configures the exchange of history between the client and the server.</p></td></tr></tbody></table>

### BidiGenerateContentSetupComplete

This type has no fields.

Sent in response to a `BidiGenerateContentSetup` message from the client.

### BidiGenerateContentToolCall

Request for the client to execute the `functionCalls` and return the responses with the matching `id` s.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>functionCalls[]</code></td><td><p><code>FunctionCall</code></p><p>Output only. The function call to be executed.</p></td></tr></tbody></table>

### BidiGenerateContentToolCallCancellation

Notification for the client that a previously issued `ToolCallMessage` with the specified `id` s should not have been executed and should be cancelled. If there were side-effects to those tool calls, clients may attempt to undo the tool calls. This message occurs only in cases where the clients interrupt server turns.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>ids[]</code></td><td><p><code>string</code></p><p>Output only. The ids of the tool calls to be cancelled.</p></td></tr></tbody></table>

### BidiGenerateContentToolResponse

Client generated response to a `ToolCall` received from the server. Individual `FunctionResponse` objects are matched to the respective `FunctionCall` objects by the `id` field.

Note that in the unary and server-streaming GenerateContent APIs function calling happens by exchanging the `Content` parts, while in the bidi GenerateContent APIs function calling happens over these dedicated set of messages.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>functionResponses[]</code></td><td><p><code>FunctionResponse</code></p><p>Optional. The response to the function calls.</p></td></tr></tbody></table>

### BidiGenerateContentTranscription

Transcription of audio (input or output).

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>text</code></td><td><p><code>string</code></p><p>Transcription text.</p></td></tr></tbody></table>

### ContextWindowCompressionConfig

Enables context window compression — a mechanism for managing the model's context window so that it does not exceed a given length.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td colspan="2">Union field <code>compressionMechanism</code>. The context window compression mechanism used. <code>compressionMechanism</code> can be only one of the following:</td></tr><tr><td><code>slidingWindow</code></td><td><p><code>SlidingWindow</code></p><p>A sliding-window mechanism.</p></td></tr><tr><td><code>triggerTokens</code></td><td><p><code>int64</code></p><p>The number of tokens (before running a turn) required to trigger a context window compression.</p><p>This can be used to balance quality against latency as shorter context windows may result in faster model responses. However, any compression operation will cause a temporary latency increase, so they should not be triggered frequently.</p><p>If not set, the default is 80% of the model's context window limit. This leaves 20% for the next user request/model response.</p></td></tr></tbody></table>

### EndSensitivity

Determines how end of speech is detected.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Enums</th></tr></thead><tbody><tr><td><code>END_SENSITIVITY_UNSPECIFIED</code></td><td>The default is END_SENSITIVITY_HIGH.</td></tr><tr><td><code>END_SENSITIVITY_HIGH</code></td><td>Automatic detection ends speech more often.</td></tr><tr><td><code>END_SENSITIVITY_LOW</code></td><td>Automatic detection ends speech less often.</td></tr></tbody></table>

### GoAway

A notice that the server will soon disconnect.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>timeLeft</code></td><td><p><code>Duration</code></p><p>The remaining time before the connection will be terminated as ABORTED.</p><p>This duration will never be less than a model-specific minimum, which will be specified together with the rate limits for the model.</p></td></tr></tbody></table>

### HistoryConfig

History configuration.

This message is included in the session configuration as `BidiGenerateContentSetup.historyConfig`. Configures the exchange of history messages.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>initialHistoryInClientContent</code></td><td><p><code>bool</code></p><p>Optional. If true, after sending <code>setupComplete</code>, the server will wait and at first process <code>clientContent</code> messages until <code>turnComplete</code> is <code>true</code>. This initial history will not trigger a model call and may end with role <code>MODEL</code>. After <code>turnComplete</code> is <code>true</code>, the client can start the realtime conversation via <code>realtimeInput</code>.</p></td></tr></tbody></table>

### ProactivityConfig

Config for proactivity features.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>proactiveAudio</code></td><td><p><code>bool</code></p><p>Optional. If enabled, the model can reject responding to the last prompt. For example, this allows the model to ignore out of context speech or to stay silent if the user did not make a request, yet.</p></td></tr></tbody></table>

### RealtimeInputConfig

Configures the realtime input behavior in `BidiGenerateContent`.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>automaticActivityDetection</code></td><td><p><code>AutomaticActivityDetection</code></p><p>Optional. If not set, automatic activity detection is enabled by default. If automatic voice detection is disabled, the client must send activity signals.</p></td></tr><tr><td><code>activityHandling</code></td><td><p><code>ActivityHandling</code></p><p>Optional. Defines what effect activity has.</p></td></tr><tr><td><code>turnCoverage</code></td><td><p><code>TurnCoverage</code></p><p>Optional. Defines which input is included in the user's turn.</p></td></tr></tbody></table>

### SessionResumptionConfig

Session resumption configuration.

This message is included in the session configuration as `BidiGenerateContentSetup.sessionResumption`. If configured, the server will send `SessionResumptionUpdate` messages.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>handle</code></td><td><p><code>string</code></p><p>The handle of a previous session. If not present then a new session is created.</p><p>Session handles come from <code>SessionResumptionUpdate.token</code> values in previous connections.</p></td></tr></tbody></table>

### SessionResumptionUpdate

Update of the session resumption state.

Only sent if `BidiGenerateContentSetup.sessionResumption` was set.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>newHandle</code></td><td><p><code>string</code></p><p>New handle that represents a state that can be resumed. Empty if <code>resumable</code> =false.</p></td></tr><tr><td><code>resumable</code></td><td><p><code>bool</code></p><p>True if the current session can be resumed at this point.</p><p>Resumption is not possible at some points in the session. For example, when the model is executing function calls or generating. Resuming the session (using a previous session token) in such a state will result in some data loss. In these cases, <code>newHandle</code> will be empty and <code>resumable</code> will be false.</p></td></tr></tbody></table>

### SlidingWindow

The SlidingWindow method operates by discarding content at the beginning of the context window. The resulting context will always begin at the start of a USER role turn. System instructions and any `BidiGenerateContentSetup.prefixTurns` will always remain at the beginning of the result.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>targetTokens</code></td><td><p><code>int64</code></p><p>The target number of tokens to keep. The default value is trigger_tokens/2.</p><p>Discarding parts of the context window causes a temporary latency increase so this value should be calibrated to avoid frequent compression operations.</p></td></tr></tbody></table>

### StartSensitivity

Determines how start of speech is detected.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Enums</th></tr></thead><tbody><tr><td><code>START_SENSITIVITY_UNSPECIFIED</code></td><td>The default is START_SENSITIVITY_HIGH.</td></tr><tr><td><code>START_SENSITIVITY_HIGH</code></td><td>Automatic detection will detect the start of speech more often.</td></tr><tr><td><code>START_SENSITIVITY_LOW</code></td><td>Automatic detection will detect the start of speech less often.</td></tr></tbody></table>

### TurnCoverage

Options about which input is included in the user's turn.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Enums</th></tr></thead><tbody><tr><td><code>TURN_COVERAGE_UNSPECIFIED</code></td><td>If unspecified, a default behavior is selected based on the model.</td></tr><tr><td><code>TURN_INCLUDES_ONLY_ACTIVITY</code></td><td>Includes activity since the last turn, excluding inactivity (e.g. silence on the audio stream).</td></tr><tr><td><code>TURN_INCLUDES_ALL_INPUT</code></td><td>Includes all realtime input since the last turn, including inactivity (e.g. silence on the audio stream).</td></tr><tr><td><code>TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO</code></td><td>Includes audio activity and all video since the last turn. With automatic activity detection, audio activity means speech and excludes silence.</td></tr></tbody></table>

## Ephemeral authentication tokens

Ephemeral authentication tokens can be obtained by calling `AuthTokenService.CreateToken` and then used with `GenerativeService.BidiGenerateContentConstrained`, either by passing the token in an `access_token` query parameter, or in an HTTP `Authorization` header with " `Token` " prefixed to it.

### CreateAuthTokenRequest

Create an ephemeral authentication token.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>authToken</code></td><td><p><code>AuthToken</code></p><p>Required. The token to create.</p></td></tr></tbody></table>

### AuthToken

A request to create an ephemeral authentication token.

<table><colgroup><col width="25%"> <col></colgroup><thead><tr><th colspan="2">Fields</th></tr></thead><tbody><tr><td><code>name</code></td><td><p><code>string</code></p><p>Output only. Identifier. The token itself.</p></td></tr><tr><td><code>fieldMask</code></td><td><p><code>FieldMask</code></p><p>Optional. Input only. Immutable. If field_mask is empty, and <code>bidiGenerateContentSetup</code> is not present, then the effective <code>BidiGenerateContentSetup</code> message is taken from the Live API connection.</p><p>If field_mask is empty, and <code>bidiGenerateContentSetup</code> <em>is</em> present, then the effective <code>BidiGenerateContentSetup</code> message is taken entirely from <code>bidiGenerateContentSetup</code> in this request. The setup message from the Live API connection is ignored.</p><p>If field_mask is not empty, then the corresponding fields from <code>bidiGenerateContentSetup</code> will overwrite the fields from the setup message in the Live API connection.</p></td></tr><tr><td colspan="2">Union field <code>config</code>. The method-specific configuration for the resulting token. <code>config</code> can be only one of the following:</td></tr><tr><td><code>bidiGenerateContentSetup</code></td><td><p><code>BidiGenerateContentSetup</code></p><p>Optional. Input only. Immutable. Configuration specific to <code>BidiGenerateContent</code>.</p></td></tr><tr><td><code>uses</code></td><td><p><code>int32</code></p><p>Optional. Input only. Immutable. The number of times the token can be used. If this value is zero then no limit is applied. Resuming a Live API session does not count as a use. If unspecified, the default is 1.</p></td></tr></tbody></table>

## More information on common types

For more information on the commonly-used API resource types `Blob`, `Content`, `FunctionCall`, `FunctionResponse`, `GenerationConfig`, `GroundingMetadata`, `ModalityTokenCount`, and `Tool`, see [Generating content](https://ai.google.dev/api/generate-content).