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

export default function HelpScopingCta({data}: Props) {
  return (
    <SplitCtaBand
      title={data?.heading || 'Get Help Scoping Your Project'}
      body={
        data?.body ||
        "Whether you're managing a tight deadline, navigating a complex spec, or just need a quote, we're ready to help you keep the job moving."
      }
      buttonLabel={data?.buttonLabel || 'Talk to Our Team'}
      buttonHref={linkResolver(data?.buttonLink) || '/contact'}
    />
  )
}
