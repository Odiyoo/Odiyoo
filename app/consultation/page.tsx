"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, Clock, Home, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function ConsultationPage() {
  const [consultationType, setConsultationType] = useState("phone")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isBooked, setIsBooked] = useState(false)

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Adjust for Sunday as first day (0)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ day: "", isCurrentMonth: false })
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

      days.push({
        day: i,
        date: date.toISOString().split("T")[0],
        isCurrentMonth: true,
        isSelectable: !isWeekend && !isPast,
      })
    }

    return days
  }

  // Get available time slots for the selected date
  const getTimeSlots = () => {
    // In a real app, these would be fetched from a backend based on availability
    return [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ]
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle consultation booking
  const handleBookConsultation = () => {
    // In a real app, this would send the booking data to a backend
    console.log({
      type: consultationType,
      date: selectedDate,
      time: selectedTime,
      ...formData,
    })

    setIsBooked(true)
  }

  // Format month name
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("nl-NL", { month: "long", year: "numeric" })
  }

  // Check if form is complete
  const isFormComplete = () => {
    return selectedDate && selectedTime && formData.name && formData.email && formData.phone
  }

  // Calendar days
  const calendarDays = generateCalendarDays()

  // Time slots
  const timeSlots = getTimeSlots()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link
              href="/quote"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar offerte
            </Link>
            <h1 className="text-3xl font-bold">Plan je consultatie</h1>
            <p className="mt-2 text-muted-foreground">
              Kies een datum en tijd die voor jou het beste uitkomt voor een gesprek met een van onze dakexperts.
            </p>
          </div>

          {!isBooked ? (
            <Card>
              <CardHeader>
                <CardTitle>Selecteer type consultatie</CardTitle>
                <CardDescription>Kies hoe je in contact wilt komen met onze expert.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={consultationType}
                  onValueChange={setConsultationType}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div
                    className={`flex flex-col items-center justify-between rounded-lg border p-4 ${consultationType === "phone" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="phone" id="phone" className="sr-only" />
                    <Label htmlFor="phone" className="cursor-pointer flex flex-col items-center">
                      <Phone className="h-10 w-10 mb-3 text-primary" />
                      <span className="text-lg font-medium">Telefonisch gesprek inplannen</span>
                      <span className="text-sm text-muted-foreground text-center mt-2">
                        Bespreek je dakproject telefonisch met een van onze experts.
                      </span>
                    </Label>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-between rounded-lg border p-4 ${consultationType === "physical" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="physical" id="physical" className="sr-only" />
                    <Label htmlFor="physical" className="cursor-pointer flex flex-col items-center">
                      <User className="h-10 w-10 mb-3 text-primary" />
                      <span className="text-lg font-medium">Fysieke afspraak inplannen</span>
                      <span className="text-sm text-muted-foreground text-center mt-2">
                        Plan een bezoek aan je woning voor een persoonlijke inspectie.
                      </span>
                    </Label>
                  </div>
                </RadioGroup>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selecteer een datum en tijd</h3>

                  {/* Calendar */}
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between p-4 border-b">
                      <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h3 className="font-medium capitalize">{formatMonth(currentMonth)}</h3>
                      <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-4">
                      {/* Weekday headers */}
                      <div className="grid grid-cols-7 mb-2">
                        {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((day, i) => (
                          <div key={i} className="text-center text-sm font-medium">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar days */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, i) => (
                          <div
                            key={i}
                            className={`
                              h-10 flex items-center justify-center rounded-md text-sm
                              ${!day.isCurrentMonth ? "invisible" : ""}
                              ${day.isSelectable ? "cursor-pointer hover:bg-gray-100" : "text-gray-300"}
                              ${selectedDate === day.date ? "bg-primary text-white hover:bg-primary" : ""}
                            `}
                            onClick={() => day.isSelectable && handleDateSelect(day.date)}
                          >
                            {day.day}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div className="space-y-3">
                      <h4 className="font-medium">
                        Beschikbare tijden op{" "}
                        {new Date(selectedDate).toLocaleDateString("nl-NL", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time, i) => (
                          <button
                            key={i}
                            className={`
                              py-2 px-3 rounded-md text-sm border
                              ${selectedTime === time ? "bg-primary text-white border-primary" : "hover:bg-gray-100"}
                            `}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Jouw gegevens</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Naam</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Volledige naam"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+31 6 12345678"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mailadres</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jouw@email.nl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Opmerkingen (optioneel)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Specifieke vragen of opmerkingen"
                    />
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="rounded-lg bg-primary/5 p-4">
                    <h4 className="font-medium mb-2">Jouw afspraak</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">
                            {new Date(selectedDate).toLocaleDateString("nl-NL", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">Datum</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{selectedTime} uur</p>
                          <p className="text-sm text-muted-foreground">Tijd</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        {consultationType === "phone" ? (
                          <Phone className="h-5 w-5 mr-2 text-primary" />
                        ) : (
                          <User className="h-5 w-5 mr-2 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">
                            {consultationType === "phone" ? "Telefonisch gesprek" : "Fysieke afspraak"}
                          </p>
                          <p className="text-sm text-muted-foreground">Type consultatie</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/quote">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug
                  </Link>
                </Button>
                <Button onClick={handleBookConsultation} disabled={!isFormComplete()}>
                  Afspraak bevestigen
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Afspraak bevestigd!</CardTitle>
                <CardDescription>
                  We hebben je consultatie ingepland. Je ontvangt binnenkort een bevestiging per e-mail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4">
                  <h4 className="font-medium mb-2">Details van je afspraak</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">
                          {new Date(selectedDate!).toLocaleDateString("nl-NL", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">Datum</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">{selectedTime} uur</p>
                        <p className="text-sm text-muted-foreground">Tijd</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      {consultationType === "phone" ? (
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                      ) : (
                        <User className="h-5 w-5 mr-2 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">
                          {consultationType === "phone" ? "Telefonisch gesprek" : "Fysieke afspraak"}
                        </p>
                        <p className="text-sm text-muted-foreground">Type consultatie</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Heb je vragen over je afspraak? Neem contact op met onze klantenservice op{" "}
                    <span className="font-medium text-foreground">020-123-4567</span>.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link href="/">Terug naar home</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
