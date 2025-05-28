// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      isProfileComplete?: boolean;
      userName?: string;
      description?: string;
      userId?: string;
    } & DefaultSession["user"];
  }
}
