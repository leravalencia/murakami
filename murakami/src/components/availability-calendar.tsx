"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface BookedDate {
  uid: string
  summary: string
  start: string
  end: string
  status: "available" | "booked"
  price?: number
}

export function AvailabilityCalendar() {
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/calendar")
        if (response.ok) {
          const data = await response.json()
          console.log("Received booked dates:", data.bookedDates)
          setBookedDates(data.bookedDates || [])
        }
      } catch (error) {
        console.error("Error fetching availability:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [])

  // Function to check if a date is booked
  const isDateBooked = (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(12, 0, 0, 0)
    const checkDateStr = checkDate.toISOString().split("T")[0]

    return bookedDates.some((booking) => {
      if (booking.status !== "booked") return false

      const eventStart = new Date(booking.start)
      eventStart.setHours(12, 0, 0, 0)
      const eventStartStr = eventStart.toISOString().split("T")[0]

      const eventEnd = new Date(booking.end)
      eventEnd.setHours(12, 0, 0, 0)
      const eventEndStr = eventEnd.toISOString().split("T")[0]

      return checkDateStr >= eventStartStr && checkDateStr < eventEndStr
    })
  }

  // Function to get price for a specific date
  const getPriceForDate = (date: Date) => {
    const checkDate = new Date(date)
    checkDate.setHours(12, 0, 0, 0)
    const checkDateStr = checkDate.toISOString().split("T")[0]

    const availableDate = bookedDates.find(
      (booking) => 
        booking.status === "available" && 
        booking.start.split("T")[0] === checkDateStr
    )

    if (availableDate?.price) {
      return availableDate.price
    }

    // Default price if no specific price is found
    const dayOfWeek = checkDate.getDay()
    return dayOfWeek === 5 || dayOfWeek === 6 ? 300 : 250 // Weekend premium
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability & Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          className="rounded-md border"
          disabled={(date) => {
            // Disable dates in the past
            if (date < new Date()) return true
            // Disable dates that are marked as booked
            return isDateBooked(date)
          }}
          modifiers={{
            available: (date) => !isDateBooked(date),
            weekend: (date) => {
              const day = date.getDay()
              return day === 5 || day === 6
            }
          }}
          modifiersStyles={{
            available: {
              color: "green",
              fontWeight: "bold"
            },
            weekend: {
              color: "blue",
              fontWeight: "bold"
            }
          }}
          footer={
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Green: Available</p>
              <p>Blue: Weekend</p>
              <p>Gray: Booked</p>
              <p className="mt-2">Base price: $250/night</p>
              <p>Weekend price: $300/night</p>
              <p className="mt-2 text-xs">Prices shown are per night and may vary by season</p>
            </div>
          }
        />
        <div className="mt-4 grid grid-cols-7 gap-1 text-xs">
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() + i)
            const price = getPriceForDate(date)
            return (
              <div key={i} className="text-center">
                <div className="font-medium">{format(date, "EEE")}</div>
                <div className="text-primary font-bold">${price}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

