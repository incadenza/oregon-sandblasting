import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'

import DifferentiatorSection from '@/app/components/home/DifferentiatorSection'
import FromBlastToFinish from '@/app/components/home/FromBlastToFinish'
import HomeHero from '@/app/components/home/HomeHero'
import QuickLinksRow from '@/app/components/home/QuickLinksRow'
import TrustedByStrip from '@/app/components/home/TrustedByStrip'

export default async function Page() {
  const {data} = await sanityFetch({query: homePageQuery})

  return (
    <>
      <HomeHero data={data} />
      <TrustedByStrip data={data} />
      <DifferentiatorSection data={data} />
      <FromBlastToFinish data={data} />
      <QuickLinksRow data={data} />
    </>
  )
}
