'use client'

import {format} from 'date-fns'
import {CalendarPlus, Check, Clock, Loader2, MapPin, Phone} from 'lucide-react'
import * as React from 'react'

import Calendar from '@/app/components/ui/Calendar'
import {fetchSlots, submitBooking, type BookingResult} from '@/app/actions/schedule'
import type {SlotInfo} from '@/app/lib/schedule'
import {formatTimeRange, generateBookingRef, generateCalendarUrl} from '@/app/lib/schedule'

type ScheduleData = {
  heading?: string | null
  description?: string | null
  confirmationHeading?: string | null
  confirmationBody?: string | null
  businessAddress?: string | null
  businessPhone?: string | null
}

type Props = {
  data?: ScheduleData | null
}

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function SlotButton({
  slot,
  selected,
  onSelect,
}: {
  slot: SlotInfo
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      disabled={!slot.available}
      onClick={onSelect}
      className={[
        'h-12 w-full rounded-md border text-left px-4 transition-colors',
        'hover:shadow-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue',
        !slot.available
          ? 'border-design-lightGray bg-design-lightGray/60 text-design-gray cursor-not-allowed hover:shadow-none'
          : selected
            ? 'border-design-brightBlue bg-design-brightBlue text-white cursor-pointer'
            : 'border-design-lightGray bg-white hover:bg-design-lightGray/50 hover:border-design-brightBlue/60 text-design-oregonSandblastingBlue cursor-pointer',
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{slot.label}</span>
        <span className={selected ? 'text-white/80 text-[13px]' : 'text-design-gray text-[13px]'}>
          {!slot.available ? 'Booked' : 'Available'}
        </span>
      </div>
    </button>
  )
}

export default function ScheduleClient({data}: Props) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(undefined)
  const [slots, setSlots] = React.useState<SlotInfo[]>([])
  const [loadingSlots, setLoadingSlots] = React.useState(false)

  // Form state
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [notes, setNotes] = React.useState('')

  // Submission state
  const [submitting, setSubmitting] = React.useState(false)
  const [bookingResult, setBookingResult] = React.useState<BookingResult | null>(null)
  const [formError, setFormError] = React.useState<string | null>(null)

  const heading = data?.heading || 'Schedule Your Dropoff'
  const description =
    data?.description ||
    'Reserve a 30-minute delivery window, Monday through Friday. Choose a date, pick a time, and confirm your details.'
  const confirmationHeading = data?.confirmationHeading || "You're All Set!"
  const confirmationBody =
    data?.confirmationBody ||
    "We've reserved your dropoff window. A confirmation has been sent to your email with all the details."
  const businessAddress = data?.businessAddress || '10000 SW Herman Rd,\nTualatin, Oregon 97062'
  const businessPhone = data?.businessPhone || '(503) 692-3575'

  // Fetch real availability when date changes
  React.useEffect(() => {
    setSelectedTime(undefined)
    setFormError(null)
    if (!date) {
      setSlots([])
      return
    }
    const dateStr = format(date, 'yyyy-MM-dd')
    setLoadingSlots(true)
    fetchSlots(dateStr)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [date?.toDateString()])

  const dateStr = date ? format(date, 'yyyy-MM-dd') : ''
  const availableCount = slots.filter((s) => s.available).length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!dateStr || !selectedTime) return
    setFormError(null)
    setSubmitting(true)

    try {
      const result = await submitBooking({
        dateStr,
        time: selectedTime,
        name,
        email,
        phone,
        company,
        notes,
      })
      if (result.success) {
        setBookingResult(result)
      } else {
        setFormError(result.error || 'Booking failed. Please try again.')
        // Refresh slots in case availability changed
        fetchSlots(dateStr).then(setSlots)
      }
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Confirmation screen ──
  if (bookingResult?.success && date && selectedTime) {
    const bookingRef = generateBookingRef(dateStr, selectedTime)
    const timeRange = formatTimeRange(selectedTime)
    const calendarUrl = generateCalendarUrl(dateStr, selectedTime, businessAddress.replace(/\n/g, ', '))

    return (
      <section className="bg-white py-20">
        <div className="container max-w-2xl">
          <div className="rounded-xl border border-design-lightGray bg-white p-8 shadow-sm sm:p-12">
            {/* Success badge */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" strokeWidth={3} />
            </div>

            <h1 className="mt-6 text-center text-[28px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[36px]">
              {confirmationHeading}
            </h1>
            <p className="mt-3 text-center text-[16px] font-medium leading-normal text-design-gray">
              {confirmationBody}
            </p>

            {/* Booking details card */}
            <div className="mt-8 rounded-lg bg-[#f0f9ff] border border-[#bae6fd] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-widest text-design-gray">
                  Booking Reference
                </span>
                <span className="font-mono text-[14px] font-bold text-design-oregonSandblastingBlue">
                  {bookingRef}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-design-gray" />
                  <div>
                    <p className="text-[15px] font-semibold text-design-oregonSandblastingBlue">
                      {format(date, 'EEEE, MMMM d, yyyy')}
                    </p>
                    <p className="text-[14px] text-design-gray">{timeRange}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-design-gray" />
                  <p className="text-[14px] text-design-oregonSandblastingBlue">
                    {businessAddress.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-design-gray" />
                  <p className="text-[14px] text-design-oregonSandblastingBlue">{businessPhone}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[45px] items-center justify-center gap-2 bg-design-brightBlue px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-white hover:bg-design-brightBlue/90"
              >
                <CalendarPlus className="h-4 w-4" />
                Add to Calendar
              </a>
              <button
                type="button"
                onClick={() => {
                  setBookingResult(null)
                  setDate(undefined)
                  setSelectedTime(undefined)
                  setName('')
                  setEmail('')
                  setPhone('')
                  setCompany('')
                  setNotes('')
                }}
                className="inline-flex h-[45px] items-center justify-center border border-design-lightGray px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-design-oregonSandblastingBlue hover:bg-design-lightGray/50"
              >
                Schedule Another
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Main scheduling UI ──
  return (
    <section className="bg-white py-20">
      <div className="container">
        <h1 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
          {heading}
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] font-medium leading-[1.4] text-design-gray md:text-[20px]">
          {description}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Calendar */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-design-lightGray bg-white shadow-sm">
              <div className="border-b border-design-lightGray px-6 py-5">
                <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-design-gray">
                  Choose a date
                </p>
                <p className="mt-2 text-[16px] font-semibold text-design-oregonSandblastingBlue">
                  {date ? format(date, 'EEEE, MMM d, yyyy') : 'Select any weekday'}
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={[{before: new Date()}, isWeekend]}
                  />
                </div>
              </div>
              <div className="border-t border-design-lightGray px-6 py-3">
                <p className="text-[12px] text-design-gray text-center">
                  Monday–Friday, 8:00 AM – 3:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Slots + Form */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-design-lightGray bg-white p-6 shadow-sm">
              <h2 className="text-[20px] font-bold leading-[1.2] text-design-oregonSandblastingBlue md:text-[24px]">
                {date
                  ? `Timeslots for ${format(date, 'MMM d, yyyy')}`
                  : 'Select a date to see timeslots'}
              </h2>

              {date && (
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-design-gray">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-design-brightBlue" />
                    Selected
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-design-lightGray" />
                    Available
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-design-lightGray/60 ring-1 ring-design-lightGray" />
                    Booked
                  </span>
                  {date && !loadingSlots && (
                    <span className="ml-auto font-semibold text-design-oregonSandblastingBlue">
                      {availableCount} of {slots.length} available
                    </span>
                  )}
                </div>
              )}

              {date && loadingSlots && (
                <div className="mt-8 flex items-center justify-center gap-3 py-12 text-design-gray">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-[15px] font-medium">Loading availability…</span>
                </div>
              )}

              {date && !loadingSlots && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slots.map((s) => (
                    <SlotButton
                      key={s.time}
                      slot={s}
                      selected={selectedTime === s.time}
                      onSelect={() => {
                        setSelectedTime(s.time)
                        setFormError(null)
                      }}
                    />
                  ))}
                </div>
              )}

              {!date && (
                <p className="mt-4 text-[16px] text-design-gray">
                  Pick a date in the calendar to load availability.
                </p>
              )}

              {/* Booking form — shown after selecting a time */}
              {date && selectedTime && (
                <form onSubmit={handleSubmit} className="mt-10">
                  <div className="border-t border-design-lightGray pt-8">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-design-gray">
                        Your Details
                      </p>
                      <p className="text-[13px] font-medium text-design-brightBlue">
                        {formatTimeRange(selectedTime)}
                      </p>
                    </div>
                    <p className="mt-2 text-[14px] text-design-gray">
                      We'll use this to confirm your dropoff. A confirmation email will be sent to you.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-[16px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[18px]">
                        Name*
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-[56px] w-full bg-design-lightGray px-5 text-[16px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[16px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[18px]">
                        Company
                      </label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="h-[56px] w-full bg-design-lightGray px-5 text-[16px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue"
                        placeholder="Company name (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[16px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[18px]">
                        Email*
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-[56px] w-full bg-design-lightGray px-5 text-[16px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[16px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[18px]">
                        Phone*
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-[56px] w-full bg-design-lightGray px-5 text-[16px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue"
                        placeholder="(503) 555-0123"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-[16px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[18px]">
                        Special Instructions
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-design-lightGray px-5 py-4 text-[16px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue resize-none"
                        placeholder="Anything we should know about your delivery? (optional)"
                      />
                    </div>
                  </div>

                  {formError && (
                    <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3">
                      <p className="text-[14px] font-medium text-red-700">{formError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={[
                      'mt-8 inline-flex h-[56px] items-center justify-center gap-2 bg-design-brightBlue px-8 text-[15px] font-bold uppercase tracking-[0.06em] text-white',
                      'hover:bg-design-brightBlue/90 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue focus-visible:ring-offset-2',
                      submitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Booking…
                      </>
                    ) : (
                      'Confirm Dropoff'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
