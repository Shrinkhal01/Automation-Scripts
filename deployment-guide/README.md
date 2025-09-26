# Deployment Guide: FastAPI Backend + React Frontend

This guide provides step-by-step instructions for deploying the FastAPI web scraping backend and React dashboard frontend to production.

## Overview

- **Backend**: FastAPI application with web scraping capabilities
- **Frontend**: React dashboard with Tailwind CSS
- **Database**: SQLite (production should use PostgreSQL)
- **Backend Deployment**: Render or Heroku
- **Frontend Deployment**: Vercel

## Prerequisites

- Git installed
- Node.js 18+ 
- Python 3.9+
- GitHub account
- Render/Heroku account
- Vercel account

## Part 1: FastAPI Backend Deployment

### Option A: Deploy to Render

#### Step 1: Prepare Backend for Production

1. **Create a production requirements file**:
```bash
cd fastapi-scraper
echo "fastapi==0.104.1
uvicorn[standard]==0.24.0
gunicorn==21.2.0
beautifulsoup4==4.12.2
requests==2.31.0
sqlalchemy==2.0.23
python-multipart==0.0.6
pydantic==2.5.0
psycopg2-binary==2.9.7" > requirements.txt
```

2. **Create Render configuration file**:
```bash
# Create render.yaml in fastapi-scraper directory
cat > render.yaml << 'EOF'
services:
  - type: web
    name: fastapi-scraper
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: DATABASE_URL
        fromDatabase:
          name: products-db
          property: connectionString
databases:
  - name: products-db
    databaseName: products
    user: products_user
EOF
```

3. **Update main.py for production**:
```python
# Add environment variable support at the top of main.py
import os
from sqlalchemy import create_engine

# Update database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./products.db")

# Update CORS origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173", 
        "https://*.vercel.app",
        "https://your-frontend-domain.vercel.app"  # Replace with actual domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Step 2: Deploy to Render

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Prepare FastAPI for Render deployment"
git push origin main
```

2. **Create Render Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your FastAPI code
   - Configure:
     - **Name**: `fastapi-scraper`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r fastapi-scraper/requirements.txt`
     - **Start Command**: `cd fastapi-scraper && gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
     - **Instance Type**: Free tier is sufficient for testing

3. **Add Environment Variables**:
   - In Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add variables as needed

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://your-app.onrender.com`)

### Option B: Deploy to Heroku

#### Step 1: Prepare for Heroku

1. **Create Procfile**:
```bash
cd fastapi-scraper
echo "web: gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:\$PORT" > Procfile
```

2. **Create runtime.txt**:
```bash
echo "python-3.11.0" > runtime.txt
```

3. **Install Heroku CLI** and login:
```bash
# Install Heroku CLI (varies by OS)
# For Ubuntu/Debian:
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login
```

#### Step 2: Deploy to Heroku

1. **Create Heroku app**:
```bash
heroku create your-fastapi-app-name
```

2. **Add PostgreSQL addon**:
```bash
heroku addons:create heroku-postgresql:mini
```

3. **Set environment variables**:
```bash
heroku config:set PYTHON_VERSION=3.11.0
```

4. **Deploy**:
```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

5. **Open your app**:
```bash
heroku open
```

## Part 2: React Frontend Deployment to Vercel

#### Step 1: Prepare Frontend for Production

1. **Update API base URL for production**:
```javascript
// In react-dashboard/src/services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-fastapi-app.onrender.com'  // Replace with your backend URL
  : 'http://localhost:8000';
```

2. **Create environment variables file**:
```bash
cd react-dashboard
echo "VITE_API_URL=https://your-fastapi-app.onrender.com" > .env.production
```

3. **Update vite.config.js for environment variables**:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  server: {
    port: 3000,
    open: true
  }
})
```

#### Step 2: Deploy to Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Build the project**:
```bash
cd react-dashboard
npm run build
```

3. **Deploy with Vercel**:
```bash
vercel
```

   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name: `react-dashboard` or your preferred name
   - In which directory is your code located? `./`

4. **Set environment variables in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://your-fastapi-app.onrender.com`
     - **Environment**: Production

5. **Redeploy with environment variables**:
```bash
vercel --prod
```

## Part 3: CORS Configuration

### Backend CORS Setup

Update your FastAPI CORS configuration in `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

# Update with your actual frontend domain
FRONTEND_URL = "https://your-react-app.vercel.app"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173", 
        FRONTEND_URL,
        "https://*.vercel.app"  # Allows all Vercel apps
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### Test CORS Configuration

1. **Test locally**:
```bash
curl -X GET https://your-fastapi-app.onrender.com/products/ \
  -H "Origin: https://your-react-app.vercel.app"
```

2. **Check browser console** for CORS errors when accessing the frontend

## Part 4: Environment Variables Summary

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@host:port/db` |
| `PORT` | Server port (auto-set by Render/Heroku) | `8000` |
| `PYTHON_VERSION` | Python version | `3.11.0` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-app.onrender.com` |

## Part 5: SSL and Domain Configuration

### Custom Domain (Optional)

1. **For Render**:
   - Go to Settings → Custom Domains
   - Add your domain
   - Configure DNS settings as instructed

2. **For Vercel**:
   - Go to Settings → Domains
   - Add your domain
   - Configure DNS settings as instructed

## Part 6: Monitoring and Logging

### Backend Monitoring

1. **Render**: Built-in logs available in dashboard
2. **Heroku**: Use `heroku logs --tail` or dashboard

### Frontend Monitoring

1. **Vercel**: Built-in analytics and logs in dashboard

## Part 7: Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Verify frontend URL is in backend CORS origins
   - Check for typos in URLs
   - Ensure both HTTP and HTTPS variants are included

2. **Build Failures**:
   - Check Python/Node.js versions
   - Verify all dependencies are in requirements.txt/package.json
   - Check build logs for specific errors

3. **Database Connection Issues**:
   - Verify DATABASE_URL environment variable
   - Check database credentials
   - Ensure database is created and accessible

4. **API Connection Issues**:
   - Verify VITE_API_URL is set correctly
   - Check network tab in browser dev tools
   - Test API endpoints directly with curl

### Useful Commands

```bash
# Check deployment status
vercel --prod
heroku ps:scale web=1

# View logs
vercel logs
heroku logs --tail

# Test API endpoints
curl https://your-api.onrender.com/health
curl https://your-api.onrender.com/products/
```

## Part 8: Production Optimizations

### Backend Optimizations

1. **Use PostgreSQL** instead of SQLite
2. **Add Redis** for caching
3. **Implement rate limiting**
4. **Add API authentication** if needed
5. **Use Gunicorn** with multiple workers

### Frontend Optimizations

1. **Enable Vercel Analytics**
2. **Add error boundary components**
3. **Implement loading states**
4. **Add PWA capabilities**
5. **Optimize bundle size**

## Part 9: Security Considerations

1. **Environment Variables**: Never commit secrets to git
2. **CORS**: Be specific with allowed origins
3. **API Rate Limiting**: Implement to prevent abuse
4. **Input Validation**: Validate all user inputs
5. **HTTPS**: Always use HTTPS in production

## Conclusion

Following this guide, you should have:
- ✅ FastAPI backend deployed to Render/Heroku
- ✅ React frontend deployed to Vercel  
- ✅ Proper CORS configuration
- ✅ Environment variables configured
- ✅ SSL certificates enabled
- ✅ Monitoring and logging set up

Your application will be accessible at:
- **Frontend**: `https://your-react-app.vercel.app`
- **Backend**: `https://your-fastapi-app.onrender.com`
- **API Docs**: `https://your-fastapi-app.onrender.com/docs`

For ongoing maintenance, monitor logs, update dependencies regularly, and scale resources as needed.