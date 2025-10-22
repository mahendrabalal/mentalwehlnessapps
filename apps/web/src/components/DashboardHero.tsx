import type { ReactNode } from 'react'
import { WellnessHeroIllustration } from './illustrations/WellnessHeroIllustration'

interface Highlight {
  label: string
  value: string
  helper?: string
  icon: ReactNode
}

interface DashboardHeroProps {
  greeting: string
  highlights: Highlight[]
}

export function DashboardHero({ greeting, highlights }: DashboardHeroProps) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 px-6 py-8 text-white shadow-xl sm:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-200">
            Your personal wellness hub
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            {greeting}
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-slate-200">
            Track your mood, notice trends, and access the right support right when
            you need it. We surface the most important signals so you can focus on
            staying balanced.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map(({ label, value, helper, icon }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium text-sky-100">{label}</div>
                  <div className="text-xl">{icon}</div>
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
                {helper && <p className="mt-1 text-xs text-slate-200">{helper}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10 blur-3xl" />
          <WellnessHeroIllustration className="relative z-10 mx-auto h-48 w-full max-w-xs lg:h-56" />
        </div>
      </div>
    </section>
  )
}
