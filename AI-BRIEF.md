# AI-BRIEF —— Zero-Context AI Orientation

> **Read this file first before touching any code (~5 minutes).**
> Authority order: **Code > CODE-MAP.md > AI-BRIEF.md > README.md > planning/**
> If any document disagrees with the code, update the document immediately in the same commit.

---

## 1. Project Overview
- **Name**: StarterTemplate
- **Purpose**: [1-sentence explanation of what this project does and who it is for]
- **Core Stack**: Native ES Modules, Zero Build Step / Clean Architecture
- **Data Boundary**: [e.g. Supabase RLS / PostgreSQL / Local Storage]

## 2. Iron Rules
1. **Single Writer**: Critical state has exactly one write path. Other views are strictly read-only.
2. **Document Sync**: Code changes and document updates must occur in the exact same commit.
3. **Restrained Entry Point**: `src/main.js` performs only 5 jobs (boot, auth lifecycle, routing, global listeners, action dispatcher).
4. **No Feature Bleed**: Any feature separated into its own module stays in that module (D01).

## 3. Screen & Feature Index
| Route / Name | Feature | Description |
|---|---|---|
| #dashboard | Dashboard | Main overview screen |

## 4. Forbidden Resurrection List (What NOT to do)
| Prohibited Pattern / Dead Feature | Why It Was Rejected | Decision ID |
|---|---|---|
| [Example: Secondary inline edit form] | [Dual writers cause state drift] | D02 |

## 5. Verification
- Run tests: `node --test tests/*.test.mjs`
