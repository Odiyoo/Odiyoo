"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Home,
  Shield,
  Star,
  Store,
  SortAsc,
  Award,
  Clock,
  MapPin,
} from "lucide-react"
import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbox } from "@/components/lightbox"
import { Confetti } from "@/components/confetti"

export default function QuotePage() {
  // Update the state to include selectedContractor, expandedContractor, and extras
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    address: "",
    roofSize: "150",
    roofType: "dakpannen", // Changed default to dakpannen
    roofColor: "antraciet", // Added for roof color
    additionalServices: [],
    selectedContractor: null,
    extras: {
      insulation: false,
      gutters: false,
      solarPanels: false,
      skylights: false, // Added for dakramen
      facadeCladding: false, // Added for gevelbekleding
    },
    email: "",
  })
  const [quoteGenerated, setQuoteGenerated] = useState(false)
  const [quoteData, setQuoteData] = useState({
    basePrice: 0,
    materialCost: 0,
    laborCost: 0,
    additionalCosts: 0,
    extrasCost: 0,
    totalPrice: 0,
    estimatedDuration: "",
    contractor: "",
  })
  const [expandedContractor, setExpandedContractor] = useState(null)
  const [contractorQuotes, setContractorQuotes] = useState({})
  const [expandedSection, setExpandedSection] = useState("address")
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [sortOption, setSortOption] = useState("price-low")

  const addressInputRef = useRef(null)

  // Function to check if a step is accessible
  const canAccessStep = (stepNumber) => {
    if (stepNumber === 1) return true
    if (stepNumber === 2) return formData.address
    if (stepNumber === 3) return formData.roofSize && formData.roofType
    if (stepNumber === 4) return Object.keys(contractorQuotes).length > 0
    return false
  }

  // Function to navigate to a specific step
  const goToStep = (stepNumber) => {
    if (canAccessStep(stepNumber)) {
      setStep(stepNumber)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "address" && value.length > 3) {
      // Simulate address autocomplete
      const mockAddresses = [
        { address: `${value} 1`, city: "Amsterdam", state: "NH", zip: "1011 AB" },
        { address: `${value} 2`, city: "Rotterdam", state: "ZH", zip: "3011 CD" },
        { address: `${value} 3`, city: "Utrecht", state: "UT", zip: "3511 EF" },
        { address: `${value} 4`, city: "Den Haag", state: "ZH", zip: "2511 GH" },
      ]
      setAddressSuggestions(mockAddresses)
      setShowAddressSuggestions(true)
    } else if (name === "address" && value.length <= 3) {
      setShowAddressSuggestions(false)
    }
  }

  const handleAddressSelect = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: suggestion.address,
    }))
    setShowAddressSuggestions(false)
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExtrasChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [name]: checked,
      },
    }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Add contractors data with additional fields
  const contractors = [
    {
      id: 1,
      name: "Premium Dakwerken",
      city: "Amsterdam",
      isProtectedAgainstBankruptcy: true,
      hasShowroom: true,
      showroomAddress: "Industrieweg 45, Amsterdam",
      warranty: "20 jaar op materiaal, 10 jaar op arbeid",
      availability: "Binnen 3 weken",
      rating: 4.8,
      experience: "15+ jaar",
      description: "Gespecialiseerd in hoogwaardige installaties met premium materialen.",
      image:
        "https://img.freepik.com/premium-vector/buildstrong-logo-design-met-een-hamer-en-een-dak-voor-bouw-en-huisreparatie_579306-40844.jpg",
      priceModifiers: {
        dakpannen: 1.1,
        leien: 1.15,
      },
      laborRate: 1.2, // 20% higher labor rate
      reviews: [
        { author: "Jan de Vries", rating: 5, text: "Uitstekend werk geleverd, zeer professioneel team." },
        { author: "Marieke Jansen", rating: 5, text: "Perfecte afwerking en binnen de afgesproken tijd." },
        { author: "Peter Bakker", rating: 4, text: "Goede kwaliteit, iets duurder maar het waard." },
      ],
      projectImages: [
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      ],
      label: "Most experience",
    },
    {
      id: 2,
      name: "Budget Dakoplossingen",
      city: "Rotterdam",
      isProtectedAgainstBankruptcy: false,
      hasShowroom: false,
      showroomAddress: "",
      warranty: "10 jaar op materiaal, 5 jaar op arbeid",
      availability: "Binnen 2 weken",
      rating: 4.2,
      experience: "8+ jaar",
      description: "Betaalbare dakoplossingen zonder in te leveren op kwaliteit.",
      image: "https://adkbouw.be/wp-content/uploads/2023/11/ADK-BOUW-LOGO-REVERSE.png",
      priceModifiers: {
        dakpannen: 0.9,
        leien: 0.95,
      },
      laborRate: 0.9, // 10% lower labor rate
      reviews: [
        { author: "Sandra Visser", rating: 4, text: "Goede prijs-kwaliteitverhouding, aanrader." },
        { author: "Thomas Smit", rating: 5, text: "Snelle service en netjes opgeruimd na afloop." },
        { author: "Linda Meijer", rating: 3, text: "Werk is goed, communicatie kon beter." },
      ],
      projectImages: [
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      ],
      label: "Cheapest",
    },
    {
      id: 3,
      name: "Elite Dakexperts",
      city: "Utrecht",
      isProtectedAgainstBankruptcy: true,
      hasShowroom: true,
      showroomAddress: "Dakstraat 12, Utrecht",
      warranty: "25 jaar op materiaal, 15 jaar op arbeid",
      availability: "Binnen 4-5 weken",
      rating: 4.9,
      experience: "20+ jaar",
      description: "Premium service met toonaangevende garantie en vakmanschap.",
      image: "https://i0.wp.com/dakwerkenmarienjoris.be/wp-content/uploads/2021/07/roof-1.png?w=840&ssl=1",
      priceModifiers: {
        dakpannen: 1.2,
        leien: 1.25,
      },
      laborRate: 1.3, // 30% higher labor rate
      reviews: [
        { author: "Willem Janssen", rating: 5, text: "Absolute topkwaliteit, elk detail perfect afgewerkt." },
        { author: "Emma de Boer", rating: 5, text: "Zeer professioneel en betrouwbaar, uitstekende garantie." },
        { author: "Joost van Dijk", rating: 5, text: "Duurder, maar de kwaliteit en service zijn ongeëvenaard." },
      ],
      projectImages: [
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      ],
    },
    {
      id: 4,
      name: "Standaard Dakdiensten",
      city: "Den Haag",
      isProtectedAgainstBankruptcy: true,
      hasShowroom: false,
      showroomAddress: "",
      warranty: "15 jaar op materiaal, 7 jaar op arbeid",
      availability: "Binnen 1 week",
      rating: 4.5,
      experience: "12+ jaar",
      description: "Betrouwbare, gemiddelde prijzen met consistente kwaliteit en service.",
      image: "https://i0.wp.com/dakwerkenmarienjoris.be/wp-content/uploads/2021/07/roof-1.png?w=840&ssl=1",
      priceModifiers: {
        dakpannen: 1.0,
        leien: 1.0,
      },
      laborRate: 1.0, // standard labor rate
      reviews: [
        { author: "Karin Vermeulen", rating: 4, text: "Goede service, alles volgens afspraak verlopen." },
        { author: "Bas Hendriks", rating: 5, text: "Prettige samenwerking en goed resultaat." },
        { author: "Annemieke Groot", rating: 4, text: "Betrouwbaar bedrijf, geen verrassingen." },
      ],
      projectImages: [
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Header-Website1X-copy-2048x972.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/10/Wouwersdreef-51-57-1855x1233.jpg",
        "https://dakwerkenjanssens.be/wp-content/uploads/2024/02/Kolvenierstraat-Zink-Staande-Naad1-1536x1024.jpg",
      ],
      label: "Snelst beschikbaar",
    },
  ]

  // Function to calculate extras cost
  const calculateExtrasCost = () => {
    let cost = 0
    if (formData.extras.insulation) cost += 2500
    if (formData.extras.gutters) cost += 1200
    if (formData.extras.solarPanels) cost += 5000
    if (formData.extras.skylights) cost += 1800
    if (formData.extras.facadeCladding) cost += 3200
    return cost
  }

  // Function to calculate quote for a specific contractor
  const calculateQuoteForContractor = (contractor) => {
    const basePrice = 5000 + Math.floor(Math.random() * 2000)
    let materialCost = 0

    const materialModifier = contractor.priceModifiers[formData.roofType]
    const laborModifier = contractor.laborRate

    switch (formData.roofType) {
      case "dakpannen":
        materialCost = (2000 + Math.floor(Math.random() * 1000)) * materialModifier
        break
      case "leien":
        materialCost = (8000 + Math.floor(Math.random() * 2000)) * materialModifier
        break
      default:
        materialCost = 2000 * materialModifier
    }

    const laborCost = (3000 + Math.floor(Math.random() * 1500)) * laborModifier
    const additionalCosts = 500 + Math.floor(Math.random() * 500)
    const extrasCost = calculateExtrasCost()
    const totalPrice = basePrice + materialCost + laborCost + additionalCosts + extrasCost

    let estimatedDuration = ""
    if (totalPrice < 10000) {
      estimatedDuration = "2-3 dagen"
    } else if (totalPrice < 20000) {
      estimatedDuration = "4-5 dagen"
    } else {
      estimatedDuration = "7-10 dagen"
    }

    return {
      basePrice,
      materialCost,
      laborCost,
      additionalCosts,
      extrasCost,
      totalPrice,
      estimatedDuration,
    }
  }

  // Calculate quotes for all contractors when moving to step 4
  const calculateAllQuotes = () => {
    const quotes = {}
    contractors.forEach((contractor) => {
      quotes[contractor.id] = calculateQuoteForContractor(contractor)
    })
    setContractorQuotes(quotes)
  }

  // Update the generateQuote function to use the selected contractor's pricing
  const generateQuote = () => {
    const contractor = contractors.find((c) => c.id === formData.selectedContractor)
    const quote = contractorQuotes[formData.selectedContractor]

    setQuoteData({
      ...quote,
      contractor: contractor.name,
    })

    setQuoteGenerated(true)
    nextStep()
  }

  // Update the selectContractor function
  const selectContractor = (contractorId) => {
    setFormData((prev) => ({ ...prev, selectedContractor: contractorId }))
  }

  // Toggle expanded contractor
  const toggleContractorExpand = (contractorId) => {
    if (expandedContractor === contractorId) {
      setExpandedContractor(null)
    } else {
      setExpandedContractor(contractorId)
    }
  }

  // Handle step 1 completion
  const handleStep1Complete = () => {
    calculateAllQuotes()
    nextStep()
  }

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (formData.email) {
      setEmailSubmitted(true)
      setShowConfetti(true)
      // Reset confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    }
  }

  // Open lightbox
  const openLightbox = (images, index) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Material images
  const materialImages = {
    dakpannen: {
      antraciet:
        "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-antraciet-foto.jpg",
      rood: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-rood-foto.jpg",
    },
    leien: {
      natuurleien:
        "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/n/a/natuurleien_2.jpg",
      kunstleien:
        "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/a/l/alterna-donkergrijs_9.jpg",
    },
  }

  // Update the extras images
  const extrasImages = {
    insulation: "https://andrecelis.be/media/wysiwyg/AC/algemeen/Andre-Celis-Isolatie-04.jpg",
    gutters: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/o/v/ovation.jpg",
    solarPanels: "https://zonneplan-site.s3.amazonaws.com/uploads/2023/06/zonnepanelen-die-warmte-tegenhouden-2.png",
    skylights:
      "https://i0.wp.com/dakraamkopen.be/wp-content/uploads/2021/04/VELUX-GGLS-2in1-Asymmetrisch.jpg?fit=1280%2C888&ssl=1",
    facadeCladding:
      "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg",
  }

  // Add a function to handle roof color selection
  const handleRoofColorSelect = (color) => {
    setFormData((prev) => ({ ...prev, roofColor: color }))
  }

  // Add a function to toggle extras as buttons
  const toggleExtra = (name) => {
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [name]: !prev.extras[name],
      },
    }))
  }

  // Add a function to sort contractors
  const getSortedContractors = () => {
    const sortedContractors = [...contractors]

    switch (sortOption) {
      case "price-low":
        return sortedContractors.sort((a, b) => {
          const aQuote = contractorQuotes[a.id] || { totalPrice: 0 }
          const bQuote = contractorQuotes[b.id] || { totalPrice: 0 }
          return aQuote.totalPrice - bQuote.totalPrice
        })
      case "price-high":
        return sortedContractors.sort((a, b) => {
          const aQuote = contractorQuotes[a.id] || { totalPrice: 0 }
          const bQuote = contractorQuotes[b.id] || { totalPrice: 0 }
          return bQuote.totalPrice - aQuote.totalPrice
        })
      case "experience":
        return sortedContractors.sort((a, b) => {
          const aExp = Number.parseInt(a.experience) || 0
          const bExp = Number.parseInt(b.experience) || 0
          return bExp - aExp
        })
      case "rating":
        return sortedContractors.sort((a, b) => b.rating - a.rating)
      case "availability":
        return sortedContractors.sort((a, b) => {
          const aWeeks = a.availability.includes("week") ? Number.parseInt(a.availability.match(/\d+/)[0]) : 10
          const bWeeks = b.availability.includes("week") ? Number.parseInt(b.availability.match(/\d+/)[0]) : 10
          return aWeeks - bWeeks
        })
      default:
        return sortedContractors
    }
  }

  // Click outside to close address suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addressInputRef.current && !addressInputRef.current.contains(event.target)) {
        setShowAddressSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Functies
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Hoe het werkt
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Getuigenissen
            </Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-5xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Krijg je directe dakofferte</h1>
              <p className="mt-2 text-muted-foreground">
                Vul het formulier hieronder in om direct meerdere offertes voor je dakproject te ontvangen.
              </p>
              <p className="mt-1 text-muted-foreground">
                Het invullen duurt <b>max. 2 minuten.</b>
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div
                  className={`flex flex-col items-center ${canAccessStep(1) ? "cursor-pointer" : ""}`}
                  onClick={() => goToStep(1)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step >= 1 ? "border-primary bg-primary text-white" : "border-gray-300"
                    }`}
                  >
                    {step > 1 ? <Check className="h-5 w-5" /> : 1}
                  </div>
                  <span className="mt-2 text-sm">Gegevens</span>
                </div>
                <div className={`h-1 w-full max-w-[80px] ${step >= 2 ? "bg-primary" : "bg-gray-300"}`} />
                <div
                  className={`flex flex-col items-center ${canAccessStep(2) ? "cursor-pointer" : ""}`}
                  onClick={() => goToStep(2)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step >= 2 ? "border-primary bg-primary text-white" : "border-gray-300"
                    }`}
                  >
                    {step > 2 ? <Check className="h-5 w-5" /> : 2}
                  </div>
                  <span className="mt-2 text-sm">Aannemers</span>
                </div>
                <div className={`h-1 w-full max-w-[80px] ${step >= 3 ? "bg-primary" : "bg-gray-300"}`} />
                <div
                  className={`flex flex-col items-center ${canAccessStep(3) ? "cursor-pointer" : ""}`}
                  onClick={() => goToStep(3)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step >= 3 ? "border-primary bg-primary text-white" : "border-gray-300"
                    }`}
                  >
                    3
                  </div>
                  <span className="mt-2 text-sm">Offerte</span>
                </div>
              </div>
            </div>

            <Card className="w-full">
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Gegevens voor je dakofferte</CardTitle>
                    <CardDescription>
                      Vul je adres en dakgegevens in om een nauwkeurige offerte te krijgen.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Address Section - Now outside of collapsible */}
                    <div className="space-y-4">
                      <div className="space-y-2 relative" ref={addressInputRef}>
                        <Label htmlFor="address">Adres</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Begin met typen voor suggesties..."
                          className="w-full"
                        />

                        {/* Address Autocomplete */}
                        {showAddressSuggestions && addressSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                            {addressSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleAddressSelect(suggestion)}
                              >
                                <div className="font-medium">{suggestion.address}</div>
                                <div className="text-sm text-muted-foreground">
                                  {suggestion.city}, {suggestion.zip}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="roofSize">Geschatte dakgrootte (m²)</Label>
                        <Input
                          id="roofSize"
                          name="roofSize"
                          value={formData.roofSize}
                          onChange={handleInputChange}
                          placeholder="150"
                          type="number"
                        />
                        <p className="text-xs text-muted-foreground">
                          Weet je de grootte van je dak niet? Geen probleem! We kunnen het schatten op basis van je
                          adres.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Roof Materials Section - Now outside of collapsible */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Dakbedekking</h4>
                      <Tabs defaultValue="dakpannen" onValueChange={(value) => handleSelectChange("roofType", value)}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="dakpannen">Dakpannen</TabsTrigger>
                          <TabsTrigger value="leien">Leien</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dakpannen" className="mt-4 space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex flex-col gap-4">
                              <div>
                                <h3 className="text-lg font-semibold">Dakpannen</h3>
                                <p className="text-muted-foreground">
                                  Klassieke uitstraling met uitstekende duurzaamheid. Dakpannen zijn een populaire keuze
                                  voor woningen in België.
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Voordelen:</h4>
                                    <ul className="ml-4 list-disc text-sm">
                                      <li>50+ jaar levensduur</li>
                                      <li>Goede isolatie</li>
                                      <li>Klassieke uitstraling</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Nadelen:</h4>
                                    <ul className="ml-4 list-disc text-sm">
                                      <li>Zwaarder dan andere materialen</li>
                                      <li>Kan meer onderhoud vereisen</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h4 className="font-medium mb-2">Kies een kleur:</h4>
                                <div className="flex gap-4">
                                  <div
                                    className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "antraciet" ? "border-primary border-2" : "border-gray-200"}`}
                                    onClick={() => handleRoofColorSelect("antraciet")}
                                  >
                                    <img
                                      src={materialImages.dakpannen.antraciet || "/placeholder.svg"}
                                      alt="Antraciet dakpannen"
                                      className="w-32 h-32 object-cover"
                                    />
                                    <div className="p-2 text-center text-sm">Antraciet</div>
                                  </div>
                                  <div
                                    className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "rood" ? "border-primary border-2" : "border-gray-200"}`}
                                    onClick={() => handleRoofColorSelect("rood")}
                                  >
                                    <img
                                      src={materialImages.dakpannen.rood || "/placeholder.svg"}
                                      alt="Rode dakpannen"
                                      className="w-32 h-32 object-cover"
                                    />
                                    <div className="p-2 text-center text-sm">Rood</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="leien" className="mt-4 space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex flex-col gap-4">
                              <div>
                                <h3 className="text-lg font-semibold">Leien</h3>
                                <p className="text-muted-foreground">
                                  Premium dakbedekking met ongeëvenaarde levensduur en elegante uitstraling. Leien zijn
                                  een duurzame keuze voor uw dak.
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Voordelen:</h4>
                                    <ul className="ml-4 list-disc text-sm">
                                      <li>100+ jaar levensduur (natuurleien)</li>
                                      <li>Elegante, natuurlijke uitstraling</li>
                                      <li>Brand- en weerbestendig</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Nadelen:</h4>
                                    <ul className="ml-4 list-disc text-sm">
                                      <li>Hogere kosten</li>
                                      <li>Vereist vakkundige installatie</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h4 className="font-medium mb-2">Kies een type:</h4>
                                <div className="flex gap-4">
                                  <div
                                    className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "natuurleien" ? "border-primary border-2" : "border-gray-200"}`}
                                    onClick={() => handleRoofColorSelect("natuurleien")}
                                  >
                                    <img
                                      src={materialImages.leien.natuurleien || "/placeholder.svg"}
                                      alt="Natuurleien"
                                      className="w-32 h-32 object-cover"
                                    />
                                    <div className="p-2 text-center text-sm">Natuurleien</div>
                                  </div>
                                  <div
                                    className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "kunstleien" ? "border-primary border-2" : "border-gray-200"}`}
                                    onClick={() => handleRoofColorSelect("kunstleien")}
                                  >
                                    <img
                                      src={materialImages.leien.kunstleien || "/placeholder.svg"}
                                      alt="Kunstleien"
                                      className="w-32 h-32 object-cover"
                                    />
                                    <div className="p-2 text-center text-sm">Kunstleien</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Separator />

                    {/* Extras Section - Now outside of collapsible */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Extra's</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.insulation ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => toggleExtra("insulation")}
                        >
                          <div className="flex gap-4">
                            <img
                              src={extrasImages.insulation || "/placeholder.svg"}
                              alt="Dakisolatie"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">Dakisolatie</h3>
                              <p className="text-sm text-muted-foreground">
                                Verbeter de energie-efficiëntie van je huis met hoogwaardige dakisolatie.
                              </p>
                              <p className="text-sm font-medium mt-1">€2.500</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.gutters ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => toggleExtra("gutters")}
                        >
                          <div className="flex gap-4">
                            <img
                              src={extrasImages.gutters || "/placeholder.svg"}
                              alt="Dakgoten"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">Nieuwe dakgoten</h3>
                              <p className="text-sm text-muted-foreground">
                                Vervang of installeer nieuwe dakgoten om regenwater effectief af te voeren.
                              </p>
                              <p className="text-sm font-medium mt-1">€1.200</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.solarPanels ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => toggleExtra("solarPanels")}
                        >
                          <div className="flex gap-4">
                            <img
                              src={extrasImages.solarPanels || "/placeholder.svg"}
                              alt="Zonnepanelen"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">Zonnepanelen</h3>
                              <p className="text-sm text-muted-foreground">
                                Profiteer van duurzame energie door zonnepanelen te laten installeren.
                              </p>
                              <p className="text-sm font-medium mt-1">€5.000</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.skylights ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => toggleExtra("skylights")}
                        >
                          <div className="flex gap-4">
                            <img
                              src={extrasImages.skylights || "/placeholder.svg"}
                              alt="Dakramen"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">Dakramen</h3>
                              <p className="text-sm text-muted-foreground">
                                Laat meer natuurlijk licht binnen met hoogwaardige dakramen.
                              </p>
                              <p className="text-sm font-medium mt-1">€1.800</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => toggleExtra("facadeCladding")}
                        >
                          <div className="flex gap-4">
                            <img
                              src={extrasImages.facadeCladding || "/placeholder.svg"}
                              alt="Gevelbekleding"
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">Gevelbekleding</h3>
                              <p className="text-sm text-muted-foreground">
                                Vernieuw de uitstraling van uw woning met moderne gevelbekleding.
                              </p>
                              <p className="text-sm font-medium mt-1">€3.200</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg mt-6">
                        <h3 className="font-medium mb-2">Geselecteerde extra's:</h3>
                        <ul className="space-y-1">
                          {formData.extras.insulation && (
                            <li className="flex justify-between">
                              <span>Dakisolatie</span>
                              <span>€2.500</span>
                            </li>
                          )}
                          {formData.extras.gutters && (
                            <li className="flex justify-between">
                              <span>Nieuwe dakgoten</span>
                              <span>€1.200</span>
                            </li>
                          )}
                          {formData.extras.solarPanels && (
                            <li className="flex justify-between">
                              <span>Zonnepanelen</span>
                              <span>€5.000</span>
                            </li>
                          )}
                          {formData.extras.skylights && (
                            <li className="flex justify-between">
                              <span>Dakramen</span>
                              <span>€1.800</span>
                            </li>
                          )}
                          {formData.extras.facadeCladding && (
                            <li className="flex justify-between">
                              <span>Gevelbekleding</span>
                              <span>€3.200</span>
                            </li>
                          )}
                          {!formData.extras.insulation &&
                            !formData.extras.gutters &&
                            !formData.extras.solarPanels &&
                            !formData.extras.skylights &&
                            !formData.extras.facadeCladding && (
                              <li className="text-muted-foreground">Geen extra's geselecteerd</li>
                            )}
                        </ul>
                        {(formData.extras.insulation ||
                          formData.extras.gutters ||
                          formData.extras.solarPanels ||
                          formData.extras.skylights ||
                          formData.extras.facadeCladding) && (
                          <>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                              <span>Totaal extra's:</span>
                              <span>€{calculateExtrasCost().toLocaleString()}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleStep1Complete} disabled={!formData.address}>
                      Volgende
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </>
              )}

              {/* Step 2 - Contractor selection */}
              {step === 2 && (
                <>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Selecteer een aannemer</CardTitle>
                      <CardDescription>
                        Kies uit onze gecontroleerde dakdekkers. Elk biedt verschillende prijzen en expertise.
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Sorteren op:</span>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sorteren op" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-low">Prijs (laag naar hoog)</SelectItem>
                          <SelectItem value="price-high">Prijs (hoog naar laag)</SelectItem>
                          <SelectItem value="experience">Ervaring</SelectItem>
                          <SelectItem value="rating">Beoordelingen</SelectItem>
                          <SelectItem value="availability">Beschikbaarheid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getSortedContractors().map((contractor) => {
                        const quote = contractorQuotes[contractor.id] || { totalPrice: 0 }
                        const isExpanded = expandedContractor === contractor.id

                        return (
                          <div
                            key={contractor.id}
                            className={`rounded-lg border p-4 transition-colors ${
                              formData.selectedContractor === contractor.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                selectContractor(contractor.id)
                                toggleContractorExpand(contractor.id)
                              }}
                            >
                              <div className="flex items-start gap-4">
                                <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                                  <img
                                    src={contractor.image || "/placeholder.svg"}
                                    alt="Aannemer"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="mr-1 text-sm font-medium">{contractor.rating}</span>
                                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                    </div>
                                    {contractor.label && (
                                      <div className="flex items-center">
                                        {contractor.label === "Cheapest" && (
                                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                                            <SortAsc className="h-3 w-3 mr-1" />
                                            Goedkoopste
                                          </span>
                                        )}
                                        {contractor.label === "Most experience" && (
                                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                                            <Award className="h-3 w-3 mr-1" />
                                            Meeste ervaring
                                          </span>
                                        )}
                                        {contractor.label === "Snelst beschikbaar" && (
                                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Snelst beschikbaar
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="text-sm text-muted-foreground">{contractor.city}</span>
                                    {contractor.isProtectedAgainstBankruptcy && (
                                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                        Faillissementsbescherming
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div className="flex items-center text-sm">
                                      <Shield className="h-4 w-4 mr-1 text-[#2e5024]" />
                                      <span className="text-[#2e5024] font-medium">
                                        Garantie: {contractor.warranty}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                      <Calendar className="h-4 w-4 mr-1 text-primary" />
                                      <span>Beschikbaarheid: {contractor.availability}</span>
                                    </div>
                                    {contractor.hasShowroom && (
                                      <div className="flex items-center text-sm">
                                        <Store className="h-4 w-4 mr-1 text-primary" />
                                        <span>Showroom: {contractor.showroomAddress}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-3 flex items-center justify-between">
                                    <div className="text-sm">
                                      <span className="font-medium">Offerte: </span>
                                      <span className="text-lg font-bold">
                                        €{Math.round(quote.totalPrice).toLocaleString()}
                                      </span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleContractorExpand(contractor.id)
                                      }}
                                    >
                                      {isExpanded ? (
                                        <>
                                          <span className="mr-1 text-xs">Minder info</span>
                                          <ChevronUp className="h-4 w-4" />
                                        </>
                                      ) : (
                                        <>
                                          <span className="mr-1 text-xs">Meer info</span>
                                          <ChevronDown className="h-4 w-4" />
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium mb-2">Prijsberekening</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Materiaalkosten:</span>
                                        <span>€{Math.round(quote.materialCost).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Arbeidskosten:</span>
                                        <span>€{Math.round(quote.laborCost).toLocaleString()}</span>
                                      </div>
                                      {quote.extrasCost > 0 && (
                                        <div className="flex justify-between">
                                          <span>Extra's:</span>
                                          <span>€{Math.round(quote.extrasCost).toLocaleString()}</span>
                                        </div>
                                      )}
                                      <Separator />
                                      <div className="flex justify-between font-bold">
                                        <span>Totaal:</span>
                                        <span>€{Math.round(quote.totalPrice).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Geschatte duur:</span>
                                        <span>{quote.estimatedDuration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Beoordelingen</h4>
                                    <div className="space-y-3">
                                      {contractor.reviews.map((review, index) => (
                                        <div key={index} className="text-sm">
                                          <div className="flex items-center">
                                            <span className="font-medium">{review.author}</span>
                                            <div className="ml-2 flex">
                                              {[...Array(5)].map((_, i) => (
                                                <Star
                                                  key={i}
                                                  className={`h-3 w-3 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                                />
                                              ))}
                                            </div>
                                          </div>
                                          <p className="text-muted-foreground">{review.text}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Projectfoto's</h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {contractor.projectImages.map((img, index) => (
                                      <img
                                        key={index}
                                        src={img || "/placeholder.svg"}
                                        alt={`Project ${index + 1}`}
                                        className="rounded-md object-cover w-full aspect-video cursor-pointer"
                                        onClick={() => openLightbox(contractor.projectImages, index)}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Terug
                    </Button>
                    <Button onClick={generateQuote} disabled={!formData.selectedContractor}>
                      Genereer offerte
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </>
              )}

              {/* Step 3 - Quote */}
              {step === 3 && quoteGenerated && (
                <>
                  <CardHeader>
                    <CardTitle>Jouw dakofferte</CardTitle>
                    <CardDescription>Hier is je directe offerte op basis van de verstrekte informatie.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-primary/5 p-6">
                      <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold">€{Math.round(quoteData.totalPrice).toLocaleString()}</h3>
                        <p className="text-muted-foreground">Geschatte totale kosten</p>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotaal:</span>
                          <span className="font-medium">€{Math.round(quoteData.totalPrice).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BTW (21%):</span>
                          <span className="font-medium">
                            €{Math.round(quoteData.totalPrice * 0.21).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Totaal (incl. BTW):</span>
                          <span>€{Math.round(quoteData.totalPrice * 1.21).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-6 rounded-lg bg-white p-4">
                        <h4 className="font-medium">Projectdetails:</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex justify-between">
                            <span>Geschatte duur:</span>
                            <span>{quoteData.estimatedDuration}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Dakbedekking:</span>
                            <span className="capitalize">
                              {formData.roofType === "dakpannen" ? "Dakpannen" : "Leien"} ({formData.roofColor})
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span>Dakgrootte:</span>
                            <span>{formData.roofSize} m²</span>
                          </li>
                          {(formData.extras.insulation ||
                            formData.extras.gutters ||
                            formData.extras.solarPanels ||
                            formData.extras.skylights ||
                            formData.extras.facadeCladding) && (
                            <li>
                              <span className="font-medium">Geselecteerde extra's:</span>
                              <ul className="mt-1 ml-4 list-disc text-sm">
                                {formData.extras.insulation && <li>Dakisolatie</li>}
                                {formData.extras.gutters && <li>Nieuwe dakgoten</li>}
                                {formData.extras.solarPanels && <li>Zonnepanelen</li>}
                                {formData.extras.skylights && <li>Dakramen</li>}
                                {formData.extras.facadeCladding && <li>Gevelbekleding</li>}
                              </ul>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Deze offerte is een schatting op basis van de verstrekte informatie. Een definitieve offerte
                        wordt verstrekt na een inspectie ter plaatse.
                      </p>
                    </div>

                    {/* Email form */}
                    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                      <h3 className="text-lg font-medium mb-2">Ontvang de uitgebreide versie van je offerte</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Vul je e-mailadres in om de uitgebreide versie van je offerte te ontvangen en ontdek de volgende
                        stap(pen).
                      </p>

                      {emailSubmitted ? (
                        <div className="space-y-6">
                          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                            <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="font-medium text-green-800">
                              Bedankt! De offerte is verzonden naar je e-mailadres.
                            </p>
                            <p className="text-sm text-green-600 mt-1">Bekijk de mail voor de volgende stappen.</p>
                          </div>

                          <p className="text-center font-medium">Wat wil je nu doen?</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-dashed border-primary/50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                              <h4 className="font-medium mb-2">Hoe te besparen op je dakwerken</h4>
                              <p className="text-sm text-muted-foreground">
                                Ontdek tips en trucs om kosten te besparen bij je dakproject
                              </p>
                            </div>

                            <Link href="/signup" className="block">
                              <div className="border border-dashed border-primary/50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                                <h4 className="font-medium mb-2">Account maken</h4>
                                <p className="text-sm text-muted-foreground">
                                  Maak een account aan om je offerte te beheren en updates te ontvangen
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mailadres</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="jouw@email.nl"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Offerte ontvangen
                          </Button>
                        </form>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button variant="link" onClick={() => setStep(1)}>
                      Opnieuw beginnen
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>

            {/* Lightbox for project images */}
            <Lightbox
              images={lightboxImages}
              initialIndex={lightboxIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />

            {/* Confetti effect */}
            <Confetti trigger={showConfetti} />
          </div>

          {/* Sidebar container */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Quote Details Sidebar - Hidden on mobile and tablet */}
              {step === 2 && formData.selectedContractor && (
                <Card>
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-lg flex items-center">
                      <span className="mr-2">Geselecteerde offerte</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {(() => {
                        const contractor = contractors.find((c) => c.id === formData.selectedContractor)
                        const quote = contractorQuotes[formData.selectedContractor] || { totalPrice: 0 }

                        if (!contractor) return <p>Selecteer een aannemer</p>

                        return (
                          <>
                            <div>
                              <h3 className="font-medium mb-2">{contractor.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                <span className="text-sm">{contractor.rating} / 5</span>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="font-medium mb-2">Offerte details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Subtotaal:</span>
                                  <span className="font-medium">€{Math.round(quote.totalPrice).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>BTW (21%):</span>
                                  <span className="font-medium">
                                    €{Math.round(quote.totalPrice * 0.21).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between font-bold">
                                  <span>Totaal (incl. BTW):</span>
                                  <span>€{Math.round(quote.totalPrice * 1.21).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="font-medium mb-2">Aannemer details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                  <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-medium">Beschikbaarheid</p>
                                    <p className="text-muted-foreground">{contractor.availability}</p>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                  <div>
                                    <p className="font-medium">Locatie</p>
                                    <p className="text-muted-foreground">{contractor.city}</p>
                                  </div>
                                </div>
                                {contractor.hasShowroom && (
                                  <div className="flex items-start">
                                    <Store className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                    <div>
                                      <p className="font-medium">Showroom</p>
                                      <p className="text-muted-foreground">{contractor.showroomAddress}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="bg-primary/5 p-3 rounded-md">
                              <h3 className="font-medium mb-2">Geselecteerde extra's</h3>
                              {formData.extras.insulation ||
                              formData.extras.gutters ||
                              formData.extras.solarPanels ||
                              formData.extras.skylights ||
                              formData.extras.facadeCladding ? (
                                <ul className="space-y-1 text-sm">
                                  {formData.extras.insulation && <li>Dakisolatie (€2.500)</li>}
                                  {formData.extras.gutters && <li>Nieuwe dakgoten (€1.200)</li>}
                                  {formData.extras.solarPanels && <li>Zonnepanelen (€5.000)</li>}
                                  {formData.extras.skylights && <li>Dakramen (€1.800)</li>}
                                  {formData.extras.facadeCladding && <li>Gevelbekleding (€3.200)</li>}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">Geen extra's geselecteerd</p>
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Help/FAQ Sidebar */}
              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">Help & FAQ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Veelgestelde vragen</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link href="/faq#algemeen-1" className="text-primary hover:underline">
                            Hoe werkt het offerteproces?
                          </Link>
                        </li>
                        <li>
                          <Link href="/faq#prijzen-1" className="text-primary hover:underline">
                            Hoe worden de prijzen berekend?
                          </Link>
                        </li>
                        <li>
                          <Link href="/faq#materialen-1" className="text-primary hover:underline">
                            Welk dakmateriaal is het beste voor mij?
                          </Link>
                        </li>
                        <li>
                          <Link href="/faq#aannemers-1" className="text-primary hover:underline">
                            Hoe kies ik de juiste aannemer?
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Hulp nodig?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Onze klantenservice staat voor je klaar om je te helpen bij het aanvragen van je offerte.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          <span>(020) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          <span>support@odiyoo.be</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>Ma-Vr: 07.30 - 17.00</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-primary/5 p-3 rounded-md">
                      <h3 className="font-medium mb-2">Tip</h3>
                      <p className="text-sm text-muted-foreground">
                        Weet je niet zeker welk dakmateriaal te kiezen? Vergelijk de verschillende opties en hun voor-
                        en nadelen in stap 1.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
