import ActionLink from '@/app/components/ui/ActionLink'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'

type Props = {
  data?: {
    differentiatorHeadingRegular?: string | null
    differentiatorHeadingBold?: string | null
    differentiatorBody?: string | null
    differentiatorCtaLabel?: string | null
    differentiatorCtaLink?: any
    differentiatorImage?: any
  } | null
}

export default function DifferentiatorSection({data}: Props) {
  const headingRegular = data?.differentiatorHeadingRegular || 'Anyone can apply a coating.'
  const headingBold =
    data?.differentiatorHeadingBold ||
    'We engineer the finish, compress the schedule, and simplify the entire job.'
  const body = data?.differentiatorBody || 'Discover what makes us different.'
  const ctaLabel = data?.differentiatorCtaLabel || 'Learn More'
  const ctaHref = linkResolver(data?.differentiatorCtaLink) || '/what-makes-us-different'
  const imageUrl =
    urlForImage(data?.differentiatorImage)?.width(1800).url() ||
    '/figma-assets/7d10106fc4277aec6c786dffe49487add3531d80.png'
  const imageAlt = data?.differentiatorImage?.alt || 'Blue steel structure'

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="max-w-[611px] font-sans text-[28px] font-normal leading-[1.2] text-design-oregonSandblastingBlue sm:text-[36px] md:text-[42px] lg:text-[50px]">
              {headingRegular}
              <strong className="font-bold"> {headingBold}</strong>
            </h2>

            <p className="mt-6 font-sans text-[16px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:mt-8 md:text-[18px] lg:mt-[30px] lg:text-[20px]">
              {body}
            </p>

            <div className="mt-8 md:mt-12 lg:mt-[57px]">
              <ActionLink href={ctaHref} label={ctaLabel} variant="filled" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[900px]">
              <div className="relative h-[350px] w-full overflow-hidden sm:h-[450px] md:h-[600px] lg:h-[860px]">
                <img
                  alt={imageAlt}
                  src={imageUrl}
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
