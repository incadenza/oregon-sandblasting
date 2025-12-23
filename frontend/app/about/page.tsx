import AboutHero from '@/app/components/about/AboutHero'
import BottomLineCta from '@/app/components/about/BottomLineCta'
import WhatIsHybridCoating from '@/app/components/about/WhatIsHybridCoating'
import ServiceRow from '@/app/components/services/ServiceRow'

export default function AboutHybridCoatingsPage() {
  return (
    <>
      <AboutHero />
      <WhatIsHybridCoating />

      {/* Service rows - matching services page sizing with 100px gap */}
      <div className="flex flex-col gap-[100px] pb-[100px]">
        <ServiceRow
          title="Why It Works So Well"
          description="Traditional coating workflows involve multiple vendors, scattered timelines, and field coordination. That leads to bottlenecks, inconsistent finishes, and more opportunity for error.\n\nHybrid coating removes the friction. We apply the right coating to the right part, in the right sequence, without leaving the facility. That means tighter timelines, fewer change orders, and no guesswork."
          imageSrc="/figma-assets/about-why-works.png"
          imageSide="left"
          accentBarsSide="left"
        />

        <ServiceRow
          title="Why In-Shop Beats In-Field"
          description="Field coating is slower, less predictable, and more expensive. It puts pressure on your install crew, increases labor costs, and introduces finish risk due to weather, surface prep, or coordination delays.\n\nBy completing the entire coating process in a controlled environment, we give your team a cleaner, more consistent finish with fewer surprises on site."
          imageSrc="/figma-assets/about-in-shop.png"
          imageSide="right"
          accentBarsSide="left"
        />
      </div>

      <BottomLineCta />
    </>
  )
}


