import React, { useState } from 'react';
import { Product } from '../types';

interface StockAlertProps {
  products: Product[];
}

export const StockAlert: React.FC<StockAlertProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (products.length === 0) {
    return null;
  }

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-yellow-900/50 border border-yellow-600 p-4 rounded-lg shadow-lg mb-8" role="alert" aria-live="polite">
      <div className="flex justify-between items-center cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold text-yellow-300">Низкий уровень запасов</h3>
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full" aria-label={`${products.length} items with low stock`}>
            {products.length}
          </span>
        </div>
        <button className="text-yellow-300 hover:text-yellow-100" aria-label={isOpen ? 'Свернуть' : 'Развернуть'}>
          <ChevronIcon open={isOpen} />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pl-4 border-l-2 border-yellow-500/50 space-y-2 max-h-60 overflow-y-auto pr-2">
          {products.map(product => (
            <div key={product.id} className="text-sm flex justify-between items-center">
              <span className="text-gray-300 truncate pr-2" title={`${product.model} (${product.category})`}>{product.model} ({product.category})</span>
              <span className="font-semibold text-yellow-200 bg-yellow-900/70 px-2 py-1 rounded whitespace-nowrap">
                Осталось: <span className="font-bold">{product.stockQuantity}</span> шт.
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
