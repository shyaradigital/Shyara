import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const SERVICES = [
  {
    title: 'Social Media Management',
    desc: 'Consistent, creative, and keyword-rich content for all major platforms. Posts, reels, and engagement.',
    plans: [
      { id: 'smm-monthly', name: 'Monthly Plan', price: 10500, label: '₹10,500/month (30% off)' },
      { id: 'smm-yearly', name: 'Yearly Plan', price: 180000, label: '₹1,80,000/year (35% off)' },
    ],
  },
  {
    title: 'Festive Post Designs',
    desc: 'Branded festival creatives to boost reach on special occasions. Includes your logo and contact info.',
    plans: [
      { id: 'festive-monthly', name: 'Monthly Plan', price: 1000, label: '₹1,000/month' },
      { id: 'festive-yearly', name: 'Yearly Plan', price: 12000, label: '₹12,000/year' },
    ],
  },
  {
    title: 'Ads Campaign Management',
    desc: 'High-ROI ads across Meta, Google, and more. Free ad creatives, budget management, and reporting.',
    plans: [
      { id: 'ads-mgmt', name: 'Ad Management Service', price: 0, label: '15% of Ad Spend' },
      { id: 'ads-video', name: 'Ad Video Editing', price: 2000, label: '₹2,000 per video' },
    ],
  },
  {
    title: 'Web Development',
    desc: 'Fast, responsive, and SEO-friendly websites for portfolios, businesses, and e-commerce.',
    plans: [
      { id: 'web-basic', name: 'Basic Portfolio/Business Site', price: 15000, label: 'Starting at ₹15,000' },
      { id: 'web-ecom', name: 'E-commerce/Booking Platform', price: 45000, label: 'Starting at ₹45,000' },
    ],
  },
  {
    title: 'App Development',
    desc: 'Mobile apps for Android & iOS. UI/UX design, development, and deployment.',
    plans: [
      { id: 'app-basic', name: 'Basic App', price: 30000, label: 'Starting at ₹30,000' },
      { id: 'app-enterprise', name: 'Enterprise/Advanced App', price: 0, label: 'Custom pricing' },
    ],
  },
  {
    title: 'Video & Reels Editing',
    desc: 'High-performing reels and video content. You provide the raw footage, we handle the rest.',
    plans: [
      { id: 'video-monthly', name: 'Monthly Plan', price: 25000, label: '₹25,000/month' },
      { id: 'video-yearly', name: 'Yearly Plan', price: 285000, label: '₹2,85,000/year' },
    ],
  },
  {
    title: 'Personalized Services',
    desc: 'Custom solutions, consulting, and unique projects tailored to your needs.',
    plans: [
      { id: 'personalized-consult', name: 'Consulting Session', price: 2000, label: '₹2,000/hour' },
      { id: 'personalized-custom', name: 'Custom Project', price: 0, label: 'Custom pricing' },
    ],
  },
];

const AddItemsPage = () => {
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '0 0 2.5rem 0', fontFamily: 'inherit', position: 'relative' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1rem', marginTop: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <button
          style={{
            background: 'rgba(255,255,255,0.13)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#a259f7',
            borderRadius: '50%',
            padding: 12,
            boxShadow: '0 4px 16px 0 rgba(80,80,120,0.18)',
            border: '1.5px solid #a259f7',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: 24,
            alignSelf: 'flex-start',
            marginLeft: 0,
          }}
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <ArrowLeft style={{ width: 24, height: 24 }} />
        </button>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', marginBottom: 8 }}>Add More Services</h1>
          <p style={{ fontSize: '1.08rem', fontWeight: 400, color: '#a7a7a7', marginBottom: '2.5rem' }}>
            Browse and add more services to your cart. Choose what you need!
          </p>
        </div>
        {SERVICES.map(service => (
          <div key={service.title} style={{
            background: 'rgba(30,30,30,0.92)',
            border: '1.5px solid rgba(127,66,167,0.18)',
            borderRadius: 22,
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
            padding: '2.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minHeight: 220,
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
            width: '100%',
            maxWidth: 700,
          }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.35rem', color: '#a259f7', marginBottom: 10, letterSpacing: '-0.01em' }}>{service.title}</h2>
            <p style={{ color: '#bdbdbd', fontSize: '1.08rem', fontWeight: 400, marginBottom: 22 }}>{service.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              {service.plans.map(plan => {
                const inCart = cart.some(item => item.id === plan.id);
                return (
                  <div key={plan.id} style={{
                    background: 'rgba(40,40,50,0.92)',
                    border: '1.5px solid rgba(127,66,167,0.10)',
                    borderRadius: 12,
                    padding: '1.1rem 1.5rem',
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#e7e7e7', fontSize: '1.08rem' }}>{plan.name}</div>
                      <div style={{ color: '#a7a7a7', fontSize: '1.01rem' }}>{plan.label}</div>
                    </div>
                    <button
                      style={{
                        background: inCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                        color: inCart ? '#a259f7' : '#fff',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        border: 'none',
                        borderRadius: 999,
                        padding: '0.7rem 1.7rem',
                        boxShadow: inCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                        cursor: inCart ? 'not-allowed' : 'pointer',
                        opacity: inCart ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onClick={() => addToCart({ id: plan.id, name: `${service.title} - ${plan.name}`, price: plan.price })}
                      disabled={inCart}
                    >
                      <ShoppingCart style={{ width: 18, height: 18 }} /> {inCart ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddItemsPage; 