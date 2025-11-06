export interface Product {
  id: string; // Using model as unique ID
  model: string;
  category: string;
  images: string[]; // URLs for product images
  color: string;
  price: number; // in RMB
  parameters: string[];
  cartonInfo: string;
  stockQuantity: number;
}

export interface CustomerInfo {
  shopName: string;
  customerName: string;
  phone: string;
  address: string;
}

export type SortKey = keyof Product | null;
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export interface OrderDetail {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  date: string;
  customerInfo: CustomerInfo;
  items: OrderDetail[];
  grandTotal: number;
  status?: 'new' | 'processed';
  paymentStatus?: 'paid' | 'unpaid';
}