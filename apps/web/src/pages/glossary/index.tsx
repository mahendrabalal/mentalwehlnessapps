import { GetStaticProps } from 'next'
import Link from 'next/link'
import { SEOHead } from '@/components/SEOHead'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import glossaryData from '@/data/glossary.json'
import { websiteStructuredData } from '@/lib/seo'

interface Term {
  slug: string
  term: string
  definition: string
}

interface GlossaryIndexProps {
  terms: Term[]
}

export default function GlossaryIndex({ terms }: GlossaryIndexProps) {
  // Group terms by first letter for a nice alphabetical directory layout
  const groupedTerms = terms.reduce((acc, currentTerm) => {
    const firstLetter = currentTerm.term[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(currentTerm)
    return acc
  }, {} as Record<string, Term[]>)

  const alphabet = Object.keys(groupedTerms).sort()

  const structuredData = [
    websiteStructuredData(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Mental Health Glossary',
      description: 'A comprehensive dictionary of mental health terms, symptoms, and psychological concepts.',
    }
  ]

  return (
    <>
      <SEOHead
        title="Mental Health Glossary & Dictionary | Mental Wellness App"
        description="A comprehensive dictionary of mental health terms, symptoms, psychological concepts, and wellness terminology."
        canonical="/glossary"
        structuredData={structuredData}
      />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Mental Health Glossary
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Explore our comprehensive dictionary of psychological concepts, mental health conditions, and therapeutic terms.
          </p>
        </div>

        {/* Alphabet Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {alphabet.map(letter => (
            <a 
              key={letter} 
              href={`#letter-${letter}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms List */}
        <div className="space-y-12">
          {alphabet.map(letter => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2 mb-6">
                {letter}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedTerms[letter].sort((a, b) => a.term.localeCompare(b.term)).map(item => (
                  <li key={item.slug}>
                    <Link 
                      href={`/glossary/${item.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                      <span className="text-lg font-medium text-blue-600 group-hover:text-blue-700">
                        {item.term}
                      </span>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.definition}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<GlossaryIndexProps> = async () => {
  return {
    props: {
      terms: glossaryData,
    },
  }
}
