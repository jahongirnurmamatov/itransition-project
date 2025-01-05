import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeToggle } from "../themeprovider/ThemeToggle";
import SwitchLang from "../languageProvider/SwitchLang";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import SearchBox from "./SearchBox";
import { useLanguageStore } from "@/store/languageStore";
import { useMediaQuery } from "react-responsive";

export function Sidebar() {
  const { dictionary: d } = useLanguageStore();
  const breadcrumbs = useBreadcrumbs();
  const { isAuthenticated, logout } = useAuthStore();
  const isSmallThanTablet = useMediaQuery({ maxWidth: 1024 });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const [searchInput, setSearchInput] = useState(searchKey);
  
  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      navigate(`/all-templates?searchKey=${encodeURIComponent(searchInput)}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  const handleLogInOut = () => {
    if (isAuthenticated) {
      logout();
      window.location.href = "/login";
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <SidebarProvider className="">
      {isAuthenticated && <AppSidebar />}
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {isAuthenticated && <SidebarTrigger />}
            <Separator orientation="vertical" className="mr-2 h-4" />
            {!isSmallThanTablet && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={crumb.url}>
                          {crumb.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <div className="flex xl:gap-32 lg:gap-20 md:gap-10 gap:5 mr-10 items-center">
            <SearchBox
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearchSubmit={handleSearchSubmit}
              handleKeyDown={handleKeyDown}
              isNavbarSearch = {true}
              d={d}
            />
            <div className="flex lg:gap-5 gap-2  items-center">
              <div className="flex gap-2 items-center">
                <SwitchLang />
                <ThemeToggle />
              </div>
              <Button variant="contained" onClick={handleLogInOut}>
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-end"></div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
