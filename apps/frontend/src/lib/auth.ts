import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser extends NextAuthUser {
  id: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Invalid credentials");
          }

          const user = (await res.json()) as ExtendedUser; 

          if (!user?.token) {
            throw new Error("Token not provided");
          }

          return user;
        } catch (error: unknown) {
          console.error("Authorization error:", error);
          throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
      },  
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as ExtendedUser).id;
        token.email = user.email;
        token.accessToken = (user as ExtendedUser).token; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
};
