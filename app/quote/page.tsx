"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Check,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Lightbox } from "@/components/lightbox"
import { Confetti } from "@/components/confetti"
import Sidebar from "./Sidebar"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import { calculateInsulationCost, calculateQuoteForContractor, ContractorQuote, ExtendedContractor } from "@/domain/contractors"
import { displayPrice, taxPercentage, taxPercentageDisplay } from "@/domain/finance"
import { sendQuoteToCustomer } from "@/domain/mail"

export type FormData = {
  address: string,
  roofSize: number,
  roofType: "dakpannen" | "leien",
  roofColor: string,
  additionalServices: [],
  selectedContractor: ExtendedContractor | null,
  extras: {
    insulation: boolean,
    gutters: boolean,
    solarPanels: boolean,
    skylights: boolean,
    facadeCladding: boolean,
  },
  email: string,
}

export default function QuotePage() {

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    address: "",
    roofSize: 150,
    roofType: "dakpannen", // Changed default to dakpannen
    roofColor: "antraciet", // Default roof color
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
  const [quoteData, setQuoteData] = useState<ContractorQuote>({
    materialCost: 0,
    afbraakCost: 0,
    timmerCost: 0,
    extrasCost: 0,
    laborCost: 0,
    totalPrice: 0,
    estimatedDuration: "",
  })
  const [contractorQuotes, setContractorQuotes] = useState<Record<string, ContractorQuote>>({}) // array instead of object?
  const [expandedSection, setExpandedSection] = useState("address")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [contractors, setContractors] = useState<ExtendedContractor[]>([]);
  const [isContractorsLoading, setContractorsLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Function to check if a step is accessible
  const canAccessStep = (stepNumber: number) => {
    if (stepNumber === 1) return true
    if (stepNumber === 2) return formData.address
    if (stepNumber === 3) return formData.roofSize && formData.roofType
    if (stepNumber === 4) return Object.keys(contractorQuotes).length > 0
    return false
  }

  // Function to navigate to a specific step
  const goToStep = (stepNumber: number) => {
    if (canAccessStep(stepNumber)) {
      setStep(stepNumber)
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExtrasChange = (name: string, checked: boolean) => {
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

  // code for collapsible sections
  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Add contractors data with additional fields
  /*const contractors = [
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
  ]*/

  

  // Calculate quotes for all contractors when moving to step 2
  const calculateAllQuotes = async () => {
    setContractorsLoading(true);

    const fetchContractors = async () => {
    
        const res = await fetch("/api/contractors", {
            method: "GET",
        });

        const result = await res.json();
        setContractors(result.data || []);

        return result.data || [];
    };

    const contractorData = await fetchContractors();

    const quotes: Record<string, ContractorQuote> = {};

    contractorData.forEach((contractor: ExtendedContractor) => {
      quotes[contractor.id] = calculateQuoteForContractor(formData.roofSize, contractor, formData.roofType, formData.extras.insulation, formData.extras.gutters, formData.extras.solarPanels, formData.extras.skylights, formData.extras.facadeCladding)
    });

    setContractorQuotes(quotes);
    setContractorsLoading(false);
  }

  // Handle email submission
  const handleEmailSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (formData.email) {
      setEmailSubmitted(true)
      setShowConfetti(true)
      
      await fetch(
        '/api/mail/send-quote',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            quoteData,
          })
        }
      ).then((response) => {console.log(response)})

      // Reset confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    }
  }

  // Open lightbox
  const openLightbox = (images: [], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Handle step 1 completion
  const handleStep1Complete = () => {
    calculateAllQuotes()
    nextStep()
  }

  // Handle step 2 completion
  const handleStep2Complete = () => {
    generateQuote();
  }

  // Update the generateQuote function to use the selected contractor's pricing
  const generateQuote = async () => {
    const contractor = formData.selectedContractor!
    const quote = contractorQuotes[contractor.id]
    setQuoteData({
        ...quote,
        contractor: contractor.name,
    })
  }

  useEffect(() => {
    if (step === 2) {
      setQuoteGenerated(true);
      nextStep();
    }
  }, [quoteData])

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
              <h1 className="text-3xl font-bold">Ontvang meteen je dakofferte</h1>
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
                      step >= 1 ? "border-white bg-odiyoo text-white" : "border-gray-300"
                    }`}
                  >
                    {step > 1 ? <Check className="h-5 w-5" /> : 1}
                  </div>
                  <span className="mt-2 text-sm">Gegevens</span>
                </div>
                <div className={`h-1 w-full max-w-[80px] ${step >= 2 ? "bg-odiyoo" : "bg-gray-300"}`} />
                <div
                  className={`flex flex-col items-center ${canAccessStep(2) ? "cursor-pointer" : ""}`}
                  onClick={() => goToStep(2)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step >= 2 ? "border-white bg-odiyoo text-white" : "border-gray-300"
                    }`}
                  >
                    {step > 2 ? <Check className="h-5 w-5" /> : 2}
                  </div>
                  <span className="mt-2 text-sm">Aannemers</span>
                </div>
                <div className={`h-1 w-full max-w-[80px] ${step >= 3 ? "bg-odiyoo" : "bg-gray-300"}`} />
                <div
                  className={`flex flex-col items-center ${canAccessStep(3) ? "cursor-pointer" : ""}`}
                  onClick={() => goToStep(3)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step >= 3 ? "border-white bg-odiyoo text-white" : "border-gray-300"
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
                <StepOne handleStep1Complete={handleStep1Complete} formData={formData} setFormData={setFormData}/>
              )}

              {/* Step 2 - Contractor selection */}
              {step === 2 && (
                <StepTwo handleStep2Complete={handleStep2Complete} contractors={contractors} step={step} prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} quoteData={quoteData} isContractorsLoading={isContractorsLoading} contractorQuotes={contractorQuotes} openLightbox={openLightbox}/>
              )}

              {/* Step 3 - Quote */}
              {step === 3 && quoteGenerated && (
                <>
                  <CardHeader>
                    <CardTitle className="text-odiyoo">Jouw dakofferte</CardTitle>
                    <CardDescription>Hier is je directe offerte op basis van de verstrekte informatie.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-primary/5 p-6">
                      <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold">€{displayPrice(quoteData.totalPrice).toLocaleString()}</h3>
                        <p className="text-muted-foreground">Geschatte totale kosten</p>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Afbraakwerken:</span>
                          <span className="font-medium">€{displayPrice(quoteData.afbraakCost).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timmerwerken:</span>
                          <span className="font-medium">€{displayPrice(quoteData.timmerCost).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dakbedekking:</span>
                          <span className="font-medium">€{displayPrice(quoteData.materialCost).toLocaleString()}</span>
                        </div>
                        {formData.extras.insulation && <div className="flex justify-between">
                          <span>Isolatie:</span>
                          <span className="font-medium">€{displayPrice(calculateInsulationCost(formData.roofSize, formData.selectedContractor)).toLocaleString()}</span>
                        </div>}
                        <Separator/>
                        <div className="flex justify-between">
                          <span>Subtotaal:</span>
                          <span className="font-medium">€{displayPrice(quoteData.totalPrice).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BTW ({taxPercentageDisplay}):</span>
                          <span className="font-medium">
                            €{displayPrice(quoteData.totalPrice * taxPercentage).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Totaal (incl. BTW):</span>
                          <span>€{displayPrice(quoteData.totalPrice * (1 + taxPercentage)).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-6 rounded-lg bg-white p-4">
                        <h4 className="font-bold">Projectdetails:</h4>
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
                        stappen.
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
                              placeholder="jouw@email.be"
                              required
                            />
                          </div>
                          <Button variant="odiyoo_gradient" type="submit" className="w-full">
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

          <Sidebar step={step} formData={formData} contractors={contractors} contractorQuotes={contractorQuotes}/>
        </div>
      </main>
    </div>
  )
}
