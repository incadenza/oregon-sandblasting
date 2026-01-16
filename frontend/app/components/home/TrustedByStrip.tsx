const logos = [
  {
    src: '/figma-assets/ea6e283cdbdf592c8baa68ced797fe2bf6aaac2a.png',
    alt: 'Customer logo 1',
    height: 114,
  },
  {
    src: '/figma-assets/2e6e1a2dad88247b5ce5f9534ad7f8190969ada6.png',
    alt: 'Advanced Welding & Steel',
    height: 98,
  },
  {
    src: '/figma-assets/f397ffd51dc118a82c7637f45c36233a6c7b01a1.png',
    alt: 'Alpha Iron',
    height: 86,
  },
  {
    src: '/figma-assets/8692c649af45b9172bf620725b653dced050d011.png',
    alt: 'SteelFab',
    height: 106,
  },
  {
    src: '/figma-assets/708e9a1b990bc41c48a76ca0cc11faf523cf96e3.png',
    alt: 'AIG',
    height: 85,
  },
  {
    src: '/figma-assets/1a33e3c4dfc86d3af62275606a79edf9384ded24.png',
    alt: 'Customer logo 2',
    height: 31,
  },
]

export default function TrustedByStrip() {
  return (
    <section className="bg-design-charcoal py-10 text-white">
      <div className="container">
        <h2 className="text-center text-[20px] font-medium uppercase leading-[1.25] tracking-[0.05em] text-white">
          Trusted By Leaders Big and Small
        </h2>

        <div className="mt-7 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-[40px] w-auto opacity-90 sm:h-[50px] md:h-[60px] lg:h-auto"
              style={{ maxHeight: `${logo.height}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


