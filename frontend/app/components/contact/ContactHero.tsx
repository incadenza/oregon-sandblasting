import ActionLink from '@/app/components/ui/ActionLink'

const heroBg = '/figma-assets/0b79bed3922fbe0764f4a225447dda56cfd7f8bc.png'

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-design-oregonSandblastingBlue text-white">
      <div className="absolute inset-0">
        <img alt="" src={heroBg} className="h-full w-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-design-oregonSandblastingBlue/0 via-design-oregonSandblastingBlue/30 to-design-oregonSandblastingBlue/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-design-oregonSandblastingBlue/70 via-transparent to-design-oregonSandblastingBlue/60 mix-blend-multiply" />
      </div>

      <div className="container relative">
        <div className="py-14 md:py-20">
          <p className="text-[16px] font-medium tracking-[0.1em] text-white/90">TALK TO THE TEAM</p>
          <h1 className="mt-6 max-w-4xl text-[44px] font-bold leading-[1.05] text-white sm:text-[60px] md:text-[75px]">
            Have a Spec?
            <br />
            A Question?
            <br />
            A Challenge?
          </h1>

          <p className="mt-8 max-w-2xl text-[16px] leading-[1.55] text-white/85 md:text-[20px]">
            Whether you’re managing a complex spec, racing a deadline, or done chasing multiple
            vendors, we’re here to make coatings easier. Tell us about your project and we’ll show
            you a faster, cleaner way to get it done with no friction.
          </p>

          <div className="mt-8">
            <ActionLink href="#form" label="Request a Quote" variant="filled" />
          </div>
        </div>
      </div>
    </section>
  )
}


