import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Maak een account aan</CardTitle>
            <CardDescription>Registreer om aan de slag te gaan met DakOfferte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Voornaam</Label>
                <Input id="first-name" placeholder="Jan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Achternaam</Label>
                <Input id="last-name" placeholder="Jansen" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="m@voorbeeld.nl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Bevestig wachtwoord</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Account aanmaken
            </Button>
            <Separator />
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Registreren met Google
              </Button>
              <Button variant="outline" className="w-full">
                Registreren met Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              Heb je al een account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Inloggen
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              Door te registreren ga je akkoord met onze{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Algemene voorwaarden
              </Link>{" "}
              en{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacybeleid
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
