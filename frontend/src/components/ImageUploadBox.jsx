"use client";

import { X } from "lucide-react";

export default function ImageUploadBox({ images = [], setImages, max = 3 }) {
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    if (images.length + newImages.length > max) return;

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((img, index) => (
        <div key={index} className="relative w-32 h-32">
          <img
            src={typeof img === "string" ? img : img.preview}
            alt="preview"
            className="w-full h-full object-cover rounded-xl"
          />

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {images.length < max && (
        <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-black transition">
          <span className="text-gray-500 text-sm">+ Add</span>
          <input
            type="file"
            accept="image/*"
            multiple={max > 1}
            onChange={handleAddImage}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
