"use client"

import { useState, Suspense } from "react"
import Navbar from "@/components/navbar"
import DakrenovatieForm from "./dakrenovatie/Form"
import DakreinigingForm from "./dakreiniging/Form"
import ChooseServiceForm from "./ChooseServiceForm"
import Sidebar from "@/components/sidebar"
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

export const mapsLibraries: Libraries = ['places'];

export type FormChoice = 'dakreiniging' | 'dakrenovatie';

export type FormData = {
  service: FormChoice | null,
}

export default function QuotePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: null,
  })

  const { isLoaded: hasGmapsLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyARTWcUUS8RHo9FZOCA4bnF8VxXUU0wcRk", //process.env.NEXT_PUBLIC_GMAPS_API_KEY!,
    libraries: mapsLibraries
  })
  
  const quoteForm = () => {
    let formChoice;
    switch (formData.service) {
      case 'dakreiniging':
        formChoice = <DakreinigingForm hasGmapsLoaded={hasGmapsLoaded}/>
        break;
      case 'dakrenovatie':
        formChoice = <DakrenovatieForm hasGmapsLoaded={hasGmapsLoaded}/>
        break;
      default:
        formChoice = <>Er is iets misgelopen...</>
        break;
    }
    console.log(`formChoice: ${formData.service}`);
    return formChoice;
  }

  const handleStep1Complete = () => {
    setStep(step => step + 1)
    
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container py-12">

        {step === 1 && (
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
              <Suspense>
                <ChooseServiceForm handleStep1Complete={handleStep1Complete} formData={formData} setFormData={setFormData} />
              </Suspense>
            </div>
            <Sidebar/>
          </div>
        )}
        {/* Step 2 - Form */}
        {step === 2 && (
          quoteForm()
        )}
      </main>
    </div>
  )
}
