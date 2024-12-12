import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar"

import {SidebarGroup} from "@/components/ui/sidebar"
import { data } from "@/assets/data"
import { Label, Separator } from "@radix-ui/react-dropdown-menu"
import { Search } from "lucide-react"

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <p className="text-3xl text-blue-600 font-semibold ml-6">My<span className="text-blue-900 text-3xl font-extrabold">Forms</span></p>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarGroupContent className="relative w-[220px] mx-3">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the forms..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
