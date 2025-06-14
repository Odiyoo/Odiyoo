"use client"

import { useEffect, useState } from "react"
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
import { ExtendedContractor } from "@/domain/contractors"
import moment from "moment"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Navbar from "@/components/admin-navbar"

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
  const [contractors, setContractors] = useState<ExtendedContractor[]>([])

  // Filter contractors based on search term and active tab
  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.city.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && contractor.status
    if (activeTab === "inactive") return matchesSearch && !contractor.status

    return matchesSearch
  })

  const fetchContractors = async () => {

    const res = await fetch("/api/contractors", {
      method: "GET",
    });

    const result = await res.json();
    setContractors(result.data || []);

    return result.data || [];
  };

  useEffect(() => {
    fetchContractors()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeLink="aannemers"/>

      <main className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Aannemers</h1>
            <p className="mt-2 text-muted-foreground">Beheer alle aannemers op het platform.</p>
          </div>
          <Link href="/admin/contractors/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Aannemer toevoegen
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Aannemers overzicht</CardTitle>
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
            <CardDescription>Bekijk en beheer alle aannemers op het platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Alle aannemers</TabsTrigger>
                <TabsTrigger value="active">Actief</TabsTrigger>
                <TabsTrigger value="inactive">Inactief</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aannemer</TableHead>
                      <TableHead>Locatie</TableHead>
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
                          Geen aannemers gevonden
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContractors.map((contractor) => (
                        <TableRow key={contractor.id}>
                          <TableCell>
                            <Link href={`contractors/${contractor.id}`}>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                  <img
                                    src={contractor.profile_image || "/placeholder.svg"}
                                    alt={contractor.name || "Afbeelding aannemer"}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{contractor.name}</div>
                                  <div className="text-xs text-muted-foreground">ID: {contractor.id}</div>
                                </div>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>{contractor.city}</TableCell>
                          <TableCell>{contractor.rating} / 5</TableCell>
                          <TableCell>{moment().subtract(contractor.company_start_year, 'years').year()}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${contractor.status
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {contractor.status ? "Actief" : "Inactief"}
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
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Verwijderen</span>
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
            <div className="text-sm text-muted-foreground">Totaal: {filteredContractors.length} aannemers</div>
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
