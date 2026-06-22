"use client";

import { useEffect, useState, Suspense, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Trash2, ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/products/card";

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

function ProductListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State matching search params
  const [search, setSearch] = useState("");
  const [searchDebouncedValue, setSearchDebouncedValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedAge, setSelectedAge] = useState("");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [timeoutFn, setTimeoutFn] = useState<NodeJS.Timeout | null>(null)

  // Loaded data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync state with url search parameter on load
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Fetch products based on filters
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (selectedCategory) queryParams.append("category", selectedCategory);
        if (selectedAge) queryParams.append("ageGroup", selectedAge);
        if (maxPrice) queryParams.append("price", maxPrice.toString());

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    const timer = setTimeout(() => {
      fetchProducts();
    }, 150); // Small debounce for typing and range adjustments

    return () => clearTimeout(timer);
  }, [search, selectedCategory, selectedAge, maxPrice]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedAge("");
    setMaxPrice(6000);
    router.push("/products");
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value;
    setSearchDebouncedValue(value);
    if (timeoutFn) {
      clearTimeout(timeoutFn)
    }
    setTimeoutFn(setTimeout(() => {
      setSearch(value)
    }, 800))
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* 1. Filters Sidebar (Desktop) / Header (Mobile) */}
      <aside className="w-full md:w-64 flex flex-col gap-6 bg-white p-6 rounded-3xl border-4 border-zinc-100 self-start">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-extrabold text-xl flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-toy-orange" /> Filters
          </h2>
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="font-extrabold text-sm text-zinc-500">Search</label>
          <div className="relative">
            <input
              type="text"
              value={searchDebouncedValue}
              onChange={handleSearch}
              placeholder="Search toys..."
              className="w-full pl-10 pr-4 py-2 border-2 border-zinc-200 rounded-full focus:outline-none focus:border-sky-blue text-sm font-medium"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <label className="font-extrabold text-sm text-zinc-500">Categories</label>
          <div className="flex flex-wrap md:flex-col gap-1.5">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold text-left border-2 transition-colors ${selectedCategory === ""
                ? "bg-sky-blue border-sky-blue text-white"
                : "bg-zinc-50 border-transparent hover:bg-zinc-100"
                }`}
            >
              🌈 All Worlds
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold text-left border-2 transition-colors ${selectedCategory === cat.slug
                  ? "bg-sky-blue border-sky-blue text-white"
                  : "bg-zinc-50 border-transparent hover:bg-zinc-100"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="flex flex-col gap-2">
          <label className="font-extrabold text-sm text-zinc-500">Age Recommendation</label>
          <div className="flex flex-wrap md:flex-col gap-1.5">
            {[
              { label: "All Ages", value: "" },
              { label: "3-5 years", value: "3-5" },
              { label: "6-8 years", value: "6-8" },
              { label: "9-10 years", value: "9-10" },
            ].map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold text-left border-2 transition-colors ${selectedAge === age.value
                  ? "bg-toy-orange border-toy-orange text-white"
                  : "bg-zinc-50 border-transparent hover:bg-zinc-100"
                  }`}
              >
                🎈 {age.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-extrabold text-sm text-zinc-500">Max Price</label>
            <span className="font-extrabold text-sm text-toy-orange">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="5"
            max="6000"
            step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full accent-toy-orange cursor-pointer"
          />
          <div className="flex justify-between text-xxs font-bold text-zinc-400">
            <span>5</span>
            <span>6000</span>
          </div>
        </div>
      </aside>

      {/* 2. Products Grid */}
      <section className="flex-1  w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-zinc-100 rounded-3xl h-96 w-50"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 w-full relative h-96">
            <div className="w-50 md:col-span-1"></div>
            <div className="hidden md:block md:col-span-2"></div>
            <div className="hidden md:block md:col-span-3"></div>

            <div className="text-center px-4 py-20 bg-white rounded-3xl border-4 border-dashed border-zinc-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-6xl mb-4 block">🦕</span>
              <h3 className="font-extrabold text-xl mb-1 text-zinc-700">No toys found!</h3>
              <p className="text-zinc-500 text-sm mb-6">Bopo couldn't find any toys matching these filters.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-toy-orange text-white font-extrabold rounded-full hover:bg-toy-orange-hover btn-bouncy"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <ProductCard product={prod} key={prod.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductListing() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-8 text-center font-bold text-lg">
        Loading the Toy Store... 🧸
      </div>
    }>
      <ProductListContent />
    </Suspense>
  );
}
