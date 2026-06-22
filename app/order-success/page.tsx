"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Clipboard, CheckCircle2, Home, Search } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("trackingId") || "TP-000000";
  const total = searchParams.get("total") ? parseFloat(searchParams.get("total")!) : 0;
  const customerName = searchParams.get("customerName") || "Friend";

  useEffect(() => {
    // Fire confetti!
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#38bdf8", "#facc15", "#fb923c", "#4ade80", "#c084fc"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#38bdf8", "#facc15", "#fb923c", "#4ade80", "#c084fc"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    alert("Copied tracking ID to clipboard! 📋");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      {/* Confetti & Success Banner */}
      <div className="bg-white border-4 border-toy-green/20 rounded-3xl p-8 shadow-sm flex flex-col items-center">
        <CheckCircle2 className="w-20 h-20 text-toy-green-hover mb-4 animate-bounce" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-toy-green-hover mb-2">Woohoo! Order Placed!</h1>
        <p className="text-zinc-600 font-medium mb-6">
          Thank you, <span className="font-extrabold">{customerName}</span>! Your order has been successfully placed.
        </p>

        {/* Mascot celebrating */}
        <div className="text-8xl mb-4 select-none">🦖🎈🎉</div>

        {/* Tracking ID Box */}
        <div className="w-full bg-[#fffdf6] border-2 border-dashed border-toy-yellow rounded-2xl p-5 mb-6">
          <span className="text-xs font-bold uppercase text-zinc-400 block mb-1">Your Tracking ID</span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-black tracking-widest text-[#2d3748]">{trackingId}</span>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white hover:bg-zinc-100 border-2 rounded-xl text-zinc-500 hover:text-zinc-700 transition-colors btn-bouncy"
              title="Copy ID"
            >
              <Clipboard className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Order Info */}
        <div className="w-full border-t pt-4 flex justify-between text-zinc-500 font-bold mb-8">
          <span>Amount Charged</span>
          <span className="text-toy-orange text-lg font-black">৳{total.toFixed(2)}</span>
        </div>

        {/* Button Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/"
            className="flex-1 py-3 bg-[#2d3748] text-white font-extrabold rounded-2xl hover:bg-zinc-800 text-center flex items-center justify-center gap-2 btn-bouncy text-sm"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href={`/track?phone=${searchParams.get("phone") || ""}`}
            className="flex-1 py-3 bg-sky-blue text-white font-extrabold rounded-2xl hover:bg-sky-blue-hover text-center flex items-center justify-center gap-2 btn-bouncy text-sm"
          >
            <Search className="w-4 h-4" /> Track Status
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-16 text-center font-bold text-lg">
        Preparing success screen... 🎉
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
