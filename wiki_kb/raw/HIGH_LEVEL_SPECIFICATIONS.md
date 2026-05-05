# UI High-Level Specifications: Project Orchestration Portal

Map visual interface to Engineering Orchestration and Project Oversight Framework. Focus on data-driven oversight, HITL workflows, and asynchronous monitoring.

## 1. Executive Dashboard (The "Command Center")
Unified view of project state across VC, PM, and Comms.
- **Project Knowledge Graph Visualizer:** Interactive node-link diagram showing correlation between Tasks (Jira), Technical Changes (GitHub), and Meeting Decisions.
- **Risk Heatmap:** Visual indicators for Integration (logical conflicts), Architectural (pattern drift), Delivery (velocity slippage), and Dependency risks.
- **Daily Briefing Feed:** Scrollable summary of cross-platform activity synthesized by Gemini.
- **Velocity vs. Milestone Gauge:** Real-time projection of "Definition of Done" achievement rate against upcoming logistical deadlines.

## 2. Repository & Version Control Module (Functional Scope A)
Visual interface for logical conflict management.
- **Logical Conflict Inspector:** Side-by-side metadata view of conflicting PRs (API contract shifts vs. logic updates).
- **Remediation Queue:** List of proposed `remediation/*` branches with "Review and Merge" actions.
- **Expertise/Contribution Map:** Heatmap of code ownership and developer bandwidth within specific modules.

## 3. Project Management & Scheduling Module (Functional Scope B)
CRUD lifecycle for metadata and resource planning.
- **Backlog Intelligence Board:** Kanban/List view enriched with Gemini suggestions (e.g., "Ready for Review" badges based on PR status).
- **Bandwidth/Capacity Planner:** Integrated view of Google Calendar availability vs. Backlog depth. Highlight bottlenecks.
- **Assignee Recommendation Engine:** UI cards suggesting task owners based on technical fit, historical activity, and current load.

## 4. Communication & Meeting Interface (Functional Scope C)
Real-time support for Gemini Multimodal Live API.
- **Live Meeting Moderator Panel:**
    - **Agenda Timer:** Visual countdown for time-boxed items.
    - **Topic Relevance Meter:** Indicator showing alignment with critical path vs. "UI polish/bikeshedding."
    - **Action Item Capture:** Real-time transcription-to-task drafting area.
- **Consensus Polling:** Interface for asynchronous story-pointing and milestone voting.

## 5. QA & Standards Module (Functional Scope D)
Documentation and debt monitoring.
- **Automated Test Plan Viewer:** Generated verification steps for active PRs/feature branches.
- **Technical Debt Radar:** Dashboard flagging deviations from established design patterns.
- **Repository Health Audit:** Sprint-end summary of stale branches, redundant docs, and AI-artifact density.

## 6. ETL Pipeline Monitor (Technical Implementation)
Transparency for the Extract, Transform, Load process.
- **Pipeline Flow Visualization:** Status of Version Control, Communication, and Planning ingestion.
- **Transformation Logs:** Searchable history of how meeting transcripts became tasks or how commits updated the graph.
- **Sync Status:** Last ingestion timestamps for GitHub, Slack/Discord, and Calendar.

## Design Constraints
- **HITL Verification:** Every AI-proposed change (task update, remediation branch, test plan) must have a "Lead Approval" button.
- **Asynchronous Priority:** UI reflects metadata and delta-changes; no heavy local compilation or indexing status needed.
- **Visual Style:** Modern, high-density, "Dark Mode" primary for engineering focus. Use CSS gradients and interactive feedback for risk states.
