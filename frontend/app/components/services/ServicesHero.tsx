import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/services-hero.png'

export default function ServicesHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px] lg:min-h-0">
      {/* Background image - Figma: 2399×1600 image at left=-43, top=-53 in 1920×1050 hero */}
      {/* Image is 125% width and 152% height of container, positioned slightly outside */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="absolute -left-[2%] -top-[5%] h-[152%] w-[125%] max-w-none scale-x-[-1] object-cover"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient */}
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient */}
      <div className="absolute left-0 top-0 h-full w-[75%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Right gradient */}
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content - positioned near top like Figma (y=160 for label, y=197 for heading) */}
      <div className="container relative py-32 lg:pt-[48px] lg:pb-0">
        {/* "SERVICES" label - Figma: 16px, tracking 1.6px, y=160 */}
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          SERVICES
        </p>

        {/* Main heading - Figma: 75px Satoshi Bold, leading 1.05, y=197, width 919px */}
        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          The West Coast's Fastest Path to Finished Steel, for Builders Big and Small
        </h1>

        {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, y=457, width 680px */}
        <div className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          <p>
            We handle every stage of industrial finishing, from blast to final coat, all in one
            QP-3 Certified shop. Our process control, equipment scale, and facility layout make
            us a fit for complex assemblies, oversized steel, and projects that demand visual
            precision and schedule reliability.
          </p>
          <p className="mt-6">
            Located in the heart of the Coater's Loop, we're just steps from galvanizing
            partners, giving you a complete finishing solution with less freight, fewer handoffs,
            and faster turnarounds.
          </p>
        </div>

        {/* CTA - Figma: y=710 */}
        <div className="mt-8 lg:mt-10">
          <ActionLink href="/contact" label="Request a Quote" variant="filled" />
        </div>
      </div>
    </section>
  )
}


