import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fashion Vault | Luxury Pakistani Fashion & Ecommerce",
  description: "Unlock Your Style with Fashion Vault. Premium fashion, designer bags, authentic perfumes, and luxury accessories curated for the modern taste in Pakistan. Delivery across Islamabad, Lahore, Karachi, and nationwide.",
  keywords: ["Fashion Pakistan", "Luxury Brands", "Designer Clothes", "Perfumes Pakistan", "Handbags"],
  openGraph: {
     title: "Fashion Vault | Luxury Pakistani Fashion",
     description: "Discover exclusive clothing, bags, perfumes, and accessories curated for the modern taste.",
     url: "https://fashionvault.pk",
     siteName: "Fashion Vault",
     locale: "en_PK",
     type: "website",
  },
  twitter: {
     card: "summary_large_image",
     title: "Fashion Vault",
     description: "Pakistan's premier luxury fashion destination.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-primary text-ivory min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-grow pt-[88px]"> {/* Space for fixed header */}
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
