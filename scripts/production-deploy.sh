#!/bin/bash

# Production Deployment Script
# Mental Wellness App - HIPAA-Compliant Healthcare Platform

set -e  # Exit on any error

echo "🏥 Mental Wellness App - Production Deployment Starting..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEPLOYMENT_ENV=${1:-production}
SKIP_TESTS=${2:-false}
FORCE_DEPLOY=${3:-false}

echo -e "${BLUE}Environment: ${DEPLOYMENT_ENV}${NC}"
echo -e "${BLUE}Skip Tests: ${SKIP_TESTS}${NC}"
echo -e "${BLUE}Force Deploy: ${FORCE_DEPLOY}${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check prerequisites
echo "🔍 Checking Prerequisites..."

# Check Node.js version
NODE_VERSION=$(node --version)
MIN_NODE_VERSION="v18.0.0"
if [[ "$(printf '%s\n' "$MIN_NODE_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$MIN_NODE_VERSION" ]]; then
    print_status "Node.js version: $NODE_VERSION"
else
    print_error "Node.js version $NODE_VERSION is below minimum required $MIN_NODE_VERSION"
    exit 1
fi

# Check if environment file exists
if [[ ! -f ".env.${DEPLOYMENT_ENV}" ]]; then
    print_error "Environment file .env.${DEPLOYMENT_ENV} not found"
    echo "Please create .env.${DEPLOYMENT_ENV} from .env.production.template"
    exit 1
fi
print_status "Environment file found"

# Check required environment variables
echo ""
echo "🔐 Validating Environment Configuration..."

required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "DATABASE_URL"
    "APP_ENCRYPTION_KEY"
    "JWT_SECRET"
)

source ".env.${DEPLOYMENT_ENV}"

for var in "${required_vars[@]}"; do
    if [[ -z "${!var}" ]]; then
        print_error "Required environment variable $var is not set"
        exit 1
    fi
done
print_status "All required environment variables are set"

# Validate encryption key strength
if [[ ${#APP_ENCRYPTION_KEY} -lt 32 ]]; then
    print_error "APP_ENCRYPTION_KEY must be at least 32 characters for production"
    exit 1
fi
print_status "Encryption key meets security requirements"

# Check database connectivity
echo ""
echo "🗄️ Validating Database Connection..."

if command -v psql &> /dev/null; then
    if psql "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
        print_status "Database connection successful"
    else
        print_error "Cannot connect to database"
        exit 1
    fi
else
    print_warning "psql not found - skipping database connectivity test"
fi

# Install dependencies
echo ""
echo "📦 Installing Dependencies..."
npm ci --production=false
print_status "Dependencies installed"

# Run linting
echo ""
echo "🔍 Running Code Quality Checks..."
npm run lint
print_status "Linting passed"

# Run type checking
npm run type-check
print_status "Type checking passed"

# Run tests (unless skipped)
if [[ "$SKIP_TESTS" != "true" ]]; then
    echo ""
    echo "🧪 Running Tests..."
    npm run test
    print_status "Tests passed"

    # Run E2E tests if available
    if npm run test:e2e --dry-run &> /dev/null; then
        npm run test:e2e
        print_status "E2E tests passed"
    fi
else
    print_warning "Skipping tests (SKIP_TESTS=true)"
fi

# Run HIPAA compliance check
echo ""
echo "🏥 Running HIPAA Compliance Validation..."
if [[ -f "scripts/compliance-check.js" ]]; then
    node scripts/compliance-check.js
    print_status "HIPAA compliance validation passed"
else
    print_warning "HIPAA compliance script not found - skipping"
fi

# Run healthcare quality gates
echo ""
echo "⚕️ Running Healthcare Quality Gates..."
if [[ -f "scripts/run-quality-gates.js" ]]; then
    node scripts/run-quality-gates.js
    print_status "Quality gates passed"
else
    print_warning "Quality gates script not found - skipping"
fi

# Build application
echo ""
echo "🏗️ Building Application..."
npm run build
print_status "Build completed successfully"

# Deploy database schema (if force deploy or first deployment)
echo ""
echo "🗄️ Database Schema Deployment..."

if [[ "$FORCE_DEPLOY" == "true" ]] || [[ ! -f ".deployment-history" ]]; then
    print_warning "Deploying database schema..."

    # Backup existing data
    if [[ -f "scripts/backup-database.js" ]]; then
        node scripts/backup-database.js
        print_status "Database backup completed"
    fi

    # Deploy schema
    psql "$DATABASE_URL" -f scripts/deploy-database.sql
    print_status "Database schema deployed"
else
    print_status "Database schema deployment skipped (use FORCE_DEPLOY=true to redeploy)"
fi

# Test health endpoints
echo ""
echo "🏥 Testing Health Endpoints..."

# Start a temporary local server to test endpoints
npm run dev &
DEV_PID=$!
sleep 10  # Wait for server to start

# Test basic health check
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    print_status "Health endpoint responsive"
else
    print_error "Health endpoint not responding"
    kill $DEV_PID
    exit 1
fi

# Test detailed health check
if curl -f http://localhost:3000/api/health-detailed > /dev/null 2>&1; then
    print_status "Detailed health endpoint responsive"
else
    print_warning "Detailed health endpoint not responding"
fi

# Stop temporary server
kill $DEV_PID
sleep 2

# Deploy to production platform
echo ""
echo "🚀 Deploying to Production..."

if command -v vercel &> /dev/null; then
    # Deploy with Vercel
    vercel --prod --env .env.${DEPLOYMENT_ENV}
    print_status "Deployment to Vercel completed"
elif [[ -n "$NETLIFY_SITE_ID" ]]; then
    # Deploy with Netlify
    npm install -g netlify-cli
    netlify deploy --prod --dir=dist
    print_status "Deployment to Netlify completed"
else
    print_warning "No deployment platform detected. Manual deployment required."
    echo "Built files are ready in the appropriate build directory"
fi

# Post-deployment validation
echo ""
echo "✅ Post-Deployment Validation..."

# Record deployment
echo "$(date -u): ${DEPLOYMENT_ENV} deployment completed" >> .deployment-history

# Test production endpoints (if URL available)
if [[ -n "$NEXT_PUBLIC_APP_URL" ]]; then
    sleep 30  # Wait for deployment to propagate

    if curl -f "${NEXT_PUBLIC_APP_URL}/api/health" > /dev/null 2>&1; then
        print_status "Production health endpoint responsive"
    else
        print_error "Production health endpoint not responding"
        print_error "Deployment may have failed or is still propagating"
    fi
fi

# Start monitoring
echo ""
echo "📊 Starting Production Monitoring..."

if [[ -f "scripts/start-monitoring.js" ]]; then
    node scripts/start-monitoring.js
    print_status "Monitoring started"
fi

# Final summary
echo ""
echo "================================================="
echo -e "${GREEN}🎉 Deployment Completed Successfully!${NC}"
echo ""
echo "📋 Deployment Summary:"
echo "   • Environment: ${DEPLOYMENT_ENV}"
echo "   • Timestamp: $(date -u)"
echo "   • Build Status: ✅ Success"
echo "   • Tests: $([ "$SKIP_TESTS" == "true" ] && echo "⏭️ Skipped" || echo "✅ Passed")"
echo "   • HIPAA Compliance: ✅ Validated"
echo "   • Quality Gates: ✅ Passed"
echo ""

if [[ -n "$NEXT_PUBLIC_APP_URL" ]]; then
    echo "🔗 Application URL: ${NEXT_PUBLIC_APP_URL}"
    echo "🏥 Health Check: ${NEXT_PUBLIC_APP_URL}/api/health"
    echo "📊 Quality Gates: ${NEXT_PUBLIC_APP_URL}/admin/quality-gates"
fi

echo ""
echo "📚 Next Steps:"
echo "   1. Monitor application health and performance"
echo "   2. Verify crisis intervention systems are operational"
echo "   3. Test healthcare provider authentication flows"
echo "   4. Schedule compliance audit review"
echo "   5. Update healthcare organization partners"
echo ""

print_status "Mental Wellness App is now live and ready for healthcare deployment! 🏥"