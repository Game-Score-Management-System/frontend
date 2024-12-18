'use client';

import routes from '@/app/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAppSession from "@hooks/useSession";


export default function NavLinks() {
  const pathname = usePathname();
  const { session, status } = useAppSession();


  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-2 p-4">
        <div className="h-8 bg-gray-200/70 backdrop-blur-xl backdrop-saturate-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200/70 backdrop-blur-xl backdrop-saturate-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200/70 backdrop-blur-xl backdrop-saturate-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200/70 backdrop-blur-xl backdrop-saturate-200 rounded animate-pulse"></div>
      </div >
    )
  }
  if (session?.user.role == null) return null;

  const filteredRoutes = routes.filter((route) => route.roles.includes(session?.user?.role));

  return (
    <>
      {filteredRoutes.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.isDinamic ? `${link.href}/${session?.user?.id}` : link.href}
            className={`border border-white/50 backdrop-blur-xl backdrop-saturate-200 hover:bg-default-200/70 flex items-center gap-2 p-2 text-gray-900 rounded-lg  dark:text-white hover:bg-gray-100 dark:hover:bg-[#28d15863] group  text-xs ${pathname.includes(link.href) ? 'bg-[#28d15863]' : ''}`}
          >
            <LinkIcon className="w-4 text-slate-300" />
            <p >{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}