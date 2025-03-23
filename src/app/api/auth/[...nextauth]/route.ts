import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email..." },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        console.log("Credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          console.log(res);

          if (res.status === 200 && res.data.user) {
            return res.data.user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url === "/api/auth/signout") {
        return "/"; // Redirect to home page after logout
      }
      return baseUrl + "/task";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
