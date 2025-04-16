import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Inloggen bij DakOfferte</CardTitle>
            <CardDescription>Voer je e-mail en wachtwoord in om toegang te krijgen tot je account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="m@voorbeeld.nl" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Wachtwoord</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Wachtwoord vergeten?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Inloggen
            </Button>
            <Separator />
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Doorgaan met Google
              </Button>
              <Button variant="outline" className="w-full">
                Doorgaan met Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              Heb je nog geen account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Registreren
              </Link>
            </div>
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Terug naar home
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
