import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/wmud-hero.png'

export default function WhatMakesUsDifferentHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px]">
      {/* Background image - scaled up and offset so woman appears further right */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full object-cover object-[center_30%] md:object-center lg:absolute lg:h-[120%] lg:w-[130%] lg:max-w-none lg:-left-[15%] lg:-top-[10%]"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 h-[65%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient */}
      <div className="absolute left-0 top-0 h-[40%] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50] via-[#2c3f50]/50 to-transparent mix-blend-multiply md:w-[75%]" />
      {/* Right gradient */}
      <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content - consistent with ServicesHero */}
      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        {/* "WHAT MAKES US DIFFERENT" label - Figma: 16px, tracking 1.6px */}
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          WHAT MAKES US DIFFERENT
        </p>

        {/* Main heading - Figma: 75px Satoshi Bold, leading 1.05, max-width 919px */}
        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          More than a Coater.
          <br />
          A Critical Project Partner.
        </h1>

        {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, max-width 680px */}
        <div className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          <p>
            The final stop for structural steel that will help you meet the schedule, not break
            the schedule.
          </p>
          <p className="mt-4 lg:mt-6">
            We built Oregon Sandblasting &amp; Coating to eliminate the coordination issues,
            delays, and visual inconsistencies that slow down complex jobs. Whether you're
            fabricating infrastructure, industrial systems, or high-value architectural steel, we
            deliver more than a finished part. We deliver reliability, speed, and control where it
            matters most.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 lg:mt-10">
          <ActionLink href="/contact" label="Request a Quote" variant="filled" />
        </div>
      </div>
    </section>
  )
}


