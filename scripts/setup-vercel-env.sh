#!/bin/bash

# Setup Vercel Environment Variables
# This script adds required environment variables to your Vercel project

set -e

echo "Setting up Vercel environment variables..."

# Vercel credentials
export VERCEL_TOKEN="${VERCEL_TOKEN:-cW7qpJsOre2Tob1Mb3J5nvYf}"
export VERCEL_ORG_ID="${VERCEL_ORG_ID:-team_8pHG4k3VMcdJQWmIvd7B4Lcl}"
export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-prj_ScfYTFTmbPdFq9inUcOLR4X52uwd}"

# Function to add environment variable to Vercel
add_vercel_env() {
  local name=$1
  local value=$2
  local environments=$3  # production, preview, development

  echo "Adding $name to Vercel..."
  echo "$value" | npx vercel env add "$name" "$environments" --token="$VERCEL_TOKEN"
}

# Check if GitHub CLI is available and get secrets
if command -v gh &> /dev/null; then
  echo "Fetching secrets from GitHub..."

  # Get GitHub secrets (Note: actual secret values cannot be read via CLI)
  # Users need to manually provide these or use the GitHub Actions context
  echo ""
  echo "⚠️  IMPORTANT: GitHub CLI cannot read secret values for security reasons."
  echo "You have two options:"
  echo ""
  echo "1. Add env vars manually through Vercel dashboard:"
  echo "   https://vercel.com/mahendra-balals-projects/web/settings/environment-variables"
  echo ""
  echo "2. Run this script with environment variables set:"
  echo "   NEXT_PUBLIC_SUPABASE_URL=your_url NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key ./scripts/setup-vercel-env.sh"
  echo ""

  # Check if env vars are provided
  if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Required environment variables not provided."
    echo ""
    echo "Please set the following and run again:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    exit 1
  fi
fi

# Add environment variables to Vercel for all environments
echo ""
echo "Adding Supabase environment variables..."

add_vercel_env "NEXT_PUBLIC_SUPABASE_URL" "$NEXT_PUBLIC_SUPABASE_URL" "production,preview,development"
add_vercel_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$NEXT_PUBLIC_SUPABASE_ANON_KEY" "production,preview,development"
add_vercel_env "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY" "production,preview,development"

echo ""
echo "✅ Vercel environment variables configured successfully!"
echo ""
echo "Next steps:"
echo "1. Trigger a new deployment: git commit --allow-empty -m 'Trigger deployment' && git push"
echo "2. Or redeploy through Vercel dashboard"
