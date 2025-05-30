"use server"

import { BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "../business"
import { Tailwind, Section, Text, Heading, Button, Html, Body, Head } from "@react-email/components";
import '@/app/globals.css'
import config from "@/tailwind.config"
import { Clock, Mail, Phone } from "lucide-react";
import { CustomerServiceInquiry } from "../mail";
import MailFooter from "./MailFooter";

export type CustomerServiceInquiryMailProps = {
    inquiry: CustomerServiceInquiry,
}

export const CustomerServiceInquiryMail: React.FC<Readonly<CustomerServiceInquiryMailProps>> = async ({ inquiry }) => (
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
                            <Text className="mb-4">Beste klantendienst,</Text>
                            <Text>Naam: {inquiry.name}</Text>
                            <Text>Email: {inquiry.email}</Text>
                            <Text>Onderwerp: {inquiry.topic}</Text>
                            <Text>Bericht: {inquiry.message}</Text>
                        </div>
                    </div>
                    <MailFooter/>
                </div>
            </Body>
        </Html>
    </Tailwind>
)