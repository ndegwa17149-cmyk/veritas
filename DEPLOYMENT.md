# Veritas in Production - Deployment Guide

## Pre-Deployment Checklist

### Security
- [ ] Change `SECRET_KEY` in `.env` to a strong 32+ character secret
  ```bash
  python -c "from secrets import token_urlsafe; print(token_urlsafe(32))"
  ```
- [ ] Set `DEBUG=False` in `.env`
- [ ] Update `ALLOWED_HOSTS` with your actual domain(s)
- [ ] Configure CORS to restrict to your frontend domain only
- [ ] Ensure `.env` file is in `.gitignore` (never commit secrets)
- [ ] Use HTTPS only (Configure in reverse proxy/load balancer)
- [ ] Set secure cookie flags in Django settings

### Database
- [ ] For high-traffic production, migrate from SQLite to PostgreSQL:
  ```bash
  pip install psycopg2-binary
  # Update DATABASE_URL=postgresql://user:password@host:5432/veritas
  ```
- [ ] Run migrations on production database:
  ```bash
  python manage.py migrate
  ```
- [ ] Back up database before deploying

### Static Files & Assets
- [ ] Collect static files:
  ```bash
  python manage.py collectstatic --noinput
  ```
- [ ] Configure CDN or S3 for static files serving
- [ ] Ensure React build is compiled:
  ```bash
  cd django_frontend/frontend_spa
  npm run build
  ```

### Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Update all values in `.env` for production:
  - `SECRET_KEY`
  - `DEBUG=False`
  - `ALLOWED_HOSTS`
  - `CORS_ORIGINS`
  - Database credentials
- [ ] Never commit `.env` file

### Deployment Options

**Render (Easiest Option):**
```bash
# 1. Connect your GitHub repository to Render
# 2. Create a new Web Service
# 3. Use these settings:
#    - Runtime: Python 3
#    - Build Command: pip install -r requirements-prod.txt
#    - Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
# 4. Add environment variables:
#    - DATABASE_URL (Render provides this automatically)
#    - SECRET_KEY (generate a strong random key)
#    - DEBUG=False
#    - CORS_ORIGINS=https://your-frontend-domain.com
#    - ALLOWED_HOSTS=your-app-name.onrender.com
```

**Heroku:**
```bash
heroku create veritas-app
heroku config:set SECRET_KEY=your-secret
heroku config:set DEBUG=False
git push heroku main
heroku run python django_frontend/manage.py migrate
```

**PythonAnywhere:**
- Upload code to PythonAnywhere
- Configure Web app with WSGI file
- Set environment variables in Web tab
- Point domain to PythonAnywhere servers

#### Render Deployment (Step-by-Step)

**Why Render?** Render is free for small projects, has built-in PostgreSQL, and handles SSL certificates automatically.

**Step 1: Prepare Your Code**
```bash
# Ensure you have these files in your repository:
# - requirements-prod.txt (updated for Render)
# - render.yaml (optional, for multi-service setup)
# - Dockerfile.render (Render-specific Dockerfile)
```

**Step 2: Deploy on Render**

1. **Connect Repository:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   - **Name:** veritas-api (or your choice)
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements-prod.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://... (Render provides this)
   SECRET_KEY=your-generated-secret-key-here
   DEBUG=False
   CORS_ORIGINS=https://your-frontend-domain.com
   ALLOWED_HOSTS=your-app-name.onrender.com
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Your API will be available at: `https://your-app-name.onrender.com`

**Step 3: Database Setup**
- Render automatically creates a PostgreSQL database
- The `DATABASE_URL` environment variable is set automatically
- Run migrations (one-time): `python django_frontend/manage.py migrate`

**Step 4: Custom Domain (Optional)**
- In Render dashboard, go to your service settings
- Add custom domain
- Update `ALLOWED_HOSTS` and `CORS_ORIGINS` environment variables

**Troubleshooting Render Issues:**
- **psycopg2 build fails:** Use `requirements-sqlite.txt` instead (SQLite database)
- **Build timeout:** Reduce dependencies or use the fallback requirements
- **Port issues:** Render uses `$PORT` environment variable automatically
- **Static files:** Django static files are handled by Whitenoise in production

**Alternative: Use SQLite for Render**
If PostgreSQL compilation fails, you can use SQLite:

1. Change build command to: `pip install -r requirements-sqlite.txt`
2. Add environment variable: `USE_SQLITE=true`
3. Database will be file-based (suitable for demos/small apps)

**AWS (EC2 + RDS):**
```bash
# Launch EC2 instance, install Python, pip, git
git clone <your-repo>
cd veritas-phase1-main
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python django_frontend/manage.py migrate
gunicorn frontend_project.wsgi:application --bind 0.0.0.0:8000
```

#### Option 2: Docker (Best for Consistency)
Create `Dockerfile` in project root:
```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN python django_frontend/manage.py collectstatic --noinput
CMD ["gunicorn", "frontend_project.wsgi:application", "--bind", "0.0.0.0:8000"]
```

Build and push:
```bash
docker build -t veritas:latest .
docker run -p 8000:8000 -e SECRET_KEY=your-secret veritas:latest
```

#### Option 3: Traditional VPS (DigitalOcean, Linode, AWS)
```bash
# SSH into server
ssh root@your-server-ip

# Install dependencies
apt-get update
apt-get install python3 python3-pip python3-venv git nginx postgresql

# Clone project
git clone <your-repo>
cd veritas-phase1-main
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure PostgreSQL
sudo -u postgres psql
CREATE DATABASE veritas;
CREATE USER veritas_user WITH PASSWORD 'strong-password';
ALTER ROLE veritas_user SET client_encoding TO 'utf8';
ALTER ROLE veritas_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE veritas_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE veritas TO veritas_user;

# Update .env with PostgreSQL connection
# Setup Nginx reverse proxy
# Use systemd to auto-start gunicorn
# Install SSL certificate with Certbot
```

### Web Server Configuration

**Using Gunicorn + Nginx:**

1. Install Gunicorn:
   ```bash
   pip install gunicorn
   ```

2. Create systemd service file (`/etc/systemd/system/veritas.service`):
   ```
   [Unit]
   Description=Veritas Project
   After=network.target

   [Service]
   ExecStart=/path/to/venv/bin/gunicorn frontend_project.wsgi:application --bind 0.0.0.0:8000
   Restart=always
   User=www-data

   [Install]
   WantedBy=multi-user.target
   ```

3. Start service:
   ```bash
   systemctl start veritas
   systemctl enable veritas
   ```

### SSL/TLS Certificate

Use **Let's Encrypt** (free, automatic renewal):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Or with **Nginx**:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Monitoring & Logging

- [ ] Set up application logging
- [ ] Configure error tracking (Sentry, rollbar)
- [ ] Monitor server performance (New Relic, DataDog)
- [ ] Set up automated backups for database
- [ ] Configure log rotation

### Testing Before Production

```bash
# Run tests
python manage.py test

# Check for security issues
python manage.py check --deploy

# Verify static files are served
python manage.py collectstatic --dry-run
```

### Post-Deployment

- [ ] Verify site is accessible
- [ ] Test login/register flow
- [ ] Test asset upload functionality
- [ ] Verify HTTPS redirect works
- [ ] Check console for errors
- [ ] Monitor error logs
- [ ] Set up automated backups
- [ ] Document deployment process for team

## Rollback Plan

Keep previous version tagged in Git:
```bash
git tag -a v1.0.0-prod -m "Production release"
git push origin v1.0.0-prod

# If deployment fails, rollback:
git checkout v1.0.0-prod
# Redeploy
```

## Support

For issues or questions about deploying Veritas, refer to the main README.md or contact the dev team.
