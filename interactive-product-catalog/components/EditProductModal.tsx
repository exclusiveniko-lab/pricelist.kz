import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose, onSave }) => {
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [parameters, setParameters] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setCategory(product.category);
      setModel(product.model);
      setParameters(product.parameters.join('\n'));
      setStockQuantity(product.stockQuantity);
      setImages(product.images);
      setNewImageUrl('');
    }
  }, [product]);

  if (!isOpen || !product) {
    return null;
  }
  
  const handleSave = () => {
    const updatedProduct: Product = {
      ...product,
      category,
      model,
      parameters: parameters.split('\n').filter(p => p.trim() !== ''),
      stockQuantity: Number.isInteger(stockQuantity) ? stockQuantity : 0,
      images,
    };
    onSave(updatedProduct);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      // Basic validation for URL format
      try {
        new URL(newImageUrl);
        setImages([...images, newImageUrl.trim()]);
        setNewImageUrl('');
      } catch (_) {
        alert('Пожалуйста, введите корректный URL-адрес изображения.');
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-dark-2 rounded-lg shadow-2xl p-8 w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-brand-accent">Редактировать товар</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-300 mb-1">Название товара (Категория)</label>
            <input type="text" id="edit-category" value={category} onChange={e => setCategory(e.target.value)} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="edit-model" className="block text-sm font-medium text-gray-300 mb-1">Модель</label>
            <input type="text" id="edit-model" value={model} onChange={e => setModel(e.target.value)} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="edit-parameters" className="block text-sm font-medium text-gray-300 mb-1">Параметры (каждый с новой строки)</label>
            <textarea id="edit-parameters" value={parameters} onChange={e => setParameters(e.target.value)} rows={5} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="edit-stock" className="block text-sm font-medium text-gray-300 mb-1">Количество на складе</label>
            <input 
              type="number" 
              id="edit-stock" 
              value={stockQuantity} 
              onChange={e => setStockQuantity(parseInt(e.target.value, 10) || 0)} 
              min="0"
              className="w-full input-style" 
            />
          </div>

          {/* Image Management Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Изображения</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                  <button 
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1 leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Удалить изображение"
                  >
                    <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                placeholder="https://... URL нового изображения"
                className="w-full input-style"
              />
              <button onClick={handleAddImage} type="button" className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition whitespace-nowrap">
                Добавить
              </button>
            </div>
          </div>

          <style>{`.input-style { background-color: #111827; border: 1px solid #4b5563; border-radius: 0.375rem; padding: 0.5rem 0.75rem; color: #f3f4f6; transition: all 0.2s; } .input-style:focus { ring: 2px; ring-color: #38bdf8; border-color: #38bdf8; outline: none; }`}</style>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 transition">
              Отмена
            </button>
            <button type="button" onClick={handleSave} className="px-6 py-2 rounded-md bg-brand-accent hover:bg-brand-accent-2 text-white font-semibold transition">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};