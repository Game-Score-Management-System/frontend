import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      profilePicture: string;
      username: string;
      name: string;
      lastname: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
    username: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string | null;
    status: boolean;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: User;
  }
}
