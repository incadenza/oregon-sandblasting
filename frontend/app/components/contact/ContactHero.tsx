const heroBg = '/figma-assets/contact-hero.png'

export default function ContactHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[725px] lg:min-h-0">
      {/* Background image - Figma: rotated 180deg, flipped vertically */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full scale-x-[-1] object-cover object-right"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient */}
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient - wider for contact page */}
      <div className="absolute left-0 top-0 h-full w-[90%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Right gradient */}
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content */}
      <div className="container relative flex min-h-[500px] flex-col justify-center py-20 lg:min-h-0 lg:h-full lg:py-0">
        <div className="lg:pt-[48px]">
          {/* "TALK TO THE TEAM" label - Figma: 16px, tracking 1.6px */}
          <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
            TALK TO THE TEAM
          </p>

          {/* Main heading - Figma: 75px Satoshi Bold, leading 1.05, single line with "?" */}
          <h1 className="mt-8 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[75px]">
            Have a Spec? A Question? A Challenge?
          </h1>

          {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, max-width 716px */}
          <p className="mt-10 max-w-[716px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-12 lg:text-[20px]">
            Whether you're managing a complex spec, racing a deadline, or done chasing multiple
            vendors, we're here to make coatings easier. Tell us about your project and we'll show
            you a faster, cleaner way to get it done with no friction.
          </p>
        </div>
      </div>
    </section>
  )
}


