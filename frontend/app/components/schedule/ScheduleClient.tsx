'use client'

import {format} from 'date-fns'
import * as React from 'react'

import Calendar from '@/app/components/ui/Calendar'

type Slot = {
  timeLabel: string
  capacity: number
  booked: number
}

function buildSlotsForDate(date: Date): Slot[] {
  // Mock data for now (storage/real availability comes later).
  // Deterministic so it doesn't "jump" between renders.
  const seed = Number(format(date, 'yyyyMMdd'))
  const hours = Array.from({length: 8}, (_, i) => 8 + i) // 8am–3pm
  return hours.map((h) => {
    const capacity = 6
    const booked = (seed + h * 13) % (capacity + 2) // sometimes over-cap to simulate "full"
    return {
      timeLabel: `${h}:00`,
      capacity,
      booked: Math.min(booked, capacity),
    }
  })
}

function SlotButton({
  slot,
  selected,
  onSelect,
}: {
  slot: Slot
  selected: boolean
  onSelect: () => void
}) {
  const isFull = slot.booked >= slot.capacity
  return (
    <button
      type="button"
      disabled={isFull}
      onClick={onSelect}
      className={[
        'h-12 w-full rounded-md border text-left px-4 transition-colors',
        'hover:shadow-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue',
        isFull
          ? 'border-design-lightGray bg-design-lightGray/60 text-design-gray cursor-not-allowed hover:shadow-none'
          : selected
            ? 'border-design-brightBlue bg-design-brightBlue text-white cursor-pointer'
            : 'border-design-lightGray bg-white hover:bg-design-lightGray/50 hover:border-design-brightBlue/60 text-design-oregonSandblastingBlue cursor-pointer',
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{slot.timeLabel}</span>
        <span className={selected ? 'text-white/90' : 'text-design-gray'}>
          {slot.booked}/{slot.capacity} {isFull ? 'full' : ''}
        </span>
      </div>
    </button>
  )
}

export default function ScheduleClient() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(undefined)

  const slots = React.useMemo(() => (date ? buildSlotsForDate(date) : []), [date])

  React.useEffect(() => {
    // Reset timeslot when date changes
    setSelectedTime(undefined)
  }, [date?.toDateString()])

  return (
    <section className="bg-white py-20">
      <div className="container">
        <h1 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
          Schedule Your Dropoff
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] font-medium leading-[1.4] text-design-gray md:text-[20px]">
          Choose a date, then pick an hourly timeslot. Full slots are disabled. After selecting a
          date, enter your email and phone number.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-design-lightGray bg-white shadow-sm">
              <div className="border-b border-design-lightGray px-6 py-5">
                <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-design-gray">
                  Choose a date
                </p>
                <p className="mt-2 text-[16px] font-semibold text-design-oregonSandblastingBlue">
                  {date ? format(date, 'EEEE, MMM d, yyyy') : 'Select any available day'}
                </p>
              </div>
              <div className="p-6">
                {/* DayPicker has a fixed intrinsic width; center it so we don't get awkward right-side space */}
                <div className="flex justify-center">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-xl border border-design-lightGray bg-white p-6 shadow-sm">
              <h2 className="text-[20px] font-bold leading-[1.2] text-design-oregonSandblastingBlue md:text-[24px]">
                {date ? `Timeslots for ${format(date, 'MMM d, yyyy')}` : 'Select a date to see timeslots'}
              </h2>
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
                  Full
                </span>
              </div>

              {date ? (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {slots.map((s) => (
                    <SlotButton
                      key={s.timeLabel}
                      slot={s}
                      selected={selectedTime === s.timeLabel}
                      onSelect={() => setSelectedTime(s.timeLabel)}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[16px] text-design-gray">
                  Pick a date in the calendar to load availability.
                </p>
              )}

              {/* Contact details */}
              {date ? (
                <div className="mt-10">
                  <div className="border-t border-design-lightGray pt-8">
                    <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-design-gray">
                      Contact details
                    </p>
                    <p className="mt-2 text-[14px] text-design-gray">
                      We’ll use this to confirm your dropoff time.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
                        Email*
                      </label>
                      <input className="h-[70px] w-full bg-design-lightGray px-6 text-[18px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue" />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
                        Phone Number*
                      </label>
                      <input className="h-[70px] w-full bg-design-lightGray px-6 text-[18px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent transition-colors hover:ring-design-brightBlue/20 focus:ring-design-brightBlue" />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!selectedTime}
                    className={[
                      'mt-8 inline-flex h-[60px] items-center justify-center bg-design-brightBlue px-8 text-[16px] font-bold uppercase tracking-[0.06em] text-white',
                      'hover:bg-design-brightBlue/90 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue focus-visible:ring-offset-2',
                      !selectedTime ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    Continue
                  </button>

                  {!selectedTime ? (
                    <p className="mt-3 text-[12px] text-design-gray">
                      Select a timeslot to continue.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


