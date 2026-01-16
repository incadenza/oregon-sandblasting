import ActionLink from '@/app/components/ui/ActionLink'

export default function BottomLineCta() {
  return (
    <section className="bg-design-royalBlue py-12 text-white md:py-16 lg:py-[100px]">
      <div className="container">
        {/* Figma: Title at left 139px, body at left 781px (offset ~642px from title) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          {/* Title - Figma: 60px Satoshi Bold, leading 1.1 */}
          <div className="lg:w-[500px] lg:flex-shrink-0">
            <h2 className="font-sans text-[28px] font-bold leading-[1.1] sm:text-[36px] md:text-[48px] lg:text-[60px]">
              The Bottom Line
            </h2>
          </div>

          {/* Body + CTA */}
          <div className="max-w-[953px]">
            <div className="font-sans text-base font-medium leading-[1.4] text-white md:text-lg lg:text-[20px]">
              <p>Hybrid coating is built for the realities of fast-moving jobs.</p>
              <p className="mt-2">
                It saves time, cuts cost, and delivers consistent results — all with one point of
                contact.
              </p>
              <p className="mt-6 md:mt-8">Want to see how it fits into your next spec?</p>
            </div>

            <div className="mt-6 md:mt-8 lg:mt-10">
              <ActionLink href="/contact" label="Talk to Our Team" variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


