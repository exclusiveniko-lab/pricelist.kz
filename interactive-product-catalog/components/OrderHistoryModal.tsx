import React, { useState } from 'react';
import { Order } from '../types';
import { exportOrderToExcel } from '../services/orderService';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onMarkAsProcessed: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onUpdatePaymentStatus: (orderId: string, status: 'paid' | 'unpaid') => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose, orders, onMarkAsProcessed, onDeleteOrder, onUpdatePaymentStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  if (!isOpen) {
    return null;
  }
  
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation(); // Prevent opening detail view
    if (window.confirm('Вы уверены, что хотите удалить этот заказ? Это действие необратимо.')) {
      onDeleteOrder(orderId);
    }
  };

  const renderOrderList = () => (
    <>
      <h2 className="text-2xl font-bold mb-6 text-brand-accent">История заказов</h2>
      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
        {orders.length === 0 ? (
          <p className="text-gray-400">История заказов пуста.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} onClick={() => handleSelectOrder(order)} className="bg-brand-dark p-4 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors border border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-brand-light">{order.customerInfo.shopName}</p>
                    {order.status === 'processed' ? (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">ОБРАБОТАНО</span>
                    ) : (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">НЕОБРАБОТАН</span>
                    )}
                    {order.paymentStatus === 'paid' ? (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">ОПЛАЧЕНО</span>
                    ) : (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">ЗАДОЛЖЕННОСТЬ</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{new Date(order.date).toLocaleString('ru-RU')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-lg text-brand-accent">₸{order.grandTotal.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.items.length} поз.</p>
                  </div>
                   <button 
                    onClick={(e) => handleDeleteClick(e, order.id)} 
                    className="text-red-500 hover:text-red-400 p-2 rounded-full transition-colors" 
                    title="Удалить заказ"
                    aria-label="Удалить заказ"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
       <div className="flex justify-end pt-6">
        <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 transition">Закрыть</button>
      </div>
    </>
  );

  const renderOrderDetail = () => {
    if (!selectedOrder) return null;
    
    const handleMarkAsProcessed = () => {
        if (!selectedOrder) return;
        onMarkAsProcessed(selectedOrder.id);
        setSelectedOrder(prev => prev ? { ...prev, status: 'processed' } : null);
    };

    const handleMarkAsPaid = () => {
      if (!selectedOrder) return;
      onUpdatePaymentStatus(selectedOrder.id, 'paid');
      setSelectedOrder(prev => prev ? { ...prev, paymentStatus: 'paid' } : null);
    };
    
    const handleMarkAsUnpaid = () => {
      if (!selectedOrder) return;
      onUpdatePaymentStatus(selectedOrder.id, 'unpaid');
      setSelectedOrder(prev => prev ? { ...prev, paymentStatus: 'unpaid' } : null);
    };

    return (
      <>
        <div className="flex items-center mb-6">
            <button onClick={handleBackToList} className="mr-4 p-2 rounded-full hover:bg-gray-600 transition text-brand-accent">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-brand-accent">Детали заказа</h2>
        </div>
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
            <div>
                <h3 className="font-semibold text-lg text-brand-light mb-2">Информация о клиенте</h3>
                <div className="bg-brand-dark p-4 rounded-lg text-sm space-y-1 border border-gray-700">
                    <p><span className="text-gray-400">Магазин:</span> {selectedOrder.customerInfo.shopName}</p>
                    <p><span className="text-gray-400">Покупатель:</span> {selectedOrder.customerInfo.customerName}</p>
                    <p><span className="text-gray-400">Телефон:</span> {selectedOrder.customerInfo.phone}</p>
                    <p><span className="text-gray-400">Адрес:</span> {selectedOrder.customerInfo.address}</p>
                    <p><span className="text-gray-400">Дата:</span> {new Date(selectedOrder.date).toLocaleString('ru-RU')}</p>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-brand-light mb-2">Состав заказа</h3>
                <div className="space-y-2">
                    {selectedOrder.items.map(item => (
                        <div key={item.product.id} className="bg-brand-dark p-3 rounded-md flex justify-between items-center border border-gray-700">
                            <div>
                                <p className="font-medium text-brand-light">{item.product.model}</p>
                                <p className="text-xs text-gray-400">{item.product.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-brand-light">{item.quantity} шт. x ₸{item.product.price.toFixed(2)}</p>
                                <p className="font-semibold text-brand-accent">₸{item.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-right font-bold text-2xl text-brand-accent pt-4">
                Итого: ₸{selectedOrder.grandTotal.toFixed(2)}
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 mt-6 border-t border-gray-700">
            {selectedOrder.status !== 'processed' && (
                <button
                    onClick={handleMarkAsProcessed}
                    className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                >
                    Отметить как обработанный
                </button>
            )}
            
            {(selectedOrder.paymentStatus === 'unpaid' || !selectedOrder.paymentStatus) ? (
              <button onClick={handleMarkAsPaid} className="w-full sm:w-auto px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold transition">
                Отметить как оплаченный
              </button>
            ) : (
              <button onClick={handleMarkAsUnpaid} className="w-full sm:w-auto px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition">
                Отметить как неоплаченный
              </button>
            )}

            <button
              onClick={() => exportOrderToExcel(selectedOrder.items, selectedOrder.grandTotal, selectedOrder.customerInfo)}
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Печать накладной (Excel)
            </button>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-dark-2 rounded-lg shadow-2xl p-8 w-full max-w-2xl m-4" onClick={e => e.stopPropagation()}>
        {selectedOrder ? renderOrderDetail() : renderOrderList()}
      </div>
    </div>
  );
};