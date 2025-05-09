import { CheckIcon, SearchIcon, X } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "./ui/checkbox";
import { capitalize } from "@/lib/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SmartQuoteBar() {

    const [service, setService] = useState<'dakreiniging' | 'dakrenovatie' | 'unselected'>('unselected');
    const [hasKnownMeasurements, setKnownMeasurements] = useState<boolean>();
    const [hoverStyle, setHoverStyle] = useState('');

    const router = useRouter();

    const sendToForm = () => {
        router.push(`/quote?service=${service}&measurements=${hasKnownMeasurements}`)
    }

    return (
        <article className="max-w-3xl mx-auto text-center space-y-6 my-8">

            <h1 className="text-muted-foreground">Ga meteen aan de slag met onze self-service module</h1>
            <div className={`flex rounded-full border border-gray-200 shadow-lg gap-1 my-2 bg-odiyoo border-odiyoo ${hoverStyle}`}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className={`text-left p-4 px-6 rounded-full bg-white rounded-r-none transition-all ease-in cursor-pointer focus:border active:border border-odiyoo hover:bg-gray-400 w-1/3 ${service !== 'unselected' ? "bg-gray-300" : ''}`}>
                            <h4 className="text-odiyoo">Wat heb je nodig?</h4>
                            <p className="text-muted-foreground">{service === 'unselected' ? "Kies hier..." : capitalize(service)}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full rounded-3xl p-4 shadow-2xl">
                        <DropdownMenuLabel className="text-lg text-odiyoo">Wat heb je nodig?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className={`text-lg ${service === 'dakreiniging' ? 'text-odiyoo' : ''}`}>
                                <div
                                    className={`p-4 border rounded-lg w-full cursor-pointer transition-colors ${service === 'dakreiniging' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                                    onClick={() => setService('dakreiniging')}
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={"https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets//dakreiniging.webp"}
                                            alt="Dakreiniging"
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-medium">Dakreiniging/ontmossing</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Vernieuw de uitstraling van uw woning met een grondige dakreiniging.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-lg">
                                <div
                                    className={`p-4 border rounded-lg w-full cursor-pointer transition-colors ${service === 'dakrenovatie' ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                                    onClick={() => setService('dakrenovatie')}
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={"https://andrecelis.be/media/catalog/product/cache/d8af12506aec112928c5b5c8d00371d9/c/e/cedral-board-c05-platinagrijs-foto_2.jpg"}
                                            alt="Dakrenovatie"
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-medium">Dakrenovatie</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Vernieuw uw woning met een dakrenovatie.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className={`text-left p-4 px-6 rounded-full bg-white rounded-l-none transition-all ease-in cursor-pointer hover:bg-gray-200 w-full ${hasKnownMeasurements !== undefined ? "bg-gray-300" : ''}`}>
                            <h4 className="text-odiyoo">Ken je je dakoppervlakte?</h4>
                            <p className="text-muted-foreground">{hasKnownMeasurements === undefined ? "Kies hier..." : (hasKnownMeasurements ? "Ja" : "Nee")}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-3xl p-4 shadow-2xl">
                        <DropdownMenuLabel className="text-lg text-odiyoo">Ken je je dakoppervlakte?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="text-lg" onClick={() => setKnownMeasurements(true)}>
                                <div
                                    className={`p-4 border rounded-lg w-full cursor-pointer transition-colors ${hasKnownMeasurements === true ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                                >
                                    <div className="flex gap-4">
                                        <CheckIcon className="w-16 h-16 object-cover rounded-md place-self-center" />
                                        <div>
                                            <h3 className="font-medium">Ja</h3>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-lg" onClick={() => setKnownMeasurements(false)}>
                                <div
                                    className={`p-4 border rounded-lg w-full cursor-pointer transition-colors ${hasKnownMeasurements === false ? "border-odiyoo border-2 bg-primary/5" : "hover:border-odiyoo"}`}
                                >
                                    <div className="flex gap-4">
                                        <X className="w-16 h-16 object-cover rounded-md place-self-center" />
                                        <div>
                                            <h3 className="font-medium">Nee</h3>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="mr-4 place-content-center">
                    <Button variant="default" className="rounded-full self-center justify-self-end" size="icon" disabled={hasKnownMeasurements === undefined} onClick={sendToForm} onMouseEnter={() => {setHoverStyle('bg-#073358b3')}} onMouseLeave={() => {setHoverStyle('')}}>
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </article>
    )
}