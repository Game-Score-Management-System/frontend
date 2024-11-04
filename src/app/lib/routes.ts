import {
  // HomeIcon,
  DocumentChartBarIcon,
  GlobeAltIcon,
  StarIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { Role } from '../ui/models/User.model';

const routes = [
  // { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Ranking Global',
    href: '/dashboard/leaderboard',
    icon: GlobeAltIcon,
    roles: [Role.PLAYER, Role.ADMIN],
    isDinamic: false
  },
  {
    name: 'Mis Puntuaciones',
    href: '/dashboard/scores',
    icon: StarIcon,
    roles: [Role.PLAYER, Role.ADMIN],
    isDinamic: true
  },
  {
    name: 'Perfil',
    href: '/dashboard/profile',
    icon: UserIcon,
    roles: [Role.PLAYER, Role.ADMIN],
    isDinamic: true
  },
  {
    name: 'Gestión de Jugadores',
    href: '/dashboard/admin/players',
    icon: UsersIcon,
    roles: [Role.ADMIN],
    isDinamic: false
  },
  {
    name: 'Gestión de Scores',
    href: '/dashboard/admin/scores',
    icon: DocumentChartBarIcon,
    roles: [Role.ADMIN],
    isDinamic: false
  }
] as const;

export default routes;
