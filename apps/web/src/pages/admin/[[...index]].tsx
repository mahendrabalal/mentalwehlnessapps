import { NextStudio } from 'next-sanity/studio'
import { NextStudioHead } from 'next-sanity/studio/head'
import config from '../../../../cms/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

export function Head() {
  return (
    <NextStudioHead
      title="Mental Wellness Studio"
      favicons={false}
    />
  )
}
