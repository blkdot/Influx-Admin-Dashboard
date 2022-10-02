import NextAuth from 'next-auth';
// import { findAdminByEmail } from '../../../api-lib/db';
import { fetcher } from '../../../lib/fetch';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import prisma from '../../../prisma/index';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log('authrize,======');
        let maybeUser = await prisma.adminUser.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
          },
        });
        console.log('ok===', maybeUser);

        if (!maybeUser) {
          throw new Error("Unauthorized.");
        }

        if (maybeUser?.role !== "admin") {
          throw new Error("Unauthorized.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          maybeUser.password
        );

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }
        console.log('ok===');
        return {
          id: maybeUser.id,
          email: maybeUser.email,
          role: maybeUser.role,
        };
        
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  // adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
});
