# Planning & Task Execution Rules

This directory holds all tasks, audits, and architectural decision records.

## Rules
1. **One Task = One File**: Do not accumulate tasks into a massive monolithic file.
2. **File Naming**: `YYYY-MM-DD-NN-slug.md` (start date, 2-digit index, hyphenated slug).
3. **Archive with `[done] `**: When complete, rename using `git mv` with a `[done] ` prefix.
4. **Breakpoint Resume**: Top status block must accurately state the **single next step**.
