'use server'

import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery} from '@/sanity/lib/queries'
import {sendContactFormEmail, type ContactEmailCopy} from '@/app/lib/email'

export type ContactFormResult = {
  success: boolean
  error?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const name = (formData.get('name') as string)?.trim()
  const company = (formData.get('company') as string)?.trim() || ''
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim() || ''
  const projectLocation = (formData.get('projectLocation') as string)?.trim() || ''
  const timeline = (formData.get('timeline') as string)?.trim() || ''
  const services = formData.getAll('services') as string[]
  const description = (formData.get('description') as string)?.trim() || ''
  const referralSource = (formData.get('referralSource') as string)?.trim() || ''

  if (!name) return {success: false, error: 'Name is required.'}
  if (!email) return {success: false, error: 'Email is required.'}

  const {data: contactConfig} = await sanityFetch({query: contactPageQuery, stega: false})
  const recipientEmails: string[] = contactConfig?.formRecipientEmails?.filter(Boolean) || []

  if (recipientEmails.length === 0) {
    console.error('No formRecipientEmails configured in CMS')
    return {success: false, error: 'Form is not configured yet. Please call us instead.'}
  }

  const copy: ContactEmailCopy = {
    subject: contactConfig?.contactEmailSubject || undefined,
    heading: contactConfig?.contactEmailHeading || undefined,
    body: contactConfig?.contactEmailBody || undefined,
  }

  try {
    await sendContactFormEmail(
      recipientEmails,
      email,
      {name, company, email, phone, projectLocation, timeline, services, description, referralSource},
      copy,
    )
    return {success: true}
  } catch (err) {
    console.error('Failed to send contact form email:', err)
    return {success: false, error: 'Something went wrong sending your message. Please try again or call us.'}
  }
}
