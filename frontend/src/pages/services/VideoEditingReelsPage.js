import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, CheckCircle, ShoppingCart, ArrowLeft, X } from 'lucide-react';
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

const SliderModal = ({ isOpen, onClose, onAddToCart, cart, removeFromCart }) => {
  const [numPosts, setNumPosts] = useState(1);
  const [numReels, setNumReels] = useState(1);
  const postsPricePer = 2000;
  const reelsPricePer = 3500;

  const postsCartItem = cart.find(item => item.id === 'video-custom-posts');
  const reelsCartItem = cart.find(item => item.id === 'video-custom-reels');
  const isPostsInCart = !!postsCartItem;
  const isReelsInCart = !!reelsCartItem;

  React.useEffect(() => {
    if (isOpen) {
      if (numPosts === 1 && postsCartItem) {
        setNumPosts(postsCartItem.quantity || 1);
      }
      if (numReels === 1 && reelsCartItem) {
        setNumReels(reelsCartItem.quantity || 1);
      }
    }
  }, [isOpen]);

  const handleAddPosts = () => {
    const newItem = {
      id: 'video-custom-posts',
      name: `Video Posts (${numPosts} videos)`,
      price: numPosts * postsPricePer,
      quantity: numPosts,
      description: `Custom video editing package with ${numPosts} videos per month`,
    };
    if (isPostsInCart) {
      removeFromCart('video-custom-posts');
      onAddToCart(newItem);
    } else {
      onAddToCart(newItem);
    }
  };

  const handleAddReels = () => {
    const newItem = {
      id: 'video-custom-reels',
      name: `Video Reels (${numReels} reels)`,
      price: numReels * reelsPricePer,
      quantity: numReels,
      description: `Custom video reels editing package with ${numReels} reels per month`,
    };
    if (isReelsInCart) {
      removeFromCart('video-custom-reels');
      onAddToCart(newItem);
    } else {
      onAddToCart(newItem);
    }
  };

  if (!isOpen) return null;

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
      padding: '1rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.98) 100%)',
        borderRadius: 20,
        padding: '2rem',
        maxWidth: 500,
        width: '100%',
        border: '1px solid rgba(162,89,247,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(20px)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#a7a7a7',
            cursor: 'pointer',
            padding: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          <X size={20} />
        </button>
        <h3 style={{ color: '#a259f7', fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
          Customize Video & Reels Package
        </h3>
        {/* Posts Slider */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ color: '#e7e7e7', fontWeight: 600, fontSize: '1.1rem' }}>
              Videos per month: {numPosts}
            </label>
            <span style={{ color: '#a259f7', fontWeight: 700, fontSize: '1.1rem' }}>
              ₹{(numPosts * postsPricePer).toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={numPosts}
            onChange={(e) => setNumPosts(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: 8,
              borderRadius: 4,
              background: 'linear-gradient(90deg, #a259f7 0%, #7f42a7 100%)',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>1 video</span>
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>10 videos</span>
          </div>
          <button
            style={{
              marginTop: 12,
              background: isPostsInCart && postsCartItem?.quantity === numPosts ? 'rgba(162,89,247,0.15)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isPostsInCart && postsCartItem?.quantity === numPosts ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.8rem 1.5rem',
              boxShadow: isPostsInCart && postsCartItem?.quantity === numPosts ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onClick={handleAddPosts}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            {isPostsInCart && postsCartItem?.quantity === numPosts ? 'Already in Cart' : `Add ${numPosts} Videos to Cart`}
          </button>
        </div>
        {/* Reels Slider */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ color: '#e7e7e7', fontWeight: 600, fontSize: '1.1rem' }}>
              Reels per month: {numReels}
            </label>
            <span style={{ color: '#a259f7', fontWeight: 700, fontSize: '1.1rem' }}>
              ₹{(numReels * reelsPricePer).toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={numReels}
            onChange={(e) => setNumReels(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: 8,
              borderRadius: 4,
              background: 'linear-gradient(90deg, #a259f7 0%, #7f42a7 100%)',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>1 reel</span>
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>5 reels</span>
          </div>
          <button
            style={{
              marginTop: 12,
              background: isReelsInCart && reelsCartItem?.quantity === numReels ? 'rgba(162,89,247,0.15)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isReelsInCart && reelsCartItem?.quantity === numReels ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.8rem 1.5rem',
              boxShadow: isReelsInCart && reelsCartItem?.quantity === numReels ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onClick={handleAddReels}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            {isReelsInCart && reelsCartItem?.quantity === numReels ? 'Already in Cart' : `Add ${numReels} Reels to Cart`}
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoEditingReelsPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [sliderModal, setSliderModal] = useState({ isOpen: false });

  const handleShowSlider = () => {
    setSliderModal({ isOpen: true });
  };

  const handleCloseSlider = () => {
    setSliderModal({ isOpen: false });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const isMonthlyInCart = cart.some(item => item.id === 'video-monthly');
  const isYearlyInCart = cart.some(item => item.id === 'video-yearly');
  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0', fontFamily: 'inherit', position: 'relative', background: 'none' }}>
      {/* Sticky back button below navbar */}
      <button
        onClick={() => navigate('/services')}
        aria-label="Back to Services"
        style={{
          position: 'sticky',
          top: 16,
          left: 72,
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
          <Film style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Video Editing & Reels" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400, lineHeight: 1.6 }}>
          Grow your brand with high-performing reels and video content. You provide the raw footage, and we handle the rest.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            '20 Reels per Month: fresh, high-quality content',
            'Raw Footage Provided by You: we edit into compelling stories',
            'Free Social Media Account Handling',
            'Creative Captions with trending hashtags',
            'Consistent Branding for your visuals',
          ].map((feature, idx) => (
            <FeatureItem key={idx}>
              <CheckCircle style={{ color: '#a259f7', width: 20, height: 20, flexShrink: 0 }} /> {feature}
            </FeatureItem>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 18, marginTop: 32, alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 700, color: '#a259f7', fontSize: '1.15rem', marginBottom: 8 }}>Plans</div>
          <button
            style={{
              background: isMonthlyInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isMonthlyInCart ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.9rem 2.2rem',
              boxShadow: isMonthlyInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: isMonthlyInCart ? 'not-allowed' : 'pointer',
              opacity: isMonthlyInCart ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
            }}
            onClick={handleShowSlider}
            disabled={isMonthlyInCart}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} /> {isMonthlyInCart ? 'Added' : 'Customize & Add'}
          </button>
          <button
            style={{
              background: isYearlyInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isYearlyInCart ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.9rem 2.2rem',
              boxShadow: isYearlyInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: isYearlyInCart ? 'not-allowed' : 'pointer',
              opacity: isYearlyInCart ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
            }}
            onClick={() => addToCart({ id: 'video-yearly', name: 'Video Editing & Reels - Yearly', price: 285000 })}
            disabled={isYearlyInCart}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} /> {isYearlyInCart ? 'Added' : '₹2,85,000/year'}
          </button>
        </div>
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          “Since partnering with Shyara for reels and social media management, our follower count has grown 3x and our engagement skyrocketed!”<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Neha Sharma, Lifestyle Influencer</span>
        </blockquote>
        <button
          style={{ background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: 999, boxShadow: '0 2px 12px #a259f7aa', border: 'none', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={() => navigate('/contact')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Contact Us for a Free Consultation
        </button>
      </div>
      <SliderModal
        isOpen={sliderModal.isOpen}
        onClose={handleCloseSlider}
        onAddToCart={handleAddToCart}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default VideoEditingReelsPage; 