"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Facebook,
  Home,
  Instagram,
  Mail,
  Phone,
  Shield,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "@/domain/business"
import { CustomerServiceInquiry } from "@/domain/mail"

export default function KlantendienstPage() {
  const [formData, setFormData] = useState<CustomerServiceInquiry>({
    name: "",
    email: "",
    topic: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: any, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch("/api/mail/send-customerservice-inquiry", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFormSubmitted(true)
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: "",
        email: "",
        topic: "",
        message: "",
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Klantendienst</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We staan klaar om u te helpen met al uw vragen of problemen. Ons team van experts staat voor u klaar om u
              de beste service te bieden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Options */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Contactgegevens</CardTitle>
                <CardDescription>Neem direct contact met ons op</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a href={`mailto:${CUSTOMER_SUPPORT_MAIL}`} className="text-primary hover:underline">
                      {CUSTOMER_SUPPORT_MAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Telefoon</p>
                    <a href={`tel:${CUSTOMER_SUPPORT_PHONE}`} className="text-primary hover:underline">
                      {CUSTOMER_SUPPORT_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Beschikbaarheid</p>
                    <p className="text-sm text-muted-foreground">Maandag t.e.m. vrijdag</p>
                    <p className="text-sm text-muted-foreground">07:30 – 17:00</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="font-medium mb-3">Volg ons</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/p/Odiyoocom-61559361823129/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Stuur ons een bericht</CardTitle>
                <CardDescription>Vul het formulier in en we nemen zo snel mogelijk contact met u op</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                    <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-green-800 mb-2">Bericht verzonden!</h3>
                    <p className="text-green-700">
                      Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Naam</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Uw volledige naam"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="uw@email.be"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic">Onderwerp</Label>
                      <Select value={formData.topic} onValueChange={(value) => handleSelectChange("topic", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer een onderwerp" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="offerte">Offerte</SelectItem>
                          <SelectItem value="technisch">Technische vraag</SelectItem>
                          <SelectItem value="facturatie">Facturatie</SelectItem>
                          <SelectItem value="planning">Planning / afspraken</SelectItem>
                          <SelectItem value="klacht">Klacht</SelectItem>
                          <SelectItem value="anders">Anders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Bericht</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Typ hier uw bericht..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Verstuur bericht
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Veelgestelde vragen</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Hoe werkt het offerteproces?</AccordionTrigger>
                <AccordionContent>
                  Ons offerteproces is eenvoudig en snel. U vult het online formulier in met uw adres en dakgegevens,
                  selecteert uw voorkeuren voor materialen en eventuele extra diensten, en ontvangt direct een offerte
                  van verschillende aannemers. U kunt vervolgens de aannemer kiezen die het beste bij uw wensen en
                  budget past.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Hoe kan ik mijn offerte betalen?</AccordionTrigger>
                <AccordionContent>
                  Na het accepteren van een offerte, kunt u betalen via bankoverschrijving of online betaling. Meestal
                  wordt een aanbetaling van 30% gevraagd bij het begin van de werkzaamheden, en het resterende bedrag na
                  voltooiing van het project. Specifieke betalingsvoorwaarden worden altijd duidelijk vermeld in de
                  offerte die u ontvangt.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Hoe plan ik een afspraak met een aannemer?</AccordionTrigger>
                <AccordionContent>
                  Nadat u een offerte heeft ontvangen en een aannemer heeft geselecteerd, kunt u direct een afspraak
                  plannen via onze online agenda. U kunt kiezen tussen een telefonische consultatie of een fysieke
                  afspraak op locatie. De aannemer zal de afspraak bevestigen en u ontvangt een bevestigingsmail met
                  alle details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Welke garantie krijg ik op de werkzaamheden?</AccordionTrigger>
                <AccordionContent>
                  Alle aannemers op ons platform bieden minimaal 10 jaar garantie op de uitgevoerde werkzaamheden.
                  Daarnaast geldt er een fabrieksgarantie op de gebruikte materialen, die kan variëren van 15 tot 30
                  jaar, afhankelijk van het type materiaal. Sommige premium aannemers bieden zelfs uitgebreidere
                  garantievoorwaarden. De specifieke garantievoorwaarden worden altijd vermeld in de offerte.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Kan ik mijn offerte of afspraak annuleren of wijzigen?</AccordionTrigger>
                <AccordionContent>
                  Ja, u kunt uw offerte of afspraak annuleren of wijzigen tot 48 uur voor de geplande afspraak zonder
                  kosten. Voor annuleringen binnen 48 uur kunnen administratiekosten in rekening worden gebracht. U kunt
                  wijzigingen aanbrengen via uw online account of door contact op te nemen met onze klantenservice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-6 text-center">
              <Link href="/faq">
                <Button variant="outline">
                  Bekijk alle veelgestelde vragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="bg-primary/5 rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Waarom klanten ons vertrouwen</h2>
              <p className="text-muted-foreground">
                We streven ernaar om binnen 24 uur te reageren op alle vragen en bieden een 100% tevredenheidsgarantie.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "De klantenservice was uitstekend. Ze hebben al mijn vragen snel en duidelijk beantwoord."
                  </p>
                  <p className="mt-4 font-medium">Sarah Jansen</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Zeer professionele aanpak. Ze namen de tijd om mijn specifieke situatie te begrijpen."
                  </p>
                  <p className="mt-4 font-medium">Michael de Vries</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Snelle reactie en zeer behulpzaam. Ze hebben me geholpen de beste offerte te vinden."
                  </p>
                  <p className="mt-4 font-medium">Jennifer Bakker</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">100% Tevredenheidsgarantie</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
