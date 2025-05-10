import Image from "next/image";

export default function FullLogoBlack(props: any) {
    return (
        <Image
            alt="Logo van Odiyoo"
            src="/branding/SVG/Odiyoo_logo_Zwart.svg"
            width={120}
            height={120}
            {...props}
        />
    )
}