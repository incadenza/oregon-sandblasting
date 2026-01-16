import type {Metadata} from 'next'

import BottomLineCta from '@/app/components/about/BottomLineCta'
import TeamGrid from '@/app/components/team/TeamGrid'
import TeamHero from '@/app/components/team/TeamHero'

export const metadata: Metadata = {
  title: 'The Team | Oregon Sandblasting',
  description: 'Meet the team behind Oregon Sandblasting & Coating.',
}

// Hardcoded team members based on Figma design
const teamMembers = [
  {_id: '1', firstName: 'Jason', lastName: 'Crawford', role: 'Owner', picture: '/figma-assets/team/jason-osb-3886 1.png'},
  {_id: '2', firstName: 'Mike', lastName: 'Ward', role: 'General Manager', picture: '/figma-assets/team/mike-osb-3836 1.png'},
  {_id: '3', firstName: 'Andrew', lastName: 'Toth', role: 'Sales Manager', picture: '/figma-assets/team/andy-osb-3606 1.png'},
  {_id: '4', firstName: 'Earlene', lastName: 'Hoskins', role: 'HR and Accounting', picture: null},
  {_id: '5', firstName: 'Alan', lastName: 'Squires', role: 'Quality Control Manager', picture: '/figma-assets/team/alan-osb-3634 1.png'},
  {_id: '6', firstName: 'Kelsey', lastName: 'Burns', role: 'Scheduling Coordinator', picture: null}, // No image found - check if andy-osb-3606 1-1.png is Kelsey
  {_id: '7', firstName: 'Dave', lastName: 'Finzer', role: 'Powder Expert', picture: '/figma-assets/team/dave-osb-3800 1.png'},
  {_id: '8', firstName: 'Chip', lastName: 'Schaber', role: 'Shipping and Project Manager', picture: '/figma-assets/team/chip-osb-3773 1.png'},
  {_id: '9', firstName: 'Stephen', lastName: 'Toth', role: 'Project Manager', picture: '/figma-assets/team/stephen-osb-3547 1.png'},
  {_id: '10', firstName: 'Carson', lastName: 'Warner', role: 'Estimator', picture: '/figma-assets/team/carson-osb-3467 1.png'},
  {_id: '11', firstName: 'Austin', lastName: 'Shadbolt', role: 'Estimator', picture: '/figma-assets/team/austin-osb-3707 1.png'},
]

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <TeamGrid members={teamMembers} />
      <BottomLineCta />
    </>
  )
}

