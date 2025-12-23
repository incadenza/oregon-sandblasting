type AccentBarsProps = {
  align?: 'left' | 'right'
  className?: string
}

export default function AccentBars({align = 'right', className = ''}: AccentBarsProps) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'} ${className}`}>
      {/* Figma: 4 bars, total width ~350px (87+88+88+87), height 15px */}
      <div className="flex">
        <span className="h-[15px] w-[87px] bg-design-brightBlue" />
        <span className="h-[15px] w-[88px] bg-design-brightBlue" />
        <span className="h-[15px] w-[88px] bg-design-brightBlue" />
        <span className="h-[15px] w-[87px] bg-design-brightBlue" />
      </div>
    </div>
  )
}


