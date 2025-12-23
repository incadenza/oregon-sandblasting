import Link from 'next/link'

type QuickLink = {
  href: string
  label: string
  tone?: 'primary' | 'secondary'
}

const links: QuickLink[] = [
  {href: '/team', label: 'Team', tone: 'primary'},
  {href: '/services', label: 'Services', tone: 'secondary'},
  {href: '/posts', label: 'Projects', tone: 'secondary'},
  {href: '/contact', label: 'Contact Us', tone: 'secondary'},
]

function QuickLinkCard({href, label, tone = 'secondary'}: QuickLink) {
  const bg = tone === 'primary' ? 'bg-design-brightBlue' : 'bg-design-royalBlue'
  return (
    <Link
      href={href}
      className={`${bg} group relative flex h-[160px] items-center justify-center overflow-hidden px-10 text-white transition-colors hover:bg-design-brightBlue`}
    >
      {/* Text - 32px, bold, leading 0.9 */}
      <span className="text-[32px] font-bold leading-[0.9]">{label}</span>

      {/* Arrow icon - 38px, rotated 180deg */}
      <div className="absolute right-[116px] top-[66px] flex h-[38px] w-[38px] rotate-180 items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <svg className="h-full w-full text-white" viewBox="0 0 28 28" fill="none">
          <path
            d="M8 20L20 8M20 8V18M20 8H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}

export default function QuickLinksRow() {
  return (
    <section className="pb-[68px]">
      <div className="container">
        {/* Grid: 4 columns, each 410px wide, 160px tall */}
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <QuickLinkCard key={l.href} {...l} />
          ))}
        </div>
      </div>
    </section>
  )
}


