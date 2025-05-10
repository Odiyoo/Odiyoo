
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "./ChooseServiceForm";

type props = {
    service: Service, setService: any
}

export default function StepService({ service, setService }: props) {
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