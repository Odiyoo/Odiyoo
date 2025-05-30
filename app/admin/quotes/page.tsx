"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit, Eye, Home, Loader, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

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
import { DakQuote } from "@/domain/quoting"
import moment from "moment"
import { displayPrice } from "@/domain/finance"
import Navbar from "@/components/admin-navbar"

// Sample quotes data
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
  const [quotes, setQuotes] = useState<DakQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [statusColor, setStatusColor] = useState('bg-blue-100 text-blue-800') // green: bg-green-100 text-green-800 | gray: bg-gray-100 text-gray-800

  // Filter quotes based on search term and active tab
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "dakreiniging") return matchesSearch && quote.quote_type === "dakreiniging"
    if (activeTab === "dakrenovatie") return matchesSearch && quote.quote_type === "dakrenovatie"

    return matchesSearch
  })

  const fetchQuotes = async () => {

    const res = await fetch("/api/quote", {
      method: "GET",
    });

    const result = await res.json();
    setQuotes(result.data || []);
    setIsLoading(false);

    return result.data || [];
  };

  useEffect(() => {
    setIsLoading(true)
    fetchQuotes()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeLink="offertes"/>

      <main className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Offertes</h1>
            <p className="mt-2 text-muted-foreground">Beheer alle offertes op het platform.</p>
          </div>
          <Link href="/quote">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Offerte toevoegen
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Offerte overzicht</CardTitle>
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
            <CardDescription>Bekijk en beheer alle offertes op het platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Alle offertes</TabsTrigger>
                <TabsTrigger value="dakreiniging">Dakreiniging</TabsTrigger>
                <TabsTrigger value="dakrenovatie">Dakrenovatie</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Offerte #</TableHead>
                      <TableHead>Adres</TableHead>
                      <TableHead>Dakoppervlakte</TableHead>
                      <TableHead>Totaalprijs</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          <Loader className="animate-spin place-self-center"/>
                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && filteredQuotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Geen offertes gevonden in het systeem.
                        </TableCell>
                      </TableRow>
                    ) : (
                      !isLoading && filteredQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">{quote.quote_number}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{quote.address}</TableCell>
                          <TableCell>{quote.surface_in_sq_meter} m²</TableCell>
                          <TableCell>€ {displayPrice(quote.total_price)}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}
                            >
                              {statusColor ? "Koude lead" : "/"}
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
                                <Link href={`/admin/quote/${quote.id}`}>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Bekijken</span>
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Contactgegevens</span>
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
            <div className="text-sm text-muted-foreground">Totaal: {filteredQuotes.length} offertes</div>
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
