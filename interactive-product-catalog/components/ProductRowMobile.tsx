import React, { useMemo, useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductRowMobileProps {
  product: Product;
  quantity: number;
  onQuantityChange: (model: string, quantity: number) => void;
  onOpenGallery: (images: string[]) => void;
  onOpenEditModal: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isLoggedIn: boolean;
  onInlineUpdate: (productId: string, field: 'price' | 'stockQuantity', value: number) => void;
}

export const ProductRowMobile: React.FC<ProductRowMobileProps> = ({ product, quantity, onQuantityChange, onOpenGallery, onOpenEditModal, onDeleteProduct, isLoggedIn, onInlineUpdate }) => {
  const [editablePrice, setEditablePrice] = useState(product.price.toString());
  const [editableStock, setEditableStock] = useState(product.stockQuantity.toString());

  useEffect(() => {
    setEditablePrice(product.price.toString());
    setEditableStock(product.stockQuantity.toString());
  }, [product.price, product.stockQuantity]);

  const handlePriceBlur = () => {
    const newPrice = parseFloat(editablePrice);
    if (!isNaN(newPrice) && newPrice >= 0 && newPrice !== product.price) {
      onInlineUpdate(product.id, 'price', newPrice);
    } else {
      setEditablePrice(product.price.toString());
    }
  };
  
  const handleStockBlur = () => {
    const newStock = parseInt(editableStock, 10);
    if (!isNaN(newStock) && newStock >= 0 && newStock !== product.stockQuantity) {
      onInlineUpdate(product.id, 'stockQuantity', newStock);
    } else {
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
     <div className={`w-2.5 h-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-gray-500'} flex-shrink-0`} title={inStock ? 'В наличии' : 'Нет в наличии'} />
  );

  return (
    <div className="bg-brand-dark-2 border border-gray-700 rounded-lg p-3 flex flex-col gap-3">
      {/* Top Section: Image and main details */}
      <div className="flex gap-3">
        <div 
          className="relative group cursor-pointer flex-shrink-0" 
          onClick={() => onOpenGallery(product.images)}
        >
          <img 
            src={product.images[0]} 
            alt={product.model} 
            className="w-20 h-20 object-cover rounded-md" 
          />
          <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </div>
        </div>
        <div className="flex-grow relative">
          <p className="font-semibold text-brand-light">{product.category}</p>
          <div className="flex items-center gap-2 mt-1">
            <StockIndicator />
            <p className="font-mono text-sm text-gray-400">{product.model}</p>
          </div>
           
           {isLoggedIn ? (
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <span>Наличие:</span>
                <input
                  type="number"
                  value={editableStock}
                  onChange={e => setEditableStock(e.target.value)}
                  onBlur={handleStockBlur}
                  className="font-medium text-brand-light bg-transparent border-b border-gray-600 focus:border-brand-accent focus:ring-0 outline-none w-16 p-0 text-center"
                  min="0"
                  step="1"
                />
                <span>шт.</span>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mt-1">
                Наличие: <span className="font-medium text-brand-light">{product.stockQuantity} шт.</span>
              </p>
            )}

           {isLoggedIn && (
            <div className="absolute top-0 right-0 flex">
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
           )}
           
            {isLoggedIn ? (
                <div className="flex items-center mt-1">
                  <span className="text-lg font-bold text-brand-light">₸</span>
                  <input
                    type="number"
                    value={editablePrice}
                    onChange={e => setEditablePrice(e.target.value)}
                    onBlur={handlePriceBlur}
                    className="text-lg font-bold text-brand-light bg-transparent border-b border-gray-600 focus:border-brand-accent focus:ring-0 outline-none w-28 p-0"
                    min="0"
                    step="0.01"
                  />
                </div>
              ) : (
                <p className="text-lg font-bold text-brand-light mt-1">₸{product.price.toFixed(2)}</p>
              )}
        </div>
      </div>

      {/* Middle Section: Parameters */}
      <div>
        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
          {product.parameters.map((param, index) => <li key={index}>{param}</li>)}
        </ul>
      </div>

      {/* Bottom Section: Actions */}
      {!isLoggedIn && (
        <div className="flex items-center justify-between gap-4 bg-brand-dark p-2 rounded-md">
           <div className="relative group">
              <span className="text-sm text-gray-400">Кол-во:</span>
              <input
                type="number"
                min="0"
                max={product.stockQuantity}
                value={quantity === 0 ? '' : quantity}
                onChange={handleInputChange}
                placeholder="0"
                className={`w-20 px-2 py-1 bg-gray-900 border rounded-md text-center text-brand-light focus:ring-2 focus:ring-brand-accent outline-none transition-colors ${quantityExceedsStock ? 'border-red-500' : 'border-gray-600'}`}
              />
              {quantityExceedsStock && (
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-red-600 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Нет в наличии!
                </div>
              )}
           </div>
          <div className="text-right">
            <span className="font-bold text-lg text-brand-accent">
              ₸{totalPrice}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};