import {urlForImage} from '@/sanity/lib/utils'

type Props = {
  data?: {
    hero?: {
      label?: string | null
      heading?: string | null
      body?: string | null
      backgroundImage?: any
    } | null
  } | null
}

export default function TeamHero({data}: Props) {
  const hero = data?.hero
  const label = hero?.label || 'The Team'
  const heading = hero?.heading || 'Trusted by the Team Behind the Build'
  const body =
    hero?.body ||
    "We're not just coating parts. We're solving production challenges for the fabricators, engineers, and contractors who build the world."
  const bgUrl = urlForImage(hero?.backgroundImage)?.url() || '/figma-assets/team-hero.png'

  return (
    <section className="relative min-h-[450px] overflow-hidden bg-design-oregonSandblastingBlue text-white md:min-h-[500px] lg:h-[550px]">
      <div className="absolute inset-0">
        <img
          alt=""
          src={bgUrl}
          className="h-full w-full object-cover object-[30%_center] md:object-[40%_center] lg:object-center"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[65%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[40%] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50] via-[#2c3f50]/50 to-transparent mix-blend-multiply md:w-[75%]" />
      <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-[#2c3f50]/50 to-transparent mix-blend-multiply" />

      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          {label}
        </p>

        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          {heading}
        </h1>

        <p className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          {body}
        </p>
      </div>
    </section>
  )
}
