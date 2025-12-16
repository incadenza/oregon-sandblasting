import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import {VisualEditing, toPlainText} from 'next-sanity'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
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
      // Treat as a range so Tailwind weights (e.g. font-semibold=600) still resolve to this face.
      // This prevents falling back to the next font in the stack for the wordmark.
      weight: '100 900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html
      lang="en"
      className={`${inter.variable} ${satoshi.variable} ${tungstenNarrow.variable} bg-white text-black`}
    >
      <body>
        <section className="min-h-screen pt-[115px]">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main className="">{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  )
}
