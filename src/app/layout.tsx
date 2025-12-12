import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OUNUU Health Alliance",
  description:
    "OUNUU Health Alliance mission is to serve humanity through health optimization, community support, and alleviating the ordeal of the indigent groups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dancingScript.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
