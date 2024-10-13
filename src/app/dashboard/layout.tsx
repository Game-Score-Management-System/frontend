import SideNav from "@/app/ui/components/Sidenav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <SideNav />
      <section className="p-4 xl:p-10 sm:ml-64 ">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 h-full backdrop-brightness-75" style={{ borderImage: 'linear-gradient(to right, rgb(25 83 116), rgb(40 209 87)) 1' }}>
          {children}
        </div>
      </section>
    </div>
  );
}
