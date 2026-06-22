"use client";

import { Search } from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string };
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
}

interface OrdersTabProps {
  orders: Order[];
  ordersLoading: boolean;
  orderSearch: string;
  onOrderSearchChange: (value: string) => void;
  onOrderSearch: (e: React.FormEvent) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
  getStatusColor: (status: string) => string;
}

export default function OrdersTab({
  orders,
  ordersLoading,
  orderSearch,
  onOrderSearchChange,
  onOrderSearch,
  onStatusChange,
  getStatusColor,
}: OrdersTabProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Order Search Filter */}
      <div className="bg-white border-4 border-zinc-100 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h3 className="font-extrabold text-lg text-[#2d3748] whitespace-nowrap">📦 Live Order Tracker</h3>

        <form onSubmit={onOrderSearch} className="flex gap-2 w-full sm:max-w-md">
          <div className="relative flex-grow">
            <input
              type="tel"
              value={orderSearch}
              onChange={(e) => onOrderSearchChange(e.target.value)}
              placeholder="Search by customer phone number..."
              className="w-full pl-10 pr-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
          </div>
          <button
            type="submit"
            disabled={ordersLoading}
            className="px-5 py-2 bg-[#2d3748] hover:bg-zinc-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-colors btn-bouncy"
          >
            Search
          </button>
        </form>
      </div>

      {/* Orders Listing */}
      {ordersLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-blue mx-auto mb-2"></div>
          <p className="font-extrabold text-zinc-400 text-sm">Loading orders list...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-4 border-dashed border-zinc-200 text-zinc-400 font-bold">
          🦖 Bopo couldn&apos;t find any matching orders. Try searching or refresh filters!
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4"
            >
              {/* Order Top Summary */}
              <div className="flex flex-wrap items-center justify-between border-b pb-3 gap-4">
                <div>
                  <span className="text-xs font-black tracking-widest text-[#2d3748]">
                    {order.trackingId}
                  </span>
                  <span className="text-xs font-bold text-zinc-400 block sm:inline sm:ml-3">
                    Placed: {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-extrabold text-zinc-400 uppercase">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className={`px-3 py-1 border-2 font-bold text-xs rounded-xl focus:outline-none cursor-pointer ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <option value="PLACED">🧸 PLACED</option>
                    <option value="CONFIRMED">⚙️ CONFIRMED</option>
                    <option value="PACKED">📦 PACKED</option>
                    <option value="SHIPPED">🚚 SHIPPED</option>
                    <option value="DELIVERED">🎉 DELIVERED</option>
                    <option value="CANCELLED">❌ CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-zinc-600 bg-[#fffdf6] p-4 rounded-2xl border border-zinc-100">
                <div>
                  <span className="font-extrabold text-zinc-400 uppercase block mb-0.5">Parent / Contact</span>
                  <span>{order.customerName} ({order.phone})</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-extrabold text-zinc-400 uppercase block mb-0.5">Delivery Address</span>
                  <p className="line-clamp-2">{order.address}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-2">
                <span className="text-xxs font-extrabold uppercase text-zinc-400">Order Items</span>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm font-semibold text-zinc-700">
                    <div className="flex items-center gap-1.5">
                      <span>🧸</span>
                      <span>{item.product.name}</span>
                      <span className="text-xs text-zinc-400">x{item.quantity}</span>
                    </div>
                    <span className="font-black text-[#2d3748]">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-center border-t pt-3 font-extrabold text-sm text-zinc-500">
                <span>Total Charged</span>
                <span className="text-toy-orange font-black text-lg">৳{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
