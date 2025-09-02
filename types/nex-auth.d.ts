import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      role?: string;
      phone?: string;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      role?: string;
      phone?: string;
    };
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
