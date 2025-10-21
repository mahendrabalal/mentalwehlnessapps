# Dashboard Quick Reference Guide

## 🎯 What Is Progressive Disclosure?

**Definition**: Show essential information first, hide advanced features behind expandable sections.

**Why It Works for Mental Health**:
- Users in distress can't process complex information
- Reduces cognitive load (especially critical for anxiety/depression)
- Meets accessibility standards (WCAG 2.2 AA)
- Improves mobile experience (easier to navigate)

---

## 📱 Dashboard Structure

### Tier 1: Always Visible (Above the Fold)
- **Greeting**: "Good evening, mahendrabalal! 👋"
- **Mood Check-In**: 5 emoji buttons (😭 😰 😔 😐 😊)
- **Smart Recommendation**: Context-aware card based on latest assessment
- **Streak Display**: Current streak with "Click to see details ▼"

**👉 User sees all of this in first 3 seconds**

### Tier 2: Collapsible Details
User clicks "Click to see details ▼" → Expands to show:
- 7-day mood sparkline
- Latest assessment score
- Trend direction (improving/declining/stable)
- Link to "View Full History"

### Tier 3: Deep Dive (Separate Page/Modal)
User clicks "View Full History" → Opens modal/page with:
- Detailed charts and analytics
- All assessments and trends
- Mood entry history
- Export options

---

## 🔴 Crisis Detection Logic

```
Your Assessment Score
        ↓
Risk Level Check
        ↓
    ├─ CRITICAL (Red 🚨)
    │  PHQ-9 ≥ 20  OR  GAD-7 ≥ 15  OR  Burnout ≥ 50
    │  → Show: 988 Lifeline, Safety Plan, Crisis Resources
    │
    ├─ HIGH (Orange ⚠️)
    │  PHQ-9 10-19  OR  GAD-7 8-14  OR  Burnout 30-49
    │  → Show: Support Resources, Self-Help Tools
    │
    ├─ LOW (Green 💚)
    │  PHQ-9 < 10  AND  GAD-7 < 8  AND  Burnout < 30
    │  → Show: Maintenance Tips, Prevention Content
    │
    └─ NO ASSESSMENT (Gray 📝)
       Never assessed or > 7 days ago
       → Show: "Take Assessment" prompt
```

---

## ♿ Accessibility Features

### For Users with Disabilities
- ✅ **Touch Targets**: All buttons are 44×44px (mobile standard)
- ✅ **Focus Indicators**: 3px ring around focused elements
- ✅ **Screen Readers**: All interactive elements labeled
- ✅ **Keyboard Navigation**: Tab through all elements
- ✅ **Reduced Motion**: Animations disabled for users who need it

### Testing Checklist
- [ ] Tab through entire dashboard (keyboard only)
- [ ] Use screen reader (VoiceOver, NVDA, JAWS)
- [ ] Check with high contrast mode ON
- [ ] Test with reduced motion preference enabled
- [ ] Zoom to 200% and verify readability

---

## 📊 Component Architecture

```
Dashboard (pages/dashboard/index.tsx)
├── Navbar
├── Tier 1: Primary Experience
│   ├── Personalized Greeting
│   ├── MoodCheckInWidget (5 emoji buttons)
│   ├── SmartRecommendation (context card)
│   └── ProgressSummaryCollapsible (streak + ▼)
│
├── Tier 2: Supporting Tools
│   ├── QuickAnxietyRelief
│   ├── BurnoutRiskIndicator
│   ├── MindfulnessForBeginners
│   ├── EmotionalRegulationToolkit
│   └── AffordableCareDirectory
│
└── Tier 3: Analytics
    ├── CollapsibleSection (hidden by default)
    │   ├── Stats Grid
    │   ├── Recent Assessments
    │   └── Recent Check-ins
    └── DetailsPage (separate route)
```

---

## 🎨 Key Components

### 1. MoodCheckInWidget
**What it does**: Let users quickly select their mood

**Code location**: `apps/web/src/components/MoodCheckInWidget.tsx`

```tsx
// Usage
<MoodCheckInWidget user={user} className="mb-6" />
```

**Features**:
- 5 mood levels with emojis
- 44px buttons (accessible)
- Optional note field
- Saves to database

### 2. SmartRecommendation
**What it does**: Show context-aware recommendation based on assessment

**Code location**: `apps/web/src/components/SmartRecommendation.tsx`

```tsx
// Usage
<SmartRecommendation
  assessments={assessments}
  userFirstName={user.email?.split('@')[0]}
/>
```

**Features**:
- Automatic risk detection
- Color-coded urgency (red/orange/green)
- Direct action buttons
- Crisis resource links

### 3. CollapsibleSection
**What it does**: Hide/show content with accessible disclosure pattern

**Code location**: `apps/web/src/components/CollapsibleSection.tsx`

```tsx
// Usage
<CollapsibleSection
  id="progress-summary"
  title="Your Streak"
  icon="🔥"
  summary="Click to see details"
  defaultExpanded={false}
>
  {/* Hidden content */}
</CollapsibleSection>
```

**Features**:
- ARIA labels (aria-expanded, aria-controls)
- Smooth animations
- Respects reduced-motion
- Analytics tracking

### 4. ProgressSummaryCollapsible
**What it does**: Show streak and mood trend in collapsible card

**Code location**: `apps/web/src/components/ProgressSummaryCollapsible.tsx`

```tsx
// Usage
<ProgressSummaryCollapsible
  moodEntries={moodEntries}
  assessments={assessments}
  currentStreak={stats.currentStreak}
/>
```

**Features**:
- 7-day sparkline visualization
- Recent assessment display
- Links to full history
- Animated sparkline

### 5. BottomSheetModal
**What it does**: Mobile-optimized modal that slides up from bottom

**Code location**: `apps/web/src/components/BottomSheetModal.tsx`

```tsx
// Usage
<BottomSheetModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Your History"
  height="half"
>
  {/* Content */}
</BottomSheetModal>
```

**Features**:
- Draggable to dismiss
- Tap outside to dismiss
- Smooth transitions
- Mobile-first design

---

## 🧠 Smart Recommendation Engine

**Location**: `apps/web/src/services/recommendationEngine.ts`

**How It Works**:
1. Look at latest assessment
2. Calculate risk level (critical/high/low/none)
3. Generate appropriate recommendation
4. Return emoji, title, description, action button

```tsx
// Example
const risk = assessRiskLevel(assessments)
const recommendation = getRecommendation(risk, userName)

// Returns:
{
  urgency: 'critical' | 'high' | 'low' | 'none',
  emoji: '🚨',
  title: 'Crisis Support Available',
  description: '...',
  action: { label: 'Get Help', href: '/crisis/support' }
}
```

---

## 📈 Analytics Events

The dashboard tracks key events for optimization:

```javascript
// Section Expansion
window.gtag('event', 'section_toggle', {
  section_id: 'progress-summary',
  expanded: true
})

// Recommendation Action
// (Automatically tracked via Link clicks)

// Assessment Complete
// (Tracked by assessment components)
```

**Metrics to Monitor**:
- Time to first action (goal: <3 seconds)
- Section expansion rate (goal: 30-40%)
- Recommendation CTA click rate (goal: >60%)
- Mobile vs desktop engagement
- Return rate within 24 hours (goal: >50%)

---

## 🔧 Common Tasks

### Add New Recommendation Type
1. Edit `recommendationEngine.ts`
2. Add new severity threshold
3. Create recommendation text
4. Update SmartRecommendation styles if needed

### Change Mood Check-In Options
1. Edit `MoodCheckInWidget.tsx`
2. Modify `MOOD_OPTIONS` array
3. Update emoji/label/colors as needed
4. Test accessibility (44px buttons)

### Hide/Show Tier 2 Sections
1. Edit `pages/dashboard/index.tsx`
2. Wrap sections in `{user && ...}` to hide from guests
3. Or use `<details>` element for collapsible

### Add New Analytics Event
1. Add to relevant component
2. Use `window.gtag('event', 'event_name', {...})`
3. Verify event in Google Analytics after 24h

---

## 🚀 Performance Tips

### For Development
- Use `<CollapsibleSection>` for sections below Tier 1
- Keep Tier 1 minimal (≤3 elements)
- Lazy load Tier 3 content
- Test on 3G network (Chrome DevTools)

### For Mobile Optimization
- Use `BottomSheetModal` instead of full-screen modals
- Keep buttons 44×44px minimum
- Test with real devices (not just browser emulation)
- Verify touch target spacing

### For Accessibility
- Always include `aria-label` on buttons
- Test with keyboard navigation (Tab key)
- Verify focus indicators visible
- Test with screen reader

---

## 🐛 Debugging

### Check if Progressive Disclosure is Working
```javascript
// In browser console
document.querySelectorAll('[aria-expanded]')
// Should show all collapsible sections

// Check aria-expanded status
document.querySelector('#progress-summary').getAttribute('aria-expanded')
// Should toggle between 'true' and 'false'
```

### Verify Crisis Detection
```javascript
// Mock high-risk assessment
const riskAssessment = {
  phq9_score: 25, // > 20 = critical
  // Should show red 🚨 card
}
```

### Check Mobile Responsiveness
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test on: iPhone 12, Samsung Galaxy S20, iPad
4. Verify buttons are easily tappable

---

## 📚 Related Files

### Core Implementation
- Dashboard Page: `apps/web/src/pages/dashboard/index.tsx`
- Components: `apps/web/src/components/*`
- Services: `apps/web/src/services/recommendationEngine.ts`
- Types: `apps/web/src/types/assessment-features.ts`

### Database
- Migrations: `apps/web/supabase/migrations/20250118_*.sql`
- Assessment types supported: PHQ-9, GAD-7, Burnout, Stigma, Social Connection

### Documentation
- Implementation Status: `DASHBOARD_IMPLEMENTATION_STATUS.md`
- Recommendations: `DASHBOARD_RECOMMENDATION.md` (archived reference)

---

## ✨ Key Principles

1. **Simplicity First**: Show only what's essential
2. **Progressive**: Add complexity on demand
3. **Contextual**: Adapt based on user state
4. **Accessible**: Follow WCAG 2.2 AA standards
5. **Crisis-Safe**: Detect and surface help immediately
6. **Mobile-First**: Design for small screens first
7. **Data-Driven**: Track everything, optimize based on metrics

---

**Last Updated**: 2025-10-21
**Version**: 1.0 - Production Ready
