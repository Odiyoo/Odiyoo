import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Mail, MapPin, Phone, Star, Store } from "lucide-react";
import Link from "next/link";

export default function SidebarComponent() {
    
    return (
        <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 space-y-6">

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