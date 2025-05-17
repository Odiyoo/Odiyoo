"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { Check, Loader } from "lucide-react"
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
import { calculateDakreinigingQuoteForContractor, calculateInsulationCost, ContractorDakreinigingQuote, DAKREINIGINGS_START_METERS, ExtendedContractor } from "@/domain/contractors"
import { displayPrice, taxPercentage, taxPercentageDisplay } from "@/domain/finance"
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentRequestSchema, AppointmentRequestSchema, convertToDakreinigingQuoteSchema, QuoteDakReinigingAddSchema } from "@/domain/services/roofing"

export type FormData = {
    address: string,
    roofSize: number,
    options: {
        dakbedekking: boolean,
        gootsystemen: boolean,
        zonnepanelen: boolean,
        veluxramen: boolean,
        schoorsteen: boolean,
        aquaplan: boolean,
        optionUnknown: boolean,
    }
    selectedContractor: ExtendedContractor | null,
}

export default function DakreinigingForm({hasGmapsLoaded}: {hasGmapsLoaded: boolean}) {

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        address: "",
        selectedContractor: null,
        roofSize: 150,
        options: {
            dakbedekking: false,
            gootsystemen: false,
            zonnepanelen: false,
            veluxramen: false,
            schoorsteen: false,
            aquaplan: false,
            optionUnknown: false,
        },
    })
    const [quoteGenerated, setQuoteGenerated] = useState(false)
    const [quoteData, setQuoteData] = useState<ContractorDakreinigingQuote>({
        costBasedOnSurface: 0,
        startPrice: 0,
        totalPrice: 0,
        estimatedDuration: "",
    })
    const [contractorQuotes, setContractorQuotes] = useState<Record<string, ContractorDakreinigingQuote>>({}) // array instead of object?
    const [expandedSection, setExpandedSection] = useState("address")
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [contractors, setContractors] = useState<ExtendedContractor[]>([]);
    const [isContractorsLoading, setContractorsLoading] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImages, setLightboxImages] = useState([])
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const [isSubmissionLoading, setIsSubmissionLoading] = useState(false)

    const form = useForm<AppointmentRequestSchema>({
        resolver: zodResolver(appointmentRequestSchema),
        defaultValues: {
            fullname: "",
            address: formData.address,
            email: "",
            telephone: "",
            status: "offerte_aangemaakt",
        },
    });

    // quote: QuoteDakReinigingAddSchema
    const onSubmit = async (data: AppointmentRequestSchema) => {
        setIsSubmissionLoading(true)
        const quote_res = await fetch("/api/quote/dakreiniging", {
            method: "POST",
            body: JSON.stringify(convertToDakreinigingQuoteSchema(formData, quoteData)),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!quote_res.ok) {
            form.setError("fullname", { message: "Er is iets fout gelopen." });
            setIsSubmissionLoading(false)
            return;
        }

        const quote_result: any = await quote_res.json();
        const quote_id: string = quote_result.data.id;

        data.quote_id = quote_id
        data.quote_type = 'dakrenovatie'
        const appointment_res = await fetch("/api/quote/ask-appointment", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result: { data: { appointment_id: string } } = await appointment_res.json();

        if (!appointment_res.ok) {
            form.setError("fullname", { message: "Er is iets fout gelopen." });
            setIsSubmissionLoading(false)
            return;
        } else {
            setIsSubmissionLoading(false)
            setInfoSubmitted(true)
        }

        await fetch(
            '/api/mail/send-dakreiniging-quote',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formData,
                    quoteData,
                    customerData: data,
                    appointment_id: result.data.appointment_id
                })
            }
        ).then((response) => { console.log(response) })
    };

    // Function to check if a step is accessible
    const canAccessStep = (stepNumber: number) => {
        if (stepNumber === 1) return true
        if (stepNumber === 2) return formData.address
        if (stepNumber === 3) return formData.selectedContractor
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

        const quotes: Record<string, ContractorDakreinigingQuote> = {};

        contractorData.forEach((contractor: ExtendedContractor) => {
            quotes[contractor.id] = calculateDakreinigingQuoteForContractor(formData.roofSize, contractor, formData.options.dakbedekking, formData.options.gootsystemen, formData.options.zonnepanelen, formData.options.veluxramen, formData.options.schoorsteen, formData.options.aquaplan)
        });

        setContractorQuotes(quotes);
        setContractorsLoading(false);
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
        // reset form
        setInfoSubmitted(false);
        form.reset();

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

        <>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Ontvang meteen je offerte</h1>
                        <p className="mt-2 text-muted-foreground">
                            Vul het formulier hieronder in om direct meerdere offertes voor je project te ontvangen.
                        </p>
                        <p className="mt-1 text-muted-foreground">
                            Het invullen duurt <b>max. 15 seconden.</b>
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
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-white bg-odiyoo text-white" : "border-gray-300"
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
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-white bg-odiyoo text-white" : "border-gray-300"
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
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-white bg-odiyoo text-white" : "border-gray-300"
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
                            <Suspense>
                                <StepOne handleStep1Complete={handleStep1Complete} formData={formData} setFormData={setFormData} hasGmapsLoaded={hasGmapsLoaded}/>
                            </Suspense>
                        )}

                        {/* Step 2 - Contractor selection */}
                        {step === 2 && (
                            <StepTwo handleStep2Complete={handleStep2Complete} contractors={contractors} step={step} prevStep={prevStep} nextStep={nextStep} formData={formData} setFormData={setFormData} quoteData={quoteData} isContractorsLoading={isContractorsLoading} contractorQuotes={contractorQuotes} openLightbox={openLightbox} />
                        )}

                        {/* Step 3 - Quote */}
                        {step === 3 && quoteGenerated && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-odiyoo">Jouw offerte voor dakreiniging</CardTitle>
                                    <CardDescription>Hier is je directe offerte op basis van de verstrekte informatie.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-lg bg-primary/5 p-6">
                                        <div className="mb-6 text-center">
                                            <h3 className="text-2xl font-bold text-odiyoo">€{displayPrice(quoteData.totalPrice).toLocaleString()}</h3>
                                            <p className="text-muted-foreground">Totale kosten voor dakreiniging</p>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="space-y-4">
                                            <div>
                                                <ol className="list-decimal pl-6">
                                                    <li>Voorbereidende Werken & Veiligheidsmaatregelen</li>
                                                    <li>Dakreiniging</li>
                                                    <li>Nabehandeling & Bescherming</li>
                                                    <li>Oplevering & Nazorg</li>
                                                </ol>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span>Startprijs:</span>
                                                <span>€{displayPrice(quoteData.startPrice)}</span>
                                            </div>
                                            <div className={`flex justify-between ${formData.roofSize > DAKREINIGINGS_START_METERS ? '' : 'hidden'}`}>
                                                <div>
                                                    <span>€{formData.selectedContractor!.dakreiniging_prijs_per_sq_meter}/m²</span>
                                                    <span className="text-muted-foreground">Dakoppervlakte &gt; ({DAKREINIGINGS_START_METERS})</span>
                                                </div>
                                                <span>€{displayPrice(quoteData.costBasedOnSurface)}</span>
                                            </div>
                                            <Separator />
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
                                            <div className="flex justify-between font-bold text-odiyoo">
                                                <span>Totaal (incl. BTW):</span>
                                                <span>€{displayPrice(quoteData.totalPrice * (1 + taxPercentage)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 rounded-lg bg-white p-4">
                                            <h4 className="font-bold text-odiyoo">Projectdetails:</h4>
                                            <ul className="mt-2 space-y-2">
                                                <li className="flex justify-between">
                                                    <span>Geschatte duur:</span>
                                                    <span>{quoteData.estimatedDuration}</span>
                                                </li>
                                                <li className="flex justify-between">
                                                    <span>Dakgrootte:</span>
                                                    <span>{formData.roofSize} m²</span>
                                                </li>
                                                {(formData.options.dakbedekking ||
                                                    formData.options.gootsystemen ||
                                                    formData.options.zonnepanelen ||
                                                    formData.options.veluxramen ||
                                                    formData.options.schoorsteen ||
                                                    formData.options.aquaplan) && (
                                                        <li>
                                                            <span className="font-medium">Geselecteerde reinigings opties:</span>
                                                            <ul className="mt-1 ml-4 list-disc text-sm">
                                                                {formData.options.dakbedekking && <li>Dakbedekking (dakpannen of leien)</li>}
                                                                {formData.options.gootsystemen && <li>Gootsystemen</li>}
                                                                {formData.options.zonnepanelen && <li>Zonnepanelen</li>}
                                                                {formData.options.veluxramen && <li>Veluxramen</li>}
                                                                {formData.options.schoorsteen && <li>Schoorsteen</li>}
                                                                {formData.options.aquaplan && <li>Coating met Aquaplan</li>}
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
                                        <h3 className="text-lg font-medium mb-2">Plan een afspraak in</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Vul je gegevens in om de uitgebreide versie van je offerte te ontvangen en ontdek de volgende
                                            stappen.
                                        </p>

                                        {infoSubmitted ? (
                                            <div className="space-y-6">
                                                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                                                    <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                                    <p className="font-medium text-green-800">
                                                        Bedankt! Je aanvraag is goed ontvangen.
                                                        We bellen je binnen 24u voor een
                                                        vrijblijvende afspraak
                                                    </p>
                                                    <p className="text-sm text-green-600 mt-1">Bekijk de mail voor de volgende stappen.</p>
                                                </div>

                                                <p className="text-center font-medium">Wat wil je nu doen?</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Link href="/faq" className="text-sm text-muted-foreground">
                                                        <div className="border border-dashed border-primary/50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                                                            <h4 className="font-medium mb-2">Hoe te besparen op je dakwerken</h4>
                                                            Ontdek tips en trucs om kosten te besparen bij je dakproject
                                                        </div>
                                                    </Link>

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
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                    <div className="my-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="fullname"
                                                            render={({ field }) => (
                                                                <>
                                                                    <FormLabel htmlFor="fullname">Volledige Naam</FormLabel>
                                                                    <FormControl>
                                                                        <Input id="fullname" type="text" placeholder="Peter Peeters" className="mt-2" {...field} required />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="my-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="address"
                                                            render={({ field }) => (
                                                                <>
                                                                    <FormLabel htmlFor="address">Adres</FormLabel>
                                                                    <FormControl>
                                                                        <Input id="address" type="text" placeholder="Stationstraat 1, Tongeren" className="mt-2" {...field} required />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="my-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="telephone"
                                                            render={({ field }) => (
                                                                <>
                                                                    <FormLabel htmlFor="telephone">Telefoonnummer</FormLabel>
                                                                    <FormControl>
                                                                        <Input id="telephone" type="tel" placeholder="+32 480 12 34 56" className="mt-2" {...field} required />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="my-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="email"
                                                            render={({ field }) => (
                                                                <>
                                                                    <FormLabel htmlFor="email">E-mailadres</FormLabel>
                                                                    <FormControl>
                                                                        <Input id="email" type="email" placeholder="jouw@email.be" className="mt-2" {...field} required />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </>
                                                            )}
                                                        />
                                                    </div>
                                                    <Button type="submit" className="w-full mt-12">
                                                        {isSubmissionLoading ? <Loader className="animate-spin" /> : "Offerte ontvangen"}
                                                    </Button>
                                                </form>
                                            </Form>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-4">
                                    <Link href="/quote">
                                        <Button variant="link">
                                            Opnieuw beginnen
                                        </Button>
                                    </Link>
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
                <Sidebar step={step} formData={formData} contractors={contractors} contractorQuotes={contractorQuotes} />
            </div>
        </>
    )
}
