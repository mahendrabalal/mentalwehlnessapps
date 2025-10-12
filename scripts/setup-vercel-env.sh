#!/bin/bash

# Setup Vercel Environment Variables Script
# This script helps configure the required environment variables for Vercel deployment

echo "🔧 Setting up Vercel Environment Variables..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Read environment variables from .env.local
ENV_FILE="apps/web/.env.local"

if [[ ! -f "$ENV_FILE" ]]; then
    echo "❌ Environment file not found: $ENV_FILE"
    exit 1
fi

echo "📝 Reading environment variables from $ENV_FILE"

# Function to add environment variable to Vercel
add_env_var() {
    local var_name=$1
    local var_value=$2
    local env_type=${3:-production}
    
    echo "🔐 Adding $var_name to Vercel ($env_type)..."
    echo "$var_value" | vercel env add "$var_name" "$env_type"
}

# Read and set environment variables
while IFS= read -r line; do
    # Skip comments and empty lines
    [[ $line =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line// }" ]] && continue
    
    # Extract variable name and value
    if [[ $line =~ ^([^=]+)=(.*)$ ]]; then
        var_name="${BASH_REMATCH[1]}"
        var_value="${BASH_REMATCH[2]}"
        
        # Skip NEXT_PUBLIC_ variables that should be in preview/production
        if [[ $var_name == NEXT_PUBLIC_* ]]; then
            add_env_var "$var_name" "$var_value" "production"
            add_env_var "$var_name" "$var_value" "preview"
        # Add secret variables only to production
        else
            add_env_var "$var_name" "$var_value" "production"
        fi
    fi
done < "$ENV_FILE"

echo "✅ Environment variables configured successfully!"
echo ""
echo "🚀 You can now deploy with:"
echo "   git add ."
echo "   git commit -m 'Configure environment variables'"
echo "   git push"
echo ""
echo "Or deploy manually:"
echo "   cd apps/web && npx vercel --prod"
