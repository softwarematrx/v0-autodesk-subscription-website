'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  tier_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  duration: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (tier_id: string) => void;
  updateQuantity: (tier_id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.tier_id === newItem.tier_id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.tier_id === newItem.tier_id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeItem = (tier_id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.tier_id !== tier_id));
  };

  const updateQuantity = (tier_id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(tier_id);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.tier_id === tier_id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
