const logos = [
  {
    src: '/figma-assets/ea6e283cdbdf592c8baa68ced797fe2bf6aaac2a.png',
    alt: 'Customer logo 1',
    className: 'h-14',
  },
  {
    src: '/figma-assets/2e6e1a2dad88247b5ce5f9534ad7f8190969ada6.png',
    alt: 'Advanced Welding & Steel',
    className: 'h-12',
  },
  {
    src: '/figma-assets/f397ffd51dc118a82c7637f45c36233a6c7b01a1.png',
    alt: 'Alpha Iron',
    className: 'h-10',
  },
  {
    src: '/figma-assets/8692c649af45b9172bf620725b653dced050d011.png',
    alt: 'SteelFab',
    className: 'h-12',
  },
  {
    src: '/figma-assets/708e9a1b990bc41c48a76ca0cc11faf523cf96e3.png',
    alt: 'AIG',
    className: 'h-10',
  },
  {
    src: '/figma-assets/1a33e3c4dfc86d3af62275606a79edf9384ded24.png',
    alt: 'Customer logo 2',
    className: 'h-6',
  },
]

export default function TrustedByStrip() {
  return (
    <section className="bg-design-charcoal py-10 text-white">
      <div className="container">
        <p className="text-center text-[14px] font-medium uppercase tracking-[0.12em] text-white/90">
          Trusted by leaders big and small
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {logos.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.className} w-auto opacity-90`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


