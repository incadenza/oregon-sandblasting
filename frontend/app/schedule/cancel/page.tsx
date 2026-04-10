import {format, parse} from 'date-fns'
import Link from 'next/link'

import {cancelBooking} from '@/app/actions/schedule'
import {formatTimeRange} from '@/app/lib/schedule'

type Props = {
  searchParams: Promise<{date?: string; time?: string; token?: string}>
}

export default async function CancelPage({searchParams}: Props) {
  const params = await searchParams
  const {date, time, token} = params

  if (!date || !time || !token) {
    return (
      <section className="bg-white py-20">
        <div className="container max-w-xl text-center">
          <h1 className="text-[28px] font-bold text-design-oregonSandblastingBlue">
            Invalid Link
          </h1>
          <p className="mt-4 text-[16px] text-design-gray">
            This cancellation link is missing required information.
          </p>
          <Link
            href="/schedule"
            className="mt-8 inline-flex h-[45px] items-center justify-center bg-design-brightBlue px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-white hover:bg-design-brightBlue/90"
          >
            Back to Schedule
          </Link>
        </div>
      </section>
    )
  }

  const result = await cancelBooking(date, time, token)

  const dateObj = parse(date, 'yyyy-MM-dd', new Date())
  const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy')
  const timeRange = formatTimeRange(time)

  return (
    <section className="bg-white py-20">
      <div className="container max-w-xl text-center">
        {result.success ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="mt-6 text-[28px] font-bold text-design-oregonSandblastingBlue sm:text-[36px]">
              Booking Cancelled
            </h1>
            <p className="mt-4 text-[16px] text-design-gray">
              Your dropoff on <strong>{formattedDate}</strong> at <strong>{timeRange}</strong> has been cancelled. The slot is now available for others.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="mt-6 text-[28px] font-bold text-design-oregonSandblastingBlue sm:text-[36px]">
              Unable to Cancel
            </h1>
            <p className="mt-4 text-[16px] text-design-gray">
              {result.error || 'This booking could not be cancelled.'}
            </p>
          </>
        )}

        <Link
          href="/schedule"
          className="mt-8 inline-flex h-[45px] items-center justify-center bg-design-brightBlue px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-white hover:bg-design-brightBlue/90"
        >
          {result.success ? 'Schedule a New Dropoff' : 'Back to Schedule'}
        </Link>
      </div>
    </section>
  )
}
