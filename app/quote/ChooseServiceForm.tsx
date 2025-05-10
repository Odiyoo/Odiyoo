import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateExtrasCost } from "@/domain/contractors";
import { ArrowRight, Check, CheckIcon, Loader, X } from "lucide-react";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { FormData } from "./page"
import Link from "next/link";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/domain/auth";
import { FreeRoofInspectionSchema, freeRoofInspectionSchema } from "@/domain/services/roofing";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

type ChooseServiceFormProps = {
    formData: FormData,
    setFormData: Dispatch<SetStateAction<FormData>>,
    handleStep1Complete: any,
};

type Service = 'dakreiniging' | 'dakrenovatie' | null;

export default function ChooseServiceForm({ formData, setFormData, handleStep1Complete }: ChooseServiceFormProps) {

    const [service, setService] = useState<Service>(null);
    const [isMeasurementKnown, setIsMeasurementKnown] = useState();
    const [subStep, setSubStep] = useState<'ServiceStep' | 'MeasurementStep' | 'NoMeasurementStep' | 'DakreinigingStep' | 'DakrenovatieStep'>('ServiceStep');
    const [subStepContent, setSubStepContent] = useState<React.ReactNode>(step_service(service, setService));
    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const [isNoMeasurementStepButtonLoading, setNoMeasurementStepButtonLoading] = useState(false);

    
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service');
    const measurementsParam = searchParams.get('measurements');

    /* On page load */
    useEffect(() => {
        if (serviceParam && measurementsParam === 'true') {
            setService(serviceParam)
        } else if (serviceParam && measurementsParam === 'false') {
            setSubStep('NoMeasurementStep')
        }
    }, [])    

    const form = useForm<FreeRoofInspectionSchema>({
        resolver: zodResolver(freeRoofInspectionSchema),
        defaultValues: {
            fullname: "",
            address: "",
            email: "",
            telephone: "",
        },
    });

    const onSubmit = async (data: FreeRoofInspectionSchema) => {
        setNoMeasurementStepButtonLoading(true);

        const res = await fetch("/api/quote/free-roof-inspection", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result: {} = await res.json();
        setNoMeasurementStepButtonLoading(false);

        if (!res.ok) {
            form.setError("fullname", { message: "Er is iets fout gelopen." });
        } else {
            setInfoSubmitted(true)
        }
    };

    /* When step changes, show new step */
    useEffect(() => {
        switch (subStep) {
            case 'ServiceStep':
                setSubStepContent(step_service(service, setService))
                break;
            case 'MeasurementStep':
                setSubStepContent(step_measurements(isMeasurementKnown, setIsMeasurementKnown))
                break;
            case 'NoMeasurementStep':
                setSubStepContent(step_no_measurements(infoSubmitted, form, onSubmit, isNoMeasurementStepButtonLoading))
                break;
            default:
                setSubStepContent(step_service(service, setService))
                break;
        }

        console.log(`substep: ${subStep}`)
    }, [subStep])

    /* When service is selected, change step */
    useEffect(() => {
        if (subStep === 'ServiceStep' && service != null) {
            /* let parent know what service has been selected */
            setFormData(formdata => ({...formdata, ["service"]: service}))
            setSubStep('MeasurementStep')
            setIsMeasurementKnown(measurementsParam)
        }
    }, [service])

    /* When measurement info is given, change step */
    useEffect(() => {
        if (subStep === 'MeasurementStep' && isMeasurementKnown !== null) {
            setSubStep(isMeasurementKnown ? handleStep1Complete() : 'NoMeasurementStep')
        }
    }, [isMeasurementKnown])

    return (
        <>
            {subStepContent}
        </>
    );
}

function step_measurements(isMeasurementKnown: boolean | undefined, setIsMeasurementKnown: any) {
    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Offerte</CardTitle>
                <CardDescription>
                    Ken je de oppervlakte van je dak?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-odiyoo`}
                        onClick={() => setIsMeasurementKnown(true)}
                    >
                        <div className="flex gap-4">
                            <CheckIcon className="text-odiyoo" />
                            <div>
                                <h3 className="font-medium">Ja</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ik kan zelf mijn offerte aanvragen
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:border-odiyoo`}
                        onClick={() => setIsMeasurementKnown(false)}
                    >
                        <div className="flex gap-4">
                            <X className="fill-red-600 text-red-600" />
                            <div>
                                <h3 className="font-medium">Nee</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ik zou graag een gratis dakinspectie willen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    )
}

function step_no_measurements(infoSubmitted: boolean, form: any, onSubmit: any, isNoMeasurementStepButtonLoading: boolean) {
    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Offerte</CardTitle>
                <CardDescription>
                    Geen probleem. Eén van onze
                    dakexperten komt gratis langs om de
                    opmetingen te doen.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Leave info behind for free inspection form */}
                <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium mb-2 text-odiyoo">Ontvang een gratis dakinspectie</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Heb je nog geen accurate afmetingen? Geen probleem, laat je gegevens hieronder achter.
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
                                                    <Input id="fullname" type="text" placeholder="Peter Peeters" className="mt-2" {...field} required/>
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
                                                    <Input id="address" type="text" placeholder="Stationstraat 1, Tongeren" className="mt-2" {...field} required/>
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
                                                    <Input id="telephone" type="tel" placeholder="+32 480 12 34 56" className="mt-2" {...field} required/>
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
                                                    <Input id="email" type="email" placeholder="jouw@email.be" className="mt-2" {...field} required/>
                                                </FormControl>
                                                <FormMessage />
                                            </>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full mt-12">
                                    {isNoMeasurementStepButtonLoading ? <Loader className="spin" /> : "Gegevens achterlaten"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </div>
            </CardContent>
        </div>
    )
}

function step_service(service: Service, setService: any) {
    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Offerte</CardTitle>
                <CardDescription>
                    Welke dienst heb je nodig?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${service === 'dakreiniging' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                        onClick={() => setService('dakreiniging')}
                    >
                        <div className="flex gap-4">
                            <img
                                src={"https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets//dakreiniging.webp"}
                                alt="Dakreiniging"
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-medium">Dakreiniging</h3>
                                <p className="text-sm text-muted-foreground">
                                    Vernieuw de uitstraling van uw woning met een grondige dakreiniging.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${service === 'dakrenovatie' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                        onClick={() => setService('dakrenovatie')}
                    >
                        <div className="flex gap-4">
                            <img
                                src={"https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg"}
                                alt="Dakrenovatie"
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-medium">Dakrenovatie</h3>
                                <p className="text-sm text-muted-foreground">
                                    Vernieuw uw woning met een dakrenovatie.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    )
}