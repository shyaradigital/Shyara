import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-bg">
      <img className="image-gradient" src={process.env.PUBLIC_URL + '/gradient.png'} alt="" />
      <div className="layer-blur"></div>
      <div className="container">
        <header className={isSticky ? 'sticky-header' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0, minHeight: 80 }}>
          <Link to="/" className="logo-link"><h1 className="logo">Shyara</h1></Link>
          <nav className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
            <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link to="/cart" aria-label="Cart" style={{ position: 'relative', fontSize: 26, color: '#a259f7', textDecoration: 'none', marginRight: 8, display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <span role="img" aria-label="Cart">🛒</span>
              {cart && cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  minWidth: 20,
                  height: 20,
                  background: '#fff',
                  color: '#a259f7',
                  borderRadius: '50%',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px #0003',
                  border: '2px solid #a259f7',
                  zIndex: 2,
                  padding: '0 6px',
                  letterSpacing: 0.01,
                }}>{cart.length}</span>
              )}
            </Link>
            <Link to="/client-login" className="btn-signin"><LogIn style={{ width: 20, height: 20, marginRight: 4 }} />Sign In</Link>
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="footer-content">
            <span>© Shyara Agency 2025. All rights reserved.</span>
            <div className="footer-socials">
              {/* Social icons can be added here if needed */}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
