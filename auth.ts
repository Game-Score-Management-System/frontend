import NextAuth, { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { postDataApi } from '@lib/actions/http';
import { JWT } from 'next-auth/jwt';
// import { AdapterUser } from 'next-auth/adapters';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        try {
          const response = await postDataApi('auth/login', { email, password });
          const resData = response.result;
          return resData;
        } catch (error) {
          console.error('🔍🔍🔍🔍🔍🔍🔍Error Credentials.authorize', error);
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
    // async signIn({ user, account, credentials, email, profile }) {
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // session.user.session.user = { ...session.user, ...token.user };
      session.user = { ...token.user };
      session.accessToken = token.user.token;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 // 1 hour
  }
});
