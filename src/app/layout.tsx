import { Nunito } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next'
import JsonLd from '../components/JsonLd'

// SINGLE LINE FONT CONFIGURATION: Change the font import and configuration here to apply project-wide
const fontPrimary = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mesadines.com'),
  title: "Mesa Dines | Premium Cafe & Restaurant Tech",
  description: "Bringing 5-star Cafe and Restaurant Technology to food business owners at affordable prices.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mesa Dines | Premium Cafe & Restaurant Tech",
    description: "Bringing 5-star Cafe and Restaurant Technology to food business owners at affordable prices.",
    url: 'https://mesadines.com',
    siteName: 'Mesa Dines',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mesa Dines - Restaurant Technology',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mesa Dines | Premium Cafe & Restaurant Tech",
    description: "Bringing 5-star Cafe and Restaurant Technology to food business owners at affordable prices.",
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontPrimary.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

