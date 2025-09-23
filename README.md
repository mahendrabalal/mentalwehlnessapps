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
│   └── web/                 # Next.js frontend application
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

3. Set up environment variables:
```bash
cp apps/web/.env.example apps/web/.env.local
```

4. Configure your Supabase credentials in `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build all packages and applications
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

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

Please read our contributing guidelines and ensure all tests pass before submitting pull requests.

## License

This project is for educational and therapeutic purposes. See LICENSE file for details.