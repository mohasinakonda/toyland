"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldAlert, Award, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/cart-context";

interface ProductImage {
  id: string;
  imageUrl: string;
}

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
  };
  images: ProductImage[];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  // Loaded data
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Cart state
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to load product details");
        }
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
      },
      quantity
    );

    setAddedToCart(true);
    // Hide feedback after 4 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue mx-auto mb-4"></div>
        <p className="font-extrabold text-lg">Fetching toy details from space... 🪐</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl mb-4 block">😢</span>
        <h2 className="font-extrabold text-2xl text-red-500 mb-2">Toy Not Found</h2>
        <p className="text-zinc-600 mb-6">{error || "The requested toy does not exist in our catalog."}</p>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-sky-blue text-white font-extrabold rounded-full hover:bg-sky-blue-hover"
        >
          Back to Toy Shop
        </Link>
      </div>
    );
  }

  // Split development benefits list
  const benefitsList = product.benefits
    ? product.benefits.split(",").map((b) => b.trim())
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 font-bold text-zinc-500 hover:text-[#2d3748] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border-4 border-zinc-100 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-sm">
            {/* Show mock emoji/icon representation */}
            <Image src={selectedImage} alt={product.name} width={200} height={200} className="select-none transform hover:scale-110 transition-transform duration-300 object-contain h-full w-full" />

            {/* Custom tags */}
            <span className="absolute top-4 left-4 bg-sky-blue text-white px-4 py-1.5 rounded-full font-bold text-sm shadow">
              Age Group {product.ageGroup}
            </span>
          </div>

          {/* Thumbnails (for mock multiple images) */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 justify-center">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-16 h-16 rounded-2xl border-4 flex items-center justify-center bg-white shadow-sm overflow-hidden transition-all ${selectedImage === img.imageUrl
                    ? "border-sky-blue"
                    : "border-transparent hover:border-zinc-200"
                    }`}
                >
                  <Image src={img.imageUrl} alt={product.name} width={200} height={200} className="select-none transform hover:scale-110 transition-transform duration-300 object-contain h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Form Column */}
        <div className="flex flex-col gap-6">
          {/* Info Header */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-toy-purple/10 text-toy-purple-hover font-bold text-xs mb-2">
              {product.category.name}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2d3748] mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-toy-orange">৳{product.price.toFixed(2)}</span>
              {product.stock === 0 ? (
                <span className="px-3 py-1 bg-red-100 text-red-500 font-bold text-sm rounded-full flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> Out of stock
                </span>
              ) : product.stock <= 3 ? (
                <span className="px-3 py-1 bg-toy-yellow/20 text-toy-orange-hover font-extrabold text-sm rounded-full flex items-center gap-1 animate-pulse">
                  <Package className="w-4 h-4" /> Only {product.stock} left in stock!
                </span>
              ) : (
                <span className="px-3 py-1 bg-toy-green/10 text-toy-green-hover font-bold text-sm rounded-full flex items-center gap-1">
                  <Package className="w-4 h-4" /> In Stock ({product.stock} available)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-extrabold text-base mb-1.5 text-zinc-500">About this toy</h3>
            <p className="text-zinc-600 font-medium leading-relaxed">{product.description}</p>
          </div>

          {/* Developmental Benefits */}
          {benefitsList.length > 0 && (
            <div>
              <h3 className="font-extrabold text-base mb-2 text-zinc-500 flex items-center gap-1.5">
                <Award className="w-5 h-5 text-toy-yellow-hover" /> Development Benefits
              </h3>
              <div className="flex flex-wrap gap-2">
                {benefitsList.map((benefit, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-toy-green/15 text-toy-green-hover rounded-full font-bold text-xs shadow-sm flex items-center gap-1"
                  >
                    ✨ {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Section */}
          {product.stock > 0 ? (
            <div className="border-4 border-toy-yellow/20 bg-white rounded-3xl p-6 shadow-sm mt-4">
              <h3 className="font-extrabold text-xl mb-4 text-[#2d3748] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-toy-orange" /> Want this toy? 🧸
              </h3>

              <div className="flex flex-col gap-4">
                {/* Quantity and Add to Cart Row */}
                <div className="flex gap-4 items-end">
                  <div className="flex flex-col gap-1.5 w-24">
                    <label htmlFor="quantity" className="font-extrabold text-xs text-zinc-500">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold bg-white cursor-pointer"
                    >
                      {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-grow py-3 px-2 bg-toy-orange text-white font-extrabold md:text-base text-sm rounded-2xl hover:bg-toy-orange-hover transition-colors shadow-md btn-bouncy flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" /> Add to Cart • ৳{(product.price * quantity)}
                  </button>
                </div>

                {/* Added to Cart Success Feedback */}
                {addedToCart && (
                  <div className="mt-2 p-4 bg-emerald-50 border-2 border-toy-green/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-toy-green-hover font-extrabold text-sm">
                      <span>🎉 Added to cart successfully!</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link
                        id="pdp-go-to-checkout-btn"
                        href="/checkout"
                        className="flex-1 text-center px-4 py-2 bg-toy-purple hover:bg-toy-purple-hover text-white text-xs font-extrabold rounded-xl transition-colors btn-bouncy"
                      >
                        Go to Checkout 🚀
                      </Link>
                      <button
                        onClick={() => setAddedToCart(false)}
                        className="flex-1 sm:flex-initial text-center px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-bold rounded-xl transition-colors btn-bouncy"
                      >
                        Keep Browsing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border-4 border-red-200 text-red-500 p-6 rounded-3xl text-center font-bold">
              🦖 Bopo says this toy is temporarily out of stock! Check back soon or select another play world!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
