import ArrowDownLeftIcon from '@/app/components/ui/ArrowDownLeftIcon'
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
  const bg = tone === 'primary' ? 'bg-design-brightBlue' : 'bg-design-oregonSandblastingBlue'
  return (
    <Link
      href={href}
      className={`${bg} group relative flex h-40 items-center justify-center overflow-hidden px-10 text-white transition-colors hover:bg-design-brightBlue`}
    >
      <span className="text-[28px] sm:text-[32px] font-bold leading-[0.9]">{label}</span>
      <ArrowDownLeftIcon className="absolute right-8 top-1/2 h-9 w-9 -translate-y-1/2 -rotate-180 opacity-90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-[52%]" />
    </Link>
  )
}

export default function QuickLinksRow() {
  return (
    <section className="py-6">
      <div className="container">
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <QuickLinkCard key={l.href} {...l} />
          ))}
        </div>
      </div>
    </section>
  )
}


