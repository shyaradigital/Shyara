import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
  showNotification: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item) => {
    // Ensure proper service name and price handling
    const cartItem = {
      ...item,
      quantity: item.quantity || 1,
      // Handle custom quote services
      isCustomQuote: item.price === 0 || item.price === null || item.price === undefined || item.priceText === 'Custom Quote',
      priceText: item.priceText || (item.price === 0 || item.price === null || item.price === undefined ? 'Custom Quote' : `₹${item.price}`),
      // Ensure service name is properly set
      name: item.name || item.title || 'Service'
    };

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
      return [...prev, cartItem];
    });

    // Show confirmation message
    showNotification(`${cartItem.name} added to cart`);
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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart, showNotification }}>
      {children}
      {/* Notification Component */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'success' ? '#4CAF50' : '#f44336',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10000,
          fontSize: '14px',
          fontWeight: '500',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {notification.message}
        </div>
      )}
    </CartContext.Provider>
  );
}; 