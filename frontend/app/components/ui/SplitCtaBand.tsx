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
      <div className="container py-12 md:py-16 lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Title - Figma: 60px Satoshi Bold, leading 1.1, max-width 874px */}
          <h2 className="max-w-[874px] font-sans text-[28px] font-bold leading-[1.1] sm:text-[36px] md:text-[48px] lg:text-[60px]">
            {title}
          </h2>

          {/* Right column - body + CTA */}
          <div className="max-w-[661px] lg:flex-shrink-0">
            {/* Body - Figma: 20px Satoshi Medium, leading 1.4 */}
            <p className="font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:text-[20px]">
              {body}
            </p>

            {/* CTA - consistent spacing from body text */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              <ActionLink href={buttonHref} label={buttonLabel} variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


