export default function ContactInfoSection() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden bg-design-lightGray">
              <img
                alt=""
                src="/figma-assets/bcdead97d0a287c47f48de9575e5efc4b36f1c46.png"
                className="h-[403px] w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="py-10">
              <h3 className="text-[38px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
                Contact Us
              </h3>

              {/* Match Figma: 24px bold, leading 1.75, with explicit line breaks */}
              <div className="mt-10 text-[20px] font-bold leading-[1.75] text-design-oregonSandblastingBlue md:text-[24px]">
                <p className="mb-0">
                  10000 SW Herman Rd,
                  <br />
                  Tualatin, Oregon 97062
                  <br />
                  (503) 692-3575
                </p>
                <p className="mt-6 mb-0">
                  <a
                    href="mailto:info@example.com"
                    className="underline underline-offset-2 text-design-royalBlue"
                  >
                    Email address here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


