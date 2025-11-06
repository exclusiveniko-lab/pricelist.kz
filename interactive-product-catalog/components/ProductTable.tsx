import React from 'react';
import { Product, SortConfig } from '../types';
import { ProductRow } from './ProductRow';
import { ProductRowMobile } from './ProductRowMobile';

interface ProductTableProps {
  products: Product[];
  order: Record<string, number>;
  onQuantityChange: (model: string, quantity: number) => void;
  sortConfig: SortConfig;
  onSort: (key: 'model' | 'price' | 'category' | 'stockQuantity') => void;
  onOpenGallery: (images: string[]) => void;
  onOpenEditModal: (product: Product) => void;
  onDeleteProduct: (productId: string) => void; 
  onInlineUpdate: (productId: string, field: 'price' | 'stockQuantity', value: number) => void;
  isLoggedIn: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, order, onQuantityChange, sortConfig, onSort, onOpenGallery, onOpenEditModal, onDeleteProduct, onInlineUpdate, isLoggedIn }) => {
  const SortIndicator = ({ columnKey }: { columnKey: 'model' | 'price' | 'category' | 'stockQuantity' }) => {
    if (sortConfig.key !== columnKey) {
      return null;
    }
    return <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className="bg-brand-dark-2 rounded-lg shadow-xl overflow-hidden">
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-brand-accent uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-4 py-3 min-w-[120px] cursor-pointer select-none hover:bg-gray-600/50 transition-colors" onClick={() => onSort('category')}>
                <div className="flex items-center">
                  Товар
                  <SortIndicator columnKey="category" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer select-none hover:bg-gray-600/50 transition-colors" onClick={() => onSort('model')}>
                <div className="flex items-center">
                  Модель
                  <SortIndicator columnKey="model" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 min-w-[250px]">Параметры</th>
              <th scope="col" className="px-4 py-3 cursor-pointer select-none hover:bg-gray-600/50 transition-colors" onClick={() => onSort('price')}>
                 <div className="flex items-center">
                  Цена (₸)
                  <SortIndicator columnKey="price" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer select-none hover:bg-gray-600/50 transition-colors" onClick={() => onSort('stockQuantity')}>
                 <div className="flex items-center">
                  Наличие
                  <SortIndicator columnKey="stockQuantity" />
                </div>
              </th>
              {!isLoggedIn && <th scope="col" className="px-4 py-3 text-center">Кол-во</th>}
              {!isLoggedIn && <th scope="col" className="px-4 py-3 text-right whitespace-nowrap">Сумма</th>}
              {isLoggedIn && <th scope="col" className="px-4 py-3 text-center">Действия</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                quantity={order[product.model] || 0}
                onQuantityChange={onQuantityChange}
                onOpenGallery={onOpenGallery}
                onOpenEditModal={onOpenEditModal}
                onDeleteProduct={onDeleteProduct}
                isLoggedIn={isLoggedIn}
                onInlineUpdate={onInlineUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="px-4 py-3 text-xs text-brand-accent uppercase bg-gray-700/50 font-bold">
          Список товаров
        </div>
        <div className="space-y-1 p-1">
          {products.map((product) => (
            <ProductRowMobile
              key={product.id}
              product={product}
              quantity={order[product.model] || 0}
              onQuantityChange={onQuantityChange}
              onOpenGallery={onOpenGallery}
              onOpenEditModal={onOpenEditModal}
              onDeleteProduct={onDeleteProduct}
              isLoggedIn={isLoggedIn}
              onInlineUpdate={onInlineUpdate}
            />
          ))}
        </div>
      </div>
       
      {products.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          Товары не найдены.
        </div>
      )}
    </div>
  );
};