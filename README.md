# Mental Wellness App

AI-powered mental wellness platform with clinical validation and crisis intervention capabilities.

## Features

- **Clinical Assessments**: PHQ-9, GAD-7, and other validated mental health screening tools
- **Crisis Intervention**: Real-time monitoring with immediate intervention protocols
- **Therapeutic Support**: AI-powered therapeutic conversations and mood tracking
- **Provider Portal**: Healthcare provider dashboard for patient monitoring
- **HIPAA Compliance**: Secure handling of healthcare data

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Monorepo**: Turborepo

## Project Structure

```
mental-wellness-app/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── cms/                 # Sanity Studio workspace for content authors
├── packages/
│   ├── shared/              # Shared TypeScript types and utilities
│   └── config/              # Configuration packages
│       ├── eslint-config/   # ESLint configuration
│       └── typescript-config/ # TypeScript configuration
└── docs/                    # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental-wellness-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables for the web app and Studio:
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.local.example apps/cms/.env.local
```

4. Configure your Supabase credentials in `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Add your Sanity project values to `apps/web/.env.local` (used at build/runtime) and
   `apps/cms/.env.local` (used by Sanity CLI):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-25
SANITY_PREVIEW_TOKEN=token_with_read_rights
SANITY_PREVIEW_SECRET=random_string_for_preview_api
SANITY_REVALIDATE_SECRET=random_string_for_webhooks

SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_ENABLE_PREVIEW=true
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server (Next.js + Supabase)
- `npm run cms:dev` - Run Sanity Studio locally at `http://localhost:3000/admin`
- `npm run cms:build` - Build the Studio for deployment
- `npm run cms:deploy` - Deploy the Studio to Sanity managed hosting
- `npm run build` - Build all packages and applications
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Sanity CMS Workflow

1. Create a new project in [Sanity Manage](https://www.sanity.io/manage) and note the Project ID.
2. Fill in the Sanity environment variables described above.
3. Seed the Studio (optional) by running `npm run cms:dev` and creating entries for:
   - `Site Settings` (global disclaimer + metadata)
   - Authors
   - Articles (hero image, SEO, clinical review metadata)
4. Publish an article and visit `http://localhost:3000/blog` to see it rendered in the web app.
5. Configure a webhook in Sanity to `POST https://your-domain/api/revalidate/sanity?secret=SANITY_REVALIDATE_SECRET` so published updates trigger ISR revalidation.

Preview drafts:

```bash
curl "http://localhost:3000/api/preview?secret=SANITY_PREVIEW_SECRET&slug=blog/sample-article"
```

Exit preview mode at `http://localhost:3000/api/exit-preview`.

## Documentation

- [Market Research](docs/market-research.md)
- [Product Requirements Document](docs/prd.md)
- [Frontend Specification](docs/front-end-spec.md)
- [System Architecture](docs/architecture.md)

## Crisis Support

This application includes crisis intervention features. If you're experiencing a mental health emergency:

- **Call 988** (Suicide & Crisis Lifeline)
- **Text HOME to 741741** (Crisis Text Line)
- **Call 911** for immediate emergency assistance

## Contributing

Please review the [Repository Guidelines](AGENTS.md) and ensure all tests pass before submitting pull requests.

## License

This project is for educational and therapeutic purposes. See LICENSE file for details.
