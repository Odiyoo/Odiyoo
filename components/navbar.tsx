import {
  Home,
} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import FullLogo from "./full-logo"

export default function Navbar() {

    return (
        <header className="bg-white py-4 shadow-sm">
                <div className="container flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <FullLogo className="" />
                  </Link>
                  <nav className="hidden space-x-6 md:flex">
                    <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Functies
                    </Link>
                    <Link href="#hoe-het-werkt" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Hoe het werkt
                    </Link>
                    <Link href="#getuigenissen" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Getuigenissen
                    </Link>
                    <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </nav>
                  <div className="flex items-center gap-4">
                    <Link href="/quote" className="hidden md:block">
                      <Button className="bg-odiyoo">Offerte Aanvragen</Button>
                    </Link>
                    <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Inloggen
                    </Link>
                  </div>
                </div>
              </header>
    )

}