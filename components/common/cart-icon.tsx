"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useEffect, useState } from "react";

export function CartIcon() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/checkout"
      className="relative p-2 bg-sky-blue/10 hover:bg-sky-blue/20 rounded-full transition-colors group flex items-center justify-center btn-bouncy"
      id="navbar-cart-button"
    >
      <ShoppingCart className="w-5 h-5 text-sky-blue-hover" />
      {mounted && cartCount > 0 && (
        <span
          id="navbar-cart-count"
          className="absolute -top-1.5 -right-1.5 bg-[#ff5c8a] text-white font-extrabold text-xxs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}
