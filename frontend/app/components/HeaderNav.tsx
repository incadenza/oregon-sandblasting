'use client'

import {usePathname} from 'next/navigation'

import HeaderLink from '@/app/components/HeaderLink'

export default function HeaderNav() {
  const pathname = usePathname() || '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="hidden lg:flex items-center gap-10">
      <HeaderLink href="/team" label="The Team" isActive={isActive('/team')} />
      <HeaderLink href="/services" label="Services" isActive={isActive('/services')} />
      <HeaderLink
        href="/what-makes-us-different"
        label="What Makes Us Different"
        isActive={isActive('/what-makes-us-different')}
      />
      <HeaderLink href="/posts" label="Projects" isActive={isActive('/posts')} />
      <HeaderLink href="/about" label="About Hybrid Coatings" isActive={isActive('/about')} />
      <HeaderLink href="/schedule" label="Schedule Your Dropoff" isActive={isActive('/schedule')} />
      <HeaderLink
        href="/contact"
        label="Talk to the Team"
        variant="cta"
        isActive={isActive('/contact')}
        className="ml-2"
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
    </nav>
  )
}


