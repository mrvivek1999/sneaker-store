# SOLE — Premium Sneaker Store

A production-grade e-commerce starter kit. Next.js 14 storefront, Django REST API, Stripe checkout, Tailwind design system, Zustand cart. Built as a modern full-stack reference project.

<p align="center">
  <img alt="Next.js"       src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white" />
  <img alt="TypeScript"    src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="TailwindCSS"   src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white" />
  <img alt="Django"        src="https://img.shields.io/badge/Django-4.2-092E20?logo=django&logoColor=white" />
  <img alt="DRF"           src="https://img.shields.io/badge/DRF-3.14-A30000?logo=django" />
  <img alt="Stripe"        src="https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe&logoColor=white" />
</p>

---

## Live demo

- Storefront: _add your Vercel URL here_
- API: _add your Render/Railway URL here_

## Screenshots

> Drop screenshots into `/screenshots/` and reference them here:
>
> ![Hero](./screenshots/hero.png)
> ![Product grid](./screenshots/grid.png)
> ![Product detail](./screenshots/pdp.png)
> ![Checkout](./screenshots/checkout.png)

---

## Stack

**Frontend**
- Next.js 14 (App Router, Server Components)
- TypeScript, Tailwind CSS
- Zustand for cart state (localStorage persisted)
- lucide-react icon set
- `next/font` with Inter + Space Grotesk

**Backend**
- Django 4.2 LTS + Django REST Framework
- SQLite in dev, Postgres in production (dj-database-url)
- Stripe Checkout Sessions + webhook
- WhiteNoise for static files, Gunicorn for prod

---

## Features

- Fully responsive, mobile-first storefront
- Hero section with floating product, trust strip, and marquee
- Product listing with category filters and search
- Product detail page: gallery, size + color selectors, qty, accordion specs
- Sliding cart drawer with quantity controls, persisted in localStorage
- Guest checkout backed by Stripe Checkout Sessions
- Webhook endpoint marks orders as paid
- Django admin configured for product + order management
- 20 seeded sneakers across 4 categories, real Unsplash imagery
- Clean typography, custom design tokens, polished micro-interactions

---

## Quick start

### Backend (Django)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env     # then edit SECRET_KEY and Stripe keys
python manage.py migrate
python seed.py             # loads 20 products
python manage.py createsuperuser
python manage.py runserver
```

API will be live at `http://localhost:8000` and admin at `/admin`.

### Frontend (Next.js)

In another terminal:

```powershell
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Storefront runs at `http://localhost:3000`.

---

## Environment variables

**backend/.env**
| Key | Purpose |
|---|---|
| `SECRET_KEY` | Django secret |
| `DEBUG` | `True` locally, `False` in prod |
| `ALLOWED_HOSTS` | Comma-separated list |
| `DATABASE_URL` | Optional. Falls back to SQLite. |
| `FRONTEND_URL` | Used for CORS + Stripe redirects |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |

**frontend/.env.local**
| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For optional client-side Stripe use |

---

## Deployment

### Frontend — Vercel

1. Push the repo to GitHub.
2. Import in [vercel.com](https://vercel.com), set root directory to `frontend/`.
3. Add env vars: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
4. Deploy. Vercel auto-detects Next.js 14.

### Backend — Render / Railway

1. New Web Service pointing at the `backend/` folder.
2. Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
3. Start command: `gunicorn core.wsgi:application`
4. Env vars: all keys from `backend/.env.example`, set `DEBUG=False`, add your Vercel URL to `FRONTEND_URL` and `ALLOWED_HOSTS`.
5. Add a Postgres database and paste its `DATABASE_URL`.
6. Add the Stripe webhook pointing to `/api/orders/webhook/`.

---

## Project structure

```
sneaker-store/
├── backend/
│   ├── core/           # Django project settings + URLs
│   ├── products/       # Product app (model, admin, DRF views)
│   ├── orders/         # Order + Stripe checkout
│   ├── seed.py         # Dummy product seeder (20 SKUs)
│   └── requirements.txt
└── frontend/
    ├── app/            # Next.js App Router pages
    ├── components/     # Navbar, Hero, ProductCard, CartDrawer, ...
    ├── lib/            # api.ts, cart.ts (Zustand), types.ts
    └── public/
```

---

## API endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products/` | List (filters: `?category=`, `?featured=true`, `?search=`) |
| `GET` | `/api/products/<slug>/` | Product detail |
| `POST` | `/api/orders/create-checkout-session/` | Create Stripe session |
| `POST` | `/api/orders/webhook/` | Stripe webhook (verifies signature) |

---

## Credits

Built by **Vivek Bajpai** — Full-Stack Developer.
[Hire me on Fiverr](https://www.fiverr.com) · [GitHub](https://github.com) · [LinkedIn](https://linkedin.com)

Imagery via Unsplash. Icons via Lucide. Payments via Stripe.
