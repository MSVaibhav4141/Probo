import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db/db";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import jwt from 'jsonwebtoken'
import { getServerSession } from "next-auth";
interface ExtendedJWT extends JWT {
  id?: string;
}

const createBackendJwt = (userId: string) => {
  return jwt.sign(
          { userId }, 
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '1h' } 
        );
}
export const authOption: NextAuthOptions = { 
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SEC!, 
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: ExtendedJWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.backendToken = createBackendJwt(token.id as string)
        token.backendTokenExpires = Date.now() + 60 * 60 * 1000;
      }
       if (Date.now() > (token.backendTokenExpires as number)) {
        token.backendToken = createBackendJwt(token.id as string);
        token.backendTokenExpires = Date.now() + 60 * 60 * 1000; 
        console.log('🔄 Backend token refreshed');
  }

      return token;
    },

    async session({ session, token }: { session: any; token: ExtendedJWT }) {
      if (token.id && session.user) {
        session.user.id = token.id;
        session.backendToken = token.backendToken;
      }

   
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
