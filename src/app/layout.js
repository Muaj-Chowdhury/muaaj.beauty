import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from 'react-hot-toast';
import NextAuthProvider from "@/provider/NextAuthProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://muaaj-beauty.vercel.app'),
  title: {
    default: "MUAAJ.beauty | Organic Skincare & Professional Cosmetics",
    template: "%s | MUAAJ.beauty",
  },
  description: "Discover curated, eco-conscious skincare and clinical-grade cosmetics. MUAAJ.beauty brings you the intersection of botanical logic and professional results.",
  keywords: ["skincare", "organic beauty", "vegan cosmetics", "MUAAJ beauty", "serums", "personal care"],
  authors: [{ name: "MUAAJ" }],
  creator: "MUAAJ",
  // Standard OpenGraph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muaaj-beauty.vercel.app", // Update with your real domain
    siteName: "MUAAJ.beauty",
    images: [
      {
        url: "/og-image.jpg", // Create a professional brand image in /public
        width: 1200,
        height: 630,
        alt: "MUAAJ.beauty - Natural Radiance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUAAJ.beauty | Organic Skincare",
    description: "Botanical logic meets professional results.",
    images: ["/og-image.jpg"], 
  },
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" data-theme="glowLight">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ` } suppressHydrationWarning={true}
      >{/* Place it here so it's globally available */}
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Optional: Customize the look to match your "Glow" theme
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <header><Navbar /></header>
        <main className="grow pt-24 md:pt-32">
          {children}
        </main>

        <footer><Footer></Footer></footer>
        
      </body>
    </html>
    </NextAuthProvider>
  );
}
