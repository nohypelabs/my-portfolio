import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nasaq.id'),
  title: {
    default: "nasaq.id — Website, Company Profile & Custom Systems",
    template: "%s | nasaq.id"
  },
  description: "nasaq.id adalah jasa website dan android app development untuk company profile, website bisnis, dashboard internal, dan sistem custom yang benar-benar dipakai tim. Cocok untuk bisnis yang butuh surface lebih meyakinkan dan workflow lebih rapi.",
  keywords: [
    "nasaq.id",
    "jasa pembuatan website",
    "company profile",
    "website bisnis",
    "dashboard internal",
    "sistem operasional",
    "aplikasi android",
    "web app custom",
    "website dan android app development",
    "software house indonesia",
    "next.js indonesia"
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
      { url: '/picture/nasaq-id-photo.png' },
      { url: '/favicon.ico' },
    ],
    apple: '/picture/nasaq-id-photo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://nasaq.id',
    title: 'nasaq.id — Website & Android App Development',
    description: 'Website bisnis, company profile, dashboard internal, dan sistem custom untuk tim yang butuh surface lebih serius dan workflow yang lebih rapi.',
    siteName: 'nasaq.id',
    images: [
      {
        url: '/picture/nasaq-id-photo.png',
        width: 800,
        height: 800,
        alt: 'nasaq.id',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nasaq.id — Website, Company Profile & Custom Systems',
    description: 'Website dan android app development untuk company profile, dashboard internal, dan sistem custom.',
    creator: '@agdscID',
    images: ['/picture/nasaq-id-photo.png'],
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
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
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
