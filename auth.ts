import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { authConfig } from './auth.config';
import { User } from '@/app/ui/models/User.model';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('credentials 👍', credentials);
        const { email, password } = credentials as { email: string; password: string };
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const resData = (await response.json()) as { result: User };

        console.log('resData', resData);

        if (response.ok && resData) {
          return resData.result;
        } else {
          console.error('Authorization failed:', resData);
          return null;
        }
      }
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      console.log('🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠');
      console.log({
        user,
        account,
        credentials,
        email,
        profile
      });
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      // Almacena el token de usuario y rol en el JWT para usarlos en la sesión
      if (user) {
        token.user = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = { ...session.user, ...token.user };
      return session;
    }
  }
});
