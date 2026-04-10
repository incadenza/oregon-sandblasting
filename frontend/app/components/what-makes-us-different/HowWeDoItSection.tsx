import AccentBars from '@/app/components/ui/AccentBars'
import {urlForImage} from '@/sanity/lib/utils'

type Feature = {
  title: string
  kicker: string
  body: string
  iconSrc: string
  showAccentBars: boolean
}

const fallbackFeatures: Feature[] = [
  {
    title: 'All Finishes, One Roof',
    kicker: 'No handoffs. No disconnects. Just one seamless workflow.',
    body: "We handle powder, liquid, and specialty coatings in-house, all under one roof with one team. That means no more juggling multiple vendors or dealing with schedule drift because a coating partner wasn't ready. Whether you're coating a single spec or managing a multi-process assembly, we simplify the job from start to finish.",
    iconSrc: '/figma-assets/icon-futuro-finishes.svg',
    showAccentBars: true,
  },
  {
    title: 'Built for\nScale',
    kicker: 'We move big steel. Fast.',
    body: "From oversized structural pieces to high-volume runs, we're equipped to handle serious throughput. Our facility houses one of the largest wheelabrators on the West Coast and a suite of massive powder ovens built for industrial scale. What takes most shops six hours to blast, we can do in fifteen minutes without sacrificing quality.",
    iconSrc: '/figma-assets/icon-futuro-scale.svg',
    showAccentBars: true,
  },
  {
    title: 'Schedule Compression',
    kicker: 'We help you win back time across days, weeks, or even months.',
    body: "By consolidating processes, reducing friction, and eliminating rework, we help our partners meet tight project timelines with less stress. If your coating partner is holding up your schedule, it's time to make a change.",
    iconSrc: '/figma-assets/icon-futuro-schedule.svg',
    showAccentBars: true,
  },
  {
    title: 'Spec-Driven Precision',
    kicker: 'No mismatches. No rework. No headaches.',
    body: 'Our team delivers powder and liquid finishes with proven visual consistency across systems, across assemblies, and across timelines. That means no surprises for your client, no field rework, and no excuses when it comes time to ship.',
    iconSrc: '/figma-assets/icon-layer.svg',
    showAccentBars: false,
  },
  {
    title: "The Coater's\nLoop",
    kicker: 'Finishing ecosystem. One block. Zero friction.',
    body: "We're located in the heart of the Coater's Loop, within steps of galvanizing and other finishing partners. That proximity reduces freight, shortens timelines, and makes it easier to deliver finished steel that's truly ready to go.",
    iconSrc: '/figma-assets/icon-iteration-cycles.svg',
    showAccentBars: false,
  },
]

type Props = {
  data?: {
    featuresSectionHeading?: string | null
    features?: Array<{
      title?: string | null
      kicker?: string | null
      body?: string | null
      icon?: any
      showAccentBars?: boolean | null
    }> | null
  } | null
}

function FeatureCard({feature, showBlueBar}: {feature: Feature; showBlueBar: boolean}) {
  const titleLines = feature.title.split('\n')

  return (
    <div className="relative flex h-full flex-col px-1 py-10 sm:px-6 lg:px-0 lg:py-0">
      <img alt="" src={feature.iconSrc} className="block h-[77px] w-[82px]" />

      <h3 className="mt-6 text-[40px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[50px] lg:mt-[30px]">
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h3>

      <div className="mt-8 flex-1 text-[18px] font-medium leading-[1.4] text-design-oregonSandblastingBlue sm:text-[20px] lg:mt-[84px]">
        <p className="font-bold text-design-oregonSandblastingBlue">{feature.kicker}</p>
        <p className="mt-6 lg:mt-[56px]">{feature.body}</p>
      </div>

      {showBlueBar ? <AccentBars align="left" className="mt-10" /> : null}
    </div>
  )
}

export default function HowWeDoItSection({data}: Props) {
  const sectionHeading = data?.featuresSectionHeading || 'This is how we do it:'

  const features: Feature[] =
    data?.features && data.features.length > 0
      ? data.features.map((f, i) => ({
          title: f.title || '',
          kicker: f.kicker || '',
          body: f.body || '',
          iconSrc:
            urlForImage(f.icon)?.url() || fallbackFeatures[i]?.iconSrc || '',
          showAccentBars: f.showAccentBars ?? false,
        }))
      : fallbackFeatures

  return (
    <section className="bg-white py-20 overflow-x-hidden">
      <div className="container">
        <h2 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
          {sectionHeading}
        </h2>

        {/* Mobile/tablet: stacked cards */}
        <div className="mt-10 grid grid-cols-1 gap-14 lg:hidden">
          {features.map((f, i) => (
            <div
              key={f.title || i}
              className="border-b border-design-lightGray pb-14 last:border-b-0 last:pb-0"
            >
              <FeatureCard feature={f} showBlueBar={f.showAccentBars} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid with dividers */}
        <div className="mt-[120px] hidden lg:block">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-x-[60px]">
            {features.slice(0, 3).map((f, i) => (
              <div key={f.title || i} className={i > 0 ? 'relative border-l border-design-lightGray pl-[60px]' : 'relative'}>
                <FeatureCard feature={f} showBlueBar={f.showAccentBars} />
              </div>
            ))}
          </div>

          <div className="h-[68px]" />

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-x-[60px]">
            {features.slice(3).map((f, i) => (
              <div key={f.title || i} className={i > 0 ? 'relative border-l border-design-lightGray pl-[60px]' : 'relative'}>
                <FeatureCard feature={f} showBlueBar={f.showAccentBars} />
              </div>
            ))}
            {features.length <= 5 && features.length > 3 && <div />}
          </div>
        </div>
      </div>
    </section>
  )
}
