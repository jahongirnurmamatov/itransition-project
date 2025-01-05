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

import { Label, Separator } from "@radix-ui/react-dropdown-menu"
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { useNavData } from "@/assets/data";

export function AppSidebar({
  ...props
}) { 
  const {open,setOpen} = useSidebar();
  const {navMain} = useNavData();
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
        
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
