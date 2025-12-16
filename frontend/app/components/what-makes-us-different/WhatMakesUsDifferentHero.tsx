import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/a558cff884c8667920b3389b86cc0a099e2f7b02.png'

export default function WhatMakesUsDifferentHero() {
  return (
    <section className="relative overflow-hidden bg-design-oregonSandblastingBlue text-white">
      <div className="absolute inset-0">
        <img alt="" src={heroBg} className="h-full w-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-design-oregonSandblastingBlue/0 via-design-oregonSandblastingBlue/30 to-design-oregonSandblastingBlue/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-design-oregonSandblastingBlue/70 via-transparent to-design-oregonSandblastingBlue/60 mix-blend-multiply" />
      </div>

      <div className="container relative">
        <div className="py-14 md:py-20">
          <p className="text-[16px] font-medium tracking-[0.1em] text-white/90">
            WHAT MAKES US DIFFERENT
          </p>
          <h1 className="mt-6 max-w-4xl text-[44px] font-bold leading-[1.05] text-white sm:text-[60px] md:text-[75px]">
            More than a Coater.
            <br />
            A Critical Project Partner.
          </h1>

          <p className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-white/85 md:text-[20px]">
            The final stop for structural steel that will help you meet the schedule, not break the
            schedule.
            <br />
            <br />
            We built Oregon Sandblasting &amp; Coating to eliminate the coordination issues, delays,
            and visual inconsistencies that slow down complex jobs. Whether you’re fabricating
            infrastructure, industrial systems, or high-value architectural steel, we deliver more
            than a finished part. We deliver reliability, speed, and control where it matters most.
          </p>

          <div className="mt-8">
            <ActionLink href="/contact" label="Request a Quote" variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


