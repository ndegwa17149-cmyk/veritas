# 🚀 Veritas Production Deployment - Pre-Launch Checklist

## ✅ Security Checklist

### Secrets & Keys
- [ ] Generate strong `SECRET_KEY`:
  ```bash
  python -c "from secrets import token_urlsafe; print(token_urlsafe(32))"
  ```
- [ ] Store `SECRET_KEY` in `.env` (NEVER commit to git)
- [ ] Store database credentials in `.env`
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Use environment variables for all secrets

### Django Security
- [ ] `DEBUG = False` in production `.env`
- [ ] `SECRET_KEY` changed from default
- [ ] `ALLOWED_HOSTS` configured with actual domain(s)
- [ ] `SECURE_SSL_REDIRECT = True` enabled
- [ ] `SESSION_COOKIE_SECURE = True` set
- [ ] `CSRF_COOKIE_SECURE = True` set
- [ ] `X-Frame-Options` header configured
- [ ] `X-Content-Type-Options: nosniff` set

### API Security
- [ ] CORS restricted to frontend domain(s) only
- [ ] JWT token expiration set appropriately (30min recommended)
- [ ] Password hashing with bcrypt enabled
- [ ] Rate limiting configured (optional but recommended)
- [ ] SQL injection prevention confirmed (use ORM/parameterized queries)

### Database Security
- [ ] Change default database credentials
- [ ] Enable database authentication
- [ ] Restrict database access to application only
- [ ] Set up regular automated backups
- [ ] Test backup restoration process
- [ ] Enable database encryption at rest (if supported)

### Server Security
- [ ] SSH key authentication enabled (disable password auth)
- [ ] Firewall configured (allow only 80, 443, 22)
- [ ] Keep system packages updated
- [ ] Disable unnecessary services
- [ ] Configure fail2ban or similar for brute force protection

### HTTPS/SSL
- [ ] SSL certificate installed (Let's Encrypt recommended)
- [ ] Certificate auto-renewal configured
- [ ] HTTP redirects to HTTPS
- [ ] HSTS header set with appropriate max-age
- [ ] SSL/TLS version 1.2+ enforced
- [ ] Weak ciphers disabled

---

## ✅ Configuration Checklist

### Django Settings
- [ ] Update `ALLOWED_HOSTS` with production domain(s)
- [ ] Configure email backend for password reset (if needed)
- [ ] Set appropriate `STATIC_URL` and `STATIC_ROOT`
- [ ] Configure log file location and rotation
- [ ] Set database connection pooling (if using PostgreSQL)
- [ ] Enable gzip compression in middleware

### FastAPI Settings
- [ ] `CORS_ORIGINS` updated to frontend domain(s)
- [ ] JWT `ACCESS_TOKEN_EXPIRE_MINUTES` reviewed
- [ ] Error handling configured with appropriate response codes
- [ ] Request logging enabled
- [ ] Rate limiting implemented (optional)

### Environment Variables
- [ ] `.env` file created with all required variables
- [ ] All placeholders replaced with actual values
- [ ] `SECRET_KEY` is strong (32+ characters)
- [ ] `DEBUG` explicitly set to `False`
- [ ] `ALLOWED_HOSTS` includes production domain
- [ ] `CORS_ORIGINS` restricted to frontend domain

---

## ✅ Database Checklist

### Development (SQLite)
- [ ] Database file location is writable
- [ ] Database backups are automated

### Production (PostgreSQL Recommended)
- [ ] PostgreSQL server installed and running
- [ ] Database created with strong credentials
- [ ] Database user created with proper permissions
- [ ] `DATABASE_URL` correctly configured
- [ ] Connection pooling enabled (optional, improves performance)
- [ ] Regular automated backups configured
- [ ] Backup restoration tested
- [ ] Database monitoring enabled

### Migrations
- [ ] All migrations created with SQLAlchemy/Alembic
- [ ] Migrations tested in staging environment first
- [ ] Rollback procedure documented
- [ ] Latest migrations applied to production database

---

## ✅ Static Files & Assets Checklist

### Django Static Files
- [ ] Run `python manage.py collectstatic`
- [ ] Static files served by web server (Nginx), not Django
- [ ] `STATIC_ROOT` points to web server accessible directory
- [ ] Long-term caching enabled for static files
- [ ] CDN configured if needed for performance

### React Build
- [ ] `npm run build` executed successfully
- [ ] Build output in `django_frontend/frontend_spa/dist/`
- [ ] Source maps disabled in production build
- [ ] Frontend dependencies optimized

---

## ✅ Performance Checklist

### Caching
- [ ] Browser caching configured (Cache-Control headers)
- [ ] Server-side caching considered (Redis)
- [ ] Database query optimization reviewed
- [ ] N+1 query problems eliminated

### Compression
- [ ] Gzip compression enabled in Nginx
- [ ] Static assets minified
- [ ] Images optimized
- [ ] Database indexes created for frequently queried fields

### Load Testing
- [ ] Application tested under load
- [ ] Response times acceptable
- [ ] Database can handle concurrent connections
- [ ] Memory usage monitored during load tests

---

## ✅ Deployment Checklist

### Code
- [ ] All commits pushed to GitHub
- [ ] No secrets in repository
- [ ] Latest production branch deployed
- [ ] Version tag created (e.g., v1.0.0)

### Deployment Method
- [ ] Choose deployment platform (Docker, Heroku, AWS, VPS...)
- [ ] Deployment script tested multiple times
- [ ] Rollback procedure documented
- [ ] Deployment team trained

### Server Setup (if self-hosted)
- [ ] Python 3.13+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed with `requirements-prod.txt`
- [ ] Web server (Nginx) configured
- [ ] Application server (Gunicorn) configured
- [ ] Systemd service file created for auto-start
- [ ] SSL certificate installed

---

## ✅ Monitoring & Logging Checklist

### Logging
- [ ] Application logs configured
- [ ] Log files rotated to prevent disk overflow
- [ ] Logs aggregated and searchable
- [ ] Error logs monitored for issues
- [ ] Access logs reviewed periodically

### Monitoring
- [ ] Server uptime monitoring enabled (StatusCake, Uptime Robot, etc.)
- [ ] Performance metrics monitored (CPU, RAM, disk space)
- [ ] Database performance monitored
- [ ] Error tracking enabled (Sentry, Rollbar, etc.)
- [ ] Alerts configured for critical issues

### Backups
- [ ] Database backups automated (daily minimum)
- [ ] Backup integrity verified regularly
- [ ] Backup restoration tested
- [ ] Backup retention policy defined
- [ ] Off-site backup storage configured

---

## ✅ Testing Checklist

### Automated Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] API endpoint tests pass
- [ ] Database migration tests pass

### Manual Testing (Production Environment)
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Asset submission/upload works
- [ ] Admin approval process works
- [ ] Assets display publicly after approval
- [ ] API endpoints respond correctly
- [ ] Static files served correctly
- [ ] Error pages display properly
- [ ] HTTPS redirects work

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## ✅ Post-Deployment Checklist

### Verification
- [ ] Application accessible at production domain
- [ ] HTTPS working and certificate valid
- [ ] All pages load without errors
- [ ] API endpoints respond correctly
- [ ] Database is accessible
- [ ] Static files load correctly
- [ ] Logs are being written

### Monitoring
- [ ] Error tracking service reports no critical errors
- [ ] Performance metrics within acceptable ranges
- [ ] No server resource constraints
- [ ] Database performance acceptable
- [ ] Backup job completed successfully

### Communication
- [ ] Team notified of successful deployment
- [ ] Status page updated (if applicable)
- [ ] Oncall rotation updated
- [ ] Documentation updated with any configuration changes

---

## 🚨 Emergency Procedures

### Database Connection Lost
1. Check database server status
2. Verify database credentials in `.env`
3. Test connection manually:
   ```bash
   psql -h localhost -U veritas_user -d veritas
   ```
4. If persistent, rollback to previous database state
5. Restart application server

### Application Not Responding
1. Check application logs for errors
2. Check server resource usage (CPU, RAM, disk)
3. Restart application:
   ```bash
   systemctl restart veritas
   ```
4. Check database connectivity
5. If needed, rollback to previous version

### Certificate Expiration
1. Verify certificate expiration:
   ```bash
   openssl s_client -connect yourdomain.com:443 | grep -A5 "Validity"
   ```
2. Renew certificate immediately
3. Verify renewal before expiration

### Disk Space Full
1. Check what's using disk space:
   ```bash
   du -sh /*
   ```
2. Clean up old logs if safe:
   ```bash
   find logs/ -name "*.log.*" -delete  # Keep only recent logs
   ```
3. Remove old database backups if needed
4. Contact hosting provider if insufficient disk

---

## 📋 Final Sign-Off

- [ ] All security checks passed
- [ ] All configuration verified
- [ ] All tests passing
- [ ] Backups functioning
- [ ] Monitoring active
- [ ] Emergency procedures documented
- [ ] Team trained

**Deployment Date:** _________________
**Deployed By:** _________________
**Reviewed By:** _________________

---

## 📞 Support & Escalation

For issues post-deployment:
1. Check error logs: `tail -f logs/veritas.log`
2. Check application status: `systemctl status veritas`
3. Review monitoring dashboard
4. Contact on-call team lead

Emergency contact: _________________

---

**Keep this checklist updated as you make changes to the production environment.**
