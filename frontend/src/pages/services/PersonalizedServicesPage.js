import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
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

const PersonalizedServicesPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const isConsultInCart = cart.some(item => item.id === 'personalized-consult');
  const isCustomInCart = cart.some(item => item.id === 'personalized-custom');

  // State for sliders
  const [numPosts, setNumPosts] = useState(2);
  const [numReels, setNumReels] = useState(1);
  const postsPricePer = 400; // Example price per post
  const reelsPricePer = 1500; // Example price per reel
  const postsCartId = 'custom-posts';
  const reelsCartId = 'custom-reels';
  const isPostsInCart = cart.some(item => item.id === postsCartId);
  const isReelsInCart = cart.some(item => item.id === reelsCartId);
  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0', fontFamily: 'inherit', position: 'relative', background: 'none' }}>
      {/* Sticky back button below navbar */}
      <button
        onClick={() => navigate('/services')}
        aria-label="Back to Services"
        style={{
          position: 'sticky',
          top: 16,
          left: 16,
          zIndex: 1000,
          background: 'rgba(30,30,30,0.85)',
          border: '2px solid var(--color-primary)',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px #0006',
          color: 'var(--color-primary)',
          cursor: 'pointer',
          marginBottom: 24,
          marginTop: 0,
          transition: 'background 0.2s, border 0.2s',
        }}
      >
        <ArrowLeft size={28} />
      </button>
      <div style={{ maxWidth: 900, width: '100%', margin: '2.5rem auto', padding: '0 1.5rem', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <UserCog style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Personalized Services" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400 }}>
          Have a unique idea or need a custom solution? Shyara offers personalized digital services tailored to your exact requirements. From one-on-one consulting to fully custom projects, our freelancer network is ready to help you stand out.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'Consulting Sessions: strategy, branding, marketing, tech',
            'Custom Projects: websites, apps, campaigns, and more',
            'Flexible Engagement: one-time or ongoing',
            'Direct Collaboration with top freelancers',
          ].map((feature, idx) => (
            <FeatureItem key={idx}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </FeatureItem>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18, marginTop: 32, alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem' }}>Options</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              style={{ flex: 1, minWidth: 140, background: isConsultInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)', color: '#a259f7', border: 'none', borderRadius: 999, padding: '0.7rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: isConsultInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa', cursor: isConsultInCart ? 'not-allowed' : 'pointer', opacity: isConsultInCart ? 0.6 : 1, transition: 'background 0.2s, transform 0.2s', outline: 'none' }}
              onClick={() => addToCart({ id: 'personalized-consult', name: 'Personalized Consulting Session', price: 2000 })}
              disabled={isConsultInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isConsultInCart ? 'Added' : 'Consulting ₹2,000/hr'}
            </button>
            <button
              style={{ flex: 1, minWidth: 140, background: isCustomInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)', color: '#a259f7', border: 'none', borderRadius: 999, padding: '0.7rem 1.2rem', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: isCustomInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa', cursor: isCustomInCart ? 'not-allowed' : 'pointer', opacity: isCustomInCart ? 0.6 : 1, transition: 'background 0.2s, transform 0.2s', outline: 'none' }}
              onClick={() => addToCart({ id: 'personalized-custom', name: 'Personalized Custom Project', price: 0 })}
              disabled={isCustomInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isCustomInCart ? 'Added' : 'Custom Project'}
            </button>
          </div>
        </div>
        {/* Custom Social Media Package Section (slider) remains open and modern */}
        <div style={{
          background: 'rgba(30,30,30,0.92)',
          border: '1.5px solid rgba(127,66,167,0.18)',
          borderRadius: 22,
          boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
          padding: '2.5rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 220,
          position: 'relative',
          overflow: 'hidden',
          margin: '2.5rem auto',
          width: '100%',
          maxWidth: 900,
          minWidth: 400,
        }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#a259f7', marginBottom: 10, letterSpacing: '-0.01em' }}>Your Custom Social Media Package</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.08rem', fontWeight: 400, marginBottom: 22 }}>
            Select the number of posts and reels you want for this month. Perfect for brands who want full control!
          </p>
          {/* Posts Slider */}
          <div style={{ marginBottom: 24, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#fff' }}>Posts per month</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem' }}>{numPosts}</span>
                <span style={{ fontWeight: 700, color: '#fff', background: '#a259f7', borderRadius: 8, padding: '2px 10px', marginLeft: 6, fontSize: '1.05rem' }}>₹{numPosts * postsPricePer}</span>
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={12}
              value={numPosts}
              onChange={e => setNumPosts(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a259f7', height: 6, marginTop: 8, marginBottom: 2 }}
            />
            <div style={{ color: '#bdbdbd', fontSize: '0.97rem', marginTop: 4 }}>₹{postsPricePer} per post</div>
            <button
              style={{
                marginTop: 10,
                background: isPostsInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: isPostsInCart ? '#a259f7' : '#fff',
                fontWeight: 700,
                fontSize: '1.05rem',
                border: 'none',
                borderRadius: 999,
                padding: '0.7rem 1.7rem',
                boxShadow: isPostsInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                cursor: isPostsInCart ? 'not-allowed' : 'pointer',
                opacity: isPostsInCart ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => addToCart({ id: postsCartId, name: `Custom Posts Package (${numPosts} posts)`, price: numPosts * postsPricePer, quantity: numPosts })}
              disabled={isPostsInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isPostsInCart ? 'Added' : `Add ${numPosts} Posts`}
            </button>
          </div>
          {/* Reels Slider */}
          <div style={{ marginBottom: 12, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#fff' }}>Reels per month</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem' }}>{numReels}</span>
                <span style={{ fontWeight: 700, color: '#fff', background: '#a259f7', borderRadius: 8, padding: '2px 10px', marginLeft: 6, fontSize: '1.05rem' }}>₹{numReels * reelsPricePer}</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              value={numReels}
              onChange={e => setNumReels(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a259f7', height: 6, marginTop: 8, marginBottom: 2 }}
            />
            <div style={{ color: '#bdbdbd', fontSize: '0.97rem', marginTop: 4 }}>₹{reelsPricePer} per reel</div>
            <button
              style={{
                marginTop: 10,
                background: isReelsInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: isReelsInCart ? '#a259f7' : '#fff',
                fontWeight: 700,
                fontSize: '1.05rem',
                border: 'none',
                borderRadius: 999,
                padding: '0.7rem 1.7rem',
                boxShadow: isReelsInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
                cursor: isReelsInCart ? 'not-allowed' : 'pointer',
                opacity: isReelsInCart ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => addToCart({ id: reelsCartId, name: `Custom Reels Package (${numReels} reels)`, price: numReels * reelsPricePer, quantity: numReels })}
              disabled={isReelsInCart}
            >
              <ShoppingCart style={{ width: 18, height: 18 }} /> {isReelsInCart ? 'Added' : `Add ${numReels} Reels`}
            </button>
          </div>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          “Shyara’s personalized approach helped us launch a campaign that was truly unique to our brand. The results exceeded our expectations!”<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Ritu Jain, Boutique Owner</span>
        </blockquote>
        <button
          style={{ width: '100%', background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 0', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s' }}
          onClick={() => navigate('/contact')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default PersonalizedServicesPage; 