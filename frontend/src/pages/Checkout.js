import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, CheckCircle, Shield, Lock, User, MapPin, FileText, QrCode, CreditCard } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [showPolicies, setShowPolicies] = useState(false);
  const [acceptedPolicies, setAcceptedPolicies] = useState({
    privacy: false,
    terms: false,
    refund: false
  });
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [paymentData, setPaymentData] = useState({
    utrNumber: '',
    paypalTransactionId: ''
  });
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePolicyAccept = (policy) => {
    setAcceptedPolicies(prev => ({
      ...prev,
      [policy]: !prev[policy]
    }));
  };

  const allPoliciesAccepted = Object.values(acceptedPolicies).every(accepted => accepted);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allPoliciesAccepted) {
      alert('Please accept all policies to continue');
      return;
    }
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        (!formData.address || !formData.city || !formData.state || !formData.zipCode)) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate payment data based on currency
    if (selectedCurrency === 'INR' && !paymentData.utrNumber.trim()) {
      alert('Please enter your UTR Number');
      return;
    }
    
    if ((selectedCurrency === 'USD' || selectedCurrency === 'EURO') && !paymentData.paypalTransactionId.trim()) {
      alert('Please enter your PayPal Transaction ID');
      return;
    }
    
    // Show payment confirmation
    setPaymentSubmitted(true);
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (paymentSubmitted) {
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

        <div style={{ maxWidth: 800, width: '100%', margin: '-5rem auto 0', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              borderRadius: '50%',
              padding: 20,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              boxShadow: '0 8px 24px rgba(76,175,80,0.3)'
            }}>
              <CheckCircle size={40} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4CAF50', marginBottom: 16 }}>
              Payment Submitted Successfully!
            </h1>
            <p style={{ color: '#bdbdbd', fontSize: '1.1rem', marginBottom: 32 }}>
              Your service request will begin processing once we confirm your payment.<br />
              We'll send a confirmation email ASAP.
            </p>
          </div>

          <div style={{
            background: 'rgba(20,20,30,0.6)',
            borderRadius: '20px',
            border: '1px solid rgba(76,175,80,0.3)',
            padding: '2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(20px)'
          }}>
            <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              What happens next?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  background: 'rgba(76,175,80,0.2)', 
                  borderRadius: '50%', 
                  padding: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ color: '#4CAF50', fontWeight: 700 }}>1</span>
                </div>
                <span style={{ color: '#e7e7e7' }}>We verify your payment details</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  background: 'rgba(76,175,80,0.2)', 
                  borderRadius: '50%', 
                  padding: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ color: '#4CAF50', fontWeight: 700 }}>2</span>
                </div>
                <span style={{ color: '#e7e7e7' }}>Send confirmation email with project details</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  background: 'rgba(76,175,80,0.2)', 
                  borderRadius: '50%', 
                  padding: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ color: '#4CAF50', fontWeight: 700 }}>3</span>
                </div>
                <span style={{ color: '#e7e7e7' }}>Begin work on your project</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                clearCart();
                navigate('/');
              }}
              style={{
                background: 'linear-gradient(135deg, #a259f7, #7f42a7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(162,89,247,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                margin: '0 auto'
              }}
            >
              <CheckCircle size={20} />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Complete your order and choose your payment method
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: isMobile ? 32 : 48, 
          alignItems: 'start'
        }}>
          {/* Order Summary */}
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
                        lineHeight: 1.4
                      }}>
                        {item.name}
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
                textAlign: 'right'
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
            </div>
          </div>

          {/* Checkout Form */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 32
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
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

              {/* Payment Method Selection */}
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
                  <CreditCard size={26} />
                  Payment Method
                </h2>
                
                <div style={{ marginBottom: 32 }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 15, 
                    fontWeight: 600, 
                    color: '#e7e7e7', 
                    marginBottom: 16,
                    letterSpacing: '0.01em'
                  }}>Select Currency *</label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                    gap: 16 
                  }}>
                    {[
                      { value: 'INR', label: 'INR (Indian Rupee)', icon: '🇮🇳', color: '#4CAF50' },
                      { value: 'USD', label: 'USD (US Dollar)', icon: '🇺🇸', color: '#007bff' },
                      { value: 'EURO', label: 'EURO (Euro)', icon: '🇪🇺', color: '#ff6b6b' }
                    ].map((currency) => (
                      <label key={currency.value} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '16px 20px',
                        background: selectedCurrency === currency.value 
                          ? `linear-gradient(135deg, ${currency.color}20, rgba(162,89,247,0.1))` 
                          : 'rgba(30,30,40,0.6)',
                        border: `2px solid ${selectedCurrency === currency.value ? currency.color : 'rgba(162,89,247,0.3)'}`,
                        borderRadius: 16,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <input
                          type="radio"
                          name="currency"
                          value={currency.value}
                          checked={selectedCurrency === currency.value}
                          onChange={(e) => setSelectedCurrency(e.target.value)}
                          style={{ margin: 0, opacity: 0, position: 'absolute' }}
                        />
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          border: `2px solid ${selectedCurrency === currency.value ? currency.color : 'rgba(162,89,247,0.5)'}`,
                          background: selectedCurrency === currency.value ? currency.color : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          {selectedCurrency === currency.value && (
                            <div style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: 'white'
                            }} />
                          )}
                        </div>
                        <span style={{ fontSize: '1.4rem' }}>{currency.icon}</span>
                        <div>
                          <div style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: 600,
                            color: selectedCurrency === currency.value ? currency.color : '#e7e7e7',
                            marginBottom: 2
                          }}>
                            {currency.value}
                          </div>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            color: '#a7a7a7',
                            fontWeight: 500
                          }}>
                            {currency.label.split('(')[1].replace(')', '')}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* INR Payment - Google Pay */}
                {selectedCurrency === 'INR' && (
                  <div style={{
                    background: 'rgba(76,175,80,0.1)',
                    border: '1px solid rgba(76,175,80,0.3)',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 20
                  }}>
                    <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <QrCode size={20} />
                      Google Pay Payment
                    </h3>
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                      <div style={{
                        background: 'white',
                        borderRadius: 12,
                        padding: 20,
                        display: 'inline-block',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ color: '#333', fontSize: '0.9rem', marginBottom: 8 }}>Google Pay QR Code</div>
                        <div style={{
                          width: 200,
                          height: 200,
                          background: '#f0f0f0',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                          fontSize: '0.8rem',
                          border: '2px dashed #ccc'
                        }}>
                          QR Code Image<br />(Will be provided)
                        </div>
                      </div>
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: 15, 
                        fontWeight: 600, 
                        color: '#e7e7e7', 
                        marginBottom: 10,
                        letterSpacing: '0.01em'
                      }}>UTR Number *</label>
                      <input
                        type="text"
                        name="utrNumber"
                        value={paymentData.utrNumber}
                        onChange={handlePaymentDataChange}
                        required
                        placeholder="Enter UTR Number from your bank"
                        style={{
                          width: '100%',
                          background: 'rgba(24,24,24,0.8)',
                          color: '#e7e7e7',
                          padding: '14px 18px',
                          border: '2px solid #4CAF50',
                          borderRadius: 12,
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontWeight: 500
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#45a049';
                          e.target.style.boxShadow = '0 0 0 3px rgba(76,175,80,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#4CAF50';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* USD/EURO Payment - PayPal */}
                {(selectedCurrency === 'USD' || selectedCurrency === 'EURO') && (
                  <div style={{
                    background: 'rgba(0,123,255,0.1)',
                    border: '1px solid rgba(0,123,255,0.3)',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 20
                  }}>
                    <h3 style={{ color: '#007bff', fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CreditCard size={20} />
                      PayPal Payment
                    </h3>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ color: '#e7e7e7', marginBottom: 8 }}>Send payment to:</div>
                      <div style={{
                        background: 'rgba(0,123,255,0.2)',
                        border: '1px solid rgba(0,123,255,0.4)',
                        borderRadius: 8,
                        padding: 12,
                        color: '#007bff',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        textAlign: 'center'
                      }}>
                        kirtyrani105@gmail.com
                      </div>
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: 15, 
                        fontWeight: 600, 
                        color: '#e7e7e7', 
                        marginBottom: 10,
                        letterSpacing: '0.01em'
                      }}>PayPal Transaction ID *</label>
                      <input
                        type="text"
                        name="paypalTransactionId"
                        value={paymentData.paypalTransactionId}
                        onChange={handlePaymentDataChange}
                        required
                        placeholder="Enter PayPal Transaction ID"
                        style={{
                          width: '100%',
                          background: 'rgba(24,24,24,0.8)',
                          color: '#e7e7e7',
                          padding: '14px 18px',
                          border: '2px solid #007bff',
                          borderRadius: 12,
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontWeight: 500
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0056b3';
                          e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#007bff';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
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
                  <Shield size={26} />
                  Terms & Conditions
                </h2>
                
                <div style={{ marginBottom: 24 }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 16, 
                    cursor: 'pointer',
                    padding: '16px',
                    background: 'rgba(162,89,247,0.05)',
                    borderRadius: 12,
                    border: '1px solid rgba(162,89,247,0.1)',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${acceptedPolicies.privacy ? '#a259f7' : 'rgba(162,89,247,0.5)'}`,
                      background: acceptedPolicies.privacy ? '#a259f7' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginTop: 2
                    }}>
                      {acceptedPolicies.privacy && (
                        <CheckCircle size={12} color="white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={acceptedPolicies.privacy}
                      onChange={() => handlePolicyAccept('privacy')}
                      style={{ display: 'none' }}
                    />
                    <span style={{ 
                      color: '#e7e7e7', 
                      fontSize: '1rem', 
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}>
                      I agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</span> and understand how my personal information will be used.
                    </span>
                  </label>
                </div>
                
                <div style={{ marginBottom: 24 }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 16, 
                    cursor: 'pointer',
                    padding: '16px',
                    background: 'rgba(162,89,247,0.05)',
                    borderRadius: 12,
                    border: '1px solid rgba(162,89,247,0.1)',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${acceptedPolicies.terms ? '#a259f7' : 'rgba(162,89,247,0.5)'}`,
                      background: acceptedPolicies.terms ? '#a259f7' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginTop: 2
                    }}>
                      {acceptedPolicies.terms && (
                        <CheckCircle size={12} color="white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={acceptedPolicies.terms}
                      onChange={() => handlePolicyAccept('terms')}
                      style={{ display: 'none' }}
                    />
                    <span style={{ 
                      color: '#e7e7e7', 
                      fontSize: '1rem', 
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}>
                      I agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', fontWeight: 600 }}>Terms of Service</span> and understand the project scope and delivery timeline.
                    </span>
                  </label>
                </div>
                
                <div style={{ marginBottom: 24 }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 16, 
                    cursor: 'pointer',
                    padding: '16px',
                    background: 'rgba(162,89,247,0.05)',
                    borderRadius: 12,
                    border: '1px solid rgba(162,89,247,0.1)',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${acceptedPolicies.refund ? '#a259f7' : 'rgba(162,89,247,0.5)'}`,
                      background: acceptedPolicies.refund ? '#a259f7' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginTop: 2
                    }}>
                      {acceptedPolicies.refund && (
                        <CheckCircle size={12} color="white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={acceptedPolicies.refund}
                      onChange={() => handlePolicyAccept('refund')}
                      style={{ display: 'none' }}
                    />
                    <span style={{ 
                      color: '#e7e7e7', 
                      fontSize: '1rem', 
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}>
                      I understand the <span style={{ color: '#a259f7', textDecoration: 'underline', fontWeight: 600 }}>Refund Policy</span> and agree to the payment terms.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ 
                textAlign: 'center',
                padding: '2rem 0'
              }}>
                <button
                  type="submit"
                  style={{
                    background: allPoliciesAccepted 
                      ? 'linear-gradient(135deg, #a259f7, #7f42a7)' 
                      : 'rgba(162,89,247,0.2)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    padding: '1.5rem 4rem',
                    borderRadius: '16px',
                    boxShadow: allPoliciesAccepted 
                      ? '0 8px 32px rgba(162,89,247,0.4)' 
                      : '0 4px 16px rgba(0,0,0,0.2)',
                    border: 'none',
                    cursor: allPoliciesAccepted ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    margin: '0 auto',
                    opacity: allPoliciesAccepted ? 1 : 0.6,
                    letterSpacing: '0.01em',
                    minWidth: '280px'
                  }}
                  disabled={!allPoliciesAccepted}
                  onMouseEnter={(e) => {
                    if (allPoliciesAccepted) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(162,89,247,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (allPoliciesAccepted) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(162,89,247,0.4)';
                    }
                  }}
                >
                  <Lock size={22} />
                  {allPoliciesAccepted ? 'Complete Payment' : 'Accept Terms to Continue'}
                </button>
                {!allPoliciesAccepted && (
                  <p style={{
                    color: '#a7a7a7',
                    fontSize: '0.9rem',
                    marginTop: '12px',
                    fontWeight: 500
                  }}>
                    Please accept all terms and conditions to proceed
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;