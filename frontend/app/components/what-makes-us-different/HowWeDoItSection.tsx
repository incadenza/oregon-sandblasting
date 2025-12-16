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
  blueBarLeftPx?: number
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
  const blueBarLeftPx = feature.blueBarLeftPx ?? 4
  return (
    <div
      className="relative h-full px-1 py-10 sm:px-6 lg:px-0 lg:py-0"
      style={feature.minHeightPx ? ({minHeight: feature.minHeightPx} as React.CSSProperties) : undefined}
    >
      {/* Mobile/tablet flow layout */}
      <div className="lg:hidden">
        <FigmaIcon
          src={feature.iconSrc}
          alt={feature.iconAlt}
          className={`block ${feature.iconClassName}`}
        />
        <h3 className="mt-6 text-[40px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[50px]">
          {feature.title}
        </h3>
        <div className="mt-10 text-[18px] font-medium leading-[1.4] text-design-oregonSandblastingBlue sm:text-[20px]">
          <p className="font-bold text-design-oregonSandblastingBlue">{feature.kickerBold}</p>
          <p className="mt-[56px]">{feature.body}</p>
        </div>
        {showBlueBar ? <AccentBars align="left" className="mt-10" /> : null}
      </div>

      {/* Desktop: pin everything to match Figma measurements */}
      <div className="hidden lg:block">
        <div className="absolute left-0 top-0">
          <FigmaIcon
            src={feature.iconSrc}
            alt={feature.iconAlt}
            className={`block ${feature.iconClassName}`}
          />
        </div>

        <h3 className="absolute left-0 top-[111px] w-[469px] text-[50px] font-bold leading-[1.2] text-design-oregonSandblastingBlue">
          {feature.title}
        </h3>

        <div className="absolute left-[4px] top-[266px] w-[465px] text-[20px] font-medium leading-[1.4] text-design-oregonSandblastingBlue">
          <p className="font-bold text-design-oregonSandblastingBlue">{feature.kickerBold}</p>
          <p className="mt-[56px]">{feature.body}</p>
        </div>

        {showBlueBar ? (
          <div className="absolute bottom-0" style={{left: `${blueBarLeftPx}px`}}>
            <div className="flex gap-0">
              <span className="h-[15px] w-[87px] bg-design-brightBlue" />
              <span className="h-[15px] w-[88px] bg-design-brightBlue" />
              <span className="h-[15px] w-[88px] bg-design-brightBlue" />
              <span className="h-[15px] w-[87px] bg-design-brightBlue" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function HowWeDoItSection() {
  const features: Feature[] = [
    {
      id: 'all-industrial-finishes',
      title: 'All Industrial Finishes, One Roof',
      kickerBold: 'No handoffs. No disconnects. Just one seamless workflow.',
      body:
        'We handle powder, liquid, and specialty coatings in-house, all under one roof with one team. That means no more juggling multiple vendors or dealing with schedule drift because a coating partner wasn’t ready. Whether you’re coating a single spec or managing a multi-process assembly, we simplify the job from start to finish.',
      iconSrc: '/figma-assets/61a99c7f0aa9629234f9b05a78d7f7334f5f7dc8.svg',
      iconAlt: '',
      iconClassName: 'h-[77px] w-[82px]',
      showBlueBar: true,
      blueBarLeftPx: 4,
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
        'From oversized structural pieces to high-volume runs, we’re equipped to handle serious throughput. Our facility houses one of the largest wheelabrators on the West Coast and a suite of massive powder ovens built for industrial scale. What takes most shops six hours to blast, we can do in fifteen minutes without sacrificing quality.',
      iconSrc: '/figma-assets/cf22b43de71b317e5a6b3316063f93b927c52384.svg',
      iconAlt: '',
      iconClassName: 'h-[82px] w-[82px]',
      showBlueBar: true,
      blueBarLeftPx: 10,
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
          schedule, it’s time to make a change.
        </>
      ),
      iconSrc: '/figma-assets/d3bc95160041f47dcbed30b528ce739a7a6d56b5.svg',
      iconAlt: '',
      iconClassName: 'h-[72px] w-[82px]',
      showBlueBar: true,
      blueBarLeftPx: 10,
      minHeightPx: 622,
    },
    {
      id: 'spec-driven-precision',
      title: 'Spec-Driven Precision',
      kickerBold: 'No mismatches. No rework. No headaches.',
      body:
        'Our team delivers powder and liquid finishes with proven visual consistency across systems, across assemblies, and across timelines. That means no surprises for your client, no field rework, and no excuses when it comes time to ship.',
      iconSrc: '/figma-assets/f593e059d835205f657fe0771cc8ad4bdc017668.svg',
      iconAlt: '',
      iconClassName: 'h-[74px] w-[82px]',
      minHeightPx: 540,
    },
    {
      id: 'the-coaters-loop',
      title: (
        <>
          The Coater’s <br />
          Loop
        </>
      ),
      kickerBold: 'Finishing ecosystem. One block. Zero friction.',
      body:
        'We’re located in the heart of the Coater’s Loop, within steps of galvanizing and other finishing partners. That proximity reduces freight, shortens timelines, and makes it easier to deliver finished steel that’s truly ready to go.',
      iconSrc: '/figma-assets/fd9a5d4908223b9709bc56c8f9df10243eaacf22.svg',
      iconAlt: '',
      iconClassName: 'h-[86px] w-[86px]',
      minHeightPx: 546,
    },
  ]

  return (
    <section className="bg-white py-20">
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

        {/* Desktop: match Figma spacing (469px cards, 120px gaps, divider centered in the gap) */}
        <div className="mt-[120px] hidden lg:block">
          {/* Row 1 (3-up) */}
          <div className="grid grid-cols-[469px_120px_469px_120px_469px]">
            <FeatureCard feature={features[0]} showBlueBar={Boolean(features[0].showBlueBar)} />

            <div className="flex justify-center">
              <div className="mt-[112px] h-[475px] w-px bg-design-lightGray" />
            </div>

            <FeatureCard feature={features[1]} showBlueBar={Boolean(features[1].showBlueBar)} />

            <div className="flex justify-center">
              <div className="mt-[112px] h-[475px] w-px bg-design-lightGray" />
            </div>

            <FeatureCard feature={features[2]} showBlueBar={Boolean(features[2].showBlueBar)} />
          </div>

          {/* Row gap in Figma is ~68px */}
          <div className="h-[68px]" />

          {/* Row 2 (2-up) */}
          <div className="grid grid-cols-[469px_120px_469px_120px_469px]">
            <FeatureCard feature={features[3]} showBlueBar={Boolean(features[3].showBlueBar)} />

            <div className="flex justify-center">
              <div className="mt-[109px] h-[475px] w-px bg-design-lightGray" />
            </div>

            <FeatureCard feature={features[4]} showBlueBar={Boolean(features[4].showBlueBar)} />

            <div />
            <div />
          </div>
        </div>
      </div>
    </section>
  )
}


