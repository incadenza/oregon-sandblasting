const heroBg = '/figma-assets/contact-hero.png'

export default function TeamHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[725px] lg:min-h-0">
      {/* Background image - same style as contact hero */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full scale-x-[-1] object-cover object-right"
        />
      </div>

      {/* Gradient overlays matching Figma */}
      <div className="absolute bottom-0 left-0 h-[689px] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[407px] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-[90%] bg-gradient-to-r from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute right-0 top-0 h-full w-[407px] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      {/* Content */}
      <div className="container relative flex min-h-[500px] flex-col justify-center py-20 lg:min-h-0 lg:h-full lg:py-0">
        <div className="lg:pt-[48px]">
          {/* Label */}
          <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
            THE TEAM
          </p>

          {/* Main heading */}
          <h1 className="mt-8 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[75px]">
            Meet the People Behind the Work
          </h1>

          {/* Body text */}
          <p className="mt-10 max-w-[716px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-12 lg:text-[20px]">
            Our team brings decades of combined experience in industrial coating, blasting, and
            finishing. We're hands-on, responsive, and committed to getting your job done right.
          </p>
        </div>
      </div>
    </section>
  )
}

