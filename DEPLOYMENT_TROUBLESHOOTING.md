# Deployment Troubleshooting Guide

## 🚨 **Common Vercel Deployment Issues & Solutions**

### **Issue #1: Environment Variables Not Found**
**Symptoms:**
- Build fails with "NEXT_PUBLIC_SUPABASE_URL is not defined"
- API routes return 500 errors
- Authentication doesn't work

**Solution:**
```bash
# Quick fix - auto-configure all variables
./scripts/setup-vercel-env.sh

# Or manually add in Vercel Dashboard:
# Settings → Environment Variables → Add each variable from apps/web/.env.local
```

### **Issue #2: Build Timeout**
**Symptoms:**
- Deployment takes too long and times out
- Build process hangs during "Creating optimized production build"

**Solution:**
```bash
# Check local build performance
cd apps/web && npm run build

# If slow, check for:
# - Large images in public/ folder
# - Heavy dependencies
# - Complex build scripts
```

### **Issue #3: Monorepo Build Issues**
**Symptoms:**
- "Cannot find module @mental-wellness/shared"
- Turbo build failures
- Package resolution errors

**Solution:**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build

# Verify workspace configuration
cat package.json | grep -A 10 "workspaces"
```

### **Issue #4: Memory Limit Exceeded**
**Symptoms:**
- "JavaScript heap out of memory"
- Build process crashes

**Solution:**
```bash
# Increase Node.js memory limit
cd apps/web
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### **Issue #5: API Route Failures**
**Symptoms:**
- API endpoints return 404 or 500 errors
- Database connection issues

**Solution:**
```bash
# Test health endpoints locally
cd apps/web && npm run dev
curl http://localhost:3000/api/health
curl http://localhost:3000/api/health-detailed

# Check environment variables in Vercel
# Ensure DATABASE_URL and SUPABASE keys are correct
```

## 🔍 **Debugging Steps**

### **Step 1: Check Local Build**
```bash
# Always verify local build works first
cd apps/web && npm run build

# If this fails, fix local issues before deploying
```

### **Step 2: Check Vercel Logs**
1. Go to [Vercel Dashboard](https://vercel.com/mahendra-balals-projects/web)
2. Click "Deployments" → Find failed deployment
3. Click "View Logs" → Look for red error messages
4. Fix the specific error shown

### **Step 3: Verify Environment Variables**
```bash
# List required variables
grep -v "^#" apps/web/.env.local | grep "="

# Ensure each is set in Vercel Dashboard
```

### **Step 4: Test Production URL**
```bash
# Check if deployment succeeded
curl -I https://web-mahendra-balals-projects.vercel.app

# Test health endpoint
curl https://web-mahendra-balals-projects.vercel.app/api/health
```

## 🛠️ **Quick Fix Commands**

### **Reset and Redeploy**
```bash
# Clean everything
npm run clean
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/.next

# Reinstall and rebuild
npm install
npm run build

# Deploy
git add .
git commit -m "Fix deployment issues"
git push
```

### **Force Redeploy**
```bash
# Trigger new deployment with timestamp
echo "Deployment fix at $(date)" >> deployment-fix.log
git add deployment-fix.log
git commit -m "Trigger deployment fix"
git push
```

## 📋 **Pre-Deployment Checklist**

Before deploying, always verify:

- [ ] Local build passes: `cd apps/web && npm run build`
- [ ] All environment variables set in Vercel Dashboard
- [ ] No sensitive data in committed files
- [ ] Health endpoints work locally
- [ ] Database connections are working

## 🆘 **Getting Help**

### **If All Else Fails:**

1. **Check Recent Changes**
   ```bash
   git log --oneline -10
   # Look for recent commits that might have broken something
   ```

2. **Rollback to Working Version**
   ```bash
   # Find last working commit
   git log --oneline
   
   # Rollback
   git revert <commit-hash>
   git push
   ```

3. **Contact Support**
   - Check Vercel status: https://www.vercel-status.com/
   - Vercel support: https://vercel.com/support

---

**Remember: 90% of deployment failures are caused by missing environment variables. Use the setup script to avoid this issue!**