import React, { useState, useEffect } from 'react';
import { CustomerInfo } from '../types';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerInfo: CustomerInfo) => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    shopName: '',
    customerName: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setCustomerInfo({
        shopName: '',
        customerName: '',
        phone: '',
        address: '',
      });
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Simple validation
    // FIX: Ensure val is treated as a string before calling .trim() to resolve TypeScript error.
    if (Object.values(customerInfo).some(val => String(val).trim() === '')) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    onSubmit(customerInfo);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-dark-2 rounded-lg shadow-2xl p-8 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-brand-accent">Оформление заказа</h2>
        <form onSubmit={e => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-300 mb-1">Название магазина</label>
            <input type="text" id="shopName" name="shopName" value={customerInfo.shopName} onChange={handleChange} required className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-300 mb-1">Имя покупателя</label>
            <input type="text" id="customerName" name="customerName" value={customerInfo.customerName} onChange={handleChange} required className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Номер телефона</label>
            <input type="tel" id="phone" name="phone" value={customerInfo.phone} onChange={handleChange} required className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Адрес магазина</label>
            <input type="text" id="address" name="address" value={customerInfo.address} onChange={handleChange} required className="w-full input-style" />
          </div>
          <style>{`.input-style { background-color: #111827; border: 1px solid #4b5563; border-radius: 0.375rem; padding: 0.5rem 0.75rem; color: #f3f4f6; transition: all 0.2s; } .input-style:focus { ring: 2px; ring-color: #38bdf8; border-color: #38bdf8; outline: none; }`}</style>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 transition">
              Отмена
            </button>
            <button type="button" onClick={handleSubmit} className="w-full sm:w-auto px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition">
              Оформить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};