"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Edit, Eye, Home, Loader, MoreHorizontal, Phone, Plus, Search, Trash2 } from "lucide-react"

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
import { AppointmentRequest, AppointmentRequestStatus, ExtendedAppointmentRequest } from "@/domain/services/roofing"
import { capitalize } from "@/lib/helper"
import { ExtendedCustomer } from "@/domain/customers"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [customers, setCustomers] = useState<ExtendedCustomer[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Filter quotes based on search term and active tab
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch

    return matchesSearch
  })

  const fetchCustomers = async () => {

    const res = await fetch("/api/customers", {
      method: "GET",
    });

    const result = await res.json();
    setCustomers(result.data || []);
    setIsLoading(false);

    return result.data || [];
  };

  useEffect(() => {
    setIsLoading(true)
    fetchCustomers()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeLink=""/>

      <main className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Klanten</h1>
            <p className="mt-2 text-muted-foreground">Beheer alle gegevens die klanten achtergelaten hebben.</p>
          </div>
          <Link href="/admin/customers/calendar">
            <Button disabled>
              <Calendar className="mr-2 h-4 w-4" />
              Kalender
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Klanten overzicht</CardTitle>
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
            <CardDescription>Bekijk en beheer alle klanten op het platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Alle klanten</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Naam</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefoonnummer</TableHead>
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
                    {!isLoading && filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Geen klanten gevonden in het systeem.
                        </TableCell>
                      </TableRow>
                    ) : (
                      !isLoading && filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell><div className="font-medium">{customer.firstname} {customer.lastname}</div></TableCell>
                          <TableCell><Link href={`mailto:${customer.user.email}`}>{customer.user.email}</Link></TableCell>
                          <TableCell><Link href={`tel:${customer.user.phone}`}>{customer.user.phone}</Link></TableCell>
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
                                <Link href={`/admin/customers/${customer.id}`}>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Bekijken</span>
                                  </DropdownMenuItem>
                                </Link>
                                <Link href={`tel:${customer.user.phone}`}>
                                  <DropdownMenuItem>
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>Bellen</span>
                                  </DropdownMenuItem>
                                </Link>
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
            <div className="text-sm text-muted-foreground">Totaal: {filteredCustomers.length} gebruikers</div>
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
