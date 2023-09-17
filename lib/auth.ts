import { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
