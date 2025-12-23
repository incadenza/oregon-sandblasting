import HelpScopingCta from '@/app/components/services/HelpScopingCta'
import ServiceRow from '@/app/components/services/ServiceRow'
import ServicesHero from '@/app/components/services/ServicesHero'

const services = [
  {
    title: 'Blasting',
    description:
      'One of the largest wheelabrators on the West Coast, plus 2 large blast rooms. Ideal for prepping large structural steel, skid systems, and architectural builds in minutes rather than hours.',
    imageSrc: '/figma-assets/blasting.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Powder Coating',
    description:
      'Precision powder coating for both oversized assemblies and small-to-medium parts. Our large-format ovens handle complex fabrications, while our batch line supports high-speed, repeat part runs with flexible sizing and consistent control. We also have foam capabilities.',
    imageSrc: '/figma-assets/powder-coating.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
  },
  {
    title: 'Liquid Coating',
    description:
      'Industrial-grade wet-applied systems, including zinc, epoxy and urethane coatings, applied by experienced technicians. A go-to solution for infrastructure, transportation, energy, and other spec-driven work.',
    imageSrc: '/figma-assets/liquid-coating.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Hybrid Coating',
    description:
      'We combine powder and liquid finishes to accelerate schedules without compromising quality. Hybrid jobs are engineered for visual consistency across systems and executed entirely in-house.',
    imageSrc: '/figma-assets/hybrid-coating.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
    learnMoreHref: '/about',
    learnMoreLabel: 'Learn more about hybrid coating',
  },
  {
    title: 'Specialty Coatings',
    description:
      'Support for a wide range of performance-based requirements, including marine-grade protection, zinc-rich primers, high-temp finishes, and thermal spray applications.',
    imageSrc: '/figma-assets/specialty-coatings.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Finish Matching',
    description:
      'Powder and liquid finishes delivered with visual consistency across systems. Multi-spec jobs finish clean with no color mismatch or sheen variation.',
    imageSrc: '/figma-assets/finish-matching.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
  },
]

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      {/* "Services" section title - Figma: y=1282, 60px Satoshi Bold */}
      <section className="bg-white pt-[120px] pb-[70px]">
        <div className="container">
          <h2 className="font-sans text-[40px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[50px] lg:text-[60px]">
            Services
          </h2>
        </div>
      </section>

      {/* Service rows - Figma: 100px gap between each row */}
      <div className="flex flex-col gap-[100px] pb-[100px]">
        {services.map((s) => (
          <ServiceRow key={s.title} {...s} />
        ))}
      </div>

      <HelpScopingCta />
    </>
  )
}


