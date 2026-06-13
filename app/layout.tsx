import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/lib/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nasaq.id'),
  title: {
    default: "nasaq — Full-stack Developer Portfolio",
    template: "%s | nasaq.id"
  },
  description: "nasaq.id — Full-stack development studio. Production-grade web & Android systems. Specializing in Next.js, TypeScript, tRPC, PostgreSQL. Featured: WC Check, LakuPOS, Serat QC, TraceFlow.",
  keywords: [
    "nasaq.id",
    "nasaq",
    "Full-stack Developer",
    "Full-stack Engineer",
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
    "AGDS POS",
    "Selisih Berat",
    "School Management System",
    "Solana",
    "Web3"
  ],
  authors: [{ name: "nasaq.id", url: "https://github.com/nohypelabs" }],
  creator: "nasaq.id",
  publisher: "nasaq.id",
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
    url: 'https://nasaq.id',
    title: 'nasaq — Full-stack Developer',
    description: '7 production systems shipped in <1 year, 250K+ records processed. Next.js, TypeScript, tRPC, PostgreSQL. From logistics QC to POS systems.',
    siteName: 'nasaq Portfolio',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'nasaq Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nasaq — Full-stack Developer',
    description: '7 production systems | 250K+ records | Next.js, tRPC, PostgreSQL | Logistics, Retail',
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
  // verification: {
  //   google: 'GOOGLE_SITE_VERIFICATION_CODE',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
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
