"use client";

import { Edit2, Trash2, PlusCircle } from "lucide-react";

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
  category: { name: string };
}

interface ProductsTabProps {
  products: Product[];
  productsLoading: boolean;
  onCreateProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsTab({
  products,
  productsLoading,
  onCreateProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Action Row */}
      <div className="bg-white border-4 border-zinc-100 rounded-3xl p-5 shadow-sm flex items-center justify-between">
        <h3 className="font-extrabold text-lg text-[#2d3748]">🧸 Catalog Directory</h3>
        <button
          onClick={onCreateProduct}
          className="px-5 py-2.5 bg-toy-orange text-white font-extrabold rounded-2xl text-xs sm:text-sm hover:bg-toy-orange-hover btn-bouncy flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" /> Add New Toy
        </button>
      </div>

      {/* Catalog Grid */}
      {productsLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-blue mx-auto mb-2"></div>
          <p className="font-extrabold text-zinc-400 text-sm">Loading product catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-4 border-dashed border-zinc-200 text-zinc-400 font-bold">
          No products found in the catalog. Click &quot;Add New Toy&quot; to seed the store! 🚀
        </div>
      ) : (
        <div className="bg-white border-4 border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50 text-zinc-400 font-extrabold uppercase text-xxs">
                  <th className="p-4">Toy Detail</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Age Group</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                    {/* Detail */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Show thumbnail image or emoji fallback */}
                        {prod.thumbnail ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 flex-shrink-0">
                            <img
                              src={prod.thumbnail}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent) {
                                  parent.innerHTML = '<span class="text-2xl flex items-center justify-center w-full h-full">🪀</span>';
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-3xl select-none">🪀</span>
                        )}
                        <div>
                          <span className="font-extrabold text-zinc-800 block">{prod.name}</span>
                          <span className="text-xxs font-bold text-zinc-400 uppercase tracking-widest">
                            slug: {prod.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 font-bold text-zinc-600 text-xs">
                      {prod.category.name}
                    </td>

                    {/* Price */}
                    <td className="p-4 font-black text-toy-orange text-base">
                      ৳{prod.price.toFixed(2)}
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          prod.stock === 0
                            ? "bg-red-100 text-red-500"
                            : prod.stock <= 3
                              ? "bg-toy-yellow/20 text-toy-orange-hover animate-pulse"
                              : "bg-toy-green/10 text-toy-green-hover"
                        }`}
                      >
                        {prod.stock === 0 ? "Out of Stock" : `${prod.stock} Units`}
                      </span>
                    </td>

                    {/* Age Group */}
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-sky-blue/10 text-sky-blue-hover rounded-full font-bold text-xs">
                        Ages {prod.ageGroup}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditProduct(prod)}
                          className="p-1.5 bg-sky-blue/10 hover:bg-sky-blue/20 text-sky-blue-hover rounded-lg transition-colors btn-bouncy"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors btn-bouncy"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
