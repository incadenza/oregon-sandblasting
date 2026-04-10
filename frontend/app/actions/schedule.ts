'use server'

import {format, parse} from 'date-fns'

import {
  getAvailableSlots,
  bookSlot as kvBookSlot,
  cancelSlot as kvCancelSlot,
  formatTimeRange,
  generateBookingRef,
  type SlotInfo,
} from '@/app/lib/schedule'
import {sendConfirmationEmail, sendNotificationEmail} from '@/app/lib/email'
import {sanityFetch} from '@/sanity/lib/live'
import {schedulePageQuery} from '@/sanity/lib/queries'

export async function fetchSlots(dateStr: string): Promise<SlotInfo[]> {
  return getAvailableSlots(dateStr)
}

export type BookingFormData = {
  dateStr: string
  time: string
  name: string
  email: string
  phone: string
  company: string
  notes: string
}

export type BookingResult = {
  success: boolean
  bookingRef?: string
  cancelToken?: string
  error?: string
}

export async function submitBooking(data: BookingFormData): Promise<BookingResult> {
  if (!data.name?.trim()) return {success: false, error: 'Name is required.'}
  if (!data.email?.trim()) return {success: false, error: 'Email is required.'}
  if (!data.phone?.trim()) return {success: false, error: 'Phone number is required.'}

  const result = await kvBookSlot(data.dateStr, data.time, {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    company: data.company.trim(),
    notes: data.notes.trim(),
  })

  if (!result.success) {
    return {success: false, error: result.error}
  }

  const bookingRef = generateBookingRef(data.dateStr, data.time)
  const dateObj = parse(data.dateStr, 'yyyy-MM-dd', new Date())
  const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy')
  const timeRange = formatTimeRange(data.time)

  // Fetch CMS config for notification email and business details
  const {data: scheduleConfig} = await sanityFetch({
    query: schedulePageQuery,
    stega: false,
  })

  const businessAddress = scheduleConfig?.businessAddress || '10000 SW Herman Rd,\nTualatin, Oregon 97062'
  const businessPhone = scheduleConfig?.businessPhone || '(503) 692-3575'
  const notificationEmail = scheduleConfig?.notificationEmail

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  const cancelUrl = `${baseUrl}/schedule/cancel?date=${data.dateStr}&time=${encodeURIComponent(data.time)}&token=${result.cancelToken}`

  const emailData = {
    customerName: data.name.trim(),
    customerEmail: data.email.trim(),
    customerPhone: data.phone.trim(),
    company: data.company.trim(),
    notes: data.notes.trim(),
    date: formattedDate,
    timeRange,
    bookingRef,
    cancelUrl,
    businessAddress,
    businessPhone,
  }

  // Send emails in parallel — don't let email failures block the booking
  const emailPromises: Promise<void>[] = [
    sendConfirmationEmail(emailData),
  ]
  if (notificationEmail) {
    emailPromises.push(sendNotificationEmail(notificationEmail, emailData))
  }
  await Promise.allSettled(emailPromises)

  return {success: true, bookingRef, cancelToken: result.cancelToken}
}

export async function cancelBooking(
  dateStr: string,
  time: string,
  token: string,
): Promise<{success: boolean; error?: string}> {
  return kvCancelSlot(dateStr, time, token)
}
