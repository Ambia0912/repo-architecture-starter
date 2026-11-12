# Architectural Retrospective & Evolution

> Snapshot of decisions, trade-offs, and lessons learned.
> Explains **why** the system is structured this way.

## Core Lessons
1. **Context rot is the primary enemy**: Document invariants, not temporary intentions.
2. **Automated guards are tombstones**: Every incident creates a guard test.
3. **Budgets keep entries small**: Limit entry file size with an automated test.
