import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery} from '@/sanity/lib/queries'

import ContactFormSection from '@/app/components/contact/ContactFormSection'
import ContactHero from '@/app/components/contact/ContactHero'
import ContactInfoSection from '@/app/components/contact/ContactInfoSection'

export default async function ContactPage() {
  const {data} = await sanityFetch({query: contactPageQuery})

  return (
    <>
      <ContactHero data={data} />
      <ContactFormSection data={data} />
      <ContactInfoSection data={data} />
    </>
  )
}
