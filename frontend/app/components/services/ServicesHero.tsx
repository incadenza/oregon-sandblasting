import ActionLink from '@/app/components/ui/ActionLink'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    hero?: {
      label?: string | null
      heading?: string | null
      body?: string | null
      ctaLabel?: string | null
      ctaLink?: any
      backgroundImage?: any
    } | null
  } | null
}

const defaultBody = `We handle every stage of industrial finishing, from blast to final coat, all in one QP-3 Certified shop. Our process control, equipment scale, and facility layout make us a fit for complex assemblies, oversized steel, and projects that demand visual precision and schedule reliability.

Located in the heart of the Coater's Loop, we're just steps from galvanizing partners, giving you a complete finishing solution with less freight, fewer handoffs, and faster turnarounds.`

export default function ServicesHero({data}: Props) {
  const hero = data?.hero
  const label = hero?.label || 'SERVICES'
  const heading =
    hero?.heading ||
    "The West Coast's Fastest Path to Finished Steel, for Builders Big and Small"
  const body = hero?.body || defaultBody
  const ctaLabel = hero?.ctaLabel || 'Request a Quote'
  const ctaHref = linkResolver(hero?.ctaLink) || '/contact'
  const bgUrl = urlForImage(hero?.backgroundImage)?.url() || '/figma-assets/services-hero.png'
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={bgUrl}
          className="absolute -left-[2%] -top-[5%] h-[152%] w-[125%] max-w-none scale-x-[-1] object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-[75%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          {label}
        </p>

        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          {heading}
        </h1>

        <div className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? 'mt-6' : undefined}>
              {p}
            </p>
          ))}
        </div>

        {ctaLabel && (
          <div className="mt-8 lg:mt-10">
            <ActionLink href={ctaHref} label={ctaLabel} variant="filled" />
          </div>
        )}
      </div>
    </section>
  )
}
