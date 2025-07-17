import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, CheckCircle, ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

const FancyText = ({ text }) => <span style={{ color: '#a259f7', fontWeight: 700 }}>{text}</span>;

const WebsiteDevelopmentPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const isBasicInCart = cart.some(item => item.id === 'web-basic');
  const isEcomInCart = cart.some(item => item.id === 'web-ecom');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', padding: '2rem 0' }}>
      <div style={{ maxWidth: 600, width: '100%', background: 'rgba(30,30,30,0.85)', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)', padding: '2.5rem 2rem', margin: '0 auto', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(127,66,167,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Globe style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Web Development" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400 }}>
          Fast, responsive, and SEO-friendly websites for portfolios, businesses, and e-commerce. Custom designs with complete development support.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'Custom Website Design & Development',
            'Responsive & Mobile-Friendly',
            'SEO-Optimized for Google rankings',
            'E-commerce & Booking Systems',
            'Easy-to-use Content Management',
            'Ongoing Maintenance & Support',
          ].map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(40,40,50,0.85)', borderRadius: 12, padding: '0.8rem 1.2rem', fontSize: '1rem', color: '#e7e7e7', fontWeight: 500, boxShadow: '0 2px 8px #0002', transition: 'background 0.2s' }}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18 }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem' }}>Packages</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              style={{ flex: 1, minWidth: 140, background: isBasicInCart ? 'rgba(162,89,247,0.10)' : 'rgba(162,89,247,0.18)', color: '#a259f7', border: '1.5px solid #a259f7', borderRadius: 999, padding: '0.7rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 12px #0002', cursor: isBasicInCart ? 'not-allowed' : 'pointer', opacity: isBasicInCart ? 0.6 : 1, transition: 'background 0.2s, transform 0.2s', outline: 'none' }}
              onClick={() => addToCart({ id: 'web-basic', name: 'Web Development - Basic Site', price: 15000 })}
              disabled={isBasicInCart}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} />
              {isBasicInCart ? 'Added' : 'Basic Site ₹15,000+'}
            </button>
            <button
              style={{ flex: 1, minWidth: 140, background: isEcomInCart ? 'rgba(162,89,247,0.10)' : 'rgba(162,89,247,0.18)', color: '#a259f7', border: '1.5px solid #a259f7', borderRadius: 999, padding: '0.7rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 12px #0002', cursor: isEcomInCart ? 'not-allowed' : 'pointer', opacity: isEcomInCart ? 0.6 : 1, transition: 'background 0.2s, transform 0.2s', outline: 'none' }}
              onClick={() => addToCart({ id: 'web-ecom', name: 'Web Development - E-commerce/Booking', price: 45000 })}
              disabled={isEcomInCart}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} />
              {isEcomInCart ? 'Added' : 'E-commerce ₹45,000+'}
            </button>
          </div>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem' }}>
          “Our new website by Shyara’s developers is stunning and loads quickly on all devices. It’s already helping us attract more customers!”<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Sneha Mehta, Fitness Coach</span>
        </blockquote>
        <button
          style={{ width: '100%', background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 0', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
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