import type { Metadata } from "next";
import { Baloo_Da_2 } from "next/font/google";
import Link from "next/link";
import { Home, LayoutGrid, Gift, Heart, Search } from "lucide-react";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { CartIcon } from "@/components/common/cart-icon";
import Image from "next/image";


const baloo = Baloo_Da_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Toy Planet - Fun & Safe Toys for Kids!",
  description: "Browse toys, place orders instantly without registration, and track deliveries using just your phone number!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fffdf6] text-[#2d3748] font-sans">
        <CartProvider>

          {/* Playful Floating Header Navbar */}
          <header className="sticky top-0 z-50 px-4 py-3">
            <div className="max-w-6xl mx-auto bg-white rounded-full border-4 border-sky-blue/20 shadow-[0_8px_30px_rgb(56,189,248,0.1)] px-6 py-2 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-1 group">
                <Image src="/assets/toy-logo.png" alt="Logo" width={100} height={50} />
              </Link>

              {/* Middle Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="flex items-center gap-1.5 font-extrabold text-sm text-[#ff5c8a] hover:opacity-80 transition-opacity">
                  <Home className="w-4 h-4" /> Home
                </Link>
                <Link href="/products" className="flex items-center gap-1.5 font-extrabold text-sm text-zinc-600 hover:text-zinc-800 transition-colors">
                  <LayoutGrid className="w-4 h-4 text-sky-blue" /> Categories
                </Link>
                <Link href="/products" className="flex items-center gap-1.5 font-extrabold text-sm text-zinc-600 hover:text-zinc-800 transition-colors">
                  <Gift className="w-4 h-4 text-toy-orange" /> All Toys
                </Link>
                <Link href="/about" className="flex items-center gap-1.5 font-extrabold text-sm text-zinc-600 hover:text-zinc-800 transition-colors">
                  <Heart className="w-4 h-4 text-toy-purple" /> About Us
                </Link>
              </nav>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                <Link
                  href="/track"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-sky-blue/30 bg-sky-blue/5 hover:bg-sky-blue/10 text-sky-blue-hover font-extrabold text-xs sm:text-sm btn-bouncy"
                >
                  <Search className="w-3.5 h-3.5" /> Track Order
                </Link>

                {/* Cart Button */}
                <CartIcon />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col">{children}</main>

          {/* Footer */}
          <footer className="border-t-4 border-toy-yellow/20 bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="flex justify-center">

                <Image src='/assets/toy-logo.png' width={200} height={50} alt='logo' />
              </div>
              <p className="text-sm text-zinc-500 max-w-md mx-auto mb-4">
                Designed to make toy shopping a delightful and engaging experience for kids, and a fast, hassle-free checkout for parents.
              </p>
              <p className="text-xs text-zinc-400 font-medium">
                &copy; {new Date().getFullYear()} Toy Planet. Made with 💛 for kids & parents.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
