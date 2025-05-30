import { BUSINESS_NAME, FACEBOOK_LINK, INSTAGRAM_LINK } from "../business";
import { Tailwind, Section, Text, Heading, Button, Html, Body, Head } from "@react-email/components";

export default function MailFooter() {

    return (
        <div className="border-t bg-muted/50 px-6 py-4">
            <div className="mx-auto text-center text-xs text-muted-foreground">
                <Text>© {new Date().getFullYear()} {BUSINESS_NAME}. Alle rechten voorbehouden.</Text>
                <Text className="mt-1">
                    Volg ons op{" "}
                    <a href={FACEBOOK_LINK} className="text-primary hover:underline">
                        Facebook
                    </a>{" "}
                    en{" "}
                    <a href={INSTAGRAM_LINK} className="text-primary hover:underline">
                        Instagram
                    </a>
                </Text>
                <Text className="mt-1">
                    <a href="#" className="text-primary hover:underline">
                        Uitschrijven
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-primary hover:underline">
                        Privacybeleid
                    </a>
                </Text>
            </div>
        </div>
    )
}