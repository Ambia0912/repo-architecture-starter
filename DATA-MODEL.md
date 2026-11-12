# Data Model & Schema Dictionary

> Single source of truth for database tables, columns, RLS policies, and migration scripts.

## Active Tables

| Table | Primary Key | Description | RLS Policy |
|---|---|---|---|
| `users` | `id` | User accounts | `auth.uid() = id` |

## Migration Scripts
| Script | Status | Purpose |
|---|---|---|
| `schema/001-init.sql` | ✅ Active | Initial table definitions |
