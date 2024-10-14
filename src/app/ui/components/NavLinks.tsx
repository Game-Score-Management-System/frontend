'use client';

import routes from '@/app/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {routes.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`border border-white/50 backdrop-blur-xl backdrop-saturate-200 hover:bg-default-200/70 flex items-center gap-2 p-2 text-gray-900 rounded-lg  dark:text-white hover:bg-gray-100 dark:hover:bg-[#28d15863] group  text-xs ${pathname === link.href ? 'bg-[#28d15863]' : ''}`}
          >
            <LinkIcon className="w-4 text-slate-300" />
            <p >{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}