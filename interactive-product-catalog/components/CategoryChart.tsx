import React, { useMemo } from 'react';
import { Product } from '../types';

interface CategoryChartProps {
  products: Product[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ products }) => {
  const categoryData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // FIX: Refactor to use Object.keys to ensure proper type inference and fix sorting error.
    return Object.keys(counts)
      .map((category) => ({ category, count: counts[category] }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const maxCount = useMemo(() => {
    return Math.max(...categoryData.map(d => d.count), 0);
  }, [categoryData]);

  return (
    <div className="bg-brand-dark-2 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-brand-accent flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Аналитика каталога
      </h2>
      <div className="space-y-3">
        {categoryData.length > 0 ? (
          categoryData.map(({ category, count }) => (
            <div key={category} className="grid grid-cols-4 gap-2 items-center text-sm">
              <div className="col-span-1 text-gray-300 truncate font-medium" title={category}>
                {category}
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-full bg-brand-dark rounded-full h-5">
                  <div
                    className="bg-brand-accent h-5 rounded-full text-xs text-white flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  >
                  </div>
                </div>
                 <span className="font-mono text-brand-light font-semibold w-8 text-right">{count}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 mt-4">Нет данных для отображения.</p>
        )}
      </div>
    </div>
  );
};