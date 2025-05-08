import {
  CircleUserRound,
  Home,
} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import FullLogo from "./full-logo"
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
import { createClient } from "@/util/supabase/client"
import useIsLoggedIn from "@/lib/cookies"

export default function Navbar() {

  const supabase = createClient();

  const [isLoggedIn] = useIsLoggedIn()

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FullLogo className="" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/quote" className="hidden md:block">
            <Button className="bg-odiyoo">Ontvang je offerte in 15 seconden</Button>
          </Link>
          {!isLoggedIn && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-odiyoo"><CircleUserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mijn Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Inloggen
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Aanmelden
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
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