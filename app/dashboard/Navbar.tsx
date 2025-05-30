import {
    ArrowRight,
  CircleUserRound,
  Home,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FullLogo from "@/components/full-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useIsLoggedIn from "@/lib/cookies"

export default function Navbar() {


  const [isLoggedIn] = useIsLoggedIn()

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-4">
          <Link href="/quote" className="hidden md:block">
            <Button className="bg-odiyoo">Ontvang je offerte in 15 seconden <ArrowRight/></Button>
          </Link>
          {!isLoggedIn && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-odiyoo"><CircleUserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mijn Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/login" className="hover:cursor-pointer">
                  <DropdownMenuItem>
                    Inloggen
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/signup" className="hover:cursor-pointer">
                  <DropdownMenuItem>
                    Aanmelden
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Jouw vakmanschap op Odiyoo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
          {isLoggedIn && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-odiyoo"><CircleUserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mijn Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Account
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Jouw vakmanschap op Odiyoo</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/logout" className="text-red-600">Uitloggen</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </div>
      </div>
    </header>
  )

}