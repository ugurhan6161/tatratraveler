"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
} from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EnhancedDatePickerProps {
  className?: string
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
}

export function EnhancedDatePicker({
  className,
  date,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
  minDate = new Date(),
}: EnhancedDatePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date())
  const [isOpen, setIsOpen] = React.useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handleDateSelect = (selectedDate: Date) => {
    onDateChange?.(selectedDate)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const isDateDisabled = (day: Date) => {
    return isBefore(day, minDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 justify-start text-left font-normal bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/50 transition-all duration-200",
              !date && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
            {date ? (
              <span className="text-gray-900 font-medium">{format(date, "EEEE, MMMM dd, yyyy")}</span>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 shadow-xl border-0" align="start">
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary/80 text-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevMonth}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 p-4 pb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 p-4 pt-0">
              {daysInMonth.map((day) => {
                const isSelected = date && isSameDay(day, date)
                const isTodayDate = isToday(day)
                const isDisabled = isDateDisabled(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !isDisabled && handleDateSelect(day)}
                    disabled={isDisabled}
                    className={cn(
                      "h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                      isCurrentMonth ? "text-gray-900" : "text-gray-400",
                      isSelected && "bg-primary text-white shadow-lg scale-105",
                      !isSelected && isTodayDate && "bg-primary/10 text-primary border border-primary/20",
                      !isSelected && !isTodayDate && isCurrentMonth && "hover:bg-gray-100",
                      isDisabled && "opacity-30 cursor-not-allowed hover:scale-100",
                      !isDisabled && !isSelected && "hover:bg-primary/5",
                    )}
                  >
                    {format(day, "d")}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Select your travel date</span>
                {date && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDateSelect(new Date())}
                    className="text-primary hover:text-primary/80"
                  >
                    Today
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
