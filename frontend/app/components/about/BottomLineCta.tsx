import ActionLink from '@/app/components/ui/ActionLink'
import {linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    heading?: string | null
    body?: string | null
    buttonLabel?: string | null
    buttonLink?: any
  } | null
}

const defaultBody = `Hybrid coating is built for the realities of fast-moving jobs.

It saves time, cuts cost, and delivers consistent results — all with one point of contact.

Want to see how it fits into your next spec?`

export default function BottomLineCta({data}: Props) {
  const heading = data?.heading || 'The Bottom Line'
  const body = data?.body || defaultBody
  const buttonLabel = data?.buttonLabel || 'Talk to Our Team'
  const buttonHref = linkResolver(data?.buttonLink) || '/contact'
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <section className="bg-design-royalBlue py-12 text-white md:py-16 lg:py-[100px]">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:w-[500px] lg:flex-shrink-0">
            <h2 className="font-sans text-[28px] font-bold leading-[1.1] sm:text-[36px] md:text-[48px] lg:text-[60px]">
              {heading}
            </h2>
          </div>

          <div className="max-w-[953px]">
            <div className="font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:text-[20px]">
              {paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : undefined}>
                  {p}
                </p>
              ))}
            </div>

            {buttonLabel && (
              <div className="mt-6 md:mt-8 lg:mt-10">
                <ActionLink href={buttonHref} label={buttonLabel} variant="filled" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
