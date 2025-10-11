#!/bin/bash
# Simple deployment script - Best Practice for Vercel + Next.js monorepo

set -e

echo "🚀 Deploying Mental Wellness App to Vercel..."

# Navigate to the web app directory
cd "$(dirname "$0")/apps/web"

# Deploy to Vercel production
echo "📦 Deploying to production..."
npx vercel --prod --yes

echo "✅ Deployment complete!"
