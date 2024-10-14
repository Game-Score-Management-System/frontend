import {
  DocumentChartBarIcon,
  GlobeAltIcon,
  HomeIcon,
  StarIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const routes = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Ranking Global', href: '/dashboard/leaderboard', icon: GlobeAltIcon },
  { name: 'Mis Puntuaciones', href: '/dashboard/scores', icon: StarIcon },
  { name: 'Perfil', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Gestión de Jugadores', href: '/dashboard/admin/players', icon: UsersIcon },
  { name: 'Gestión de Scores', href: '/dashboard/admin/scores', icon: DocumentChartBarIcon }
] as const;

export default routes;
