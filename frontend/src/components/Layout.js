import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import TermsAndConditions from './TermsAndConditions';

const Layout = ({ children }) => {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop scroll handling (unchanged)
  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        setIsSticky(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  // Mobile scroll handling
  useEffect(() => {
    if (isMobile) {
      const handleMobileScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Always show navbar when at the top
        if (currentScrollY <= 10) {
          setShowMobileNav(true);
        } else {
          // Show navbar when scrolling up, hide when scrolling down
          const isScrollingUp = currentScrollY < lastScrollY;
          setShowMobileNav(isScrollingUp);
        }
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleMobileScroll);
      return () => window.removeEventListener('scroll', handleMobileScroll);
    }
  }, [isMobile, lastScrollY]);

  return (
    <div className="site-bg">
      <img className="image-gradient" src={process.env.PUBLIC_URL + '/gradient.png'} alt="" />
      <div className="layer-blur"></div>
      <div className="container">
        <header className={isSticky ? 'sticky-header' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0, minHeight: 80 }}>
          <Link to="/" className="logo-link"><h1 className="logo">Shyara</h1></Link>
          {!isMobile && (
            <nav className="navbar-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
              <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
              <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* Hide cart button on home page */}
            {location.pathname !== '/' && (
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
            )}
            <Link to="/client-login" className="btn-signin"><LogIn style={{ width: 20, height: 20, marginRight: 4 }} />Sign In</Link>
          </div>
        </header>
        <main className="site-main">{children}</main>
        
        {/* NEW MOBILE NAVBAR - Only visible on mobile */}
        {isMobile && (
          <nav className={`mobile-navbar ${!showMobileNav ? 'hidden' : ''}`}>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
            <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </nav>
        )}
        
        <footer className="site-footer">
          <div className="footer-content">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <span>© Shyara Digital 2025. All rights reserved.</span>
              <button
                onClick={() => setShowTerms(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a7a7a7',
                  fontSize: '0.9rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: '4px 0'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#a259f7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#a7a7a7';
                }}
              >
                Terms & Conditions
              </button>
            </div>
            <div className="footer-socials">
              <a href="https://www.instagram.com/shyaradigital?igsh=YXBsNXlkbDUzZnpn" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/shyaradigital/" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn">
                <img src={process.env.PUBLIC_URL + '/pics/linkedin.png'} alt="LinkedIn" style={{ width: '26px', height: '26px', filter: 'brightness(0) invert(0.8)' }} />
              </a>
              <a href="https://wa.me/919584661610" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="WhatsApp">
                <img src={process.env.PUBLIC_URL + '/pics/whatsapp.png'} alt="WhatsApp" style={{ width: '22px', height: '22px', filter: 'brightness(0) invert(0.8)' }} />
              </a>
              <a href="mailto:support@shyara.co.in" className="footer-icon" aria-label="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>
        </footer>
        
        {/* Terms and Conditions Modal */}
        <TermsAndConditions 
          isOpen={showTerms} 
          onClose={() => setShowTerms(false)} 
        />
      </div>
    </div>
  );
};

export default Layout;
