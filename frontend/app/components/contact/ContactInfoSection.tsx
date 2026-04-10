import {urlForImage} from '@/sanity/lib/utils'

type Props = {
  data?: {
    contactHeading?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    contactImage?: any
  } | null
}

export default function ContactInfoSection({data}: Props) {
  const heading = data?.contactHeading || 'Contact Us'
  const address = data?.address || '10000 SW Herman Rd,\nTualatin, Oregon 97062'
  const phone = data?.phone || '(503) 692-3575'
  const email = data?.email || 'info@oregonsandblasting.com'
  const imageUrl =
    urlForImage(data?.contactImage)?.width(1500).url() || '/figma-assets/contact-info.png'

  const addressLines = address.split('\n').filter(Boolean)

  return (
    <section className="bg-white pb-12 md:pb-16 lg:pb-[100px]">
      <div className="container">
        <div className="flex flex-col gap-10 lg:h-[403px] lg:flex-row lg:items-stretch lg:gap-[72px]">
          <div className="relative h-[300px] overflow-hidden bg-[#93b8c1] sm:h-[350px] lg:h-[403px] lg:w-[750px] lg:flex-shrink-0">
            <img
              alt=""
              src={imageUrl}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-start py-4 lg:py-[34px]">
            <h3 className="font-sans text-[38px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
              {heading}
            </h3>

            <div className="mt-10 font-sans text-[20px] font-bold leading-[1.75] text-design-oregonSandblastingBlue md:text-[24px] lg:mt-[94px]">
              <p className="mb-0">
                {addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < addressLines.length - 1 && <br />}
                  </span>
                ))}
                <br />
                {phone}
              </p>
              <p className="mt-4 mb-0">
                <a
                  href={`mailto:${email}`}
                  className="underline underline-offset-2 text-design-royalBlue"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
