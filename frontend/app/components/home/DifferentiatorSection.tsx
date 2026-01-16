import ActionLink from '@/app/components/ui/ActionLink'

const rightImage = '/figma-assets/7d10106fc4277aec6c786dffe49487add3531d80.png'

export default function DifferentiatorSection() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left content */}
          <div className="lg:col-span-5">
            {/* Heading - Figma: 50px, leading 1.2 */}
            {/* "Anyone can apply a coating." is regular weight, rest is bold */}
            <h2 className="max-w-[611px] font-sans text-[28px] font-normal leading-[1.2] text-design-oregonSandblastingBlue sm:text-[36px] md:text-[42px] lg:text-[50px]">
              Anyone can apply a coating.
              <strong className="font-bold">
                We engineer the finish, compress the schedule, and simplify the entire job.
              </strong>
            </h2>

            {/* Body text - Figma: 20px, leading 1.4 */}
            <p className="mt-6 font-sans text-[16px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:mt-8 md:text-[18px] lg:mt-[30px] lg:text-[20px]">
              Discover what makes us different.
            </p>

            {/* CTA - Figma: ~57px gap from body text */}
            <div className="mt-8 md:mt-12 lg:mt-[57px]">
              <ActionLink href="/what-makes-us-different" label="Learn More" variant="filled" />
            </div>
          </div>

          {/* Right image - responsive height */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[900px]">
              <div className="relative h-[350px] w-full overflow-hidden sm:h-[450px] md:h-[600px] lg:h-[860px]">
                <img
                  alt="Blue steel structure"
                  src={rightImage}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


