"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { EnhancedDatePicker } from "@/components/ui/enhanced-date-picker"
import { EnhancedDateRangePicker } from "@/components/ui/enhanced-date-range-picker"

interface BookingFormProps {
  className?: string
}

export function BookingForm({ className }: BookingFormProps) {
  const t = useTranslations("BookingForm")
  const [bookingType, setBookingType] = useState<"flight" | "hotel">("flight")
  const [dates, setDates] = useState<DateRange | undefined>(undefined)

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-type">{t.bookingType}</Label>
          <Select value={bookingType} onValueChange={(value) => setBookingType(value as "flight" | "hotel")}>
            <SelectTrigger id="booking-type">
              <SelectValue placeholder={t.selectBookingType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flight">{t.flight}</SelectItem>
              <SelectItem value="hotel">{t.hotel}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="destination">{t.destination}</Label>
          <Input type="text" id="destination" placeholder={t.enterDestination} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookingType === "flight" ? (
          <EnhancedDateRangePicker
            date={dates}
            onDateChange={setDates}
            placeholder={t.selectDates}
            className="w-full"
          />
        ) : (
          <EnhancedDatePicker
            date={dates?.from}
            onDateChange={(date) => setDates(date ? { from: date, to: undefined } : undefined)}
            placeholder={t.selectDate}
            className="w-full"
          />
        )}
        <div>
          <Label htmlFor="guests">{t.guests}</Label>
          <Input type="number" id="guests" placeholder={t.enterGuests} />
        </div>
      </div>

      <Button>{t.search}</Button>
    </div>
  )
}
