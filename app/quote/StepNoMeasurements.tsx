import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, CheckIcon, Loader, X } from "lucide-react";
import Link from "next/link";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { AppointmentRequestResponse, appointmentRequestSchema, AppointmentRequestSchema } from "@/domain/services/roofing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { RepresentativeAppointmentResponse, RepresentativeAppointmentSchema, representativeAppointmentSchema } from "@/domain/appointments";


export default function StepNoMeasurements({ formData }: { formData: { service: string | null } }) {

    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const [isNoMeasurementStepButtonLoading, setNoMeasurementStepButtonLoading] = useState(false);

    const form = useForm<RepresentativeAppointmentSchema>({
        resolver: zodResolver(representativeAppointmentSchema),
        defaultValues: {
            fullname: "",
            address: "",
            email: "",
            telephone: "",
            status: "open",
            datetime_planned: new Date(),
            service_id: formData.service
        },
    });

    const onSubmit = async (customerData: RepresentativeAppointmentSchema) => {
        setNoMeasurementStepButtonLoading(true);
        const appointment = await fetch("/api/appointments/representative", {
            method: "POST",
            body: JSON.stringify(customerData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result: RepresentativeAppointmentResponse = await appointment.json();

        if (result.error || result.errors) {
            form.setError("fullname", { message: "Er is iets fout gelopen." });
            setNoMeasurementStepButtonLoading(false);
            return;
        }

        const res = await fetch("/api/mail/send-lead", {
            method: "POST",
            body: JSON.stringify({customerData, appointment_id: result.data.id}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setNoMeasurementStepButtonLoading(false);
        if (!appointment.ok) {
            form.setError("fullname", { message: "Er is iets fout gelopen." });
        } else {
            setInfoSubmitted(true)
        }
    };

    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Geen afmetingen?</CardTitle>
                <CardDescription>
                    Geen probleem. Eén van onze
                    dakexperten komt gratis langs om de
                    opmetingen te doen.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Leave info behind for free inspection form */}
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium mb-2 text-odiyoo">Ontvang een gratis dakinspectie</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Laat je gegevens hieronder achter, en we nemen binnen de 24u contact op.
                    </p>

                    {infoSubmitted ? (
                        <div className="space-y-6">
                            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                                <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="font-medium text-green-800">
                                    Bedankt! Je aanvraag is goed ontvangen.
                                    We bellen je binnen 24u voor een
                                    vrijblijvende afspraak
                                </p>
                                <p className="text-sm text-green-600 mt-1">Bekijk de mail voor de volgende stappen.</p>
                            </div>

                            <p className="text-center font-medium">Wat wil je nu doen?</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-dashed border-primary/50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                                    <h4 className="font-medium mb-2">Hoe te besparen op je dakwerken</h4>
                                    <Link href="/faq" className="text-sm text-muted-foreground">
                                        Ontdek tips en trucs om kosten te besparen bij je dakproject
                                    </Link>
                                </div>

                                <Link href="/signup" className="block">
                                    <div className="border border-dashed border-primary/50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                                        <h4 className="font-medium mb-2">Account maken</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Maak een account aan om je offerte te beheren en updates te ontvangen
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="my-4">
                                    <FormField
                                        control={form.control}
                                        name="fullname"
                                        render={({ field }) => (
                                            <>
                                                <FormLabel htmlFor="fullname">Volledige Naam</FormLabel>
                                                <FormControl>
                                                    <Input id="fullname" type="text" placeholder="Peter Peeters" className="mt-2" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="my-4">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <>
                                                <FormLabel htmlFor="address">Adres</FormLabel>
                                                <FormControl>
                                                    <Input id="address" type="text" placeholder="Stationstraat 1, Tongeren" className="mt-2" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="my-4">
                                    <FormField
                                        control={form.control}
                                        name="telephone"
                                        render={({ field }) => (
                                            <>
                                                <FormLabel htmlFor="telephone">Telefoonnummer</FormLabel>
                                                <FormControl>
                                                    <Input id="telephone" type="tel" placeholder="+32 480 12 34 56" className="mt-2" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="my-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <>
                                                <FormLabel htmlFor="email">E-mailadres</FormLabel>
                                                <FormControl>
                                                    <Input id="email" type="email" placeholder="jouw@email.be" className="mt-2" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full mt-12">
                                    {isNoMeasurementStepButtonLoading ? <Loader className="animate-spin" /> : "Gegevens achterlaten"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </div>
            </CardContent>
        </div>
    )
}