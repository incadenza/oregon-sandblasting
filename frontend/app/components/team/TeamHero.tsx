const heroBg = '/figma-assets/team-hero.png'

export default function TeamHero() {
  return (
    <section className="relative min-h-[450px] overflow-hidden bg-design-oregonSandblastingBlue text-white md:min-h-[500px] lg:h-[550px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          alt=""
          src={heroBg}
          className="h-full w-full object-cover object-[30%_center] md:object-[40%_center] lg:object-center"
        />
      </div>

      {/* Gradient overlays */}
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 h-[65%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Top gradient */}
      <div className="absolute left-0 top-0 h-[40%] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      {/* Left gradient - stronger for text readability */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50] via-[#2c3f50]/50 to-transparent mix-blend-multiply md:w-[75%]" />
      {/* Right gradient */}
      <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-[#2c3f50]/50 to-transparent mix-blend-multiply" />

      {/* Content - consistent with ServicesHero */}
      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        {/* Label */}
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          The Team
        </p>

        {/* Main heading */}
        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          Trusted by the Team Behind the Build
        </h1>

        {/* Body text */}
        <p className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          We're not just coating parts. We're solving production challenges for the fabricators, engineers, and contractors who build the world.
        </p>
      </div>
    </section>
  )
}

