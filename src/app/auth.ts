import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from"next-auth/providers/google"
import prisma from "../../lib/prisma";
import { compare } from "bcryptjs";
import { AdapterUser } from "next-auth/adapters";
import { User } from "next-auth";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new Error("Please enter both email and password");
        }

        const user = await prisma.emUser.findFirst({
          where: {
            userEmail: email,
          },
        });

        if (!user || !user.userPassword) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(password, user.userPassword);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.userId.toString(),
          email: user.userEmail,
          name: user.userFirstName,
        } as AdapterUser & User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
  session: {
    strategy: "jwt", 
  },
});
