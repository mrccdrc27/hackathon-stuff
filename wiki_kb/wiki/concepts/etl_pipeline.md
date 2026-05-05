# ETL Pipeline

A continuous Extract, Transform, Load pipeline used to maintain and update the [[Project Knowledge Graph]].

## Stages
- **Extraction:** Data from version control (commits, diffs), communication (transcripts), and planning (calendars).
- **Transformation:** Correlates code changes to meetings, validates compliance, and tracks velocity.
- **Loading:** Pushes updates to repositories, project boards, and facilitates voice integrations.

## Sources
- [[sources/architecture.md]]
- [[sources/agent_etl_spec.md]]