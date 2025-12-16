type AccentBarsProps = {
  align?: 'left' | 'right'
  className?: string
}

export default function AccentBars({align = 'right', className = ''}: AccentBarsProps) {
  return (
    <div className={`mt-10 flex ${align === 'right' ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className="flex gap-0">
        <span className="h-[15px] w-[87px] bg-design-brightBlue" />
        <span className="h-[15px] w-[88px] bg-design-brightBlue" />
        <span className="h-[15px] w-[88px] bg-design-brightBlue" />
        <span className="h-[15px] w-[87px] bg-design-brightBlue" />
      </div>
    </div>
  )
}


