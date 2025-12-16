import HelpScopingCta from '@/app/components/services/HelpScopingCta'
import ServiceRow from '@/app/components/services/ServiceRow'
import ServicesHero from '@/app/components/services/ServicesHero'

const services = [
  {
    title: 'Blasting',
    description:
      'One of the largest wheelabrators on the West Coast, plus 2 large blast rooms. Ideal for prepping large structural steel, skid systems, and architectural builds in minutes rather than hours.',
    imageSrc: '/figma-assets/274921ce0f53b3bf5e43d067322520ce1f105b16.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Powder Coating',
    description:
      'Precision powder coating for both oversized assemblies and small-to-medium parts. Our large-format ovens handle complex fabrications, while our batch line supports high-speed, repeat part runs with flexible sizing and consistent control.',
    imageSrc: '/figma-assets/f00a33f8eebfb04beef2b8d3de8cad297a1a361e.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
  },
  {
    title: 'Liquid Coating',
    description:
      'Industrial-grade wet-applied systems, including zinc, epoxy and urethane coatings, applied by experienced technicians. A go-to solution for infrastructure, transportation, energy, and other spec-driven work.',
    imageSrc: '/figma-assets/a0969a9d0f65d0db89029b1ee9527a2f127bea59.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Hybrid Coating',
    description:
      'We combine powder and liquid finishes to accelerate schedules without compromising quality. Hybrid jobs are engineered for visual consistency across systems and executed entirely in-house.',
    imageSrc: '/figma-assets/0ad6e613cb8c2977c7b5e20ad1d0291a32014028.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
    learnMoreHref: '/about',
    learnMoreLabel: 'Learn more about hybrid coating',
  },
  {
    title: 'Specialty Coatings',
    description:
      'Support for a wide range of performance-based requirements, including marine-grade protection, zinc-rich primers, high-temp finishes, and thermal spray applications.',
    imageSrc: '/figma-assets/a558cff884c8667920b3389b86cc0a099e2f7b02.png',
    imageSide: 'left' as const,
    accentBarsSide: 'right' as const,
  },
  {
    title: 'Finish Matching',
    description:
      'Powder and liquid finishes delivered with visual consistency across systems. Multi-spec jobs finish clean with no color mismatch or sheen variation.',
    imageSrc: '/figma-assets/433f73ff27ff04b8031ce362d519175203c624e3.png',
    imageSide: 'right' as const,
    accentBarsSide: 'left' as const,
  },
]

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <section className="bg-white py-14">
        <div className="container">
          <h2 className="text-[38px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            Services
          </h2>
        </div>
      </section>

      {services.map((s) => (
        <ServiceRow key={s.title} {...s} />
      ))}

      <HelpScopingCta />
    </>
  )
}


