"use server"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
//import { Separator } from "@/components/ui/separator"
import { displayPrice, taxPercentage, taxPercentageDisplay } from "../finance"
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react"
import { BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "../business"
import { FormData } from "@/app/quote/dakreiniging/Form"
import { calculateInsulationCost, ContractorDakreinigingQuote } from "../contractors"
import { Tailwind, Section, Text, Heading, Button, Html, Body, Head } from "@react-email/components";

export type NewDakreinigingQuoteMailrops = {
    formData: FormData,
    quoteData: ContractorDakreinigingQuote,
    afspraakToken: string,
}
import '@/app/globals.css'
import config from "@/tailwind.config"

export const NewDakreinigingQuoteMail: React.FC<Readonly<NewDakreinigingQuoteMailrops>> = async ({ formData, quoteData, afspraakToken }) => (
    <Tailwind
        config={config}
    >
        <Html lang="nl">
            <Head>
                <style>
                    {`
            body {
              background-color: #F2F2F2;
              margin: auto;
              padding: 32px 24px;
              font-family: sans-serif;
            }
          `}
                </style>
            </Head>
            <Body className="bg-white">
                <div className="p-8 mb-8 bg-white" style={{ backgroundColor: "white" }}>
                    <div className="space-y-6">
                        <div>
                            <Text className="mb-4">Beste klant,</Text>
                            <Text className="mb-4">
                                Bedankt voor je aanvraag via Odiyoo. Hieronder vind je een gedetailleerde offerte voor je dakproject.
                            </Text>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-100 p-6">
                            <div className="mb-6 text-center">
                                <Heading className="text-2xl font-bold">€{displayPrice(quoteData.totalPrice)}</Heading>
                                <Text className="text-muted-foreground">Geschatte totale kosten</Text>
                            </div>

                            <div className="space-y-4">
                                <Text>Voorbereidende Werken & Veiligheidsmaatregelen</Text>
                                <Text>Dakreiniging</Text>
                                <Text>Nabehandeling & Bescherming</Text>
                                <Text>Oplevering & Nazorg</Text>
                                <hr />
                                <div className="flex justify-between">
                                    <Text>Subtotaal:</Text>
                                    <Text className="font-medium">€{displayPrice(quoteData.totalPrice)}</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text>BTW ({taxPercentageDisplay}):</Text>
                                    <Text className="font-medium">€{displayPrice(quoteData.totalPrice * taxPercentage)}</Text>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <Text>Totaal (incl. BTW):</Text>
                                    <Text>€{displayPrice(quoteData.totalPrice * (1 + taxPercentage))}</Text>
                                </div>
                            </div>
                            <div className="mt-6 rounded-lg bg-white p-4">
                                <h2 className="text-md font-bold">Projectdetails:</h2>
                                <div className="mt-2">
                                    <div className="flex justify-between">
                                        <Text>Geschatte duur:</Text>
                                        <Text>{quoteData.estimatedDuration}</Text>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text>Dakgrootte:</Text>
                                        <Text>{formData.roofSize} m²</Text>
                                    </div>
                                </div>

                                <h4 className="font-bold mt-4">Inbegrepen werkzaamheden:</h4>
                                <ul className="mt-2 list-disc">
                                    <li>Voorbereidende Werken & Veiligheidsmaatregelen</li>
                                    <li>Dakreiniging</li>
                                    <li>Nabehandeling & Bescherming</li>
                                    <li>Oplevering & Nazorg</li>
                                    <li>Geselecteerde reinigings opties: {formData.options.dakbedekking && "Dakbedekking (dakpannen of leien)"}
                                        {formData.options.gootsystemen && "Gootsystemen"}
                                        {formData.options.zonnepanelen && "Zonnepanelen"}
                                        {formData.options.veluxramen && "Veluxramen"}
                                        {formData.options.schoorsteen && "Schoorsteen"}
                                        {formData.options.aquaplan && "Coating met Aquaplan"}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between cursor-pointer">
                                <h3 className="text-lg font-semibold">Volgende stappen</h3>
                                <Button>
                                    <ChevronUp className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="mt-4 space-y-4">
                                <Text>
                                    Om verder te gaan met je dakproject, raden we aan om een afspraak te maken voor een fysieke
                                    inspectie of een telefonische consultatie.
                                </Text>

                                <div className="rounded-lg bg-gray-100 p-4">
                                    <h4 className="font-medium mb-2">Plan een afspraak</h4>
                                    <Text className="text-sm mb-4">
                                        Kies een moment in de agenda van de aannemer, om een fysieke inspectie of telefonische afspraak te
                                        reserveren.
                                    </Text>
                                    <Button
                                        className="bg-odiyoo box-border w-full rounded-[8px] px-[12px] py-[12px] text-center font-semibold text-white"
                                        href={`https://odiyoo.com/afspraak?token=${afspraakToken}`}
                                    >
                                        Afspraak inplannen
                                    </Button>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h4 className="font-medium mb-2">Heb je vragen?</h4>
                                    <Text className="text-sm mb-4">
                                        Onze klantenservice staat voor je klaar om al je vragen te beantwoorden.
                                    </Text>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-primary" />
                                            <p>{CUSTOMER_SUPPORT_PHONE}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-primary" />
                                            <p>{CUSTOMER_SUPPORT_MAIL}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-primary" />
                                            <p>Ma-Vr: 07.30 - 17.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Text className="mb-4">
                                We hopen dat deze offerte aan je verwachtingen voldoet. Als je vragen hebt of meer informatie wenst,
                                aarzel dan niet om contact met ons op te nemen.
                            </Text>
                            <Text className="mb-4">Met vriendelijke groeten,</Text>
                            <Text className="font-medium">Het Odiyoo Team</Text>
                        </div>
                    </div>
                    <div className="border-t bg-muted/50 px-6 py-4">
                        <div className="mx-auto text-center text-xs text-muted-foreground">
                            <Text>© {new Date().getFullYear()} {BUSINESS_NAME}. Alle rechten voorbehouden.</Text>
                            <Text className="mt-1">
                                Volg ons op{" "}
                                <a href="#" className="text-primary hover:underline">
                                    Facebook
                                </a>{" "}
                                en{" "}
                                <a href="#" className="text-primary hover:underline">
                                    Instagram
                                </a>
                            </Text>
                            <Text className="mt-1">
                                <a href="#" className="text-primary hover:underline">
                                    Uitschrijven
                                </a>{" "}
                                |{" "}
                                <a href="#" className="text-primary hover:underline">
                                    Privacybeleid
                                </a>
                            </Text>
                        </div>
                    </div>
                </div>
            </Body>
        </Html>
    </Tailwind>
)