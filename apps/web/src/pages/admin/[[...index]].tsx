import type { ComponentType } from 'react'

let StudioComponent: ComponentType<{ config: unknown }> | null = null
let studioConfig: unknown = null

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { NextStudio } = require('next-sanity/studio')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  studioConfig = require('../../../../cms/sanity.config').default
  StudioComponent = NextStudio
}

export default function StudioPage() {
  if (StudioComponent && studioConfig) {
    const RenderStudio = StudioComponent
    return <RenderStudio config={studioConfig} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Sanity Studio Unavailable</h1>
        <p className="text-gray-600">
          The embedded Sanity Studio is only available during development. Run
          <code className="block mt-2 text-sm text-gray-800">npm run cms:dev</code>
          from the repository root to launch the full studio experience locally, or deploy the
          dedicated CMS app for production editing workflows.
        </p>
      </div>
    </div>
  )
}
