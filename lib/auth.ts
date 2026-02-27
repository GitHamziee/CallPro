import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./prisma";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set. Add it to .env.local.");
}

// Re-validate tokenVersion against DB at most once every 5 minutes.
// A revoked token stays valid for at most 5 more minutes.
const TOKEN_REVALIDATION_INTERVAL = 5 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tokenVersion: user.tokenVersion,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial login — embed all fields including tokenVersion
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.tokenVersion = user.tokenVersion ?? 0;
        token.lastChecked = Date.now();
        return token;
      }

      // Subsequent requests — periodically re-validate against DB
      const now = Date.now();
      if (now - token.lastChecked > TOKEN_REVALIDATION_INTERVAL) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { tokenVersion: true, role: true },
          });

          // User deleted — invalidate token
          if (!dbUser) {
            return {} as typeof token;
          }

          // tokenVersion mismatch — force re-login
          if (dbUser.tokenVersion !== token.tokenVersion) {
            return {} as typeof token;
          }

          // Refresh role in case it changed
          token.role = dbUser.role;
          token.lastChecked = now;
        } catch (error) {
          // On DB error, skip check — prevents mass sign-outs on transient Neon outage
          console.error("Token revalidation DB error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
