"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Availability {
  date: string
  available: boolean
}

export function AirbnbCalendar() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch("/api/airbnb-sync")
        const data = await response.json()
        setAvailability(data.listing.availability || [])
      } catch (error) {
        console.error("Error fetching availability:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [])

  // Convert availability data to a format that the Calendar component can use
  const disabledDates = availability.filter((day) => !day.available).map((day) => new Date(day.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
        <CardDescription>Check which dates are available for booking</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p>Loading availability...</p>
          </div>
        ) : (
          <Calendar
            mode="single"
            disabled={(date) => {
              // Disable dates in the past
              if (date < new Date()) return true

              // Disable dates that are marked as unavailable
              return disabledDates.some(
                (disabledDate) =>
                  disabledDate.getDate() === date.getDate() &&
                  disabledDate.getMonth() === date.getMonth() &&
                  disabledDate.getFullYear() === date.getFullYear(),
              )
            }}
            className="rounded-md border"
          />
        )}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-muted mr-2"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

