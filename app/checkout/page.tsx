"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-context";
import {
  Trash2,
  MapPin,
  User,
  Phone,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Truck
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  const router = useRouter();

  // Delivery Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shippingCost = cart.length > 0 ? 150 : 0; // Flat shipping rate in Taka
  const grandTotal = cartTotal + shippingCost;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setError("");
    setSubmitting(true);

    // Validation
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all delivery details so we can send your toys! 🦖🚚");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place your order. Please try again.");
      }

      // Clear the local shopping cart
      clearCart();

      // Redirect to success page
      router.push(
        `/order-success?trackingId=${data.trackingId}&total=${data.total}&customerName=${encodeURIComponent(
          customerName.trim()
        )}&phone=${encodeURIComponent(phone.trim())}`
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Empty Cart Layout
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border-4 border-toy-yellow/20 rounded-[32px] p-8 sm:p-12 shadow-sm flex flex-col items-center">
          <span className="text-8xl mb-6 select-none animate-bounce">🦖🎈</span>
          <h1 className="text-3xl font-black text-[#2d3748] mb-3">Your Toy Box is Empty!</h1>
          <p className="text-zinc-500 font-semibold mb-8 text-sm max-w-sm">
            Bopo is waiting to fill your package with magic. Explore our awesome toy universe and add some toys!
          </p>
          <Link
            id="empty-cart-shop-btn"
            href="/products"
            className="px-8 py-3.5 bg-toy-orange text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all btn-bouncy flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" /> Go Shop Toys
          </Link>
        </div>
      </div>
    );
  }

  // 2. Main Checkout Layout
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 font-bold text-zinc-500 hover:text-[#2d3748] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black text-[#2d3748] mb-8 flex items-center gap-3">
        Checkout 🚀
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Shopping Cart List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#2d3748] mb-6 flex items-center gap-2 border-b pb-4">
              <span>🧸</span> Your Toy Box ({cartCount} {cartCount === 1 ? "item" : "items"})
            </h2>

            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center justify-between pb-6 border-b last:border-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-[#fffdf6] border-2 border-zinc-50 rounded-2xl flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-extrabold text-sm text-[#2d3748] hover:text-sky-blue transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <span className="text-xs text-zinc-400 font-bold block mt-1">
                      ৳{item.price.toFixed(2)} each
                    </span>
                  </div>

                  {/* Quantity Modifier and Remove Button */}
                  <div className="flex items-center gap-4">
                    {/* Quantity Select */}
                    <div className="flex flex-col gap-0.5">
                      <select
                        aria-label={`Quantity for ${item.name}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="px-2 py-1.5 border-2 border-zinc-150 rounded-xl focus:outline-none focus:border-sky-blue text-xs font-bold bg-white cursor-pointer"
                      >
                        {[...Array(Math.min(item.stock, 10))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[70px]">
                      <span className="font-black text-sm text-toy-orange block">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Trash Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors btn-bouncy"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sky-blue/5 rounded-3xl p-5 border-2 border-dashed border-sky-blue/20">
            <div className="flex gap-3">
              <ShieldCheck className="w-8 h-8 text-sky-blue flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-[#2d3748]">100% Safe Checkout</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Verify your parcel before paying. Cash on delivery accepted nationwide!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Truck className="w-8 h-8 text-toy-orange flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-[#2d3748]">Instant Tracking</h4>
                <p className="text-[10px] text-zinc-500 font-medium">Get a unique tracking code to follow Bopo the Dino&apos;s delivery progress.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Details Form (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Order Summary & Pricing */}
          <div className="bg-white border-4 border-toy-yellow/20 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#2d3748] mb-6 flex items-center gap-2 border-b pb-4">
              <span>🧾</span> Order Summary
            </h2>

            <div className="space-y-3 font-semibold text-sm text-zinc-500">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-[#2d3748]">৳{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping Delivery</span>
                <span className="text-[#2d3748]">৳{shippingCost.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center font-bold text-base mt-2">
                <span className="text-[#2d3748]">Total Amount</span>
                <span className="text-toy-orange font-black text-xl">৳{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details Form */}
          <div className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#2d3748] mb-6 flex items-center gap-2 border-b pb-4">
              <span>🚚</span> Delivery Details
            </h2>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-2xl text-xs font-bold border-2 border-red-200 mb-4 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
              {/* Customer Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="customerName" className="font-extrabold text-xs text-zinc-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Parent / Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  disabled={submitting}
                  className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold disabled:bg-zinc-50"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="font-extrabold text-xs text-zinc-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Phone Number (Used for tracking)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  disabled={submitting}
                  className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold disabled:bg-zinc-50"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="address" className="font-extrabold text-xs text-zinc-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Delivery Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 42, Road 12, Dhanmondi, Dhaka"
                  disabled={submitting}
                  className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold resize-none disabled:bg-zinc-50"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-4 bg-toy-orange text-white font-black text-base rounded-2xl hover:bg-toy-orange-hover transition-colors shadow-md btn-bouncy disabled:bg-zinc-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? "Placing Order..." : `Place Order • ৳${grandTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
