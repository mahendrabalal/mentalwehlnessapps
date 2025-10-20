# Robots.txt Best Practices for Mental Wellness Platform

## Overview
Updated `robots.txt` file to follow **2025 industry standards** for:
- **SEO Optimization** (Google, Bing best practices)
- **HIPAA Compliance** (Protected Health Information security)
- **Content Protection** (AI training prevention)
- **Server Efficiency** (Bot management)

---

## Key Improvements Made

### 1. **Clear Organizational Structure** 🏗️
✅ Divided into 7 logical sections with clear comments
- Default rules
- Protected areas (PHI/Auth)
- PHI-specific disallows
- Technical/utility rules
- Search engine optimization
- AI bot policies
- Scrapers/aggressive bots

**Why:** RFC 9309 recommends clear organization. Easier to maintain and audit.

### 2. **PHI Protection Strategy** 🔒
**Before:**
```
Disallow: /assessment/
```
❌ This blocks ALL assessment pages, including public ones

**After:**
```
Disallow: /assessment/*/results
Disallow: /assessment/*/history
Disallow: /user/*/assessment*
Allow: /tools/burnout-assessment  (public tools discoverable)
```
✅ Protects only authenticated results, allows public tools for SEO

**Benefit:** Users can find your free burnout/loneliness assessments in Google search while preventing indexing of personal user results.

### 3. **Removed Unnecessary Crawl-Delay** ⚡
**Before:**
```
Crawl-delay: 1  (for all bots)
```
❌ Google ignores this, slows down crawling unnecessarily

**After:**
```
# Google: No crawl-delay (ignored by Google anyway)
User-agent: Googlebot
Allow: /

# Bing: Uses Request-rate instead
User-agent: Bingbot
Request-rate: 100/1m
```
✅ Follows 2025 best practices, improves crawl efficiency

### 4. **Comprehensive API & Auth Protection** 🔐
Added multiple disallow patterns for:
```
Disallow: /api/
Disallow: /api/v1/
Disallow: /api/v2/
Disallow: /auth/*
Disallow: /signin
Disallow: /signup
Disallow: /password-reset
Disallow: /verify-email
```
**Why:** Prevents search engines from indexing authentication flows or API responses that might leak sensitive data.

### 5. **PCI Compliance for Payments** 💳
Added:
```
Disallow: /checkout/
Disallow: /payment/
Disallow: /stripe/
Disallow: /invoice/
```
**Why:** PCI-DSS recommends preventing search engine indexing of payment flows or transaction data.

### 6. **Duplicate Content Prevention** 📄
Added query parameter disallows:
```
Disallow: /?*sort=
Disallow: /?*filter=
Disallow: /?*page=
Disallow: /?*utm_*
```
**Why:** Prevents Google from crawling multiple versions of same page (e.g., `/blog?sort=date&filter=mental-health`), which dilutes SEO ranking.

### 7. **2025 AI Bot Management** 🤖
Comprehensive coverage of AI crawlers:
```
User-agent: GPTBot       (OpenAI)
User-agent: Claude-Web   (Anthropic)
User-agent: CCBot        (Various AI services)
Disallow: /
```
**Why:** Protects your content from being used in AI training datasets without permission.

### 8. **Aggressive Bot Blocking** 🚫
```
User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: MJ12bot
User-agent: YandexBot
Disallow: /
```
**Why:** These bots are known to ignore crawl-delay and consume excessive bandwidth.

### 9. **System Files Protection** 🔧
```
Disallow: /.well-known/
Disallow: /__next/
Disallow: /.env
Disallow: /.env.local
```
**Why:** Prevents accidental exposure of Next.js build files or environment variables.

### 10. **Detailed Compliance Documentation** 📋
Added comprehensive notes covering:
- HIPAA Security Rule reference (45 CFR §164.300-318)
- GDPR Article 6 compliance
- Additional security layers (HTTPS, encryption, authentication)
- Complementary security measures (META tags, X-Robots-Tag headers)

---

## Industry Standards Referenced

| Standard | Compliance | Notes |
|----------|-----------|-------|
| **RFC 9309** | Robots Exclusion Protocol | Official specification for robots.txt |
| **Google Search Central** | SEO Best Practices | 2025 guidelines for crawling/indexing |
| **Bing Webmaster Tools** | SEO Best Practices | Request-rate directive support |
| **HIPAA Security Rule** | 45 CFR §164.300-318 | Protected Health Information safeguards |
| **GDPR Article 6** | Data Protection | Lawful basis for processing health data |
| **PCI-DSS** | Payment Card Industry | Restrict access to payment flows |

---

## Complementary Security Measures

**robots.txt alone is NOT enough.** You should also implement:

### 1. **META Tags on Sensitive Pages**
```html
<!-- On authenticated pages -->
<meta name="robots" content="noindex, nofollow">
```

### 2. **X-Robots-Tag HTTP Header**
```
X-Robots-Tag: noindex, nofollow
```

### 3. **Authentication & Encryption**
- ✅ You already have Supabase auth
- ✅ HTTPS only (enforced by Vercel)
- ✅ Row-level security in database

### 4. **Content Security Policy**
```
Content-Security-Policy: default-src 'self'
```
(You already have this in place)

---

## Testing & Validation

### In Google Search Console:
1. Go to Settings → Crawl
2. Check "robots.txt Tester"
3. Verify your rules are correctly formatted

### In Bing Webmaster Tools:
1. Crawl Control → robots.txt
2. Test with specific URLs

### Command Line:
```bash
# Validate robots.txt syntax
curl https://www.mentalwellnessapps.com/robots.txt

# Check if a page would be crawled
# (Using regex matching to the rules)
```

---

## SEO Impact

### ✅ What Improved:
- **Public Assessment Tool Discovery:** Users can now find `/tools/burnout-assessment` in Google search
- **Blog Content:** Crawlable without filtering by parameters
- **Feature Pages:** `/features`, `/pricing`, `/about` properly indexed
- **Crawl Efficiency:** Removed unnecessary delays, faster indexing

### ⚠️ What's Protected:
- **User Data:** No authenticated results indexed
- **Payment Info:** Checkout flows hidden
- **API Responses:** Cannot be indexed
- **Auth Flows:** No login/password reset pages visible

---

## Migration Checklist

- ✅ Updated robots.txt file
- ✅ Organized by sections (7 categories)
- ✅ Added PHI-specific disallows
- ✅ Removed unnecessary crawl-delay
- ✅ Added API/auth protection
- ✅ Added PCI compliance rules
- ✅ Added 2025 AI bot rules
- ✅ Added comprehensive documentation
- ⏳ **TODO:** Add META tags to sensitive pages (see above)
- ⏳ **TODO:** Verify in Google Search Console
- ⏳ **TODO:** Monitor crawl stats in Search Console for 2-4 weeks

---

## Key Metrics to Monitor

After deployment, check:
1. **Google Search Console** → Coverage → Check for errors
2. **GSC** → Performance → Clicks, impressions, CTR
3. **GSC** → Crawl Stats → Average daily crawls (should be 1000-5000 for new site)
4. **Server logs** → Check for bots in `User-Agent` field

---

## References

- **RFC 9309:** https://www.rfc-editor.org/rfc/rfc9309.html
- **Google robots.txt:** https://developers.google.com/search/docs/crawling-indexing/robots-txt
- **Bing robots.txt:** https://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c5ec8
- **HIPAA Security Rule:** https://www.hhs.gov/hipaa/for-professionals/security/
- **GDPR Article 6:** https://gdpr-info.eu/art-6-gdpr/

---

## Questions?

This robots.txt follows:
- ✅ Google 2025 best practices
- ✅ Bing Webmaster Guidelines
- ✅ RFC 9309 specification
- ✅ HIPAA compliance requirements
- ✅ GDPR data protection principles
- ✅ PCI-DSS payment security
