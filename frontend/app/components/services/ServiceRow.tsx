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

  // Image container - reduced from 750px to 700px to give text more room
  const image = (
    <div className="relative h-[300px] overflow-hidden bg-[#93b8c1] sm:h-[350px] lg:h-[403px] lg:w-[700px] lg:flex-shrink-0">
      <img
        alt={imageAlt}
        src={imageSrc}
        className="h-full w-full object-cover object-center"
      />
    </div>
  )

  // Figma: Text area with title at 50px, body at 20px
  const text = (
    <div className="relative flex flex-col justify-center py-8 lg:py-0">
      {/* Title - Figma: 50px Satoshi Bold, leading 1.2, positioned at top 70px */}
      <h3 className="font-sans text-3xl font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-4xl lg:text-[50px]">
        {title}
      </h3>

      {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, max-width 661px, top 154px */}
      <div className="mt-6 max-w-[661px] font-sans text-base font-medium leading-[1.4] text-design-oregonSandblastingBlue lg:mt-[84px] lg:text-[20px]">
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
            className="inline-flex items-center gap-2 font-sans text-[15px] font-black text-design-royalBlue"
          >
            {learnMoreLabel}
            <svg
              className="h-[17px] w-[17px] rotate-180"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 13L13 4M13 4V12M13 4H5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      ) : null}

      {/* Accent bars - Figma: positioned at bottom (y=388), 4 bars of 87-88px each */}
      <div className="mt-8 lg:mt-auto lg:pt-8">
        <AccentBars align={accentBarsSide} />
      </div>
    </div>
  )

  return (
    <section>
      <div className="container">
        {/* Service row - 403px tall, gap between image and text */}
        <div className="flex flex-col gap-8 lg:h-[403px] lg:flex-row lg:items-stretch lg:gap-[100px]">
          {imageSide === 'left' ? (
            <>
              {image}
              {text}
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1 lg:flex-1">{text}</div>
              <div className="order-1 lg:order-2">{image}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}


