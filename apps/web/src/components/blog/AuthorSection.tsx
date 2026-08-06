import React from 'react'
import { CmsAuthor } from '@mental-wellness/shared'
import { urlFor } from '@/lib/cms/image'
import Link from 'next/link'

interface AuthorSectionProps {
    author: CmsAuthor
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({ author }) => {
    if (!author) return null

    const headshotUrl = author.headshot
        ? urlFor(author.headshot).width(200).height(200).fit('crop').auto('format').url()
        : null

    const authorUrl = author.slug?.current ? `/author/${author.slug.current}` : '#'

    return (
        <section className="mt-16 border-t border-gray-100 pt-16">
            <h3 className="text-xl font-bold text-gray-900 mb-8">About the author</h3>
            <Link 
                href={authorUrl}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 group block hover:bg-gray-50 p-6 -m-6 rounded-2xl transition-all duration-200"
            >
                {headshotUrl && (
                    <div className="w-24 h-24 relative flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={headshotUrl}
                            alt={author.name}
                            className="w-full h-full object-cover rounded-full border-2 border-wellness-100 group-hover:border-wellness-300 transition-colors"
                        />
                    </div>
                )}
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-wellness-600 transition-colors">
                        {author.name}
                        {author.credentials && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                {author.credentials}
                            </span>
                        )}
                    </h4>
                    {author.role && (
                        <p className="text-sm font-semibold text-wellness-600 mb-4 tracking-wide uppercase">
                            {author.role}
                        </p>
                    )}
                    {/* Note: In a real app, author bio might be a portable text field or string. 
              Assuming author.bio or similar exists or just showing role/credentials for now. */}
                    <div className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                        <p>
                            {author.name} is a dedicated {author.role || 'mental health professional'} committed to providing
                            evidence-based insights and support for mental wellness.
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    )
}
