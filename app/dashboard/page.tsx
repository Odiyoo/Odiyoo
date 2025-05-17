"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, ShieldCheck, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import { DakQuote } from "@/domain/quoting";
import moment from "moment";
import { displayPrice } from "@/domain/finance";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthenticatedUserHook, useAuthenticatedUser } from "@/hooks/use-authenticated-user";
import { Progress } from "@/components/ui/progress";
import StripedProgressBar from "@/components/striped-progress-bar";

export default function DashboardPage() {

    type DakQuoteWithMap = DakQuote & {
        map: any
    }

    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quotes, setQuotes] = useState<DakQuoteWithMap[]>([]);
    const { user, customer, isUserLoading } = useAuthenticatedUser()

    useEffect(() => {
        setIsQuotesLoading(true)

        async function fetchQuotes() {
            const res = await fetch('/api/quote', {
                method: "GET",
            })

            const result = await res.json();
            if (result && result.data != null) {
                result.data.forEach(async (quote) => {
                    quote.map = await generateMapsImage(quote.address)
                })
            }

            setQuotes(result.data || []);
            setIsQuotesLoading(false)
        }

        fetchQuotes()
    }, [])

    useEffect(() => {
        console.log("quotes", quotes)
    }, [quotes])

    const API_KEY = "AIzaSyARTWcUUS8RHo9FZOCA4bnF8VxXUU0wcRk"
    const API_KEY_GEOCODING = "AIzaSyAJSmJenZw-igkToLBfS4sR-veM6-EUJ_g"
    const API_KEY_ALL = "AIzaSyCrrNuMLAhypkpLa7SvSWBs9C8gKlbVBhI"
    const SIGNATURE_KEY = ""
    async function generateMapsImage(address: string) {
        const geocode_res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY_ALL}`)
        const data = await geocode_res.json()
        //console.log("geocode", data)
        if (data.results.length > 0) {
            const lat = data.results[0].geometry.location.lat
            const lng = data.results[0].geometry.location.lng
            const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}
            &fov=80&heading=70&pitch=0&key=${API_KEY_ALL}` //&signature=${SIGNATURE_KEY}`)
            return url
        } else {
            return null
        }
    }

    const quoteStatus = (quote: DakQuote) => {
        return (
            <div className="flex w-full pb-2 gap-2 text-muted-foreground text-sm border-b">
                <p>Offerte gemaakt</p>
                <ArrowRight className="text-odiyoo" />
                <p>Afspraak werken gepland</p>
                <ArrowRight className="text-odiyoo" />
                <p>Werken in uitvoering</p>
                <ArrowRight className="text-odiyoo" />
                <p>Klaar</p>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <Sidebar authenticatedUser={{ user, customer, isUserLoading }} />
            <div className="flex min-h-screen flex-col w-full">
                <Navbar />
                <SidebarTrigger />
                <main className="flex-1 p-6">
                    <div className="mb-4">
                        <h1 className="text-xl text-odiyoo">Jouw aanvragen bij Odiyoo</h1>
                    </div>
                    <div className="my-4 p-4 rounded-lg shadow-lg border-odiyoo border-2">
                        <h1 className="text-lg text-odiyoo">Nog één stap te gaan!</h1>
                        <p className="text-muted-foreground">Kies een moment en plan je eerste afspraak eenvoudig in.</p>
                        <div className="flex justify-between mt-4">
                            <div className="flex flex-row w-full place-items-center">
                                <Ruler className="text-odiyoo" />
                                <StripedProgressBar value={75} className="[&>div]:bg-green-400 h-2.5 w-[75%] mx-2" />
                                <ShieldCheck className="text-odiyoo" />
                            </div>
                            <Button>Plan afspraak</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {isQuotesLoading && [1, 2, 3].map((num) => (
                            <Skeleton className="h-[225px] w-full" key={num} />
                        ))}
                        {!isQuotesLoading && quotes && quotes.map((quote, key) => (
                            <Card className="shadow-md" key={key}>
                                <CardHeader className="px-6 py-5">
                                    {quoteStatus(quote)}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-row space-y-0">
                                        {<div>
                                            <Image priority={false} loading="lazy" src={quote.map || '/placeholder.svg'} alt="Afbeelding van gebouw op de kaart" className="rounded-xl shadow-xl" width="250" height="250" />
                                        </div>}
                                        <div className="flex flex-1 flex-col justify-between ml-8">
                                            <div>
                                                <div className="flex gap-4 mb-2">
                                                    <CardTitle className="text-sm text-muted-foreground"><span className="text-odiyoo">#</span>{quote.quote_number}</CardTitle>
                                                    <CardDescription className="flex gap-1 place-items-center text-xs">
                                                        <Clock className="text-odiyoo" size="16" />
                                                        <p>{moment(quote.created_at).fromNow()}</p>
                                                    </CardDescription>
                                                </div>
                                                <p>Adres: {quote.address}</p>
                                                <p>Dakoppervlakte: {quote.surface_in_sq_meter}m²</p>
                                                <p className="text-odiyoo">€{displayPrice(quote.total_price)}</p>
                                            </div>
                                            <div className="flex flex-row justify-end gap-2 self-end">
                                                <Button variant="outline">Details</Button>
                                                <Button>Afspraak plannen</Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {!isQuotesLoading && !quotes && (
                            <p>Je hebt nog geen offertes aangevraagd. <Link href="/quote" className="text-odiyoo">Start hier <ArrowRight /></Link></p>
                        )}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}