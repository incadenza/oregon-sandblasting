'use client'

import {stegaClean} from '@sanity/client/stega'
import {Image} from 'next-sanity/image'

import {urlForImage} from '@/sanity/lib/utils'

type TeamMember = {
  _id: string
  firstName: string
  lastName: string
  role?: string | null
  picture?: {
    asset?: {
      _ref: string
    } | null
    alt?: string | null
    hotspot?: {x: number; y: number} | null
    crop?: {top: number; bottom: number; left: number; right: number} | null
  } | null
}

type TeamGridProps = {
  members: TeamMember[] | null
}

function TeamMemberCard({member}: {member: TeamMember}) {
  const imageUrl = member.picture ? urlForImage(member.picture)?.width(400).height(500).fit('crop').url() : null
  const fullName = `${member.firstName} ${member.lastName}`
  const altText = member.picture?.alt ? stegaClean(member.picture.alt) : fullName

  return (
    <div className="group flex flex-col">
      {/* Image container - Figma style with teal background */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#93b8c1]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/50">
            <svg
              className="h-24 w-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Name and role */}
      <div className="mt-6">
        <h3 className="font-sans text-[24px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[28px]">
          {fullName}
        </h3>
        {member.role && (
          <p className="mt-2 font-sans text-[16px] font-medium leading-[1.4] text-design-oregonSandblastingBlue/70 sm:text-[18px]">
            {member.role}
          </p>
        )}
      </div>
    </div>
  )
}

export default function TeamGrid({members}: TeamGridProps) {
  if (!members || members.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="container">
          <p className="text-center text-[20px] font-medium text-design-oregonSandblastingBlue/60">
            No team members to display yet. Add team members in Sanity Studio.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white pt-[120px] pb-[100px]">
      <div className="container">
        {/* Section heading */}
        <h2 className="font-sans text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
          Our Team
        </h2>

        {/* Grid of team members */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

