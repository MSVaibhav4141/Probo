import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendToken?: string; // Add backendToken to session
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    backendToken?: string;
    backendTokenExpires?: number;
  }
}