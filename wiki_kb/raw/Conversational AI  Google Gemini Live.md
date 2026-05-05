---
title: "Conversational AI  Google Gemini Live"
source: "https://docs.agora.io/en/conversational-ai/models/mllm/gemini"
author:
published:
created: 2026-05-05
description: "Integrate Google Gemini Live with the Conversational AI Engine using the Gemini Developer API."
tags:
  - "clippings"
---
Google Gemini Live provides multimodal large language model capabilities with real-time audio processing, enabling natural voice conversations without separate ASR/TTS components. This page covers integration using the Gemini Developer API, authenticated with a Gemini API key obtained from Google AI Studio.

> [!-info] -info
> info
> 
> Enabling MLLM automatically disables ASR, LLM, and TTS since the MLLM handles end-to-end voice processing directly.

### Sample configuration

The following example shows a starting `mllm` parameter configuration you can use when you [Start a conversational AI agent](https://docs.agora.io/en/conversational-ai/rest-api/agent/join).

`1  "mllm": {    2    "enable": true,    3    "api_key": "<GOOGLE_GEMINI_API_KEY>",    4    "messages": [    5      {    6        "role": "user",    7        "content": "<HISTORY_CONTENT>"    8      }    9    ],    10    "params": {    11      "model": "gemini-3.1-flash-live-preview",    12      "instructions": "You are a friendly assistant.",    13      "voice": "Charon",    14      "affective_dialog": false,    15      "proactive_audio": false,    16      "transcribe_agent": true,    17      "transcribe_user": true,    18      "http_options": {    19        "api_version": "v1beta"    20      }    21    },    22    "turn_detection": {    23      // see details below    24    },      25    "input_modalities": [    26      "audio"    27    ],    28    "output_modalities": [    29      "audio"    30    ],    31    "greeting_message": "Hi, how can I assist you today?",    32    "failure_message": "Sorry, I encountered an issue. Please try again.",    33    "vendor": "gemini"    34  }     `

### Turn detection

For a full list of `turn_detection` parameters, see [`mllm.turn_detection`](https://docs.agora.io/en/conversational-ai/rest-api/agent/join#properties-mllm-turn-detection). The following examples show the supported configurations for Google Gemini Live. To set up turn detection, add a `turn_detection` block inside the `mllm` object when you [Start a conversational AI agent](https://docs.agora.io/en/conversational-ai/rest-api/agent/join).

- **Server VAD**
	`1  "turn_detection": {    2    "mode": "server_vad",    3    "server_vad_config": {    4      "prefix_padding_ms": 800,    5      "silence_duration_ms": 640,    6      "start_of_speech_sensitivity": "START_SENSITIVITY_HIGH",    7      "end_of_speech_sensitivity": "END_SENSITIVITY_HIGH"    8    }    9  }     `
- **Agora VAD**
	`1  "turn_detection": {    2    "mode": "agora_vad",    3    "agora_vad_config": {    4      "interrupt_duration_ms": 160,    5      "prefix_padding_ms": 800,    6      "silence_duration_ms": 640,    7      "threshold": 0.5    8    }    9  }     `

### Key parameters

**mllm** required
- **[messages](#messages)** array\[object\]nullable
	An array of conversation history items passed to the model as context. Each item represents a single message in the conversation history.
	Show propertiesHide properties
	- **[content](#messages-content)** stringrequired
		The content of the message.

- **[params](#params)** objectrequired
	Configuration object for the Gemini Live model.
	Show propertiesHide properties
	- **[voice](#params-voice)** stringnullable
		The voice identifier for audio output. For example, `Aoede`, `Puck`, `Charon`, `Kore`, `Fenrir`, `Leda`, `Orus`, or `Zephyr`.
	- **[affective\_dialog](#params-affective-dialog)** booleannullable
		Whether to enable affective dialog, which allows the model to adapt its tone based on the user's emotional cues.
	- **[proactive\_audio](#params-proactive-audio)** booleannullable
		When enabled, the model may choose not to respond if the user's input does not require a reply, such as background speech or incomplete requests.

- **[turn\_detection](#turn-detection)** objectnullable
	Turn detection configuration for the MLLM module.
	> [!-info] -info
	> info
	> 
	> When `mllm.turn_detection` is defined, the top-level `turn_detection` object has no effect.
	Show propertiesHide properties
	- **[mode](#turn-detection-mode)** stringnullable
		**Possible values:** `agora_vad`, `server_vad`, `semantic_vad`
		- `agora_vad`: Agora VAD-based detection.
		- `server_vad`: Vendor-side VAD-based detection.
		- `semantic_vad`: Semantic-based detection.
	- **[agora\_vad\_config](#turn-detection-agora-vad-config)** objectnullable
		Configuration for Agora VAD-based turn detection. Applicable when `mode` is `agora_vad`.
		Show propertiesHide properties
		- **[interrupt\_duration\_ms](#turn-detection-agora-vad-config-interrupt-duration-ms)** integernullable
			Minimum duration of speech in milliseconds required to trigger an interruption.
		- **[prefix\_padding\_ms](#turn-detection-agora-vad-config-prefix-padding-ms)** integernullable
			Duration of audio in milliseconds to include before the detected speech start.
		- **[silence\_duration\_ms](#turn-detection-agora-vad-config-silence-duration-ms)** integernullable
			Duration of silence in milliseconds required to determine end of speech.
	- **[server\_vad\_config](#turn-detection-server-vad-config)** objectnullable
		Configuration for vendor-side VAD-based turn detection. Applicable when `mode` is `server_vad`. Parameters are passed through to the vendor.
		Show propertiesHide properties
		- **[prefix\_padding\_ms](#turn-detection-server-vad-config-prefix-padding-ms)** integernullable
			Duration of audio in milliseconds to include before the detected speech start.
		- **[silence\_duration\_ms](#turn-detection-server-vad-config-silence-duration-ms)** integernullable
			Duration of silence in milliseconds required to determine end of speech.

- **[greeting\_message](#greeting-message)** stringnullable
	The message the agent speaks when a user joins the channel.

- **[vendor](#vendor)** stringrequired
	The MLLM provider identifier. Set to `"gemini"` to use Google Gemini Live with the Gemini Developer API.

For comprehensive API reference, real-time capabilities, and detailed parameter descriptions, see the [Google Gemini Live API](https://ai.google.dev/api/live).