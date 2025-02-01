"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  // Handle file selection (both via button and drag-drop)
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Remove image from preview list
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">

      {/* Drop Area */}
      <label
        className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-400 text-sm">Drag & Drop or Click to Upload</p>
      </label>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-700"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button (for UX purposes, doesn't store yet) */}
      <button
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
        onClick={() => alert("Images ready for upload (not yet stored)")}
      >
        Upload ({images.length} files)
      </button>
    </div>
  );
};

export default ImageUploader;