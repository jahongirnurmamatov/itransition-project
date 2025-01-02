import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TiThMenuOutline } from "react-icons/ti";

export function MobileNavbar({ activeSection, setActiveSection }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="shadow" className="bg-inherit text-white size-12">
          <TiThMenuOutline className="size-12" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-white flex items-center justify-center ">
        <div className="flex flex-col gap-5 text-md font-bold">
          <a
            href="#hero"
            className={`font-semibold px-4 py-2 rounded-md ${
              activeSection === "hero"
                ? "text-white bg-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <p className="hover:text-orange-500 cursor-pointer">Home</p>
          </a>
          <a
            href="#about"
            className={`font-semibold px-4 py-2 rounded-md ${
              activeSection === "about"
                ? "text-white bg-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <p className="hover:text-orange-500 cursor-pointer">About</p>
          </a>
          <a
            href="#popular"
            className={`font-semibold px-4 py-2 rounded-md ${
              activeSection === "popular"
                ? "text-white bg-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <p className="hover:text-orange-500 cursor-pointer">Popular</p>
          </a>
          <a
            href="#recent"
            className={`font-semibold px-4 py-2 rounded-md ${
              activeSection === "recent"
                ? "text-white bg-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <p className="hover:text-orange-500 cursor-pointer">Recent</p>
          </a>
          <a
            href="#contact"
            className={`font-semibold px-4 py-2 rounded-md ${
              activeSection === "contact"
                ? "text-white bg-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <p className="hover:text-orange-500 cursor-pointer">Contact</p>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
