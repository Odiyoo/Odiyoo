"use client"

import Link from "next/link"
import { BarChart3, Building, FileText, Home, LayoutDashboard, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/admin" className="text-sm font-medium text-foreground">
              Dashboard
            </Link>
            <Link href="/admin/contractors" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Aannemers
            </Link>
            <Link href="/admin/quotes" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Offertes
            </Link>
            <Link href="/admin/settings" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Instellingen
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </header>

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
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12.5% t.o.v. vorige maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Actieve Aannemers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 nieuwe deze maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gebruikers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,782</div>
              <p className="text-xs text-muted-foreground">+8.2% t.o.v. vorige maand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversie Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8%</div>
              <p className="text-xs text-muted-foreground">+2.1% t.o.v. vorige maand</p>
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
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Offerte #{1000 + i}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(2023, 3, 20 - i).toLocaleDateString("nl-NL")}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">€{(Math.random() * 10000 + 5000).toFixed(2)}</div>
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
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Instellingen
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Statistieken
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
