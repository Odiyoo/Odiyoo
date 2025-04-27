import { BTW, BUSINESS_NAME, CUSTOMER_SUPPORT_MAIL, CUSTOMER_SUPPORT_PHONE } from "@/domain/business";
import Link from "next/link";
import { Mail, MailOpen, PhoneCall, BriefcaseBusiness } from "lucide-react"

export default function Footer() {
    return (
        <footer className = "bg-gray-900 py-12 text-gray-300" >
            <div className="container">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">We komen graag met je in contact</h3>
                        <ul className="space-y-2">
                            <li className="font-medium">{BUSINESS_NAME}</li>
                            <li className="flex flex-row gap-2"><BriefcaseBusiness/> {BTW}</li>
                            <li className="flex flex-row gap-2"><MailOpen/> <a href={`mailto:${CUSTOMER_SUPPORT_MAIL}`}>{CUSTOMER_SUPPORT_MAIL}</a></li>
                            <li className="flex flex-row gap-2"><PhoneCall/> <a href={`tel:${CUSTOMER_SUPPORT_PHONE}`}>{CUSTOMER_SUPPORT_PHONE}</a></li>
                        </ul>
                        <ul>
                            <li className="mt-8">
                                <span className="font-bold block">Openingstijden:</span>
                                <span className="block">Maandag - Vrijdag: 07.30 - 17.00</span>
                                <span className="block">Zaterdag: 08.00 - 12.30</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Over ons</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/over-ons" className="hover:text-white">
                                    Ons team
                                </Link>
                            </li>
                            <li>
                                <Link href="/advies" className="hover:text-white">
                                    Advies
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white">
                                    Algemene voorwaarden
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white">
                                    Privacybeleid
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Klantenservice</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/over-ons" className="hover:text-white">
                                    Over ons
                                </Link>
                            </li>
                            <li>
                                <Link href="/advies" className="hover:text-white">
                                    Advies
                                </Link>
                            </li>
                            <li>
                                <Link href="/klantenservice" className="hover:text-white">
                                    Klantenservice
                                </Link>
                            </li>
                            <li>
                                <Link href="/kennisbank" className="hover:text-white">
                                    Kennisbank
                                </Link>
                            </li>
                            <li>
                                <Link href="/vakantie-openingstijden" className="hover:text-white">
                                    Vakantie openingstijden
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME} Alle rechten voorbehouden.</p>
                </div>
            </div>
    </footer >
    );
}