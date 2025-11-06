import React from 'react';

interface OrderSummaryProps {
  totalItems: number;
  grandTotal: number;
  onPlaceOrderClick: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ totalItems, grandTotal, onPlaceOrderClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-brand-dark-2/80 backdrop-blur-sm border-t border-brand-accent-2 shadow-2xl z-10">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="text-lg">
          <span className="font-bold text-brand-light">{totalItems}</span>
          <span className="text-gray-400"> товаров в заказе</span>
        </div>
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
          <div className="text-lg text-right">
            <span className="text-gray-400">Итого: </span>
            <span className="font-bold text-2xl text-brand-accent">₸{grandTotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={onPlaceOrderClick}
            className="bg-brand-accent hover:bg-brand-accent-2 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 whitespace-nowrap"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </footer>
  );
};