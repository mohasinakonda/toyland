import { ArrowRight } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
import { ProductCard } from "../products/card";
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

export const FeaturedToyes = () => {

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/products");
                if (res.ok) {
                    const data = await res.json();
                    setFeaturedProducts(data.products.slice(0, 8));
                }
            } catch (err) {
                console.error("Failed to fetch homepage data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    return <section className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-10">
            <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">⭐ Star Toys</h2>
                <p className="text-zinc-500 font-medium">Loved by kids, approved by parents!</p>
            </div>
            <Link
                href="/products"
                className="flex items-center gap-1 font-bold text-sky-blue-hover hover:underline text-sm sm:text-base"
            >
                See All Toys <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-zinc-100 rounded-3xl h-96"></div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
                {featuredProducts.map((prod) => (
                    <Link href={`/products/${prod.slug}`} key={prod.id} className="w-full h-60 relative">
                        {/* <ProductCard product={prod} key={prod.id} /> */}
                        <Image src={prod.thumbnail} alt={prod.name} width={200} height={200} className="w-full h-full object-cover rounded" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white px-4 pb-4 flex flex-col justify-end rounded">
                            <p className="text-2xl font-bold leading-tight">৳{prod.price}</p>
                            <p className="text-lg leading-tight line-clamp-1 font-bold">{prod.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </section>
}