import React from 'react'
import Link from 'next/link'


interface BlogSidebarProps {
    topics?: string[]
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ topics = [] }) => {
    return (
        <aside className="space-y-10">
            {/* Call to Action */}
            <div className="bg-[#2DD4BF] rounded-2xl p-8 text-white relative overflow-hidden group">
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full transition-transform group-hover:scale-110 duration-500" />

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 leading-tight">
                        Find the right therapist for you
                    </h3>
                    <p className="text-sm opacity-90 mb-6 font-medium">
                        Get personalized matches with expert clinicians in your area.
                    </p>
                    <Link
                        href="/assessment"
                        className="inline-block bg-white text-[#14B8A6] px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all hover:bg-opacity-90 active:scale-95"
                    >
                        START MATCHING
                    </Link>
                </div>
            </div>

            {/* Topics / Categories */}
            <div>
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                    Blog Topics
                </h4>
                <ul className="space-y-4">
                    {topics.length > 0 ? (
                        topics.map((topic) => (
                            <li key={topic}>
                                <Link
                                    href={`/blog?topic=${encodeURIComponent(topic)}`}
                                    className="text-gray-600 hover:text-[#14B8A6] text-base transition-colors duration-200"
                                >
                                    {topic}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <>
                            <li><Link href="/blog" className="text-gray-600 hover:text-[#14B8A6]">Anxiety</Link></li>
                            <li><Link href="/blog" className="text-gray-600 hover:text-[#14B8A6]">Depression</Link></li>
                            <li><Link href="/blog" className="text-gray-600 hover:text-[#14B8A6]">Relationships</Link></li>
                            <li><Link href="/blog" className="text-gray-600 hover:text-[#14B8A6]">Self-Care</Link></li>
                            <li><Link href="/blog" className="text-gray-600 hover:text-[#14B8A6]">Therapy 101</Link></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Stay Updated / Newsletter (Implicit in image style) */}
            <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-3">
                    Stay Updated
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                    Get the latest mental wellness insights delivered to your inbox.
                </p>
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Subscribe
                </button>
            </div>
        </aside>
    )
}
