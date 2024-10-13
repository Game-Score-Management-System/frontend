import SideNav from "@/app/ui/components/sidenav";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon height={20} width={20} />
      </button>
      <SideNav />
      <section className="p-4 xl:p-10 sm:ml-64 h-full">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 h-full backdrop-brightness-75" style={{ borderImage: 'linear-gradient(to right, rgb(25 83 116), rgb(40 209 87)) 1' }}>
          {children}
        </div>
      </section>
    </div>
  );
}
