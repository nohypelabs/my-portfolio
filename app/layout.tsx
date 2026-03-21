import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/lib/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abdulgofur.vercel.app'),
  title: {
    default: "Abdul Gofur - Full-stack Developer Portfolio",
    template: "%s | Abdul Gofur"
  },
  description: "Portfolio of Abdul Gofur (agds-dev), Full-stack Developer & AI-Augmented Engineer. 15+ production projects built in <1 year. Specializing in Next.js, React, TypeScript, tRPC, Prisma. Featured projects: WC Check, Eduvate, E-Commerce, Trading Bots.",
  keywords: [
    "Abdul Gofur",
    "agds-dev",
    "Full-stack Developer",
    "AI-Augmented Engineer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "tRPC",
    "Prisma",
    "Portfolio",
    "Indonesia Developer",
    "WC Check",
    "Eduvate",
    "E-Commerce",
    "Trading Bot",
    "AGDS POS",
    "Selisih Berat",
    "School Management System",
    "Solana",
    "Web3"
  ],
  authors: [{ name: "Abdul Gofur", url: "https://github.com/agds-alt" }],
  creator: "Abdul Gofur",
  publisher: "Abdul Gofur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/avatar.jpg' },
      { url: '/favicon.ico' },
    ],
    apple: '/avatar.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulgofur.vercel.app',
    title: 'Abdul Gofur - Full-stack Developer & AI-Augmented Engineer',
    description: '15+ production-ready projects built in <1 year. Modern tech stack: Next.js, React, TypeScript, tRPC, Prisma. From e-commerce to trading bots.',
    siteName: 'Abdul Gofur Portfolio',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Abdul Gofur Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Gofur - Full-stack Developer & AI-Augmented Engineer',
    description: '15+ production projects | Next.js, tRPC, Prisma | E-commerce, Trading Bots, School Systems, Web3',
    creator: '@agdscID',
    images: ['/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
