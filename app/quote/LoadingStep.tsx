import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, CheckIcon, Loader, X } from "lucide-react";

export default function LoadingStep() {
    return (
        <div>
            <CardHeader>
                <CardTitle className="text-odiyoo">Offerte</CardTitle>
                <CardDescription>
                    Nog even wachten...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="place-self-center text-center">
                    <Loader className="animate-spin"/>
                </div>
            </CardContent>
        </div>
    )
}