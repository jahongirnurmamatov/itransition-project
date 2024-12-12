import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { data } from "@/assets/data"
import { Label, Separator } from "@radix-ui/react-dropdown-menu"
import { Search } from "lucide-react"
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

export function AppSidebar({
  ...props
}) { 
  const {open,setOpen} = useSidebar();
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <SidebarMenu>
        <SidebarMenuItem className='flex items-center justify-center gap-0'>
          <img src="https://cdn-icons-png.flaticon.com/512/270/270024.png" alt="Logo" className={`${open ? "w-12 h-12" : "w-8 h-8"}`}/>
          {open && <Label className="text-3xl truncate  text-blue-600 font-semibold ml-6">My<span className="text-blue-900 truncate  text-3xl font-extrabold">Forms</span></Label>}
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
      <SidebarMenu className="relative w-[220px] mx-3 mt-5 ">
        <SidebarMenuItem>
        {open ? <><Label htmlFor="search" className="sr-only">
            Search
          </Label>
           <SidebarInput
            id="search"
            placeholder="Search the forms..."
            className="pl-8"
            />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </> : <SidebarMenuButton tooltip={'Search'} className='-ml-1'>
          <Search  onClick={(e) => setOpen(!open)} className="h-5 w-5" />
          </SidebarMenuButton>
        }
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
