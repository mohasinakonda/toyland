"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Phone, Calendar, CircleDot, ChevronRight, HelpCircle } from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    thumbnail: string;
  };
}

interface StatusHistory {
  id: string;
  status: string;
  createdAt: string;
}

interface Order {
  id: string;
  trackingId: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
  statusHistory: StatusHistory[];
}

const STATUS_STEPS = ["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"];

const STATUS_LABELS: { [key: string]: { label: string; icon: string; color: string } } = {
  PLACED: { label: "Order Placed", icon: "🧸", color: "bg-sky-blue text-white" },
  CONFIRMED: { label: "Confirmed", icon: "⚙️", color: "bg-toy-yellow text-toy-text" },
  PACKED: { label: "Packed & Ready", icon: "📦", color: "bg-toy-orange text-white" },
  SHIPPED: { label: "Shipped out", icon: "🚚", color: "bg-toy-purple text-white" },
  DELIVERED: { label: "Delivered!", icon: "🎉", color: "bg-toy-green text-white" },
  CANCELLED: { label: "Cancelled", icon: "❌", color: "bg-red-500 text-white" },
};

function TrackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async (phoneNum: string) => {
    if (!phoneNum.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phoneNum.trim())}`);
      if (!res.ok) {
        throw new Error("Failed to search orders");
      }
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Failed to search orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const phoneParam = searchParams.get("phone");
    if (phoneParam) {
      setPhone(phoneParam);
      fetchOrders(phoneParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    // Update URL search parameters
    router.push(`/track?phone=${encodeURIComponent(phone.trim())}`);
    fetchOrders(phone);
  };

  // Helper to calculate progress step index
  const getStepIndex = (status: string) => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="bg-white border-4 border-toy-yellow/20 rounded-3xl p-6 mb-8 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold mb-2">Track Your Order 🚀</h1>
        <p className="text-zinc-500 font-medium mb-6 text-sm">
          No passwords required! Simply enter the phone number used during checkout to track progress.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-grow">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 01712345678"
              className="w-full pl-10 pr-4 py-3 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
              required
            />
            <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-sky-blue text-white font-extrabold rounded-2xl hover:bg-sky-blue-hover btn-bouncy text-sm disabled:bg-zinc-300"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-blue mx-auto mb-2"></div>
          <p className="font-extrabold text-sm text-zinc-500">Searching Toy Planet databases... 🛸</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-2 border-red-200 text-red-500 p-4 rounded-2xl font-bold text-center text-sm">
          {error}
        </div>
      ) : searched && orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border-4 border-dashed border-zinc-200">
          <span className="text-6xl mb-4 block">🦖❓</span>
          <h3 className="font-extrabold text-lg text-zinc-700">No Orders Found</h3>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto">
            Bopo couldn't find any orders matching the phone number <span className="font-bold">{phone}</span>. Double-check and try again!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => {
            const isCancelled = order.status === "CANCELLED";
            const currentStepIdx = getStepIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6"
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <span className="text-xxs font-bold uppercase text-zinc-400 block">Tracking ID</span>
                    <span className="text-lg font-black text-[#2d3748] tracking-widest">
                      {order.trackingId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-xs shadow-sm flex items-center gap-1 ${STATUS_LABELS[order.status]?.color || "bg-zinc-200"
                        }`}
                    >
                      <span>{STATUS_LABELS[order.status]?.icon}</span>
                      <span>{STATUS_LABELS[order.status]?.label}</span>
                    </span>
                  </div>
                </div>

                {/* Progress Tracker (Mascot 🦖 sliding animation mockup) */}
                {!isCancelled ? (
                  <div className="my-4">
                    {/* Status track line */}
                    <div className="relative">
                      {/* Gray line */}
                      <div className="absolute top-1/2 left-0 w-full h-2 bg-zinc-100 -translate-y-1/2 rounded-full"></div>
                      {/* Active colored line */}
                      <div
                        className="absolute top-1/2 left-0 h-2 bg-toy-orange -translate-y-1/2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(Math.max(0, currentStepIdx) / (STATUS_STEPS.length - 1)) * 100}%`,
                        }}
                      ></div>

                      {/* Moving Mascot Dino 🦖 */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 z-10"
                        style={{
                          left: `${(Math.max(0, currentStepIdx) / (STATUS_STEPS.length - 1)) * 100}%`,
                        }}
                      >
                        <span className="text-3xl sm:text-4xl block -mt-1 select-none animate-bounce">🦖</span>
                      </div>

                      {/* Progress Steps Circles */}
                      <div className="flex justify-between items-center relative">
                        {STATUS_STEPS.map((step, idx) => {
                          const isCompleted = idx <= currentStepIdx;
                          const isActive = idx === currentStepIdx;
                          return (
                            <div key={step} className="flex flex-col items-center gap-2 relative">
                              <div
                                className={`w-8 h-8 rounded-full border-4 flex items-center justify-center font-bold text-xs transition-colors z-20 ${isActive
                                  ? "bg-toy-orange border-white text-white shadow-md scale-110"
                                  : isCompleted
                                    ? "bg-sky-blue border-white text-white"
                                    : "bg-white border-zinc-200 text-zinc-300"
                                  }`}
                              >
                                {STATUS_LABELS[step]?.icon}
                              </div>
                              <span
                                className={`text-[8px] font-extrabold uppercase absolute top-10 whitespace-nowrap text-center ${isActive
                                  ? "text-toy-orange"
                                  : isCompleted
                                    ? "text-sky-blue-hover"
                                    : "text-zinc-400"
                                  }`}
                              >
                                {STATUS_LABELS[step]?.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Padding space for tags below timeline */}
                    <div className="h-6"></div>
                  </div>
                ) : (
                  <div className="bg-red-50 border-2 border-red-100 p-4 rounded-2xl text-center text-red-500 font-bold">
                    This order was cancelled. If you have questions, please contact our toy agents! 🦖📞
                  </div>
                )}

                {/* Items Summary */}
                <div className="bg-[#fffdf6] rounded-2xl p-4 border border-zinc-100">
                  <span className="text-xxs font-bold uppercase text-zinc-400 block mb-2">Order Items</span>
                  <div className="flex flex-col gap-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🧸</span>
                          <span className="font-extrabold text-zinc-700">{item.product.name}</span>
                          <span className="text-xs text-zinc-400 font-semibold">x{item.quantity}</span>
                        </div>
                        <span className="font-black text-[#2d3748]">
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t mt-3 pt-3 flex justify-between items-center text-zinc-500 font-bold text-sm">
                    <span>Total Paid</span>
                    <span className="text-toy-orange font-black text-lg">৳{order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="text-xs text-zinc-400 font-medium">
                  <span className="font-bold text-zinc-500 block mb-0.5">Shipping to:</span>
                  <p className="line-clamp-2">{order.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function OrderTracking() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 py-8 text-center font-bold text-lg">
        Finding your toy order... 🚀
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
