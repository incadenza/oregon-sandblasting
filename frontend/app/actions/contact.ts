'use server'

import {Resend} from 'resend'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery} from '@/sanity/lib/queries'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Oregon Sandblasting <onboarding@resend.dev>'

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

  if (!resend) {
    console.warn('Resend not configured — logging contact form submission')
    console.log('Contact form submission:', {name, company, email, phone, projectLocation, timeline, services, description, referralSource})
    return {success: true}
  }

  function row(label: string, value: string) {
    if (!value) return ''
    return `<tr><td style="padding:8px 12px;font-size:13px;color:#6b7280;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 12px;font-size:14px;color:#1f2937;">${value}</td></tr>`
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
    <div style="background-color:#2c3f50;padding:32px 24px;text-align:left;">
      <span style="font-weight:700;font-size:28px;letter-spacing:1px;text-transform:uppercase;">
        <span style="color:#3b82f6;">OREGON</span>
        <span style="color:#ffffff;"> SANDBLASTING</span>
      </span>
    </div>
    <div style="padding:32px 24px;">
      <h1 style="margin:0 0 8px;font-size:24px;color:#1f2937;">New Contact Form Submission</h1>
      <p style="margin:0 0 24px;font-size:16px;color:#6b7280;">Someone reached out through the website contact form.</p>

      <div style="background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', name)}
          ${row('Company', company)}
          ${row('Email', `<a href="mailto:${email}" style="color:#3b82f6;">${email}</a>`)}
          ${row('Phone', phone)}
        </table>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${row('Project Location', projectLocation)}
        ${row('Timeline', timeline)}
        ${row('Services Needed', services.length > 0 ? services.join(', ') : '')}
        ${row('Referral Source', referralSource)}
      </table>

      ${description ? `
        <h2 style="margin:0 0 8px;font-size:16px;color:#1f2937;">Project Description</h2>
        <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;">
          <p style="margin:0;font-size:14px;color:#1f2937;white-space:pre-wrap;">${description}</p>
        </div>
      ` : ''}

      <div style="text-align:center;margin-top:16px;">
        <a href="mailto:${email}" style="display:inline-block;background-color:#3b82f6;color:#ffffff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;padding:12px 24px;text-decoration:none;">Reply to ${name}</a>
      </div>
    </div>
    <div style="padding:20px 24px;background-color:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via oregonsandblasting.com contact form</p>
    </div>
  </div>
</body>
</html>`

  try {
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmails,
      replyTo: email,
      subject: `Contact Form: ${name}${company ? ` — ${company}` : ''}`,
      html,
    })
    return {success: true}
  } catch (err) {
    console.error('Failed to send contact form email:', err)
    return {success: false, error: 'Something went wrong sending your message. Please try again or call us.'}
  }
}
