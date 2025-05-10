"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Eye, Home, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample contractors data
const contractorsData = [
  {
    id: 1,
    name: "Premium Dakwerken",
    city: "Amsterdam",
    email: "info@premiumdakwerken.nl",
    rating: 4.8,
    experience: "15+ jaar",
    isProtectedAgainstBankruptcy: true,
    hasShowroom: true,
    image:
      "https://img.freepik.com/premium-vector/buildstrong-logo-design-met-een-hamer-en-een-dak-voor-bouw-en-huisreparatie_579306-40844.jpg",
    status: "active",
  },
  {
    id: 2,
    name: "Budget Dakoplossingen",
    city: "Rotterdam",
    email: "contact@budgetdak.nl",
    rating: 4.2,
    experience: "8+ jaar",
    isProtectedAgainstBankruptcy: false,
    hasShowroom: false,
    image: "https://adkbouw.be/wp-content/uploads/2023/11/ADK-BOUW-LOGO-REVERSE.png",
    status: "active",
  },
  {
    id: 3,
    name: "Elite Dakexperts",
    city: "Utrecht",
    email: "info@elitedak.nl",
    rating: 4.9,
    experience: "20+ jaar",
    isProtectedAgainstBankruptcy: true,
    hasShowroom: true,
    image: "https://i0.wp.com/dakwerkenmarienjoris.be/wp-content/uploads/2021/07/roof-1.png?w=840&ssl=1",
    status: "active",
  },
  {
    id: 4,
    name: "Standaard Dakdiensten",
    city: "Den Haag",
    email: "info@standaarddak.nl",
    rating: 4.5,
    experience: "12+ jaar",
    isProtectedAgainstBankruptcy: true,
    hasShowroom: false,
    image: "https://i0.wp.com/dakwerkenmarienjoris.be/wp-content/uploads/2021/07/roof-1.png?w=840&ssl=1",
    status: "inactive",
  },
]

export default function ContractorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter contractors based on search term and active tab
  const filteredContractors = contractorsData.filter((contractor) => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && contractor.status === "active"
    if (activeTab === "inactive") return matchesSearch && contractor.status === "inactive"

    return matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Odiyoo</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/admin/contractors" className="text-sm font-medium text-foreground">
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gebruikers</h1>
            <p className="mt-2 text-muted-foreground">Beheer alle gebruikers op het platform.</p>
          </div>
          <Link href="/admin/contractors/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Gebruiker toevoegen
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Gebruikers overzicht</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zoeken..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CardDescription>Bekijk en beheer alle gebruikers op het platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Alle gebruikers</TabsTrigger>
                <TabsTrigger value="active">Actief</TabsTrigger>
                <TabsTrigger value="inactive">Inactief</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gebruiker</TableHead>
                      <TableHead>Locatie</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Beoordeling</TableHead>
                      <TableHead>Ervaring</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContractors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Geen gebruikers gevonden
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContractors.map((contractor) => (
                        <TableRow key={contractor.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                <img
                                  src={contractor.image || "/placeholder.svg"}
                                  alt={contractor.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{contractor.name}</div>
                                <div className="text-xs text-muted-foreground">ID: {contractor.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{contractor.city}</TableCell>
                          <TableCell>{contractor.email}</TableCell>
                          <TableCell>{contractor.rating} / 5</TableCell>
                          <TableCell>{contractor.experience}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                contractor.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {contractor.status === "active" ? "Actief" : "Inactief"}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acties</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Bekijken</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Bewerken</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Verwijderen</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Totaal: {filteredContractors.length} gebruikers</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Vorige
              </Button>
              <Button variant="outline" size="sm" disabled>
                Volgende
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
