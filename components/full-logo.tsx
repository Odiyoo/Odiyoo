import Image from "next/image";

export default function FullLogo(props: any) {
    return (
        <Image
            alt="Logo van Odiyoo"
            src="/branding/svg/Odiyoo_logo_Algemeen.svg"
            width={120}
            height={120}
            {...props}
        />
    )
}