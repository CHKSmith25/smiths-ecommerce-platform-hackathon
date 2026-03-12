export type DetectionMode = 'narcotics' | 'explosives' | 'dual' | 'enhanced-narcotics';
export type Certification = 'TSA' | 'CAAC' | 'IPMO' | 'ROW';
export type ProductType = 'main-device' | 'spare' | 'consumable';
export type QuoteStatus = 'pending' | 'approved' | 'rejected' | 'amended';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  price: number;
  imageUrl?: string;
  requiresQuote: boolean;
  
  // For IONSCAN 600 configurations
  detectionMode?: DetectionMode;
  certification?: Certification;
  hasPrinter?: boolean;
  
  // Stock info
  inStock: boolean;
  stockQuantity?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
}

export interface QuoteRequest {
  id: string;
  customerId: string;
  customer: Customer;
  productId: string;
  product: Product;
  quantity: number;
  notes: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  
  // Approver response
  approverNotes?: string;
  discountPercentage?: number;
  suggestedProductId?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  
  // Delivery info
  deliveryAddress: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  
  // SAP data
  sapData?: SAPOrderData;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SAPOrderData {
  orderId: string;
  customerCode: string;
  orderDate: string;
  items: {
    materialNumber: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  currency: string;
  deliveryAddress: string;
  paymentTerms: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
