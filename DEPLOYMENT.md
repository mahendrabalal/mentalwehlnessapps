# Deployment Guide - Best Practice

## Overview

This project uses **Vercel** for deployment with a simple, industry-standard workflow.

## Prerequisites

- Vercel account connected to your GitHub
- Environment variables configured in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

**Setup once:**
1. Go to [Vercel Dashboard](https://vercel.com/mahendra-balals-projects/web)
2. Connect your GitHub repository
3. Set Root Directory to: `apps/web`
4. Framework: Next.js (auto-detected)

**Then:**
```bash
git add .
git commit -m "your changes"
git push
```

Vercel automatically deploys on push to `main` branch!

### Method 2: Manual Deployment via CLI

```bash
./deploy.sh
```

Or manually:
```bash
cd apps/web
npx vercel --prod --yes
```

## Project Structure

```
mentalwehlnessapps/
├── apps/
│   ├── web/                 # Next.js app (deployment root)
│   │   ├── vercel.json     # Vercel config
│   │   ├── package.json
│   │   └── src/
│   └── cms/                 # Sanity CMS
├── packages/
│   └── shared/
└── deploy.sh               # Simple deployment script
```

## Vercel Configuration

Located in `apps/web/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

**That's it!** No complex configuration needed.

## Deployment Flow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push
   ```

3. **Auto-Deploy** ✅
   - Vercel detects push
   - Builds in `apps/web` directory
   - Runs `npm install && npm run build`
   - Deploys to production

## Troubleshooting

### Build Fails
- Check [Vercel Dashboard](https://vercel.com/mahendra-balals-projects/web)
- View build logs
- Verify environment variables are set

### Manual Deploy
```bash
cd apps/web
npx vercel --prod --yes
```

## Best Practices

✅ **DO:**
- Keep `vercel.json` minimal
- Let Vercel auto-detect Next.js
- Use environment variables for secrets
- Deploy from `apps/web` directory

❌ **DON'T:**
- Add complex build commands
- Use GitHub Actions (Vercel handles it)
- Commit `.env` files
- Override Vercel's defaults unnecessarily

## Links

- **Production**: https://web-mahendra-balals-projects.vercel.app
- **Dashboard**: https://vercel.com/mahendra-balals-projects/web
- **Docs**: https://vercel.com/docs

---

**Simple. Fast. Reliable.**

That's the Vercel way! 🚀
