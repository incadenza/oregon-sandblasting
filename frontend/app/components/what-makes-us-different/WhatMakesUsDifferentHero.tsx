import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/wmud-hero.png'

export default function WhatMakesUsDifferentHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px] lg:min-h-0">
      {/* Background image - scaled up and offset so woman appears further right */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="absolute h-[120%] w-[130%] max-w-none object-cover object-center lg:-left-[15%] lg:-top-[10%]"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      {/* Bottom gradient - h-[689px], top-[475px] */}
      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient - h-[407px] */}
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient - w-[1513px] */}
      <div className="absolute left-0 top-0 h-full w-[75%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Right gradient - w-[407px] */}
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content */}
      <div className="container relative flex min-h-screen flex-col justify-center py-32 lg:min-h-0 lg:h-full lg:py-0">
        <div className="lg:pt-[48px]">
          {/* "WHAT MAKES US DIFFERENT" label - Figma: 16px, tracking 1.6px */}
          <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
            WHAT MAKES US DIFFERENT
          </p>

          {/* Main heading - Figma: 75px Satoshi Bold, leading 1.05, max-width 919px */}
          <h1 className="mt-8 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[75px]">
            More than a Coater.
            <br />
            A Critical Project Partner.
          </h1>

          {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, max-width 680px */}
          <div className="mt-10 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-12 lg:text-[20px]">
            <p>
              The final stop for structural steel that will help you meet the schedule, not break
              the schedule.
            </p>
            <p className="mt-6">
              We built Oregon Sandblasting &amp; Coating to eliminate the coordination issues,
              delays, and visual inconsistencies that slow down complex jobs. Whether you're
              fabricating infrastructure, industrial systems, or high-value architectural steel, we
              deliver more than a finished part. We deliver reliability, speed, and control where it
              matters most.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 lg:mt-12">
            <ActionLink href="/contact" label="Request a Quote" variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


