import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import FancyText from '../../components/FancyText';

const FeatureItem = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        borderRadius: 0,
        padding: '0.8rem 1.2rem',
        fontSize: '1rem',
        color: '#e7e7e7',
        fontWeight: 500,
        boxShadow: 'none',
        transition: hovered ? 'transform 0.38s cubic-bezier(.22,1.5,.36,1)' : 'transform 0.32s cubic-bezier(.4,2,.6,1)',
        transform: hovered ? 'scale(1.035)' : 'none',
        outline: 'none',
      }}
    >
      {/* Glass background on hover */}
      <div
        style={{
          position: 'absolute',
          top: '-8px',
          left: '-10px',
          right: '-10px',
          bottom: '-8px',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1.045)' : 'scale(0.98)',
          transition: 'opacity 0.32s cubic-bezier(.4,2,.6,1), transform 0.48s cubic-bezier(.22,1.5,.36,1)',
          background: 'linear-gradient(120deg, rgba(162,89,247,0.08) 0%, rgba(30,30,40,0.38) 100%)',
          borderRadius: 16,
          boxShadow: hovered ? '0 4px 16px 0 #a259f733, 0 1px 4px 0 #0002' : 'none',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1.2px solid',
          borderImage: 'linear-gradient(90deg, #a259f7 0%, #7f42a7 100%) 1',
          filter: hovered ? 'brightness(1.01)' : 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        {children}
      </span>
    </li>
  );
};

const AppDevelopmentPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const isBasicInCart = cart.some(item => item.id === 'app-basic');
  const isEnterpriseInCart = cart.some(item => item.id === 'app-enterprise');
  
  return (
    <div className="service-page-container" style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0', fontFamily: 'inherit', position: 'relative', background: 'none' }}>
      <style>
        {`
          @media (max-width: 768px) {
            .app-cards-grid {
              grid-template-columns: 1fr !important;
              max-width: 400px !important;
              gap: 16px !important;
            }
          }
        `}
      </style>
      {/* Fixed back button below navbar */}
      <button
        onClick={() => navigate('/services')}
        aria-label="Back to Services"
        style={{
          position: 'fixed',
          top: 100,
          left: 80,
          zIndex: 1000,
          background: 'rgba(30,30,30,0.95)',
          border: '2px solid var(--color-primary)',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowLeft size={28} />
      </button>
      <div style={{ maxWidth: 900, width: '100%', margin: '-5rem auto 0', padding: '0 1.5rem', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Smartphone style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="App Development" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400, lineHeight: 1.6 }}>
          Mobile apps for Android & iOS built by our skilled freelance developers. We handle UI/UX design, development, and deployment.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'Cross-Platform Development: Android, iOS, hybrid',
            'Custom UI/UX Design for engagement',
            'Feature-Based Pricing: pay for only what you need',
            'MVP & Startup Support: quick to market',
            'Ongoing Maintenance & Updates',
          ].map((feature, idx) => (
            <FeatureItem key={idx}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </FeatureItem>
          ))}
        </ul>
        <div style={{ marginBottom: 18, marginTop: 32 }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem', marginBottom: 8 }}>Choose Your App Type</div>
          <p style={{ color: '#a7a7a7', fontSize: '0.95rem', marginBottom: 24 }}>
            Select one of the following app types. We'll develop exactly one app based on your choice.
          </p>
          
          <div className="app-cards-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 24, 
            width: '100%',
            alignItems: 'stretch',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            
            {/* Basic App Option */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'linear-gradient(45deg, #a259f7, #7f42a7)',
                color: 'white',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderBottomLeftRadius: 12
              }}>
                ₹30,000+
              </div>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>Basic App</h3>
                <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                  Simple app with core features, perfect for MVP or basic functionality
                </p>
                
                {/* Example Items */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: '#a7a7a7', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>Examples:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                      'Business Profile App',
                      'Portfolio App',
                      'Restaurant Menu App',
                      'Event App',
                      'Educational Notes/Content App',
                      'Booking Enquiry App',
                      'Community App',
                      'News/Blog App'
                    ].map((example, idx) => (
                      <li key={idx} style={{ 
                        color: '#bdbdbd', 
                        fontSize: '0.8rem',
                        padding: '2px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{ color: '#a259f7', fontSize: '0.7rem' }}>•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                style={{
                  background: isBasicInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                  color: isBasicInCart ? '#a259f7' : '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.8rem 1.5rem',
                  boxShadow: isBasicInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                  cursor: isBasicInCart ? 'not-allowed' : 'pointer',
                  opacity: isBasicInCart ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onClick={() => addToCart({ id: 'app-basic', name: 'App Development - Basic App', price: 30000, description: 'Simple app with core features, perfect for MVP or basic functionality' })}
                disabled={isBasicInCart}
              >
                <ShoppingCart style={{ width: 18, height: 18 }} /> {isBasicInCart ? 'Added to Cart' : 'Add Basic App'}
              </button>
            </div>

            {/* Custom App Option */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'linear-gradient(45deg, #a259f7, #7f42a7)',
                color: 'white',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderBottomLeftRadius: 12
              }}>
                Custom Quote
              </div>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>Custom App</h3>
                <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                  Complex app with advanced features, integrations, and custom requirements
                </p>
              </div>
              <button
                style={{
                  background: isEnterpriseInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                  color: isEnterpriseInCart ? '#a259f7' : '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.8rem 1.5rem',
                  boxShadow: isEnterpriseInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                  cursor: isEnterpriseInCart ? 'not-allowed' : 'pointer',
                  opacity: isEnterpriseInCart ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onClick={() => addToCart({ id: 'app-enterprise', name: 'App Development - Custom/Enterprise', price: 0, description: 'Complex app with advanced features, integrations, and custom requirements', isCustomQuote: true, priceText: 'Custom Quote' })}
                disabled={isEnterpriseInCart}
              >
                <ShoppingCart style={{ width: 18, height: 18 }} /> {isEnterpriseInCart ? 'Added to Cart' : 'Get Custom Quote'}
              </button>
            </div>
          </div>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          "Shyara's freelance app developers brought our idea to reality ahead of schedule, with a sleek design and smooth performance."<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Manish Gupta, Tech Startup Founder</span>
        </blockquote>
        <button
          style={{ background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={() => navigate('/contact')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Request a Free Consultation
        </button>
      </div>
    </div>
  );
};

export default AppDevelopmentPage; 