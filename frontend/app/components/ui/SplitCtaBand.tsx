import ActionLink from '@/app/components/ui/ActionLink'

type SplitCtaBandProps = {
  title: string
  body: string
  buttonLabel: string
  buttonHref: string
  className?: string
}

export default function SplitCtaBand({
  title,
  body,
  buttonLabel,
  buttonHref,
  className = '',
}: SplitCtaBandProps) {
  return (
    <section className={`bg-design-royalBlue py-16 text-white ${className}`.trim()}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-[36px] font-bold leading-[1.1] sm:text-[48px] md:text-[60px]">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.55] text-white/90 md:text-[20px]">{body}</p>
            <div className="mt-8">
              <ActionLink href={buttonHref} label={buttonLabel} variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


