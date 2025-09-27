const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './apps/web',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/apps/web/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/apps/web/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/web/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'apps/web/src/**/*.{js,jsx,ts,tsx}',
    '!apps/web/src/**/*.d.ts',
    '!apps/web/src/**/*.stories.{js,jsx,ts,tsx}',
    '!apps/web/src/pages/**/*.{js,jsx,ts,tsx}', // Exclude Next.js pages from coverage
  ],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Healthcare-specific components require higher coverage
    'apps/web/src/hooks/useAuth.ts': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'apps/web/src/components/AuthGuard.tsx': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'apps/web/src/components/CrisisInterventionSystem.tsx': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    'apps/web/src/lib/healthcare-quality-gates.ts': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  // Healthcare-specific test configuration
  testTimeout: 10000, // Longer timeout for healthcare integration tests
  verbose: true,
  // Mock external services for healthcare testing
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/apps/web/src/$1',
  },
  // Healthcare compliance testing setup
  globals: {
    'HIPAA_TESTING_MODE': true,
    'CRISIS_SIMULATION_MODE': true,
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)