import React from 'react'

interface BlogHeaderProps {
    title?: string
    subtitle?: string
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
    title = "The Ellie Blog",
    subtitle = "Mental health tips and insights"
}) => {
    return (
        <header className="relative overflow-hidden bg-[#24D1D4] py-14 text-[#0B4F54]">
            {/* Abstract Shapes - Two circles on the right */}
            <div className="absolute top-0 right-0 h-full w-[45%] pointer-events-none sm:block hidden">
                <svg viewBox="0 0 400 200" className="h-full w-full opacity-60">
                    {/* Top circle: Light Aqua */}
                    <circle cx="340" cy="40" r="110" fill="#AFFCFF" />
                    {/* Bottom circle: Coral/Salmon */}
                    <circle cx="330" cy="190" r="95" fill="#FF6D5B" />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-4 relative z-10 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl font-bold opacity-80">
                        {subtitle}
                    </p>
                </div>
            </div>
        </header>
    )
}
