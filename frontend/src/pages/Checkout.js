import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, Lock, User, MapPin, FileText } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [isMobile, setIsMobile] = useState(false);
  
  // Form states with localStorage persistence
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('checkoutFormData');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Calculate total for fixed-price items only
  const fixedPriceTotal = cart ? cart.reduce((sum, item) => {
    if (!item.isCustomQuote && item.price && item.price > 0) {
      return sum + (item.price * (item.quantity || 1));
    }
    return sum;
  }, 0) : 0;

  // Check if cart has custom quote items
  const hasCustomQuoteItems = cart ? cart.some(item => item.isCustomQuote) : false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    // Save to localStorage
    localStorage.setItem('checkoutFormData', JSON.stringify(newFormData));
  };

  const handleProceedToPay = () => {
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        (!formData.address || !formData.city || !formData.state || !formData.zipCode)) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Navigate to payment page (keep form data in localStorage for back navigation)
    navigate('/payment', { 
      state: { 
        formData, 
        cart, 
        fixedPriceTotal, 
        hasCustomQuoteItems 
      } 
    });
  };

  const handleBackToCart = () => {
    // Clear the saved form data when going back to cart
    localStorage.removeItem('checkoutFormData');
    navigate('/cart');
  };

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '0', fontFamily: 'inherit', background: 'transparent' }}>
      {/* Back Button */}
      <button
        onClick={handleBackToCart}
        style={{
          position: 'fixed',
          top: 100,
          left: 80,
          zIndex: 1000,
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
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
        }}
      >
        <ArrowLeft style={{ width: 16, height: 16 }} />
        Back to Cart
      </button>

      <div style={{ maxWidth: 1200, width: '100%', margin: '-5rem auto 0', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#a259f7', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Checkout
          </h1>
          <p style={{ color: '#bdbdbd', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Complete your order details and proceed to payment
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: isMobile ? 32 : 48, 
          alignItems: 'start'
        }}>
          {/* Left Side - Personal & Address Information */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Personal Information */}
              <div style={{
                background: 'rgba(20,20,30,0.8)',
                borderRadius: '24px',
                border: '1px solid rgba(162,89,247,0.3)',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ 
                  color: '#a259f7', 
                  fontSize: '1.6rem', 
                  fontWeight: 700, 
                  marginBottom: 24, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  letterSpacing: '-0.01em'
                }}>
                  <User size={26} />
                  Personal Information
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: 20, 
                  marginBottom: 20 
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: 20, 
                  marginBottom: 20 
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div style={{
                background: 'rgba(20,20,30,0.8)',
                borderRadius: '24px',
                border: '1px solid rgba(162,89,247,0.3)',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}>
                <h2 style={{ 
                  color: '#a259f7', 
                  fontSize: '1.6rem', 
                  fontWeight: 700, 
                  marginBottom: 24, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  letterSpacing: '-0.01em'
                }}>
                  <MapPin size={26} />
                  Address Information
                </h2>
                
                <div style={{ marginBottom: 20 }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 15, 
                    fontWeight: 600, 
                    color: '#e7e7e7', 
                    marginBottom: 10,
                    letterSpacing: '0.01em'
                  }}>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(24,24,24,0.8)',
                      color: '#e7e7e7',
                      padding: '14px 18px',
                      border: '2px solid rgba(162,89,247,0.3)',
                      borderRadius: 12,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      fontWeight: 500
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a259f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                  gap: 20, 
                  marginBottom: 20 
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: 15, 
                      fontWeight: 600, 
                      color: '#e7e7e7', 
                      marginBottom: 10,
                      letterSpacing: '0.01em'
                    }}>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(24,24,24,0.8)',
                        color: '#e7e7e7',
                        padding: '14px 18px',
                        border: '2px solid rgba(162,89,247,0.3)',
                        borderRadius: 12,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontWeight: 500
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: 20 }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 15, 
                    fontWeight: 600, 
                    color: '#e7e7e7', 
                    marginBottom: 10,
                    letterSpacing: '0.01em'
                  }}>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(24,24,24,0.8)',
                      color: '#e7e7e7',
                      padding: '14px 18px',
                      border: '2px solid rgba(162,89,247,0.3)',
                      borderRadius: 12,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      fontWeight: 500
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a259f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(162,89,247,0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div style={{ 
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 'auto' : '120px',
            height: 'fit-content'
          }}>
            <div style={{
              background: 'rgba(20,20,30,0.8)',
              borderRadius: '24px',
              border: '1px solid rgba(162,89,247,0.3)',
              padding: '2.5rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <h2 style={{ 
                color: '#a259f7', 
                fontSize: '1.6rem', 
                fontWeight: 700, 
                marginBottom: 24, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12,
                letterSpacing: '-0.01em'
              }}>
                <FileText size={26} />
                Order Summary
              </h2>
              
              <div style={{ marginBottom: 24 }}>
                {cart.map((item, index) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '16px 0',
                    borderBottom: index < cart.length - 1 ? '1px solid rgba(162,89,247,0.15)' : 'none'
                  }}>
                    <div style={{ flex: 1, marginRight: 16 }}>
                      <div style={{ 
                        fontWeight: 600, 
                        color: '#e7e7e7', 
                        marginBottom: 6,
                        fontSize: '1rem',
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        <span>{item.name}</span>
                        {item.isPersonalized && (
                          <span style={{
                            background: 'linear-gradient(90deg, #a259f7, #7f42a7)',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Personalized
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        color: '#a7a7a7', 
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        <span>Qty: {item.quantity || 1}</span>
                        {item.isCustomQuote && (
                          <span style={{
                            background: 'rgba(255,107,107,0.2)',
                            color: '#ff6b6b',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            Custom Quote
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{
                      color: '#a259f7',
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      textAlign: 'right',
                      minWidth: '120px'
                    }}>
                      {item.isCustomQuote ? (
                        <div>
                          <div style={{ color: '#ff6b6b' }}>Custom Quote</div>
                          <div style={{ fontSize: '0.8rem', color: '#a7a7a7', marginTop: 2 }}>
                            + Price after discussion
                          </div>
                        </div>
                      ) : (
                        `₹${(item.price * (item.quantity || 1)).toLocaleString()}`
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                borderTop: '2px solid rgba(162,89,247,0.3)',
                paddingTop: 24,
                textAlign: 'right',
                marginBottom: 32
              }}>
                <div style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 800, 
                  color: '#a259f7',
                  letterSpacing: '-0.01em'
                }}>
                  {hasCustomQuoteItems ? (
                    <div>
                      <div>₹{fixedPriceTotal.toLocaleString()}</div>
                      <div style={{ 
                        fontSize: '1.1rem', 
                        color: '#a7a7a7', 
                        marginTop: 6,
                        fontWeight: 500
                      }}>
                        + custom quote
                      </div>
                    </div>
                  ) : (
                    `₹${fixedPriceTotal.toLocaleString()}`
                  )}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#a7a7a7', 
                  marginTop: 8,
                  fontWeight: 500
                }}>
                  Total Amount
                </div>
              </div>

              {/* Proceed to Pay Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleProceedToPay}
                  style={{
                    background: 'linear-gradient(135deg, #a259f7, #7f42a7)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    padding: '1.5rem 3rem',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(162,89,247,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    margin: '0 auto',
                    letterSpacing: '0.01em',
                    minWidth: '280px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 40px rgba(162,89,247,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px rgba(162,89,247,0.4)';
                  }}
                >
                  <Lock size={22} />
                  Proceed to Pay
                </button>
                <p style={{
                  color: '#a7a7a7',
                  fontSize: '0.9rem',
                  marginTop: '12px',
                  fontWeight: 500
                }}>
                  Thank you for choosing our services! 🙏
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;