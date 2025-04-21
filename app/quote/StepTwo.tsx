"use client"

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
  Star,
  Store,
  SortAsc,
  Award,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { ExtendedContractor } from "@/domain/contractors"

type StepTwoProps = { 
    handleStep2Complete: () => void,
    contractors: ExtendedContractor[], 
    step: any, 
    formData: any, 
    prevStep: any, 
    nextStep: any, 
    setFormData: any, 
    quoteData: any,
    contractorQuotes: any,
    isContractorsLoading: boolean,
    openLightbox: any }

export default function StepTwo({ handleStep2Complete, contractors, step, formData, prevStep, nextStep, setFormData, quoteData, contractorQuotes, isContractorsLoading, openLightbox }: StepTwoProps) {

    const [expandedContractor, setExpandedContractor] = useState<string | null>(null)
    const [sortOption, setSortOption] = useState("price-low")
    
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

    // Update the selectContractor function
    const selectContractor = (contractorId: string) => {
    setFormData((prev) => ({ ...prev, selectedContractor: contractorId }))
    }

    // Toggle expanded contractor
    const toggleContractorExpand = (contractorId: string) => {
    if (expandedContractor === contractorId) {
        setExpandedContractor(null)
    } else {
        setExpandedContractor(contractorId)
    }
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
                    const aExp = a.company_start_year === null ? 0 : (new Date().getFullYear() - a.company_start_year)
                    const bExp = b.company_start_year === null ? 0 : (new Date().getFullYear() - b.company_start_year)
                    return bExp - aExp
                })
            case "rating":
                return sortedContractors.sort((a, b) => b.rating - a.rating)
            case "availability":
                /*return sortedContractors.sort((a, b) => {
                    const aWeeks = a.availability.includes("week") ? Number.parseInt(a.availability.match(/\d+/)[0]) : 10
                    const bWeeks = b.availability.includes("week") ? Number.parseInt(b.availability.match(/\d+/)[0]) : 10
                    return aWeeks - bWeeks
                })*/
                return sortedContractors
            default:
            return sortedContractors
        }
    }

    return (
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
                    {isContractorsLoading && (
                        <div>Loading</div>
                    )}
                    {!isContractorsLoading && getSortedContractors().map((contractor) => {
                        const quote = contractorQuotes[contractor.id] || { totalPrice: 0 }
                        const isExpanded = expandedContractor === contractor.id

                        return (
                            <div
                                key={contractor.id}
                                className={`rounded-lg border p-4 transition-colors ${formData.selectedContractor === contractor.id
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
                                                src={contractor.profile_image || "/placeholder.svg"}
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
                                                {contractor.has_bankruptcy_protection && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                        Faillissementsbescherming
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-4 mt-2">
                                                <div className="flex items-center text-sm">
                                                    <Shield className="h-4 w-4 mr-1 text-[#2e5024]" />
                                                    <span className="text-[#2e5024] font-medium">
                                                        Garantie: {contractor.warranty_material_in_years} jaar op materiaal, {contractor.warranty_labor_in_years} jaar op arbeid
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                                                    <span>Beschikbaarheid: {contractor.availability}</span>
                                                </div>
                                                {contractor.has_showroom && (
                                                    <div className="flex items-center text-sm">
                                                        <Store className="h-4 w-4 mr-1 text-primary" />
                                                        <span>Showroom: Adres niet beschikbaar</span>
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
                                                {contractor.contractor_project_images.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img || "/placeholder.svg"}
                                                        alt={`Project ${index + 1}`}
                                                        className="rounded-md object-cover w-full aspect-video cursor-pointer"
                                                        onClick={() => openLightbox(contractor.contractor_project_images, index)}
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
                <Button onClick={handleStep2Complete} disabled={!formData.selectedContractor}>
                    Genereer offerte
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </>
    );
} 