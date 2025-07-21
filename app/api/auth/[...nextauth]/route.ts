import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("WARNING: NEXTAUTH_SECRET is not set in environment variables!");
}

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      const emailDomain = user.email?.split("@")[1];
      if (emailDomain !== "kkumail.com") {
        console.log(`Unauthorized domain: ${emailDomain}`);
        return false;
      }

      try {
        await axios.post(
          "https://landing-coe-x-dme.onrender.com/join",
          {
            email: user.email,
            profile: user.image,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );
        return true;
      } catch (error: any) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
        return false;
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
