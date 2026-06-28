# Plan Dashboard
 
A full-stack travel planning app. Create daily schedules, manage checklists of mandatory and optional tasks, filter by budget, and tag each day.
 
**Stack:** React 18 · React Router v6 · Express 5 · Mongoose · MongoDB
 
---
 
## Project structure
 
```
/
├── backend/
│   ├── app.js                  ← Express entry point (port 5000)
│   ├── config/db.js            ← Mongoose connection
│   ├── models/
│   │   ├── Budget.js
│   │   └── Plan.js             ← Plan + embedded Item subdocuments
│   ├── controllers/
│   │   ├── budgetController.js
│   │   └── planController.js
│   ├── routes/
│   │   ├── budgetRoutes.js
│   │   └── planRoutes.js
│   └── seed.js                 ← Seeds 3 budgets + 4 plans
│
└── frontend/
    └── src/
        ├── App.jsx             ← Router: /plans and /plan/:slug
        ├── services/api.js     ← All fetch calls to the backend
        ├── components/
        │   ├── common/
        │   │   ├── Button.jsx
        │   │   ├── Spinner.jsx
        │   │   └── Pagination.jsx
        │   └── PlanDashboard/
        │       ├── PlanDashboard.jsx   ← Top-level dashboard page
        │       ├── PlanSection.jsx
        │       ├── PlanList.jsx
        │       ├── PlanCard.jsx
        │       ├── PlanEditor.jsx      ← Checklist / task editor page
        │       ├── TaskList.jsx
        │       ├── TaskItem.jsx
        │       ├── TagsSection.jsx
        │       ├── CreatePlanForm.jsx
        │       └── BudgetFilter.jsx
        └── styles/plans.css
```
 
---
 
## Prerequisites
 
- Node.js 16+
- A running MongoDB instance (local or Atlas)
---
 
## Setup
 
### 1. Backend
 
```bash
cd backend
npm install
```
 
Create a `.env` file:
 
```
MONGO_URI=mongodb://localhost:27017/plan-dashboard
PORT=5000
```
 
Seed the database (optional — loads 3 budgets and 4 sample plans):
 
```bash
npm run seed
```
 
Start the server:
 
```bash
npm run dev
```
 
The API runs at `http://localhost:5000`.
 
### 2. Frontend
 
```bash
cd frontend
npm install
npm start
```
 
The app opens at `http://localhost:3000`.
 
---
 
## API reference
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/budgets` | List all budgets |
| `POST` | `/api/budgets` | Create a budget |
| `GET` | `/api/plans` | List plans (supports `?page=&budgetId=`) |
| `POST` | `/api/plans` | Create a plan |
| `GET` | `/api/plans/:slug` | Get a single plan with its items |
| `DELETE` | `/api/plans/:slug` | Delete a plan |
| `POST` | `/api/plans/:slug/items` | Add an item to a plan |
| `PUT` | `/api/plans/items/:itemId/toggle` | Toggle item completion |
| `DELETE` | `/api/plans/items/:itemId` | Delete an item |
| `POST` | `/api/plans/:slug/tags` | Add a tag to a plan |
| `DELETE` | `/api/plans/:slug/tags` | Clear all tags from a plan |
 
---
 
## Seed data
 
Running `npm run seed` in the backend clears the database and inserts:
 
- **Budgets:** Paris Trip 2025, Tokyo Summer, Road Trip USA
- **Plans:** 4 days across the three budgets, each with 3–4 tasks and tags (e.g. Sightseeing, Food, Hiking)
 
