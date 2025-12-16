import Link from 'next/link'

import AccentBars from '@/app/components/ui/AccentBars'

type ServiceRowProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  imageSide?: 'left' | 'right'
  accentBarsSide?: 'left' | 'right'
  learnMoreHref?: string
  learnMoreLabel?: string
  learnMoreExternal?: boolean
}

export default function ServiceRow({
  title,
  description,
  imageSrc,
  imageAlt = '',
  imageSide = 'left',
  accentBarsSide = 'right',
  learnMoreHref,
  learnMoreLabel,
  learnMoreExternal = false,
}: ServiceRowProps) {
  const paragraphs = description.split('\n\n').filter(Boolean)
  const image = (
    <div className="relative overflow-hidden bg-design-lightGray">
      <img alt={imageAlt} src={imageSrc} className="h-[403px] w-full object-cover object-center" />
    </div>
  )

  const text = (
    <div className="py-10">
      <h3 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[42px] md:text-[50px]">
        {title}
      </h3>
      <div className="mt-6 max-w-2xl text-[16px] leading-[1.55] text-design-oregonSandblastingBlue/90 md:text-[20px]">
        {paragraphs.map((p) => (
          <p key={p} className="mb-0 [&+p]:mt-6">
            {p}
          </p>
        ))}
      </div>

      {learnMoreHref && learnMoreLabel ? (
        <div className="mt-6">
          <Link
            href={learnMoreHref}
            target={learnMoreExternal ? '_blank' : undefined}
            rel={learnMoreExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 text-[15px] font-black text-design-royalBlue underline underline-offset-4"
          >
            {learnMoreLabel}
            <span aria-hidden="true" className="text-design-royalBlue">
              ↗
            </span>
          </Link>
        </div>
      ) : null}

      <AccentBars align={accentBarsSide} />
    </div>
  )

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          {imageSide === 'left' ? (
            <>
              <div className="lg:col-span-6">{image}</div>
              <div className="lg:col-span-6">{text}</div>
            </>
          ) : (
            <>
              <div className="lg:col-span-6 lg:order-2">{image}</div>
              <div className="lg:col-span-6 lg:order-1">{text}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}


