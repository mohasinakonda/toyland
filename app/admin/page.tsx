"use client";

import { useEffect, useState, useCallback } from "react";
import OverviewTab from "./_components/OverviewTab";
import OrdersTab from "./_components/OrdersTab";
import ProductsTab from "./_components/ProductsTab";
import ProductFormModal from "./_components/ProductFormModal";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  ageGroup: string;
  categoryId: string;
  thumbnail: string;
  benefits: string;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
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

interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  lowStockCount: number;
  statusCounts: {
    [key: string]: number;
  };
  recentOrders: Order[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products">("overview");

  // Metrics state
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Orders list state
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Product CRUD modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Notification
  const [successMsg, setSuccessMsg] = useState("");

  // Load Metrics
  const loadMetrics = useCallback(async () => {
    try {
      setMetricsLoading(true);
      const res = await fetch("/api/admin/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
        setOrders(data.recentOrders);
      }
    } catch (err) {
      console.error("Failed to load admin metrics:", err);
    } finally {
      setMetricsLoading(false);
      setOrdersLoading(false);
    }
  }, []);

  // Load Products and Categories
  const loadProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Failed to load catalog products:", err);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMetrics();
    loadProducts();
  }, [loadMetrics, loadProducts]);

  // Handle order search by phone
  const handleOrderSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!orderSearch.trim()) {
        loadMetrics();
        return;
      }

      setOrdersLoading(true);
      try {
        const res = await fetch(`/api/orders?phone=${encodeURIComponent(orderSearch.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Error searching orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    },
    [orderSearch, loadMetrics]
  );

  // Change order status
  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: string) => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) {
          loadMetrics();
          setSuccessMsg("Order status updated successfully! 🦖");
          setTimeout(() => setSuccessMsg(""), 3000);
        } else {
          const data = await res.json();
          alert(`Error: ${data.error}`);
        }
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    },
    [loadMetrics]
  );

  // Open product creation modal
  const openCreateModal = useCallback(() => {
    setEditingProduct(null);
    setShowProductModal(true);
  }, []);

  // Open product edit modal
  const openEditModal = useCallback((prod: Product) => {
    setEditingProduct(prod);
    setShowProductModal(true);
  }, []);

  // Delete product
  const handleDeleteProduct = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to delete this toy from the store? 😢")) return;

      try {
        const res = await fetch(`/api/admin/products?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          loadProducts();
          loadMetrics();
        } else {
          alert("Failed to delete product.");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadProducts, loadMetrics]
  );

  // Handle product form success
  const handleProductSuccess = useCallback(
    (message: string) => {
      loadProducts();
      loadMetrics();
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(""), 4000);
    },
    [loadProducts, loadMetrics]
  );

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-sky-blue/20 text-sky-blue-hover border-sky-blue/40";
      case "CONFIRMED":
        return "bg-toy-yellow/20 text-toy-orange-hover border-toy-yellow/40";
      case "PACKED":
        return "bg-toy-orange/20 text-toy-orange border-toy-orange/40";
      case "SHIPPED":
        return "bg-toy-purple/20 text-toy-purple border-toy-purple/40";
      case "DELIVERED":
        return "bg-toy-green/25 text-toy-green-hover border-toy-green/40";
      case "CANCELLED":
        return "bg-red-100 text-red-500 border-red-200";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Admin Dashboard Title & Tab Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2d3748] flex items-center gap-2">
            ⚙️ Control Center
          </h1>
          <p className="text-zinc-500 font-medium text-sm">
            Manage your Toy Planet listings, fulfill customer toy orders, and review sales performance.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border-2 border-zinc-100 self-stretch sm:self-auto justify-between">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
              activeTab === "overview"
                ? "bg-[#2d3748] text-white"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            📊 Stats
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
              activeTab === "orders"
                ? "bg-[#2d3748] text-white"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            📦 Orders
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
              activeTab === "products"
                ? "bg-[#2d3748] text-white"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            🧸 Catalog
          </button>
        </div>
      </div>

      {/* Success notification */}
      {successMsg && (
        <div className="bg-emerald-50 border-4 border-emerald-200 text-emerald-600 font-extrabold px-6 py-3 rounded-2xl mb-6 shadow-sm animate-pulse">
          {successMsg}
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          metrics={metrics}
          metricsLoading={metricsLoading}
          getStatusColor={getStatusColor}
          onViewAllOrders={() => setActiveTab("orders")}
        />
      )}

      {activeTab === "orders" && (
        <OrdersTab
          orders={orders}
          ordersLoading={ordersLoading}
          orderSearch={orderSearch}
          onOrderSearchChange={setOrderSearch}
          onOrderSearch={handleOrderSearch}
          onStatusChange={handleStatusChange}
          getStatusColor={getStatusColor}
        />
      )}

      {activeTab === "products" && (
        <ProductsTab
          products={products}
          productsLoading={productsLoading}
          onCreateProduct={openCreateModal}
          onEditProduct={openEditModal}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {/* Product Form Modal */}
      {showProductModal && (
        <ProductFormModal
          editingProduct={editingProduct}
          categories={categories}
          onClose={() => setShowProductModal(false)}
          onSuccess={handleProductSuccess}
        />
      )}
    </div>
  );
}
