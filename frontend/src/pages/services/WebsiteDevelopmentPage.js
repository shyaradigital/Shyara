import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
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

const WebsiteDevelopmentPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const isBasicInCart = cart.some(item => item.id === 'web-basic');
  const isEcomInCart = cart.some(item => item.id === 'web-ecom');
  const isCustomInCart = cart.some(item => item.id === 'web-custom');
  
  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0', fontFamily: 'inherit', position: 'relative', background: 'none' }}>
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
      <div style={{ maxWidth: 900, width: '100%', margin: '2.5rem auto', padding: '0 1.5rem', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Globe style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Web Development" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400, lineHeight: 1.6 }}>
          Fast, responsive, and SEO-friendly websites for portfolios, businesses, and e-commerce. Custom designs with complete development support.
        </p>
        {/* Paid Features Section */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle style={{ color: '#a259f7', width: 20, height: 20 }} />
            What's Included in Your Website
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Custom Website Design & Development',
              'Responsive & Mobile-Friendly Design',
              'SEO-Optimized for Google rankings',
              'E-commerce & Booking Systems',
              'Easy-to-use Content Management',
              'Ongoing Maintenance & Support',
            ].map((feature, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(162,89,247,0.05)',
                border: '1px solid rgba(162,89,247,0.1)'
              }}>
                <CheckCircle style={{ color: '#a259f7', width: 18, height: 18, flexShrink: 0 }} />
                <span style={{ color: '#e7e7e7', fontSize: '0.95rem' }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Free Features Section */}
        <div style={{ 
          marginBottom: 32,
          background: 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(30,30,40,0.05) 100%)',
          border: '2px solid rgba(76,175,80,0.3)',
          borderRadius: 16,
          padding: 20,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
            color: 'white',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: 700,
            borderBottomLeftRadius: 12
          }}>
            FREE BONUSES
          </div>
          <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.2rem' }}>🎁</span>
            Free Extras You Get
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Free domain name for 1 year',
              'Free SSL certificate for security',
              'Free hosting setup and configuration',
              'Free basic SEO setup',
              'Free training on how to use your website',
            ].map((feature, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                background: 'rgba(76,175,80,0.1)',
                border: '1px solid rgba(76,175,80,0.2)'
              }}>
                <span style={{ fontSize: '1.1rem' }}>✨</span>
                <span style={{ color: '#e7e7e7', fontSize: '0.95rem', fontWeight: 500 }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 18, marginTop: 32 }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem', marginBottom: 8 }}>Choose Your Website Type</div>
          <p style={{ color: '#a7a7a7', fontSize: '0.95rem', marginBottom: 24 }}>
            Select one of the following website types. We'll develop exactly one website based on your choice.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 20, 
            width: '100%' 
          }}>
            
            {/* Basic Site Option */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              height: 'fit-content'
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
              ₹15,000+
            </div>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>Basic Site</h3>
              <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                Portfolio, business, or personal website with up to 5 pages
              </p>
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
              onClick={() => addToCart({ id: 'web-basic', name: 'Website Development - Basic Site', price: 15000, description: 'Portfolio, business, or personal website with up to 5 pages' })}
              disabled={isBasicInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isBasicInCart ? 'Added to Cart' : 'Add Basic Site'}
            </button>
          </div>

                      {/* E-commerce Option */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              height: 'fit-content'
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
              ₹45,000+
            </div>
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>E-commerce/Booking</h3>
              <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                Online store or booking system with payment integration
              </p>
            </div>
            <button
              style={{
                background: isEcomInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: isEcomInCart ? '#a259f7' : '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                borderRadius: 8,
                padding: '0.8rem 1.5rem',
                boxShadow: isEcomInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                cursor: isEcomInCart ? 'not-allowed' : 'pointer',
                opacity: isEcomInCart ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
                outline: 'none',
                width: '100%'
              }}
              onClick={() => addToCart({ id: 'web-ecom', name: 'Website Development - E-commerce/Booking', price: 45000, description: 'Online store or booking system with payment integration' })}
              disabled={isEcomInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isEcomInCart ? 'Added to Cart' : 'Add E-commerce Site'}
            </button>
          </div>

                      {/* Custom Option */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,89,247,0.05) 0%, rgba(30,30,40,0.1) 100%)',
              border: '2px solid rgba(162,89,247,0.2)',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              height: 'fit-content'
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
              <h3 style={{ color: '#a259f7', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>Custom Website</h3>
              <p style={{ color: '#bdbdbd', fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                Fully custom website with unique features and requirements
              </p>
            </div>
            <button
              style={{
                background: isCustomInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: isCustomInCart ? '#a259f7' : '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                borderRadius: 8,
                padding: '0.8rem 1.5rem',
                boxShadow: isCustomInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                cursor: isCustomInCart ? 'not-allowed' : 'pointer',
                opacity: isCustomInCart ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
                outline: 'none',
                width: '100%'
              }}
              onClick={() => addToCart({ id: 'web-custom', name: 'Website Development - Custom', price: 0, description: 'Fully custom website with unique features and requirements' })}
              disabled={isCustomInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isCustomInCart ? 'Added to Cart' : 'Get Custom Quote'}
            </button>
          </div>
          </div>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          "Our new website by Shyara's developers is stunning and loads quickly on all devices. It's already helping us attract more customers!"<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Sneha Mehta, Fitness Coach</span>
        </blockquote>
        <button
          style={{ background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={() => navigate('/contact')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Get a Free Quote
        </button>
      </div>
    </div>
  );
};

export default WebsiteDevelopmentPage; 