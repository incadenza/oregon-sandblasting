import ActionLink from '@/app/components/ui/ActionLink'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    hero?: {
      label?: string | null
      heading?: string | null
      body?: string | null
      ctaLabel?: string | null
      ctaLink?: any
      backgroundImage?: any
    } | null
  } | null
}

const defaultBody = `The final stop for structural steel that will help you meet the schedule, not break the schedule.

We built Oregon Sandblasting & Coating to eliminate the coordination issues, delays, and visual inconsistencies that slow down complex jobs. Whether you're fabricating infrastructure, industrial systems, or high-value architectural steel, we deliver more than a finished part. We deliver reliability, speed, and control where it matters most.`

export default function WhatMakesUsDifferentHero({data}: Props) {
  const hero = data?.hero
  const label = hero?.label || 'WHAT MAKES US DIFFERENT'
  const heading = hero?.heading || "More than a Coater.\nA Critical Project Partner."
  const body = hero?.body || defaultBody
  const ctaLabel = hero?.ctaLabel || 'Request a Quote'
  const ctaHref = linkResolver(hero?.ctaLink) || '/contact'
  const bgUrl = urlForImage(hero?.backgroundImage)?.url() || '/figma-assets/wmud-hero.png'
  const paragraphs = body.split('\n\n').filter(Boolean)
  const headingLines = heading.split('\n')

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-design-oregonSandblastingBlue text-white lg:h-[1050px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src={bgUrl}
          className="h-full w-full object-cover object-[center_30%] md:object-center lg:absolute lg:h-[120%] lg:w-[130%] lg:max-w-none lg:-left-[15%] lg:-top-[10%]"
        />
      </div>

      <div className="absolute bottom-0 left-0 h-[65%] w-full bg-gradient-to-t from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-[40%] w-full bg-gradient-to-b from-[#2c3f50] to-transparent mix-blend-multiply" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#2c3f50] via-[#2c3f50]/50 to-transparent mix-blend-multiply md:w-[75%]" />
      <div className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-[#2c3f50] to-transparent mix-blend-multiply" />

      <div className="container relative py-16 lg:pt-[120px] lg:pb-24">
        <p className="font-sans text-[16px] font-medium uppercase tracking-[1.6px] text-white">
          {label}
        </p>

        <h1 className="mt-6 max-w-[919px] font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:mt-8 lg:text-[75px]">
          {headingLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="mt-8 max-w-[680px] font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:mt-10 lg:text-[20px]">
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? 'mt-4 lg:mt-6' : undefined}>
              {p}
            </p>
          ))}
        </div>

        {ctaLabel && (
          <div className="mt-8 lg:mt-10">
            <ActionLink href={ctaHref} label={ctaLabel} variant="filled" />
          </div>
        )}
      </div>
    </section>
  )
}
