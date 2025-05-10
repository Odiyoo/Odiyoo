"use client"

import Link from "next/link"
import { BarChart3, Building, FileText, Home, LayoutDashboard, Loader2, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { displayPrice } from "@/domain/finance"
import moment from "moment"
import Navbar from "@/components/admin-navbar"

export default function AdminDashboardPage() {

  const [amountOfQuotes, setAmountOfQuotes] = useState(0);
  const [amountOfActiveContractors, setAmountOfActiveContractors] = useState(0);
  const [amountOfCustomers, setAmountOfCustomers] = useState(0);
  const [recentQuotes, setRecentQuotes] = useState<{id: number, quote_number: number, total_price: number, created_at: Date}[]>([]);
  const [isStaticticsLoading, setIsStatisticsLoading] = useState(true);

  useEffect(() => {

    async function getStatistics() {
      
      setIsStatisticsLoading(true)

      const res = await fetch("/api/admin/stats", {
        method: "GET",
      });
      const { data } = await res.json();
      
      setAmountOfQuotes(data.coldQuoteCount)
      setAmountOfActiveContractors(data.activeContractorCount)
      setAmountOfCustomers(data.customerCount)
      setRecentQuotes(data.recentColdQuotes)
    }
    
    getStatistics()
    setIsStatisticsLoading(false);
    console.log(amountOfActiveContractors)

  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeLink="dashboard"/>

      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welkom bij het Odiyoo admin dashboard. Hier kun je alle aspecten van het platform beheren.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Totaal Offertes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isStaticticsLoading ? <Loader2 className="animate-spin"/> : amountOfQuotes}</div>
              <p className="text-xs text-muted-foreground">+12.5% t.o.v. vorige maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Actieve Aannemers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isStaticticsLoading ? <Loader2 className="animate-spin"/> : amountOfActiveContractors}</div>
              <p className="text-xs text-muted-foreground">+2 nieuwe deze maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gebruikers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isStaticticsLoading ? <Loader2 className="animate-spin"/> : amountOfCustomers}</div>
              <p className="text-xs text-muted-foreground">+8.2% t.o.v. vorige maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversie Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">-</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recente Offertes</CardTitle>
              <CardDescription>De meest recente offertes op het platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuotes.map((quote, number) => (
                  <div key={number} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Offerte #{quote.quote_number}</div>
                        <div className="text-xs text-muted-foreground">
                          {moment(quote.created_at).calendar()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">€{displayPrice(quote.total_price)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/quotes">
                <Button variant="outline" size="sm">
                  Alle offertes bekijken
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Snelle Links</CardTitle>
              <CardDescription>Snelle toegang tot veelgebruikte functies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/contractors/add">
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Aannemer toevoegen
                  </Button>
                </Link>
                <Link href="/admin/quotes">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Offertes beheren
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Gebruikers beheren
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Naar website
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
