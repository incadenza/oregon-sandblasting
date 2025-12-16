import ActionLink from '@/app/components/ui/ActionLink'

const heroBg =
  '/figma-assets/3594fb6c02df3bc15873977c4df8662bfb6fe048.png'

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-design-oregonSandblastingBlue text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full object-cover object-center opacity-90"
        />
        {/* Figma-style multiply/gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-design-oregonSandblastingBlue/0 via-design-oregonSandblastingBlue/30 to-design-oregonSandblastingBlue/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-design-oregonSandblastingBlue/70 via-transparent to-design-oregonSandblastingBlue/60 mix-blend-multiply" />
      </div>

      <div className="container relative">
        <div className="grid min-h-[720px] grid-cols-1 items-end gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="max-w-3xl font-sans text-[44px] font-bold uppercase leading-[0.95] tracking-[0.02em] sm:text-[60px] md:text-[75px]">
              The West Coast’s Fastest Path to Finished Steel
            </h1>

            <p className="mt-4 max-w-xl text-[14px] leading-[1.4] text-white/85 sm:text-[16px]">
              From blast to finish, one shop with zero friction. We compress timelines,
              eliminate rework, and deliver spec-perfect results at industrial scale.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionLink href="/contact" label="Request a Quote" variant="filled" />
              <ActionLink
                href="/what-makes-us-different"
                label="Learn What Makes Us Different"
                variant="outline"
              />
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/30 pt-4">
              <span className="text-[12px] tracking-[0.12em] text-white/70">1 OF 3</span>
              <span className="text-[12px] tracking-[0.12em] text-white/70">
                SCROLL TO NAVIGATE
              </span>
            </div>
          </div>

          {/* Right side intentionally left open (photo focal area in Figma) */}
          <div className="hidden lg:col-span-5 lg:block" />
        </div>
      </div>
    </section>
  )
}


