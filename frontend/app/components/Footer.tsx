import Link from 'next/link'

import HeaderLink from '@/app/components/HeaderLink'
import {urlForImage} from '@/sanity/lib/utils'

type NavLink = {label: string; href: string}

type FooterProps = {
  navLinks?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  address?: string
  phone?: string
  badgeImage?: any
  copyrightText?: string
  legalLinks?: Array<{label: string; href: string}>
}

const fallbackNavLinks: NavLink[] = [
  {href: '/team', label: 'The Team'},
  {href: '/services', label: 'Services'},
  {href: '/what-makes-us-different', label: 'What Makes Us Different'},
  {href: '/about', label: 'About Hybrid Coatings'},
  {href: '/schedule', label: 'Schedule Your Dropoff'},
]

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer({
  navLinks,
  ctaLabel = 'Talk to the Team',
  ctaHref = '/contact',
  address = '10000 SW Herman Rd,\nTualatin, Oregon 97062',
  phone = '(503) 692-3575',
  badgeImage,
  copyrightText = '©2025 Oregon Sandblasting. All rights reserved.',
  legalLinks,
}: FooterProps) {
  const links = navLinks && navLinks.length > 0 ? navLinks : fallbackNavLinks
  const addressLines = address.split('\n').filter(Boolean)
  const badgeUrl =
    urlForImage(badgeImage)?.url() ||
    '/figma-assets/719d8110f5abd8944527caa8c88e1a9a4214f72a.png'
  const badgeAlt = badgeImage?.alt || 'AMPP QP3 Certified'
  const legal =
    legalLinks && legalLinks.length > 0
      ? legalLinks
      : [
          {label: 'Privacy Policy', href: '/privacy'},
          {label: 'Terms of Use', href: '/terms'},
        ]

  return (
    <footer className="bg-design-charcoal text-white">
      <div className="container py-20">
        {/* Top row: brand + nav + CTA */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Link href="/" className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-brand font-semibold uppercase text-design-brightBlue text-[42px] leading-[0.9] sm:text-[45px]">
                Oregon
              </span>
              <span className="font-brand font-semibold uppercase text-white text-[42px] leading-[0.9] sm:text-[45px]">
                Sandblasting
              </span>
            </div>
            <div className="text-[12px] leading-[1.35] text-white/80">
              {addressLines.map((line, i) => (
                <p key={i} className="mb-0">{line}</p>
              ))}
              <p className="mb-0">{phone}</p>
            </div>
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-end lg:gap-10">
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4 lg:gap-x-10">
              {links.map((link) => (
                <HeaderLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>

            <HeaderLink href={ctaHref} label={ctaLabel} variant="cta" endIcon={<ArrowIcon />} />
          </div>
        </div>

        {/* Bottom row: badge + legal */}
        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <img alt={badgeAlt} src={badgeUrl} className="h-[67px] w-[75px] object-contain" />

          <div className="flex flex-col gap-4 text-[12px] leading-[0.9] text-white/80 lg:flex-row lg:items-center lg:gap-10">
            <span>{copyrightText}</span>
            <div className="flex items-center gap-6">
              {legal.map((link) => (
                <Link key={link.href} href={link.href} className="underline underline-offset-2 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
