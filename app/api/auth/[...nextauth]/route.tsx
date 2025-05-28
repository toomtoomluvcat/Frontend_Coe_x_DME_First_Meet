import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import axios from "axios";
import Email from "next-auth/providers/email";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const emailDomain = user.email?.split("@")[1];
      console.log(emailDomain);
      if (emailDomain != "kkumail.com") {
        return false;
      }
      const formData = {
        email: user.email,
        profile: user.image,
      };
      try {
        console.log(formData)
        const res = await axios.post("https://landing-coe-x-dme.onrender.com/join", formData);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
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
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
