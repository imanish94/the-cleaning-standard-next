import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {verifyUser} from "@/utils/api/common";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email address", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        try {
          const params = {
            email: credentials.email,
            password: credentials.password
          };

          const url = `${process.env.API_URL}/customer/login`;
          const { data } = await axios.post(url, params);

          if (data.status) {
            return {
              ...data.data,
              token: data.token
            };
          }
          else {
            throw new Error(data.message);
          }
        } catch (e) {
          throw new Error(e.message);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update" && session) {
        token.user = { ...token.user, ...session?.user };
        return token;
      }

      if (user) {
        token.user = {
          ...user,
          token: user.token
        };
      }

      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    session: async ({ session, token }) => {
      const isUserValid = await verifyUser({
        token: token.user.token
      });

      let newSession = { ...session };

      if (isUserValid.status) {
        newSession.user = {
          ...isUserValid.data,
          token: token.user.token
        };
      } else {
        if (token.user) {
          newSession.user = {
            ...token.user,
            token: token.user.token
          };
        }
      }
      console.log("session", newSession);  
      return newSession;
    }
  },
  pages: {
    signIn: "/account/login",
    signOut: "/auth/signout"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 2 * 60 * 60
  }
};

export default NextAuth(authOptions);
