import FullLogo from "@/components/full-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupContent, SidebarProvider, SidebarTrigger, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { AuthenticatedUserHook, useAuthenticatedUser } from "@/hooks/use-authenticated-user";
import { ChevronsUpDown, CircleUserRound, Frame, LifeBuoy, Loader } from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar({ authenticatedUser }: { authenticatedUser: AuthenticatedUserHook | null }) {

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <FullLogo />
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Jouw aanvragen</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="offertes">
                                <SidebarMenuButton className="hover:text-odiyoo" asChild>
                                    <Link href={`/dashboard/offertes`}>
                                        <Frame />
                                        <span>Offertes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Odiyoo</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="klantenservice">
                                <SidebarMenuButton className="hover:text-odiyoo" asChild>
                                    <Link href={`/faq`}>
                                        <LifeBuoy />
                                        <span>Klantenservice</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Link href="/dashboard/account">
                    <Button variant="outline" className="flex flex-row gap-4">
                        <CircleUserRound className="text-odiyoo shrink-0 h-8 w-8 rounded-lg" />
                        {authenticatedUser && (<div className="grid flex-1 text-left text-sm leading-tight">
                            <h3 className="truncate font-semibold">{authenticatedUser.customer?.firstname} {authenticatedUser.customer?.lastname}</h3>
                            <p className="truncate text-xs">{authenticatedUser.user?.email}</p>
                        </div>)}
                        {!authenticatedUser && (
                            <div className="flex-1 text-left">
                                <Loader className="animate-spin" />
                            </div>
                        )}
                        <ChevronsUpDown size="4" />
                    </Button>
                </Link>
            </SidebarFooter>
        </Sidebar>

    )
}