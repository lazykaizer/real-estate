import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EstateIQ — Smart Real Estate, Trusted Results",
    template: "%s | EstateIQ",
  },
  description:
    "India's smartest real estate platform. Search 250,000+ verified listings, connect with top agents, and find your dream home with AI-powered tools.",
  keywords: [
    "real estate",
    "property",
    "buy home",
    "rent apartment",
    "India",
    "EstateIQ",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-gray-dark bg-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
