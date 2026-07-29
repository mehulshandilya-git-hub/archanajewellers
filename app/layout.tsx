import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import Cursor from "@/components/Cursor";
import Providers from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCHANA JEWELERS | Premium Gold Jewellery | Exclusive Gold Nosepins | Bhagalpur",
  description:
    "Discover premium gold jewellery, bridal collections and exclusive QR verified gold nosepins from ARCHANA JEWELERS in Bhagalpur. Elegant craftsmanship backed by authenticity and trust.",
  keywords: [
    "gold jewellery",
    "bridal jewellery",
    "gold nosepins",
    "Bhagalpur jewellers",
    "QR verified gold",
    "ARCHANA JEWELERS",
    "NKM Nosepins",
  ],
  openGraph: {
    title: "ARCHANA JEWELERS | Premium Gold Jewellery",
    description:
      "Timeless Elegance. Authentic Gold. Trusted Generations.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-primary-bg text-white font-body antialiased">
        <LoadingScreen />
        <Cursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
