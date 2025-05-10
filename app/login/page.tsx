"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginResponse, loginSchema, LoginSchema } from "@/domain/auth"
import { useRouter } from 'next/navigation'
import Navbar from "@/components/navbar"


export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: LoginResponse = await res.json();
    setLoading(false);

    if (!res.ok) {
      form.setError("email", { message: "Inloggen mislukt" });
    } else {
      // TODO: store user role in session? or fetch

      // if admin redirect to admin dashboard
      if (result.data.user_role === "admin") {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Inloggen bij Odiyoo</CardTitle>
            <CardDescription>Voer je e-mail en wachtwoord in om toegang te krijgen tot je account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="my-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="m@voorbeeld.be" className="mt-2" {...field} />
                        </FormControl>
                        <FormMessage />
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
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel htmlFor="password">Wachtwoord</FormLabel>
                          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                            Wachtwoord vergeten?
                          </Link>
                        </div>
                        <FormControl>
                          <Input id="password" type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full mt-6">
                  {loading ? "Inloggen..." : "Inloggen"}
                </Button>
                <Separator className="my-4" />
                <div>
                  <Button variant="outline" className="w-full mb-2">
                    Doorgaan met Google
                  </Button>
                  <Button variant="outline" className="w-full mb-2">
                    Doorgaan met Facebook
                  </Button>
                </div>
              </form>
            </Form>

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
