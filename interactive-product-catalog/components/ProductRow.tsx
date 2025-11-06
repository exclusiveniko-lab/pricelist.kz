import React, { useMemo, useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductRowProps {
  product: Product;
  quantity: number;
  onQuantityChange: (model: string, quantity: number) => void;
  onOpenGallery: (images: string[]) => void;
  onOpenEditModal: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isLoggedIn: boolean;
  onInlineUpdate: (productId: string, field: 'price' | 'stockQuantity', value: number) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, quantity, onQuantityChange, onOpenGallery, onOpenEditModal, onDeleteProduct, isLoggedIn, onInlineUpdate }) => {
  const [editablePrice, setEditablePrice] = useState(product.price.toString());
  const [editableStock, setEditableStock] = useState(product.stockQuantity.toString());

  useEffect(() => {
    // Sync local state if the external product prop changes (e.g., after sorting)
    setEditablePrice(product.price.toString());
    setEditableStock(product.stockQuantity.toString());
  }, [product.price, product.stockQuantity]);

  const handlePriceBlur = () => {
    const newPrice = parseFloat(editablePrice);
    if (!isNaN(newPrice) && newPrice >= 0 && newPrice !== product.price) {
      onInlineUpdate(product.id, 'price', newPrice);
    } else {
      // Revert if invalid or unchanged
      setEditablePrice(product.price.toString());
    }
  };
  
  const handleStockBlur = () => {
    const newStock = parseInt(editableStock, 10);
    if (!isNaN(newStock) && newStock >= 0 && newStock !== product.stockQuantity) {
      onInlineUpdate(product.id, 'stockQuantity', newStock);
    } else {
      // Revert if invalid or unchanged
      setEditableStock(product.stockQuantity.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onQuantityChange(product.model, isNaN(value) ? 0 : value);
  };

  const totalPrice = useMemo(() => {
    return (product.price * quantity).toFixed(2);
  }, [product.price, quantity]);

  const inStock = product.stockQuantity > 0;
  const quantityExceedsStock = quantity > product.stockQuantity;

  const StockIndicator = () => (
    <div className="group relative flex items-center">
      <div className={`w-2.5 h-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-gray-500'}`} />
      <span className="absolute left-4 w-max opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
        {inStock ? `В наличии: ${product.stockQuantity} шт.` : 'Нет в наличии'}
      </span>
    </div>
  );

  return (
    <tr className="bg-brand-dark-2 border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div 
            className="relative group cursor-pointer" 
            onClick={() => onOpenGallery(product.images)}
            title="Посмотреть изображения"
          >
            <img 
              src={product.images[0]} 
              alt={product.model} 
              className="w-12 h-12 object-cover rounded-md transition-transform group-hover:scale-110" 
            />
             <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
          <span className="font-medium text-brand-light whitespace-nowrap">{product.category}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
           <StockIndicator />
           <span className="font-mono text-gray-400">{product.model}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <ul className="list-disc list-inside text-gray-400">
          {product.parameters.map((param, index) => <li key={index}>{param}</li>)}
        </ul>
      </td>
      <td className="px-4 py-3 font-semibold">
        {isLoggedIn ? (
          <div className="flex items-center">
            <span className="mr-1">₸</span>
            <input
              type="number"
              value={editablePrice}
              onChange={(e) => setEditablePrice(e.target.value)}
              onBlur={handlePriceBlur}
              className="w-24 px-2 py-1 bg-gray-900 border border-gray-600 rounded-md text-center text-brand-light focus:ring-2 focus:ring-brand-accent outline-none"
              min="0"
              step="0.01"
            />
          </div>
        ) : (
          `₸${product.price.toFixed(2)}`
        )}
      </td>
      <td className="px-4 py-3 font-medium text-center">
        {isLoggedIn ? (
          <input
            type="number"
            value={editableStock}
            onChange={(e) => setEditableStock(e.target.value)}
            onBlur={handleStockBlur}
            className="w-20 px-2 py-1 bg-gray-900 border border-gray-600 rounded-md text-center text-brand-light focus:ring-2 focus:ring-brand-accent outline-none"
            min="0"
            step="1"
          />
        ) : (
          product.stockQuantity
        )}
      </td>
      {!isLoggedIn && (
        <>
          <td className="px-4 py-3">
            <div className="relative group">
              <input
                type="number"
                min="0"
                max={product.stockQuantity}
                value={quantity === 0 ? '' : quantity}
                onChange={handleInputChange}
                placeholder="0"
                className={`w-24 px-2 py-1 bg-brand-dark border rounded-md text-center text-brand-light focus:ring-2 focus:ring-brand-accent outline-none transition-colors ${quantityExceedsStock ? 'border-red-500' : 'border-gray-600'}`}
              />
              {quantityExceedsStock && (
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-red-600 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Больше, чем в наличии!
                </div>
              )}
            </div>
          </td>
          <td className="px-4 py-3 text-right font-bold text-brand-accent whitespace-nowrap">
            ₸{totalPrice}
          </td>
        </>
      )}
      {isLoggedIn && (
        <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => onOpenEditModal(product)} className="text-brand-accent hover:text-brand-accent-2 p-1 rounded-full transition-colors" title="Редактировать">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:text-red-400 p-1 rounded-full transition-colors" title="Удалить">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};