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
  description: "QR-based ordering system for Indian cafés and restaurants. Reduce order errors, serve faster, and keep customers coming back. Affordable cafe tech, built for India 🇮🇳",
  verification: {
    google: 'im-XKzUKzrHbT6IR7TiMahFpEiKMAVtFOQFdiZ-uNvw',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mesa Dines | Premium Cafe & Restaurant Tech",
    description: "QR-based ordering system for Indian cafés and restaurants. Reduce order errors, serve faster, and keep customers coming back. Affordable cafe tech, built for India 🇮🇳",
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
    description: "QR-based ordering system for Indian cafés and restaurants. Reduce order errors, serve faster, and keep customers coming back. Affordable cafe tech, built for India 🇮🇳",
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
      {/* Preload LCP hero image — page.tsx is client-only so the browser */}
      {/* wouldn't discover this URL until JS hydrates. This server-side   */}
      {/* hint tells the browser to fetch it immediately from raw HTML.    */}
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fhero-image.png&w=750&q=75"
        fetchPriority="high"
      />
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

