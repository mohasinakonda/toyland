"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, AlertCircle, Loader2, ImagePlus } from "lucide-react";
import type { PhotoEntry } from "@/hooks/useImageUpload";

interface ImageUploaderProps {
  photos: PhotoEntry[];
  onFilesSelected: (files: FileList | File[]) => void;
  onRemove: (id: string) => void;
  maxImages?: number;
  label?: string;
}

export default function ImageUploader({
  photos,
  onFilesSelected,
  onRemove,
  maxImages = 5,
  label = "Product Photos",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const remaining = maxImages - photos.length;
        if (remaining <= 0) return;
        const files = Array.from(e.target.files).slice(0, remaining);
        onFilesSelected(files);
      }
      // Reset input so user can re-upload the same file
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [photos.length, maxImages, onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        const remaining = maxImages - photos.length;
        if (remaining <= 0) return;
        const files = Array.from(e.dataTransfer.files)
          .filter((f) => f.type.startsWith("image/"))
          .slice(0, remaining);
        if (files.length > 0) onFilesSelected(files);
      }
    },
    [photos.length, maxImages, onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const canAddMore = photos.length < maxImages;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-extrabold text-xs text-zinc-500 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xxs font-bold text-zinc-400">
          {photos.length}/{maxImages} photos
        </span>
      </label>

      {/* Image previews grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-zinc-200 bg-zinc-50"
            >
              {/* Image preview */}
              <img
                src={photo.url || photo.previewUrl}
                alt="Upload preview"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  photo.uploading ? "opacity-40 blur-[1px]" : ""
                } ${photo.error ? "opacity-30 grayscale" : ""}`}
              />

              {/* Upload progress overlay */}
              {photo.uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
                  <Loader2 className="w-5 h-5 text-sky-blue-hover animate-spin" />
                  <span className="text-[10px] font-extrabold text-zinc-500 mt-1">
                    Uploading...
                  </span>
                </div>
              )}

              {/* Error overlay */}
              {photo.error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/80 p-1.5">
                  <AlertCircle className="w-4 h-4 text-red-500 mb-0.5" />
                  <span className="text-[9px] font-bold text-red-500 text-center leading-tight line-clamp-2">
                    {photo.error}
                  </span>
                </div>
              )}

              {/* Delete button */}
              {!photo.uploading && (
                <button
                  type="button"
                  onClick={() => onRemove(photo.id)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-md hover:scale-110"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Success indicator */}
              {photo.url && !photo.uploading && !photo.error && (
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-extrabold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  ✓ Uploaded
                </div>
              )}
            </div>
          ))}

          {/* Add more button (inline in grid) */}
          {canAddMore && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 hover:border-sky-blue hover:bg-sky-blue/5 transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <ImagePlus className="w-5 h-5 text-zinc-400 group-hover:text-sky-blue-hover transition-colors" />
              <span className="text-[10px] font-bold text-zinc-400 group-hover:text-sky-blue-hover transition-colors">
                Add More
              </span>
            </button>
          )}
        </div>
      )}

      {/* Drop zone (shown when no photos yet) */}
      {photos.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative w-full py-8 px-4 rounded-2xl border-2 border-dashed cursor-pointer
            transition-all duration-300 flex flex-col items-center justify-center gap-2
            ${
              isDragOver
                ? "border-sky-blue bg-sky-blue/10 scale-[1.01]"
                : "border-zinc-300 bg-zinc-50/50 hover:border-sky-blue/50 hover:bg-zinc-50"
            }
          `}
        >
          <div
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isDragOver ? "bg-sky-blue/20" : "bg-zinc-100"
            }`}
          >
            <Upload
              className={`w-6 h-6 transition-colors ${
                isDragOver ? "text-sky-blue-hover" : "text-zinc-400"
              }`}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-extrabold text-zinc-500">
              {isDragOver ? "Drop images here!" : "Drag & drop photos or click to browse"}
            </p>
            <p className="text-[10px] font-bold text-zinc-400 mt-0.5">
              PNG, JPG, WEBP • Up to {maxImages} images
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
