import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateCartItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      // Check if item already exists
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prev.map((i) => 
          i.id === item.id 
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      }
      // If item doesn't exist, add it with quantity 1
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart((prev) => 
      prev.map((item) => 
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const updateCartItem = (id, updates) => {
    setCart((prev) => 
      prev.map((item) => 
        item.id === id 
          ? { ...item, ...updates }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}; 