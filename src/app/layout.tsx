import { Nunito } from "next/font/google";
import "./globals.css";

// SINGLE LINE FONT CONFIGURATION: Change the font import and configuration here to apply project-wide
const fontPrimary = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});

export const metadata = {
  title: "Mesa Dines | Premium Cafe & Restaurant Tech",
  description: "Bringing 5-star Cafe and Restaurant Technology to food business owners at affordable prices.",
};

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
        {children}
      </body>
    </html>
  );
}

