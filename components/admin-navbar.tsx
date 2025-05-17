import {
  CircleUserRound,
  Home,
} from "lucide-react"
import Link from "next/link"
import FullLogo from "./full-logo";

export type ActiveLink = '' | 'dashboard' | 'aannemers' | 'offertes' | 'gebruikers' | 'leads' | 'instellingen';

export default function Navbar({activeLink}: {activeLink: ActiveLink}) {

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FullLogo />
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/admin" className={`text-sm font-medium text-muted-foreground hover:text-foreground ${activeLink === 'dashboard' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Dashboard
          </Link>
          <Link href="/admin/leads" className={`text-sm font-medium text-muted-foreground hover:text-foreground ${activeLink === 'leads' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Leads
          </Link>
          <Link href="/admin/contractors" className={`text-sm font-medium ${activeLink === 'aannemers' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Aannemers
          </Link>
          <Link href="/admin/quotes" className={`text-sm font-medium text-muted-foreground hover:text-foreground ${activeLink === 'offertes' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Offertes
          </Link>
          <Link href="/admin/settings" className={`text-sm font-medium text-muted-foreground hover:text-foreground ${activeLink === 'instellingen' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Instellingen
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Admin paneel</span>
        </div>
      </div>
    </header>
  )

}