'use client';

import { Button, Image } from "@nextui-org/react";
import Logout from "./Logout";
import NavLinks from "./NavLinks";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useState } from "react";

export default function SideNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sm:hidden flex justify-between items-center py-4 pe-4">
        <Button
          isIconOnly
          type="button"
          onClick={toggleSidebar}
          aria-controls="logo-sidebar"
          aria-expanded={isSidebarOpen}
          className="ms-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-[#00d9ff1c] "
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon height={20} width={20} />
        </Button>
        <Logout />
      </header>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#00d9ff1c] backdrop-blur-sm">
          <Button
            isIconOnly
            type="button"
            onClick={toggleSidebar}
            aria-controls="logo-sidebar"
            aria-expanded={isSidebarOpen}
            className="absolute right-2 top-2 ms-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-[#00d9ff1c] "
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon height={20} width={20} />
          </Button>
          <a href="#" className="flex justify-center items-center mb-5">
            <Image
              isBlurred
              src="/logo.png"
              className="size-32 object-cover h-full hover:rotate-12 hover:scale-110 transition-all duration-250"
              alt="Flowbite Logo"
            />
          </a>
          <ul className="space-y-2 font-medium">
            <NavLinks />
          </ul>
          <footer className="mt-auto flex flex-col gap-3 py-4 px-4 rounded-xl backdrop-blur-3xl border border-white/50">
            <Logout />
          </footer>
        </div>
      </aside>
    </>
  );
}