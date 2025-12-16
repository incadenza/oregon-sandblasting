import * as React from 'react'
import {DayPicker} from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Intentionally "absolute default" DayPicker.
 * Styling/layout comes from `react-day-picker/dist/style.css` imported in `app/globals.css`.
 * We keep component logic only; any tiny theme tweaks should be done in CSS to avoid layout regressions.
 */
export default function Calendar({showOutsideDays = true, ...props}: CalendarProps) {
  return <DayPicker showOutsideDays={showOutsideDays} {...props} />
}


