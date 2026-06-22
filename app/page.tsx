"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ToyBrick,
  Compass,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Rocket,
  Search,
  Truck,
  Gift,
  Award
} from "lucide-react";
import ExplorePlayWorlds from "@/components/home/feature-section";
import { FeaturedToyes } from "@/components/home/featured-toyes";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  ageGroup: string;
  thumbnail: string;
  benefits: string;
  category: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}




export default function Home() {

  return (
    <div className="flex flex-col gap-12 sm:gap-20 pb-16 -mt-24">


      {/* 1. Responsively Integrated Mockup Hero Section */}
      <section className="relative w-full">
        <div className="h-24 w-full md:bg-[#24b5f9] bg-[#1998f0]"></div>

        {/* Desktop View (md and larger): Renders hero.png as full background cover at native aspect ratio */}
        <div className="hidden md:block relative w-full aspect-[1470/759] bg-[url('/assets/hero.png')] bg-cover bg-center">

          {/* Overlay CTA buttons centered directly below the subtitle in the graphic */}
          <div className="absolute bottom-[38%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 w-full max-w-xl px-4 z-20">
            <Link
              href="/products"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff5400] text-white font-extrabold text-lg shadow-[0_6px_20px_rgba(255,122,0,0.4)] hover:opacity-95 btn-bouncy flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5 animate-pulse" /> Explore Toys
            </Link>
            <Link
              href="/track"
              className="px-8 py-3 rounded-full bg-white border-2 border-sky-blue text-[#1e60ff] font-extrabold text-lg shadow-[0_4px_15px_rgba(30,96,255,0.15)] btn-bouncy flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Track Order
            </Link>
          </div>

          {/* Floating White Features Bar (Desktop overlay) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl bg-white rounded-full border-4 border-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-5 z-30 flex gap-6 justify-between items-center px-8">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-2xl text-emerald-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-800 leading-none">100% Safe Toys</h4>
                <span className="text-xs font-bold text-zinc-400">Non-toxic & child safe</span>
              </div>
            </div>

            <div className="w-px h-10 bg-zinc-200"></div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2.5 rounded-2xl text-indigo-500">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-800 leading-none">Fast Delivery</h4>
                <span className="text-xs font-bold text-zinc-400">At your doorstep</span>
              </div>
            </div>

            <div className="w-px h-10 bg-zinc-200"></div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2.5 rounded-2xl text-[#ff5c8a]">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-800 leading-none">Exciting Gifts</h4>
                <span className="text-xs font-bold text-zinc-400">Surprise with every order</span>
              </div>
            </div>

            <div className="w-px h-10 bg-zinc-200"></div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-2xl text-[#facc15]">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-800 leading-none">Best Quality</h4>
                <span className="text-xs font-bold text-zinc-400">Durable & long lasting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View (below md): Scales image fully at top, puts buttons & features below it */}
        <div className="md:hidden flex flex-col bg-[#e6f7ff] w-full relative">
          {/* Mockup Graphic */}
          <div className="w-full aspect-[1470/759] bg-[url('/assets/hero.png')] bg-cover bg-top bg-no-repeat"></div>

          {/* Active Buttons on white section */}
          <div className=" border-t border-sky-blue/15 absolute top-[24%] left-[29%] px-6 py-6 flex flex-col gap-3 items-center w-50">
            <Link
              href="/products"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff5400] text-white font-extrabold text-base text-center shadow-md btn-bouncy flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" /> Explore Toys
            </Link>
            {/* <Link
              href="/track"
              className="w-full py-3 rounded-full bg-white border-2 border-sky-blue text-sky-blue-hover font-extrabold text-base text-center btn-bouncy flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Track Order
            </Link> */}
          </div>

          {/* Features vertical blocks (Mobile) */}
          <div className="bg-white px-6 pb-8 flex flex-col gap-4 border-t-2 border-zinc-50">
            {/* Feature 1 */}
            <div className="flex items-center gap-3 bg-[#fffdf6] p-3 rounded-2xl border border-zinc-100">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-zinc-800">100% Safe Toys</h4>
                <span className="text-[10px] font-bold text-zinc-400">Non-toxic & child safe</span>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-center gap-3 bg-[#fffdf6] p-3 rounded-2xl border border-zinc-100">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-500">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-zinc-800">Fast Delivery</h4>
                <span className="text-[10px] font-bold text-zinc-400">At your doorstep</span>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-center gap-3 bg-[#fffdf6] p-3 rounded-2xl border border-zinc-100">
              <div className="bg-pink-100 p-2 rounded-xl text-[#ff5c8a]">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-zinc-800">Exciting Gifts</h4>
                <span className="text-[10px] font-bold text-zinc-400">Surprise with every order</span>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-center gap-3 bg-[#fffdf6] p-3 rounded-2xl border border-zinc-100">
              <div className="bg-amber-100 p-2 rounded-xl text-[#facc15]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-zinc-800">Best Quality</h4>
                <span className="text-[10px] font-bold text-zinc-400">Durable & long lasting</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ExplorePlayWorlds />


      {/* 3. Featured Toys */}
      <FeaturedToyes />

      {/* 4. Happy Parents – Testimonials / Social Proof */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Decorative background dots */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(circle, #f97316 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
        }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 border border-rose-200/50 mb-5">
              <span className="text-sm">💬</span>
              <span className="text-xs font-bold text-rose-600 tracking-wide uppercase">
                Real Stories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d3748] mb-3">
              What Happy Parents Say
            </h2>
            <p className="text-zinc-500 font-medium max-w-lg mx-auto">
              Thousands of parents across Bangladesh trust us with their children&apos;s playtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;আমার বাচ্চা এই wooden blocks দিয়ে খেলতে ভালোবাসে! Quality অনেক ভালো আর delivery-ও ফাস্ট ছিলো। Highly recommended for every parent!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-[#2563eb] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  ন
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">নাফিসা আক্তার</span>
                  <span className="text-[10px] font-bold text-zinc-400">Mom of 2 — Dhaka</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;No login, no hassle — just pick the toy and order! My son got his Robot Coding Buddy within 2 days. The packaging was so cute, he didn&apos;t want to open it!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-toy-orange to-[#ff5400] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  R
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">Rafiq Hossain</span>
                  <span className="text-[10px] font-bold text-zinc-400">Dad of 1 — Chittagong</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < 5 ? "text-amber-400" : "text-zinc-200"}`}>★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;Finally a Bangladeshi toy shop that actually cares about quality! The clay set আমার মেয়ে এখনো নিয়ে বসে থাকে। Best birthday gift I ever bought!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  ত
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">তানিয়া ইসলাম</span>
                  <span className="text-[10px] font-bold text-zinc-400">Mom of 3 — Sylhet</span>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;Phone number দিয়েই order track করা যায় — কোনো ঝামেলা নেই! আমি ৩ বার অর্ডার করেছি, প্রতিবারই সময়মতো পেয়েছি।&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  ক
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">কামরুল হাসান</span>
                  <span className="text-[10px] font-bold text-zinc-400">Dad of 2 — Rajshahi</span>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;My daughter loves the telescope kit! She pretends to be an astronaut every night. The quality is premium — you can feel it. Already planning my next order!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  S
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">Samira Khan</span>
                  <span className="text-[10px] font-bold text-zinc-400">Mom of 1 — Khulna</span>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-3xl border-4 border-zinc-100 p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                &ldquo;বাচ্চাদের birthday gift নিয়ে আর চিন্তা নেই! KhelnaPori থেকে চোখ বন্ধ করে অর্ডার দেই। Price-ও reasonable, quality-ও best!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  ম
                </div>
                <div>
                  <span className="font-extrabold text-sm text-zinc-800 block">মাহফুজা আলম</span>
                  <span className="text-[10px] font-bold text-zinc-400">Mom of 2 — Barisal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badge strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-zinc-400 font-bold text-xs">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" /> 2,400+ Happy Families
            </span>
            <span className="hidden sm:inline text-zinc-200">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Verified Reviews
            </span>
            <span className="hidden sm:inline text-zinc-200">|</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> 4.9 / 5.0 Average Rating
            </span>
          </div>
        </div>
      </section>

      {/* 5. How It Works – Visual Step-by-Step */}
      <section className="bg-gradient-to-b from-[#f8f6ff] to-white py-20 px-4 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#a855f7]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-sky-100 border border-indigo-200/50 mb-5">
              <span className="text-sm">🚀</span>
              <span className="text-xs font-bold text-indigo-600 tracking-wide uppercase">
                Super Simple
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d3748] mb-3">
              How KhelnaPori Works
            </h2>
            <p className="text-zinc-500 font-medium max-w-md mx-auto">
              From browsing to your doorstep in 4 magical steps — no sign-ups, no headaches!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#a855f7]/30 via-sky-blue/30 via-toy-orange/30 to-emerald-400/30 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[#a855f7] to-[#7c3aed] p-[3px] mb-5 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500 shadow-[0_8px_30px_rgba(168,85,247,0.3)]">
                <div className="w-full h-full rounded-[1.85rem] bg-white flex flex-col items-center justify-center gap-1">
                  <span className="text-4xl">🔍</span>
                  <span className="text-[10px] font-extrabold text-[#a855f7] bg-purple-100 px-2 py-0.5 rounded-full">Step 1</span>
                </div>
              </div>
              <h3 className="font-extrabold text-lg text-[#2d3748] mb-1">Browse Toys</h3>
              <p className="text-zinc-500 text-xs font-medium max-w-[200px] leading-relaxed">
                Explore our curated collection of safe, educational toys sorted by age group and category.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-sky-blue to-[#2563eb] p-[3px] mb-5 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 shadow-[0_8px_30px_rgba(56,189,248,0.3)]">
                <div className="w-full h-full rounded-[1.85rem] bg-white flex flex-col items-center justify-center gap-1">
                  <span className="text-4xl">🛒</span>
                  <span className="text-[10px] font-extrabold text-sky-blue-hover bg-sky-100 px-2 py-0.5 rounded-full">Step 2</span>
                </div>
              </div>
              <h3 className="font-extrabold text-lg text-[#2d3748] mb-1">Add & Checkout</h3>
              <p className="text-zinc-500 text-xs font-medium max-w-[200px] leading-relaxed">
                Just your name, phone number, and address — no accounts, no passwords. That&apos;s it!
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-toy-orange to-[#ff5400] p-[3px] mb-5 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500 shadow-[0_8px_30px_rgba(255,122,0,0.3)]">
                <div className="w-full h-full rounded-[1.85rem] bg-white flex flex-col items-center justify-center gap-1">
                  <span className="text-4xl">📦</span>
                  <span className="text-[10px] font-extrabold text-toy-orange bg-orange-100 px-2 py-0.5 rounded-full">Step 3</span>
                </div>
              </div>
              <h3 className="font-extrabold text-lg text-[#2d3748] mb-1">We Pack & Ship</h3>
              <p className="text-zinc-500 text-xs font-medium max-w-[200px] leading-relaxed">
                Your toy is carefully packed with love and shipped out the same day across Bangladesh.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 p-[3px] mb-5 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 shadow-[0_8px_30px_rgba(52,211,153,0.3)]">
                <div className="w-full h-full rounded-[1.85rem] bg-white flex flex-col items-center justify-center gap-1">
                  <span className="text-4xl">🎉</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Step 4</span>
                </div>
              </div>
              <h3 className="font-extrabold text-lg text-[#2d3748] mb-1">Joy Delivered!</h3>
              <p className="text-zinc-500 text-xs font-medium max-w-[200px] leading-relaxed">
                Track with your phone number. Your little one gets a surprise at the door! 🎁
              </p>
            </div>
          </div>

          {/* CTA under How It Works */}
          <div className="text-center mt-14">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff5400] text-white font-extrabold text-base shadow-[0_6px_25px_rgba(255,122,0,0.35)] hover:shadow-[0_10px_35px_rgba(255,122,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" /> Start Shopping Now
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Shop With Us */}
      <section className="bg-toy-yellow/10 border-y-4 border-toy-yellow/20 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Why Parents & Kids Love Us</h2>
            <p className="text-zinc-500 font-medium">Simple, safe, and happy shopping!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl text-center border-4 border-toy-yellow/20">
              <span className="text-5xl mb-4 block">⚡</span>
              <h3 className="font-extrabold text-xl mb-2">Instant Checkout</h3>
              <p className="text-zinc-500 text-sm font-medium">
                No username, no passwords, no email confirmations. Fill in name, address, phone and click Buy!
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center border-4 border-sky-blue/20">
              <span className="text-5xl mb-4 block">🛡️</span>
              <h3 className="font-extrabold text-xl mb-2">Child-Safe Designs</h3>
              <p className="text-zinc-500 text-sm font-medium">
                Every toy is handpicked, organic/hypoallergenic, and optimized for children's safety and growth benefits.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center border-4 border-toy-purple/20">
              <span className="text-5xl mb-4 block">📞</span>
              <h3 className="font-extrabold text-xl mb-2">Phone Tracking</h3>
              <p className="text-zinc-500 text-sm font-medium">
                Simply enter your phone number to see exactly where your package is. No tracking codes to memorize!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
