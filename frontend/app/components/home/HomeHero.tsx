import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/home_hero.png'

export default function HomeHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-design-oregonSandblastingBlue text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img alt="" src={heroBg} className="h-full w-full object-cover object-right" />
      </div>

      {/* Gradient overlays - matching Figma */}
      <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-t from-[#2c3f50]/90 to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[35%] w-full bg-gradient-to-b from-[#2c3f50]/70 to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#2c3f50]/70 to-transparent mix-blend-multiply" />
      <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-[#2c3f50]/50 to-transparent mix-blend-multiply" />

      {/* Content container - positioned in upper-middle area */}
      <div className="container relative flex min-h-screen flex-col justify-center py-32 lg:py-0">
        {/* Text content block */}
        <div className="max-w-[909px]">
          {/* Heading - Satoshi Bold, normal case */}
          <h1 className="font-sans text-4xl font-bold leading-[1.05] tracking-[1px] text-white sm:text-5xl md:text-6xl lg:text-[75px]">
            The West Coast's Fastest Path to Finished Steel
          </h1>

          {/* Body text - Satoshi Medium 20px */}
          <p className="mt-4 max-w-[669px] font-sans text-base font-medium leading-[1.4] text-white sm:text-lg md:mt-6 lg:text-[20px]">
            From blast to finish, one shop with zero friction. We compress timelines, eliminate rework, and deliver spec-perfect results at industrial scale.
          </p>
        </div>

        {/* CTAs - stacked on mobile, row on desktop, right-aligned on lg+ */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10 lg:mt-12 lg:justify-end lg:gap-[40px]">
          <ActionLink href="/contact" label="Request a Quote" variant="filled" />
          <ActionLink
            href="/what-makes-us-different"
            label="Learn What Makes Us Different"
            variant="outline"
          />
        </div>
      </div>
    </section>
  )
}


