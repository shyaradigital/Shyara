import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, CheckCircle, ShoppingCart, ArrowLeft, X } from 'lucide-react';
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
  const [numCampaigns, setNumCampaigns] = useState(1);
  const pricePerCampaign = 1200;

  const cartItem = cart.find(item => item.id === 'ads-mgmt');
  const isInCart = !!cartItem;

  React.useEffect(() => {
    if (isOpen) {
      if (numCampaigns === 1 && cartItem) {
        setNumCampaigns(cartItem.quantity || 1);
      }
    }
  }, [isOpen]);

  const handleAdd = () => {
    const newItem = {
      id: 'ads-mgmt',
      name: `Ads Campaign Management (${numCampaigns} campaign${numCampaigns > 1 ? 's' : ''})`,
      price: numCampaigns * pricePerCampaign,
      quantity: numCampaigns,
      description: `Custom ads campaign management with ${numCampaigns} campaign${numCampaigns > 1 ? 's' : ''}`,
    };
    if (isInCart) {
      removeFromCart('ads-mgmt');
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
        maxWidth: 400,
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
        <h3 style={{ color: '#a259f7', fontSize: '1.3rem', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
          Customize Ads Campaigns
        </h3>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ color: '#e7e7e7', fontWeight: 600, fontSize: '1.1rem' }}>
              Campaigns: {numCampaigns}
            </label>
            <span style={{ color: '#a259f7', fontWeight: 700, fontSize: '1.1rem' }}>
              ₹{(numCampaigns * pricePerCampaign).toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            value={numCampaigns}
            onChange={(e) => setNumCampaigns(parseInt(e.target.value))}
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
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>1</span>
            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>14</span>
          </div>
          <button
            style={{
              marginTop: 12,
              background: isInCart && cartItem?.quantity === numCampaigns ? 'rgba(162,89,247,0.15)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isInCart && cartItem?.quantity === numCampaigns ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.8rem 1.5rem',
              boxShadow: isInCart && cartItem?.quantity === numCampaigns ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onClick={handleAdd}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            {isInCart && cartItem?.quantity === numCampaigns ? 'Already in Cart' : `Add ${numCampaigns} Campaign${numCampaigns > 1 ? 's' : ''} to Cart`}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdsCampaignManagementPage = () => {
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

  const isAdMgmtInCart = cart.some(item => item.id === 'ads-mgmt');
  const isVideoInCart = cart.some(item => item.id === 'ads-video');
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
          <Megaphone style={{ width: 38, height: 38, color: '#a259f7' }} />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259f7', margin: 0 }}><FancyText text="Ads Campaign Management" /></h1>
        </div>
        <p style={{ color: '#bdbdbd', fontSize: '1.08rem', marginBottom: 24, fontWeight: 400, lineHeight: 1.6 }}>
          Maximize your ROI with expertly managed ad campaigns across Meta, Google, and more. We handle everything from creative design to budget optimization and transparent reporting.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            'High-ROI ad campaigns on Meta, Google, and more',
            'Free ad creatives included',
            'Strategic budget management for best results',
            'Detailed performance reporting',
            'Video ad editing available',
            'Transparent, no-hidden-fee pricing',
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
              background: isAdMgmtInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isAdMgmtInCart ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.9rem 2.2rem',
              boxShadow: isAdMgmtInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: isAdMgmtInCart ? 'not-allowed' : 'pointer',
              opacity: isAdMgmtInCart ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
            }}
            onClick={handleShowSlider}
            disabled={isAdMgmtInCart}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} /> {isAdMgmtInCart ? 'Added' : 'Ad Management'}
          </button>
          <button
            style={{
              background: isVideoInCart ? 'rgba(162,89,247,0.10)' : 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: isVideoInCart ? '#a259f7' : '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              border: 'none',
              borderRadius: 999,
              padding: '0.9rem 2.2rem',
              boxShadow: isVideoInCart ? '0 2px 12px #0002' : '0 2px 12px #a259f7aa',
              cursor: isVideoInCart ? 'not-allowed' : 'pointer',
              opacity: isVideoInCart ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s, color 0.2s',
              outline: 'none',
            }}
            onClick={() => addToCart({ id: 'ads-video', name: 'Ad Video Editing', price: 2000 })}
            disabled={isVideoInCart}
          >
            <ShoppingCart style={{ width: 18, height: 18 }} /> {isVideoInCart ? 'Added' : 'Ad Video Editing'}
          </button>
        </div>
        <SliderModal
          isOpen={sliderModal.isOpen}
          onClose={handleCloseSlider}
          onAddToCart={handleAddToCart}
          cart={cart}
          removeFromCart={removeFromCart}
        />
        <blockquote style={{ borderLeft: '4px solid #a259f7', paddingLeft: 16, fontStyle: 'italic', color: '#bdbdbd', margin: '1.5rem 0', fontSize: '1.05rem', background: 'none', borderRadius: 0 }}>
          “Shyara’s ad management helped us reach new customers and grow our business!”<br />
          <span style={{ fontWeight: 600, color: '#a259f7' }}>— Rajeev M., E-commerce Owner</span>
        </blockquote>
      </div>
    </div>
  );
};

export default AdsCampaignManagementPage; 