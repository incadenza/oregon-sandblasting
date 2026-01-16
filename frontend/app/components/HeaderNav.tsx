import HeaderLink from '@/app/components/HeaderLink'

export default function HeaderNav() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      <HeaderLink href="/team" label="The Team" />
      <HeaderLink href="/services" label="Services" />
      <HeaderLink
        href="/what-makes-us-different"
        label="What Makes Us Different"
      />
      {/* <HeaderLink href="/posts" label="Projects" /> */}
      <HeaderLink href="/about" label="About Hybrid Coatings" />
      <HeaderLink href="/schedule" label="Schedule Your Dropoff" />
      <HeaderLink
        href="/contact"
        label="Talk to the Team"
        variant="cta"
        className="ml-2"
        endIcon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 7H17V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </nav>
  )
}


