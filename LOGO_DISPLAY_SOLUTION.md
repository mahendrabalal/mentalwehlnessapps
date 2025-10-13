# Logo Display Issue Solution

## Problem
The logo isn't displaying in production on Vercel due to public files not being served correctly from the monorepo structure.

## Root Cause
In a Turbo monorepo, Vercel struggles to serve static files from the `apps/web/public` directory. The issue is that Vercel expects the public files to be at the root of the deployment, but they're nested in the monorepo structure.

## Solution Options

### Option 1: Use Absolute URL for Logo (Recommended)
Replace the relative path with an absolute URL that points to the deployed site:

```tsx
// In both Navbar.tsx and Footer.tsx
<img
  src="https://mentalwellnessapps.com/logo.png"
  alt="MentalWellnessApps"
  className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
  onError={(e) => {
    console.error('Logo failed to load:', e);
    // Fallback to a text logo if image fails
    (e.target as HTMLImageElement).style.display = 'none';
    const parent = (e.target as HTMLImageElement).parentElement;
    if (parent) {
      parent.innerHTML = '<span class="text-xl font-bold">MentalWellnessApps</span>';
    }
  }}
/>
```

### Option 2: Use a Custom Server Route for Serving Static Files
Create a Next.js API route that serves the logo:

```tsx
// Create apps/web/pages/api/logo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const logoBuffer = fs.readFileSync(logoPath);
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(logoBuffer);
  } catch (error) {
    res.status(404).json({ error: 'Logo not found' });
  }
}
```

Then update the logo components to use this API route:
```tsx
<img
  src="/api/logo"
  alt="MentalWellnessApps"
  className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
/>
```

### Option 3: Use a CDN for Static Assets
Upload the logo to a CDN service (like Vercel's own CDN, Cloudinary, etc.) and reference it with an absolute URL.

### Option 4: Use Base64 Encoded Logo
Convert the logo to a base64 string and embed it directly in the component:

```tsx
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

<img
  src={logoBase64}
  alt="MentalWellnessApps"
  className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
/>
```

## Recommended Implementation

For the quickest and most reliable solution, I recommend **Option 1: Use Absolute URL**. This approach:

1. Bypasses all Vercel monorepo static file serving issues
2. Is simple to implement
3. Provides good caching behavior
4. Has a clear fallback strategy

## Next Steps

1. Update the logo components to use an absolute URL
2. Add a fallback text logo in case the image fails to load
3. Test the implementation in both development and production
4. Consider adding a loading state for the logo

## Additional Considerations

1. **CSP Headers**: The current CSP is blocking external scripts. Consider updating the CSP to allow Google Analytics and Stripe if needed.

2. **Environment Variables**: The `NEXT_PUBLIC_SITE_URL` is still showing as undefined. Make sure this is properly set in Vercel's environment variables.

3. **Other Static Files**: The favicon and site.webmanifest are also returning 404 errors. These may need similar treatment.

## Implementation Code

Here's the complete implementation for the Navbar component:

```tsx
// apps/web/src/components/Navbar.tsx
<Link
  href={user ? '/dashboard' : '/?landing=true'}
  className="hover:opacity-80 transition-opacity"
  title={user ? 'Go to Dashboard' : 'Go to Home'}
  onClick={() => setMobileMenuOpen(false)}
>
  <img
    src="https://mentalwellnessapps.com/logo.png"
    alt="MentalWellnessApps"
    className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
    onError={(e) => {
      console.error('Logo failed to load:', e);
      // Fallback to a text logo if image fails
      (e.target as HTMLImageElement).style.display = 'none';
      const parent = (e.target as HTMLImageElement).parentElement;
      if (parent) {
        parent.innerHTML = '<span class="text-xl font-bold">MentalWellnessApps</span>';
      }
    }}
    onLoad={() => {
      console.log('Logo loaded successfully');
    }}
  />
</Link>
```

And for the Footer component:

```tsx
// apps/web/src/components/Footer.tsx
<img
  src="https://mentalwellnessapps.com/logo.png"
  alt="MentalWellnessApps"
  className="h-12 w-auto object-contain brightness-0 invert"
  onError={(e) => {
    console.error('Footer logo failed to load:', e);
    // Fallback to a text logo if image fails
    (e.target as HTMLImageElement).style.display = 'none';
    const parent = (e.target as HTMLImageElement).parentElement;
    if (parent) {
      parent.innerHTML = '<span class="text-xl font-bold text-white">MentalWellnessApps</span>';
    }
  }}
  onLoad={() => {
    console.log('Footer logo loaded successfully');
  }}
/>