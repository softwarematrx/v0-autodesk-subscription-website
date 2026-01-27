export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Pricing {
  id: string;
  product_id: string;
  plan_type: 'monthly' | 'annual';
  price: number;
  discount_percentage?: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  plan_type: 'monthly' | 'annual';
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  total_amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripe_session_id?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  plan_type: 'monthly' | 'annual';
  price: number;
  quantity: number;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}
