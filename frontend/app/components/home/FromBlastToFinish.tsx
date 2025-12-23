import ActionLink from '@/app/components/ui/ActionLink'

const bgImage = '/figma-assets/f16181ac8df6f6ba9445c9839ec6c317f02fbffa.png'

export default function FromBlastToFinish() {
  return (
    <section>
      <div className="container">
        {/* Container: 1643px width, 675px height */}
        <div className="relative h-[675px] overflow-hidden bg-[#93b8c1]">
          {/* Background image - full coverage, zoomed out to show more of the scene */}
          <div className="absolute inset-0">
            <img
              alt="Industrial coating facility with hanging metal parts"
              src={bgImage}
              className="h-full w-full object-cover object-left"
            />
          </div>

          {/* Gradient overlay - starts at ~40% from left, blends to wood/brown on right */}
          <div className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-r from-transparent to-[#3f3724]/90 mix-blend-multiply" />

          {/* Content positioned on the right over the wood background */}
          {/* Figma: text starts at x=1065, which is 65% from left of 1643px container */}
          <div className="absolute right-0 top-0 flex h-full w-[40%] flex-col justify-center pr-8 lg:pr-12">
            {/* Heading - Satoshi Bold 50px */}
            <h2 className="max-w-[469px] font-sans text-3xl font-bold leading-[1.2] text-white md:text-4xl lg:text-[50px]">
              From Blast to Finish
            </h2>

            {/* Body text - Satoshi Medium 20px */}
            <p className="mt-6 max-w-[465px] font-sans text-base font-medium leading-[1.4] text-white md:mt-8 lg:text-[20px]">
              We handle every step of the industrial coating process — blasting, liquid, powder,
              and specialty finishes — all under one roof. Whether you're fabricating a small
              assembly or managing a complex build, we keep your job moving without change
              orders, vendor delays, or coating conflicts.
            </p>

            {/* CTA */}
            <div className="mt-8 md:mt-10">
              <ActionLink href="/services" label="Explore Our Services" variant="filled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


