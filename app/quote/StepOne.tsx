import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateExtrasCost } from "@/domain/contractors";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { FormData } from "./page"

type SidebarProps = {
    formData: FormData,
    setFormData: any,
    handleStep1Complete: any,
};

export default function StepOne({ formData, setFormData, handleStep1Complete }: SidebarProps) {

    const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const addressInputRef = useRef(null)
    const addressRef = useRef<any>(null)

    const { isLoaded: hasGmapsLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyARTWcUUS8RHo9FZOCA4bnF8VxXUU0wcRk", //process.env.NEXT_PUBLIC_GMAPS_API_KEY!,
        libraries: ['places']
    })

    const handleAddressSelect = (suggestion) => {
        setFormData((prev: FormData) => ({
            ...prev,
            address: suggestion.address,
        }))
        setShowAddressSuggestions(false)
    }

    const handleSelectChange = (name, value) => {
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

    // Click outside to close address suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addressInputRef.current && !addressInputRef.current.contains(event.target)) {
                setShowAddressSuggestions(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === "address" && value.length > 3) {
            // Simulate address autocomplete
            const mockAddresses = [
                { address: `${value} 1`, city: "Amsterdam", state: "NH", zip: "1011 AB" },
                { address: `${value} 2`, city: "Rotterdam", state: "ZH", zip: "3011 CD" },
                { address: `${value} 3`, city: "Utrecht", state: "UT", zip: "3511 EF" },
                { address: `${value} 4`, city: "Den Haag", state: "ZH", zip: "2511 GH" },
            ]
            setAddressSuggestions(mockAddresses)
            //setShowAddressSuggestions(true) replaced by Google places API
        } else if (name === "address" && value.length <= 3) {
            setShowAddressSuggestions(false)
        }
    }

    const handleOnPlacesChanged = () => {
        let address = addressRef.current.getPlaces();
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Gegevens voor je dakofferte</CardTitle>
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

                        {/* Address Autocomplete */}
                        {showAddressSuggestions && addressSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                {addressSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleAddressSelect(suggestion)}
                                    >
                                        <div className="font-medium">{suggestion.address}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {suggestion.city}, {suggestion.zip}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                            <TabsTrigger value="dakpannen">Dakpannen</TabsTrigger>
                            <TabsTrigger value="leien">Leien</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dakpannen" className="mt-4 space-y-4">
                            <div className="rounded-lg border p-4">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Dakpannen</h3>
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
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "antraciet" ? "border-primary border-2" : "border-gray-200"}`}
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
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "rood" ? "border-primary border-2" : "border-gray-200"}`}
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
                                        <h3 className="text-lg font-semibold">Leien</h3>
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
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "natuurleien" ? "border-primary border-2" : "border-gray-200"}`}
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
                                                className={`cursor-pointer border rounded-md overflow-hidden ${formData.roofColor === "kunstleien" ? "border-primary border-2" : "border-gray-200"}`}
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
                    <h4 className="font-medium">Extra's</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.insulation ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
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
                                    <p className="text-sm font-medium mt-1">€2.500</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.gutters ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
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
                                    <p className="text-sm font-medium mt-1">€1.200</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.solarPanels ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
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
                                    <p className="text-sm font-medium mt-1">€5.000</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.skylights ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
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
                                    <p className="text-sm font-medium mt-1">€1.800</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.extras.facadeCladding ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"}`}
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
                                    <p className="text-sm font-medium mt-1">€3.200</p>
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
                                        <span>€{calculateExtrasCost(formData.extras.insulation, formData.extras.gutters, formData.extras.solarPanels, formData.extras.skylights, formData.extras.facadeCladding).toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleStep1Complete} disabled={!formData.address}>
                    Volgende
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </>
    );
}