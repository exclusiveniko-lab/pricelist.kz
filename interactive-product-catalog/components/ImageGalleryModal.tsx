import React, { useState } from 'react';

interface ImageGalleryModalProps {
  images: string[];
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-dark-2 rounded-lg shadow-2xl p-6 w-full max-w-2xl m-4 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-3 text-gray-400 hover:text-white transition-colors text-4xl leading-none font-bold"
          aria-label="Закрыть галерею"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-brand-light">Галерея изображений</h3>
          <div className="mb-4 h-[60vh] flex items-center justify-center">
            <img src={selectedImage} alt="Selected product view" className="max-w-full max-h-full object-contain rounded-lg"/>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Product thumbnail ${index + 1}`} 
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-brand-accent' : 'border-transparent hover:border-gray-500'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
