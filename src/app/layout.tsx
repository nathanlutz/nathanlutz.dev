import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/smk2vco.css" />
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="max-w-4xl mx-auto px-10 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
