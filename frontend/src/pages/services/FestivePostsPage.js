import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

const FancyText = ({ text }) => <span style={{ color: '#a259f7', fontWeight: 700 }}>{text}</span>;

const FestivePostsPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const isInCart = cart.some(item => item.id === 'festive-posts');
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', padding: '2rem 0' }}>
      <div style={{ maxWidth: 540, width: '100%', background: 'rgba(30,30,30,0.85)', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)', padding: '2.5rem 2rem', margin: '0 auto', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(127,66,167,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <Sparkles style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Festive Post Designs" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400 }}>
          Celebrate every festival and special occasion with <b>custom-branded creatives</b> designed for your business. Stay relevant, boost engagement, and keep your brand top-of-mind all year round!
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'Ready-to-share creatives for all major Indian festivals',
            'Your logo and contact info included',
            'High-quality formats for all platforms',
            'Quick turnaround before each festival',
          ].map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(40,40,50,0.85)', borderRadius: 12, padding: '0.8rem 1.2rem', fontSize: '1rem', color: '#e7e7e7', fontWeight: 500, boxShadow: '0 2px 8px #0002', transition: 'background 0.2s' }}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18 }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem', marginBottom: 8 }}>Subscription</div>
          <button
            style={{ width: '100%', background: isInCart ? 'rgba(162,89,247,0.10)' : 'rgba(162,89,247,0.18)', color: '#a259f7', border: '1.5px solid #a259f7', borderRadius: 999, padding: '0.9rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 2px 12px #0002', cursor: isInCart ? 'not-allowed' : 'pointer', opacity: isInCart ? 0.6 : 1, transition: 'background 0.2s, transform 0.2s', outline: 'none' }}
            onClick={() => addToCart({ id: 'festive-posts', name: 'Festive Posts Subscription', price: 1000 })}
            disabled={isInCart}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            {isInCart ? 'Added' : '₹1,000/mo'}
          </button>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem' }}>
          “Our festive posts always stand out and get shared widely. Shyara makes it effortless!”<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Priya S., Boutique Owner</span>
        </blockquote>
        <button
          style={{ width: '100%', background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 0', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
          onClick={() => navigate('/contact')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default FestivePostsPage; 