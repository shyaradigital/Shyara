import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const HomeNoLoading = () => {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const mainContentRef = useRef(null);
  const splineRef = useRef(null);

  // Fade in main content after mount
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 10);
  }, []);

  // Initialize Spline viewer when container is ready
  useEffect(() => {
    if (fadeIn && mainContentRef.current) {
      // Wait for the container to have proper dimensions
      const timer = setTimeout(() => {
        setSplineReady(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  // Handle Spline viewer errors
  useEffect(() => {
    if (splineRef.current) {
      const handleError = () => {
        setSplineError(true);
      };
      
      splineRef.current.addEventListener('error', handleError);
      return () => {
        if (splineRef.current) {
          splineRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [splineReady]);

  // Initialize AOS after fade-in
  useEffect(() => {
    if (fadeIn) {
      AOS.init({ once: true });
      AOS.refresh();
    }
  }, [fadeIn]);

  return (
    <div
      id="main-content"
      className={`main-content${fadeIn ? ' fade-in' : ''}`}
      ref={mainContentRef}
      style={{
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <img className="image-gradient" src={process.env.PUBLIC_URL + '/gradient.png'} alt="" />
      <div className="layer-blur"></div>
      <div className="container">
        <header>
          <Link to="/" className="logo-link"><h1 data-aos="fade-down" data-aos-duration="1500" className="logo">Shyara</h1></Link>
          <nav className="navbar-center">
            <Link data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200" to="/about">About</Link>
            <Link data-aos="fade-down" data-aos-duration="1000" data-aos-delay="400" to="/services">Services</Link>
            <Link data-aos="fade-down" data-aos-duration="1000" data-aos-delay="600" to="/portfolio">Portfolio</Link>
            <Link data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800" to="/contact">Contact Us</Link>
          </nav>
          <Link to="/client-login" data-aos="fade-down" data-aos-duration="1500" className="btn-signin"><LogIn style={{ width: 20, height: 20, marginRight: 4 }} />Sign In</Link>
        </header>
        <main>
          <div data-aos="fade-right"
            data-aos-easing="ease-in-back"
            data-aos-delay="500"
            data-aos-offset="0"
            data-aos-duration="1900"
            className="content">
            <h1>Creative Digital Solutions for Growing Brands.</h1>
            <p className="description">
              We combine data-driven strategy with creative storytelling to help
              your business stand out in a crowded digital world.
            </p>
            <div className="buttons">
              <div className="tag-box">
                <a href="/portfolio" className="tag">View our work &gt;</a>
              </div>
              <a href="/contact" className="btn-sign-in-main">Get Started &gt;</a>
            </div>
          </div>
        </main>
        {splineReady && !splineError && (
          <spline-viewer 
            ref={splineRef}
            className="cbot" 
            url="https://prod.spline.design/7Xyc-4Wtw5VI1PDk/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              minWidth: '1px',
              minHeight: '1px'
            }}
          />
        )}
        {splineError && (
          <div 
            className="cbot"
            style={{
              position: 'absolute',
              top: '0%',
              right: '-20%',
              width: '100%',
              height: '100vh',
              minWidth: '1px',
              minHeight: '1px',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '20px'
            }}
          >
            <div style={{ 
              textAlign: 'center', 
              color: '#666',
              fontSize: '14px',
              opacity: 0.7
            }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🤖</div>
              <div>3D Experience</div>
            </div>
          </div>
        )}
      </div>
      <footer className="site-footer">
        <div className="footer-content">
          <span>© Shyara Agency 2025. All rights reserved.</span>
          <div className="footer-socials">
            <button type="button" className="footer-icon" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
            </button>
            <button type="button" className="footer-icon" aria-label="LinkedIn" target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><line x1="16" y1="8" x2="16" y2="16"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
            <button type="button" className="footer-icon" aria-label="WhatsApp" target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.67 20.13A10 10 0 1 0 3.87 21.67l2.2-.61a1 1 0 0 1 1.11.27l1.65 1.65a1 1 0 0 0 1.41 0l2.2-2.2a1 1 0 0 1 1.11-.27l2.2.61a10 10 0 0 0 5.92-1.54z"></path><path d="M8.5 13.5a6 6 0 0 1 7-7"></path></svg>
            </button>
            <button type="button" className="footer-icon" aria-label="Email" target="_blank" rel="noopener">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeNoLoading; 