# Production Deployment Guide

## 🚀 **Mental Wellness App - Production Deployment**

This guide provides step-by-step instructions for deploying the Mental Wellness App to production with enterprise-grade security and HIPAA compliance.

## **Prerequisites**

### **Infrastructure Requirements**
- [ ] **Domain Name**: Registered domain with SSL certificate
- [ ] **Hosting Platform**: Vercel, AWS, or Docker-compatible platform
- [ ] **Database**: Supabase Production Project
- [ ] **CDN**: CloudFlare or AWS CloudFront
- [ ] **Monitoring**: Sentry account for error tracking
- [ ] **Email Service**: SMTP service for notifications

### **Security Requirements**
- [ ] **SSL/TLS Certificate**: Valid certificate for your domain
- [ ] **Environment Variables**: Secure secret management
- [ ] **Backup Strategy**: Automated database backups
- [ ] **Monitoring Setup**: Health checks and alerting

## **Step-by-Step Deployment**

### **1. Environment Setup**

#### **Create Production Environment File**
```bash
cp .env.production.example .env.production
```

#### **Configure Production Variables**
Edit `.env.production` with your production values:

```env
# Required Production Variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
NEXTAUTH_SECRET=your-secure-secret-key
```

### **2. Database Setup**

#### **Create Production Supabase Project**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project for production
3. Note down the URL and API keys
4. Configure database region (US for HIPAA compliance)

#### **Deploy Database Schema**
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your production project
supabase link --project-ref your-project-ref

# Deploy database schema
supabase db push
```

#### **Verify RLS Policies**
```sql
-- Test RLS policies in SQL editor
SELECT * FROM user_profiles WHERE auth.uid() = id;
```

### **3. Security Configuration**

#### **SSL/TLS Setup**
- Configure SSL certificate for your domain
- Enable HSTS (HTTP Strict Transport Security)
- Set up automatic certificate renewal

#### **Security Headers Verification**
```bash
# Test security headers
curl -I https://your-domain.com

# Expected headers:
# Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: [configured policy]
```

### **4. Application Deployment**

#### **Option A: Vercel Deployment**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure Project**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   vercel env add SUPABASE_SERVICE_ROLE_KEY production
   vercel env add NEXTAUTH_SECRET production
   ```

#### **Option B: Docker Deployment**

1. **Build Docker Image**
   ```bash
   docker build -t mental-wellness-app .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     --name mental-wellness-app \
     -p 3000:3000 \
     --env-file .env.production \
     mental-wellness-app
   ```

#### **Option C: AWS/Cloud Deployment**
- Use provided CI/CD pipeline in `.github/workflows/`
- Configure AWS credentials or cloud provider settings
- Deploy using GitHub Actions

### **5. Domain and DNS Configuration**

#### **DNS Records**
```
A     @          your-server-ip
CNAME www        your-domain.com
CNAME api        your-domain.com
```

#### **Subdomain Setup (Optional)**
```
CNAME app        your-domain.com  # Main application
CNAME admin      your-domain.com  # Admin dashboard
CNAME api        your-domain.com  # API endpoints
```

### **6. Monitoring and Health Checks**

#### **Health Check Verification**
```bash
curl https://your-domain.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": "healthy",
    "auth": "healthy"
  }
}
```

#### **Set Up Monitoring**
1. **Uptime Monitoring**: Configure external monitoring service
2. **Error Tracking**: Set up Sentry alerts
3. **Performance Monitoring**: Enable APM tools
4. **Log Aggregation**: Configure log collection

### **7. Security Hardening**

#### **Firewall Configuration**
- Allow only necessary ports (80, 443)
- Block direct database access
- Configure IP whitelisting if needed

#### **Rate Limiting Verification**
```bash
# Test rate limiting
for i in {1..10}; do
  curl -s -o /dev/null -w "%{http_code}\n" https://your-domain.com/api/auth/login
done
```

#### **Security Scanning**
```bash
# Run security audit
npm audit --audit-level=high

# OWASP ZAP baseline scan
docker run -v $(pwd):/zap/wrk/:rw \
  -t owasp/zap2docker-stable zap-baseline.py \
  -t https://your-domain.com
```

### **8. Backup and Recovery**

#### **Database Backup Configuration**
1. Enable automated backups in Supabase
2. Configure backup retention (90 days minimum)
3. Test backup restoration process
4. Document recovery procedures

#### **Application Backup**
1. Source code repository backup
2. Environment configuration backup
3. SSL certificate backup
4. DNS configuration backup

### **9. Compliance Verification**

#### **HIPAA Compliance Checklist**
- [ ] **Business Associate Agreement** signed with all vendors
- [ ] **Risk Assessment** completed and documented
- [ ] **Audit Logging** enabled and tested
- [ ] **Access Controls** implemented and verified
- [ ] **Encryption** enabled for data at rest and in transit
- [ ] **Backup Procedures** tested and documented
- [ ] **Incident Response Plan** documented and tested
- [ ] **Staff Training** completed and documented

#### **Security Assessment**
- [ ] **Penetration Testing** completed
- [ ] **Vulnerability Scanning** passed
- [ ] **Code Security Review** completed
- [ ] **Infrastructure Security** verified
- [ ] **Third-party Security** assessments completed

### **10. Go-Live Procedures**

#### **Pre-Launch Checklist**
- [ ] All environment variables configured
- [ ] Database schema deployed
- [ ] SSL certificate active
- [ ] Monitoring systems active
- [ ] Backup procedures tested
- [ ] Security measures verified
- [ ] Performance testing completed
- [ ] User acceptance testing passed

#### **Launch Day**
1. **Final Deployment**
   ```bash
   # Deploy to production
   vercel --prod
   # or
   docker-compose up -d
   ```

2. **Verification Steps**
   ```bash
   # Health check
   curl https://your-domain.com/api/health

   # User registration test
   curl -X POST https://your-domain.com/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}'

   # Database connectivity
   curl https://your-domain.com/api/dashboard
   ```

3. **Monitoring Activation**
   - Enable all monitoring alerts
   - Start health check monitoring
   - Begin audit log collection

#### **Post-Launch Monitoring**
- Monitor error rates for first 24 hours
- Check performance metrics
- Verify security alerts are working
- Monitor user feedback and support requests

### **11. Maintenance Procedures**

#### **Daily Operations**
- Review health check status
- Monitor error rates and alerts
- Check security audit logs
- Verify backup completion

#### **Weekly Maintenance**
- Security log review
- Performance optimization
- Backup verification
- User feedback analysis

#### **Monthly Reviews**
- Security policy updates
- Compliance audit
- Performance benchmarking
- Cost optimization review

## **Troubleshooting**

### **Common Issues**

#### **SSL Certificate Issues**
```bash
# Check certificate status
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Verify certificate chain
curl -vI https://your-domain.com
```

#### **Database Connection Issues**
```bash
# Test database connectivity
psql "postgresql://postgres:[password]@[host]:5432/postgres"

# Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'user_profiles';
```

#### **Authentication Issues**
```bash
# Verify Supabase configuration
curl -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key" \
     https://your-project.supabase.co/rest/v1/user_profiles
```

### **Support Contacts**

- **Technical Support**: tech-support@your-domain.com
- **Security Issues**: security@your-domain.com
- **Emergency Contact**: +1-XXX-XXX-XXXX

---

## **🎉 Congratulations!**

Your Mental Wellness App is now deployed to production with enterprise-grade security and HIPAA compliance. The application is ready to serve users safely and securely.

### **Next Steps**
1. Monitor application performance and user feedback
2. Plan Phase 3: Healthcare Integration features
3. Schedule regular security assessments
4. Begin user onboarding and training

**The BMad Method has successfully delivered a production-ready mental health platform!**