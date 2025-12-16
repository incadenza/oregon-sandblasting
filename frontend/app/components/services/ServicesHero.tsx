import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/f991cc7c39a1c5defb0a2d06854f03beae6ee478.png'

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-design-oregonSandblastingBlue text-white">
      <div className="absolute inset-0">
        <img alt="" src={heroBg} className="h-full w-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-design-oregonSandblastingBlue/0 via-design-oregonSandblastingBlue/30 to-design-oregonSandblastingBlue/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-design-oregonSandblastingBlue/70 via-transparent to-design-oregonSandblastingBlue/60 mix-blend-multiply" />
      </div>

      <div className="container relative">
        <div className="py-14 md:py-20">
          <p className="text-[16px] font-medium tracking-[0.1em] text-white/90">SERVICES</p>
          <h1 className="mt-6 max-w-4xl text-[44px] font-bold leading-[1.05] text-white sm:text-[60px] md:text-[75px]">
            The West Coast’s Fastest Path to Finished Steel, for Builders Big and Small
          </h1>

          <p className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-white/85 md:text-[20px]">
            We handle every stage of industrial finishing, from blast to final coat, all in one
            QP-3 Certified shop. Our process control, equipment scale, and facility layout make
            us a fit for complex assemblies, oversized steel, and projects that demand visual
            precision and schedule reliability.
            <br />
            <br />
            Located in the heart of the Coater’s Loop, we’re just steps from galvanizing
            partners, giving you a complete finishing solution with less freight, fewer handoffs,
            and faster turnarounds.
          </p>

          <div className="mt-8">
            <ActionLink href="/contact" label="Request a Quote" variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


