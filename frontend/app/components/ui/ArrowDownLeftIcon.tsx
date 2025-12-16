type ArrowDownLeftIconProps = {
  className?: string
}

export default function ArrowDownLeftIcon({className = ''}: ArrowDownLeftIconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Down-left arrow, matching the Figma icon direction */}
      <path
        d="M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 9V17H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


