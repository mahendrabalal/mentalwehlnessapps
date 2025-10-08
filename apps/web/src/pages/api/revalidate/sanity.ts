import type { NextApiRequest, NextApiResponse } from 'next'

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

export default async function sanityRevalidateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  if (!REVALIDATE_SECRET) {
    return res
      .status(500)
      .json({ message: 'Missing SANITY_REVALIDATE_SECRET environment variable.' })
  }

  const { secret } = req.query
  if (secret !== REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret.' })
  }

  try {
    const slug =
      typeof req.body?.slug === 'string'
        ? req.body.slug
        : Array.isArray(req.body?.ids)
          ? req.body.ids[0]
          : null

    await res.revalidate('/blog')

    if (slug) {
      await res.revalidate(`/blog/${slug}`)
    }

    return res.json({ revalidated: true, slug })
  } catch (error) {
    return res.status(500).json({ revalidated: false, error: `${error}` })
  }
}
