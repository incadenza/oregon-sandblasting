import {kv} from '@vercel/kv'

export type BookingDetails = {
  name: string
  email: string
  phone: string
  company: string
  notes: string
  bookedAt: string
  cancelToken: string
}

export type SlotInfo = {
  time: string
  label: string
  available: boolean
}

const SLOT_START_HOUR = 8
const SLOT_END_HOUR = 15 // last slot at 15:00 (3:00 PM), window closes at 15:30
const SLOT_INTERVAL_MINUTES = 30

function kvKey(dateStr: string) {
  return `dropoff:${dateStr}`
}

export function generateSlotTimes(): string[] {
  const slots: string[] = []
  for (let h = SLOT_START_HOUR; h <= SLOT_END_HOUR; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    if (h < SLOT_END_HOUR) {
      slots.push(`${h.toString().padStart(2, '0')}:30`)
    }
  }
  return slots
}

export function formatTimeLabel(time: string): string {
  const [hStr, mStr] = time.split(':')
  const h = parseInt(hStr, 10)
  const amPm = h >= 12 ? 'PM' : 'AM'
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${display}:${mStr} ${amPm}`
}

export function formatTimeRange(time: string): string {
  const [hStr, mStr] = time.split(':')
  const startH = parseInt(hStr, 10)
  const startM = parseInt(mStr, 10)
  let endH = startH
  let endM = startM + SLOT_INTERVAL_MINUTES
  if (endM >= 60) {
    endH += 1
    endM -= 60
  }
  const startLabel = formatTimeLabel(time)
  const endLabel = formatTimeLabel(`${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`)
  return `${startLabel} – ${endLabel}`
}

export function isWeekday(date: Date): boolean {
  const day = date.getDay()
  return day >= 1 && day <= 5
}

export function isSlotInPast(dateStr: string, time: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number)
  const [h, m] = time.split(':').map(Number)
  const slotDate = new Date(year, month - 1, day, h, m)
  const now = new Date()
  // Add 30min buffer — can't book a slot starting in less than 30 minutes
  return slotDate.getTime() - now.getTime() < 30 * 60 * 1000
}

export async function getBookingsForDate(dateStr: string): Promise<Record<string, BookingDetails>> {
  try {
    const data = await kv.hgetall<Record<string, BookingDetails>>(kvKey(dateStr))
    return data || {}
  } catch {
    return {}
  }
}

export async function getAvailableSlots(dateStr: string): Promise<SlotInfo[]> {
  const allTimes = generateSlotTimes()
  const bookings = await getBookingsForDate(dateStr)

  return allTimes.map((time) => ({
    time,
    label: formatTimeLabel(time),
    available: !bookings[time] && !isSlotInPast(dateStr, time),
  }))
}

export async function bookSlot(
  dateStr: string,
  time: string,
  details: Omit<BookingDetails, 'bookedAt' | 'cancelToken'>,
): Promise<{success: boolean; cancelToken?: string; error?: string}> {
  const allTimes = generateSlotTimes()
  if (!allTimes.includes(time)) {
    return {success: false, error: 'Invalid time slot.'}
  }

  if (isSlotInPast(dateStr, time)) {
    return {success: false, error: 'This time slot is no longer available.'}
  }

  const cancelToken = crypto.randomUUID()
  const booking: BookingDetails = {
    ...details,
    bookedAt: new Date().toISOString(),
    cancelToken,
  }

  try {
    // hsetnx returns 1 if field was set (didn't exist), 0 if it already existed
    const result = await kv.hsetnx(kvKey(dateStr), time, JSON.stringify(booking))

    if (result === 0) {
      return {success: false, error: 'This slot was just booked by someone else. Please choose another time.'}
    }

    // Set TTL on the key — auto-cleanup after 90 days
    await kv.expire(kvKey(dateStr), 90 * 24 * 60 * 60)

    return {success: true, cancelToken}
  } catch (err: any) {
    console.error('Booking error:', err)
    return {success: false, error: 'Something went wrong. Please try again.'}
  }
}

export async function cancelSlot(
  dateStr: string,
  time: string,
  token: string,
): Promise<{success: boolean; error?: string}> {
  try {
    const raw = await kv.hget<string>(kvKey(dateStr), time)
    if (!raw) {
      return {success: false, error: 'No booking found for this time slot.'}
    }

    const booking: BookingDetails = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (booking.cancelToken !== token) {
      return {success: false, error: 'Invalid cancellation link.'}
    }

    await kv.hdel(kvKey(dateStr), time)
    return {success: true}
  } catch (err: any) {
    console.error('Cancel error:', err)
    return {success: false, error: 'Something went wrong. Please try again.'}
  }
}

export function generateBookingRef(dateStr: string, time: string): string {
  const datePart = dateStr.replace(/-/g, '')
  const timePart = time.replace(':', '')
  return `OSB-${datePart}-${timePart}`
}

export function generateCalendarUrl(dateStr: string, time: string, address: string): string {
  const [hStr, mStr] = time.split(':')
  const startH = parseInt(hStr, 10)
  const startM = parseInt(mStr, 10)
  let endH = startH
  let endM = startM + SLOT_INTERVAL_MINUTES
  if (endM >= 60) {
    endH += 1
    endM -= 60
  }

  const dateNoDash = dateStr.replace(/-/g, '')
  const startTime = `${startH.toString().padStart(2, '0')}${startM.toString().padStart(2, '0')}00`
  const endTime = `${endH.toString().padStart(2, '0')}${endM.toString().padStart(2, '0')}00`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Dropoff at Oregon Sandblasting',
    dates: `${dateNoDash}T${startTime}/${dateNoDash}T${endTime}`,
    location: address,
    details: 'Your scheduled delivery dropoff at Oregon Sandblasting & Coating.',
  })

  return `https://calendar.google.com/calendar/event?${params.toString()}`
}
