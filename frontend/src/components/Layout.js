import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="site-bg">
      <img className="image-gradient" src={process.env.PUBLIC_URL + '/gradient.png'} alt="" />
      <div className="layer-blur"></div>
      <div className="container">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0, minHeight: 80 }}>
          <Link to="/home-alt" className="logo-link"><h1 className="logo">Shyara</h1></Link>
          <nav className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
            <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link to="/cart" aria-label="Cart" style={{ fontSize: 26, color: '#a259f7', textDecoration: 'none', marginRight: 8, display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
              <span role="img" aria-label="Cart">🛒</span>
            </Link>
            <Link to="/client-login" className="btn-signin">Sign In</Link>
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
