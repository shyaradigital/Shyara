import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock, QrCode, CreditCard } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [paymentData, setPaymentData] = useState({
    utrNumber: '',
    paypalTransactionId: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get data from checkout page
  const { formData, cart, fixedPriceTotal, hasCustomQuoteItems } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!formData || !cart) {
      navigate('/checkout');
    }
  }, [formData, cart, navigate]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompletePayment = () => {
    // Validate payment data based on currency
    if (selectedCurrency === 'INR' && !paymentData.utrNumber.trim()) {
      alert('Please enter your UTR Number');
      return;
    }
    
    if ((selectedCurrency === 'USD' || selectedCurrency === 'EURO') && !paymentData.paypalTransactionId.trim()) {
      alert('Please enter your PayPal Transaction ID');
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    
    // Show confirmation popup
    setShowConfirmation(true);
  };

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Clear the saved form data from localStorage
    localStorage.removeItem('checkoutFormData');
    navigate('/');
  };

  if (showConfirmation) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'rgba(0,0,0,0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(20,20,30,0.95)',
          borderRadius: '24px',
          border: '1px solid rgba(162,89,247,0.3)',
          padding: '3rem',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            borderRadius: '50%',
            padding: 20,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            boxShadow: '0 8px 24px rgba(76,175,80,0.3)'
          }}>
            <CheckCircle size={40} color="white" />
          </div>
          
          <h1 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 800, 
            color: '#4CAF50', 
            marginBottom: 16,
            letterSpacing: '-0.01em'
          }}>
            Thank you! :)
          </h1>
          
          <p style={{ 
            color: '#e7e7e7', 
            fontSize: '1.1rem', 
            marginBottom: 24,
            lineHeight: 1.6
          }}>
            We'll get in touch within 24 hours.<br />
            Your service request will begin processing once we confirm your payment.
          </p>
          
          <button
            onClick={handleCloseConfirmation}
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
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 24px rgba(162,89,247,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(162,89,247,0.4)';
            }}
          >
            <CheckCircle size={20} />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '0', fontFamily: 'inherit', background: 'transparent' }}>
      {/* Back Button */}
      <button
        onClick={handleBackToCheckout}
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
        Back to Checkout
      </button>

      <div style={{ maxWidth: 1000, width: '100%', margin: '-5rem auto 0', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#a259f7', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Payment
          </h1>
          <p style={{ color: '#bdbdbd', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Choose your payment method and complete your order
          </p>
        </div>

        <div style={{ 
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* Payment Method - Centered */}
          <div style={{ maxWidth: 600, width: '100%' }}>
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
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 24
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
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 24
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

              {/* Terms and Conditions */}
              <div style={{
                background: 'rgba(162,89,247,0.05)',
                border: '1px solid rgba(162,89,247,0.1)',
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 16, 
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: `2px solid ${acceptedTerms ? '#a259f7' : 'rgba(162,89,247,0.5)'}`,
                    background: acceptedTerms ? '#a259f7' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    marginTop: 2
                  }}>
                    {acceptedTerms && (
                      <CheckCircle size={12} color="white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <span style={{ 
                    color: '#e7e7e7', 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    I agree to the <span style={{ color: '#a259f7', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</span> and understand the payment terms.
                  </span>
                </label>
              </div>

              {/* Complete Payment Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleCompletePayment}
                  style={{
                    background: acceptedTerms 
                      ? 'linear-gradient(135deg, #a259f7, #7f42a7)' 
                      : 'rgba(162,89,247,0.2)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    padding: '1.5rem 3rem',
                    borderRadius: '16px',
                    boxShadow: acceptedTerms 
                      ? '0 8px 32px rgba(162,89,247,0.4)' 
                      : '0 4px 16px rgba(0,0,0,0.2)',
                    border: 'none',
                    cursor: acceptedTerms ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    margin: '0 auto',
                    letterSpacing: '0.01em',
                    minWidth: '280px',
                    opacity: acceptedTerms ? 1 : 0.6
                  }}
                  disabled={!acceptedTerms}
                  onMouseEnter={(e) => {
                    if (acceptedTerms) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(162,89,247,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (acceptedTerms) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(162,89,247,0.4)';
                    }
                  }}
                >
                  <Lock size={22} />
                  Complete Payment
                </button>
                {!acceptedTerms && (
                  <p style={{
                    color: '#a7a7a7',
                    fontSize: '0.9rem',
                    marginTop: '12px',
                    fontWeight: 500
                  }}>
                    Please accept the terms to proceed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
