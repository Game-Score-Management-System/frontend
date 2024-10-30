import { auth } from '@auth';
import { Role } from './app/ui/models/User.model';

export default auth((req) => {
  const { auth, nextUrl } = req;
  const { pathname, origin } = nextUrl;

  if (!auth && pathname !== '/login' && pathname !== '/register') {
    return Response.redirect(new URL('/login', origin));
  }

  // Si ya está autenticado y trata de acceder a /login o a /register o a /
  if (auth && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
    return Response.redirect(new URL('/dashboard/leaderboard', origin));
  }

  if (pathname.includes('/admin') && auth?.user.role !== Role.ADMIN) {
    return Response.redirect(new URL('/dashboard/leaderboard', origin));
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg)$).*)']
};
