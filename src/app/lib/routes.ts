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
    roles: [Role.PLAYER, Role.ADMIN]
  },
  {
    name: 'Mis Puntuaciones',
    href: '/dashboard/scores/3fa85f64-5717-4562-b3fc-2c963f66afa1',
    icon: StarIcon,
    roles: [Role.PLAYER, Role.ADMIN]
  },
  {
    name: 'Perfil',
    href: '/dashboard/profile/3fa85f64-5717-4562-b3fc-2c963f66afa1',
    icon: UserIcon,
    roles: [Role.PLAYER, Role.ADMIN]
  },
  {
    name: 'Gestión de Jugadores',
    href: '/dashboard/admin/players',
    icon: UsersIcon,
    roles: [Role.ADMIN]
  },
  {
    name: 'Gestión de Scores',
    href: '/dashboard/admin/scores',
    icon: DocumentChartBarIcon,
    roles: [Role.ADMIN]
  }
] as const;

export default routes;
