import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateExtrasCost } from "@/domain/contractors";
import { ArrowRight, Check, CheckIcon, Loader, X } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { FormData } from "./page"
import Link from "next/link";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/domain/auth";
import { FreeRoofInspectionSchema, freeRoofInspectionSchema } from "@/domain/services/roofing";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

type SidebarProps = {
    formData: FormData,
    setFormData: any,
    handleStep1Complete: any,
};

type Service = 'dakreiniging' | 'dakrenovatie' | null;

export default function StepOne({ formData, setFormData, handleStep1Complete }: SidebarProps) {

    const [service, setService] = useState<Service>(null);
    const [isMeasurementKnown, setIsMeasurementKnown] = useState();
    const [subStep, setSubStep] = useState<'ServiceStep' | 'MeasurementStep' | 'NoMeasurementStep' | 'DakreinigingStep' | 'DakrenovatieStep'>('ServiceStep');
    const [subStepContent, setSubStepContent] = useState<React.ReactNode>(step_service(service, setService));
    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const [isNoMeasurementStepButtonLoading, setNoMeasurementStepButtonLoading] = useState(false);

    const addressInputRef = useRef(null)
    const addressRef = useRef<any>(null)
    const { isLoaded: hasGmapsLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyARTWcUUS8RHo9FZOCA4bnF8VxXUU0wcRk", //process.env.NEXT_PUBLIC_GMAPS_API_KEY!,
        libraries: ['places']
    })

    
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service');
    const measurementsParam = searchParams.get('measurements');

    /* On page load */
    useEffect(() => {
        if (serviceParam && measurementsParam === 'true') {
            if (serviceParam === 'dakreiniging') {
                setSubStep('DakreinigingStep')
            } else if (serviceParam === 'dakrenovatie') {
                setSubStep('DakrenovatieStep')
            }
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
            case 'DakrenovatieStep':
                setSubStepContent(step_dakrenovatie(formData, setFormData, addressRef, addressInputRef, hasGmapsLoaded))
                break;
            case 'DakreinigingStep':
                setSubStepContent(step_dakreiniging(formData, setFormData, addressRef, addressInputRef, hasGmapsLoaded))
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
            setSubStep('MeasurementStep')
        }
    }, [service])

    /* When measurement info is given, change step */
    useEffect(() => {
        if (subStep === 'MeasurementStep') {
            setSubStep(isMeasurementKnown ? (service === 'dakreiniging' ? 'DakreinigingStep' : 'DakrenovatieStep') : 'NoMeasurementStep')
        }
    }, [isMeasurementKnown])

    return (
        <>
            {subStepContent}
            <CardFooter className="flex justify-end">
                {(subStep === 'DakreinigingStep' || subStep === 'DakrenovatieStep') && <Button onClick={handleStep1Complete} disabled={!formData.address}>
                    Volgende
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>}
            </CardFooter>
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
                        onClick={() => setService('dakreiniging')}
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

function step_dakrenovatie(formData: FormData, setFormData: any, addressRef: RefObject<any>, addressInputRef: RefObject<null>, hasGmapsLoaded: any) {


    const handleSelectChange = (name: any, value: any) => {
        setFormData((prev: FormData) => ({ ...prev, [name]: value }))
    }

    // Add a function to handle roof color selection
    const handleRoofColorSelect = (color: string) => {
        setFormData((prev: FormData) => ({ ...prev, roofColor: color }))
    }

    // Add a function to toggle extras as buttons
    const toggleExtra = (name: string) => {
        setFormData((prev: FormData) => ({
            ...prev,
            extras: {
                ...prev.extras,
                [name]: !prev.extras[name],
            },
        }))
    }

    // The extras images
    const extrasImages = {
        insulation: "https://andrecelis.be/media/wysiwyg/AC/algemeen/Andre-Celis-Isolatie-04.jpg",
        gutters: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/o/v/ovation.jpg",
        solarPanels: "https://zonneplan-site.s3.amazonaws.com/uploads/2023/06/zonnepanelen-die-warmte-tegenhouden-2.png",
        skylights:
            "https://i0.wp.com/dakraamkopen.be/wp-content/uploads/2021/04/VELUX-GGLS-2in1-Asymmetrisch.jpg?fit=1280%2C888&ssl=1",
        facadeCladding:
            "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg",
    }

    // Material images
    const materialImages = {
        dakpannen: {
            antraciet:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-antraciet-foto.jpg",
            rood: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-rood-foto.jpg",
        },
        leien: {
            natuurleien:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/n/a/natuurleien_2.jpg",
            kunstleien:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/a/l/alterna-donkergrijs_9.jpg",
        },
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleOnPlacesChanged = () => {
        let address = addressRef.current.getPlaces();
    }

    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Gegevens voor je dakofferte</CardTitle>
                <CardDescription>
                    Vul je adres en dakgegevens in om een nauwkeurige offerte te krijgen.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Address Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <div className="space-y-2 relative" ref={addressInputRef}>
                        <Label htmlFor="address">Adres</Label>
                        {hasGmapsLoaded && <StandaloneSearchBox
                            onLoad={(ref) => addressRef.current = ref}
                            onPlacesChanged={handleOnPlacesChanged}>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Begin met typen voor suggesties..."
                                className="w-full"
                            />
                        </StandaloneSearchBox>
                        }
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roofSize">Geschatte dakgrootte (m²)</Label>
                        <Input
                            id="roofSize"
                            name="roofSize"
                            value={formData.roofSize}
                            onChange={handleInputChange}
                            placeholder="150"
                            type="number"
                        />
                        <p className="text-xs text-muted-foreground">
                            Weet je de grootte van je dak niet? Geen probleem! We kunnen het schatten op basis van je
                            adres.
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Roof Materials Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <h4 className="font-medium">Dakbedekking</h4>
                    <Tabs defaultValue="dakpannen" onValueChange={(value) => handleSelectChange("roofType", value)}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="dakpannen" className="hover:text-odiyoo focus:text-odiyoo">Dakpannen</TabsTrigger>
                            <TabsTrigger value="leien" className="hover:text-odiyoo focus:text-odiyoo">Leien</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dakpannen" className="mt-4 space-y-4">
                            <div className="rounded-lg border p-4">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-odiyoo">Dakpannen</h3>
                                        <p className="text-muted-foreground">
                                            Klassieke uitstraling met uitstekende duurzaamheid. Dakpannen zijn een populaire keuze
                                            voor woningen in België.
                                        </p>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium">Voordelen:</h4>
                                                <ul className="ml-4 list-disc text-sm">
                                                    <li>50+ jaar levensduur</li>
                                                    <li>Goede isolatie</li>
                                                    <li>Klassieke uitstraling</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Nadelen:</h4>
                                                <ul className="ml-4 list-disc text-sm">
                                                    <li>Zwaarder dan andere materialen</li>
                                                    <li>Kan meer onderhoud vereisen</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="font-medium mb-2">Kies een kleur:</h4>
                                        <div className="flex gap-4">
                                            <div
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "antraciet" ? "border-odiyoo border-2" : "border-gray-200"}`}
                                                onClick={() => handleRoofColorSelect("antraciet")}
                                            >
                                                <img
                                                    src={materialImages.dakpannen.antraciet || "/placeholder.svg"}
                                                    alt="Antraciet dakpannen"
                                                    className="w-32 h-32 object-cover"
                                                />
                                                <div className="p-2 text-center text-sm">Antraciet</div>
                                            </div>
                                            <div
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "rood" ? "border-odiyoo border-2" : "border-gray-200"}`}
                                                onClick={() => handleRoofColorSelect("rood")}
                                            >
                                                <img
                                                    src={materialImages.dakpannen.rood || "/placeholder.svg"}
                                                    alt="Rode dakpannen"
                                                    className="w-32 h-32 object-cover"
                                                />
                                                <div className="p-2 text-center text-sm">Rood</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="leien" className="mt-4 space-y-4">
                            <div className="rounded-lg border p-4">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-odiyoo">Leien</h3>
                                        <p className="text-muted-foreground">
                                            Premium dakbedekking met ongeëvenaarde levensduur en elegante uitstraling. Leien zijn
                                            een duurzame keuze voor uw dak.
                                        </p>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium">Voordelen:</h4>
                                                <ul className="ml-4 list-disc text-sm">
                                                    <li>100+ jaar levensduur (natuurleien)</li>
                                                    <li>Elegante, natuurlijke uitstraling</li>
                                                    <li>Brand- en weerbestendig</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Nadelen:</h4>
                                                <ul className="ml-4 list-disc text-sm">
                                                    <li>Hogere kosten</li>
                                                    <li>Vereist vakkundige installatie</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="font-medium mb-2">Kies een type:</h4>
                                        <div className="flex gap-4">
                                            <div
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "natuurleien" ? "border-odiyoo border-2" : "border-gray-200"}`}
                                                onClick={() => handleRoofColorSelect("natuurleien")}
                                            >
                                                <img
                                                    src={materialImages.leien.natuurleien || "/placeholder.svg"}
                                                    alt="Natuurleien"
                                                    className="w-32 h-32 object-cover"
                                                />
                                                <div className="p-2 text-center text-sm">Natuurleien</div>
                                            </div>
                                            <div
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "kunstleien" ? "border-odiyoo border-2" : "border-gray-200"}`}
                                                onClick={() => handleRoofColorSelect("kunstleien")}
                                            >
                                                <img
                                                    src={materialImages.leien.kunstleien || "/placeholder.svg"}
                                                    alt="Kunstleien"
                                                    className="w-32 h-32 object-cover"
                                                />
                                                <div className="p-2 text-center text-sm">Kunstleien</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <Separator />

                {/* Extras Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Extra's</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.insulation ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("insulation")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.insulation || "/placeholder.svg"}
                                    alt="Dakisolatie"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Dakisolatie</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Verbeter de energie-efficiëntie van je huis met hoogwaardige dakisolatie.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €2.500</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.gutters ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("gutters")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.gutters || "/placeholder.svg"}
                                    alt="Dakgoten"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Nieuwe dakgoten</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Vervang of installeer nieuwe dakgoten om regenwater effectief af te voeren.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €1.200</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.solarPanels ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("solarPanels")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.solarPanels || "/placeholder.svg"}
                                    alt="Zonnepanelen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Zonnepanelen</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Profiteer van duurzame energie door zonnepanelen te laten installeren.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €5.000</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.skylights ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("skylights")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.skylights || "/placeholder.svg"}
                                    alt="Dakramen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Dakramen</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Laat meer natuurlijk licht binnen met hoogwaardige dakramen.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €1.800</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("facadeCladding")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.facadeCladding || "/placeholder.svg"}
                                    alt="Gevelbekleding"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Gevelbekleding</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Vernieuw de uitstraling van uw woning met moderne gevelbekleding.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €3.200</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mt-6">
                        <h3 className="font-medium mb-2">Geselecteerde extra's:</h3>
                        <ul className="space-y-1">
                            {formData.extras.insulation && (
                                <li className="flex justify-between">
                                    <span>Dakisolatie</span>
                                    <span>€2.500</span>
                                </li>
                            )}
                            {formData.extras.gutters && (
                                <li className="flex justify-between">
                                    <span>Nieuwe dakgoten</span>
                                    <span>€1.200</span>
                                </li>
                            )}
                            {formData.extras.solarPanels && (
                                <li className="flex justify-between">
                                    <span>Zonnepanelen</span>
                                    <span>€5.000</span>
                                </li>
                            )}
                            {formData.extras.skylights && (
                                <li className="flex justify-between">
                                    <span>Dakramen</span>
                                    <span>€1.800</span>
                                </li>
                            )}
                            {formData.extras.facadeCladding && (
                                <li className="flex justify-between">
                                    <span>Gevelbekleding</span>
                                    <span>€3.200</span>
                                </li>
                            )}
                            {!formData.extras.insulation &&
                                !formData.extras.gutters &&
                                !formData.extras.solarPanels &&
                                !formData.extras.skylights &&
                                !formData.extras.facadeCladding && (
                                    <li className="text-muted-foreground">Geen extra's geselecteerd</li>
                                )}
                        </ul>
                        {(formData.extras.insulation ||
                            formData.extras.gutters ||
                            formData.extras.solarPanels ||
                            formData.extras.skylights ||
                            formData.extras.facadeCladding) && (
                                <>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-medium">
                                        <span>Totaal extra's:</span>
                                        <span>€{calculateExtrasCost(formData.roofSize, formData.extras.insulation, formData.extras.gutters, formData.extras.solarPanels, formData.extras.skylights, formData.extras.facadeCladding).toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </CardContent>
        </div>
    )
}

function step_dakreiniging(formData: FormData, setFormData: any, addressRef: RefObject<any>, addressInputRef: RefObject<null>, hasGmapsLoaded: any) {


    const handleSelectChange = (name: any, value: any) => {
        setFormData((prev: FormData) => ({ ...prev, [name]: value }))
    }

    // Add a function to handle roof color selection
    const handleRoofColorSelect = (color: string) => {
        setFormData((prev: FormData) => ({ ...prev, roofColor: color }))
    }

    // Add a function to toggle extras as buttons
    const toggleExtra = (name: string) => {
        setFormData((prev: FormData) => ({
            ...prev,
            extras: {
                ...prev.extras,
                [name]: !prev.extras[name],
            },
        }))
    }

    // The extras images
    const extrasImages = {
        insulation: "https://andrecelis.be/media/wysiwyg/AC/algemeen/Andre-Celis-Isolatie-04.jpg",
        gutters: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/o/v/ovation.jpg",
        solarPanels: "https://zonneplan-site.s3.amazonaws.com/uploads/2023/06/zonnepanelen-die-warmte-tegenhouden-2.png",
        skylights:
            "https://i0.wp.com/dakraamkopen.be/wp-content/uploads/2021/04/VELUX-GGLS-2in1-Asymmetrisch.jpg?fit=1280%2C888&ssl=1",
        facadeCladding:
            "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg",
    }

    // Material images
    const materialImages = {
        dakpannen: {
            antraciet:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-antraciet-foto.jpg",
            rood: "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/s/n/sneldek-classic-rood-foto.jpg",
        },
        leien: {
            natuurleien:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/n/a/natuurleien_2.jpg",
            kunstleien:
                "https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/a/l/alterna-donkergrijs_9.jpg",
        },
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleOnPlacesChanged = () => {
        let address = addressRef.current.getPlaces();
    }

    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Gegevens voor je dakofferte</CardTitle>
                <CardDescription>
                    Vul je adres en dakgegevens in om een nauwkeurige offerte te krijgen.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Address Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <div className="space-y-2 relative" ref={addressInputRef}>
                        <Label htmlFor="address">Adres</Label>
                        {hasGmapsLoaded && <StandaloneSearchBox
                            onLoad={(ref) => addressRef.current = ref}
                            onPlacesChanged={handleOnPlacesChanged}>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Begin met typen voor suggesties..."
                                className="w-full"
                            />
                        </StandaloneSearchBox>
                        }
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roofSize">Geschatte dakgrootte (m²)</Label>
                        <Input
                            id="roofSize"
                            name="roofSize"
                            value={formData.roofSize}
                            onChange={handleInputChange}
                            placeholder="150"
                            type="number"
                        />
                        <p className="text-xs text-muted-foreground">
                            Weet je de grootte van je dak niet? Geen probleem! We kunnen het schatten op basis van je
                            adres.
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Extras Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Wat wil je laten reinigen?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.insulation ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("insulation")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96eynjrTZGPk9O4KPH5o7nETjH4b6pZt9sw&s"}
                                    alt="dakpannen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Dakpannen of leien</h3>
                                    <p className="text-sm text-muted-foreground">
                                    Asbesthoudende leien kunnen we om veiligheidsredenen niet reinigen.
                                    </p>
                                    <p className="text-sm font-medium mt-1">≈ €2.500</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.gutters ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("gutters")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.gutters || "/placeholder.svg"}
                                    alt="Gootsystemen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Gootsystemen</h3>
                                    <p className="text-sm font-medium mt-1">≈ €1.200</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.solarPanels ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("solarPanels")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.solarPanels || "/placeholder.svg"}
                                    alt="Zonnepanelen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Zonnepanelen</h3>
                                    <p className="text-sm font-medium mt-1">≈ €5.000</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.skylights ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("skylights")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.skylights || "/placeholder.svg"}
                                    alt="Veluxramen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Veluxramen</h3>
                                    <p className="text-sm font-medium mt-1">≈ €1.800</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("facadeCladding")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={"https://www.mijn-dakwerker.be/wp-content/uploads/dakpan-beton.jpg"}
                                    alt="Schoorsteen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Schoorsteen</h3>
                                    <p className="text-sm font-medium mt-1">≈ €3.200</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("facadeCladding")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={"https://iko.xcdn.nl/Dak-Renovatie_sfeerbeeld1.jpg?f=rs:fit:800:600:0:0"}
                                    alt="aquaplan coating"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Coating met Aquaplan</h3>
                                    <p className="text-sm font-medium mt-1">≈ €3.200</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleExtra("facadeCladding")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.facadeCladding || "/placeholder.svg"}
                                    alt="ik weet het niet"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Ik weet het nog niet zeker</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mt-6">
                        <h3 className="font-medium mb-2">Geselecteerde extra's:</h3>
                        <ul className="space-y-1">
                            {formData.extras.insulation && (
                                <li className="flex justify-between">
                                    <span>Dakisolatie</span>
                                    <span>€2.500</span>
                                </li>
                            )}
                            {formData.extras.gutters && (
                                <li className="flex justify-between">
                                    <span>Nieuwe dakgoten</span>
                                    <span>€1.200</span>
                                </li>
                            )}
                            {formData.extras.solarPanels && (
                                <li className="flex justify-between">
                                    <span>Zonnepanelen</span>
                                    <span>€5.000</span>
                                </li>
                            )}
                            {formData.extras.skylights && (
                                <li className="flex justify-between">
                                    <span>Dakramen</span>
                                    <span>€1.800</span>
                                </li>
                            )}
                            {formData.extras.facadeCladding && (
                                <li className="flex justify-between">
                                    <span>Gevelbekleding</span>
                                    <span>€3.200</span>
                                </li>
                            )}
                            {!formData.extras.insulation &&
                                !formData.extras.gutters &&
                                !formData.extras.solarPanels &&
                                !formData.extras.skylights &&
                                !formData.extras.facadeCladding && (
                                    <li className="text-muted-foreground">Geen extra's geselecteerd</li>
                                )}
                        </ul>
                        {(formData.extras.insulation ||
                            formData.extras.gutters ||
                            formData.extras.solarPanels ||
                            formData.extras.skylights ||
                            formData.extras.facadeCladding) && (
                                <>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-medium">
                                        <span>Totaal extra's:</span>
                                        <span>€{calculateExtrasCost(formData.roofSize, formData.extras.insulation, formData.extras.gutters, formData.extras.solarPanels, formData.extras.skylights, formData.extras.facadeCladding).toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </CardContent>
        </div>
    )
}