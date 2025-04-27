"use server"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
//import { Separator } from "@/components/ui/separator"
import { displayPrice, taxPercentage, taxPercentageDisplay } from "../finance"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react"
import { BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "../business"
import { FormData } from "@/app/quote/page"
import { calculateInsulationCost, ContractorQuote } from "../contractors"

export type NewQuoteMailProps = {
    formData: FormData,
    quoteData: ContractorQuote,
    afspraakToken: string,
}
import '@/app/globals.css'
export const NewQuoteMail: React.FC<Readonly<NewQuoteMailProps>> = async ({ formData, quoteData, afspraakToken }) => (
    <Card className="mb-8">
        <CardContent className="space-y-6">
            <div>
                <p className="mb-4">Beste klant,</p>
                <p className="mb-4">
                    Bedankt voor je aanvraag via Odiyoo. Hieronder vind je een gedetailleerde offerte voor je dakproject.
                </p>
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold">€{displayPrice(quoteData.totalPrice).toLocaleString()}</h3>
                    <p className="text-muted-foreground">Geschatte totale kosten</p>
                </div>

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
                        <span className="font-medium">€{displayPrice(calculateInsulationCost(formData.roofSize, formData.selectedContractor!)).toLocaleString()}</span>
                    </div>}
                    <div className="flex justify-between">
                        <span>Subtotaal:</span>
                        <span className="font-medium">€{displayPrice(quoteData.totalPrice).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>BTW ({taxPercentageDisplay}):</span>
                        <span className="font-medium">€{displayPrice(quoteData.totalPrice * taxPercentage).toLocaleString()}</span>
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
                            <span>{formData.roofType === "dakpannen" ? "Dakpannen" : "Leien"} ({formData.roofColor})</span>
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

                    <h4 className="font-bold mt-4">Inbegrepen werkzaamheden:</h4>
                    <ul className="mt-2 space-y-1 ml-4 list-disc">
                        <li>Inrichting en algemene voorbereiding van de werf</li>
                        <li>Afbraakwerken</li>
                        <li>Timmerwerken</li>
                        <li>Dakbedekking (leien)</li>
                        <li>Extra's: {formData.extras.insulation && "Dakisolatie"}
                            {formData.extras.gutters && "Nieuwe dakgoten"}
                            {formData.extras.solarPanels && "Zonnepanelen"}
                            {formData.extras.skylights && "Dakramen"}
                            {formData.extras.facadeCladding && "Gevelbekleding"}</li>
                    </ul>
                </div>
            </div>

            <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-lg font-semibold">Volgende stappen</h3>
                    <Button variant="ghost" size="sm">
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                </div>
                <div className="mt-4 space-y-4">
                    <p>
                        Om verder te gaan met je dakproject, raden we aan om een afspraak te maken voor een fysieke
                        inspectie of een telefonische consultatie.
                    </p>

                    <div className="rounded-lg bg-primary/5 p-4">
                        <h4 className="font-medium mb-2">Plan een afspraak</h4>
                        <p className="text-sm mb-4">
                            Kies een moment in de agenda van de aannemer, om een fysieke inspectie of telefonische afspraak te
                            reserveren.
                        </p>
                        <a href={`https://odiyoo.be/afspraak?token=${afspraakToken}`}>
                            <Button className="w-full">Afspraak inplannen</Button>
                        </a>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Heb je vragen?</h4>
                        <p className="text-sm mb-4">
                            Onze klantenservice staat voor je klaar om al je vragen te beantwoorden.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-primary" />
                                <span>{CUSTOMER_SUPPORT_PHONE}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-primary" />
                                <span>{CUSTOMER_SUPPORT_MAIL}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <span>Ma-Vr: 07.30 - 17.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="mb-4">
                    We hopen dat deze offerte aan je verwachtingen voldoet. Als je vragen hebt of meer informatie wenst,
                    aarzel dan niet om contact met ons op te nemen.
                </p>
                <p className="mb-4">Met vriendelijke groeten,</p>
                <p className="font-medium">Het Odiyoo Team</p>
            </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <div className="mx-auto text-center text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} {BUSINESS_NAME}. Alle rechten voorbehouden.</p>
                <p className="mt-1">
                    Volg ons op{" "}
                    <a href="#" className="text-primary hover:underline">
                        Facebook
                    </a>{" "}
                    en{" "}
                    <a href="#" className="text-primary hover:underline">
                        Instagram
                    </a>
                </p>
                <p className="mt-1">
                    <a href="#" className="text-primary hover:underline">
                        Uitschrijven
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-primary hover:underline">
                        Privacybeleid
                    </a>
                </p>
            </div>
        </CardFooter>
    </Card>
)