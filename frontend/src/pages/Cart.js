import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, PlusCircle, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const BRAND_LOGO = (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
    <div style={{ borderRadius: '50%', background: 'linear-gradient(135deg, #a259f7, #7f42a7)', padding: 4, boxShadow: '0 2px 12px #a259f7aa' }}>
      <div style={{ background: '#181818', borderRadius: '50%', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <User style={{ width: 32, height: 32, color: '#a259f7' }} />
      </div>
    </div>
  </div>
);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  
  const total = cart.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    return sum + itemTotal;
  }, 0);

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(id, newQuantity);
  };

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '0', fontFamily: 'inherit', background: 'transparent' }}>
      {/* Back Button */}
      <button
        className="cart-back-button"
        style={{
          position: 'fixed',
          top: 100,
          left: 80,
          background: 'rgba(30,30,30,0.95)',
          color: '#a259f7',
          border: '1px solid rgba(162,89,247,0.3)',
          borderRadius: 8,
          padding: '0.6rem 1rem',
          fontWeight: 600,
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
        onClick={handleGoBack}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(162,89,247,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(30,30,30,0.95)'}
      >
        <ArrowLeft style={{ width: 16, height: 16 }} />
        Back
      </button>
      
            <div className="cart-container" style={{ width: '100%', maxWidth: 1200, margin: '-5rem auto 0', padding: '0 2rem' }}>
        {BRAND_LOGO}
                <div style={{ marginTop: 16 }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#a259f7', marginBottom: '2rem', textAlign: 'center' }}>Your Cart</h1>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
                <p style={{ color: '#a7a7a7', fontSize: '1.1rem', marginBottom: '2rem' }}>Your cart is empty.</p>
                <button
                  style={{
                    background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    border: 'none',
                    borderRadius: 999,
                    padding: '0.9rem 2.2rem',
                    boxShadow: '0 2px 12px #a259f7aa',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    margin: '0 auto',
                  }}
                  onClick={() => navigate('/services')}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <PlusCircle style={{ width: 20, height: 20 }} /> Add Items
                </button>
              </div>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 40 }}>
                  {cart.map(item => {
                    const quantity = item.quantity || 1;
                    const itemTotal = (item.price || 0) * quantity;
                    
                    return (
                    <li key={item.id} className="cart-item" style={{
                      background: 'rgba(40,40,50,0.3)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 16,
                      padding: '2rem',
                      marginBottom: 24,
                      display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                      }}>
                                                  <div className="cart-item-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontWeight: 700, color: '#e7e7e7', fontSize: '1.3rem' }}>{item.name}</span>
                            </div>
                            <span style={{ color: '#a259f7', fontWeight: 700, fontSize: '1.4rem' }}>
                              {itemTotal === 0 ? 'Custom' : `₹${itemTotal.toLocaleString()}`}
                            </span>
                          </div>
                        
                                                  <div className="cart-item-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <span style={{ color: '#a7a7a7', fontSize: '1rem', fontWeight: 600 }}>Quantity:</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <button
                                  style={{
                                    background: 'rgba(162,89,247,0.12)',
                                    color: '#a259f7',
                                    border: '1px solid #a259f7',
                                    borderRadius: 8,
                                    padding: '0.5rem 0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    display: 'flex',
                        alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onClick={() => handleQuantityChange(item.id, quantity, -1)}
                                  disabled={quantity <= 1}
                                >
                                  <Minus size={16} />
                                </button>
                                <span style={{ 
                                  fontWeight: 700, 
                                  color: '#e7e7e7', 
                                  minWidth: '3rem', 
                                  textAlign: 'center',
                                  fontSize: '1.2rem'
                                }}>
                                  {quantity}
                                </span>
                                <button
                                  style={{
                        background: 'rgba(162,89,247,0.12)',
                        color: '#a259f7',
                        border: '1px solid #a259f7',
                                    borderRadius: 8,
                                    padding: '0.5rem 0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  onClick={() => handleQuantityChange(item.id, quantity, 1)}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              {item.price > 0 ? (
                                <span style={{ color: '#a7a7a7', fontSize: '1rem', fontWeight: 600 }}>
                                  @ ₹{item.price.toLocaleString()}
                                </span>
                              ) : item.price === 0 && (
                                <span style={{ color: '#a7a7a7', fontSize: '1rem', fontWeight: 600 }}>
                                  @ Custom
                                </span>
                              )}
                            </div>
                            
                            <button 
                              style={{
                                background: 'rgba(255,255,255,0.12)',
                                color: '#ffffff',
                                border: '1px solid #ffffff',
                        borderRadius: 10,
                        padding: '0.6rem 1.3rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                fontSize: '1rem'
                              }} 
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                    </li>
                    );
                  })}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <button
                    style={{
                      background: 'rgba(162,89,247,0.10)',
                      color: '#a259f7',
                      border: '1px solid #a259f7',
                      borderRadius: 12,
                      padding: isMobile ? '0.7rem 1.5rem' : '1rem 2rem',
                      fontWeight: 600,
                      fontSize: isMobile ? '0.9rem' : '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? 6 : 10,
                      boxShadow: '0 2px 12px #0002',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => navigate('/services')}
                  >
                    <PlusCircle style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22 }} /> Add More Items
                  </button>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#a7a7a7', marginBottom: '0.5rem' }}>Total Amount</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#a259f7' }}>₹{total.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    style={{
                      background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: isMobile ? '1.1rem' : '1.3rem',
                      padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                      borderRadius: 12,
                      boxShadow: '0 4px 20px rgba(162,89,247,0.4)',
                      border: 'none',
                      marginTop: 8,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? 6 : 10,
                      margin: '0 auto',
                      width: isMobile ? '100%' : 'auto',
                      textAlign: 'center'
                    }}
                    onClick={() => navigate('/checkout')}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
      </div>
    </div>
  );
};

export default Cart; 