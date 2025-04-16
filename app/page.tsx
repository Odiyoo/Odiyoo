"use client"

import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Home,
  Instagram,
  Shield,
  Star,
  Twitter,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const floatingAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .float-animation-1 {
    animation: float 3s ease-in-out infinite;
  }
  
  .float-animation-2 {
    animation: float 4s ease-in-out infinite;
  }
`

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>
        {floatingAnimation}
      </style>
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Functies
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Hoe het werkt
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Getuigenissen
            </Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/quote" className="hidden md:block">
              <Button>Directe Offerte</Button>
            </Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Inloggen
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Earthy Green Element */}
        <div className="bg-[#4a6741] text-white py-3">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Duurzame dakoplossingen voor een groenere toekomst</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
                <b>10.000+</b>&nbsp;tevreden klanten 🇧🇪
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Ontvang meteen je <span className="italic px-1 bg-[#4a6741] text-white">dakofferte</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Offertes ontvangen hoeft niet moeilijk te zijn. Krijg een nauwkeurige dakofferte in minuten, niet in
                dagen.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link href="/quote">
                  <Button size="lg" className="w-full sm:w-auto">
                    Krijg nu je offerte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Ontdek hoe het werkt
                  </Button>
                </Link>
              </div>

              {/* Platform Pros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-3 float-animation-1">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Kiezen uit meerdere aannemers</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vergelijk offertes en kies de beste aannemer voor jouw project
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-3 float-animation-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Binnen 5 minuten een offerte</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Geen wachttijden meer, direct weten waar je aan toe bent
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">Gecontroleerde vakmannen</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Alle aannemers zijn gecontroleerd op kwaliteit en betrouwbaarheid
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Wat Odiyoo voor jou kan doen</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Wij maken het krijgen van een dakofferte eenvoudig, snel en nauwkeurig.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Directe Offertes</h3>
                <p className="text-muted-foreground">
                  Krijg je dakofferte in minuten, niet in dagen. Geen wachttijd meer voor terugbelverzoeken.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Nauwkeurige Prijzen</h3>
                <p className="text-muted-foreground">
                  Ons geavanceerde algoritme biedt nauwkeurige offertes op basis van jouw specifieke wensen.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Geen kennis vereist</h3>
                <p className="text-muted-foreground">
                  Wij helpen jou kiezen, zonder dat je zelf enige kennis over daken nodig hebt. Vergelijk offertes,
                  ontdek de beste opties en maak moeiteloos de juiste beslissing!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Hoe het werkt</h2>
              <p className="mt-4 text-lg text-muted-foreground">Krijg je dakofferte in drie eenvoudige stappen</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 relative">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white relative z-10">
                  1
                </div>
                <h3 className="mb-2 text-xl font-bold">Voer je adres in</h3>
                <p className="text-muted-foreground">We gebruiken satellietbeelden om je dak nauwkeurig op te meten.</p>
              </div>

              {/* Pijl tussen stap 1 en 2 */}
              <div className="hidden md:flex absolute left-1/3 top-6 w-1/3 items-center justify-center z-0">
                <ArrowRight className="h-8 w-8 text-primary/60" />
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white relative z-10">
                  2
                </div>
                <h3 className="mb-2 text-xl font-bold">Selecteer materialen</h3>
                <p className="text-muted-foreground">Kies uit verschillende dakmaterialen en opties.</p>
              </div>

              {/* Pijl tussen stap 2 en 3 */}
              <div className="hidden md:flex absolute left-2/3 top-6 w-1/3 items-center justify-center z-0">
                <ArrowRight className="h-8 w-8 text-primary/60" />
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white relative z-10">
                  3
                </div>
                <h3 className="mb-2 text-xl font-bold">Ontvang je offerte</h3>
                <p className="text-muted-foreground">Ontvang meteen nauwkeurige offertes van meerdere aannemers.</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="/quote">
                <Button size="lg">
                  Begin nu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Wat onze klanten zeggen</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Neem niet alleen ons woord aan. Dit is wat onze klanten te zeggen hebben.
              </p>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative max-w-4xl mx-auto px-8">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out">
                  {/* Testimonial 1 */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                          <img
                            src="/placeholder.svg?height=48&width=48"
                            alt="Klant"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Sarah Jansen</h4>
                          <p className="text-sm text-muted-foreground">Huiseigenaar</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        "Ik was verbaasd over hoe snel ik mijn offerte kreeg. De prijs was concurrerend en het werk werd
                        op tijd afgerond. Sterk aanbevolen!"
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Twitter className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                          <img
                            src="/placeholder.svg?height=48&width=48"
                            alt="Klant"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Michael de Vries</h4>
                          <p className="text-sm text-muted-foreground">Vastgoedbeheerder</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        "Als vastgoedbeheerder heb ik snel betrouwbare offertes nodig. Odiyoo heeft me talloze uren
                        heen-en-weer communicatie met aannemers bespaard."
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Instagram className="h-5 w-5 text-pink-600" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                          <img
                            src="/placeholder.svg?height=48&width=48"
                            alt="Klant"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Jennifer Bakker</h4>
                          <p className="text-sm text-muted-foreground">Huiseigenaar</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <p className="text-muted-foreground">
                        "De offerte kwam precies overeen met wat ik uiteindelijk betaalde. Geen verrassingen of
                        verborgen kosten. Het proces was transparant van begin tot eind."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100">
                <ChevronLeft className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Vorige</span>
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100">
                <ChevronRight className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Volgende</span>
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                <button className="h-2 w-8 rounded-full bg-primary" aria-current="true"></button>
                <button className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400"></button>
                <button className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-400"></button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-white relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://customer.powrcdn.com/6Rdoez/src-res/gx6_UZkI1mHJqURJWJk-s.webp"
              alt="Dak achtergrond"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Klaar om te beginnen?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Krijg vandaag nog je directe dakofferte en zet de eerste stap naar je nieuwe dak.
            </p>
            <div className="mt-8">
              <Link href="/quote">
                <Button size="lg" variant="secondary">
                  Ontvang je gratis offerte
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Company Banner */}
      <div className="bg-gray-100 py-4">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Odiyoo</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Dakoffertes eenvoudig, snel en nauwkeurig maken.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">We komen graag met je in contact</h3>
              <ul className="space-y-2">
                <li className="font-medium">Odiyoo N.V.</li>
                <li>BTW: BE 0123 456 789</li>
                <li>Email: info@odiyoo.nl</li>
                <li>Telefoon: (020) 123-4567</li>
                <li className="mt-4">
                  <span className="font-medium block">Openingstijden:</span>
                  <span className="block">Maandag - Vrijdag: 07.30 - 17.00</span>
                  <span className="block">Zaterdag: 08.00 - 12.30</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Over ons</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/over-ons" className="hover:text-white">
                    Ons team
                  </Link>
                </li>
                <li>
                  <Link href="/advies" className="hover:text-white">
                    Advies
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Algemene voorwaarden
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacybeleid
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Klantenservice</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/over-ons" className="hover:text-white">
                    Over ons
                  </Link>
                </li>
                <li>
                  <Link href="/advies" className="hover:text-white">
                    Advies
                  </Link>
                </li>
                <li>
                  <Link href="/klantenservice" className="hover:text-white">
                    Klantenservice
                  </Link>
                </li>
                <li>
                  <Link href="/kennisbank" className="hover:text-white">
                    Kennisbank
                  </Link>
                </li>
                <li>
                  <Link href="/vakantie-openingstijden" className="hover:text-white">
                    Vakantie openingstijden
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Odiyoo. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
