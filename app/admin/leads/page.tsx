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

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [leads, setLeads] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getStatusColor = (status: AppointmentRequestStatus | null) => {
    switch (status) {
      case 'dakinspectie_gevraagd':
        return 'bg-orange-100 text-orange-800'
      
      case 'offerte_aangemaakt':
        return 'bg-green-100 text-green-800'
    
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: 'open' | 'gesloten' | null) => { //AppointmentRequestStatus
    switch (status) {
      case 'open':
        return 'Lauwe lead'
      
      case 'gesloten':
        return 'Warme lead'
    
      default:
        return 'Lauwe lead'
    }
  }

  const getStatus = (status: 'open' | 'gesloten' | null) => {
    switch (status) {
      case 'open':
        return 'Dakinspectie gevraagd'
      
      case 'gesloten':
        return 'Afgehandeld'
    
      default:
        return 'Lauwe lead'
    }
  }

  // Filter quotes based on search term and active tab
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service_id.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "open") return matchesSearch && lead.status === 'open'
    if (activeTab === "gesloten") return matchesSearch && lead.status === 'gesloten'

    return matchesSearch
  })

  const fetchLeads = async () => {

    const res = await fetch("/api/leads", {
      method: "GET",
    });

    const result = await res.json();
    setLeads(result.data || []);
    setIsLoading(false);

    return result.data || [];
  };

  useEffect(() => {
    setIsLoading(true)
    fetchLeads()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeLink="leads"/>

      <main className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="mt-2 text-muted-foreground">Beheer alle gegevens die klanten achtergelaten hebben.</p>
          </div>
          <Link href="/admin/leads/calendar">
            <Button disabled>
              <Calendar className="mr-2 h-4 w-4" />
              Kalender
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Leads overzicht</CardTitle>
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
            <CardDescription>Bekijk en beheer alle leads op het platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Alle leads</TabsTrigger>
                <TabsTrigger value="open">Dakinspectie gevraagd</TabsTrigger>
                <TabsTrigger value="gesloten">Afgehandeld</TabsTrigger>
              </TabsList>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Naam</TableHead>
                      <TableHead>Adres</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefoonnummer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
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
                    {!isLoading && filteredLeads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Geen leads gevonden in het systeem.
                        </TableCell>
                      </TableRow>
                    ) : (
                      !isLoading && filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell><div className="font-medium">{lead.fullname}</div></TableCell>
                          <TableCell>{lead.address}</TableCell>
                          <TableCell><Link href={`mailto:${lead.email}`}>{lead.email}</Link></TableCell>
                          <TableCell><Link href={`tel:${lead.telephone}`}>{lead.telephone}</Link></TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(lead.status)}`}
                            >
                              {getStatusText(lead.status)}
                            </div>
                          </TableCell>
                          <TableCell><div className="font-medium">{capitalize(lead.service_id)}</div></TableCell>
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
                                <Link href={`/admin/leads/${lead.id}`}>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Bekijken</span>
                                  </DropdownMenuItem>
                                </Link>
                                <Link href={`tel:${lead.telephone}`}>
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
            <div className="text-sm text-muted-foreground">Totaal: {filteredLeads.length} leads</div>
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
