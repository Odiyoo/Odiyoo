"use server"

import { BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "../business"
import { Tailwind, Section, Text, Heading, Button, Html, Body, Head } from "@react-email/components";

export type NewLeadMailProps = {
    customerData: AppointmentRequestSchema,
    afspraakToken: string,
}
import '@/app/globals.css'
import config from "@/tailwind.config"
import { AppointmentRequestSchema } from "../services/roofing"
import { Clock, Mail, Phone } from "lucide-react";

export const NewLeadMail: React.FC<Readonly<NewLeadMailProps>> = async ({ customerData, afspraakToken }) => (
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
                                Bedankt voor je aanvraag via Odiyoo. We hebben je gegevens goed ontvangen. Eén van onze vertegenwoordigers neemt zo snel mogelijk contact met je op om alles verder met je door te nemen.
                            </Text>
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

                        <div>
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