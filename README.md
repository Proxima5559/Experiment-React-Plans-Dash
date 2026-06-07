# Plan Dashboard — React SPA Demo

A standalone React demo of the Plan Dashboard component, using an **in-memory mock database** instead of the real Express + Prisma backend.

## Included mock data
- 3 budgets: Paris Trip 2025, Tokyo Summer, Road Trip USA
- 4 seeded plans with realistic tasks and tags

## How to run

### Prerequisites
- Node.js 16+ installed

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

The app opens at **http://localhost:3000** automatically.

## Project structure

```
src/
├── mockDb.js                  ← In-memory DB + mock API (replaces Express backend)
├── services/api.js            ← Re-exports mockDb (swap for real API calls here)
├── App.jsx                    ← Router: /plans and /plan/:slug
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Spinner.jsx
│   │   └── Pagination.jsx
│   └── PlanDashboard/
│       ├── PlanDashboard.jsx  ← Top-level dashboard page
│       ├── PlanSection.jsx
│       ├── PlanList.jsx
│       ├── PlanCard.jsx
│       ├── PlanEditor.jsx     ← Checklist / task editor page
│       ├── TaskList.jsx
│       ├── TaskItem.jsx
│       ├── TagsSection.jsx
│       ├── CreatePlanForm.jsx
│       └── BudgetFilter.jsx
└── styles/plans.css
```

## Connecting to the real backend

To switch from mock to real API, edit `src/services/api.js`:

```js
// Replace the mock export with real fetch calls:
const API_BASE = 'http://localhost:5000/api';
const api = { ... }; // your original api.js implementation
export default api;
```

The backend also requires a JWT token in `Authorization: Bearer <token>` headers — add that to `api.js` once auth is wired up.
