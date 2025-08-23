import React, { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn, Sparkles, Target, Users, Award, Zap, TrendingUp } from 'lucide-react';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';

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
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const [robotFadeIn, setRobotFadeIn] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Trigger robot entrance immediately after loading (only for desktop)
  useEffect(() => {
    if (loadingDone && !isMobile) {
      // Start loading robot immediately after main content loads
      setRobotIn(true);
    }
  }, [loadingDone, isMobile]);

  // Initialize Spline viewer immediately when container is ready (only for desktop)
  useEffect(() => {
    if (loadingDone && mainContentRef.current && !isMobile) {
      // Load robot immediately without delay
      setSplineReady(true);
      // Start robot fade-in animation immediately after loading
      setTimeout(() => {
        setRobotFadeIn(true);
      }, 100); // Small delay to ensure smooth transition
    }
  }, [loadingDone, isMobile]);

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

  // Initialize AOS after fade-in with enhanced settings
  useEffect(() => {
    if (fadeIn) {
      AOS.init({ 
        once: true,
        duration: 1200,
        easing: 'ease-out-cubic',
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom'
      });
      AOS.refresh();
    }
  }, [fadeIn]);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [fadeIn]);

  // Handle scroll arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
        `}
      </style>
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

          <main>
            <div 
              data-aos="slide-right"
              data-aos-easing="ease-out-back"
              data-aos-delay="500"
              data-aos-offset="0"
              data-aos-duration="1900"
              className="content home-content-entrance" 
              style={{
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
                marginTop: '-20rem',
                paddingTop: '2rem'
              }}
            >
              <h1>Creative Digital Solutions for Growing Brands.</h1>
              <p className="description">
                We combine data-driven strategy with creative storytelling to help
                your business stand out in a crowded digital world.
              </p>
              <div className="buttons">
                <div className="tag-box">
                  <Link to="/portfolio" className="tag">View our work &gt;</Link>
                </div>
                <Link to="/services" className="btn-sign-in-main">Get Started &gt;</Link>
              </div>
            </div>
                    </main>
           {/* Scroll Down Arrow - Only visible at top */}
           {showScrollArrow && (
             <div 
               className="scroll-arrow"
               style={{
                 position: 'absolute',
                 bottom: '10rem',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 zIndex: 5,
                 animation: 'bounce 2s infinite',
                 cursor: 'pointer',
                 opacity: fadeIn ? 1 : 0,
                 transition: 'opacity 0.8s ease'
               }}
               onClick={() => {
                 window.scrollTo({
                   top: window.innerHeight,
                   behavior: 'smooth'
                 });
               }}
             >
               <svg 
                 width="32" 
                 height="32" 
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="2" 
                 strokeLinecap="round" 
                 strokeLinejoin="round"
                 style={{
                   color: 'rgba(255, 255, 255, 0.8)',
                   filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                 }}
               >
                 <path d="M7 13l5 5 5-5"/>
                 <path d="M7 6l5 5 5-5"/>
               </svg>
             </div>
           )}
           
           {/* Subtitle text below the arrow */}
           <div 
             style={{
               position: 'absolute',
               bottom: '6rem',
               left: '50%',
               transform: 'translateX(-50%)',
               zIndex: 5,
               textAlign: 'center',
               opacity: fadeIn ? 1 : 0,
               transition: 'opacity 0.8s ease'
             }}
           >
             <p style={{
               color: 'rgba(255, 255, 255, 0.7)',
               fontSize: '1.5rem',
               fontWeight: '400',
               margin: 0,
               letterSpacing: '0.5px',
               textShadow: '0 2px 4px rgba(0,0,0,0.5)'
             }}>
               Discover how we transform brands through creative digital solutions
             </p>
           </div>
           
                      {/* Desktop 3D Robot - Loads behind Shyara animation */}
           {!isMobile && splineReady && !splineError && (
             <spline-viewer 
               ref={splineRef}
               className="cbot robot-quick-fade" 
               url="https://prod.spline.design/7Xyc-4Wtw5VI1PDk/scene.splinecode"
               style={{
                 width: '100%',
                 height: '100%',
                 minWidth: '1px',
                 minHeight: '1px',
                 zIndex: 0, // Ensure it's behind the main content
                 marginTop: '-15rem', // Move robot up with the hero content
                 opacity: robotFadeIn ? 1 : 0,
                 transform: robotFadeIn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                 transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
               }}
             />
           )}
           {!isMobile && splineError && (
             <div 
               className="cbot robot-quick-fade"
               style={{
                 position: 'absolute',
                 top: '0%',
                 right: '-20%',
                 width: '100%',
                 height: '100vh',
                 minWidth: '1px',
                 minHeight: '1px',
                 zIndex: 0, // Ensure it's behind the main content
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 background: 'rgba(0,0,0,0.1)',
                 borderRadius: '20px',
                 marginTop: '-15rem', // Move robot up with the hero content
                 opacity: robotFadeIn ? 1 : 0,
                 transform: robotFadeIn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                 transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
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

          {/* Mobile Alternative Content */}
          {isMobile && (
            <div className="mobile-home-features" style={{
              position: 'absolute',
              top: '60%',
              right: '5%',
              width: '90%',
              maxWidth: '400px',
              zIndex: 2,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              animationDelay: '0.3s'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                background: 'rgba(30, 30, 40, 0.8)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(127, 66, 167, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'rgba(127, 66, 167, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(127, 66, 167, 0.2)'
                }}>
                  <Sparkles style={{ width: 24, height: 24, color: '#7f42a7', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Creative Design</span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'rgba(127, 66, 167, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(127, 66, 167, 0.2)'
                }}>
                  <Target style={{ width: 24, height: 24, color: '#7f42a7', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Strategic Growth</span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'rgba(127, 66, 167, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(127, 66, 167, 0.2)'
                }}>
                  <Users style={{ width: 24, height: 24, color: '#7f42a7', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Client Focus</span>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'rgba(127, 66, 167, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(127, 66, 167, 0.2)'
                }}>
                  <Award style={{ width: 24, height: 24, color: '#7f42a7', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Quality Results</span>
                </div>
              </div>
            </div>
          )}

                     {/* LinkedIn Connect Button Overlapping Robot (Desktop only) */}
          {!isMobile && (
            <a 
              href="https://www.linkedin.com/company/shyaradigital/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-connect"
              style={{
                position: 'absolute',
                top: '50%',
                right: '22%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                color: 'transparent',
                padding: '26px 100px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: 'none',
                zIndex: 10,
                border: 'none',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                opacity: fadeIn ? 1 : 0
              }}

                          >
              </a>
          )}
        </div>

        {/* Additional Scrollable Sections with Enhanced Animations */}
        
        {/* Section 1 - Brand Value Proposition */}
        <section className="scroll-section value-proposition">
          <div className="container">
            <div className="section-content" 
              data-aos="fade-in" 
              data-aos-duration="1200"
              data-aos-easing="ease-out"
            >
              <h2 className="section-headline" 
                data-aos="fade-in" 
                data-aos-delay="200" 
                data-aos-duration="1000"
                data-aos-easing="ease-out"
              >
                Your Brand Deserves More Than Just "Online Presence"
              </h2>
              <p className="section-description" 
                data-aos="fade-in" 
                data-aos-delay="400" 
                data-aos-duration="1000"
                data-aos-easing="ease-out"
              >
                The digital space is crowded and fast-moving—generic templates won't help you stand out.
              </p>
                             <div className="value-points-grid">
                                 <div className="value-card" 
                  data-aos="flip-left" 
                  data-aos-delay="600" 
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-back"
                >
                  <div className="value-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="tickGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="1"/>
                        </linearGradient>
                      </defs>
                      <path d="M20,6 L9,17 L4,12" stroke="url(#tickGradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Creative Content</h3>
                  <p>Content that captures attention and drives engagement</p>
                </div>
                <div className="value-card" 
                  data-aos="flip-left" 
                  data-aos-delay="800" 
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-back"
                >
                  <div className="value-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="tickGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="1"/>
                        </linearGradient>
                      </defs>
                      <path d="M20,6 L9,17 L4,12" stroke="url(#tickGradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Converting Campaigns</h3>
                  <p>Campaigns that turn followers into loyal customers</p>
                </div>
                <div className="value-card" 
                  data-aos="flip-left" 
                  data-aos-delay="1000" 
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-back"
                >
                  <div className="value-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="tickGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="1"/>
                        </linearGradient>
                      </defs>
                      <path d="M20,6 L9,17 L4,12" stroke="url(#tickGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Growth Solutions</h3>
                  <p>Web & app solutions that scale with your business</p>
                </div>
               </div>
              <div className="value-promise" 
                data-aos="zoom-in" 
                data-aos-delay="1200" 
                data-aos-duration="1000"
                data-aos-easing="ease-out-back"
              >
                <strong>Shyara gives you the expertise of an agency with the flexibility of a freelance team, delivering real results without inflated costs.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Services */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '3rem', 
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            <FancyText text="Your Brand, Supercharged – All Under One Roof" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: 1000,
            margin: '0 auto'
          }}>
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="300" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Social Media Management</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>From posts to reels, we handle it all.</p>
            </div>
            
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="400" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Festive Post Designs</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Ready-to-share festival creatives for instant visibility.</p>
            </div>
            
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="500" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Ads Campaign Management</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>High-ROI campaigns with free creatives, for your targeted Audience.</p>
            </div>
            
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="600" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Web Development</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Fast, responsive, SEO-ready sites.</p>
            </div>
            
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="700" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>App Development</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Custom Android & iOS apps.</p>
            </div>
            
            <div className="service-card" 
              data-aos="zoom-in-up" 
              data-aos-delay="800" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Video & Reels Editing</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Professional edits for viral content.</p>
            </div>
          </div>
        </div>

        {/* Section 3 - Why Choose Shyara */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '3rem', 
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            <FancyText text="The Shyara Advantage" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: 1000,
            margin: '0 auto',
            marginBottom: '3rem'
          }}>
            <div className="advantage-card" 
              data-aos="flip-up" 
              data-aos-delay="300" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="advantage-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Users size={40} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Freelancer-Driven</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Agile, creative, and handpicked experts.</p>
            </div>
            
            <div className="advantage-card" 
              data-aos="flip-up" 
              data-aos-delay="500" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="advantage-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Zap size={40} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Modular & Scalable</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Pay only for what you need.</p>
            </div>
            
            <div className="advantage-card" 
              data-aos="flip-up" 
              data-aos-delay="700" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="advantage-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <TrendingUp size={40} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>Results-Obsessed</h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>Focused on sales, engagement, and measurable growth.</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            maxWidth: 700,
            margin: '0 auto'
          }}>
            <div className="stat-item" 
              data-aos="bounce-in" 
              data-aos-delay="1100" 
              data-aos-duration="800"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 16,
                padding: '1rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <span className="stat-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </span>
              <span className="stat-text" style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--color-text-primary)'
              }}>100+ Brands Served</span>
            </div>
            
            <div className="stat-item" 
              data-aos="bounce-in" 
              data-aos-delay="1300" 
              data-aos-duration="800"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 16,
                padding: '1rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <span className="stat-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </span>
              <span className="stat-text" style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--color-text-primary)'
              }}>Avg. 35% Engagement Boost</span>
            </div>
            
            <div className="stat-item" 
              data-aos="bounce-in" 
              data-aos-delay="1500" 
              data-aos-duration="800"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 16,
                padding: '1rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <span className="stat-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              <span className="stat-text" style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--color-text-primary)'
              }}>4.9/5 Client Rating</span>
            </div>
          </div>
        </div>

        {/* Section 4 - Client Testimonials */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '3rem', 
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            <FancyText text="What Our Clients Say" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem',
            maxWidth: 1000,
            margin: '0 auto'
          }}>
            <div className="testimonial-card" 
              data-aos="flip-right" 
              data-aos-delay="300" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="testimonial-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p style={{ 
                color: 'var(--color-text-primary)', 
                lineHeight: 1.6,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>"Shyara's ads turned our slow season into our busiest quarter yet!"</p>
              <div className="testimonial-author" style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>— Priya S., Startup Founder</div>
            </div>
            
            <div className="testimonial-card" 
              data-aos="flip-left" 
              data-aos-delay="500" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'rgba(30,30,30,0.55)',
                borderRadius: 24,
                padding: '2rem',
                border: '1.5px solid rgba(127,66,167,0.18)',
                boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                textAlign: 'center'
              }}
            >
              <div className="testimonial-icon" style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p style={{ 
                color: 'var(--color-text-primary)', 
                lineHeight: 1.6,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>"Their festive posts made our brand instantly recognizable in local markets."</p>
              <div className="testimonial-author" style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>— Rahul M., Business Owner</div>
            </div>
          </div>
        </div>

        {/* Section 5 - Limited Time Offer */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <div style={{
            background: 'rgba(30,30,30,0.55)',
            borderRadius: 28,
            padding: '3rem',
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
            border: '1.5px solid rgba(127,66,167,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: 'var(--color-text-primary)', 
              marginBottom: '2rem',
              lineHeight: 1.3
            }}>
              Your Brand Could Be the Next Success Story
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Get a Free Brand Growth Plan—your personalized roadmap to more reach, sales, and visibility.
            </p>
            
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                background: 'rgba(162,89,247,0.15)',
                color: 'var(--color-primary)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              <span>Offer available for a limited time.</span>
            </p>
            
            <Link to="/contact" style={{
              background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: 16,
              padding: '1rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 24px rgba(162,89,247,0.3)',
              transform: 'scale(1)',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(162,89,247,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,89,247,0.3)';
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M9.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M14.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M19.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M4.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M9.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M14.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M19.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                </svg>
              </span>
              Claim My Free Brand Growth Plan →
            </Link>
          </div>
        </div>

        {/* Section 6 - Contact */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '3rem', 
            textAlign: 'center',
            letterSpacing: '-0.01em'
          }}>
            <FancyText text="Have Questions? Let's Talk." />
          </h2>
          
          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" 
              data-aos="zoom-in" 
              data-aos-delay="300" 
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
              style={{
                background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: 16,
                padding: '1.5rem 3rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(162,89,247,0.3)',
                transform: 'scale(1)',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                maxWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(162,89,247,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,89,247,0.3)';
              }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M9.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M14.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M19.5 9.5V5a2.5 2.5 0 0 1 5 0v4.5"/>
                  <path d="M4.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M9.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M14.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                  <path d="M19.5 9.5v9a2.5 2.5 0 0 0 5 0v-9"/>
                </svg>
              </span>
              Send Message & Get a Reply Within 24 Hours
            </Link>
          </div>
        </div>

        {/* Section 7 - Final Trust Close */}
        <div className="scroll-animate" style={{ marginBottom: '6rem' }}>
          <div style={{
            background: 'rgba(30,30,30,0.55)',
            borderRadius: 28,
            padding: '3rem',
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
            border: '1.5px solid rgba(127,66,167,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: 'var(--color-text-primary)', 
              marginBottom: '2rem',
              lineHeight: 1.3
            }}>
              Not Just a Service – A Growth Partner
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              At Shyara, we don't just deliver work; we invest in your success. Whether you're a startup, creator, or growing business, we're here to scale your digital presence—fast.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home; 