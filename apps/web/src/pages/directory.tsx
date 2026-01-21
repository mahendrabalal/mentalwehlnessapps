import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'

interface WellnessResource {
    name: string
    url: string
    description: string
    category: string
    features: string[]
    isFree: boolean
    isNonProfit?: boolean
}

const mentalWellnessResources: WellnessResource[] = [
    // Crisis & Emergency Support
    {
        name: 'National Suicide Prevention Lifeline (988)',
        url: 'https://988lifeline.org',
        description: '24/7 crisis support for anyone experiencing suicidal thoughts, emotional distress, or mental health crisis.',
        category: 'crisis',
        features: ['24/7 availability', 'Crisis counseling', 'Chat & text support'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'Crisis Text Line',
        url: 'https://www.crisistextline.org',
        description: 'Free, 24/7 text support for people in crisis. Text HOME to 741741.',
        category: 'crisis',
        features: ['Text-based support', '24/7 availability', 'Anonymous'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'International Association for Suicide Prevention',
        url: 'https://www.iasp.info/resources/Crisis_Centres/',
        description: 'Global directory of crisis centers and suicide prevention resources worldwide.',
        category: 'crisis',
        features: ['International resources', 'Crisis center directory'],
        isFree: true,
        isNonProfit: true
    },

    // Major Mental Health Organizations
    {
        name: 'NAMI (National Alliance on Mental Illness)',
        url: 'https://www.nami.org',
        description: 'The nation\'s largest grassroots mental health organization with education, support groups, and advocacy.',
        category: 'organizations',
        features: ['Support groups', 'Educational programs', 'Helpline'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'Mental Health America',
        url: 'https://www.mhanational.org',
        description: 'Leading nonprofit with free mental health screenings and resources.',
        category: 'organizations',
        features: ['Free screenings', 'Educational content', 'Advocacy'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'ADAA (Anxiety and Depression Association)',
        url: 'https://adaa.org',
        description: 'International nonprofit dedicated to prevention and treatment of anxiety, depression, OCD, and PTSD.',
        category: 'organizations',
        features: ['Therapist finder', 'Educational resources', 'Webinars'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'The Jed Foundation',
        url: 'https://jedfoundation.org',
        description: 'Protects emotional health and prevents suicide for teens and young adults.',
        category: 'organizations',
        features: ['Youth focus', 'Campus programs', 'Parent resources'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'Child Mind Institute',
        url: 'https://childmind.org',
        description: 'Nonprofit dedicated to children and families struggling with mental health and learning disorders.',
        category: 'organizations',
        features: ['Child-focused', 'Parent resources', 'Symptom checker'],
        isFree: true,
        isNonProfit: true
    },

    // Government & Educational Resources
    {
        name: 'NIMH (National Institute of Mental Health)',
        url: 'https://www.nimh.nih.gov',
        description: 'Lead federal agency for research on mental disorders with evidence-based information.',
        category: 'educational',
        features: ['Research-backed', 'Statistics', 'Clinical trials'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'SAMHSA',
        url: 'https://www.samhsa.gov',
        description: 'Federal agency with treatment locator and national helplines for behavioral health.',
        category: 'educational',
        features: ['Treatment locator', 'National helpline', 'Publications'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'MedlinePlus - Mental Health',
        url: 'https://medlineplus.gov/mentalhealth.html',
        description: 'NIH\'s portal providing trusted health information on mental health conditions.',
        category: 'educational',
        features: ['Evidence-based', 'Multiple languages', 'Drug information'],
        isFree: true,
        isNonProfit: true
    },

    // Therapy & Treatment Finders
    {
        name: 'Psychology Today - Find a Therapist',
        url: 'https://www.psychologytoday.com/us/therapists',
        description: 'Largest online directory of mental health professionals with insurance filters.',
        category: 'therapy',
        features: ['Therapist profiles', 'Insurance filters', 'Specialty search'],
        isFree: true
    },
    {
        name: 'BetterHelp',
        url: 'https://www.betterhelp.com',
        description: 'World\'s largest online therapy platform with licensed therapists via chat, phone, or video.',
        category: 'therapy',
        features: ['Online therapy', 'Flexible scheduling', 'Financial aid'],
        isFree: false
    },
    {
        name: 'Talkspace',
        url: 'https://www.talkspace.com',
        description: 'Online therapy platform for individuals, couples, and teens with psychiatry options.',
        category: 'therapy',
        features: ['Text & video sessions', 'Couples therapy', 'Psychiatry'],
        isFree: false
    },
    {
        name: 'Open Path Collective',
        url: 'https://openpathcollective.org',
        description: 'Nonprofit providing affordable therapy sessions ($30-$80) with licensed professionals.',
        category: 'therapy',
        features: ['Affordable rates', 'Licensed therapists', 'Sliding scale'],
        isFree: false,
        isNonProfit: true
    },

    // Mindfulness & Meditation
    {
        name: 'Headspace',
        url: 'https://www.headspace.com',
        description: 'Popular meditation app with guided meditations, sleep content, and focus exercises.',
        category: 'mindfulness',
        features: ['Guided meditations', 'Sleep content', 'Courses'],
        isFree: false
    },
    {
        name: 'Calm',
        url: 'https://www.calm.com',
        description: 'Award-winning app for sleep, meditation, and relaxation with sleep stories.',
        category: 'mindfulness',
        features: ['Sleep stories', 'Meditation', 'Breathing exercises'],
        isFree: false
    },
    {
        name: 'Insight Timer',
        url: 'https://insighttimer.com',
        description: 'World\'s largest free library with 100,000+ guided meditations from 10,000+ teachers.',
        category: 'mindfulness',
        features: ['Free meditations', 'Timer', 'Community'],
        isFree: true
    },
    {
        name: 'UCLA Mindful Awareness Research Center',
        url: 'https://www.uclahealth.org/programs/marc/free-guided-meditations',
        description: 'Free guided meditations from UCLA\'s research center for stress and anxiety.',
        category: 'mindfulness',
        features: ['Free meditations', 'Research-backed', 'Downloadable'],
        isFree: true,
        isNonProfit: true
    },

    // Peer Support & Community
    {
        name: '7 Cups',
        url: 'https://www.7cups.com',
        description: 'Free emotional support through trained volunteer listeners. Chat anonymously 24/7.',
        category: 'community',
        features: ['Free chat support', 'Trained listeners', '24/7 availability'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'The Mighty',
        url: 'https://themighty.com',
        description: 'Digital health community where people share real stories and support each other.',
        category: 'community',
        features: ['Peer stories', 'Community support', 'Resources'],
        isFree: true
    },
    {
        name: 'DBSA (Depression and Bipolar Support Alliance)',
        url: 'https://www.dbsalliance.org',
        description: 'Peer-led support groups for people with depression and bipolar disorder.',
        category: 'community',
        features: ['Peer support groups', 'Online meetings', 'Wellness tools'],
        isFree: true,
        isNonProfit: true
    },

    // Specific Conditions
    {
        name: 'International OCD Foundation',
        url: 'https://iocdf.org',
        description: 'Leading resource for OCD education, advocacy, and treatment provider directory.',
        category: 'conditions',
        features: ['OCD-focused', 'Provider directory', 'Support groups'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'PTSD Foundation of America',
        url: 'https://ptsdusa.org',
        description: 'Support for veterans and first responders dealing with PTSD.',
        category: 'conditions',
        features: ['Veteran focus', 'Peer mentoring', 'Family support'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'NEDA (National Eating Disorders Association)',
        url: 'https://www.nationaleatingdisorders.org',
        description: 'Leading nonprofit supporting individuals and families affected by eating disorders.',
        category: 'conditions',
        features: ['Eating disorder focus', 'Helpline', 'Screening tool'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'CHADD (Children and Adults with ADHD)',
        url: 'https://chadd.org',
        description: 'Leading resource on ADHD for children and adults with education and support.',
        category: 'conditions',
        features: ['ADHD-focused', 'Support groups', 'Professional directory'],
        isFree: true,
        isNonProfit: true
    },

    // International Resources
    {
        name: 'Mind (UK)',
        url: 'https://www.mind.org.uk',
        description: 'UK\'s leading mental health charity with advice, support, and campaigns.',
        category: 'international',
        features: ['UK-based', 'Workplace resources', 'Helpline'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'Beyond Blue (Australia)',
        url: 'https://www.beyondblue.org.au',
        description: 'Australia\'s leading mental health organization for anxiety, depression, and suicide prevention.',
        category: 'international',
        features: ['Australia-based', '24/7 support', 'Online chat'],
        isFree: true,
        isNonProfit: true
    },
    {
        name: 'Canadian Mental Health Association',
        url: 'https://cmha.ca',
        description: 'Canada\'s nationwide mental health organization with programs across all provinces.',
        category: 'international',
        features: ['Canada-based', 'Local branches', 'Programs'],
        isFree: true,
        isNonProfit: true
    }
]

const categories = [
    { id: 'all', name: 'All', emoji: '🌐' },
    { id: 'crisis', name: 'Crisis', emoji: '🆘' },
    { id: 'organizations', name: 'Organizations', emoji: '🏛️' },
    { id: 'educational', name: 'Educational', emoji: '📚' },
    { id: 'therapy', name: 'Therapy', emoji: '💭' },
    { id: 'mindfulness', name: 'Mindfulness', emoji: '🧘' },
    { id: 'community', name: 'Community', emoji: '🤝' },
    { id: 'conditions', name: 'Conditions', emoji: '🎯' },
    { id: 'international', name: 'International', emoji: '🌍' }
]

export default function DirectoryPage() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredResources = mentalWellnessResources.filter(resource => {
        const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
        const matchesSearch = searchQuery === '' ||
            resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Mental Wellness Resource Directory',
        description: 'Curated directory of renowned mental health and wellness websites, organizations, and resources.',
        numberOfItems: mentalWellnessResources.length,
        itemListElement: mentalWellnessResources.map((resource, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Organization',
                name: resource.name,
                url: resource.url,
                description: resource.description
            }
        }))
    }

    return (
        <>
            <SEOHead
                title="Mental Wellness Directory - Trusted Resources & Organizations"
                description="Curated directory of 30+ renowned mental health websites and organizations. Find crisis support, therapy services, mindfulness apps, and peer support communities."
                keywords={[
                    'mental health resources',
                    'mental wellness directory',
                    'mental health organizations',
                    'therapy resources',
                    'crisis support',
                    'mental health websites',
                    'mindfulness apps',
                    'peer support mental health',
                    'mental health help',
                    'wellness resources'
                ]}
                ogImage="/og-directory.png"
                structuredData={structuredData}
            />

            <Navbar />

            <div className="min-h-screen bg-white">
                {/* Compact Hero Section */}
                <section className="bg-wellness-900 text-white py-8 lg:py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex mb-4 text-xs" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1">
                                <li><Link href="/" className="text-wellness-300 hover:text-white">Home</Link></li>
                                <li className="flex items-center">
                                    <svg className="w-3 h-3 text-wellness-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-wellness-400">Directory</span>
                                </li>
                            </ol>
                        </nav>

                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                                <span className="font-serif italic">Mental Wellness </span>
                                <span className="text-accent-teal">Directory</span>
                            </h1>
                            <p className="text-wellness-200 text-sm sm:text-base mb-4">
                                {mentalWellnessResources.length}+ trusted mental health resources, therapy platforms, and support communities worldwide.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Compact Search & Filter */}
                <section className="bg-gray-50 border-b border-gray-200 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="w-full lg:w-80">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search resources..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-teal focus:border-accent-teal bg-white"
                                    />
                                </div>
                            </div>

                            {/* Category Pills */}
                            <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeCategory === category.id
                                            ? 'bg-wellness-900 text-white'
                                            : 'bg-white text-gray-600 border border-gray-300 hover:border-wellness-500'
                                            }`}
                                    >
                                        <span>{category.emoji}</span>
                                        <span>{category.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Results Count */}
                        <p className="text-xs text-gray-500 mb-4">
                            {filteredResources.length} resources
                            {activeCategory !== 'all' && <span className="text-wellness-600"> in {categories.find(c => c.id === activeCategory)?.name}</span>}
                        </p>

                        {/* Compact Resource Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredResources.map((resource, index) => (
                                <article
                                    key={index}
                                    className="bg-white rounded-lg border border-gray-200 hover:border-wellness-300 hover:shadow-md transition-all p-4 group"
                                >
                                    {/* Header */}
                                    <div className="mb-2">
                                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-wellness-700 transition-colors leading-tight mb-1">
                                            {resource.name}
                                        </h3>
                                        <div className="flex gap-1">
                                            {resource.isFree && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent-teal/10 text-accent-teal">
                                                    Free
                                                </span>
                                            )}
                                            {resource.isNonProfit && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-wellness-100 text-wellness-700">
                                                    Non-Profit
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">
                                        {resource.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {resource.features.slice(0, 2).map((feature, featureIndex) => (
                                            <span key={featureIndex} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-accent-magenta hover:bg-accent-magenta-hover text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                                    >
                                        Visit →
                                    </a>
                                </article>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredResources.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-2">No resources found</p>
                                <button
                                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                    className="text-accent-teal hover:underline text-sm"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Compact Disclaimer */}
                <section className="bg-wellness-50 border-t border-wellness-100 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs text-wellness-700 text-center">
                            <strong>Disclaimer:</strong> This directory is for informational purposes only. Verify credentials before engaging with services.
                            <Link href="/crisis-support" className="text-wellness-600 hover:underline ml-1">Crisis support →</Link>
                        </p>
                    </div>
                </section>

                {/* Compact Suggest CTA */}
                <section className="bg-wellness-900 py-6">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-wellness-200 text-sm mb-3">Know a great resource we should add?</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-accent-teal hover:bg-[#00b395] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            Suggest a Resource
                        </Link>
                    </div>
                </section>

                {/* Compact Related Links */}
                <section className="bg-gray-50 py-6 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/support" className="flex items-center gap-2 text-sm text-gray-600 hover:text-wellness-700">
                                <span>📚</span> Support Guides
                            </Link>
                            <Link href="/crisis-support" className="flex items-center gap-2 text-sm text-gray-600 hover:text-wellness-700">
                                <span>🆘</span> Crisis Support
                            </Link>
                            <Link href="/tools/free-mental-health-tools" className="flex items-center gap-2 text-sm text-gray-600 hover:text-wellness-700">
                                <span>🛠️</span> Free Tools
                            </Link>
                            <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-600 hover:text-wellness-700">
                                <span>📰</span> Blog
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Compact Crisis Banner - Bottom of Page */}
                <div className="bg-red-50 border-t border-red-100 py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-red-600 font-semibold">🆘 In Crisis?</span>
                                <span className="text-red-700">Get immediate help:</span>
                            </div>
                            <div className="flex gap-2">
                                <a href="tel:988" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                                    Call 988
                                </a>
                                <a href="sms:741741?body=HOME" className="bg-white border border-red-300 text-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50">
                                    Text 741741
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <LegalDisclaimer variant="footer" />
            </div>
        </>
    )
}
