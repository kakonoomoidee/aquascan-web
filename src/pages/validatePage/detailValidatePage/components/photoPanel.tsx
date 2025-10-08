import React from "react";

interface PhotoPanelProps {
  imageUrl: string;
  altText: string;
}

export const PhotoPanel: React.FC<PhotoPanelProps> = ({
  imageUrl,
  altText,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
    <h2 className="text-lg font-semibold mb-4 text-slate-700">Foto Meteran</h2>
    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto max-h-[60vh] object-contain rounded-md cursor-pointer"
      />
    </a>
  </div>
);
