import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContractorDakrenovatieQuote, ExtendedContractor } from "@/domain/contractors";
import { taxPercentage, taxPercentageDisplay } from "@/domain/finance";
import { Calendar, Clock, Mail, MapPin, Phone, Star, Store } from "lucide-react";
import Link from "next/link";
import { FormData } from "./Form";

type SidebarProps = {
    step: number,
    formData: FormData,
    contractors: ExtendedContractor[],
    contractorQuotes: Record<string, ContractorDakrenovatieQuote>,
}

export default function SidebarComponent({ step, formData, contractors, contractorQuotes }: SidebarProps) {
    
    return (
        <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 space-y-6">
            {/* Quote Details Sidebar - Hidden on mobile and tablet */}
            {step === 2 && formData.selectedContractor && (
                <Card>
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">Geselecteerde offerte</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                    {(() => {
                        const contractor = contractors.find((c) => c === formData.selectedContractor)
                        const quote = contractorQuotes[formData.selectedContractor.id] || { totalPrice: 0 }

                        if (!contractor) return <p>Selecteer een aannemer</p>

                        return (
                        <>
                            <div>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                <span className="text-sm">{contractor.rating} / 5</span>
                            </div>
                            </div>

                            <Separator />

                            <div>
                            <h3 className="font-medium mb-2">Offerte details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                <span>Subtotaal:</span>
                                <span className="font-medium">€{Math.round(quote.totalPrice).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                <span>BTW ({taxPercentageDisplay}):</span>
                                <span className="font-medium">
                                    €{Math.round(quote.totalPrice * taxPercentage).toLocaleString()}
                                </span>
                                </div>
                                <div className="flex justify-between font-bold">
                                <span>Totaal (incl. BTW):</span>
                                <span>€{Math.round(quote.totalPrice * (1+taxPercentage)).toLocaleString()}</span>
                                </div>
                            </div>
                            </div>

                            <Separator />

                            <div>
                            <h3 className="font-medium mb-2">Aannemer details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                <Calendar className="h-4 w-4 mr-2 text-odiyoo mt-0.5" />
                                <div>
                                    <p className="font-medium">Beschikbaarheid</p>
                                    <p className="text-muted-foreground">{contractor.availability}</p>
                                </div>
                                </div>
                                <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 text-odiyoo mt-0.5" />
                                <div>
                                    <p className="font-medium">Locatie</p>
                                    <p className="text-muted-foreground">{contractor.city}</p>
                                </div>
                                </div>
                                {contractor.hasShowroom && (
                                <div className="flex items-start">
                                    <Store className="h-4 w-4 mr-2 text-odiyoo mt-0.5" />
                                    <div>
                                    <p className="font-medium">Showroom</p>
                                    <p className="text-muted-foreground">{contractor.showroomAddress}</p>
                                    </div>
                                </div>
                                )}
                            </div>
                            </div>

                            <div className="bg-primary/5 p-3 rounded-md">
                            <h3 className="font-medium mb-2">Geselecteerde extra's</h3>
                            {formData.extras.insulation ||
                            formData.extras.gutters ||
                            formData.extras.solarPanels ||
                            formData.extras.skylights ||
                            formData.extras.facadeCladding ? (
                                <ul className="space-y-1 text-sm">
                                {formData.extras.insulation && <li>Dakisolatie (€2.500)</li>}
                                {formData.extras.gutters && <li>Nieuwe dakgoten (€1.200)</li>}
                                {formData.extras.solarPanels && <li>Zonnepanelen (€5.000)</li>}
                                {formData.extras.skylights && <li>Dakramen (€1.800)</li>}
                                {formData.extras.facadeCladding && <li>Gevelbekleding (€3.200)</li>}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">Geen extra's geselecteerd</p>
                            )}
                            </div>
                        </>
                        )
                    })()}
                    </div>
                </CardContent>
                </Card>
            )}

            {/* Help/FAQ Sidebar */}
            <Card>
                <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg flex items-center">
                    <span className="mr-2">Help & FAQ</span>
                </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                <div className="space-y-4">
                    <div>
                    <h3 className="font-medium mb-2 text-lg">Veelgestelde vragen</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                        <Link href="/faq#algemeen-1" className="text-odiyoo hover:underline">
                            Hoe werkt het offerteproces?
                        </Link>
                        </li>
                        <li>
                        <Link href="/faq#prijzen-1" className="text-odiyoo hover:underline">
                            Hoe worden de prijzen berekend?
                        </Link>
                        </li>
                        <li>
                        <Link href="/faq#materialen-1" className="text-odiyoo hover:underline">
                            Welk dakmateriaal is het beste voor mij?
                        </Link>
                        </li>
                        <li>
                        <Link href="/faq#aannemers-1" className="text-odiyoo hover:underline">
                            Hoe kies ik de juiste aannemer?
                        </Link>
                        </li>
                    </ul>
                    </div>

                    <Separator />

                    <div>
                    <h3 className="font-medium mb-2 text-lg">Hulp nodig?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Onze klantenservice staat voor je klaar om je te helpen bij het aanvragen van je offerte.
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-odiyoo" />
                        <span>(020) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-odiyoo" />
                        <span>support@odiyoo.be</span>
                        </div>
                        <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-odiyoo" />
                        <span>Ma-Vr: 07.30 - 17.00</span>
                        </div>
                    </div>
                    </div>

                    <Separator />

                    <div className="bg-primary/5 p-3 rounded-md">
                    <h3 className="text-odiyoo font-medium mb-2">Tip</h3>
                    <p className="text-sm text-muted-foreground">
                        Weet je niet zeker welk dakmateriaal te kiezen? Vergelijk de verschillende opties en hun voor-
                        en nadelen in stap 1.
                    </p>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    );
}