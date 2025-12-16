import ActionLink from '@/app/components/ui/ActionLink'

export default function BottomLineCta() {
  return (
    <section className="bg-design-royalBlue py-20 text-white">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[36px] font-bold leading-[1.1] sm:text-[48px] md:text-[60px]">
              The Bottom Line
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="text-[16px] font-medium leading-[1.4] text-white/90 md:text-[20px]">
              <p>Hybrid coating is built for the realities of fast-moving jobs.</p>
              <p className="mt-2">
                It saves time, cuts cost, and delivers consistent results — all with one point of
                contact.
              </p>
              <p className="mt-8">Want to see how it fits into your next spec?</p>
            </div>

            <div className="mt-8">
              <ActionLink href="/contact" label="Talk to Our Team" variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


