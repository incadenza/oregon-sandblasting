import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery} from '@/sanity/lib/queries'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'

import AboutHero from '@/app/components/about/AboutHero'
import BottomLineCta from '@/app/components/about/BottomLineCta'
import WhatIsHybridCoating from '@/app/components/about/WhatIsHybridCoating'
import ServiceRow from '@/app/components/services/ServiceRow'

export default async function AboutHybridCoatingsPage() {
  const {data} = await sanityFetch({query: aboutPageQuery})

  const contentRows = data?.contentRows && data.contentRows.length > 0
    ? data.contentRows.map((row: any, i: number) => ({
        title: row.title || '',
        description: row.description || '',
        imageSrc: urlForImage(row.image)?.width(1400).url() || '',
        imageAlt: row.image?.alt || '',
        imageSide: (row.imageSide as 'left' | 'right') || (i % 2 === 0 ? 'left' : 'right'),
        learnMoreHref: linkResolver(row.learnMoreLink) || undefined,
        learnMoreLabel: row.learnMoreLabel || undefined,
      }))
    : [
        {
          title: 'Why It Works So Well',
          description:
            "Traditional coating workflows involve multiple vendors, scattered timelines, and field coordination. That leads to bottlenecks, inconsistent finishes, and more opportunity for error.\n\nHybrid coating removes the friction. We apply the right coating to the right part, in the right sequence, without leaving the facility. That means tighter timelines, fewer change orders, and no guesswork.",
          imageSrc: '/figma-assets/about-why-works.png',
          imageSide: 'left' as const,
        },
        {
          title: 'Why In-Shop Beats In-Field',
          description:
            "Field coating is slower, less predictable, and more expensive. It puts pressure on your install crew, increases labor costs, and introduces finish risk due to weather, surface prep, or coordination delays.\n\nBy completing the entire coating process in a controlled environment, we give your team a cleaner, more consistent finish with fewer surprises on site.",
          imageSrc: '/figma-assets/about-in-shop.png',
          imageSide: 'right' as const,
        },
      ]

  return (
    <>
      <AboutHero data={data} />
      <WhatIsHybridCoating data={data} />

      <div className="flex flex-col gap-[100px] pb-[100px]">
        {contentRows.map((row: any, i: number) => (
          <ServiceRow
            key={row.title || i}
            title={row.title}
            description={row.description}
            imageSrc={row.imageSrc}
            imageAlt={row.imageAlt}
            imageSide={row.imageSide}
            accentBarsSide="left"
            learnMoreHref={row.learnMoreHref}
            learnMoreLabel={row.learnMoreLabel}
          />
        ))}
      </div>

      <BottomLineCta data={data?.bottomCta} />
    </>
  )
}
