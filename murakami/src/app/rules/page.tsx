import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactButton } from "@/components/contact-button"

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Villa Murakami</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#photos" className="text-sm font-medium hover:text-primary">
              Photos
            </Link>
            <Link href="/#amenities" className="text-sm font-medium hover:text-primary">
              Amenities
            </Link>
            <Link href="/#reviews" className="text-sm font-medium hover:text-primary">
              Reviews
            </Link>
            <Link href="/rules" className="text-sm font-medium hover:text-primary">
              House Rules
            </Link>
            <Link href="/book" className="text-sm font-medium hover:text-primary">
              Book Now
            </Link>
          </nav>
          <Button asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">House Rules</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>House Rules</CardTitle>
              <CardDescription>Please follow these rules during your stay at Villa Murakami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Check-in and Check-out</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>Check-in: 3:00 PM - 8:00 PM</li>
                    <li>Check-out: 11:00 AM</li>
                    <li>Self check-in with lockbox</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">During Your Stay</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>No smoking</li>
                    <li>No pets</li>
                    <li>No parties or events</li>
                    <li>Quiet hours: 10:00 PM - 8:00 AM</li>
                    <li>Remove shoes inside the house</li>
                    <li>Keep property clean and tidy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Pool & Beach</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>No diving in the pool</li>
                    <li>Children must be supervised</li>
                    <li>Rinse off sand before entering the house</li>
                    <li>Beach gear must be returned clean</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Departure</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                    <li>Lock all doors and windows</li>
                    <li>Turn off all lights and A/C</li>
                    <li>Place used towels in the bathroom</li>
                    <li>Take out trash before check-out</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Safety & Emergency</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                  <li>Emergency: 911</li>
                  <li>Host (Era): Contact through Airbnb or email</li>
                  <li>First aid kit: Master bathroom</li>
                  <li>Fire extinguisher: Kitchen</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Local Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                  <li>Beach: 200m walk</li>
                  <li>Playa Hermosa (surf spot): 7 min drive</li>
                  <li>Santa Teresa: 15 min drive</li>
                  <li>Nearest grocery store: 5 min drive</li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2">Concierge Services</h3>
                <p className="text-muted-foreground text-sm">Our concierge manager can assist with:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                  <li>Car/ATV rentals</li>
                  <li>Surf lessons and board rentals</li>
                  <li>Horseback riding excursions</li>
                  <li>Personal chef arrangements</li>
                  <li>Airport transfers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-muted/40 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Villa Murakami</h3>
              <p className="text-sm text-muted-foreground">
                Japanese-inspired house with stunning ocean views, just 200m from the beach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#photos" className="text-muted-foreground hover:text-primary">
                    Photos
                  </Link>
                </li>
                <li>
                  <Link href="/#amenities" className="text-muted-foreground hover:text-primary">
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link href="/#reviews" className="text-muted-foreground hover:text-primary">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="text-muted-foreground hover:text-primary">
                    House Rules
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="text-muted-foreground hover:text-primary">
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For any questions or special requests, please contact Era.
              </p>
              <ContactButton />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Villa Murakami. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

