import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nathan Lutz",
    template: "%s | Nathan Lutz",
  },
  description: "Personal website of Nathan Lutz - Software Engineer at Microsoft working on AI, search, and evaluation systems.",
  openGraph: {
    title: "Nathan Lutz",
    description: "Software Engineer at Microsoft working on AI, search, and evaluation systems.",
    url: "https://nathanlutz.dev",
    siteName: "Nathan Lutz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Lutz",
    description: "Software Engineer at Microsoft working on AI, search, and evaluation systems.",
    creator: "@NathanLutz20520",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
