# Setup — exact commands

Copy-paste these into PowerShell, top-to-bottom. Everything is relative to the project root `C:\Users\abhis\fiverr-portfolio\sneaker-store`.

## 1. Backend (first terminal)

```powershell
cd C:\Users\abhis\fiverr-portfolio\sneaker-store\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# Open .env in an editor; set SECRET_KEY to anything random, and add
# your Stripe test keys from https://dashboard.stripe.com/test/apikeys.
# (If you leave STRIPE_SECRET_KEY blank, the checkout endpoint will
#  return a demo success URL — useful for taking screenshots.)
python manage.py makemigrations products orders
python manage.py migrate
python seed.py
python manage.py createsuperuser
python manage.py runserver
```

- API: http://localhost:8000/api/products/
- Admin: http://localhost:8000/admin/

## 2. Frontend (second terminal — leave the first running)

```powershell
cd C:\Users\abhis\fiverr-portfolio\sneaker-store\frontend
npm install
copy .env.example .env.local
npm run dev
```

- Storefront: http://localhost:3000

## 3. First commands to try

- Home page: http://localhost:3000
- All products: http://localhost:3000/products
- Running: http://localhost:3000/products?category=running
- Product detail: http://localhost:3000/products/aero-pulse-x3
- Cart page: http://localhost:3000/cart

## 4. Stripe webhook (optional, local)

Install the Stripe CLI, then:

```powershell
stripe login
stripe listen --forward-to http://localhost:8000/api/orders/webhook/
```

Copy the `whsec_...` into `backend/.env` as `STRIPE_WEBHOOK_SECRET` and restart the Django server.

## 5. Troubleshooting

- **`psycopg2-binary` fails to install**: safe to remove from `requirements.txt` for local dev; it's only needed in production with Postgres.
- **`Pillow` fails on Python 3.8**: upgrade to 3.9+ (`py -3.9 -m venv venv`) or pin to `Pillow==9.5.0`.
- **CORS errors from the frontend**: make sure Django is running on `:8000` and `FRONTEND_URL=http://localhost:3000` in `backend/.env`.
- **Blank product grid**: run `python seed.py` from inside `backend/` with the venv active.
