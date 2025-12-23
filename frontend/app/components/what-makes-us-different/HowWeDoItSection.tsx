import AccentBars from '@/app/components/ui/AccentBars'

type Feature = {
  id: string
  title: React.ReactNode
  kickerBold: React.ReactNode
  body: React.ReactNode
  iconSrc: string
  iconAlt: string
  iconClassName: string
  showBlueBar?: boolean
  minHeightPx?: number
}

function FigmaIcon({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className: string
}) {
  return (
    <img alt={alt} src={src} className={className} />
  )
}

function FeatureCard({
  feature,
  showBlueBar = false,
}: {
  feature: Feature
  showBlueBar?: boolean
}) {
  return (
    <div
      className="relative flex h-full flex-col px-1 py-10 sm:px-6 lg:px-0 lg:py-0"
      style={feature.minHeightPx ? ({minHeight: feature.minHeightPx} as React.CSSProperties) : undefined}
    >
      {/* Icon */}
      <FigmaIcon
        src={feature.iconSrc}
        alt={feature.iconAlt}
        className={`block ${feature.iconClassName}`}
      />

      {/* Title - Figma: top ~111px from icon */}
      <h3 className="mt-6 text-[40px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[50px] lg:mt-[30px]">
        {feature.title}
      </h3>

      {/* Body text - Figma: ~155px gap from title to body area */}
      <div className="mt-8 flex-1 text-[18px] font-medium leading-[1.4] text-design-oregonSandblastingBlue sm:text-[20px] lg:mt-[84px]">
        <p className="font-bold text-design-oregonSandblastingBlue">{feature.kickerBold}</p>
        <p className="mt-6 lg:mt-[56px]">{feature.body}</p>
      </div>

      {/* Blue accent bars */}
      {showBlueBar ? <AccentBars align="left" className="mt-10" /> : null}
    </div>
  )
}

export default function HowWeDoItSection() {
  const features: Feature[] = [
    {
      id: 'all-finishes',
      title: 'All Finishes, One Roof',
      kickerBold: 'No handoffs. No disconnects. Just one seamless workflow.',
      body:
        "We handle powder, liquid, and specialty coatings in-house, all under one roof with one team. That means no more juggling multiple vendors or dealing with schedule drift because a coating partner wasn't ready. Whether you're coating a single spec or managing a multi-process assembly, we simplify the job from start to finish.",
      iconSrc: '/figma-assets/icon-futuro-finishes.svg',
      iconAlt: '',
      iconClassName: 'h-[77px] w-[82px]',
      showBlueBar: true,
      minHeightPx: 627,
    },
    {
      id: 'built-for-scale',
      title: (
        <>
          Built for <br />
          Scale
        </>
      ),
      kickerBold: 'We move big steel. Fast.',
      body:
        "From oversized structural pieces to high-volume runs, we're equipped to handle serious throughput. Our facility houses one of the largest wheelabrators on the West Coast and a suite of massive powder ovens built for industrial scale. What takes most shops six hours to blast, we can do in fifteen minutes without sacrificing quality.",
      iconSrc: '/figma-assets/icon-futuro-scale.svg',
      iconAlt: '',
      iconClassName: 'h-[82px] w-[82px]',
      showBlueBar: true,
      minHeightPx: 632,
    },
    {
      id: 'schedule-compression',
      title: 'Schedule Compression',
      kickerBold: (
        <>
          We help you win back time across days, weeks,
          <br /> or even months.
        </>
      ),
      body: (
        <>
          By consolidating processes, reducing friction,
          <br />
          and eliminating rework, we help our partners
          <br />
          meet tight project timelines with less stress. If your coating partner is holding up your
          schedule, it's time to make a change.
        </>
      ),
      iconSrc: '/figma-assets/icon-futuro-schedule.svg',
      iconAlt: '',
      iconClassName: 'h-[72px] w-[82px]',
      showBlueBar: true,
      minHeightPx: 622,
    },
    {
      id: 'spec-driven-precision',
      title: 'Spec-Driven Precision',
      kickerBold: 'No mismatches. No rework. No headaches.',
      body:
        'Our team delivers powder and liquid finishes with proven visual consistency across systems, across assemblies, and across timelines. That means no surprises for your client, no field rework, and no excuses when it comes time to ship.',
      iconSrc: '/figma-assets/icon-layer.svg',
      iconAlt: '',
      iconClassName: 'h-[74px] w-[82px]',
      minHeightPx: 540,
    },
    {
      id: 'the-coaters-loop',
      title: (
        <>
          The Coater's <br />
          Loop
        </>
      ),
      kickerBold: 'Finishing ecosystem. One block. Zero friction.',
      body:
        "We're located in the heart of the Coater's Loop, within steps of galvanizing and other finishing partners. That proximity reduces freight, shortens timelines, and makes it easier to deliver finished steel that's truly ready to go.",
      iconSrc: '/figma-assets/icon-iteration-cycles.svg',
      iconAlt: '',
      iconClassName: 'h-[86px] w-[86px]',
      minHeightPx: 546,
    },
  ]

  return (
    <section className="bg-white py-20 overflow-x-hidden">
      <div className="container">
        <h2 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
          This is how we do it:
        </h2>

        {/* Mobile/tablet: stacked cards with consistent spacing */}
        <div className="mt-10 grid grid-cols-1 gap-14 lg:hidden">
          {features.map((f) => (
            <div key={f.id} className="border-b border-design-lightGray pb-14 last:border-b-0 last:pb-0">
              <FeatureCard feature={f} showBlueBar={Boolean(f.showBlueBar)} />
            </div>
          ))}
        </div>

        {/* Desktop: responsive 3-column grid with dividers */}
        <div className="mt-[120px] hidden lg:block">
          {/* Row 1 (3-up) */}
          <div className="grid grid-cols-3 gap-x-[60px]">
            <div className="relative">
              <FeatureCard feature={features[0]} showBlueBar={Boolean(features[0].showBlueBar)} />
            </div>

            <div className="relative border-l border-design-lightGray pl-[60px]">
              <FeatureCard feature={features[1]} showBlueBar={Boolean(features[1].showBlueBar)} />
            </div>

            <div className="relative border-l border-design-lightGray pl-[60px]">
              <FeatureCard feature={features[2]} showBlueBar={Boolean(features[2].showBlueBar)} />
            </div>
          </div>

          {/* Row gap */}
          <div className="h-[68px]" />

          {/* Row 2 (2-up) */}
          <div className="grid grid-cols-3 gap-x-[60px]">
            <div className="relative">
              <FeatureCard feature={features[3]} showBlueBar={Boolean(features[3].showBlueBar)} />
            </div>

            <div className="relative border-l border-design-lightGray pl-[60px]">
              <FeatureCard feature={features[4]} showBlueBar={Boolean(features[4].showBlueBar)} />
            </div>

            <div />
          </div>
        </div>
      </div>
    </section>
  )
}


