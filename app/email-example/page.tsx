"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function EmailExamplePage() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Voorbeeld E-mail</h1>
          <p className="mt-2 text-muted-foreground">
            Zo ziet de e-mail eruit die je ontvangt na het aanvragen van een offerte.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Van: info@odiyoo.be</div>
                <div className="text-sm text-muted-foreground">Aan: jouw@email.be</div>
                <div className="text-sm text-muted-foreground">Onderwerp: Je dakofferte is klaar!</div>
              </div>
              <div className="text-sm text-muted-foreground">Vandaag, 14:32</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4">Beste klant,</p>
              <p className="mb-4">
                Bedankt voor je aanvraag via Odiyoo. Hieronder vind je een gedetailleerde offerte voor je dakproject.
              </p>
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold">€12.450</h3>
                <p className="text-muted-foreground">Geschatte totale kosten</p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotaal:</span>
                  <span className="font-medium">€10.289</span>
                </div>
                <div className="flex justify-between">
                  <span>BTW (21%):</span>
                  <span className="font-medium">€2.161</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Totaal (incl. BTW):</span>
                  <span>€12.450</span>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-white p-4">
                <h4 className="font-bold">Projectdetails:</h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span>Geschatte duur:</span>
                    <span>4-5 dagen</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dakbedekking:</span>
                    <span>Leien (natuurleien)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dakgrootte:</span>
                    <span>150 m²</span>
                  </li>
                </ul>

                <h4 className="font-bold mt-4">Inbegrepen werkzaamheden:</h4>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Inrichting en algemene voorbereiding van de werf</li>
                  <li>Afbraakwerken</li>
                  <li>Timmerwerken</li>
                  <li>Isolatie</li>
                  <li>Dakbedekking (leien)</li>
                  <li>Extra's: Dakisolatie, Nieuwe dakgoten</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <h3 className="text-lg font-semibold">Volgende stappen</h3>
                <Button variant="ghost" size="sm">
                  {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </div>

              {expanded && (
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
                    <Button className="w-full">Afspraak inplannen</Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Heb je vragen?</h4>
                    <p className="text-sm mb-4">
                      Onze klantenservice staat voor je klaar om al je vragen te beantwoorden.
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
                </div>
              )}
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
              <p>© 2023 Odiyoo. Alle rechten voorbehouden.</p>
              <p className="mt-1">
                Volg ons op{" "}
                <Link href="#" className="text-primary hover:underline">
                  Facebook
                </Link>{" "}
                en{" "}
                <Link href="#" className="text-primary hover:underline">
                  Instagram
                </Link>
              </p>
              <p className="mt-1">
                <Link href="#" className="text-primary hover:underline">
                  Uitschrijven
                </Link>{" "}
                |{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacybeleid
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/quote">
            <Button>Terug naar offerte formulier</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
