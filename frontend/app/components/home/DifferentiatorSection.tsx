import ActionLink from '@/app/components/ui/ActionLink'

const rightImage = '/figma-assets/7d10106fc4277aec6c786dffe49487add3531d80.png'

export default function DifferentiatorSection() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content - positioned at 138px from container left in Figma */}
          <div className="lg:col-span-5">
            {/* Heading - 50px text, max-width 611px, line-height 1.2 */}
            <h2 className="max-w-[611px] text-[50px] leading-[1.2] text-design-oregonSandblastingBlue">
              Anyone can apply a coating.
              <span className="font-bold">
                {' '}
                We engineer the finish, compress the schedule, and simplify the entire job.
              </span>
            </h2>

            {/* Body text - 20px, positioned at top 2100px in full layout */}
            <p className="mt-[30px] text-[20px] leading-[1.4] text-[#2a2d34]">
              Discover what makes us different.
            </p>

            {/* CTA - positioned at top 2157px */}
            <div className="mt-[57px]">
              <ActionLink href="/what-makes-us-different" label="Learn More" variant="filled" />
            </div>
          </div>

          {/* Right image - positioned at left 881px, width 900px, height 860px */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[900px]">
              <div className="relative h-[860px] w-full overflow-hidden bg-[#93b8c1]">
                {/* Image with exact Figma positioning: rotated 180deg, scale-y-[-100%] */}
                <div className="absolute -left-[21px] -top-[205px] flex h-[1852px] w-[1236px] rotate-180 scale-y-[-100%] items-center justify-center">
                  <img
                    alt=""
                    src={rightImage}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


