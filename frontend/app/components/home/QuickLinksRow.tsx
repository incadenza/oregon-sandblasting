import Link from 'next/link'

type QuickLink = {
  href: string
  label: string
  tone?: 'primary' | 'secondary'
}

const links: QuickLink[] = [
  {href: '/team', label: 'Team', tone: 'primary'},
  {href: '/services', label: 'Services', tone: 'secondary'},
  // {href: '/posts', label: 'Projects', tone: 'secondary'},
  {href: '/contact', label: 'Contact Us', tone: 'secondary'},
]

function QuickLinkCard({href, label, tone = 'secondary'}: QuickLink) {
  const bg = tone === 'primary' ? 'bg-design-brightBlue' : 'bg-design-royalBlue'
  return (
    <Link
      href={href}
      className={`${bg} group relative flex h-[120px] items-center justify-center overflow-hidden px-6 text-white transition-colors hover:bg-design-brightBlue sm:h-[140px] sm:px-10 lg:h-[160px]`}
    >
      {/* Content wrapper for text + arrow */}
      <span className="flex items-center gap-3">
        {/* Text - responsive sizing */}
        <span className="text-[24px] font-bold leading-[0.9] sm:text-[28px] lg:text-[32px]">{label}</span>

        {/* Arrow icon - only visible on hover */}
        <svg 
          className="h-5 w-5 rotate-180 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 sm:h-6 sm:w-6 lg:h-8 lg:w-8" 
          viewBox="0 0 28 28" 
          fill="none"
        >
          <path
            d="M8 20L20 8M20 8V18M20 8H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  )
}

export default function QuickLinksRow() {
  return (
    <section className="pb-[68px]">
      <div className="container">
        {/* Grid: stretch to fill available space */}
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <QuickLinkCard key={l.href} {...l} />
          ))}
        </div>
      </div>
    </section>
  )
}


