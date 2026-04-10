type Props = {
  data?: {
    hybridCoatingHeading?: string | null
    hybridCoatingBody?: string | null
  } | null
}

const defaultBody = `Hybrid coating uses both powder and liquid finishes on a single job, often on different parts of the same assembly. For example, powder on grating and handrail, liquid on large structural steel. The result is faster throughput, better material compatibility, and a matched final appearance.

Our team coordinates the entire process under one roof, so you avoid back-and-forth handoffs, mismatched finishes, and lost time waiting on third-party vendors.`

export default function WhatIsHybridCoating({data}: Props) {
  const heading = data?.hybridCoatingHeading || 'What Is Hybrid Coating?'
  const body = data?.hybridCoatingBody || defaultBody
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <section className="bg-white pt-[120px] pb-[100px]">
      <div className="container">
        <div className="max-w-[1021px]">
          <h2 className="font-sans text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            {heading}
          </h2>

          <div className="mt-[50px] max-w-[887px] font-sans text-[16px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:text-[20px] lg:mt-[122px]">
            {paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? 'mt-8' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
