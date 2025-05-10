"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { CUSTOMER_SUPPORT_PHONE } from "@/domain/business";
import Link from "next/link";

export default function AppointmentPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container py-12">

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 max-w-5xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Afspraak inplannen</h1>
                            <p className="mt-2 text-muted-foreground">
                                Voorlopig is het alleen mogelijk om telefonisch een afspraak in te plannen. Bel ons gerust, we staan voor u klaar.
                            </p>
                            <Link href={`tel:${CUSTOMER_SUPPORT_PHONE}`}>
                                <Button className="mt-6">Bel ons</Button>
                            </Link>
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </main>
            <Footer/>
        </div>
    )
}
