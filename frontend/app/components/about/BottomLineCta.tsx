import ActionLink from '@/app/components/ui/ActionLink'

export default function BottomLineCta() {
  return (
    <section className="bg-design-royalBlue py-[100px] text-white lg:py-0 lg:h-[398px]">
      <div className="container h-full">
        {/* Figma: Title at left 139px, body at left 781px (offset ~642px from title) */}
        <div className="flex h-full flex-col gap-10 lg:flex-row lg:items-center lg:gap-0">
          {/* Title - Figma: 60px Satoshi Bold, leading 1.1, positioned at top 100px */}
          <div className="lg:w-[642px] lg:flex-shrink-0">
            <h2 className="font-sans text-[36px] font-bold leading-[1.1] sm:text-[48px] md:text-[60px]">
              The Bottom Line
            </h2>
          </div>

          {/* Body + CTA - Figma: positioned at left 781px, max-width 953px */}
          <div className="max-w-[953px]">
            <div className="font-sans text-[16px] font-medium leading-[1.4] text-white md:text-[20px]">
              <p>Hybrid coating is built for the realities of fast-moving jobs.</p>
              <p className="mt-2">
                It saves time, cuts cost, and delivers consistent results — all with one point of
                contact.
              </p>
              <p className="mt-8">Want to see how it fits into your next spec?</p>
            </div>

            <div className="mt-8 lg:mt-10">
              <ActionLink href="/contact" label="Talk to Our Team" variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


