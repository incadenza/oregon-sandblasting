import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery, navigationQuery, footerContentQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const title = settings?.title || 'Oregon Sandblasting'
  const description = settings?.description || 'Industrial-scale blasting, powder coating, liquid coating, and hybrid finishing — all under one roof.'

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/Satoshi-Variable.woff2',
      style: 'normal',
      weight: '100 900',
    },
    {
      path: '../public/fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
      weight: '100 900',
    },
  ],
})

const tungstenNarrow = localFont({
  variable: '--font-tungsten-narrow',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/TungstenNarrow-Medium.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  const [{data: settings}, {data: nav}, {data: footer}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: navigationQuery}),
    sanityFetch({query: footerContentQuery}),
  ])

  const navLinks = nav?.navLinks?.filter(
    (l: any): l is {label: string; href: string} => Boolean(l?.label && l?.href),
  )

  return (
    <html
      lang="en"
      className={`${inter.variable} ${satoshi.variable} ${tungstenNarrow.variable} bg-white text-black`}
    >
      <body>
        <section className="min-h-screen pt-[115px]">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <Header
            title={settings?.title || undefined}
            navLinks={navLinks}
            ctaLabel={nav?.ctaLabel || undefined}
            ctaHref={nav?.ctaHref || undefined}
          />
          <main>{children}</main>
          <Footer
            navLinks={navLinks}
            ctaLabel={nav?.ctaLabel || undefined}
            ctaHref={nav?.ctaHref || undefined}
            address={footer?.address || undefined}
            phone={footer?.phone || undefined}
            badgeImage={footer?.badgeImage}
            copyrightText={footer?.copyrightText || undefined}
            legalLinks={footer?.legalLinks?.filter(
              (l: any): l is {label: string; href: string} => Boolean(l?.label && l?.href),
            )}
          />
        </section>
        <SpeedInsights />
      </body>
    </html>
  )
}
