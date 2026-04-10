import {ArrowDown} from 'lucide-react'

import ActionLink from '@/app/components/ui/ActionLink'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    heroHeading?: string | null
    heroBody?: string | null
    heroPrimaryCtaLabel?: string | null
    heroPrimaryCtaLink?: any
    heroSecondaryCtaLabel?: string | null
    heroSecondaryCtaLink?: any
    heroBackgroundImage?: any
  } | null
}

export default function HomeHero({data}: Props) {
  const heading = data?.heroHeading || "The West Coast's Fastest Path to Finished Steel"
  const body =
    data?.heroBody ||
    'From blast to finish, one shop with zero friction. We compress timelines, eliminate rework, and deliver spec-perfect results at industrial scale.'
  const primaryLabel = data?.heroPrimaryCtaLabel || 'Request a Quote'
  const primaryHref = linkResolver(data?.heroPrimaryCtaLink) || '/contact'
  const secondaryLabel = data?.heroSecondaryCtaLabel || 'Learn What Makes Us Different'
  const secondaryHref = linkResolver(data?.heroSecondaryCtaLink) || '/what-makes-us-different'
  const bgUrl = urlForImage(data?.heroBackgroundImage)?.url() || '/figma-assets/home_hero.png'

  return (
    <section className="relative min-h-[550px] overflow-hidden bg-design-oregonSandblastingBlue text-white md:min-h-[600px] md:h-[80vh] md:max-h-[900px] lg:h-[85vh] lg:max-h-[1000px]">
      <div className="absolute inset-0">
        <img alt="" src={bgUrl} className="h-full w-full object-cover object-[center_30%] md:object-right-top" />
      </div>

      <div className="absolute bottom-0 left-0 h-[70%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply md:h-[60%] md:from-[#2c3f50]/90" />
      <div className="absolute left-0 top-0 h-[35%] w-full bg-gradient-to-b from-[#2c3f50]/70 to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50]/80 to-transparent mix-blend-multiply md:w-1/2 md:from-[#2c3f50]/70" />
      <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-[#2c3f50]/50 to-transparent mix-blend-multiply" />

      <div className="container relative flex h-full flex-col justify-center pb-8 pt-20 md:justify-end md:pt-12 lg:pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[600px]">
            <h1 className="font-sans text-3xl font-bold uppercase leading-[1.05] tracking-[1px] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
              {heading}
            </h1>
            <p className="mt-4 max-w-[500px] font-sans text-sm font-medium leading-[1.4] text-white sm:text-base md:mt-5 lg:text-[18px]">
              {body}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:gap-4">
            <ActionLink href={primaryHref} label={primaryLabel} variant="filled" />
            <ActionLink href={secondaryHref} label={secondaryLabel} variant="outline" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-white/70 lg:mt-8">
          <ArrowDown className="h-4 w-4" />
          <span className="font-sans text-xs uppercase tracking-wider">Scroll to Navigate</span>
        </div>
      </div>
    </section>
  )
}
