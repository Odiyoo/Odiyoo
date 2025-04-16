"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Home, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function AddContractorPage() {
  const [profileImage, setProfileImage] = useState(null)
  const [projectImages, setProjectImages] = useState([])
  const [activeTab, setActiveTab] = useState("basic")

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle project images upload
  const handleProjectImagesChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newImages = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target.result)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImages).then((images) => {
        setProjectImages((prev) => [...prev, ...images])
      })
    }
  }

  // Remove project image
  const removeProjectImage = (index) => {
    setProjectImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    console.log("Form submitted")
    alert("Aannemer succesvol toegevoegd!")
  }

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
        <div className="mb-8">
          <Link
            href="/admin/contractors"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar aannemers
          </Link>
          <h1 className="text-3xl font-bold">Aannemer toevoegen</h1>
          <p className="mt-2 text-muted-foreground">Voeg een nieuwe aannemer toe aan het platform.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basisinformatie</CardTitle>
                  <CardDescription>Voer de basisgegevens van de aannemer in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Bedrijfsnaam</Label>
                      <Input id="name" placeholder="Bedrijfsnaam" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mailadres</Label>
                      <Input id="email" type="email" placeholder="info@bedrijf.nl" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input id="phone" placeholder="+31 6 12345678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://www.bedrijf.nl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Plaats</Label>
                      <Input id="city" placeholder="Amsterdam" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Ervaring</Label>
                      <Input id="experience" placeholder="15+ jaar" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Beschrijving</Label>
                    <Textarea
                      id="description"
                      placeholder="Beschrijving van het bedrijf en de diensten"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Extra opties</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bankruptcy-protection" />
                        <label
                          htmlFor="bankruptcy-protection"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Faillissementsbescherming
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="has-showroom" />
                        <label
                          htmlFor="has-showroom"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Heeft showroom
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="showroom-address">Showroom adres</Label>
                    <Input id="showroom-address" placeholder="Adres van de showroom" />
                    <p className="text-xs text-muted-foreground">Alleen invullen als de aannemer een showroom heeft</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prijsinformatie</CardTitle>
                  <CardDescription>Voer de prijsinformatie van de aannemer in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Materiaalkosten</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="demolition-cost">Afbraakwerken (per m²)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            €
                          </span>
                          <Input
                            id="demolition-cost"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carpentry-cost">Timmerwerken (per m²)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            €
                          </span>
                          <Input
                            id="carpentry-cost"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insulation-cost">Isolatie (per m²)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            €
                          </span>
                          <Input
                            id="insulation-cost"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roofing-cost">Dakbedekking (per m²)</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            €
                          </span>
                          <Input
                            id="roofing-cost"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-8"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Prijsmodifiers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tiles-modifier">Dakpannen modifier</Label>
                        <Input id="tiles-modifier" type="number" step="0.01" min="0" placeholder="1.0" />
                        <p className="text-xs text-muted-foreground">1.0 = standaard prijs, 1.1 = 10% duurder</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slate-modifier">Leien modifier</Label>
                        <Input id="slate-modifier" type="number" step="0.01" min="0" placeholder="1.0" />
                        <p className="text-xs text-muted-foreground">1.0 = standaard prijs, 0.9 = 10% goedkoper</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="labor-rate">Arbeidskosten modifier</Label>
                      <Input id="labor-rate" type="number" step="0.01" min="0" placeholder="1.0" />
                      <p className="text-xs text-muted-foreground">1.0 = standaard tarief</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projectfoto's</CardTitle>
                  <CardDescription>Upload foto's van eerdere projecten van de aannemer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {projectImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Project ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          type="button"
                          onClick={() => removeProjectImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label
                      htmlFor="project-images"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Upload foto's</p>
                      </div>
                      <input
                        id="project-images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleProjectImagesChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload minimaal 3 foto's van eerdere projecten. Maximaal 10 foto's.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profielfoto</CardTitle>
                  <CardDescription>Upload een logo of profielfoto van de aannemer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    {profileImage ? (
                      <div className="relative group">
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profielfoto"
                          className="h-40 w-40 object-cover rounded-full"
                        />
                        <button
                          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          type="button"
                          onClick={() => setProfileImage(null)}
                        >
                          <Trash2 className="h-6 w-6" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="profile-image"
                        className="flex flex-col items-center justify-center h-40 w-40 border-2 border-dashed rounded-full cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground text-center">Upload logo</p>
                        </div>
                      </label>
                    )}
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Upload een logo of profielfoto van de aannemer. Aanbevolen formaat: vierkant, minimaal 200x200
                    pixels.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>Stel de status van de aannemer in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active-status" defaultChecked />
                    <label
                      htmlFor="active-status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Actief
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Actieve aannemers worden getoond in de offerte tool. Inactieve aannemers zijn verborgen voor
                    gebruikers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Garantie & Beschikbaarheid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="warranty">Garantie</Label>
                    <Input id="warranty" placeholder="20 jaar op materiaal, 10 jaar op arbeid" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Beschikbaarheid</Label>
                    <Input id="availability" placeholder="Binnen 3 weken" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link href="/admin/contractors">
              <Button variant="outline">Annuleren</Button>
            </Link>
            <Button type="submit">Aannemer toevoegen</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
