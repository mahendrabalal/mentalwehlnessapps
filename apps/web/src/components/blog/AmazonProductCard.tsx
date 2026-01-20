import React from 'react'
import Image from 'next/image'

interface AmazonProductCardProps {
    imageSrc: string
    productUrl: string
    title?: string
    price?: string
}

export const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
    imageSrc,
    productUrl,
    title = "Mental Health Matters Hoodie",
    price
}) => {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm transition-all hover:shadow-md group">
            <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block space-y-4"
            >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div>
                    <h4 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-[#14B8A6] transition-colors line-clamp-2">
                        {title}
                    </h4>
                    {price && (
                        <p className="mt-1 text-[#14B8A6] font-bold text-lg">
                            {price}
                        </p>
                    )}
                    <div className="mt-3 inline-flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                        Shop on Amazon
                        <svg className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </a>
        </div>
    )
}
