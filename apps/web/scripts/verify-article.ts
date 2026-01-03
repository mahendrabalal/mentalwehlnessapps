
import { getSanityClient } from '../lib/cms/client'
import { articleBySlugQuery } from '../lib/cms/queries'

// Mock environment setup if needed, but it should pull from .env.local if executed with dotenv
// We'll trust the executed context or standard 'npm run dev' environment

async function verify() {
    console.log('Verifying Sanity connectivity...')
    try {
        const client = getSanityClient()
        const slug = 'mental-wellness-month-january'
        console.log(`Fetching article with slug: ${slug}`)

        // Explicitly disabling CDN to ensure we see fresh data
        const noCdnClient = client.withConfig({ useCdn: false })

        const data = await noCdnClient.fetch(articleBySlugQuery, { slug })

        if (data) {
            console.log('SUCCESS: Article found!')
            console.log('Title:', data.title)
            console.log('ID:', data._id)
        } else {
            console.log('FAILURE: Article NOT found.')

            // Try listing all slugs to see what exists
            console.log('Listing available slugs...')
            const all = await noCdnClient.fetch('*[_type == "article"]{ "slug": slug.current, title }')
            console.log('Available articles:', JSON.stringify(all, null, 2))
        }
    } catch (error) {
        console.error('ERROR during verification:', error)
    }
}

verify()
