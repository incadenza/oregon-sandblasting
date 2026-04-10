import HeaderLink from '@/app/components/HeaderLink'

type NavLink = {label: string; href: string}

type Props = {
  navLinks: NavLink[]
  ctaLabel: string
  ctaHref: string
}

export default function HeaderNav({navLinks, ctaLabel, ctaHref}: Props) {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navLinks.map((link) => (
        <HeaderLink key={link.href} href={link.href} label={link.label} />
      ))}
      <HeaderLink
        href={ctaHref}
        label={ctaLabel}
        variant="cta"
        className="ml-2"
        endIcon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />
    </nav>
  )
}
