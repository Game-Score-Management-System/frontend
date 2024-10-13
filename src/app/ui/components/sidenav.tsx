import { Image } from "@nextui-org/react";
import Logout from "./logout";
import NavLinks from "./NavLinks";

export default function SideNav() {
  return (
    // <div className="flex h-full flex-col px-3 py-4 md:px-2">
    //   <Link
    //     className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
    //     href="/"
    //   >
    //     <div className="w-32 text-white md:w-40">
    //       {/* <AcmeLogo /> */}
    //     </div>
    //   </Link>
    //   <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
    //     <NavLinks />
    //     <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
    //     <form
    //     // action={async () => {
    //     //   'use server';
    //     //   await signOut();
    //     // }}
    //     >
    //       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
    //         {/* <PowerIcon className="w-6" /> */}
    //         <div className="hidden md:block">Sign Out</div>
    //       </button>
    //     </form>
    //   </div>
    // </div>
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