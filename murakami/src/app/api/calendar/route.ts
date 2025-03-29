import { NextResponse } from "next/server"
import ical, { ICalEvent, ICalData } from "node-ical"

interface CalendarEvent {
  type: string
  uid: string
  summary: string
  start: Date
  end: Date
}

interface BookedDate {
  uid: string
  summary: string
  start: string
  end: string
  status: "available" | "booked"
  price?: number
}

export async function GET() {
  try {
    const icsUrl = "https://www.airbnb.com/calendar/ical/1367509825861386634.ics?s=8f209483a6922d551136c280b9ce7d35&locale=en"
    
    // Parse the ICS data
    const events = await new Promise<ICalData>((resolve, reject) => {
      ical.fromURL(icsUrl, {}, (err, data) => {
        if (err) reject(err)
        else resolve(data as ICalData)
      })
    })

    // Log the raw events for debugging
    console.log("Raw events from Airbnb:", JSON.stringify(events, null, 2))

    // Transform the events into our format
    const bookedDates: BookedDate[] = Object.values(events)
      .filter((event: ICalEvent) => event.type === "VEVENT")
      .map((event: ICalEvent) => {
        const isAvailable = event.summary.toLowerCase().includes("available")
        const priceMatch = event.summary.match(/\$(\d+)/)
        
        const booking: BookedDate = {
          uid: event.uid,
          summary: event.summary,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          status: isAvailable ? "available" : "booked",
          price: isAvailable ? parseInt(priceMatch?.[1] || "250") : undefined
        }

        // Log each transformed booking
        console.log("Transformed booking:", booking)
        
        return booking
      })

    // Sort events by start date
    bookedDates.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

    return NextResponse.json({ 
      bookedDates,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error("Error fetching calendar:", error)
    return NextResponse.json({ 
      error: "Failed to fetch calendar data",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

