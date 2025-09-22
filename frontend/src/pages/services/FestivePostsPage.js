import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, ShoppingCart, ArrowLeft, X } from 'lucide-react';
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

const FestivePostsPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const isYearlyInCart = cart.some(item => item.id === 'festive-yearly');
  
  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0', fontFamily: 'inherit', position: 'relative', background: 'none' }}>
      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-back-button {
            left: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
          .mobile-pricing-container {
            padding-top: 50px !important;
          }
          .mobile-discount-info {
            font-size: 0.8rem !important;
            padding: 6px 10px !important;
          }
          .mobile-discount-detail {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
      
      {/* Fixed back button below navbar */}
      <button
        onClick={() => navigate('/services')}
        aria-label="Back to Services"
        className="mobile-back-button"
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
          <Sparkles style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Festive Post Designs" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400, lineHeight: 1.6 }}>
          Make every festival and special occasion count! Our festive post designs are crafted to boost your brand's reach and engagement with beautiful, on-brand visuals. Stand out in your audience's feed with creative, timely, and professional posts.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'Branded festival creatives for all major occasions',
            'Includes your logo and contact info for brand recall',
            'Ready-to-share, high-resolution designs',
            'Customizable for your business needs',
            'Delivered in advance for timely posting',
            'Boosts engagement and festive spirit',
          ].map((feature, idx) => (
            <FeatureItem key={idx}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </FeatureItem>
          ))}
        </ul>
        
        <div style={{ marginBottom: 18, marginTop: 32 }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem', marginBottom: 8 }}>Choose Your Package</div>
          <p style={{ color: '#a7a7a7', fontSize: '0.95rem', marginBottom: 24 }}>
            Select the festive posts package that best fits your needs.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 20, 
            width: '100%' 
          }}>
            
            {/* Yearly Package */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.08) 0%, rgba(30,30,40,0.15) 100%)',
              border: '2px solid rgba(162,89,247,0.3)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Best Value Badge - Mobile Responsive */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                color: 'white',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: '700',
                borderBottomLeftRadius: 12,
                zIndex: 2
              }}>
                BEST VALUE
              </div>
              
              {/* Pricing Display with Mobile Responsive Spacing */}
              <div className="mobile-pricing-container" style={{ 
                marginBottom: 16, 
                textAlign: 'center',
                paddingTop: '40px' // Add space for badge on mobile
              }}>
                <div style={{ 
                  color: '#a259f7', 
                  fontSize: '1.8rem', 
                  fontWeight: '700',
                  textShadow: '0 2px 4px rgba(162,89,247,0.3)',
                  marginBottom: '8px'
                }}>
                  ₹5,000
                </div>
                
                {/* Discount Information */}
                <div className="mobile-discount-info" style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '8px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ 
                    color: '#4CAF50', 
                    fontWeight: '600',
                    marginBottom: '2px'
                  }}>
                    ₹12,500 → 60% OFF → ₹5,000
                  </div>
                  <div className="mobile-discount-detail" style={{ 
                    color: '#a7a7a7', 
                    fontSize: '0.75rem'
                  }}>
                    Original: ₹12,500 | Discount: 60% | Final: ₹5,000
                  </div>
                </div>
                
                <div style={{ 
                  color: '#4CAF50', 
                  fontSize: '0.9rem', 
                  fontWeight: '600'
                }}>
                  Only / Year
                </div>
              </div>
              
              <div style={{ marginBottom: 12, flex: 1 }}>
                <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 8px 0' }}>Yearly Package</h3>
                <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                  All festive posts (contact for more details)
                </p>
              </div>
              <button
                style={{
                  background: isYearlyInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                  color: isYearlyInCart ? '#a259f7' : '#fff',
                  fontWeight: '700',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.8rem 1.5rem',
                  boxShadow: isYearlyInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                  cursor: isYearlyInCart ? 'not-allowed' : 'pointer',
                  opacity: isYearlyInCart ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onClick={() => addToCart({ id: 'festive-yearly', name: 'Festive Posts Yearly Package', price: 5000, description: 'All festive posts for the year (contact for more details)' })}
                disabled={isYearlyInCart}
              >
                <ShoppingCart style={{ width: 18, height: 18 }} /> {isYearlyInCart ? 'Added to Cart' : 'Add Yearly Package'}
              </button>
            </div>

            {/* Per Post Package */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Pricing Display */}
              <div style={{ marginBottom: 16, textAlign: 'center' }}>
                <div style={{ 
                  color: '#a259f7', 
                  fontSize: '1.8rem', 
                  fontWeight: '700',
                  textShadow: '0 2px 4px rgba(162,89,247,0.3)'
                }}>
                  ₹250
                </div>
                <div style={{ 
                  color: '#4CAF50', 
                  fontSize: '0.9rem', 
                  fontWeight: '600',
                  marginTop: 4
                }}>
                  Per Post
                </div>
              </div>
              
              <div style={{ marginBottom: 12, flex: 1 }}>
                <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 8px 0' }}>Per Post</h3>
                <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                  Individual festive post designs as needed
                </p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.8rem 1.5rem',
                  boxShadow: '0 2px 12px #a259f7aa',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onClick={() => navigate('/contact')}
              >
                Contact for Quote
              </button>
            </div>
          </div>
        </div>

        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          "Our festive posts always stand out and get shared widely. Shyara makes it effortless!"<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Priya S., Boutique Owner</span>
        </blockquote>
      </div>
    </div>
  );
};

export default FestivePostsPage; 