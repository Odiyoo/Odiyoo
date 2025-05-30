"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  Euro,
  Home,
  Mail,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CUSTOMER_SUPPORT_PHONE } from "@/domain/business"

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    specialization: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the form data to a server
    console.log("Partner application submitted:", formData)
    setFormSubmitted(true)
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        city: "",
        experience: "",
        specialization: "",
        message: "",
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary mb-4">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-medium">Word partner van Odiyoo</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Sluit je aan als <span className="text-primary">partner</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Vergroot je klantenbereik en groei je bedrijf met Odiyoo. Wij verbinden je met klanten die op zoek zijn
                naar betrouwbare dakdekkers in jouw regio.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button size="lg" onClick={() => document.getElementById("application-form")?.scrollIntoView()}>
                  Word nu partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Meer informatie
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20" id="voordelen">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">Voordelen voor aannemers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ontdek waarom meer dan 100 aannemers al partner zijn van Odiyoo en hoe wij je bedrijf kunnen laten
                groeien.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Meer klanten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Krijg toegang tot duizenden potentiële klanten die actief op zoek zijn naar dakdekkers. Gemiddeld
                    ontvangen onze partners 15-25 nieuwe leads per maand.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <Euro className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Hogere omzet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Onze partners rapporteren gemiddeld 30-50% omzetgroei binnen het eerste jaar. Geen vooruitbetaling,
                    alleen een kleine commissie bij succesvolle projecten.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Automatische offertes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ons platform genereert automatisch offertes op basis van jouw prijzen en beschikbaarheid. Bespaar
                    tijd en focus op wat je het beste doet: dakwerk.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Kwaliteitsgarantie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Wij screenen alle klanten en bieden ondersteuning bij geschillen. Daarnaast krijg je toegang tot
                    faillissementsbescherming voor extra zekerheid.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Groei je reputatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bouw een sterke online reputatie op met klantbeoordelingen en showcase je beste projecten. Klanten
                    zien direct je ervaring en kwaliteit.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Transparante prijzen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stel je eigen prijzen in en pas ze aan wanneer je wilt. Volledige controle over je tarieven en
                    winstmarges, zonder verborgen kosten.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="bg-gray-100 py-20" id="verwachtingen">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">Wat verwachten wij?</h2>
                <p className="text-lg text-muted-foreground">
                  Om de kwaliteit van ons platform te waarborgen, stellen wij enkele eisen aan onze partners.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-6 w-6 mr-2 text-primary" />
                      Kwalificaties & Certificeringen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Geldige bedrijfsregistratie en BTW-nummer</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Minimaal 3 jaar ervaring in dakwerken</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Geldige aansprakelijkheidsverzekering</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Relevante vakbekwaamheidscertificaten</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-6 w-6 mr-2 text-primary" />
                      Kwaliteit & Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Minimaal 4.0 sterren klantbeoordeling</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Reactie binnen 24 uur op klantverzoeken</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Professionele communicatie en presentatie</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Minimaal 10 jaar garantie op werkzaamheden</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-6 w-6 mr-2 text-primary" />
                      Financiële Zekerheid
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Gezonde financiële positie (kredietcheck)</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Geen openstaande geschillen of claims</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Optioneel: faillissementsbescherming</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-6 w-6 mr-2 text-primary" />
                      Beschikbaarheid & Commitment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Actief beschikbaar voor nieuwe projecten</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Bereid tot samenwerking met Odiyoo-proces</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regelmatige updates van beschikbaarheid</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Testimonials */}
        <section className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">Wat onze partners zeggen</h2>
              <p className="text-lg text-muted-foreground">
                Hoor van bestaande partners hoe Odiyoo hun bedrijf heeft geholpen groeien.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "Sinds ik partner ben van Odiyoo is mijn omzet met 40% gestegen. De leads zijn van hoge kwaliteit en
                    het platform is gebruiksvriendelijk."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 mr-3">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Partner"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Jan Vermeulen</p>
                      <p className="text-sm text-muted-foreground">Dakwerken Vermeulen, Antwerpen</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "Het automatische offertesysteem bespaart me uren per week. Ik kan me focussen op het werk terwijl
                    Odiyoo zorgt voor nieuwe klanten."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 mr-3">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Partner"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Marie Dubois</p>
                      <p className="text-sm text-muted-foreground">Toiture Dubois, Brussel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "De kwaliteit van de klanten via Odiyoo is uitstekend. Bijna alle leads resulteren in concrete
                    projecten. Zeer tevreden!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 mr-3">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Partner"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Peter Van Der Berg</p>
                      <p className="text-sm text-muted-foreground">Dakdekkerij Van Der Berg, Gent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="bg-primary/5 py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Word partner van Odiyoo</h2>
                <p className="text-lg text-muted-foreground">
                  Vul het formulier in en we nemen binnen 48 uur contact met je op om de mogelijkheden te bespreken.
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
                      <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-green-800 mb-2">Aanvraag verzonden!</h3>
                      <p className="text-green-700">
                        Bedankt voor je interesse. We nemen binnen 48 uur contact met je op om de mogelijkheden te
                        bespreken.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Bedrijfsnaam</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Uw bedrijfsnaam"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPerson">Contactpersoon</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            placeholder="Uw naam"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mailadres</Label>
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
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefoonnummer</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+32 123 45 67 89"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Werkgebied (stad/regio)</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Antwerpen, Brussel, ..."
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Jaren ervaring</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => handleSelectChange("experience", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteer ervaring" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3-5">3-5 jaar</SelectItem>
                              <SelectItem value="5-10">5-10 jaar</SelectItem>
                              <SelectItem value="10-15">10-15 jaar</SelectItem>
                              <SelectItem value="15+">15+ jaar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialisatie</Label>
                        <Select
                          value={formData.specialization}
                          onValueChange={(value) => handleSelectChange("specialization", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer uw specialisatie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dakpannen">Dakpannen</SelectItem>
                            <SelectItem value="leien">Leien</SelectItem>
                            <SelectItem value="platte-daken">Platte daken</SelectItem>
                            <SelectItem value="renovatie">Dakrenovatie</SelectItem>
                            <SelectItem value="isolatie">Dakisolatie</SelectItem>
                            <SelectItem value="zonnepanelen">Zonnepanelen</SelectItem>
                            <SelectItem value="alles">Alle dakwerkzaamheden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Aanvullende informatie</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Vertel ons meer over uw bedrijf, ervaring en waarom u partner wilt worden..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Aanvraag indienen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Door dit formulier in te dienen gaat u akkoord met onze{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          algemene voorwaarden
                        </Link>{" "}
                        en{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          privacybeleid
                        </Link>
                        .
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Vragen over partnerschap?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ons team staat klaar om al je vragen te beantwoorden en je te helpen bij het aansluitingsproces.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-medium mb-2">E-mail</h3>
                    <p className="text-muted-foreground mb-4">Voor algemene vragen over partnerschap</p>
                    <a href="mailto:partners@odiyoo.be" className="text-primary hover:underline font-medium">
                      partners@odiyoo.be
                    </a>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Telefoon</h3>
                    <p className="text-muted-foreground mb-4">Voor directe vragen en ondersteuning</p>
                    <a href={`tel:${CUSTOMER_SUPPORT_PHONE}`} className="text-primary hover:underline font-medium">
                      {CUSTOMER_SUPPORT_PHONE}
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}
