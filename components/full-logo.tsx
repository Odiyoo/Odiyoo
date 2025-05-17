import Image from "next/image";

export default function FullLogo(props: any) {
    return (
        <Image
            alt="Logo van Odiyoo"
            src="/branding/SVG/Odiyoo_logo_Algemeen.svg"
            width={0}
            height={0}
            className="w-[120px]"
            {...props}
        />
    )
}