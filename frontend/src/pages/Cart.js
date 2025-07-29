import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, PlusCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const BRAND_LOGO = (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
    <div style={{ borderRadius: '50%', background: 'linear-gradient(135deg, #a259f7, #7f42a7)', padding: 4, boxShadow: '0 2px 12px #a259f7aa' }}>
      <div style={{ background: '#181818', borderRadius: '50%', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <User style={{ width: 32, height: 32, color: '#a259f7' }} />
      </div>
    </div>
  </div>
);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    return sum + itemTotal;
  }, 0);

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(id, newQuantity);
  };

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '2rem 0 4rem 0', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ background: 'rgba(30,30,30,0.85)', border: '1.5px solid rgba(127,66,167,0.18)', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)', padding: '2.5rem 2rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          {BRAND_LOGO}
          <div style={{ marginTop: 32 }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#a259f7', marginBottom: '2rem', textAlign: 'center' }}>Your Cart</h1>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
                <p style={{ color: '#a7a7a7', fontSize: '1.1rem', marginBottom: '2rem' }}>Your cart is empty.</p>
                <button
                  style={{
                    background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    border: 'none',
                    borderRadius: 999,
                    padding: '0.9rem 2.2rem',
                    boxShadow: '0 2px 12px #a259f7aa',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    margin: '0 auto',
                  }}
                  onClick={() => navigate('/services')}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <PlusCircle style={{ width: 20, height: 20 }} /> Add Items
                </button>
              </div>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                  {cart.map(item => {
                    const quantity = item.quantity || 1;
                    const itemTotal = (item.price || 0) * quantity;
                    
                    return (
                    <li key={item.id} style={{
                      background: 'rgba(40,40,50,0.85)',
                      border: '1.5px solid rgba(127,66,167,0.10)',
                      borderRadius: 12,
                      padding: '1.2rem 1.5rem',
                      marginBottom: 18,
                      display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: 600, color: '#e7e7e7', fontSize: '1.05rem' }}>{item.name}</span>
                          </div>
                          <span style={{ color: '#a259f7', fontWeight: 700, fontSize: '1.1rem' }}>
                            {itemTotal === 0 ? 'Custom' : `₹${itemTotal.toLocaleString()}`}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ color: '#a7a7a7', fontSize: '0.9rem' }}>Quantity:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <button
                                style={{
                                  background: 'rgba(162,89,247,0.12)',
                                  color: '#a259f7',
                                  border: '1px solid #a259f7',
                                  borderRadius: 6,
                                  padding: '0.3rem 0.6rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'background 0.2s',
                                  display: 'flex',
                      alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onClick={() => handleQuantityChange(item.id, quantity, -1)}
                                disabled={quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span style={{ 
                                fontWeight: 600, 
                                color: '#e7e7e7', 
                                minWidth: '2rem', 
                                textAlign: 'center',
                                fontSize: '1rem'
                              }}>
                                {quantity}
                              </span>
                              <button
                                style={{
                        background: 'rgba(162,89,247,0.12)',
                        color: '#a259f7',
                        border: '1px solid #a259f7',
                                  borderRadius: 6,
                                  padding: '0.3rem 0.6rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'background 0.2s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onClick={() => handleQuantityChange(item.id, quantity, 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            {item.price > 0 ? (
                              <span style={{ color: '#a7a7a7', fontSize: '0.85rem' }}>
                                @ ₹{item.price.toLocaleString()}
                              </span>
                            ) : item.price === 0 && (
                              <span style={{ color: '#a7a7a7', fontSize: '0.85rem' }}>
                                @ Custom
                              </span>
                            )}
                          </div>
                          
                          <button 
                            style={{
                              background: 'rgba(255,255,255,0.12)',
                              color: '#ffffff',
                              border: '1px solid #ffffff',
                        borderRadius: 8,
                        padding: '0.4rem 1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                            }} 
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                    </li>
                    );
                  })}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                  <button
                    style={{
                      background: 'rgba(162,89,247,0.10)',
                      color: '#a259f7',
                      border: '1px solid #a259f7',
                      borderRadius: 999,
                      padding: '0.7rem 1.7rem',
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 2px 12px #0002',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => navigate('/services/personalized')}
                  >
                    <PlusCircle style={{ width: 20, height: 20 }} /> Add More Items
                  </button>
                </div>
                <div style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 700, color: '#a259f7', marginBottom: 24 }}>
                  Total: ₹{total.toLocaleString()}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    style={{
                      background: 'rgba(162,89,247,0.12)',
                      color: '#a259f7',
                      fontWeight: 700,
                      fontSize: '1.08rem',
                      padding: '0.9rem 2.5rem',
                      borderRadius: 999,
                      boxShadow: '0 2px 12px #0004',
                      border: '2px solid #a259f7',
                      marginTop: 8,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => navigate('/contact')}
                  >Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 