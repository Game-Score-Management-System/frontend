import { Image } from "@nextui-org/react";
import Logout from "./logout";
import NavLinks from "./NavLinks";

export default function SideNav() {
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#00d9ff1c] backdrop-blur-sm">
        <a href="#" className="flex justify-center items-center mb-5">
          <Image isBlurred src="/logo.png" className="size-32  object-cover h-full hover:rotate-12  hover:scale-110  transition-all duration-250" alt="Flowbite Logo" />
        </a>
        <ul className="space-y-2 font-medium">
          <NavLinks />
        </ul>
        <footer className="mt-auto flex flex-col gap-3 py-4 px-4 rounded-xl  backdrop-blur-3xl">
          <Logout />
        </footer>
      </div>
    </aside>
  );
}