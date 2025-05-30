"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Euro,
  Home,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
  CheckCircle,
  Award,
  Camera,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Lightbox } from "@/components/lightbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProjectShowcasePage({ id }: {id: any}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Project data
  const project = {
    title: "Complete Dakrenovatie Villa Antwerpen",
    location: "Antwerpen, Wilrijk",
    service: "dakrenovatie",
    roofType: "Natuurleien",
    totalPrice: 28500,
    rating: 5.0,
    completionDate: "Oktober 2024",
    duration: "8 dagen",
    contractor: "Elite Dakexperts",
    contractorRating: 4.9,
    size: "185 m²",
    customer: "Familie Van Der Berg",

    // Main project images
    images: [
      "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
      "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
      "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      "https://customer.powrcdn.com/6Rdoez/src-res/gx6_UZkI1mHJqURJWJk-s.webp",
      "https://andrecelis.be/media/wysiwyg/AC/algemeen/Andre-Celis-Isolatie-04.jpg",
    ],

    // Before/after images
    beforeAfter: {
      before: [
        "https://customer.powrcdn.com/6Rdoez/src-res/gx6_UZkI1mHJqURJWJk-s.webp",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
      ],
      after: [
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      ],
    },

    // Work performed
    workPerformed: {
      dakbedekking: {
        title: "Dakbedekking - Natuurleien",
        description: "Volledige vervanging van oude dakpannen naar premium natuurleien",
        details: [
          "Verwijdering oude dakbedekking",
          "Installatie nieuwe daklatten en onderlaag",
          "Plaatsing van 185 m² natuurleien",
          "Afwerking nokken en randen",
        ],
        cost: 15800,
      },
      isolatie: {
        title: "Dakisolatie - PIR Platen",
        description: "Hoogwaardige dakisolatie voor optimale energie-efficiëntie",
        details: [
          "PIR isolatieplaten 12cm dik",
          "Dampscherm en windscherm",
          "Luchtdichte afwerking",
          "R-waarde 5.4 m²K/W",
        ],
        cost: 4200,
      },
      dakgoten: {
        title: "Dakgoten - Aluminium",
        description: "Nieuwe dakgoten en regenpijpen in antraciet aluminium",
        details: [
          "Verwijdering oude dakgoten",
          "Installatie aluminium goten Ø150mm",
          "Regenpijpen Ø100mm",
          "Bladvangers en beschermroosters",
        ],
        cost: 2800,
      },
      dakraam: {
        title: "Dakramen - VELUX",
        description: "2 nieuwe VELUX dakramen voor extra natuurlijk licht",
        details: [
          "2x VELUX GGL MK08 78x140cm",
          "Drievoudig glas HR+++",
          "Elektrische bediening",
          "Binnenafwerking en gordijnen",
        ],
        cost: 3200,
      },
      extras: {
        zonnepanelen: {
          title: "Zonnepanelen - 16 panelen",
          description: "Hoogrendement zonnepanelen voor duurzame energie",
          details: [
            "16x 400W monokristallijne panelen",
            "SolarEdge omvormer en optimizers",
            "Monitoring systeem",
            "25 jaar garantie",
          ],
          cost: 8500,
        },
        gevelbekleding: {
          title: "Gevelbekleding - Fiber Cement",
          description: "Moderne gevelbekleding voor frisse uitstraling",
          details: [
            "Cedral Click gevelbekleding",
            "Kleur: Antraciet C05",
            "Isolatie en windscherm",
            "Hoek- en aansluitprofielen",
          ],
          cost: 6200,
        },
      },
    },

    testimonial: {
      text: "We zijn ontzettend tevreden met het resultaat! Het team van Elite Dakexperts heeft fantastisch werk geleverd. Ons huis ziet er niet alleen prachtig uit, maar we merken ook al een groot verschil in ons energieverbruik. De communicatie was uitstekend en alles werd netjes opgeruimd. Absolute aanrader!",
      author: "Familie Van Der Berg",
      rating: 5,
    },
  }

  // Open lightbox
  const openLightbox = (images, index) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Navigate main images
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={project.images[currentImageIndex] || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container text-center text-white">
              <div className="max-w-4xl mx-auto">
                <Badge className="mb-4 bg-primary/20 text-white border-white/20">
                  <Award className="h-4 w-4 mr-2" />
                  Voltooid Project
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                    {project.rating} sterren
                  </div>
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 mr-2" />€{project.totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Gallery Button */}
          <button
            onClick={() => openLightbox(project.images, 0)}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-colors z-10 flex items-center"
          >
            <Camera className="h-5 w-5 mr-2" />
            Bekijk alle foto's ({project.images.length})
          </button>
        </section>

        {/* Project Overview */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Details */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Projectdetails</h2>
                  <p className="text-lg text-muted-foreground">
                    Een complete dakrenovatie van een prachtige villa in Antwerpen. Dit project omvatte niet alleen de
                    vervanging van de dakbedekking, maar ook isolatie, nieuwe dakgoten, dakramen en extra's zoals
                    zonnepanelen en gevelbekleding voor een volledig vernieuwde uitstraling.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">{project.size}</p>
                      <p className="text-sm text-muted-foreground">Dakoppervlak</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">{project.duration}</p>
                      <p className="text-sm text-muted-foreground">Uitvoering</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">{project.completionDate}</p>
                      <p className="text-sm text-muted-foreground">Voltooid</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">25 jaar</p>
                      <p className="text-sm text-muted-foreground">Garantie</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contractor Info */}
              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-6 w-6 mr-2 text-primary" />
                      Uitgevoerd door
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 mr-3">
                        <img
                          src="https://i0.wp.com/dakwerkenmarienjoris.be/wp-content/uploads/2021/07/roof-1.png?w=840&ssl=1"
                          alt={project.contractor}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{project.contractor}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{project.contractorRating} / 5</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">Actief in {project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">Faillissementsbescherming</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">20+ jaar ervaring</span>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/quote">
                        Vraag ook een offerte aan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Work Performed */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Uitgevoerde werkzaamheden</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Een overzicht van alle werkzaamheden die zijn uitgevoerd tijdens deze complete dakrenovatie.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Dakbedekking */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <Home className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{project.workPerformed.dakbedekking.title}</h3>
                          <p className="text-primary font-medium">
                            €{project.workPerformed.dakbedekking.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.workPerformed.dakbedekking.description}</p>
                      <ul className="space-y-2">
                        {project.workPerformed.dakbedekking.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative h-64 md:h-auto">
                      <img
                        src="https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/n/a/natuurleien_2.jpg"
                        alt="Dakbedekking"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Isolatie */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto order-2 md:order-1">
                      <img
                        src="https://andrecelis.be/media/wysiwyg/AC/algemeen/Andre-Celis-Isolatie-04.jpg"
                        alt="Dakisolatie"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 order-1 md:order-2">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{project.workPerformed.isolatie.title}</h3>
                          <p className="text-primary font-medium">
                            €{project.workPerformed.isolatie.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.workPerformed.isolatie.description}</p>
                      <ul className="space-y-2">
                        {project.workPerformed.isolatie.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dakgoten */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{project.workPerformed.dakgoten.title}</h3>
                          <p className="text-primary font-medium">
                            €{project.workPerformed.dakgoten.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.workPerformed.dakgoten.description}</p>
                      <ul className="space-y-2">
                        {project.workPerformed.dakgoten.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative h-64 md:h-auto">
                      <img
                        src="https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/o/v/ovation.jpg"
                        alt="Dakgoten"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dakraam */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto order-2 md:order-1">
                      <img
                        src="https://i0.wp.com/dakraamkopen.be/wp-content/uploads/2021/04/VELUX-GGLS-2in1-Asymmetrisch.jpg?fit=1280%2C888&ssl=1"
                        alt="Dakramen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 order-1 md:order-2">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{project.workPerformed.dakraam.title}</h3>
                          <p className="text-primary font-medium">
                            €{project.workPerformed.dakraam.cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.workPerformed.dakraam.description}</p>
                      <ul className="space-y-2">
                        {project.workPerformed.dakraam.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Extra's */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Extra's voor complete renovatie</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Zonnepanelen */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img
                        src="https://zonneplan-site.s3.amazonaws.com/uploads/2023/06/zonnepanelen-die-warmte-tegenhouden-2.png"
                        alt="Zonnepanelen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold">{project.workPerformed.extras.zonnepanelen.title}</h4>
                        <Badge variant="secondary">
                          €{project.workPerformed.extras.zonnepanelen.cost.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {project.workPerformed.extras.zonnepanelen.description}
                      </p>
                      <ul className="space-y-1">
                        {project.workPerformed.extras.zonnepanelen.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Gevelbekleding */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img
                        src="https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg"
                        alt="Gevelbekleding"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold">{project.workPerformed.extras.gevelbekleding.title}</h4>
                        <Badge variant="secondary">
                          €{project.workPerformed.extras.gevelbekleding.cost.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {project.workPerformed.extras.gevelbekleding.description}
                      </p>
                      <ul className="space-y-1">
                        {project.workPerformed.extras.gevelbekleding.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Voor & Na</h2>
              <p className="text-lg text-muted-foreground">
                Zie het dramatische verschil dat een complete dakrenovatie kan maken.
              </p>
            </div>

            <Tabs defaultValue="before" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="before" className="text-lg">
                  Voor renovatie
                </TabsTrigger>
                <TabsTrigger value="after" className="text-lg">
                  Na renovatie
                </TabsTrigger>
              </TabsList>
              <TabsContent value="before">
                <div className="grid md:grid-cols-2 gap-4">
                  {project.beforeAfter.before.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Voor renovatie ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(project.beforeAfter.before, index)}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="after">
                <div className="grid md:grid-cols-2 gap-4">
                  {project.beforeAfter.after.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Na renovatie ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(project.beforeAfter.after, index)}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Customer Testimonial */}
        <section className="py-12 bg-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
                  "{project.testimonial.text}"
                </blockquote>
                <cite className="text-lg font-medium text-primary">— {project.testimonial.author}</cite>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wil jij ook zo'n prachtig resultaat?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Krijg binnen 5 minuten een nauwkeurige offerte voor jouw project. Vergelijk prijzen van meerdere
              gecertificeerde offertes en kies de beste optie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/quote">
                  Vraag nu je offerte aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Bekijk meer projecten
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-75">
              ✓ Gratis en vrijblijvend ✓ Binnen 5 minuten klaar ✓ Vergelijk meerdere offertes
            </p>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer/>
    </div>
  )
}
