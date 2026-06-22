"use client";

import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";

interface Order {
  id: string;
  trackingId: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: { name: string };
  }[];
}

interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  lowStockCount: number;
  statusCounts: { [key: string]: number };
  recentOrders: Order[];
}

interface OverviewTabProps {
  metrics: DashboardMetrics | null;
  metricsLoading: boolean;
  getStatusColor: (status: string) => string;
  onViewAllOrders: () => void;
}

export default function OverviewTab({
  metrics,
  metricsLoading,
  getStatusColor,
  onViewAllOrders,
}: OverviewTabProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* KPI Blocks */}
      {metricsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-zinc-100 h-28 rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Sales Card */}
          <div className="bg-white border-4 border-toy-yellow/20 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs font-extrabold uppercase text-zinc-400 block mb-1">Total Sales</span>
              <span className="text-3xl font-black text-[#2d3748]">
                ৳{(metrics?.totalSales || 0).toFixed(2)}
              </span>
            </div>
            <div className="bg-toy-yellow/20 p-3.5 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-toy-orange" />
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white border-4 border-sky-blue/20 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs font-extrabold uppercase text-zinc-400 block mb-1">Total Orders</span>
              <span className="text-3xl font-black text-[#2d3748]">
                {metrics?.totalOrders || 0}
              </span>
            </div>
            <div className="bg-sky-blue/20 p-3.5 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-sky-blue-hover" />
            </div>
          </div>

          {/* Low Stock Warning Card */}
          <div className="bg-white border-4 border-red-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs font-extrabold uppercase text-zinc-400 block mb-1">Low Stock (≤3)</span>
              <span className="text-3xl font-black text-red-500">
                {metrics?.lowStockCount || 0}
              </span>
            </div>
            <div className={`p-3.5 rounded-2xl ${(metrics?.lowStockCount || 0) > 0 ? "bg-red-100 text-red-500 animate-pulse" : "bg-zinc-100 text-zinc-400"}`}>
              <AlertTriangle className="w-8 h-8" />
            </div>
          </div>
        </div>
      )}

      {/* Status Breakdown Section */}
      <div className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm">
        <h3 className="font-extrabold text-lg mb-4 text-[#2d3748] flex items-center gap-1.5">
          📋 Order Fulfillment Statuses
        </h3>
        {metricsLoading ? (
          <div className="h-20 bg-zinc-50 rounded-2xl animate-pulse"></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {Object.entries(metrics?.statusCounts || {}).map(([status, count]) => (
              <div key={status} className="border-2 rounded-2xl p-4 text-center bg-[#fffdf6]">
                <span className="text-xxs font-extrabold uppercase text-zinc-400 block mb-1">
                  {status.toLowerCase()}
                </span>
                <span className="text-2xl font-black text-[#2d3748]">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white border-4 border-zinc-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b pb-4">
          <h3 className="font-extrabold text-lg text-[#2d3748]">🔔 Latest Toy Orders</h3>
          <button
            onClick={onViewAllOrders}
            className="text-xs font-bold text-sky-blue-hover hover:underline"
          >
            View all orders
          </button>
        </div>

        {metricsLoading ? (
          <div className="animate-pulse flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-zinc-50 rounded-2xl"></div>
            ))}
          </div>
        ) : (metrics?.recentOrders || []).length === 0 ? (
          <div className="text-center py-6 text-zinc-400 font-bold">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b text-zinc-400 font-extrabold uppercase text-xxs">
                  <th className="py-2">Tracking ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {(metrics?.recentOrders || []).map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                    <td className="py-3 font-extrabold tracking-wider text-[#2d3748]">
                      {order.trackingId}
                    </td>
                    <td className="py-3 font-medium text-zinc-600">{order.customerName}</td>
                    <td className="py-3 font-black text-toy-orange">৳{order.total.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 border text-xxs font-extrabold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
