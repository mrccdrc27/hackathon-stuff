---
name: wiki-organizer
description: Implement and maintain a Karpathy-style LLM wiki knowledge base (Antigravity pattern). Use for initialization, ingestion, syncing, or linting of a persistent, human-readable knowledge base within a repository.
---

# Wiki Organizer

An implementation of the Karpathy LLM Wiki pattern for the **Antigravity** environment. It transforms raw project data into a stateful, interlinked Markdown knowledge base that serves as the "Project Knowledge Graph" for the ETL pipeline.

## Core Structure

The wiki default home is `./wiki_kb` (or custom path):

- `raw/`: Immutable source files (meeting transcripts, repo snapshots, external docs).
- `wiki/`:
    - `sources/`: Individual summaries of files in `raw/`.
    - `concepts/`: Synthesis of architectural themes and project logic.
    - `entities/`: Pages for specific tools, modules, or stakeholders.
    - `index.md`: Master catalog and navigation hub.
    - `log.md`: Append-only history of librarian operations.
    - `SCHEMA.md`: The "Librarian's Handbook" governing the wiki.

## Core Workflows

### 1. Initialization
Scaffold the directory structure and foundational files.
- **Action:** Run `node scripts/wiki_init.cjs <path>`
- **Scenario:** Starting a new project or adding a wiki to an existing one.

### 2. Ingestion
Process a new artifact (e.g., a meeting transcript or a new technical doc).
1. Place file in `raw/`.
2. Generate summary in `wiki/sources/`.
3. Update `wiki/index.md` with new entries.
4. Update `wiki/log.md`.
5. **Cross-Reference:** Check `wiki/concepts/` and `wiki/entities/` for existing overlap and update pages to link the new source.

### 3. Codebase Sync
Reflect repository changes in the wiki.
- **Process:** Scan recent commits/diffs. Identify if architectural decisions (Concepts) or module definitions (Entities) have drifted from the documentation.
- **Update:** Apply atomic edits to the affected pages.

### 4. Health Check (Lint)
Maintain graph integrity.
- **Action:** Check for broken `[[wikilinks]]` or orphan pages.
- **Command:** `node scripts/wiki_lint.cjs <path>`

## Guidelines for the Antigravity Librarian

- **Terse & Technical:** Focus on "Why" and "How" rather than "What". 
- **Traceability:** Every claim MUST link to a source in `raw/` using `[[source_page_name]]`.
- **Atomic Persistence:** The wiki is the memory. If it's not in the wiki, the agent "forgets" it across sessions.
- **Obsidian Support:** Keep files compatible with Obsidian's graph view (standard Wikilinks, frontmatter metadata).

## Resources

- **references/wiki_schema.md**: Comprehensive schema and page templates.
- **scripts/wiki_init.cjs**: Initialization utility.
- **scripts/wiki_lint.cjs**: Integrity checking utility.
