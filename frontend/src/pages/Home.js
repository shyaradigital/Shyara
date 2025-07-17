import React, { useEffect, useRef } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [fadeIn, setFadeIn] = React.useState(false);
  const mainContentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If the session flag is set, redirect to /home-alt
    if (sessionStorage.getItem('hasVisitedHome')) {
      navigate('/home-alt', { replace: true });
    } else {
      // Set the flag for this session
      sessionStorage.setItem('hasVisitedHome', 'true');
    }
  }, [navigate]);

  // Fade in main content after mount
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 10);
  }, []);

  // Initialize AOS after fade-in
  useEffect(() => {
    if (fadeIn) {
      AOS.init({ once: true });
      AOS.refresh();
    }
  }, [fadeIn]);

  return (
    <>
      {/* Only one LoadingScreen, always present */}
      <LoadingScreen />
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
            <a href="/" className="logo-link"><h1 data-aos="fade-down" data-aos-duration="1500" className="logo">Shyara</h1></a>
            <nav className="navbar-center">
              <a data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200" href="/about">About</a>
              <a data-aos="fade-down" data-aos-duration="1000" data-aos-delay="400" href="/services">Services</a>
              <a data-aos="fade-down" data-aos-duration="1000" data-aos-delay="600" href="/portfolio">Portfolio</a>
              <a data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800" href="/contact">Contact Us</a>
            </nav>
            <a href="/client-login" data-aos="fade-down" data-aos-duration="1500" className="btn-signin">Sign In</a>
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
          <spline-viewer className="cbot" url="https://prod.spline.design/7Xyc-4Wtw5VI1PDk/scene.splinecode"></spline-viewer>
        </div>
        <footer className="site-footer">
          <div className="footer-content">
            <span>© Shyara Agency 2025. All rights reserved.</span>
            <div className="footer-socials">
              <a href="#" className="footer-icon" title="Instagram" target="_blank" rel="noopener">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="footer-icon" title="LinkedIn" target="_blank" rel="noopener">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><line x1="16" y1="8" x2="16" y2="16"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </a>
              <a href="#" className="footer-icon" title="WhatsApp" target="_blank" rel="noopener">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.67 20.13A10 10 0 1 0 3.87 21.67l2.2-.61a1 1 0 0 1 1.11.27l1.65 1.65a1 1 0 0 0 1.41 0l2.2-2.2a1 1 0 0 1 1.11-.27l2.2.61a10 10 0 0 0 5.92-1.54z"></path><path d="M8.5 13.5a6 6 0 0 1 7-7"></path></svg>
              </a>
              <a href="#" className="footer-icon" title="Email" target="_blank" rel="noopener">
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