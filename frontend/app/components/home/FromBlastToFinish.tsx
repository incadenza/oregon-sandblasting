import ActionLink from '@/app/components/ui/ActionLink'

const bgImage = '/figma-assets/f16181ac8df6f6ba9445c9839ec6c317f02fbffa.png'

export default function FromBlastToFinish() {
  return (
    <section>
      <div className="container">
        {/* Mobile: stacked layout. Desktop: image with overlay text */}
        <div className="relative overflow-hidden bg-[#3f3724]">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              alt="Industrial coating facility with hanging metal parts"
              src={bgImage}
              className="h-full w-full object-cover object-left"
            />
          </div>

          {/* Gradient overlay - covers more on mobile for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3f3724]/95 via-[#3f3724]/70 to-transparent md:bg-none" />
          <div className="absolute right-0 top-0 hidden h-full w-[60%] bg-gradient-to-r from-transparent to-[#3f3724]/90 mix-blend-multiply md:block" />

          {/* Content - full width on mobile, positioned right on desktop */}
          <div className="relative flex min-h-[500px] flex-col justify-end px-6 pb-10 pt-40 md:absolute md:right-0 md:top-0 md:h-full md:min-h-0 md:w-[45%] md:justify-center md:px-0 md:py-0 md:pr-8 lg:w-[40%] lg:pr-12">
            {/* Heading */}
            <h2 className="max-w-[469px] font-sans text-3xl font-bold leading-[1.2] text-white md:text-4xl lg:text-[50px]">
              From Blast to Finish
            </h2>

            {/* Body text */}
            <p className="mt-4 max-w-[465px] font-sans text-base font-medium leading-[1.4] text-white md:mt-6 lg:mt-8 lg:text-[20px]">
              We handle every step of the industrial coating process — blasting, liquid, powder,
              and specialty finishes — all under one roof. Whether you're fabricating a small
              assembly or managing a complex build, we keep your job moving without change
              orders, vendor delays, or coating conflicts.
            </p>

            {/* CTA */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              <ActionLink href="/services" label="Explore Our Services" variant="filled" />
            </div>
          </div>

          {/* Desktop height spacer */}
          <div className="hidden md:block md:h-[675px]" />
        </div>
      </div>
    </section>
  )
}


