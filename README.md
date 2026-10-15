# MERN Task Manager (single folder, Vercel-ready)

Frontend (React + Vite) and backend (Express + MongoDB Atlas) live in ONE project,
so it deploys to Vercel as a single app.

```
api/index.js     -> Vercel serverless entry (wraps Express)
server/          -> Express app, routes, Mongo model
src/             -> React frontend
```

## Run locally
1. `cp .env.example .env` and paste your Atlas `MONGO_URI`
2. `npm install`
3. `npm run dev`  -> open http://localhost:5173 (API on :5000, proxied automatically)

## Deploy to Vercel
1. Push this folder to GitHub (the folder root = repo root).
2. Vercel > Add New Project > import the repo. Framework: **Vite** (auto-detected).
3. Add Environment Variable: `MONGO_URI` = your Atlas connection string.
4. Deploy.
5. In Atlas > Network Access, allow `0.0.0.0/0` (Vercel uses dynamic IPs).

Frontend calls `/api/tasks` on the same domain, so no CORS or API URL setup is needed.
