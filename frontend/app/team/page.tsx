import type {Metadata} from 'next'

import {sanityFetch} from '@/sanity/lib/live'
import {teamPageQuery, teamMembersQuery} from '@/sanity/lib/queries'

import BottomLineCta from '@/app/components/about/BottomLineCta'
import TeamGrid from '@/app/components/team/TeamGrid'
import TeamHero from '@/app/components/team/TeamHero'

export const metadata: Metadata = {
  title: 'The Team | Oregon Sandblasting',
  description: 'Meet the team behind Oregon Sandblasting & Coating.',
}

export default async function TeamPage() {
  const [{data: pageData}, {data: members}] = await Promise.all([
    sanityFetch({query: teamPageQuery}),
    sanityFetch({query: teamMembersQuery}),
  ])

  return (
    <>
      <TeamHero data={pageData} />
      <TeamGrid members={members} />
      <BottomLineCta data={pageData?.bottomCta} />
    </>
  )
}
