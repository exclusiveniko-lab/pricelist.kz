import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CustomerInfo, Product, SortKey, Order } from '../types';
import { productsData } from '../data/products';
import { SearchBar } from './SearchBar';
import { ProductTable } from './ProductTable';
import { OrderSummary } from './OrderSummary';
import { GeminiSummary } from './GeminiSummary';
import { OrderFormModal } from './OrderFormModal';
import { ImageGalleryModal } from './ImageGalleryModal';
import { EditProductModal } from './EditProductModal';
import { LoginModal } from './LoginPage';
import { CategoryChart } from './CategoryChart';
import { OrderHistoryModal } from './OrderHistoryModal';
import { StockAlert } from './StockAlert';

const PRODUCTS_STORAGE_KEY = 'topomax_products';
const ORDERS_STORAGE_KEY = 'topomax_orders';
const LOW_STOCK_THRESHOLD = 10;

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return storedProducts ? JSON.parse(storedProducts) : productsData;
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      return productsData;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Failed to save orders to localStorage", error);
    }
  }, [orders]);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [order, setOrder] = useState<Record<string, number>>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      p => p.stockQuantity > 0 && p.stockQuantity <= LOW_STOCK_THRESHOLD
    );
  }, [products]);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);
  
  const handleOpenEditModal = useCallback((product: Product) => {
    setEditingProduct(product);
  }, []);
  
  const handleCloseEditModal = useCallback(() => {
    setEditingProduct(null);
  }, []);

  const handleSaveProduct = useCallback((updatedProduct: Product) => {
    const newProduct = { ...updatedProduct, stockQuantity: Number(updatedProduct.stockQuantity) || 0 };
    setProducts(currentProducts => 
      currentProducts.map(p => p.id === newProduct.id ? newProduct : p)
    );
    handleCloseEditModal();
  }, [handleCloseEditModal]);
  
  const handleInlineProductUpdate = useCallback((productId: string, field: 'price' | 'stockQuantity', value: number) => {
    setProducts(currentProducts =>
      currentProducts.map(p => {
        if (p.id === productId) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  }, []);

  const handleDeleteProduct = useCallback((productId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар? Это действие необратимо.')) {
      setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
    }
  }, []);

  const handleQuantityChange = useCallback((model: string, quantity: number) => {
    setOrder(prevOrder => {
      const newOrder = { ...prevOrder };
      if (quantity > 0) {
        newOrder[model] = quantity;
      } else {
        delete newOrder[model];
      }
      return newOrder;
    });
  }, []);
  
  const handleOpenGallery = useCallback((images: string[]) => {
    if (images && images.length > 0) {
      setGalleryImages(images);
    }
  }, []);

  const handleCloseGallery = useCallback(() => {
    setGalleryImages(null);
  }, []);

  const handleSort = useCallback((key: 'model' | 'price' | 'category' | 'stockQuantity') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))].sort();
    return ['Все категории', ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let results = products;

    if (selectedCategory && selectedCategory !== 'Все категории') {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        results = results.filter(product =>
            product.model.toLowerCase().includes(lowercasedTerm) ||
            product.category.toLowerCase().includes(lowercasedTerm) ||
            product.parameters.join(' ').toLowerCase().includes(lowercasedTerm)
        );
    }

    return results;
  }, [searchTerm, selectedCategory, products]);
  
  const sortedProducts = useMemo(() => {
    const sortableProducts = [...filteredProducts];
    if (sortConfig.key) {
      const key = sortConfig.key;
      sortableProducts.sort((a, b) => {
        // FIX: The original switch statement with fallthrough cases was causing a type
        // inference issue in some TypeScript environments. By separating the cases,
        // we ensure that the property access is explicitly tied to a narrowed key type,
        // which resolves the error.
        switch (key) {
          case 'price': {
            const aValue = a.price;
            const bValue = b.price;
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
          }
          case 'stockQuantity': {
            const aValue = a.stockQuantity;
            const bValue = b.stockQuantity;
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
          }
          case 'model': {
            const aValue = a.model;
            const bValue = b.model;
            return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
          case 'category': {
             const aValue = a.category;
             const bValue = b.category;
             return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
          }
          default:
            return 0;
        }
      });
    }
    return sortableProducts;
  }, [filteredProducts, sortConfig]);

  const handleExportToCSV = useCallback(() => {
    if (sortedProducts.length === 0) return;

    const escapeCSV = (field: any): string => {
        let str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            str = str.replace(/"/g, '""');
            return `"${str}"`;
        }
        return str;
    };

    const headers = [
        'Модель',
        'Категория',
        'Цена (₸)',
        'Наличие',
        'Параметры',
        'Изображения',
        'Информация о коробке',
        'Цвет'
    ];

    const csvRows = sortedProducts.map(p => {
        const row = [
            escapeCSV(p.model),
            escapeCSV(p.category),
            p.price,
            p.stockQuantity,
            escapeCSV(p.parameters.join('; ')),
            escapeCSV(p.images.join('; ')),
            escapeCSV(p.cartonInfo),
            escapeCSV(p.color)
        ];
        return row.join(',');
    });

    const csvString = [headers.join(','), ...csvRows].join('\n');
    
    // Add BOM for UTF-8 to ensure Excel opens Cyrillic characters correctly
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `TOPOMAX_Прайс-лист_${date}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}, [sortedProducts]);


  const orderDetails = useMemo(() => {
    return Object.entries(order).map(([model, quantity]) => {
      const product = products.find(p => p.model === model);
      // Ensure quantity does not exceed stock
      const validQuantity = product ? Math.min(quantity, product.stockQuantity) : 0;
      
      return {
        product: product!,
        quantity: validQuantity,
        totalPrice: product ? product.price * validQuantity : 0,
      };
    }).filter(item => item.product && item.quantity > 0);
  }, [order, products]);

  const { totalItems, grandTotal } = useMemo(() => {
    return orderDetails.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.grandTotal += item.totalPrice;
        return acc;
      },
      { totalItems: 0, grandTotal: 0 }
    );
  }, [orderDetails]);
  
  const handlePlaceOrder = (customerInfo: CustomerInfo) => {
    const newOrder: Order = {
      id: `${new Date().getTime()}-${customerInfo.shopName.slice(0, 5)}`,
      date: new Date().toISOString(),
      customerInfo,
      items: orderDetails,
      grandTotal,
      status: 'new',
      paymentStatus: 'unpaid',
    };
  
    // Update product stock based on the order
    setProducts(currentProducts =>
      currentProducts.map(p => {
        const orderItem = orderDetails.find(item => item.product.id === p.id);
        if (orderItem) {
          const newStock = Math.max(0, p.stockQuantity - orderItem.quantity);
          return { ...p, stockQuantity: newStock };
        }
        return p;
      })
    );
  
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setOrder({}); // Clear the current order
    setIsOrderModalOpen(false);
    alert(`Заказ для "${customerInfo.shopName}" успешно сохранен!`);
  };

  const handleMarkAsProcessed = useCallback((orderId: string) => {
    setOrders(currentOrders =>
      currentOrders.map(o =>
        o.id === orderId ? { ...o, status: 'processed' } : o
      )
    );
  }, []);

  const handleUpdatePaymentStatus = useCallback((orderId: string, status: 'paid' | 'unpaid') => {
    setOrders(currentOrders =>
      currentOrders.map(o =>
        o.id === orderId ? { ...o, paymentStatus: status } : o
      )
    );
  }, []);

  const handleDeleteOrder = useCallback((orderId: string) => {
    const orderToDelete = orders.find(o => o.id === orderId);
    if (!orderToDelete) return;

    // Restore stock
    setProducts(currentProducts => {
      const stockToRestore = new Map<string, number>();
      orderToDelete.items.forEach(item => {
          stockToRestore.set(item.product.id, (stockToRestore.get(item.product.id) || 0) + item.quantity);
      });

      return currentProducts.map(product => {
          const quantityToRestore = stockToRestore.get(product.id);
          if (typeof quantityToRestore === 'number') {
              // FIX: The stock quantity could be of a different type if read from
              // localStorage. This ensures it's correctly handled as a number.
              const stock = parseInt(String(product.stockQuantity || 0), 10);
              const safeStock = isNaN(stock) ? 0 : stock;
              return { ...product, stockQuantity: safeStock + quantityToRestore };
          }
          return product;
      });
    });

    // Delete order
    setOrders(currentOrders => currentOrders.filter(o => o.id !== orderId));
  }, [orders]);

  const TopoMaxLogo = () => (
    <svg width="150" height="40" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#38bdf8">
        TOPOMAX
      </text>
      <text x="10" y="58" fontFamily="Arial, sans-serif" fontSize="10" fill="#f3f4f6">
        ПУТЕШЕСТВУЙ С МЕЧТАМИ
      </text>
    </svg>
  );

  return (
    <>
      <header className="bg-brand-dark-2/80 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => setIsOrderHistoryOpen(true)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition h-[42px] whitespace-nowrap">
                      История заказов
                    </button>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition h-[42px] whitespace-nowrap">
                      Выйти
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsLoginModalOpen(true)} className="px-4 py-2 bg-brand-accent hover:bg-brand-accent-2 text-white font-bold rounded-lg transition h-[42px] whitespace-nowrap">
                    Вход
                  </button>
                )}
              </div>
             <div className="hidden lg:block">
               <TopoMaxLogo />
             </div>
           </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-brand-light tracking-wide order-first md:order-none">
            Интерактивный прайс-лист
          </h1>
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-52">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            <div className="w-full sm:w-40">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 bg-brand-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all duration-300 text-brand-light h-[42px]"
                aria-label="Фильтр по категории"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
             <button
                onClick={handleExportToCSV}
                disabled={sortedProducts.length === 0}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition h-[42px] flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                title="Экспорт текущего вида в CSV"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a.75.75 0 01-.75-.75V5.612l-2.06 2.06a.75.75 0 01-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06l-2.06-2.06V17.25A.75.75 0 0110 18z" />
                  <path d="M3.75 13.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zM12 13.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
                   <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V13a1 1 0 11-2 0V7.414L6.293 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Экспорт</span>
              </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <ProductTable 
                products={sortedProducts} 
                order={order} 
                onQuantityChange={handleQuantityChange}
                sortConfig={sortConfig}
                onSort={handleSort}
                onOpenGallery={handleOpenGallery}
                onOpenEditModal={handleOpenEditModal}
                onDeleteProduct={handleDeleteProduct}
                isLoggedIn={isLoggedIn}
                onInlineUpdate={handleInlineProductUpdate}
             />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {isLoggedIn && <StockAlert products={lowStockProducts} />}
              <div className="mb-8">
                <CategoryChart products={products} />
              </div>
              <GeminiSummary orderDetails={orderDetails} grandTotal={grandTotal} />
            </div>
          </div>
        </div>
      </main>

      {totalItems > 0 && !isLoggedIn && (
        <OrderSummary 
          totalItems={totalItems} 
          grandTotal={grandTotal} 
          onPlaceOrderClick={() => setIsOrderModalOpen(true)}
        />
      )}
      
      <OrderFormModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handlePlaceOrder}
      />
      <OrderHistoryModal 
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onMarkAsProcessed={handleMarkAsProcessed}
        onDeleteOrder={handleDeleteOrder}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
      />
      {galleryImages && (
        <ImageGalleryModal images={galleryImages} onClose={handleCloseGallery} />
      )}
       <EditProductModal 
        isOpen={!!editingProduct}
        onClose={handleCloseEditModal}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
       <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
       />
    </>
  );
};