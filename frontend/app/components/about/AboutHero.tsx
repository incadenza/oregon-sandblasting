import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/63a3955e546fa076a9dfbb01ba55faffee7d46ba.png'

export default function AboutHero() {
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
            ABOUT HYBRID COATINGS
          </p>
          <h1 className="mt-6 max-w-4xl text-[44px] font-bold leading-[1.05] text-white sm:text-[60px] md:text-[75px]">
            Faster Finishes for Jobs That Can’t Afford Delays
          </h1>

          <p className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-white/85 md:text-[20px]">
            Every extra day in the field costs time, money, and coordination effort.
            <br />
            <br />
            Hybrid coating helps you get ahead of the schedule by combining powder and liquid
            systems in one controlled workflow, inside one facility.
            <br />
            <br />
            Whether you’re managing a multi-phase project or trying to avoid rework and site
            delays, hybrid coating gives you the flexibility to finish faster without compromising
            finish quality or performance.
            <br />
            Here’s how it works.
          </p>

          <div className="mt-8">
            <ActionLink href="/contact" label="Request a Quote" variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


