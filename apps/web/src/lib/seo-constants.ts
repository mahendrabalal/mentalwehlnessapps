/**
 * SEO Constants - Last Modified Dates
 *
 * Best Practice: Use static timestamps instead of dynamic dates (new Date())
 * This ensures search engines can properly detect real content changes.
 *
 * Update these dates when making significant content changes to pages.
 */

// Last modified date for homepage - Update manually when content changes
export const HOMEPAGE_LAST_MODIFIED = '2025-10-30T11:25:40+00:00'

// Published date for homepage
export const HOMEPAGE_PUBLISHED = '2024-01-01T00:00:00Z'

/**
 * Helper to get build-time timestamp
 * For automated builds, you can replace this with process.env.BUILD_TIME
 */
export const BUILD_TIME = '2025-10-30T11:25:40+00:00'

/**
 * Support Pages - Published and Modified Dates
 * Update the modified date when making significant content changes to each page
 */
export const SUPPORT_PAGES_DATES = {
  'managing-anxiety-naturally': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'emotional-regulation-skills': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'emotional-exhaustion-burnout': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'mindfulness-for-beginners': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'meditation-consistency': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'emotional-resistance-meditation': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'affordable-mental-health-care': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'realistic-mental-health-expectations': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'combat-loneliness-isolation': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'overcome-mental-health-stigma': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'trauma-recovery': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'sleep-mental-health': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'relationships-mental-health': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'insight-mental-wellness': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'balanced-mental-wellness': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'world-teen-mental-wellness-day': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'index': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  }
} as const

/**
 * Tools Pages - Published and Modified Dates
 * Update the modified date when making significant content changes to each page
 */
export const TOOLS_PAGES_DATES = {
  'mindfulness': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'emotional-regulation': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'therapy-cost-calculator': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'stigma-assessment': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'meditation-tracker': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'recovery-timeline': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'substance-screening': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'emotional-exhaustion-recovery': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'loneliness-assessment': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'stress-management-techniques': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'anxiety-relief': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'depression-screening': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'burnout-assessment': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  },
  'free-mental-health-tools': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-10-30T11:25:40+00:00'
  }
} as const

/**
 * Blog Pages - Published and Modified Dates
 * Update the modified date when making significant content changes to each page
 */
export const BLOG_PAGES_DATES = {
  'index': {
    published: '2024-01-01T00:00:00Z',
    modified: '2025-11-01T00:00:00+00:00'
  }
} as const
