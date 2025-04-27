"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signupSchema, SignupSchema } from "@/domain/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import Navbar from "@/components/navbar"

export default function SignupPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      form.setError("email", { message: result.message || "Registreren mislukt" });
    } else {
      // TODO: store user role in session? or fetch
      router.push('/dashboard');
      //window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar/>
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Maak een account aan</CardTitle>
            <CardDescription>Registreer om aan de slag te gaan met Odiyoo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="first-name">Voornaam</FormLabel>
                          <FormControl>
                            <Input id="first-name" placeholder="Jan"  {...field}/>
                          </FormControl>
                          <FormMessage/>
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="last-name">Achternaam</FormLabel>
                          <FormControl>
                            <Input id="last-name" placeholder="Jansen"  {...field}/>
                          </FormControl>
                          <FormMessage/>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="jouw@email.be"  {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </>
                    )}
                  />
                </div>
                <div className="my-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <FormLabel htmlFor="password">Wachtwoord</FormLabel>
                        <FormControl>
                          <Input id="password" type="password" {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </>
                    )}
                  />
                </div>
                <div className="my-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <FormLabel htmlFor="confirm-password">Bevestig wachtwoord</FormLabel>
                        <FormControl>
                          <Input id="confirm-password" type="password" {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-6">
                  {loading ? "..." : "Account aanmaken"}
                </Button>
                <Separator className="my-4" />
                <div className="my-4">
                  <Button variant="outline" className="w-full mb-2">
                    Registreren met Google
                  </Button>
                  <Button variant="outline" className="w-full mb-2">
                    Registreren met Facebook
                  </Button>
                </div>
              </form>
            </Form>
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
