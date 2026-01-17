import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
                'User-Agent': 'MentalWellnessApp/1.0',
            },
        })

        if (!response.ok) {
            throw new Error(`Upstream API failed with status: ${response.status}`)
        }

        const data = await response.json()

        // Cache the result for 1 hour to handle rate limits better
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
        res.status(200).json(data)
    } catch (error) {
        // Silently fail on rate limits to avoid log spam
        res.status(200).json({})
    }
}
