export default function ContactInfoSection() {
  return (
    <section className="bg-white pb-[100px]">
      <div className="container">
        {/* Figma: 1643px total width, image 750px on left, text on right starting at 822px */}
        <div className="flex flex-col gap-10 lg:h-[403px] lg:flex-row lg:items-stretch lg:gap-[72px]">
          {/* Image container - Figma: 750px × 403px, bg #93b8c1 */}
          <div className="relative h-[300px] overflow-hidden bg-[#93b8c1] sm:h-[350px] lg:h-[403px] lg:w-[750px] lg:flex-shrink-0">
            <img
              alt=""
              src="/figma-assets/contact-info.png"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Text content - Figma: starts at left 822px (72px gap from image) */}
          <div className="flex flex-col justify-start py-4 lg:py-[34px]">
            {/* Heading - Figma: 60px Satoshi Bold, leading 1.2 */}
            <h3 className="font-sans text-[38px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
              Contact Us
            </h3>

            {/* Contact info - Figma: 24px Satoshi Bold, leading 1.75, positioned at top 162px */}
            <div className="mt-10 font-sans text-[20px] font-bold leading-[1.75] text-design-oregonSandblastingBlue md:text-[24px] lg:mt-[94px]">
              <p className="mb-0">
                10000 SW Herman Rd,
                <br />
                Tualatin, Oregon 97062
                <br />
                (503) 692-3575
              </p>
              <p className="mt-4 mb-0">
                <a
                  href="mailto:info@oregonsandblasting.com"
                  className="underline underline-offset-2 text-design-royalBlue"
                >
                  Email address here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


