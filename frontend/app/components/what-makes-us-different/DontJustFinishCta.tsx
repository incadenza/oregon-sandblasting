import SplitCtaBand from '@/app/components/ui/SplitCtaBand'
import {linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    heading?: string | null
    body?: string | null
    buttonLabel?: string | null
    buttonLink?: any
  } | null
}

export default function DontJustFinishCta({data}: Props) {
  return (
    <SplitCtaBand
      title={
        data?.heading || "We Don't Just Finish Parts.\nWe Help You Finish the Job."
      }
      body={
        data?.body ||
        "Let's talk through your next project. We'll help you scope the best approach and show you how much time, cost, and complexity you can save."
      }
      buttonLabel={data?.buttonLabel || 'Talk to Our Team'}
      buttonHref={linkResolver(data?.buttonLink) || '/contact'}
    />
  )
}
