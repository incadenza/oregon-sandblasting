import {urlForImage} from '@/sanity/lib/utils'

const fallbackLogos = [
  {src: '/figma-assets/ea6e283cdbdf592c8baa68ced797fe2bf6aaac2a.png', alt: 'Customer logo 1'},
  {src: '/figma-assets/2e6e1a2dad88247b5ce5f9534ad7f8190969ada6.png', alt: 'Advanced Welding & Steel'},
  {src: '/figma-assets/f397ffd51dc118a82c7637f45c36233a6c7b01a1.png', alt: 'Alpha Iron'},
  {src: '/figma-assets/8692c649af45b9172bf620725b653dced050d011.png', alt: 'SteelFab'},
  {src: '/figma-assets/708e9a1b990bc41c48a76ca0cc11faf523cf96e3.png', alt: 'AIG'},
  {src: '/figma-assets/1a33e3c4dfc86d3af62275606a79edf9384ded24.png', alt: 'Customer logo 2'},
]

type Props = {
  data?: {
    trustedByHeading?: string | null
    trustedByLogos?: Array<{logo?: any}> | null
  } | null
}

export default function TrustedByStrip({data}: Props) {
  const heading = data?.trustedByHeading || 'Trusted By Leaders Big and Small'

  const logos =
    data?.trustedByLogos && data.trustedByLogos.length > 0
      ? data.trustedByLogos.map((item, i) => ({
          src: urlForImage(item.logo)?.height(120).url() || '',
          alt: item.logo?.alt || `Logo ${i + 1}`,
        }))
      : fallbackLogos

  return (
    <section className="bg-design-charcoal py-10 text-white">
      <div className="container">
        <h2 className="text-center text-[20px] font-medium uppercase leading-[1.25] tracking-[0.05em] text-white">
          {heading}
        </h2>

        <div className="mt-7 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((logo, i) => (
            <img
              key={logo.src || i}
              src={logo.src}
              alt={logo.alt}
              className="h-[40px] w-auto opacity-90 sm:h-[50px] md:h-[60px] lg:h-[80px]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
