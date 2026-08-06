import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { SEOHead } from '@/components/SEOHead'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import glossaryData from '@/data/glossary.json'
import { medicalWebPageStructuredData } from '@/lib/seo'

interface Term {
  slug: string
  term: string
  definition: string
  relatedKeywords: string[]
}

interface GlossaryTermProps {
  termData: Term
}

export default function GlossaryTerm({ termData }: GlossaryTermProps) {
  const structuredData = [
    medicalWebPageStructuredData({
      name: termData.term,
      description: termData.definition,
      slug: `/glossary/${termData.slug}`
    })
  ]

  return (
    <>
      <SEOHead
        title={`What is ${termData.term}? Definition & Meaning | Mental Wellness App`}
        description={termData.definition}
        canonical={`/glossary/${termData.slug}`}
        structuredData={structuredData}
      />
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <Link 
          href="/glossary" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-8"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Back to Glossary
        </Link>
        
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Mental Health Glossary</span>
              <span>•</span>
              <span className="capitalize">{termData.term[0]}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              {termData.term}
            </h1>
            
            <div className="prose prose-blue prose-lg max-w-none text-gray-700">
              <p className="lead text-xl text-gray-600 font-medium mb-8">
                {termData.definition}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Understanding {termData.term}
              </h2>
              <p>
                {termData.term} is a critical concept in psychology and mental health. While the clinical definition above provides a baseline, it's important to understand how this manifests in daily life. Individuals experiencing or dealing with {termData.term.toLowerCase()} may notice impacts on their emotional regulation, daily functioning, or interpersonal relationships.
              </p>
              <p>
                Recognizing the signs is the first step toward managing its impact. If you or someone you know is struggling, remember that professional support and evidence-based tools can make a significant difference.
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Related Search Terms</h3>
              <div className="flex flex-wrap gap-2">
                {termData.relatedKeywords.map((keyword) => (
                  <span 
                    key={keyword} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-8 sm:p-10 border-t border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need Support?</h3>
            <p className="text-gray-600 mb-6">
              Explore our free, evidence-based interactive tools to help you manage your mental wellness.
            </p>
            <Link 
              href="/tools" 
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse Free Tools
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = glossaryData.map((item) => ({
    params: { term: item.slug },
  }))

  return {
    paths,
    fallback: false, // Return 404 for unknown terms
  }
}

export const getStaticProps: GetStaticProps<GlossaryTermProps> = async ({ params }) => {
  const slug = params?.term as string
  const termData = glossaryData.find((item) => item.slug === slug)

  if (!termData) {
    return { notFound: true }
  }

  return {
    props: {
      termData,
    },
  }
}
