import ActionLink from '@/app/components/ui/ActionLink'

type SplitCtaBandProps = {
  title: string
  body: string
  buttonLabel: string
  buttonHref: string
  className?: string
}

export default function SplitCtaBand({
  title,
  body,
  buttonLabel,
  buttonHref,
  className = '',
}: SplitCtaBandProps) {
  return (
    <section className={`bg-design-royalBlue text-white ${className}`.trim()}>
      {/* Figma: 354px height, title at y=100, body at y=111 */}
      <div className="container py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Title - Figma: 60px Satoshi Bold, leading 1.1, max-width 874px */}
          <h2 className="max-w-[874px] font-sans text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[60px]">
            {title}
          </h2>

          {/* Right column - body + CTA */}
          <div className="max-w-[661px]">
            {/* Body - Figma: 20px Satoshi Medium, leading 1.4 */}
            <p className="font-sans text-base font-medium leading-[1.4] text-white lg:text-[20px]">
              {body}
            </p>
          </div>
        </div>
      </div>

      {/* CTA positioned below the band in Figma (y=4739, band ends at 4897) */}
      {/* This creates the visual of CTA sitting at bottom */}
      <div className="container pb-[100px]">
        <div className="flex lg:justify-end">
          <div className="lg:mr-[470px]">
            <ActionLink href={buttonHref} label={buttonLabel} variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


