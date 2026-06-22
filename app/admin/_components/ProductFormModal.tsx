"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "./ImageUploader";

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormModalProps {
  editingProduct: Product | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function ProductFormModal({
  editingProduct,
  categories,
  onClose,
  onSuccess,
}: ProductFormModalProps) {
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [prodAge, setProdAge] = useState("3-5");
  const [prodCat, setProdCat] = useState("");
  const [prodBenefits, setProdBenefits] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [crudSubmitting, setCrudSubmitting] = useState(false);

  const {
    photos,
    uploadFiles,
    removePhoto,
    resetPhotos,
    setInitialPhotos,
    getUploadedUrls,
    isUploading,
  } = useImageUpload();

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setProdName(editingProduct.name);
      setProdDesc(editingProduct.description);
      setProdPrice(editingProduct.price.toString());
      setProdStock(editingProduct.stock.toString());
      setProdAge(editingProduct.ageGroup);
      setProdCat(editingProduct.categoryId);
      setProdBenefits(editingProduct.benefits || "");
      // Load existing thumbnail as initial photo
      if (editingProduct.thumbnail) {
        setInitialPhotos([editingProduct.thumbnail]);
      }
    } else {
      setProdName("");
      setProdDesc("");
      setProdPrice("");
      setProdStock("");
      setProdAge("3-5");
      setProdBenefits("Coordination, Motor Skills");
      if (categories.length > 0) setProdCat(categories[0].id);
      resetPhotos();
    }
  }, [editingProduct, categories, setInitialPhotos, resetPhotos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate required fields
    if (!prodName.trim() || !prodDesc.trim() || !prodPrice || !prodStock || !prodCat) {
      setErrorMsg("All fields are required!");
      return;
    }

    // Check for uploaded images
    const urls = getUploadedUrls();
    if (urls.length === 0) {
      setErrorMsg("Please upload at least one product photo!");
      return;
    }

    if (isUploading) {
      setErrorMsg("Please wait for all images to finish uploading.");
      return;
    }

    setCrudSubmitting(true);

    try {
      const isEdit = !!editingProduct;
      const url = "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      
      // Use first uploaded image as the thumbnail
      const thumbnail = urls[0];

      const payload = {
        id: editingProduct?.id,
        name: prodName.trim(),
        description: prodDesc.trim(),
        price: parseFloat(prodPrice),
        stock: parseInt(prodStock),
        ageGroup: prodAge,
        categoryId: prodCat,
        thumbnail,
        benefits: prodBenefits.trim(),
        // Pass all image URLs for creating ProductImage records
        images: urls,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSuccess(isEdit ? "Toy updated successfully! 🧸" : "New Toy added successfully! 🎉");
      } else {
        setErrorMsg(data.error || "Failed to save product details.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(message);
    } finally {
      setCrudSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border-4 border-toy-yellow rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h3 className="font-extrabold text-xl text-[#2d3748] flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-toy-orange" />
            {editingProduct ? `Edit Listing: ${editingProduct.name}` : "Create New Toy Listing"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-2 border-red-200 text-red-500 font-bold p-3 rounded-2xl text-xs mb-4">
            {errorMsg}
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-extrabold text-xs text-zinc-500">Toy Name</label>
            <input
              type="text"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              placeholder="e.g. Astro Bear Buddy"
              className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="font-extrabold text-xs text-zinc-500">Category World</label>
            <select
              value={prodCat}
              onChange={(e) => setProdCat(e.target.value)}
              className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold bg-white cursor-pointer"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="font-extrabold text-xs text-zinc-500">Description</label>
            <textarea
              value={prodDesc}
              onChange={(e) => setProdDesc(e.target.value)}
              placeholder="Explain how the toy works, its educational qualities, etc..."
              rows={3}
              className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold resize-none"
              required
            ></textarea>
          </div>

          {/* Price & Stock Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-extrabold text-xs text-zinc-500">Price (৳ BDT)</label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                placeholder="e.g. 19.99"
                className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-extrabold text-xs text-zinc-500">Units in Stock</label>
              <input
                type="number"
                min="0"
                value={prodStock}
                onChange={(e) => setProdStock(e.target.value)}
                placeholder="e.g. 15"
                className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
                required
              />
            </div>
          </div>

          {/* Age Group Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="font-extrabold text-xs text-zinc-500">Age Recommendation Group</label>
            <select
              value={prodAge}
              onChange={(e) => setProdAge(e.target.value)}
              className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold bg-white cursor-pointer"
            >
              <option value="3-5">Ages 3 to 5 years</option>
              <option value="6-8">Ages 6 to 8 years</option>
              <option value="9-10">Ages 9 to 10 years</option>
            </select>
          </div>

          {/* Image Upload via ImageKit */}
          <ImageUploader
            photos={photos}
            onFilesSelected={uploadFiles}
            onRemove={removePhoto}
            maxImages={5}
            label="Toy Photos (Upload via ImageKit)"
          />

          {/* Development Benefits */}
          <div className="flex flex-col gap-1.5">
            <label className="font-extrabold text-xs text-zinc-500">Development Benefits (Comma-separated)</label>
            <input
              type="text"
              value={prodBenefits}
              onChange={(e) => setProdBenefits(e.target.value)}
              placeholder="e.g. Logical Thinking, Fine Motor Skills, Patience"
              className="px-4 py-2 border-2 border-zinc-200 rounded-2xl focus:outline-none focus:border-sky-blue text-sm font-semibold"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 border-t pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-extrabold rounded-2xl text-xs transition-colors btn-bouncy"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={crudSubmitting || isUploading}
              className="flex-1 py-2.5 bg-toy-orange text-white font-extrabold rounded-2xl text-xs hover:bg-toy-orange-hover transition-colors shadow-md btn-bouncy disabled:bg-zinc-300"
            >
              {crudSubmitting
                ? "Saving..."
                : isUploading
                  ? "Uploading images..."
                  : editingProduct
                    ? "Update Toy"
                    : "List Toy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
