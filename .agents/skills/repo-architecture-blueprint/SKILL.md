---
name: repo-architecture-blueprint
description: >-
  Scaffold, structure, and maintain repositories using the AmbiaOS architectural standard.
  Use this skill whenever creating a new repository, auditing an existing project's structure,
  or setting up AI-friendly documentation (AI-BRIEF, CODE-MAP, DATA-MODEL), automated doc/entry
  guards, single-writer state flow, and breakpoint planning.
---

# Repository Architecture & Maintainability Blueprint

A comprehensive runbook and scaffolding framework for building long-lived, solo-maintainable, and AI-resilient software repositories.

This blueprint is distilled from **AmbiaOS**, a production personal operating system proven across hundreds of commits and dozens of AI sessions without context rot or regression.

---

## 1. Core Principles (The 5 Pillars)

1. **Context is the Enemy, Not Complexity**:
   Never assume future developers or future AI sessions remember past chat history. Store all decisions, invariants, and constraints directly in version-controlled markdown files within the repo.
2. **Authority Hierarchy**:
   $$\text{Code} > \text{CODE-MAP.md} > \text{AI-BRIEF.md} > \text{README.md} > \text{planning/}$$
   When documentation contradicts code, the document is lying. Fix the document immediately in the **same Git commit**.
3. **The 4+1 Documentation Architecture**:
   - `AI-BRIEF.md`: 15-minute quickstart for zero-context AI (rules, boot sequence, screen list, forbidden resurrection list).
   - `CODE-MAP.md`: Action intent to file/function anchors (deliberately no line numbers).
   - `DATA-MODEL.md`: Database tables, columns, RLS policies, migration statuses.
   - `README.md`: Human operator onboarding, deployment guide, document sync rules.
   - `planning/`: Append-only task execution and breakpoint resume log.
4. **Automated Guards (Tombstones, Not Slogans)**:
   Rules that live only in markdown will eventually decay. Turn architectural boundaries into automated tests that fail when breached:
   - `docs.test.mjs`: Verifies every new file/table/route is documented.
   - `main-entry-guard.test.mjs`: Enforces entry-point line budgets and freezes top-level declarations.
5. **Single Writer Principle**:
   Critical state or domain data must have exactly **one write path** (e.g., Recorder $\to$ Service $\to$ DB). All other UI components are read-only.

---

## 2. Standard Directory Layout

```text
<repository-root>/
├── AI-BRIEF.md                     # Zero-context AI orientation & iron rules
├── CODE-MAP.md                     # Task-to-function lookup & invariants
├── DATA-MODEL.md                   # Schema dictionary & migration tracker
├── README.md                       # Human guide, deployment, and doc sync
├── TROUBLESHOOTING.md              # Incident post-mortems (symptom -> root cause -> fix)
├── RETROSPECTIVE.md                # Lessons learned and architectural evolution
├── .gitignore                      # Git ignore file
├── planning/
│   ├── README.md                   # Planning rules & legend
│   ├── _TEMPLATE.md                # Template for new planning docs
│   ├── [done] YYYY-MM-DD-*.md      # Completed tasks (archived, read-only)
│   └── YYYY-MM-DD-NN-active.md     # Active task with breakpoint status block
├── src/ (or public/)
│   ├── main.js                     # 5 responsibilities only (startup, auth, routes, events, dispatch)
│   ├── app-context.js              # Strict whitelist context factory
│   ├── state.js                    # Reducer & route whitelist
│   ├── features/                   # Domain features (view, service, math, charts)
│   ├── components/                 # Reusable UI components
│   └── shared/                     # Pure utilities (no DOM, no network)
└── tests/
    ├── docs.test.mjs               # Document existence & completeness guard
    └── main-entry-guard.test.mjs   # Entry point line budget & declarations guard
```

---

## 3. Step-by-Step Scaffolding Workflow

When asked to initialize or restructure a repository:

### Step 1: Initialize Git and Scaffold Directories
Run the scaffolding script or create the structure:
```powershell
mkdir planning, tests, src, src\features, src\components, src\shared
git init
```

### Step 2: Establish the Four Truth Documents
1. **Create `AI-BRIEF.md`**:
   - Write a 1-sentence product definition.
   - List 4–6 unbreakable iron rules.
   - Define the boot sequence.
   - Define the **Forbidden Resurrection List (禁止复活清单)**.
2. **Create `CODE-MAP.md`**:
   - Create a table: "Where to make a change" (User Goal $\to$ Target File $\to$ Function Name).
   - Describe each file's exact job and exported API.
   - List architectural invariants.
3. **Create `DATA-MODEL.md`**:
   - List active tables, dead/deprecated tables, columns, and permissions.
   - Track migration files and state (✅ Required / ⭐ Optional / 📄 Snapshot).
4. **Create `README.md`**:
   - Put reading order at the very top: `AI-BRIEF` $\to$ `CODE-MAP` $\to$ `DATA-MODEL`.
   - Provide local run, build, and deploy commands.
   - State the commit-level document synchronization rule.

### Step 3: Implement Breakpoint Planning
In `planning/`:
1. Copy `_TEMPLATE.md`.
2. Name the active task: `YYYY-MM-DD-01-<slug>.md`.
3. Fill in the top status block:
   ```markdown
   > **Status**: 🟡 In Progress
   > **Last Updated**: YYYY-MM-DD
   > **Progress**: X / Y phases completed
   > **▶ Next Step**: [EXACTLY ONE concrete, actionable step]
   > **Blocked on**: None
   ```
4. When finished, rename using:
   ```bash
   git mv planning/YYYY-MM-DD-01-slug.md "planning/[done] YYYY-MM-DD-01-slug.md"
   ```

### Step 4: Install the Automated Guards
Create `tests/docs.test.mjs`:
- Assert every file in `src/` exists in `CODE-MAP.md`.
- Assert every route in `state.js` exists in `AI-BRIEF.md`.
- Assert every migration in `schema/` exists in `DATA-MODEL.md`.

Create `tests/main-entry-guard.test.mjs`:
- Freeze the array of top-level functions and variables in `main.js`.
- Cap `main.js` with a hard line budget (e.g. 500–1000 lines).
- Assert that no feature-specific rendering strings live in `main.js`.

---

## 4. Operational Checklists

### 60-Second Pre-Commit Self-Check
Before committing code changes:
- [ ] Did I alter any business behavior or route? $\to$ Update `AI-BRIEF.md`.
- [ ] Did I add, rename, or delete a function or file? $\to$ Update `CODE-MAP.md`.
- [ ] Did I touch database tables, columns, or SQL files? $\to$ Update `DATA-MODEL.md`.
- [ ] Does `npm test` (or `node --test tests/*.test.mjs`) pass with 0 errors?
- [ ] Is the active `planning/` status block updated (`▶ Next Step` is accurate)?
- [ ] Did I avoid hardcoding volatile numbers (line counts, file counts) in documentation?
