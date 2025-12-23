import type {Metadata} from 'next'

import TeamHero from '@/app/components/team/TeamHero'
import TeamGrid from '@/app/components/team/TeamGrid'
import {sanityFetch} from '@/sanity/lib/live'
import {teamMembersQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'The Team | Oregon Sandblasting',
  description: 'Meet the team behind Oregon Sandblasting & Coating.',
}

export default async function TeamPage() {
  const {data: teamMembers} = await sanityFetch({query: teamMembersQuery})

  return (
    <>
      <TeamHero />
      <TeamGrid members={teamMembers} />
    </>
  )
}

