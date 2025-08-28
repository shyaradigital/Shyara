import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, CheckCircle, Shield, Lock, CreditCard, User, Mail, Phone, MapPin, FileText, Eye, EyeOff } from 'lucide-react';

/*
  IMPORTANT: This is a demo checkout page with simulated payment processing.
  
  To implement actual Razorpay integration:
  
  1. Install Razorpay: npm install razorpay
  2. Add Razorpay script to public/index.html:
     <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  
  3. In handleSubmit function, replace the simulation with:
     - API call to your backend to create Razorpay order
     - Razorpay checkout options configuration
     - Redirect to Razorpay payment gateway
  
  4. Handle payment success/failure callbacks
  
  Example Razorpay integration:
  const options = {
    key: 'YOUR_RAZORPAY_KEY',
    amount: total * 100, // Amount in paise
    currency: 'INR',
    name: 'Shyara Digital Solutions',
    description: 'Service Payment',
    order_id: orderId, // From your backend
    handler: function (response) {
      // Handle success
      clearCart();
      navigate('/success');
    },
    prefill: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone
    },
    theme: {
      color: '#a259f7'
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
*/

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
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
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

  const total = cart ? cart.reduce((sum, item) => sum + (item.price || 0), 0) : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
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
        !formData.address || !formData.city || !formData.state || !formData.zipCode ||
        !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would integrate with Razorpay
    console.log('Proceeding to payment with:', formData);
    
    // For now, simulate payment processing with a loading state
    // In production, you would:
    // 1. Send form data to your backend
    // 2. Backend creates Razorpay order
    // 3. Redirect to Razorpay payment page
    // 4. Handle payment success/failure callbacks
    
    // Simulate payment processing
    const loadingMessage = document.createElement('div');
    loadingMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(30, 30, 40, 0.95);
      backdropFilter: blur(20px);
      border: 1px solid rgba(162,89,247,0.3);
      border-radius: 16px;
      padding: 2rem;
      color: #ffffff;
      text-align: center;
      z-index: 1001;
      font-size: 1.1rem;
    `;
    loadingMessage.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <div style="width: 40px; height: 40px; border: 3px solid rgba(162,89,247,0.3); border-top: 3px solid #a259f7; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      </div>
      <div>Processing Payment...</div>
      <div style="color: #bdbdbd; font-size: 0.9rem; margin-top: 0.5rem;">Please wait while we redirect you to the payment gateway</div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loadingMessage);
    
    // Simulate payment gateway redirect (replace with actual Razorpay integration)
    setTimeout(() => {
      document.body.removeChild(loadingMessage);
      
      // In production, this would be the actual Razorpay payment flow
      // For demo purposes, we'll show a success message
      alert('Payment successful! Thank you for your order.');
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page" style={{
      minHeight: '100vh',
      paddingTop: '140px',
      paddingBottom: '60px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '-240px'
    }}>
             {/* Background Elements */}
       <div style={{
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         background: 'radial-gradient(circle at 20% 80%, rgba(127, 66, 167, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(162, 89, 247, 0.1) 0%, transparent 50%)',
         pointerEvents: 'none',
         zIndex: 1
       }} />
      
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          
          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a259f7 0%, #7f42a7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              1
            </div>
            <div style={{
              width: '60px',
              height: '3px',
              background: 'rgba(162,89,247,0.3)',
              borderRadius: '2px'
            }} />
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(162,89,247,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              2
            </div>
            <div style={{
              width: '60px',
              height: '3px',
              background: 'rgba(162,89,247,0.3)',
              borderRadius: '2px'
            }} />
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(162,89,247,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              3
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            color: '#bdbdbd'
          }}>
            <span style={{ color: '#a259f7', fontWeight: '600' }}>Cart Review</span>
            <span>Checkout</span>
            <span>Payment</span>
          </div>
          <button
            onClick={() => navigate('/cart')}
            style={{
              background: 'rgba(162,89,247,0.1)',
              color: '#a259f7',
              border: '1px solid #a259f7',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '2rem'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(162,89,247,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(162,89,247,0.1)'}
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #a259f7 0%, #7f42a7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontFamily: 'Davigo, system-ui, sans-serif'
          }}>
            Secure Checkout
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#bdbdbd',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Complete your purchase with our secure payment system powered by Razorpay
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Main Checkout Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <User size={24} color="#a259f7" />
                  Personal Information
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#a259f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(162,89,247,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <MapPin size={24} color="#a259f7" />
                  Billing Address
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CreditCard size={24} color="#a259f7" />
                  Payment Information
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>CVV *</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required
                        style={{
                          width: '100%',
                          padding: '1rem',
                          paddingRight: '3rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={e => e.target.style.borderColor = '#a259f7'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#bdbdbd',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#bdbdbd',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={e => e.target.style.borderColor = '#a259f7'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                </div>
              </div>

              {/* Policies Section */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <FileText size={24} color="#a259f7" />
                  Policies & Agreements
                </h3>
                
                <div style={{
                  background: 'rgba(162,89,247,0.05)',
                  border: '1px solid rgba(162,89,247,0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={acceptedPolicies.privacy}
                        onChange={() => handlePolicyAccept('privacy')}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#a259f7'
                        }}
                      />
                      I have read and agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowPolicies('privacy')}>Privacy Policy</span>
                    </label>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={acceptedPolicies.terms}
                        onChange={() => handlePolicyAccept('terms')}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#a259f7'
                        }}
                      />
                      I have read and agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowPolicies('terms')}>Terms & Conditions</span>
                    </label>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={acceptedPolicies.refund}
                        onChange={() => handlePolicyAccept('refund')}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#a259f7'
                        }}
                      />
                      I have read and agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowPolicies('refund')}>Refund & Cancellation Policy</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!allPoliciesAccepted}
                style={{
                  width: '100%',
                  background: allPoliciesAccepted ? 'linear-gradient(135deg, #a259f7 0%, #7f42a7 100%)' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1.2rem 2rem',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: allPoliciesAccepted ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: allPoliciesAccepted ? 1 : 0.5
                }}
                onMouseEnter={e => {
                  if (allPoliciesAccepted) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(162,89,247,0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (allPoliciesAccepted) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <Lock size={24} />
                {allPoliciesAccepted ? 'Complete Secure Payment' : 'Please Accept All Policies'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            height: 'fit-content',
            position: 'sticky',
            top: '60px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Order Summary
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              {cart.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: index < cart.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <div>
                    <div style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      color: '#bdbdbd',
                      fontSize: '0.9rem'
                    }}>
                      {item.description}
                    </div>
                  </div>
                  <div style={{
                    color: '#a259f7',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    ₹{item.price ? item.price.toLocaleString() : 'Custom'}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              borderTop: '2px solid rgba(162,89,247,0.3)',
              paddingTop: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '700' }}>Total</span>
                <span style={{ color: '#a259f7', fontSize: '1.8rem', fontWeight: '700' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(162,89,247,0.1)',
              border: '1px solid rgba(162,89,247,0.2)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '0.5rem'
              }}>
                <Shield size={20} color="#a259f7" />
                <span style={{ color: '#a259f7', fontWeight: '600', fontSize: '0.9rem' }}>
                  Secure Payment
                </span>
              </div>
              <p style={{
                color: '#bdbdbd',
                fontSize: '0.8rem',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Your payment is protected by industry-standard SSL encryption and processed securely through Razorpay.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#bdbdbd',
                fontSize: '0.8rem'
              }}>
                <Lock size={14} />
                SSL Secured
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#bdbdbd',
                fontSize: '0.8rem'
              }}>
                <Shield size={14} />
                PCI Compliant
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#bdbdbd',
                fontSize: '0.8rem'
              }}>
                <CheckCircle size={14} />
                Razorpay Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Modal */}
      {showPolicies && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: 'rgba(30, 30, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowPolicies(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ×
            </button>
            
            {showPolicies === 'privacy' && (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#a259f7',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Privacy Policy
                </h2>
                <div style={{ color: '#e7e7e7', lineHeight: '1.8', fontSize: '1rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    At Shyara Digital Solutions, we are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website and make payments for our services.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Information We Collect</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    When you use our website and make a payment, we collect certain personal information such as your name, email address, phone number, billing address, and payment details. This information is used exclusively for the purpose of processing your payment, fulfilling your order/service, and providing customer support.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>How We Use Your Information</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    We use the collected information to process your payments, deliver our services, communicate with you about your order, and provide ongoing customer support. We do not sell, trade, or otherwise transfer your personal information to third parties, except as required to process payments through our secure payment gateway partner, Razorpay.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Payment Security</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    All transactions on this website are processed securely through Razorpay, a PCI DSS compliant payment gateway. Razorpay uses industry-standard encryption and security measures to keep your payment information safe and secure.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Contact Information</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    If you have any questions about this Privacy Policy or our data practices, you can contact us at our official business email or phone number listed on our website.
                  </p>
                </div>
              </div>
            )}
            
            {showPolicies === 'terms' && (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#a259f7',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Terms & Conditions
                </h2>
                <div style={{ color: '#e7e7e7', lineHeight: '1.8', fontSize: '1rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    Welcome to Shyara Digital Solutions. By using our website and services, you agree to be bound by the following terms and conditions. Please read them carefully before proceeding with your purchase.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Service Agreement</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    By purchasing our services, you acknowledge that you have read and understood the service descriptions, pricing, and delivery timelines. You agree to provide accurate and complete information for payment processing and service delivery.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Payment Terms</h3>
                  <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>All payments are processed securely via Razorpay payment gateway</li>
                    <li style={{ marginBottom: '0.5rem' }}>Payment must be completed in full before service delivery begins</li>
                    <li style={{ marginBottom: '0.5rem' }}>We reserve the right to refuse service or cancel transactions in case of fraudulent activity or misuse</li>
                  </ul>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Intellectual Property</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    All work delivered remains our intellectual property until full payment is received. Upon completion of payment, you will receive full rights to the delivered work as specified in your service agreement.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Jurisdiction</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    These terms and conditions are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in our business location.
                  </p>
                </div>
              </div>
            )}
            
            {showPolicies === 'refund' && (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#a259f7',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Refund & Cancellation Policy
                </h2>
                <div style={{ color: '#e7e7e7', lineHeight: '1.8', fontSize: '1rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    At Shyara Digital Solutions, we strive to deliver exceptional service quality and customer satisfaction. However, we understand that circumstances may arise where refunds or cancellations are necessary.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Payment Cancellation</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    Once a payment is successfully processed and confirmed, it cannot be cancelled. We begin work immediately upon payment confirmation to ensure timely delivery of your services.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Refund Eligibility</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    Refunds will only be issued in the following circumstances:
                  </p>
                  <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Duplicate payments or payment processing errors</li>
                    <li style={{ marginBottom: '0.5rem' }}>Service cancellation before work has commenced (subject to review)</li>
                    <li style={{ marginBottom: '0.5rem' }}>Failure to deliver services within agreed timelines (subject to terms)</li>
                  </ul>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Refund Process</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    Refund requests must be submitted within 7 days of the original transaction. Approved refunds will be processed within 7-10 working days, and the amount will be credited back to your original payment method through Razorpay.
                  </p>
                  
                  <h3 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem' }}>Contact for Refunds</h3>
                  <p style={{ marginBottom: '1rem' }}>
                    For any issues regarding refunds or to submit a refund request, please contact us through our official business channels. We will review each request individually and respond within 2 working days.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
