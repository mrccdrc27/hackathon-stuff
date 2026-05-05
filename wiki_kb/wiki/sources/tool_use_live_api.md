# Tool Use with Live API
**Source:** [[raw/Tool use with Live API    Gemini API    Google AI for Developers.md]]
**Ingested:** 2026-05-05

## Summary
A guide on integrating external capabilities into the Live API via Function Calling and Google Search grounding.

## Key Takeaways
- **Supported Tools:** Gemini 3.1 supports Search and Synchronous Function Calling. Gemini 2.5 also supports Asynchronous Function Calling.
- **Function Calling:** Define `function_declarations` in config; respond with `FunctionResponse` matching the model's `fc.id`.
- **Async Mode (2.5 only):** Use `behavior: NON_BLOCKING` in declaration and specify `scheduling` (`INTERRUPT`, `WHEN_IDLE`, `SILENT`) in the response to manage model behavior during/after execution.
- **Search:** Grounding with Google Search improves accuracy and reduces hallucinations.
- **Chaining:** The model can generate multiple tool calls and chain outputs within a single prompt.

## Related
- [[entities/gemini_multimodal_live_api.md]]
- [[concepts/agent_architecture.md]]
