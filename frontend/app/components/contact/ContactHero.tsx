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

export default function ContactHero({data}: Props) {
  const hero = data?.hero
  const label = hero?.label || 'TALK TO THE TEAM'
  const heading = hero?.heading || 'Have a Spec? A Question? A Challenge?'
  const body =
    hero?.body ||
    "Whether you're managing a complex spec, racing a deadline, or done chasing multiple vendors, we're here to make coatings easier. Tell us about your project and we'll show you a faster, cleaner way to get it done with no friction."
  const bgUrl = urlForImage(hero?.backgroundImage)?.url() || '/figma-assets/contact-hero.png'

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={bgUrl}
          className="h-full w-full scale-x-[-1] object-cover object-[center_30%] md:object-right"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[65%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[40%] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50] via-[#2c3f50]/50 to-transparent mix-blend-multiply md:w-[90%]" />
      <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          {label}
        </p>

        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          {heading}
        </h1>

        <p className="mt-8 max-w-[716px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          {body}
        </p>
      </div>
    </section>
  )
}
