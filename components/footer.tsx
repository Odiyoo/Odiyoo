import { BTW, BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "@/domain/business";
import Link from "next/link";
import { Mail, MailOpen, PhoneCall, BriefcaseBusiness, Instagram, Facebook } from "lucide-react"
import FullLogoWhite from "./full-logo-white";

export default function Footer() {
    return (
        <footer className="bg-gray-900 py-12 text-gray-300" >
            <div className="container">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/faq" className="hover:text-white">
                                    Veelgestelde vragen
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Gratis dakinspectie aanvragen
                                </Link>
                            </li>
                            <li>
                                <Link href="/klantenservice" className="hover:text-white">
                                    Probleem melden
                                </Link>
                            </li>
                            <li>
                                <Link href="/klantenservice" className="hover:text-white">
                                    Klantendienst contacteren
                                </Link>
                            </li>
                        </ul>
                        <h3 className="my-4 mt-12 text-lg font-bold text-white">We komen graag met je in contact</h3>
                        <ul className="space-y-2">
                            <li className="font-medium">{BUSINESS_NAME}</li>
                            <li className="flex flex-row gap-2"><BriefcaseBusiness /> {BTW}</li>
                            <li className="flex flex-row gap-2"><MailOpen /> <a href={`mailto:${CUSTOMER_SUPPORT_MAIL}`}>{CUSTOMER_SUPPORT_MAIL}</a></li>
                            <li className="flex flex-row gap-2"><PhoneCall /> <a href={`tel:${CUSTOMER_SUPPORT_PHONE}`}>{CUSTOMER_SUPPORT_PHONE}</a></li>
                        </ul>
                        <ul>
                            <li className="mt-8">
                                <span className="font-bold block">Openingstijden:</span>
                                <span className="block">Maandag - Vrijdag: 07.30 - 17.00</span>
                                <span className="block">Zaterdag: 08.00 - 12.30</span>
                            </li>
                        </ul>
                        <div className="flex flex-row gap-4 mt-8">
                        <Link href="https://instagram.com/odiyoo" target="_blank" className="hover:text-white">
                            <Instagram />
                        </Link>
                        <Link href="https://facebook.com/odiyoo" target="_blank" className="hover:text-white">
                            <Facebook />
                        </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Voor klanten</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#hoe-het-werkt" className="hover:text-white">
                                    Hoe werkt Odiyoo?
                                </Link>
                            </li>
                            <li>
                                <Link href="/quote" className="hover:text-white">
                                    Offerte aanvragen
                                </Link>
                            </li>
                            <li>
                                <Link href="/#getuigenissen" className="hover:text-white">
                                    Reviews & cases
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Prijsindicaties
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Voor aannemers</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Sluit je aan als aannemer
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Wat verwachten wij?
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Voordelen voor aannemers
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Partnerlogin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-white">
                        Algemene voorwaarden
                    </Link>
                    <Link href="/" className="hover:text-white">
                        Privacybeleid
                    </Link>
                    <Link href="/" className="hover:text-white">
                        Cookiebeleid
                    </Link>
                    <Link href="/" className="hover:text-white">
                        Sitemap
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center mt-8 border-t border-gray-800 pt-8">
                    <FullLogoWhite />
                    <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME} Alle rechten voorbehouden.</p>
                </div>
            </div>
        </footer >
    );
}