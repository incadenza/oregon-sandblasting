export default function WhatIsHybridCoating() {
  return (
    <section className="bg-white pt-[120px] pb-[100px]">
      <div className="container">
        {/* Figma: positioned at left 138px, top 1282px (relative to page), width 1021px, height 300px */}
        <div className="max-w-[1021px]">
          {/* Heading - Figma: 60px Satoshi Bold, leading 1.2 */}
          <h2 className="font-sans text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            What Is Hybrid Coating?
          </h2>

          {/* Body text - Figma: 20px Satoshi Medium, leading 1.4, top 122px from heading, max-width 887px */}
          <div className="mt-[50px] max-w-[887px] font-sans text-[16px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:text-[20px] lg:mt-[122px]">
            <p>
              Hybrid coating uses both powder and liquid finishes on a single job, often on
              different parts of the same assembly. For example, powder on grating and handrail,
              liquid on large structural steel. The result is faster throughput, better material
              compatibility, and a matched final appearance.
            </p>
            <p className="mt-8">
              Our team coordinates the entire process under one roof, so you avoid back-and-forth
              handoffs, mismatched finishes, and lost time waiting on third-party vendors.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


