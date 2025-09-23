import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
  showNotification: () => {},
  showCelebration: () => {},
  hideCelebration: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [notification, setNotification] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasSeenCelebration, setHasSeenCelebration] = useState(() => {
    const stored = localStorage.getItem('hasSeenCelebration');
    return stored ? JSON.parse(stored) : false;
  });

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

  useEffect(() => {
    localStorage.setItem('hasSeenCelebration', JSON.stringify(hasSeenCelebration));
  }, [hasSeenCelebration]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item) => {
    // Apply 50% discount to all items (except custom quotes)
    const originalPrice = item.price || 0;
    const discountedPrice = item.isCustomQuote !== false ? originalPrice : Math.round(originalPrice * 0.5);
    
    // Ensure proper service name and price handling
    const cartItem = {
      ...item,
      quantity: item.quantity || 1,
      // Store original price and discounted price
      originalPrice: originalPrice,
      price: discountedPrice,
      // Handle custom quote services - respect explicit isCustomQuote if provided, otherwise determine automatically
      isCustomQuote: item.isCustomQuote !== undefined ? item.isCustomQuote : (originalPrice === 0 || originalPrice === null || originalPrice === undefined || item.priceText === 'Custom Quote'),
      priceText: item.priceText || (originalPrice === 0 || originalPrice === null || originalPrice === undefined ? 'Custom Quote' : `₹${discountedPrice}`),
      // Ensure service name is properly set
      name: item.name || item.title || 'Service',
      // Add personalized tag for items from Personalized Services page
      isPersonalized: item.isPersonalized || false,
      // Mark as discounted
      isDiscounted: !item.isCustomQuote && originalPrice > 0
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

  const showCelebrationModal = () => {
    if (!hasSeenCelebration) {
      setShowCelebration(true);
    }
  };

  const hideCelebrationModal = () => {
    setShowCelebration(false);
    setHasSeenCelebration(true);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart, showNotification, showCelebration: showCelebrationModal, hideCelebration: hideCelebrationModal }}>
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

      {/* Celebration Modal */}
      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(162,89,247,0.95), rgba(127,66,167,0.95))',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(162,89,247,0.4)',
            border: '2px solid rgba(255,255,255,0.2)',
            animation: 'celebrationPulse 2s ease-in-out infinite alternate'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px',
              animation: 'bounce 1s ease-in-out infinite'
            }}>
              🎉
            </div>
            <h2 style={{
              color: 'white',
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Pay Only Half!
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '1.2rem',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              You're getting <strong>50% OFF</strong> on all services!<br />
              Pay the discounted amount now and the rest when you receive your product.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <p style={{
                color: 'white',
                fontSize: '0.9rem',
                margin: '0',
                fontStyle: 'italic'
              }}>
                * Refer to our Terms & Conditions for complete payment terms and delivery schedule
              </p>
            </div>
            <button
              onClick={hideCelebrationModal}
              style={{
                background: 'white',
                color: '#a259f7',
                border: 'none',
                borderRadius: '50px',
                padding: '16px 32px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}; 