import Link from 'next/link'

import ArrowDownLeftIcon from '@/app/components/ui/ArrowDownLeftIcon'

type ActionLinkVariant = 'filled' | 'outline'

type ActionLinkProps = {
  href: string
  label: string
  variant?: ActionLinkVariant
  className?: string
}

export default function ActionLink({
  href,
  label,
  variant = 'filled',
  className = '',
}: ActionLinkProps) {
  const base =
    'inline-flex h-[45px] items-center gap-3 whitespace-nowrap px-6 text-[15px] font-bold leading-[0.9] uppercase tracking-[0.06em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue focus-visible:ring-offset-2'

  const filled =
    'bg-design-brightBlue text-white hover:bg-design-brightBlue/90 focus-visible:ring-offset-design-lightGray'

  const outline =
    'border border-white/80 text-white hover:border-white hover:bg-white/10 focus-visible:ring-offset-design-charcoal'

  return (
    <Link
      href={href}
      className={`${base} ${variant === 'filled' ? filled : outline} ${className}`.trim()}
    >
      <span>{label}</span>
      <ArrowDownLeftIcon className="h-5 w-5 -rotate-180" />
    </Link>
  )
}


