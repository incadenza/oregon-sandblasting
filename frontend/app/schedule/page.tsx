import {sanityFetch} from '@/sanity/lib/live'
import {schedulePageQuery} from '@/sanity/lib/queries'

import ScheduleClient from '@/app/components/schedule/ScheduleClient'

export default async function SchedulePage() {
  const {data} = await sanityFetch({query: schedulePageQuery})

  return <ScheduleClient data={data} />
}
