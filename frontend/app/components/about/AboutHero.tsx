import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/about-hero.png'

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px] lg:min-h-0">
      {/* Background image - anchored right to show man on right side */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full object-cover object-right"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      {/* Bottom gradient - h-[689px] */}
      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient - h-[407px] */}
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient - w-[1441px] */}
      <div className="absolute left-0 top-0 h-full w-[75%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Right gradient - w-[407px] */}
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content */}
      <div className="container relative flex min-h-screen flex-col justify-center py-32 lg:min-h-0 lg:h-full lg:py-0">
        <div className="lg:pt-[48px]">
          {/* "ABOUT HYBRID COATINGS" label - Figma: 16px, tracking 1.6px */}
          <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
            ABOUT HYBRID COATINGS
          </p>

          {/* Main heading - Figma: 75px Satoshi Bold, leading 1.05, max-width 919px */}
          <h1 className="mt-8 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[75px]">
            Faster Finishes for Jobs That Can't Afford Delays
          </h1>

          {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, max-width 680px */}
          <div className="mt-10 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-12 lg:text-[20px]">
            <p>
              Every extra day in the field costs time, money, and coordination effort.
            </p>
            <p className="mt-6">
              Hybrid coating helps you get ahead of the schedule by combining powder and liquid
              systems in one controlled workflow, inside one facility.
            </p>
            <p className="mt-6">
              Whether you're managing a multi-phase project or trying to avoid rework and site
              delays, hybrid coating gives you the flexibility to finish faster without compromising
              finish quality or performance.
            </p>
            <p className="mt-6">Here's how it works.</p>
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


