import type { NextApiRequest, NextApiResponse } from 'next'

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET

export default async function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!PREVIEW_SECRET) {
    return res.status(500).json({
      message: 'Preview mode is not configured. Missing SANITY_PREVIEW_SECRET.',
    })
  }

  const { secret, slug = '' } = req.query

  if (secret !== PREVIEW_SECRET || typeof slug !== 'string') {
    return res.status(401).json({ message: 'Invalid preview credentials.' })
  }

  res.setPreviewData({})
  res.writeHead(307, { Location: slug.startsWith('/') ? slug : `/blog/${slug}` })
  res.end()
}
