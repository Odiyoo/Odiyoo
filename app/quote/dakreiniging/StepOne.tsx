import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { FormData } from "./Form";

type StepOneProps = {
    formData: FormData,
    setFormData: any,
    handleStep1Complete: any,
};

export default function StepOne({ formData, setFormData, handleStep1Complete }: StepOneProps) {

    const addressInputRef = useRef(null)
    const addressRef = useRef<any>(null)
    const { isLoaded: hasGmapsLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyARTWcUUS8RHo9FZOCA4bnF8VxXUU0wcRk", //process.env.NEXT_PUBLIC_GMAPS_API_KEY!,
        libraries: ['places']
    })

    const toggleDakreinigingOptions = (name: string) => {
        setFormData((prev: FormData) => ({
            ...prev,
            options: {
                ...prev.options,
                [name]: !prev.options[name],
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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleOnPlacesChanged = () => {
        let address = addressRef.current.getPlaces();
    }

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

                {/* Extras Section - Now outside of collapsible */}
                <div className="space-y-4">
                    <h4 className="font-medium text-odiyoo">Wat wil je laten reinigen?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.dakbedekking ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("dakbedekking")}
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
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.gootsystemen ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("gootsystemen")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.gutters || "/placeholder.svg"}
                                    alt="Gootsystemen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Gootsystemen</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.zonnepanelen ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("zonnepanelen")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.solarPanels || "/placeholder.svg"}
                                    alt="Zonnepanelen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Zonnepanelen</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.veluxramen ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("veluxramen")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={extrasImages.skylights || "/placeholder.svg"}
                                    alt="Veluxramen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Veluxramen</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.schoorsteen ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("schoorsteen")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={"https://www.mijn-dakwerker.be/wp-content/uploads/dakpan-beton.jpg"}
                                    alt="Schoorsteen"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Schoorsteen</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.aquaplan ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("aquaplan")}
                        >
                            <div className="flex gap-4">
                                <img
                                    src={"https://iko.xcdn.nl/Dak-Renovatie_sfeerbeeld1.jpg?f=rs:fit:800:600:0:0"}
                                    alt="aquaplan coating"
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-medium">Coating met Aquaplan</h3>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.options.optionUnknown ? "border-odiyoo border-2 bg-primary/5" : "hover:border-primary/50"}`}
                            onClick={() => toggleDakreinigingOptions("optionUnknown")}
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
                        <h3 className="font-medium mb-2 text-lg">Geselecteerde opties:</h3>
                        <ul className="space-y-1 text-sm">
                            {formData.options.dakbedekking && (
                                <li className="flex justify-between">
                                    <span>Dakpannen of leien</span>
                                </li>
                            )}
                            {formData.options.gootsystemen && (
                                <li className="flex justify-between">
                                    <span>Gootsystemen</span>
                                </li>
                            )}
                            {formData.options.zonnepanelen && (
                                <li className="flex justify-between">
                                    <span>Zonnepanelen</span>
                                </li>
                            )}
                            {formData.options.veluxramen && (
                                <li className="flex justify-between">
                                    <span>Veluxramen</span>
                                </li>
                            )}
                            {formData.options.schoorsteen && (
                                <li className="flex justify-between">
                                    <span>Schoorsteen</span>
                                </li>
                            )}
                            {formData.options.aquaplan && (
                                <li className="flex justify-between">
                                    <span>Coating met Aquaplan</span>
                                </li>
                            )}
                            {!formData.options.dakbedekking &&
                                !formData.options.gootsystemen &&
                                !formData.options.zonnepanelen &&
                                !formData.options.veluxramen &&
                                !formData.options.schoorsteen &&
                                !formData.options.aquaplan && (
                                    <li className="text-muted-foreground">Geen opties geselecteerd</li>
                                )}
                        </ul>
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