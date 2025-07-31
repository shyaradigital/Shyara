import React, { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Home = () => {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [robotIn, setRobotIn] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const mainContentRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [splineReady, setSplineReady] = useState(false);
  const splineRef = useRef(null);
  const [splineError, setSplineError] = useState(false);

  // Only show loading screen on first load or hard reload
  useEffect(() => {
    // If this is the first load or a hard reload, show loading
    // If navigated via in-app navigation, skip loading
    const navType = window.performance && window.performance.getEntriesByType
      ? window.performance.getEntriesByType('navigation')[0]?.type
      : undefined;
    const isReload = navType === 'reload' || navType === 'navigate' || navType === 'navigate';
    // sessionStorage flag to ensure loading only on first load/reload
    if (!sessionStorage.getItem('shyaraLoaded')) {
      setShowLoading(true);
      sessionStorage.setItem('shyaraLoaded', 'true');
    } else {
      setShowLoading(false);
      setLoadingDone(true);
    }
  }, [location.key]);

  // Fade in main content after loading is done
  useEffect(() => {
    if (loadingDone) {
      setTimeout(() => {
        setFadeIn(true);
      }, 0); // Appear immediately after loading
    }
  }, [loadingDone]);

  // Trigger robot entrance at the same time as main content
  useEffect(() => {
    if (fadeIn) {
      setRobotIn(true);
    }
  }, [fadeIn]);

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
    <>
      {showLoading && !loadingDone && <LoadingScreen onFinish={() => { setLoadingDone(true); setShowLoading(false); }} />}
      <div
        id="main-content"
        className={`main-content home-entrance${fadeIn ? ' home-entrance-active' : ''}`}
        ref={mainContentRef}
        style={{
          opacity: fadeIn ? 1 : 0,
          pointerEvents: loadingDone ? 'auto' : 'none',
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
              className="content home-content-entrance" style={{
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)'
              }}>
              <h1>Creative Digital Solutions for Growing Brands.</h1>
              <p className="description">
                We combine data-driven strategy with creative storytelling to help
                your business stand out in a crowded digital world.
              </p>
              <div className="buttons">
                <div className="tag-box">
                  <a href="/portfolio" className="tag">View our work &gt;</a>
                </div>
                <a href="/services" className="btn-sign-in-main">Get Started &gt;</a>
              </div>
            </div>
          </main>
          {splineReady && !splineError && (
            <spline-viewer 
              ref={splineRef}
              className={`cbot robot-entrance${robotIn ? ' robot-entrance-active' : ''}`} 
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
              className={`cbot robot-entrance${robotIn ? ' robot-entrance-active' : ''}`}
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
          {/* LinkedIn Connect Button Overlapping Robot */}
          <a 
            href="https://www.linkedin.com/company/shyaradigital/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              top: '81%',
              right: '22%',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(135deg, #0077b5, #005885)',
              color: 'white',
              padding: '19px 45px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)',
              transition: 'all 0.3s ease',
              zIndex: 10,
              border: '2px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              opacity: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-50%) scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 119, 181, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 119, 181, 0.3)';
            }}
          >
            Connect on LinkedIn
          </a>
        </div>
        <footer className="site-footer">
          <div className="footer-content">
            <span>© Shyara Agency 2025. All rights reserved.</span>
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
               <a href="mailto:hello@shyaraagency.com" className="footer-icon" aria-label="Email">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>
               </a>
             </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home; 