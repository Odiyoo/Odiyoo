import Image from "next/image";

export default function FullLogoWhite(props: any) {
    return (
        <Image
            alt="Logo van Odiyoo"
            src="/branding/svg/Odiyoo_logo_Wit.svg"
            width={120}
            height={120}
            {...props}
        />
    )
}