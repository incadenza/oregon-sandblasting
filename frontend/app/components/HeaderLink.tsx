import Link from 'next/link'

type HeaderLinkVariant = 'nav' | 'cta'

export type HeaderLinkProps = {
  href: string
  label: string
  variant?: HeaderLinkVariant
  isActive?: boolean
  endIcon?: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

export default function HeaderLink({
  href,
  label,
  variant = 'nav',
  isActive = false,
  endIcon,
  className = '',
  target,
  rel,
}: HeaderLinkProps) {
  const base =
    'inline-flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue focus-visible:ring-offset-2 focus-visible:ring-offset-design-charcoal'

  const nav =
    'text-[15px] font-bold leading-[0.9] text-white/90 hover:text-white transition-colors'

  const navActive =
    'h-[31px] bg-white px-4 text-[15px] font-bold leading-[0.9] text-design-brightBlue transition-colors'

  const cta =
    'h-[45px] rounded-none bg-design-brightBlue px-6 text-[15px] font-bold leading-[0.9] uppercase tracking-[0.06em] text-white shadow-sm hover:bg-design-brightBlue/90 transition-colors'

  const ctaActive =
    'h-[45px] rounded-none bg-white px-6 text-[15px] font-bold leading-[0.9] uppercase tracking-[0.06em] text-design-brightBlue shadow-sm hover:bg-white/90 transition-colors'

  const styles = `${base} ${
    variant === 'cta' ? (isActive ? ctaActive : cta) : isActive ? navActive : nav
  } ${className}`.trim()

  return (
    <Link href={href} className={styles} target={target} rel={rel}>
      <span>{label}</span>
      {endIcon ? <span aria-hidden="true">{endIcon}</span> : null}
    </Link>
  )
}


