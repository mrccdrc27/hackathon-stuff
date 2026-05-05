# Agent Architecture

The distribution of intelligence across specialized agents instead of a single monolithic orchestrator.

## Components
- **Management Agent (Gemini Live):** Handles team interaction, blockers, and project deliverables. Scoped to meetings and high-level milestones. Leverages low-latency multimodal capabilities for "real-time orchestration."
- **Senior Dev Agent (Codebase Specialist):** Utilizes robust agentic capabilities for deep codebase analysis, edge-case detection, and architectural queries.
- **Project Manager (PM) Agent:** Evaluates business value, impact, and budget fit.
- **Scrum Agent:** Converts insights into structured tasks, generates, and ranks tasks.

## Streaming Integration
- **ADK (Agent Development Kit):** Framework for building multi-agent systems with Live API integration.
- **Pipecat/LiveKit:** Third-party plugins for production-ready voice and vision agents with WebRTC/telephony support.

## Sources
- [[sources/architecture.md]]
- [[sources/feasibility_analysis.md]]
- [[sources/paul_notes_on_hackathon.md]]
- [[sources/agent_etl_spec.md]]
- [[sources/agent_development_kit_adk.md]]
- [[sources/gemini_live_api_plugin.md]]
- [[sources/building_with_gemini_live.md]]
