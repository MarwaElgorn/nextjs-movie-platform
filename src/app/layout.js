import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Movie App - Manage Your Movie Collection",
  description:
    "A professional movie browsing and management application built with Next.js",
};

/**
 * Root Layout
 * Provides global structure, Navbar, Footer, and Toast provider
 * Server component - applies to all pages
 */
export default function RootLayout({ children }) {
  return (
    <html data-theme="dark" lang="en">
      <head>
        <link rel="icon" href="/logoicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
