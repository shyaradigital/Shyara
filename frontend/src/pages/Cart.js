import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, PlusCircle } from 'lucide-react';
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
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '2rem 0 4rem 0', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ background: 'rgba(30,30,30,0.85)', border: '1.5px solid rgba(127,66,167,0.18)', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)', padding: '2.5rem 2rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          {BRAND_LOGO}
          <div style={{ marginTop: 32 }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#a259f7', marginBottom: '2rem', textAlign: 'center' }}>Your Cart</h1>
            {cart.length === 0 ? (
              <p style={{ color: '#a7a7a7', textAlign: 'center', fontSize: '1.1rem' }}>Your cart is empty.</p>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                  {cart.map(item => (
                    <li key={item.id} style={{
                      background: 'rgba(40,40,50,0.85)',
                      border: '1.5px solid rgba(127,66,167,0.10)',
                      borderRadius: 12,
                      padding: '1.2rem 1.5rem',
                      marginBottom: 18,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{ fontWeight: 600, color: '#e7e7e7' }}>{item.name}</span>
                      <span style={{ color: '#a259f7', fontWeight: 700 }}>₹{item.price?.toLocaleString()}</span>
                      <button style={{
                        marginLeft: 16,
                        background: 'rgba(162,89,247,0.12)',
                        color: '#a259f7',
                        border: '1px solid #a259f7',
                        borderRadius: 8,
                        padding: '0.4rem 1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }} onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                  ))}
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
                    onClick={() => navigate('/add-items')}
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