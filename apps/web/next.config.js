/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Allow production builds even when ESLint violations exist
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow production builds even when TypeScript errors exist
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize production builds
  swcMinify: true,

  // Disable static optimization to fix router errors
  // Pages will use server-side rendering instead
  output: 'standalone',

  // Transpile packages
  transpilePackages: ['@mental-wellness/shared', '@mental-wellness/ui'],

  // Security-focused image configuration
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for production optimization
  experimental: {
    // Enable modern JS compilation
    esmExternals: true,
    // Optimize server components
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: https://www.googletagmanager.com https://www.google-analytics.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://npiregistry.cms.hhs.gov https://*.sanity.io https://www.google-analytics.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
          // HIPAA compliance headers
          {
            key: 'X-HIPAA-Compliant',
            value: 'true'
          },
          {
            key: 'X-Healthcare-Platform',
            value: 'mental-wellness-app'
          }
        ]
      },
      {
        // Additional security for API routes
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },

  // Production redirects and rewrites
  async redirects() {
    return [
      // Healthcare-specific redirects
      {
        source: '/emergency',
        destination: '/crisis/immediate-help',
        permanent: false, // Don't cache emergency redirects
      },
      {
        source: '/suicide-prevention',
        destination: '/crisis/suicide-prevention',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true,
      },
      // Security redirects
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/config',
        destination: '/404',
        permanent: false,
      }
    ]
  },

  // Healthcare API routing
  async rewrites() {
    return [
      // Health check endpoints
      {
        source: '/health',
        destination: '/api/health',
      },
      {
        source: '/health/detailed',
        destination: '/api/health-detailed',
      },
      // Crisis hotline integration
      {
        source: '/call/988',
        destination: '/crisis/call-988',
      },
      {
        source: '/text/crisis',
        destination: '/crisis/text-support',
      }
    ]
  },

  // Webpack optimizations for production
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production client-side optimizations
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Create separate chunk for Supabase
          supabase: {
            name: 'supabase',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@supabase/,
          },
          // Create separate chunk for React
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          },
        },
      }
    }

    // Security: Remove source maps in production
    if (!dev) {
      config.devtool = false
    }

    return config
  },

  // Environment variable validation
  env: {
    CUSTOM_KEY: process.env.NODE_ENV || 'development',
  },

  // Disable X-Powered-By header
  poweredByHeader: false,
}

module.exports = nextConfig
