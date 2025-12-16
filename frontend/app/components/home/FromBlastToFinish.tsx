import ActionLink from '@/app/components/ui/ActionLink'

const bgImage =
  '/figma-assets/db4c63dad085b710125af88218eae33f1ce32501.png'

export default function FromBlastToFinish() {
  return (
    <section className="py-14">
      <div className="container">
        <div className="relative overflow-hidden bg-design-charcoal">
          <img
            alt=""
            src={bgImage}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-95"
          />
          {/* Right-side highlight like the Figma panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-design-charcoal/35 to-design-charcoal/80 mix-blend-screen" />

          <div className="relative grid gap-10 px-8 py-16 md:px-14 md:py-20 lg:grid-cols-12">
            <div className="lg:col-span-7" />

            <div className="lg:col-span-5">
              <h2 className="text-[34px] font-bold leading-[1.1] text-white sm:text-[44px]">
                From Blast to Finish
              </h2>
              <p className="mt-6 text-[16px] leading-[1.4] text-white/85">
                We handle every step of the industrial coating process — blasting, liquid,
                powder, and specialty finishes — all under one roof. Whether you’re
                fabricating a small assembly or managing a complex build, we keep your job
                moving without change orders, vendor delays, or coating conflicts.
              </p>

              <div className="mt-8">
                <ActionLink href="/services" label="Explore Our Services" variant="filled" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


