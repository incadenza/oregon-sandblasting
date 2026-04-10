import {Resend} from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Oregon Sandblasting <onboarding@resend.dev>'

type BookingEmailData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  company: string
  notes: string
  date: string
  timeRange: string
  bookingRef: string
  cancelUrl: string
  businessAddress: string
  businessPhone: string
}

function brandHeader() {
  return `
    <div style="background-color:#2c3f50;padding:32px 24px;text-align:left;">
      <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-weight:700;font-size:28px;letter-spacing:1px;text-transform:uppercase;">
        <span style="color:#3b82f6;">OREGON</span>
        <span style="color:#ffffff;"> SANDBLASTING</span>
      </span>
    </div>
  `
}

function emailWrapper(content: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
    ${brandHeader()}
    <div style="padding:32px 24px;">
      ${content}
    </div>
    <div style="padding:20px 24px;background-color:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Oregon Sandblasting & Coating</p>
    </div>
  </div>
</body>
</html>`
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#6b7280;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:14px;color:#1f2937;">${value}</td>
    </tr>`
}

export async function sendConfirmationEmail(data: BookingEmailData) {
  if (!resend) {
    console.warn('Resend not configured — skipping confirmation email')
    return
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#1f2937;">Dropoff Confirmed</h1>
    <p style="margin:0 0 24px;font-size:16px;color:#6b7280;">Your delivery has been scheduled. Here are your details:</p>

    <div style="background-color:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${detailRow('Reference', `<strong>${data.bookingRef}</strong>`)}
        ${detailRow('Date', data.date)}
        ${detailRow('Time', data.timeRange)}
        ${detailRow('Location', data.businessAddress.replace(/\n/g, '<br>'))}
      </table>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${detailRow('Name', data.customerName)}
      ${data.company ? detailRow('Company', data.company) : ''}
      ${detailRow('Phone', data.customerPhone)}
      ${data.notes ? detailRow('Notes', data.notes) : ''}
    </table>

    <p style="font-size:14px;color:#6b7280;margin-bottom:24px;">
      Questions? Call us at <strong>${data.businessPhone}</strong>
    </p>

    <div style="text-align:center;margin-bottom:16px;">
      <a href="${data.cancelUrl}" style="font-size:13px;color:#ef4444;text-decoration:underline;">Need to cancel this dropoff?</a>
    </div>
  `)

  try {
    await resend.emails.send({
      from: fromEmail,
      to: data.customerEmail,
      subject: `Dropoff Confirmed — ${data.date} at ${data.timeRange}`,
      html,
    })
  } catch (err) {
    console.error('Failed to send confirmation email:', err)
  }
}

export async function sendNotificationEmail(notifyTo: string, data: BookingEmailData) {
  if (!resend) {
    console.warn('Resend not configured — skipping notification email')
    return
  }

  const html = emailWrapper(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#1f2937;">New Dropoff Scheduled</h1>
    <p style="margin:0 0 24px;font-size:16px;color:#6b7280;">A new delivery dropoff has been booked:</p>

    <div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${detailRow('Reference', `<strong>${data.bookingRef}</strong>`)}
        ${detailRow('Date', data.date)}
        ${detailRow('Time', data.timeRange)}
      </table>
    </div>

    <h2 style="margin:0 0 12px;font-size:16px;color:#1f2937;">Customer Details</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${detailRow('Name', data.customerName)}
      ${data.company ? detailRow('Company', data.company) : ''}
      ${detailRow('Email', `<a href="mailto:${data.customerEmail}" style="color:#3b82f6;">${data.customerEmail}</a>`)}
      ${detailRow('Phone', data.customerPhone)}
      ${data.notes ? detailRow('Notes', data.notes) : ''}
    </table>
  `)

  try {
    await resend.emails.send({
      from: fromEmail,
      to: notifyTo,
      subject: `New Dropoff: ${data.date} at ${data.timeRange} — ${data.company || data.customerName}`,
      html,
    })
  } catch (err) {
    console.error('Failed to send notification email:', err)
  }
}
