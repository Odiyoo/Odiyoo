import Link from "next/link"
import { handleReload } from "./helper"
import { Button } from "@/components/ui/button"

export default function StartOverLink() {
    return (
        <Link href="/quote" onClick={handleReload} className="text-center" >
            <Button variant="link" >
                Opnieuw beginnen
            </Button>
        </Link>
    )
}