import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

import HeaderLink from '@/app/components/HeaderLink'
import HeaderNav from '@/app/components/HeaderNav'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[115px] bg-design-charcoal">
      <div className="container h-full px-4 sm:px-6">
        {/* Figma: inner nav row is 45px tall and starts 32px from the top */}
        <div className="flex h-full items-start justify-between gap-8 pt-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">{settings?.title || 'Oregon Sandblasting'}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-brand font-semibold uppercase text-design-brightBlue text-[42px] leading-[0.9] sm:text-[45px]">
                Oregon
              </span>
              <span className="font-brand font-semibold uppercase text-white text-[42px] leading-[0.9] sm:text-[45px]">
                Sandblasting
            </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <HeaderNav />

          {/* Mobile nav (no JS) */}
          <details className="group lg:hidden">
            <summary className="list-none cursor-pointer select-none p-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue">
              <span className="sr-only">Open menu</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <div className="absolute left-0 right-0 top-[115px] bg-design-charcoal">
              <div className="container px-4 sm:px-6 py-6">
                <div className="flex flex-col gap-4">
                  <HeaderLink href="/team" label="The Team" className="w-fit" />
                  <HeaderLink href="/services" label="Services" className="w-fit" />
                  <HeaderLink
                    href="/what-makes-us-different"
                    label="What Makes Us Different"
                    className="w-fit"
                  />
                  <HeaderLink href="/posts" label="Projects" className="w-fit" />
                  <HeaderLink href="/about" label="About Hybrid Coatings" className="w-fit" />
                  <HeaderLink href="/schedule" label="Schedule Your Dropoff" className="w-fit" />
                  <HeaderLink
                    href="/contact"
                    label="Talk to the Team"
                    variant="cta"
                    className="w-fit"
                    endIcon={
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 7H17V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                  </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
