import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, CheckIcon, Loader, X } from "lucide-react";
import { JSX } from "react";

type props = {
    isMeasurementKnown: boolean | undefined, 
    setIsMeasurementKnown: any
}

export default function StepMeasurements({ isMeasurementKnown, setIsMeasurementKnown }: props) {
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