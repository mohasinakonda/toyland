import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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


export const ProductCard = ({ product }: {
    product: Product
}) => {

    return <div

        className="bg-white rounded-3xl border-4 border-zinc-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
    >
        {/* Product Image */}
        <div className="relative aspect-square bg-[#fffdf6] flex items-center justify-center overflow-hidden p-2">
            <Image src={product.thumbnail} alt={product.name} width={200} height={200} className="select-none transform hover:scale-110 transition-transform duration-300 object-contain h-full w-full" />


            <span className="absolute top-4 left-4 bg-sky-blue text-white px-3 py-1 rounded-full font-bold text-xs">
                Age Group {product.ageGroup}
            </span>
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col flex-grow">
            <span className="text-xs font-bold uppercase text-zinc-400 mb-1">
                {product.category.name}
            </span>
            <h3 className="font-extrabold text-xl text-[#2d3748] mb-2 line-clamp-1">
                {product.name}
            </h3>
            <p className="text-sm text-zinc-500 font-medium line-clamp-2 mb-4 flex-grow">
                {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-extrabold text-toy-orange">
                    ৳{product.price}
                </span>
                <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-sky-blue text-white font-extrabold rounded-full hover:bg-sky-blue-hover text-sm flex items-center gap-1 btn-bouncy"
                >
                    <ShoppingCart className="w-4 h-4" /> Order Now
                </Link>
            </div>
        </div>
    </div>
}