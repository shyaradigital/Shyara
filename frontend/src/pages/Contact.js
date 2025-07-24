import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  // --- Begin new implementation based on attached file, but keep inline styles ---
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (cart && cart.length > 0) {
      setShowCartAlert(true);
      return;
    }
    await actuallySubmit();
  };

  const actuallySubmit = async () => {
    setSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setSubmitting(false);
      setShowCartAlert(false);
    }, 800);
  };

  const handleProceed = async () => {
    await actuallySubmit();
  };

  const handleEditCart = () => {
    setShowCartAlert(false);
    navigate('/cart');
  };

  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', position: 'relative', background: 'none', fontFamily: 'inherit', padding: 0 }}>
      <div style={{ maxWidth: 900, width: '100%', margin: '2.5rem auto', padding: '0 1.5rem', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <AnimatedHeading text="Get in Touch" />
          <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '3rem', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, maxWidth: 1000, margin: '0 auto', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* Contact Info */}
          <div style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 400, background: 'rgba(30,30,30,0.97)', borderRadius: 20, padding: 32, boxShadow: '0 2px 16px #0006', border: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: 18 }}>Contact Information</h2>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
              <div style={{ background: 'rgba(127,66,167,0.15)', padding: 12, borderRadius: '50%' }}>
                <Mail style={{ width: 24, height: 24, color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}><FancyText text="Email" /></h3>
                <a href="mailto:contact@shyara.com" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.97rem', fontWeight: 400 }}>contact@shyara.com</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
              <div style={{ background: 'rgba(127,66,167,0.15)', padding: 12, borderRadius: '50%' }}>
                <Phone style={{ width: 24, height: 24, color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}><FancyText text="Phone" /></h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.97rem', fontWeight: 400 }}>+91 93050 44148</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ background: 'rgba(127,66,167,0.15)', padding: 12, borderRadius: '50%' }}>
                <MapPin style={{ width: 24, height: 24, color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}><FancyText text="Address" /></h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.97rem', fontWeight: 400 }}>123 Freelancer Lane, City, State, India</p>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div style={{ flex: '2 1 400px', minWidth: 320, maxWidth: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 16 }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Full Name</label>
                <input type="text" id="name" value={form.name} onChange={handleChange} style={{ width: '100%', background: '#181818', color: '#e0d7f7', padding: '14px 18px', border: '1.5px solid #7f42a7', borderRadius: 10, fontSize: '0.97rem', marginBottom: 0, outline: 'none', fontWeight: 400 }} />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Email Address</label>
                <input type="email" id="email" value={form.email} onChange={handleChange} style={{ width: '100%', background: '#181818', color: '#e0d7f7', padding: '14px 18px', border: '1.5px solid #7f42a7', borderRadius: 10, fontSize: '0.97rem', marginBottom: 0, outline: 'none', fontWeight: 400 }} />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Message</label>
                <textarea id="message" rows={5} value={form.message} onChange={handleChange} style={{ width: '100%', background: '#181818', color: '#e0d7f7', padding: '14px 18px', border: '1.5px solid #7f42a7', borderRadius: 10, fontSize: '0.97rem', outline: 'none', fontWeight: 400, resize: 'none' }}></textarea>
              </div>
              {error && <div style={{ color: '#ff4d4f', fontSize: 15 }}>{error}</div>}
              {success && <div style={{ color: '#4caf50', fontSize: 15 }}>Message sent successfully!</div>}
              <div>
                <button type="submit" style={{ background: '#a259f7', color: '#fff', fontWeight: 700, fontSize: 20, padding: '16px 2.5rem', border: 'none', borderRadius: 999, cursor: 'pointer', boxShadow: '0 2px 8px #a259f7aa', transition: 'background 0.2s', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            {/* Cart Alert Modal */}
            {showCartAlert && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(40,40,40,0.98)', borderRadius: 20, boxShadow: '0 4px 32px #000a', padding: 32, maxWidth: 400, width: '100%', border: '1px solid #222', animation: 'fade-in 0.3s' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e7e7e7', marginBottom: 16, textAlign: 'center' }}>Double checked the items in your cart?</h2>
                  <ul style={{ marginBottom: 24, maxHeight: 180, overflowY: 'auto', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: 0, listStyle: 'none' }}>
                    {cart.map(item => (
                      <li key={item.id} style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#e7e7e7' }}>
                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                        <span style={{ color: '#7f42a7', fontWeight: 700 }}> ₹{item.price?.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button style={{ flex: 1, background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 0', cursor: 'pointer' }} onClick={handleProceed} disabled={submitting}>
                      {submitting ? 'Sending...' : 'Proceed'}
                    </button>
                    <button style={{ flex: 1, background: '#181818', color: '#e7e7e7', fontWeight: 600, border: '1px solid #444', borderRadius: 8, padding: '10px 0', cursor: 'pointer' }} onClick={handleEditCart} disabled={submitting}>
                      Edit Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// If you want to use the CartContext from a real provider, wrap this page in your App with the real CartContext.Provider
export default ContactPage; 