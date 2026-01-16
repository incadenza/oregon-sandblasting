type TeamMember = {
  _id: string
  firstName: string
  lastName: string
  role?: string | null
  picture?: string | null // Simple image URL for hardcoded data
}

type TeamGridProps = {
  members: TeamMember[] | null
}

function TeamMemberCard({member}: {member: TeamMember}) {
  const fullName = `${member.firstName} ${member.lastName}`

  return (
    <div className="group flex flex-col">
      {/* Image container - square aspect ratio matching Figma */}
      <div className="relative aspect-square overflow-hidden bg-[#e8eaec]">
        {member.picture ? (
          <img
            src={member.picture}
            alt={fullName}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* Placeholder silhouette - matching Figma gray style */
          <div className="flex h-full w-full items-end justify-center bg-[#e8eaec]">
            <svg
              className="h-[70%] w-[60%] text-[#d0d3d6]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Head */}
              <circle cx="50" cy="30" r="18" />
              {/* Shoulders/body */}
              <ellipse cx="50" cy="85" rx="35" ry="25" />
            </svg>
          </div>
        )}
      </div>

      {/* Name and role */}
      <div className="mt-5">
        <h3 className="font-sans text-[18px] font-bold leading-[1.2] text-black sm:text-[20px]">
          {fullName}
        </h3>
        {member.role && (
          <p className="mt-1 font-sans text-[14px] font-normal leading-[1.4] text-black/70 sm:text-[16px]">
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
          <p className="text-center text-[18px] font-medium text-black/60">
            No team members to display yet. Add team members in Sanity Studio.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        {/* Grid of team members - 3 columns on desktop matching Figma */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {members.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

