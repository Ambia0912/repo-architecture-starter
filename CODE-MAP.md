# Code Map

> Read this before editing files. It maps business intent to files and function anchors.
> **Deliberately no line numbers**: line numbers rot within a week. Search by function name.

## Where to Make a Change

| I want to change... | Open file | Look for function / export |
|---|---|---|
| Startup and global listeners | `src/main.js` | `renderApp`, `actionOwners` |
| Context keys passed between features | `src/app-context.js` | `createAppContext` |
| Route definitions and app state | `src/state.js` | `screens`, `appReducer` |
| Dashboard view and rendering | `src/features/dashboard/dashboard-view.js` | `createDashboardFeature` |

## File Directory & Responsibilities

| File | Job | Exports |
|---|---|---|
| `src/main.js` | Entry point: lifecycle, router, global dispatcher | None |
| `src/app-context.js` | Whitelisted context passed to features | `createAppContext` |
| `src/state.js` | State reducer & valid screen set | `appReducer`, `screens` |
| `src/features/dashboard/dashboard-view.js` | Dashboard screen layout and actions | `createDashboardFeature` |
| `src/shared/format.js` | Pure formatting helpers (no DOM, no network) | `formatDate` |
