import type { Metadata } from "next";
import { Geist, Geist_Mono,Roboto } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "./client_session";


const roboto = Roboto({
  variable:"--font-roboto",
  subsets:["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First_Meet",
  description: "That's not a bug — it's an undocumented feature!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${roboto.variable} ${geistMono.variable} antialiased`}
      ><ClientSessionProvider>
        {children}</ClientSessionProvider>
      </body>
    </html>
  );
}
