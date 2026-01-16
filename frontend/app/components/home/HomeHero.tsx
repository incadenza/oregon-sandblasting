import {ArrowDown} from 'lucide-react'

import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/home_hero.png'

export default function HomeHero() {
  return (
    <section className="relative min-h-[550px] overflow-hidden bg-design-oregonSandblastingBlue text-white md:min-h-[600px] md:h-[80vh] md:max-h-[900px] lg:h-[85vh] lg:max-h-[1000px]">
      {/* Background image - centered on mobile, right-top on desktop */}
      <div className="absolute inset-0">
        <img alt="" src={heroBg} className="h-full w-full object-cover object-[center_30%] md:object-right-top" />
      </div>

      {/* Gradient overlays - stronger on mobile for readability */}
      <div className="absolute bottom-0 left-0 h-[70%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply md:h-[60%] md:from-[#2c3f50]/90" />
      <div className="absolute left-0 top-0 h-[35%] w-full bg-gradient-to-b from-[#2c3f50]/70 to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50]/80 to-transparent mix-blend-multiply md:w-1/2 md:from-[#2c3f50]/70" />
      <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-[#2c3f50]/50 to-transparent mix-blend-multiply" />

      {/* Content container - centered on mobile, bottom on desktop */}
      <div className="container relative flex h-full flex-col justify-center pb-8 pt-20 md:justify-end md:pt-12 lg:pb-12">
        {/* Main content row - text left, CTAs right on desktop */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Text content block - left side */}
          <div className="max-w-[600px]">
            {/* Heading - ALL CAPS as shown in Figma */}
            <h1 className="font-sans text-3xl font-bold uppercase leading-[1.05] tracking-[1px] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
              The West Coast's Fastest Path to Finished Steel
            </h1>

            {/* Body text */}
            <p className="mt-4 max-w-[500px] font-sans text-sm font-medium leading-[1.4] text-white sm:text-base md:mt-5 lg:text-[18px]">
              From blast to finish, one shop with zero friction. We compress timelines, eliminate rework, and deliver spec-perfect results at industrial scale.
            </p>
          </div>

          {/* CTAs - right side on desktop */}
          <div className="flex flex-col gap-3 sm:flex-row lg:gap-4">
            <ActionLink href="/contact" label="Request a Quote" variant="filled" />
            <ActionLink
              href="/what-makes-us-different"
              label="Learn What Makes Us Different"
              variant="outline"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 flex items-center gap-2 text-white/70 lg:mt-8">
          <ArrowDown className="h-4 w-4" />
          <span className="font-sans text-xs uppercase tracking-wider">Scroll to Navigate</span>
        </div>
      </div>
    </section>
  )
}


