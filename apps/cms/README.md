# Mental Wellness Studio

This workspace hosts the Sanity Studio for long-form content, clinical articles, and disclaimers served to the Next.js app at `/blog`.

## Local Development

```bash
npm run cms:dev
```

Studio will be available at `http://localhost:3000/admin` when proxied through Next.js, or `http://localhost:3333` when running the CLI directly.

## Required Environment Variables

Copy `.env.local.example` to `.env.local` and populate the following keys from Sanity Manage:

```
SANITY_PROJECT_ID=your_project_id
SANITY_STUDIO_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_ENABLE_PREVIEW=true
# Optional: override the default API version if you need unreleased fields.
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-25
```

Optional:

```
SANITY_STUDIO_READ_TOKEN=token_with_read_rights
```

## Deploying the Studio

Use the Sanity CLI to push changes:

```bash
npm run cms:deploy
```

This will deploy the Studio to Sanity's managed hosting.

## Schemas

- `article`: Long-form content with HIPAA disclaimer overrides and clinical review metadata.
- `author`: Contributor biographies with credentials and headshots.
- `siteSettings`: Global disclaimers and social metadata.
- `callout` object: Reusable inline callouts with critical/info/success variants.

Adjust schemas in `apps/cms/schemas` as new content types are required.
