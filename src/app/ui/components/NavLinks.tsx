'use client';

import { HomeIcon, GlobeAltIcon, StarIcon, UserIcon, UsersIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Ranking Global', href: '/dashboard/ranking', icon: GlobeAltIcon },
  { name: 'Mis Puntuaciones', href: '/dashboard/scores', icon: StarIcon },
  { name: 'Perfil', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Gestión de Jugadores', href: '/dashboard/admin/players', icon: UsersIcon },
  { name: 'Gestión de Scores', href: '/dashboard/admin/scores', icon: DocumentChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
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