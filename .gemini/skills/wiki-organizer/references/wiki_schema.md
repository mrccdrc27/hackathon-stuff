# Wiki Schema & Librarian's Handbook

## Principles
1. **Immutable Ground Truth**: `raw/` is never modified.
2. **Compound Knowledge**: Every ingest must link to existing pages.
3. **High Signal**: No boilerplate; focus on architectural "whys" and core logic.
4. **Antigravity Integration**: The wiki serves as the persistent state for the Engineering Orchestration ETL pipeline.

## Structure
- `/raw`: Original documents, meeting transcripts, and repository snapshots.
- `/wiki/sources`: Distillations of individual raw files.
- `/wiki/concepts`: High-level architectural or thematic synthesis.
- `/wiki/entities`: Definitions of tools, people, and specific modules.
- `/wiki/index.md`: Master catalog.
- `/wiki/log.md`: Operational history.

## Page Templates

### Source Page (`wiki/sources/*.md`)
```markdown
# [Title]
**Source:** [[raw/filename]]
**Ingested:** [Date]

## Summary
[High-level distillation]

## Key Takeaways
- [Point 1]
- [Point 2]

## Related
- [[Concept Name]]
- [[Entity Name]]
```

### Concept Page (`wiki/concepts/*.md`)
```markdown
# [Concept Name]

## Definition
[Synthesis of the concept]

## Supporting Evidence
- [[Source A]]: [Reference]
- [[Source B]]: [Reference]

## Related Entities
- [[Entity X]]
```

## Logging
Every modification must be recorded in `log.md` with a timestamp and a brief "why".
Example: `2026-05-05: Sync: Updated [[Architecture]] concept based on PR #12 diff.`
