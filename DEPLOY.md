# Deployment Guide

Deploy the frontend to Vercel and the backend to Render. Both have free tiers.

---

## Part 1 — Push to GitHub

### Option A: Using GitHub website (no CLI needed)

1. Go to https://github.com/new
2. Repo name: `sneaker-store` (or whatever you prefer)
3. Keep it **Public** (so Fiverr clients can view the code)
4. **Do NOT** check "Add README" / "Add .gitignore" / "Add license" — we already have those
5. Click **Create repository**
6. Copy the HTTPS URL (e.g. `https://github.com/vivek219/sneaker-store.git`)
7. Back in your terminal:

```powershell
cd C:\Users\abhis\fiverr-portfolio\sneaker-store
git add .
git commit -m "Initial commit: full-stack e-commerce starter"
git remote add origin https://github.com/<your-username>/sneaker-store.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub CLI (if you install `gh`)

```powershell
gh auth login
gh repo create sneaker-store --public --source=. --remote=origin --push
```

---

## Part 2 — Deploy Backend to Render

Render is free for small services (sleeps after 15 min idle — fine for a demo).

### 2.1 — Create Render account

1. Go to https://render.com
2. Sign up with GitHub (easiest — gives Render access to your repo)

### 2.2 — Create a PostgreSQL database (free)

1. Dashboard → **New +** → **PostgreSQL**
2. Name: `sneaker-store-db`
3. Region: pick closest to you (e.g. Singapore for India)
4. Plan: **Free**
5. Click **Create Database**
6. Wait ~1 min, then copy the **Internal Database URL** (starts with `postgres://...`)

### 2.3 — Create the web service

1. Dashboard → **New +** → **Web Service**
2. Connect your GitHub repo → select `sneaker-store`
3. Fill in:
   - **Name:** `sneaker-store-api`
   - **Region:** same as DB
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate && python seed.py`
   - **Start Command:** `gunicorn core.wsgi:application`
   - **Plan:** Free

4. Scroll to **Environment Variables** → add:
   ```
   SECRET_KEY=<generate a random 50-char string>
   DEBUG=False
   ALLOWED_HOSTS=.onrender.com
   DATABASE_URL=<paste Internal Database URL from step 2.2>
   FRONTEND_URL=https://sneaker-store.vercel.app   (will update after Vercel deploy)
   STRIPE_SECRET_KEY=sk_test_...                   (optional — demo mode works without it)
   ```

5. Click **Create Web Service**
6. Wait ~5 min for first build. You'll get a URL like `https://sneaker-store-api.onrender.com`

### 2.4 — Verify backend

Open `https://sneaker-store-api.onrender.com/api/products/` — should return JSON.

---

## Part 3 — Deploy Frontend to Vercel

Vercel is free, instant, and perfect for Next.js.

### 3.1 — Deploy

1. Go to https://vercel.com → Sign up with GitHub
2. **Add New...** → **Project**
3. Import your `sneaker-store` repo
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend` (click Edit, select `frontend`)
   - **Build Command:** (leave default)
   - **Output Directory:** (leave default)
5. **Environment Variables** → add:
   ```
   NEXT_PUBLIC_API_URL=https://sneaker-store-api.onrender.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...   (optional)
   ```
6. Click **Deploy**
7. Wait ~2 min. You'll get a URL like `https://sneaker-store.vercel.app`

### 3.2 — Update backend CORS

Go back to Render → your web service → Environment → update:
```
FRONTEND_URL=https://sneaker-store.vercel.app
```
Click **Save** — Render will auto-redeploy.

---

## Part 4 — Share your portfolio

Once both are live, add to your Fiverr portfolio entry:

- **Live demo:** `https://sneaker-store.vercel.app`
- **Source code:** `https://github.com/<username>/sneaker-store`

---

## Common issues

### "Render build fails on Pillow"
Change `requirements.txt`: `Pillow==9.5.0` → `Pillow==10.0.1` (Render uses Python 3.11+).

### "Vercel build fails: cannot find module"
Make sure Root Directory is set to `frontend`, not the repo root.

### "CORS error in browser"
Confirm `FRONTEND_URL` on Render matches your Vercel URL exactly (no trailing slash).

### "Images not loading"
Check `next.config.mjs` — Unsplash should already be in `images.remotePatterns`.

### "Backend sleeps / cold start"
Free Render instances sleep after 15 min inactivity. First request takes ~30s to wake. For a Fiverr demo, add a note on the landing page: *"First load may take ~30 seconds (free-tier backend wake-up)."* Or upgrade to $7/mo for always-on.
