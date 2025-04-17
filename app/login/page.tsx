"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { login, signup } from "@/domain/authActions"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema, LoginSchema } from "@/domain/auth"
import { redirect } from 'next/navigation'


export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    console.log(data);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      form.setError("email", { message: result.message || "Inloggen mislukt" });
    } else {
      redirect('/dashboard'); // TODO: is this used on client or server?
      //window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Inloggen bij Odiyoo</CardTitle>
            <CardDescription>Voer je e-mail en wachtwoord in om toegang te krijgen tot je account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="m@voorbeeld.be" {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Wachtwoord</FormLabel>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Wachtwoord vergeten?
                        </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" placeholder="********" {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </div>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {loading ? "Inloggen..." : "Inloggen"}
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
