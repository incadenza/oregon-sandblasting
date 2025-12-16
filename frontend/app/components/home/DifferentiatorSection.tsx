import ActionLink from '@/app/components/ui/ActionLink'

const rightImage =
  '/figma-assets/7d10106fc4277aec6c786dffe49487add3531d80.png'

export default function DifferentiatorSection() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[34px] leading-[1.15] text-design-oregonSandblastingBlue sm:text-[44px]">
              Anyone can apply a coating.
              <span className="font-bold">
                {' '}
                We engineer the finish, compress the schedule, and simplify the entire job.
              </span>
            </h2>

            <p className="mt-6 text-[16px] leading-[1.4] text-design-gray">
              Discover what makes us different.
            </p>

            <div className="mt-8">
              <ActionLink href="/what-makes-us-different" label="Learn More" variant="filled" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[700px]">
              {/* Slight tilt to echo the Figma composition */}
              <div className="relative overflow-hidden bg-design-lightGray shadow-layer ring-1 ring-design-charcoal/10 rotate-[-8deg]">
                <img
                  alt=""
                  src={rightImage}
                  className="h-[440px] w-full object-cover object-center sm:h-[520px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


