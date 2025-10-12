# Simple Deployment Fix for Vercel Failures

## 🚨 **Problem Identified**
Your Vercel deployments are failing because environment variables are not configured in Vercel's dashboard. Your `.env.local` file works locally, but Vercel needs these variables set in their system.

## 🔧 **Quick Fix (3 Steps)**

### **Step 1: Setup Environment Variables**
```bash
# Run the setup script
./scripts/setup-vercel-env.sh
```

This script will automatically configure all your environment variables in Vercel.

### **Step 2: Test Local Build**
```bash
# Verify everything works locally
cd apps/web && npm run build
```

### **Step 3: Deploy**
```bash
# Simple deployment
git add .
git commit -m "Fix deployment configuration"
git push
```

That's it! Vercel will automatically deploy.

## 🛠️ **Manual Alternative**

If the script doesn't work, manually add these variables in Vercel Dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/mahendra-balals-projects/web)
2. Click "Settings" → "Environment Variables"
3. Add these variables:

### **Required Variables**
```
NEXT_PUBLIC_SUPABASE_URL=https://ghpuuobotfswlpprzsic.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocHV1b2JvdGZzd2xwcHJ6c2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0OTAyMTMsImV4cCI6MjA3NDA2NjIxM30.JcsQ4kH_uv0bDM6t1cE8ZY2UgP_7wFrkj3ZRyXwL7Og
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocHV1b2JvdGZzd2xwcHJ6c2ljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ5MDIxMywiZXhwIjoyMDc0MDY2MjEzfQ.Dim6-ZJayukoGHsdQZNvkoJppf-wqfSJjMBVW5zrOlw

NEXT_PUBLIC_SANITY_PROJECT_ID=4t9s1x2a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-25

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S1rayFBheWcIExCmfCGBuUrC1f0k9SGhHMBzPfwtcFw4y3xC1AbSy8DXUeUh0i8Xn00M8EUNvMYio1oyJuAeGvj00IOWERKPC
NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_1SGLnCFBheWcIExCAXviZkLk
NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_1SGMKZFBheWcIExC9NX4jNIo

NEXT_PUBLIC_SITE_URL=https://www.mentalwellnessapps.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FEP29679ZS
```

### **Secret Variables (Production Only)**
```
STRIPE_SECRET_KEY=sk_test_51S1rayFBheWcIExCr4CBUPcqvk3uRIZs4pg7yf57zymh3rxcxUe1Fkf4ZsFP7dsqxAIzyipsQOzzbYOV6AIcVQ8400AyJWR9wh
STRIPE_WEBHOOK_SECRET=whsec_9f44c5c8838f1286cb3aad5f15f5f120e7c4f9f90abd6cf99e1c840ba34c4f3b
SANITY_PREVIEW_TOKEN=your-preview-token
SANITY_PREVIEW_SECRET=your-preview-secret
SANITY_REVALIDATE_SECRET=your-revalidate-secret
```

## 🎯 **Best Practice Moving Forward**

### **Simple Daily Workflow**
1. Make changes
2. `git add . && git commit -m "your message" && git push`
3. ✅ Vercel automatically deploys

### **Environment Management**
- Keep `.env.local` for local development
- Use Vercel Dashboard for production variables
- Never commit sensitive variables to Git

## 🔍 **Verification**

After deployment, check:
1. https://web-mahendra-balals-projects.vercel.app loads
2. https://web-mahendra-balals-projects.vercel.app/api/health returns "healthy"
3. Login/Signup pages work

## 🚨 **If Still Failing**

1. Check Vercel build logs in dashboard
2. Ensure all environment variables are set
3. Verify build passes locally: `cd apps/web && npm run build`

---

**This fix addresses the #1 cause of Vercel deployment failures: missing environment variables.**