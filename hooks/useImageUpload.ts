import { ImageKitAuthPayload, uploadFileToImageKit } from "@/lib/imagekit-upload";
import { useState, useCallback } from "react";

export interface PhotoEntry {
  id: string;
  url: string | null;
  previewUrl: string;
  uploading: boolean;
  error: string | null;
}

export const useImageUpload = () => {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);

  const uploadFile = useCallback((file: File) => {
    const id = crypto.randomUUID();
    const previewUrl = URL.createObjectURL(file);
    setPhotos((prev) => [
      ...prev,
      { id, url: null, previewUrl, uploading: true, error: null },
    ]);

    void (async () => {
      try {
        const authRes = await fetch("/api/upload-auth", {
          credentials: "include",
        });
        if (!authRes.ok) {
          const j = (await authRes.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(j.error ?? "Could not start upload");
        }
        const auth = (await authRes.json()) as ImageKitAuthPayload;
        const data = await uploadFileToImageKit(file, auth);
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, url: data.url, uploading: false, error: null }
              : p
          )
        );
        // Keep previewUrl around for display until component unmounts
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Upload failed";
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, uploading: false, error: msg } : p
          )
        );
      }
    })();
  }, []);

  const uploadFiles = useCallback(
    (files: FileList | File[]) => {
      Array.from(files).forEach((file) => uploadFile(file));
    },
    [uploadFile]
  );

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo?.previewUrl) {
        URL.revokeObjectURL(photo.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const resetPhotos = useCallback(() => {
    setPhotos((prev) => {
      prev.forEach((p) => {
        if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      });
      return [];
    });
  }, []);

  const setInitialPhotos = useCallback((urls: string[]) => {
    setPhotos(
      urls.map((url) => ({
        id: crypto.randomUUID(),
        url,
        previewUrl: url,
        uploading: false,
        error: null,
      }))
    );
  }, []);

  /** Returns only successfully uploaded image URLs */
  const getUploadedUrls = useCallback((): string[] => {
    return photos.filter((p) => p.url && !p.uploading && !p.error).map((p) => p.url!);
  }, [photos]);

  const isUploading = photos.some((p) => p.uploading);
  const hasErrors = photos.some((p) => p.error);

  return {
    photos,
    uploadFile,
    uploadFiles,
    removePhoto,
    resetPhotos,
    setInitialPhotos,
    getUploadedUrls,
    isUploading,
    hasErrors,
  };
};