"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { taxPercentageDisplay } from "@/domain/finance"
import { NewQuoteMail } from "@/domain/emails/NewQuote"
import { FormData } from "../quote/page"
import { ContractorQuote } from "@/domain/contractors"

export default function EmailExamplePage() {

  const quoteData: ContractorQuote = {
    materialCost: 55,
    afbraakCost: 10,
    timmerCost: 22,
    extrasCost: 1300,
    laborCost: 16,
    totalPrice: 20136.59,
    estimatedDuration: "7-10 dagen",
  };

  const formData: FormData = {
    address: "Stationstraat 1",
    roofSize: 150,
    roofType: "dakpannen",
    roofColor: "antraciet",
    additionalServices: [],
    selectedContractor: {
      afbraakwerken_per_sq_meter: 13,
      bankaccount_nr: "",
      btw_nr: "",
      city: "Leuven",
      company_start_year: 1990,
      created_at: "",
      dakbedekking_per_sq_meter: 15,
      warranty_material_in_years: 12,
      contractor_project_images: [],
      isolatie_per_sq_meter: 13,
      rating: 4.2,
      label: "Snelste",
      availability: "4-5 dagen",
      reviews: [""],
    },
    extras: {
      insulation: true,
      gutters: false,
      solarPanels: false,
      skylights: false,
      facadeCladding: false,
    },
    email: "dazzy.edu@gmail.com",
  }

  const sendMail = async () => {
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
  }
  
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Voorbeeld E-mail</h1>
          <p className="mt-2 text-muted-foreground">
            Zo ziet de e-mail eruit die je ontvangt na het aanvragen van een offerte.
          </p>
        </div>
        <Button onClick={sendMail}>Send mail</Button>


        <div className="text-center">
          <Link href="/quote">
            <Button>Terug naar offerte formulier</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
