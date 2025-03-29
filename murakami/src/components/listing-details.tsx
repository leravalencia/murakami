"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Users, Home, MapPin, Wifi, Coffee, Utensils, Dumbbell, Waves, Bath, Tv, AirVent, AlertCircle, Car, Shield, Plane, Ship, Bike, Calendar } from "lucide-react"

const photos = [
  "/images/villa-1.jpg",
  "/images/villa-2.jpg",
  "/images/villa-3.jpg",
  "/images/villa-4.jpg",
  "/images/villa-5.jpg",
]

const amenities = [
  { icon: Wifi, label: "WiFi" },
  { icon: Coffee, label: "Coffee maker" },
  { icon: Utensils, label: "Kitchen" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Waves, label: "Pool" },
  { icon: Bath, label: "Hot tub" },
  { icon: Tv, label: "TV" },
  { icon: AirVent, label: "Air conditioning" },
]

const houseRules = [
  {
    icon: Car,
    title: "Transportation Safety",
    description: "Drive safely and be aware at all times. Roads can be challenging, and some drivers may drive fast. Always wear seatbelts and follow local traffic rules.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Do not leave valuables in parked cars or unattended on the beach. Keep your belongings secure at all times.",
  },
  {
    icon: Waves,
    title: "Beach Safety",
    description: "Be extremely careful when swimming due to rip currents. If caught in a rip current, do not swim against it; let it take you out and then swim back outside the channel.",
  },
  {
    icon: AlertCircle,
    title: "ATV Safety",
    description: "When using ATVs or bikes, goggles and bandanas are mandatory for safety. Always wear appropriate protective gear.",
  },
]

const transportationOptions = [
  {
    icon: Plane,
    title: "By Air",
    description: "Fly into SJO or Liberia airports. From there, take a charter flight to Cobano (via flysansa.com or costaricagreenair.com). From Cobano, arrange a taxi to Manzanillo (about 1 hour).",
    tips: "Book 4x4 rental car or ATV in advance as they get booked quickly.",
  },
  {
    icon: Ship,
    title: "By Car & Ferry",
    description: "From San Jose: 2 hours to Puntarenas, then 1.5-hour ferry ride, followed by 1.5-hour drive. From Liberia: 4-hour drive (80% good roads).",
    tips: "Check ferry schedule at nicoyapeninsula.com/travel-info/ferry/",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    date: "March 2024",
    comment: "Absolutely stunning property! The ocean views were breathtaking, and the Japanese-inspired design was perfect. The location is ideal for exploring Kamakura's temples and beaches.",
  },
  {
    id: 2,
    name: "Michael Tanaka",
    rating: 5,
    date: "February 2024",
    comment: "A perfect blend of modern comfort and traditional Japanese aesthetics. The kitchen was well-equipped, and the hot tub was a great way to relax after exploring the area.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    rating: 5,
    date: "January 2024",
    comment: "The villa exceeded our expectations! The pool area was fantastic, and the bedrooms were spacious and comfortable. The host was very responsive and helpful.",
  },
  {
    id: 4,
    name: "David Kim",
    rating: 5,
    date: "December 2023",
    comment: "Beautiful property with amazing amenities. The gym was a nice bonus, and the WiFi was fast and reliable. Would definitely recommend for families or groups.",
  },
  {
    id: 5,
    name: "Lisa Yamamoto",
    rating: 5,
    date: "November 2023",
    comment: "The location is perfect - close to the beach and temples, but still peaceful and private. The outdoor dining area was perfect for enjoying meals with ocean views.",
  },
]

export function ListingDetails() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-8">
      {/* Floating Book Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 shadow-lg"
          onClick={scrollToBooking}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book Now
        </Button>
      </div>

      {/* Photo Gallery */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={photos[currentPhotoIndex]}
          alt="Villa Murakami"
          fill
          className="object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={previousPhoto}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextPhoto}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentPhotoIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Listing Info */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Villa Murakami</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>Kamakura, Kanagawa, Japan</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.98</span>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Up to 6 guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>3 bedrooms</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p>
              Welcome to Villa Murakami, a stunning Japanese-inspired house with breathtaking ocean views, 
              just 200m from the beach. This modern retreat combines traditional Japanese aesthetics with 
              contemporary comfort, offering the perfect getaway for families and groups.
            </p>
            <p>
              The house features three spacious bedrooms, a fully equipped kitchen, and a beautiful living 
              area with floor-to-ceiling windows overlooking the Pacific Ocean. Enjoy the private garden, 
              outdoor dining area, and easy access to Kamakura's famous temples and attractions.
            </p>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-2">
                    <amenity.icon className="h-4 w-4" />
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Check-in: 3:00 PM
                  <br />
                  Check-out: 11:00 AM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Getting There Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Getting There</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {transportationOptions.map((option, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                    <p className="text-sm text-primary">{option.tips}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Local Transportation</h3>
                  <p className="text-sm text-muted-foreground">
                    For local exploration, consider renting an ATV or bike. Remember to wear appropriate safety gear and follow local traffic rules.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* House Rules Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">House Rules & Safety Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {houseRules.map((rule, index) => (
            <Card key={index}>
              <CardContent className="flex gap-4 p-6">
                <div className="flex-shrink-0">
                  <rule.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}