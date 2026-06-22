import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, Lightbulb, Truck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Toy Planet - Safe & Fun Toys",
  description: "Discover the story behind Toy Planet, our commitment to 100% safe & educational toys, and how we bring endless joy to children across Bangladesh.",
};

export default function AboutUsPage() {
  return (
    <div className="flex-grow bg-[#fffdf6] text-[#2d3748] font-sans">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden bg-gradient-to-b from-[#e6f7ff]/50 to-[#fffdf6]">
        {/* Background blobs for playful aesthetics */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-toy-yellow/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-toy-purple/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-indigo-100 border border-sky-200/50 mb-6 shadow-sm">
            <span className="text-sm">🪐</span>
            <span className="text-xs font-black text-sky-blue-hover tracking-wider uppercase">
              Our Universe
            </span>
          </div>
          
          <h1 id="about-page-main-heading" className="text-4xl sm:text-6xl font-black tracking-tight text-[#2d3748] mb-6 leading-tight">
            Welcome to <span className="text-[#ff5c8a] inline-block hover:scale-105 transition-transform cursor-default">Toy</span> <span className="text-sky-blue inline-block hover:scale-105 transition-transform cursor-default">Planet</span>!
          </h1>
          
          <p className="text-lg sm:text-2xl text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            We are on a cosmic mission to make childhood magical, safe, and filled with endless wonder—one happy smile at a time! 🚀✨
          </p>
        </div>
      </section>

      {/* Story & Mascot Split Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border-4 border-toy-yellow/20 rounded-[32px] p-8 sm:p-12 shadow-sm">
          
          {/* Story (Left Column) */}
          <div className="md:col-span-7 space-y-6">
            <h2 id="about-story-heading" className="text-3xl font-extrabold text-toy-orange flex items-center gap-2">
              Our Story 📖
            </h2>
            
            <p className="text-zinc-600 font-semibold leading-relaxed">
              Toy Planet was born out of a simple, heartwarming dream: to build a playground of imagination where kids can grow, learn, and explore, while giving parents a shopping experience that is completely stress-free.
            </p>
            
            <p className="text-zinc-500 font-medium text-sm leading-relaxed">
              As toy lovers and parents ourselves, we noticed how hard it was to find certified safe, high-quality, and brain-boosting toys in Bangladesh without getting tangled in complicated websites, password memory games, or delayed deliveries. We thought, <span className="italic font-bold text-sky-blue">"Why can't toy shopping be as fun and instant as playtime?"</span>
            </p>
            
            <p className="text-zinc-500 font-medium text-sm leading-relaxed">
              So, we curated the finest toys, built a super-fast instant checkout using just a phone number, and launched Toy Planet. Today, we are proud to serve families all across the country, transforming screen-time into interactive play-time.
            </p>
          </div>

          {/* Mascot Feature Card (Right Column) */}
          <div className="md:col-span-5 bg-[#fffdf6] border-4 border-dashed border-toy-purple/30 rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Background sparkle decorations */}
            <div className="absolute top-2 right-2 text-toy-yellow text-xl animate-pulse">⭐</div>
            <div className="absolute bottom-4 left-4 text-toy-orange text-lg">✨</div>
            
            <div className="relative w-40 h-40 mb-4 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/assets/bopo_mascot.png"
                alt="Bopo the Toy Planet Mascot"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <h3 id="about-mascot-heading" className="text-xl font-black text-toy-purple mb-2">
              Meet Bopo! 🦖
            </h3>
            
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">
              Bopo is our resident friendly dinosaur and Toy Planet&apos;s Chief Fun Officer! He tests all our toys for extra bounciness, helps check packages, and slides down timelines to show your order status!
            </p>
          </div>

        </div>
      </section>

      {/* Core Values / Features Grid */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#fffdf6] to-[#e6f7ff]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="about-values-heading" className="text-3xl sm:text-4xl font-extrabold text-[#2d3748] mb-3">
              Why Parents Trust Toy Planet 💛
            </h2>
            <p className="text-zinc-500 font-semibold max-w-lg mx-auto text-sm">
              We design every part of our experience with safety, education, and ultimate speed in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-white border-4 border-emerald-100 rounded-3xl p-6 shadow-sm hover:border-toy-green transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-toy-green flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-zinc-800 mb-2">100% Safe Materials</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Safety first! Every toy is handpicked and verified to use non-toxic, child-safe, and durable materials with baby-friendly smooth edges.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white border-4 border-sky-100 rounded-3xl p-6 shadow-sm hover:border-sky-blue transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-blue flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-zinc-800 mb-2">No Password Checkout</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Zero friction! Forget complicated accounts. Enter your phone number at checkout, receive updates, and track progress instantly.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white border-4 border-amber-100 rounded-3xl p-6 shadow-sm hover:border-toy-yellow transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-toy-yellow flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-zinc-800 mb-2">Play-to-Learn Boost</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Our toys are designed to spark cognitive growth, creativity, fine motor skills, and problem-solving through active, hands-on fun!
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white border-4 border-indigo-100 rounded-3xl p-6 shadow-sm hover:border-toy-purple transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#c084fc] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-zinc-800 mb-2">Super Fast Delivery</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Directly from our fulfillment center to your child&apos;s waiting arms. We wrap every package securely to make it gift-ready on arrival!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-toy-orange to-[#ff5400] text-white rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          {/* Decorative design bubbles */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          
          <span className="text-5xl mb-4 block animate-bounce">🎁</span>
          <h2 id="about-cta-heading" className="text-3xl sm:text-4xl font-black mb-4">
            Ready to find the next favorite toy?
          </h2>
          <p className="text-white/95 font-semibold text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Browse our curated categories of educational, creative, and action-filled toys. Checkout takes less than 30 seconds!
          </p>

          <Link
            id="about-cta-shop-btn"
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-toy-orange font-black rounded-full shadow-lg hover:shadow-xl transition-all btn-bouncy text-base"
          >
            Explore Toy Planet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
