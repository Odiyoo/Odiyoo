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
import { FormData } from "./Form"
import { DakgotenChoice, DakraamChoice, InsulationChoice } from "@/domain/contractors"
import Link from "next/link";
import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/domain/auth";
//import { FreeRoofInspectionSchema, freeRoofInspectionSchema } from "@/domain/services/roofing";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import StartOverLink from "../StartOverLink";

type SidebarProps = {
    formData: FormData,
    setFormData: any,
    handleStep1Complete: any,
    hasGmapsLoaded: boolean,
};


export default function StepOne({ formData, setFormData, handleStep1Complete, hasGmapsLoaded }: SidebarProps) {

    const addressInputRef = useRef(null)
    const addressRef = useRef<any>(null)

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

    const selectInsulation = (choice: InsulationChoice) => {
        setFormData((prev: FormData) => ({ ...prev, insulation: choice }))
    }

    const selectDakgoten = (choice: DakgotenChoice) => {
        setFormData((prev: FormData) => ({ ...prev, dakgoten: choice }))
    }

    const selectDakraam = (choice: DakraamChoice) => {
        setFormData((prev: FormData) => ({ ...prev, dakraam: choice }))
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
        let address = addressRef.current.getPlaces()[0].formatted_address;
        setFormData((prev: any) => ({ ...prev, address }))
    }

    const canGoToNextStep = (
        formData.address &&
        formData.roofSize &&
        (formData.roofType ||
            formData.insulation ||
            formData.dakgoten ||
            formData.dakraam)
    )


    return (
        <>
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
                    <h4 className="font-medium text-odiyoo">Dakbedekking</h4>
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

                {/* Keuze Isolatie */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Isolatie</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.insulation === 'geen' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectInsulation("geen")}
                        >
                            <div>
                                <h3 className="font-medium">Geen</h3>
                                <p className="text-sm text-muted-foreground">
                                    Behoudt je huidige isolatie.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.insulation === '10cm' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectInsulation("10cm")}
                        >
                            <div>
                                <h3 className="font-medium">10 cm</h3>
                                <p className="text-sm text-muted-foreground">
                                    Minimaal.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.insulation === '12cm' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectInsulation("12cm")}
                        >
                            <div>
                                <h3 className="font-medium">12 cm</h3>
                                <p className="text-sm text-muted-foreground">
                                    Populair.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.insulation === '14cm' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectInsulation("14cm")}
                        >
                            <div>
                                <h3 className="font-medium">14 cm</h3>
                                <p className="text-sm text-muted-foreground">
                                    Aangeraden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keuze Dakgoten */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Dakgoten</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakgoten === 'niet vervangen' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakgoten("niet vervangen")}
                        >
                            <div>
                                <h3 className="font-medium">Niet vervangen</h3>
                                <p className="text-sm text-muted-foreground">
                                    Behoudt je huidige situatie.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakgoten === 'zinken goot' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakgoten("zinken goot")}
                        >
                            <div className="mb-4">
                                <h3 className="font-medium">Zinken goot</h3>
                                <p className="text-sm text-muted-foreground">
                                </p>
                            </div>
                            <img src="https://nubuiten.imgix.net/2020/07/dak_dakgoten_zinkendakgoot.jpg?auto=format%2Ccompress&ixlib=php-3.3.0"
                                alt="Zinken dakgoot afbeelding"
                                className="w-full h-28 object-cover rounded-md" />

                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakgoten === 'bekleden' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakgoten("bekleden")}
                        >
                            <div className="mb-4">
                                <h3 className="font-medium">Bekleden (uittimmeren)</h3>
                                <p className="text-sm text-muted-foreground">
                                </p>
                            </div>
                            <img src="https://cdn.zilvercms.nl/http://hepro.zilvercdn.nl/uploads/webshop/173573_Reference_Roofline_Bissegem_BE_Low-0.JPG"
                                alt="Goot bekleding afbeelding"
                                className="w-full h-28 object-cover rounded-md" />

                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakgoten === 'hanggoot' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakgoten("hanggoot")}
                        >
                            <div className="mb-4">
                                <h3 className="font-medium">Hanggoot</h3>
                                <p className="text-sm text-muted-foreground">
                                </p>
                            </div>
                            <img src="https://www.bobex.be/wp-uploads/sites/5/hanggoot-aluminium-rood-oranje-pvc-1024x538.jpg"
                                alt="Hanggoot afbeelding"
                                className="w-full h-28 object-cover rounded-md"
                            />

                        </div>
                    </div>
                    {formData.dakgoten != "niet vervangen" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="lopendeMeterDakgoot">Lopende meter</Label>
                                <Input
                                    id="lopendeMeterDakgoot"
                                    name="lopendeMeterDakgoot"
                                    value={formData.lopendeMeterDakgoot}
                                    onChange={handleInputChange}
                                    placeholder="25"
                                    type="number"
                                />
                            </div>
                            <Separator />
                        </>
                    )}
                </div>

                {/* Keuze Dakraam */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Dakraam</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakraam === 'geen' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakraam("geen")}
                        >
                            <div>
                                <h3 className="font-medium">Geen</h3>
                                <p className="text-sm text-muted-foreground">
                                    Behoudt je huidige situatie.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakraam === 'tuimelvenster' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakraam("tuimelvenster")}
                        >
                            <div className="mb-4">
                                <h3 className="font-medium">Tuimelvenster</h3>
                                <p className="text-sm text-muted-foreground">
                                </p>
                            </div>
                            <img
                                src={"https://dakramen.veluxshop.nl/-/media/roofwindowshop/productimages/inside/windows/ggu.png"}
                                alt="Tuimelvenster"
                                className="w-24 h-24 object-cover rounded-md"
                            />

                        </div>
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.dakraam === 'uitzettuimelvenster' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => selectDakraam("uitzettuimelvenster")}
                        >
                            <div className="mb-4">
                                <h3 className="font-medium">Uitzet tuimelvenster</h3>
                                <p className="text-sm text-muted-foreground">
                                </p>
                            </div>
                            <img
                                src={"https://dakramen.veluxshop.nl/-/media/roofwindowshop/productimages/inside/windows/gpl.png"}
                                alt="Uitzet tuimelvenster"
                                className="w-24 h-24 object-cover rounded-md"
                            />

                        </div>
                    </div>
                </div>

                <Separator />

                {/* Extras Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Extra's</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
            <CardFooter className="flex-col">
                <div className="flex flex-col place-self-end mb-4">
                    <Button onClick={handleStep1Complete} disabled={!canGoToNextStep} className="place-self-end">
                        Volgende
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {!canGoToNextStep && <p className="text-muted-foreground">Vul uw adres in en kies minstens één optie om verder te gaan.</p>}
                </div>
                <StartOverLink />
            </CardFooter>
        </>
    );
}