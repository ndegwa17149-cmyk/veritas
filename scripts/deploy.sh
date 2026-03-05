#!/bin/bash
# Deploy script for Veritas - Run on server

set -e  # Exit on error

echo "🚀 Starting Veritas deployment..."

# Load environment
export $(cat .env | xargs)

# 1. Pull latest code
echo "📦 Updating code..."
git pull origin main

# 2. Install dependencies
echo "📚 Installing dependencies..."
source venv/bin/activate
pip install -r requirements-prod.txt

# 3. Collect static files
echo "📁 Collecting static files..."
cd django_frontend
python manage.py collectstatic --noinput
cd ..

# 4. Run migrations
echo "🗄️  Running database migrations..."
cd django_frontend
python manage.py migrate
cd ..

# 5. Restart services
echo "🔄 Restarting application..."
systemctl restart veritas

echo "✅ Deployment complete!"
echo "🌐 Access at: https://yourdomain.com"
