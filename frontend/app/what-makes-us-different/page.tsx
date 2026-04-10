import {sanityFetch} from '@/sanity/lib/live'
import {whatMakesUsDifferentPageQuery} from '@/sanity/lib/queries'

import DontJustFinishCta from '@/app/components/what-makes-us-different/DontJustFinishCta'
import HowWeDoItSection from '@/app/components/what-makes-us-different/HowWeDoItSection'
import WhatMakesUsDifferentHero from '@/app/components/what-makes-us-different/WhatMakesUsDifferentHero'

export default async function WhatMakesUsDifferentPage() {
  const {data} = await sanityFetch({query: whatMakesUsDifferentPageQuery})

  return (
    <>
      <WhatMakesUsDifferentHero data={data} />
      <HowWeDoItSection data={data} />
      <DontJustFinishCta data={data?.bottomCta} />
    </>
  )
}
