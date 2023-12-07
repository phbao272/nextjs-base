import { IUserLoginRes } from "@/libs/types/user";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "my-project",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        return {
          "user": {
              "id": 1,
              "name": "Zen Admin",
              "email": "zen_admin@gmail.com"
          },
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiWmVuIEFkbWluIiwiaWF0IjoxNzAxODU5MDg5LCJleHAiOjE3MDE4NTkxMTl9.kIuHfloMMFAepzUDe1suVMvi5DtW421UX8Fh8APE80E",
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiWmVuIEFkbWluIiwiaWF0IjoxNzAxODU5MDg5LCJleHAiOjE3MDE5NDU0ODl9.nVau-MbkfQNlq4S1mMrI8l4ZiEvgVDvl2O6PWGqsNW4"
      } as any;

        // const res = await axios.post<IUserLoginRes>(
        //   "http://localhost:9981/auth/login",
        //   payload,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // if (res.data) {
        //   return res.data as any;
        // }

        // return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const _user = user as unknown as IUserLoginRes;

      const isSignIn = trigger === "signIn";
      if (user && isSignIn) {
        return {
          ...token,
          name: _user.user.name,
          email: _user.user.email,
          accessToken: _user?.accessToken,
          refreshToken: _user?.refreshToken,
        };
      }

      if (trigger === "update") {
        token.user = {
          ...(token?.user as Record<string, unknown>),
          ...session,
        };
      }

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export default handler;
