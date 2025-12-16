import DifferentiatorSection from '@/app/components/home/DifferentiatorSection'
import FromBlastToFinish from '@/app/components/home/FromBlastToFinish'
import HomeHero from '@/app/components/home/HomeHero'
import QuickLinksRow from '@/app/components/home/QuickLinksRow'
import TrustedByStrip from '@/app/components/home/TrustedByStrip'

export default function Page() {
  return (
    <>
      <HomeHero />
      <TrustedByStrip />
      <DifferentiatorSection />
      <FromBlastToFinish />
      <QuickLinksRow />
    </>
  )
}
