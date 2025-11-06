

import React, { useState, useCallback } from 'react';
import { OrderDetail } from '../types';
import { generateOrderSummary } from '../services/geminiService';

interface GeminiSummaryProps {
  orderDetails: OrderDetail[];
  grandTotal: number;
}

export const GeminiSummary: React.FC<GeminiSummaryProps> = ({ orderDetails, grandTotal }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    if (orderDetails.length === 0) {
      setError("Невозможно создать сводку для пустого заказа.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    try {
      const result = await generateOrderSummary(orderDetails, grandTotal);
      setSummary(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [orderDetails, grandTotal]);
  
  const hasOrder = orderDetails.length > 0;

  return (
    <div className="bg-brand-dark-2 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-brand-accent flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1" /></svg>
        AI-ассистент заказа
      </h2>
      <button
        onClick={handleGenerateSummary}
        disabled={isLoading || !hasOrder}
        className="w-full bg-brand-accent hover:bg-brand-accent-2 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Генерация...
            </>
        ) : (
          "Создать сводку заказа"
        )}
      </button>
      
      {!hasOrder && !summary && <p className="text-sm text-gray-400 mt-4">Добавьте товары в заказ, чтобы создать сводку.</p>}
      
      {error && <p className="text-sm text-red-400 mt-4">Ошибка: {error}</p>}

      {summary && (
        <div className="mt-6">
          <h3 className="font-semibold text-brand-light mb-2">Сгенерированная сводка:</h3>
          <pre className="bg-brand-dark p-4 rounded-md text-sm text-gray-300 whitespace-pre-wrap font-sans overflow-x-auto">{summary}</pre>
           <button 
              onClick={() => navigator.clipboard.writeText(summary)}
              className="mt-2 text-sm text-brand-accent hover:text-brand-accent-2 transition"
            >
              Копировать в буфер обмена
            </button>
        </div>
      )}
    </div>
  );
};