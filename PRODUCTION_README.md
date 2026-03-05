# Veritas on GitHub - Ready for Production ✅

This is the **Veritas Phase 1** project - a human-verified contribution platform with Django frontend, FastAPI backend, and React SPA.

## 🚀 Quick Start (Development)

```bash
# 1. Clone repository
git clone https://github.com/yourname/veritas-phase1.git
cd veritas-phase1-main

# 2. Setup Python environment
python -m venv .venv
.\.venv\Scripts\activate  # On Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
cd django_frontend
..\ .venv\Scripts\python.exe manage.py migrate
cd ..

# 5. Start backend (Django)
cd django_frontend
..\ .venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000

# 6. (Optional) Start frontend (React)
cd frontend_spa
npm install
npm run dev
```

Visit: `http://localhost:8000` (Django) or `http://localhost:5173` (React)

## 📦 Production Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment instructions including:
- Security checklist
- Database migration (SQLite → PostgreSQL)
- Cloud deployment options (Heroku, AWS, DigitalOcean)
- Docker containerization
- SSL/TLS setup
- Monitoring & logging

### Production Deployment Checklist
- [ ] Copy `.env.example` → `.env`
- [ ] Set `SECRET_KEY` to a strong 32+ character secret
- [ ] Set `DEBUG=False` in `.env`
- [ ] Update `ALLOWED_HOSTS` with your domain
- [ ] Configure `CORS_ORIGINS` for frontend domain only
- [ ] Test the application locally with production settings
- [ ] Deploy to your chosen platform
- [ ] Verify HTTPS is enabled
- [ ] Set up database backups
- [ ] Configure error tracking & monitoring

## 🏗️ Project Structure

```
veritas-phase1-main/
├── app/                          # FastAPI backend
│   ├── main.py                   # FastAPI app entry
│   ├── config.py                 # Configuration from .env
│   ├── models.py                 # SQLAlchemy ORM models
│   ├── schemas.py                # Pydantic request/response schemas
│   ├── database.py               # Database connection setup
│   ├── auth.py                   # JWT authentication
│   ├── dependencies.py           # FastAPI dependencies
│   └── routers/                  # API endpoints
│       ├── auth.py               # Login/register endpoints
│       ├── assets.py             # Asset listing
│       ├── submissions.py        # Asset submission
│       └── admin.py              # Admin functions
├── django_frontend/              # Django template renderer
│   ├── manage.py                 # Django CLI
│   ├── frontend_project/
│   │   ├── settings.py           # Django settings (UPDATED FOR PRODUCTION)
│   │   ├── wsgi.py               # WSGI application
│   │   └── urls.py               # URL routing
│   ├── frontend_app/             # Django app for templates
│   │   ├── views.py              # View handlers
│   │   └── urls.py               # App URLs
│   ├── templates/                # HTML templates
│   │   ├── base.html             # Base template with navbar/footer
│   │   ├── index.html            # Home page
│   │   ├── login.html            # Login form
│   │   └── submit.html           # Asset submission form
│   └── frontend_spa/             # React app (optional)
│       ├── package.json
│       ├── vite.config.js
│       └── src/
│           ├── App.jsx           # Main React component
│           ├── index.css         # Custom styles
│           └── pages/            # Page components
├── alembic/                      # Database migrations (SQLAlchemy)
├── scripts/                      # Utility scripts
│   ├── bootstrap_admin.py        # Create admin user
│   └── deploy.sh                 # Production deployment script
├── requirements.txt              # Development dependencies
├── requirements-prod.txt         # Production dependencies
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore patterns
├── DEPLOYMENT.md                 # Deployment guide
├── README.md                     # This file
└── alembic.ini                   # Alembic configuration

```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for secure password storage
- **CORS** - Restricted to configured origins only
- **SQL Injection Prevention** - Parameterized queries (SQLAlchemy)
- **Environment Variables** - Secrets never in code
- **HTTPS Only** - Enforced in production
- **Secure Cookies** - HttpOnly, Secure flags set in production

## 📚 API Endpoints

### Authentication
- `POST /api/login` - Login with email/username and password
- `POST /api/register` - Register new user

### Assets
- `GET /api/assets` - List all public assets
- `GET /api/assets/{id}` - Get asset details

### Submissions
- `POST /api/submissions` - Submit new asset (requires auth)
- `GET /api/submissions` - List user's submissions (requires auth)

### Admin
- `GET /api/admin/pending` - List pending submissions (admin only)
- `POST /api/admin/approve/{id}` - Approve submission (admin only)
- `POST /api/admin/reject/{id}` - Reject submission (admin only)

### Interactive API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🗄️ Database

### Development
SQLite (default) - `db.sqlite3`

### Production
PostgreSQL recommended:
```bash
# Install PostgreSQL driver
pip install psycopg2-binary

# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/veritas
```

## 🔄 Authentication Workflow

1. **Registration**: User enters email/username and password
2. **Login**: Returns JWT token (expires in 30 minutes by default)
3. **Protected Routes**: Token sent in `Authorization: Bearer <token>` header
4. **Admin**: Users with is_admin flag can approve/reject submissions

## 📤 File Upload & Assets

- Users can submit assets with title, description, type, and file URL
- Submissions are pending until admin approval
- Once approved, assets appear in public listing
- Supports: ideas, work, and asset submissions

## 📊 Business Rules (Configurable)

- Max 3 pending submissions per user
- Global cap of 1000 pending submissions
- Page size: 50 items (max 100)
- Token expiry: 30 minutes

## 🛠️ Development Tools

### Run Tests
```bash
pytest
```

### Check Security Issues
```bash
cd django_frontend
python manage.py check --deploy
```

### Database Migrations
```bash
# Create migration (SQLAlchemy)
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head

# Django migrations
cd django_frontend
python manage.py migrate
```

### Format Code
```bash
black app/
isort app/
```

## 📝 Environment Variables

Create `.env` file from `.env.example`:
```
SECRET_KEY=your-strong-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@localhost:5432/veritas
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🚨 Common Issues

### `ModuleNotFoundError: No module named 'django'`
- Ensure virtual environment is activated
- Run: `pip install -r requirements.txt`

### Database connection errors
- Verify `DATABASE_URL` in `.env`
- Run migrations: `python manage.py migrate`

### Static files not loading
- Collect static files: `python manage.py collectstatic`
- Check `STATIC_ROOT` and `STATICFILES_DIRS` in settings

### CORS errors
- Update `CORS_ORIGINS` in `.env` to match frontend domain
- Restart backend server

## 📞 Support

For issues or feature requests, open an issue on GitHub:
https://github.com/yourname/veritas-phase1/issues

## 📄 License

[Add your license here - e.g., MIT, Apache 2.0]

## 👥 Contributors

- [Your Name](https://github.com/yourname)

---

**Last Updated:** March 2026
**Status:** Production Ready ✅
