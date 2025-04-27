"use client"

import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  CheckSquare2,
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
import Navbar from "@/components/navbar"
import { Separator } from "@/components/ui/separator"
import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import { BeforeAfterSlider } from "@/components/before-after-slider"

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
function VideoComponent({ url, isMuted, height, ...props }: { url: string, isMuted?: boolean, height?: number }) {

  return (
    <video preload="none" aria-label="Video player" muted={isMuted} style={{ height: height}} {...props}>
      <source src={url} type="video/mp4" />
      Your browser does not suppor the video tag.
    </video>
  )
}

export default function LandingPage() {

  const [activeTestimonial, setActiveTestimonial] = useState<number>(1);

  const goPreviousTestimonial = () => {
    setActiveTestimonial((num) => {
      if (num === 1) {
        return 3
      } else {
        return num-1
      }
    })
  }
  const goNextTestimonial = () => {
    setActiveTestimonial((num) => {
      if (num === 3) {
        return 1
      } else {
        return num+1
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>
        {floatingAnimation}
      </style>
      <Navbar />

      <main className="flex-1">
        {/* Earthy Green Element */}
        <div className="bg-[#4a6741] text-white py-3">
          <div className="container">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center transform animate-bounce">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Duurzame dakoplossingen | Gratis dakinspectie | Instant Offerte</span>
              </div>
            </div>
          </div>
        </div>
        {/* Hero Section - Brand Trust */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 pb-2">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
                <Link href="#getuigenissen">
                  <b>400+</b>&nbsp;tevreden klanten 🇧🇪
                </Link>
              </div>
              <p className="text-xl text-odiyoo uppercase">Professionele Dak- en Gevelreiniging</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Uw dak, onze <span className="italic px-1 bg-odiyoo text-white">Expertise</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Welkom bij Odiyoo! Wij zorgen voor hoogwaardige dak- en gevelreiniging, terrasreiniging en meer, waar u ook woont in België.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link href="/quote">
                  <Button size="lg" variant="odiyoo_gradient" className="w-full sm:w-auto">
                    Offerte aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/onze-realisaties">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Onze realisaties
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 border-t border-gray-200">
              <div className="flex flex-col justify-center">
                <p className="text-lg text-odiyoo uppercase">Leuven</p>
                <p className="text-lg text-odiyoo font-bold">Margriet V.</p>
                <p className="my-4">“Wij zijn zeer tevreden met het werk dat Odiyoo aan ons huis heeft uitgevoerd. Uw team was beleefd en vriendelijk en al het afval werd dagelijks afgevoerd. Wij raden u ten zeerste aan vanwege de uitstekende service en de goede prijs-kwaliteitverhouding.”</p>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Link href="#getuigenissen">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto mt-6 border-odiyoo">
                    Ervaringen van onze klanten
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div>
                <BeforeAfterSlider image1="https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/margriet_before_1500px.webp" image2="https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/margriet_after_1500px.webp" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="flex justify-center">
            <Suspense fallback={<p>Loading video...</p>}>
              <VideoComponent url="https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/Wiezijnwij.mp4" isMuted autoPlay loop/>
            </Suspense>
          </div>
          <div>
            <p className="text-lg text-black font-bold uppercase">Meer dan 10 Jaar Ervaring in Reinigingsdiensten</p>
            <p className="text-lg text-odiyoo font-bold">Wie Zijn Wij?</p>
            <Separator className="w-40 h-1 bg-odiyoo my-4" />
            <p>
              Al meer dan een decennium helpt <span className="text-odiyoo font-bold">ODIYOO</span> klanten bij het behouden van een schone en veilige leefomgeving. Ons team van ervaren professionals staat bekend om toewijding, precisie en oog voor detail. Dankzij innovatieve technieken zorgen wij niet alleen voor een grondige reiniging, maar <span className="underline decoration-odiyoo decoration-2">verlengen we ook de levensduur van uw eigendommen</span>.
            </p>
            <p className="mt-4">
              Ontdek hoe <span className="text-odiyoo font-bold">ODIYOO</span> <span className="underline decoration-odiyoo decoration-2">uw betrouwbare partner</span> kan zijn voor een frisse, gezonde en duurzame omgeving.
            </p>
            <p className="mt-4">
              <span className="text-odiyoo font-bold">ODIYOO</span> staat voor kwaliteit, betrouwbaarheid en resultaatgerichtheid.
            </p>
            <p>{Array(5).map(() => <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />)}</p>
            <Link href="/quote">
              <Button size="lg" variant="odiyoo_gradient" className="w-full sm:w-auto mt-6 border-odiyoo">
                Offerte aanvragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        {/* Hero Section - Value Offer */}
        <section className="bg-gray-200 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="md:inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
                <b>Gratis</b>&nbsp;gegenereerde offertes van meerdere aannemers 🇧🇪
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Ontvang meteen je
              </h1>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="italic px-1 bg-odiyoo text-white">dakofferte</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Offertes ontvangen hoeft niet moeilijk te zijn. Krijg een nauwkeurige dakofferte in minuten, niet in
                dagen.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link href="/quote">
                  <Button size="lg" variant="odiyoo_gradient" className="w-full sm:w-auto">
                    Offerte aanvragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#hoe-het-werkt">
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
                  <div className="rounded-full bg-primary/10 p-3 mb-3 float-animation-1">
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

        {/* How it works */}
        <section className="p-20 px-5 md:px-20" id="hoe-het-werkt">
          <h1 className="text-lg text-odiyoo font-bold">Hoe werkt het?</h1>
          <Separator className="w-20 h-1 my-4" />
          <div className="flex flex-row justify-between items-start overflow-x-scroll gap-8">
            <div className="flex gap-4 flex-col justify-center w-40">
              <img src="https://odiyoo.com/cdn/shop/files/49.png?v=1738246105&width=535" alt="Telefoon" className="h-24 w-24" />
              <h3 className="text-md text-odiyoo font-bold">Stap 1 &gt; Offerteaanvraag</h3>
              <p className="text-wrap">U maakt gebruik van onze instant offerte tool en ontvangt op basis van uw wensen en gegevens een vrijwel nauwkeurige offerte.</p>
            </div>
            <div className="flex gap-4 flex-col justify-center w-40">
              <img src="https://odiyoo.com/cdn/shop/files/50.png?v=1738246106&width=535" alt="Vergrootglas" className="h-24 w-24" />
              <h3 className="text-md text-odiyoo font-bold">Stap 2 &gt; Inspectie & Advies</h3>
              <p className="text-wrap">We bezoeken de locatie, beoordelen de situatie en adviseren over de beste reinigingsmethode.</p>
            </div>
            <div className="flex gap-4 flex-col justify-center w-40">
              <img src="https://odiyoo.com/cdn/shop/files/51.png?v=1738246106&width=535" alt="Vergrootglas" className="h-24 w-24" />
              <h3 className="text-md text-odiyoo font-bold">Stap 3 &gt; Offerte & Planning</h3>
              <p className="text-wrap">U ontvangt een definitieve offerte; bij akkoord plannen we de werkzaamheden in.</p>
            </div>
            <div className="flex gap-4 flex-col justify-center w-40">
              <img src="https://odiyoo.com/cdn/shop/files/52.png?v=1738246106&width=535" alt="Vergrootglas" className="h-24 w-24" />
              <h3 className="text-md text-odiyoo font-bold">Stap 4 &gt; Reiniging & Uitvoering</h3>
              <p className="text-wrap">Ons team voert de reiniging zorgvuldig uit met professionele technieken en materialen.</p>
            </div>
            <div className="flex gap-4 flex-col justify-center w-40">
              <img src="https://odiyoo.com/cdn/shop/files/53.png?v=1738246104&width=535" alt="Vergrootglas" className="h-24 w-24" />
              <h3 className="text-md text-odiyoo font-bold">Stap 5 &gt; Oplevering & Controle</h3>
              <p className="text-wrap">Na afloop controleren we het resultaat en lopen we alles samen met u na.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 pt-10">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Wat <span className="text-odiyoo">Odiyoo</span> voor jou kan doen</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Wij maken het krijgen van een dakofferte eenvoudig, snel en nauwkeurig.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full border border-odiyoo p-3 w-fit">
                  <Clock className="h-6 w-6 text-odiyoo" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Directe Offertes</h3>
                <p className="text-muted-foreground">
                  Krijg je dakofferte in minuten, niet in dagen. Geen wachttijd meer voor terugbelverzoeken.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full border border-odiyoo p-3 w-fit">
                  <Calculator className="h-6 w-6 text-odiyoo" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Uiteenlopende reinigingsdiensten</h3>
                <p className="text-muted-foreground">
                  Van dak- en gevelonderhoud tot terras- en opritreiniging, altijd met nadruk op kwaliteit en klanttevredenheid.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 rounded-full border border-odiyoo p-3 w-fit">
                  <Home className="h-6 w-6 text-odiyoo" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Duurzame resultaten</h3>
                <p className="text-muted-foreground">
                  Dankzij onze moderne technieken en ervaren vakmensen leveren we een frisse en verzorgde omgeving.
                </p>
              </div>
            </div>
            <div className="pt-20 flex flex-col justify-evenly gap-4 md:gap-0 md:flex-row">
              <div>
                <div className="flex flex-row gap-2">
                  <CheckSquare2 className="text-odiyoo" />
                  <h1 className="text-odiyoo"> Milieubewuste Oplossingen</h1>
                </div>
                <p>Wij kiezen voor groene producten en methoden.</p>
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <CheckSquare2 className="text-odiyoo" />
                  <h1 className="text-odiyoo"> Uitmuntende Klantgerichtheid</h1>
                </div>
                <p>Uw wens staat altijd centraal.</p>
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <CheckSquare2 className="text-odiyoo" />
                  <h1 className="text-odiyoo"> State-of-the-art Reinigingssystemen</h1>
                </div>
                <p>Efficiënt en grondig voor het beste resultaat.</p>
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <CheckSquare2 className="text-odiyoo" />
                  <h1 className="text-odiyoo"> Voorkomen is Beter dan Genezen</h1>
                </div>
                <p>Regelmatig onderhoud voor langdurige kwaliteit.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Actief in heel Belgie Section */}
        <section className="container bg-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
          <div>
            <p className="text-lg text-black font-bold uppercase">Actief in heel België</p>
            <p className="text-lg text-odiyoo font-bold">Van Antwerpen tot Luxemburg & West-Vlaanderen tot Limburg</p>
            <Separator className="w-40 h-1 bg-odiyoo my-4" />
            <p>
              <span className="text-odiyoo font-bold">ODIYOO</span> is trots actief in heel België. Onze lokale kennis en <b>snelle responstijden</b> zorgen ervoor dat we de <span className="underline decoration-odiyoo decoration-2">unieke schoonmaakbehoeften</span> van elk gebied perfect begrijpen en aanpakken. Met een klantgerichte aanpak en professionele uitvoering garanderen wij een hoogwaardige service, waar u ook gevestigd bent.
            </p>
            <p className="mt-4">
              Neem vandaag nog contact met ons op en ontdek hoe we uw pand kunnen transformeren met onze grondige reinigingsdiensten.
            </p>
            <p>{Array(5).map(() => <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />)}</p>
            <Link href="/quote">
              <Button size="lg" variant="odiyoo_gradient" className="w-full sm:w-auto mt-6 border-odiyoo">
                Offerte aanvragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex justify-center md:block">
            <Image
              src="https://odiyoo.com/cdn/shop/files/Kopie_van_Logo_banner_mail_1200_x_628_px_1_f4af9cde-5f87-49af-a587-d3abdee31d10.png?v=1738311337&width=535"
              width={500}
              height={500}
              alt="Afbeelding van België"
            />
          </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="getuigenissen" className="py-20 bg-gray-200">
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
                <div className="flex">
                  {/* Testimonial 1 */}
                  <div className={`w-full flex-shrink-0 px-4 transition duration-300 ease-in-out ${activeTestimonial == 1 ? 'opacity-100 visible' : 'opacity-0 hidden'}`}>
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div>
                          <h4 className="font-bold">Sofie De Smet</h4>
                          <p className="text-sm text-muted-foreground">Huiseigenaar - Antwerpen</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground transition-transform duration-300 ease-in-out">
                      “Ik schrijf om te laten weten dat we zeer tevreden zijn met het werk aan ons dak. Het team van Odiyoo heeft werk geleverd volgens de hoogste normen en geeft ons gemoedsrust nu ons huis volledig is gerestaureerd. En het ziet er ook geweldig uit. Dank je wel!”
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className={`w-full flex-shrink-0 px-4 transition duration-300 ease-in-out ${activeTestimonial == 2 ? 'opacity-100 visible' : 'opacity-0 hidden'}`}>
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Twitter className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div>
                          <h4 className="font-bold">Tom Peeters</h4>
                          <p className="text-sm text-muted-foreground">Huiseigenaar - Gent</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        “Gewoon even laten weten dat we heel blij zijn met het werk dat aan ons dak is uitgevoerd – het ziet er absoluut fantastisch uit. De medewerkers waren erg behulpzaam en hebben alles netjes achtergelaten. We zouden Odiyoo graag aanbevelen.”
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className={`w-full flex-shrink-0 px-4 transition duration-300 ease-in-out ${activeTestimonial == 3 ? 'opacity-100 visible' : 'opacity-0 hidden'}`}>
                    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                      <div className="absolute top-6 right-6">
                        <Instagram className="h-5 w-5 text-pink-600" />
                      </div>
                      <div className="mb-4 flex items-center">
                        <div>
                          <h4 className="font-bold">Margriet Verelst</h4>
                          <p className="text-sm text-muted-foreground">Huiseigenaar - Leuven</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <p className="text-muted-foreground">
                        “Wij zijn zeer tevreden met het werk dat Odiyoo aan ons huis heeft uitgevoerd. Uw team was beleefd en vriendelijk en al het afval werd dagelijks afgevoerd. Wij raden u ten zeerste aan vanwege de uitstekende service en de goede prijs-kwaliteitverhouding.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button onClick={goPreviousTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100">
                <ChevronLeft className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Vorige</span>
              </button>
              <button onClick={goNextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100">
                <ChevronRight className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Volgende</span>
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                <button className={`h-2 rounded-full transition ease-in ${activeTestimonial === 1 ? "w-8 bg-odiyoo" : "w-2 bg-gray-300 hover:bg-gray-400"}`} aria-current={activeTestimonial === 1}></button>
                <button className={`h-2 rounded-full transition ease-in ${activeTestimonial === 2 ? "w-8 bg-odiyoo" : "w-2 bg-gray-300 hover:bg-gray-400"}`} aria-current={activeTestimonial === 2}></button>
                <button className={`h-2 rounded-full transition ease-in ${activeTestimonial === 3 ? "w-8 bg-odiyoo" : "w-2 bg-gray-300 hover:bg-gray-400"}`} aria-current={activeTestimonial === 3}></button>
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

      {/* Company Key Features */}
      <section className="bg-gray-100 grid grid-cols-3 gap-4 justify-evenly items-start py-10 px-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://odiyoo.com/cdn/shop/files/1_51c0d3ff-4670-4338-95df-ef59e2ca04ca.png?v=1738305706&width=535"
            width={80}
            height={80}
            alt="Support afbeelding"
          />
          <h1 className="text-odiyoo text-lg font-bold my-2 text-center">7/7 klantenservice</h1>
          <p className="text-md hidden md:block">Altijd bereikbaar, elke dag van de week</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://odiyoo.com/cdn/shop/files/2_1b58440c-a952-4169-830b-1cbeef818b30.png?v=1738305706&width=535"
            width={80}
            height={80}
            alt="Support afbeelding"
          />
          <h1 className="text-odiyoo text-lg font-bold my-2 text-center">95% tevreden klanten</h1>
          <p className="text-md hidden md:block">Uitstekende klanttevredenheid</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://odiyoo.com/cdn/shop/files/4_33a4d3a4-88ad-473b-bfc0-dd9346b8f309.png?v=1738305706&width=535"
            width={80}
            height={80}
            alt="Support afbeelding"
          />
          <h1 className="text-odiyoo text-lg font-bold my-2 text-center">Garantie op werk</h1>
          <p className="text-md hidden md:block">Kwaliteit verzekerd</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
