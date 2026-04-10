import Link from 'next/link'

import HeaderNav from '@/app/components/HeaderNav'
import HeaderLink from '@/app/components/HeaderLink'

type NavLink = {label: string; href: string}

type HeaderProps = {
  title?: string
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
}

const fallbackNavLinks: NavLink[] = [
  {href: '/team', label: 'The Team'},
  {href: '/services', label: 'Services'},
  {href: '/what-makes-us-different', label: 'What Makes Us Different'},
  {href: '/about', label: 'About Hybrid Coatings'},
  {href: '/schedule', label: 'Schedule Your Dropoff'},
]

export default function Header({
  title = 'Oregon Sandblasting',
  navLinks,
  ctaLabel = 'Talk to the Team',
  ctaHref = '/contact',
}: HeaderProps) {
  const links = navLinks && navLinks.length > 0 ? navLinks : fallbackNavLinks

  const arrowIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[115px] bg-design-charcoal">
      <div className="container h-full px-4 sm:px-6">
        <div className="flex h-full items-start justify-between gap-8 pt-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">{title}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-brand font-semibold uppercase text-design-brightBlue text-[42px] leading-[0.9] sm:text-[45px]">
                Oregon
              </span>
              <span className="font-brand font-semibold uppercase text-white text-[42px] leading-[0.9] sm:text-[45px]">
                Sandblasting
              </span>
            </div>
          </Link>

          <HeaderNav navLinks={links} ctaLabel={ctaLabel} ctaHref={ctaHref} />

          {/* Mobile nav */}
          <details className="group lg:hidden">
            <summary className="cursor-pointer list-none p-2 text-white/90 hover:text-white [&::-webkit-details-marker]:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-open:hidden">
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden h-6 w-6 group-open:block">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>

            <div className="absolute left-0 right-0 top-[115px] bg-design-charcoal">
              <div className="container px-4 py-6 sm:px-6">
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <HeaderLink key={link.href} href={link.href} label={link.label} className="w-fit" />
                  ))}
                  <HeaderLink
                    href={ctaHref}
                    label={ctaLabel}
                    variant="cta"
                    className="w-fit"
                    endIcon={arrowIcon}
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
