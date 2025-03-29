export interface CalendarEvent {
  uid: string
  summary: string
  start: string
  end: string
  status: string
  price?: number
  isBooked?: boolean
}

export async function fetchAirbnbCalendar(): Promise<CalendarEvent[]> {
  try {
    const AIRBNB_ICAL_URL =
      "https://www.airbnb.com/calendar/ical/1367509825861386634.ics?s=8f209483a6922d551136c280b9ce7d35&locale=en"

    const response = await fetch(AIRBNB_ICAL_URL, {
      cache: "no-store", // Ensure we get fresh data
      headers: {
        Accept: "text/calendar",
        "User-Agent": "Mozilla/5.0 (compatible; VillaMurakami/1.0)",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Airbnb calendar: ${response.status}`)
    }

    const icalData = await response.text()

    // Parse the iCal data to extract events
    const events: CalendarEvent[] = []
    const eventBlocks = icalData.split("BEGIN:VEVENT")

    // Skip the first element as it's the header
    for (let i = 1; i < eventBlocks.length; i++) {
      const block = eventBlocks[i]

      // Extract UID
      const uidMatch = block.match(/UID:(.*?)(?:\r\n|\n)/)
      const uid = uidMatch ? uidMatch[1].trim() : `event-${i}`

      // Extract summary
      const summaryMatch = block.match(/SUMMARY:(.*?)(?:\r\n|\n)/)
      const summary = summaryMatch ? summaryMatch[1].trim() : ""

      // Extract start date
      const dtStartMatch = block.match(/DTSTART(?:;VALUE=DATE)?:(.*?)(?:\r\n|\n)/)
      const dtStart = dtStartMatch ? dtStartMatch[1].trim() : ""

      // Extract end date
      const dtEndMatch = block.match(/DTEND(?:;VALUE=DATE)?:(.*?)(?:\r\n|\n)/)
      const dtEnd = dtEndMatch ? dtEndMatch[1].trim() : ""

      // Extract status
      const statusMatch = block.match(/STATUS:(.*?)(?:\r\n|\n)/)
      const status = statusMatch ? statusMatch[1].trim() : "CONFIRMED"

      // Extract description
      const descriptionMatch = block.match(/DESCRIPTION:(.*?)(?:\r\n|\n)/)
      const description = descriptionMatch ? descriptionMatch[1].trim() : ""

      // Determine if this is a booking event
      // In Airbnb iCal, bookings typically have summaries like "Booked", "Unavailable", "Reserved", etc.
      const isBooked = isBookingEvent(summary, description)

      // Try to extract price from description
      let price: number | undefined = undefined
      if (!isBooked) {
        price = extractPrice(description) || extractPrice(summary)
      }

      if (dtStart && dtEnd) {
        events.push({
          uid,
          summary,
          start: formatICalDate(dtStart),
          end: formatICalDate(dtEnd),
          status,
          price,
          isBooked,
        })
      }
    }

    // Generate availability data for all dates in the next 6 months
    const allDates = generateDateAvailability(events)

    return allDates
  } catch (error) {
    console.error("Error fetching Airbnb calendar:", error)
    throw error
  }
}

// Helper function to determine if an event is a booking
function isBookingEvent(summary: string, description: string): boolean {
  const bookingKeywords = ["booked", "unavailable", "reserved", "not available", "blocked"]
  const lowerSummary = summary.toLowerCase()
  const lowerDescription = description.toLowerCase()

  return bookingKeywords.some((keyword) => lowerSummary.includes(keyword) || lowerDescription.includes(keyword))
}

// Helper function to extract price from text
function extractPrice(text: string): number | undefined {
  const pricePatterns = [
    /\$(\d+)/, // $250
    /Price: \$(\d+)/i, // Price: $250
    /(\d+) USD/i, // 250 USD
    /Rate: \$(\d+)/i, // Rate: $250
    /Cost: \$(\d+)/i, // Cost: $250
    /(\d+) per night/i, // 250 per night
    /Night: \$(\d+)/i, // Night: $250
  ]

  for (const pattern of pricePatterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return Number.parseInt(match[1], 10)
    }
  }

  return undefined
}

// Generate comprehensive availability data for all dates
function generateDateAvailability(bookingEvents: CalendarEvent[]): CalendarEvent[] {
  const result: CalendarEvent[] = []
  const today = new Date()
  const sixMonthsLater = new Date(today)
  sixMonthsLater.setMonth(today.getMonth() + 6)

  // Define base prices and weekend premium
  const basePrice = 250
  const weekendPremium = 50 // Extra for Friday and Saturday

  // Define seasonal adjustments
  const seasonalPricing: { [key: string]: number } = {
    // High season (summer)
    "6": 25, // June
    "7": 50, // July
    "8": 50, // August

    // Holiday season
    "11": 25, // November
    "12": 75, // December
  }

  // First, add all booking events to the result
  result.push(...bookingEvents)

  // Then, generate availability data for each day
  for (let d = new Date(today); d <= sixMonthsLater; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d)
    const dateStr = currentDate.toISOString().split("T")[0]

    // Check if this date is already covered by a booking event
    const isBooked = isDateInBookedPeriod(currentDate, bookingEvents)

    // If not booked, add an available date
    if (!isBooked) {
      // Calculate price based on day of week and season
      let price = basePrice

      // Weekend premium (Friday and Saturday)
      const dayOfWeek = currentDate.getDay()
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        // Friday or Saturday
        price += weekendPremium
      }

      // Seasonal adjustment
      const month = (currentDate.getMonth() + 1).toString()
      if (seasonalPricing[month]) {
        price += seasonalPricing[month]
      }

      // Create an available date event
      const nextDay = new Date(currentDate)
      nextDay.setDate(nextDay.getDate() + 1)

      result.push({
        uid: `available-${dateStr}`,
        summary: "Available",
        start: currentDate.toISOString(),
        end: nextDay.toISOString(),
        status: "AVAILABLE",
        price: price,
        isBooked: false,
      })
    }
  }

  return result
}

// Check if a date falls within any booked period
function isDateInBookedPeriod(date: Date, bookedEvents: CalendarEvent[]): boolean {
  const dateStr = date.toISOString().split("T")[0]

  return bookedEvents.some((event) => {
    if (!event.isBooked) return false

    const eventStart = new Date(event.start)
    const eventStartStr = eventStart.toISOString().split("T")[0]

    const eventEnd = new Date(event.end)
    const eventEndStr = eventEnd.toISOString().split("T")[0]

    return dateStr >= eventStartStr && dateStr < eventEndStr
  })
}

// Format iCal date (YYYYMMDD) to ISO string
function formatICalDate(icalDate: string): string {
  // Handle dates in format YYYYMMDD
  if (icalDate.length === 8) {
    const year = icalDate.substring(0, 4)
    const month = icalDate.substring(4, 6)
    const day = icalDate.substring(6, 8)
    return `${year}-${month}-${day}T12:00:00.000Z`
  }

  // Handle dates in format YYYYMMDDTHHMMSSZ
  if (icalDate.includes("T")) {
    const datePart = icalDate.substring(0, 8)
    const year = datePart.substring(0, 4)
    const month = datePart.substring(4, 6)
    const day = datePart.substring(6, 8)

    const timePart = icalDate.substring(9).replace("Z", "")
    const hour = timePart.substring(0, 2)
    const minute = timePart.substring(2, 4)
    const second = timePart.substring(4, 6)

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`
  }

  // Return as is if format is not recognized
  return icalDate
}

export function isDateBooked(date: Date, events: CalendarEvent[]): boolean {
  // Set time to noon to avoid timezone issues
  const checkDate = new Date(date)
  checkDate.setHours(12, 0, 0, 0)
  const checkDateStr = checkDate.toISOString().split("T")[0]

  return events.some((event) => {
    if (event.isBooked === false) return false

    const eventStart = new Date(event.start)
    const eventStartStr = eventStart.toISOString().split("T")[0]

    const eventEnd = new Date(event.end)
    const eventEndStr = eventEnd.toISOString().split("T")[0]

    // Check if the date is between start and end (inclusive of start, exclusive of end)
    return checkDateStr >= eventStartStr && checkDateStr < eventEndStr
  })
}

// Mock data for testing when the API fails
export function getMockBookedDates(): CalendarEvent[] {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const twoWeeksFromNow = new Date(today)
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)

  return [
    {
      uid: "mock-1",
      summary: "Booked",
      start: tomorrow.toISOString(),
      end: nextWeek.toISOString(),
      status: "CONFIRMED",
      price: 250,
      isBooked: true,
    },
    {
      uid: "mock-2",
      summary: "Booked",
      start: twoWeeksFromNow.toISOString(),
      end: new Date(twoWeeksFromNow.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "CONFIRMED",
      price: 275,
      isBooked: true,
    },
    // Add some available dates
    {
      uid: "mock-available-1",
      summary: "Available",
      start: new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      end: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "AVAILABLE",
      price: 250,
      isBooked: false,
    },
  ]
}

