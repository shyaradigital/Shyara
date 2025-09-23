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

  // Service type mapping
  const getServiceType = (itemId) => {
    if (itemId.startsWith('smm-')) return 'Social Media Management';
    if (itemId.startsWith('app-')) return 'App Development';
    if (itemId.startsWith('web-')) return 'Website Development';
    if (itemId.startsWith('video-')) return 'Video Editing & Reels';
    if (itemId.startsWith('ads-')) return 'Ad Campaign Management';
    if (itemId.startsWith('festive-')) return 'Festive Posts';
    if (itemId === 'festive-posts') return 'Festive Posts';
    if (itemId === 'ads-campaign-management') return 'Ad Campaign Management';
    if (itemId === 'video-editing-reels') return 'Video Editing & Reels';
    if (itemId === 'social-media-management') return 'Social Media Management';
    if (itemId === 'social-media-package') return 'Social Media Management';
    // Handle personalized services
    if (itemId === 'personalized-festive-posts') return 'Festive Posts';
    if (itemId === 'personalized-ads-campaign-management') return 'Ad Campaign Management';
    if (itemId === 'personalized-video-editing-reels') return 'Video Editing & Reels';
    if (itemId === 'personalized-web-basic' || itemId === 'personalized-web-ecom' || itemId === 'personalized-web-custom') return 'Website Development';
    if (itemId === 'personalized-app-basic' || itemId === 'personalized-app-enterprise') return 'App Development';
    if (itemId === 'personalized-social-media-package') return 'Social Media Management';
    if (itemId === 'personalized-social-media-management') return 'Social Media Management';
    return 'Other Services';
  };

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
      // Handle custom quote services - respect explicit isCustomQuote if provided, otherwise determine automatically
      isCustomQuote: item.isCustomQuote !== undefined ? item.isCustomQuote : (item.price === 0 || item.price === null || item.price === undefined || item.priceText === 'Custom Quote'),
      priceText: item.priceText || (item.price === 0 || item.price === null || item.price === undefined ? 'Custom Quote' : `₹${item.price}`),
      // Ensure service name is properly set
      name: item.name || item.title || 'Service',
      // Add personalized tag for items from Personalized Services page
      isPersonalized: item.isPersonalized || false
    };

    // Check for service type conflicts
    const newItemServiceType = getServiceType(item.id);
    const existingItemsInSameType = cart.filter(cartItem => getServiceType(cartItem.id) === newItemServiceType);
    
    if (existingItemsInSameType.length > 0) {
      // Show conflict notification
      const existingServiceNames = existingItemsInSameType.map(item => item.name).join(', ');
      showNotification(
        `You already have ${existingServiceNames} from ${newItemServiceType} in your cart. Please remove the existing item first or choose a different service type.`,
        'error'
      );
      return;
    }

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
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          zIndex: 10000,
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px',
          lineHeight: '1.5',
          animation: 'slideInRight 0.3s ease-out',
          border: notification.type === 'error' ? '1px solid rgba(255,255,255,0.2)' : 'none'
        }}>
          {notification.message}
        </div>
      )}
    </CartContext.Provider>
  );
}; 