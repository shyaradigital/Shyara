import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Users, Zap, TrendingUp } from 'lucide-react';

const HomeNoLoading = () => {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
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

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('sticky-header');
        } else {
          header.classList.remove('sticky-header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
             opacity: 1
           }}
          
                 >
         </a>
              </div>

        {/* Additional Scrollable Sections */}
        
        {/* Section 1 - Brand Value Proposition */}
        <section className="scroll-section value-proposition">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">Your Brand Deserves More Than Just "Online Presence"</h2>
              <p className="section-description">
                The digital space is crowded and fast-moving—generic templates won't help you stand out.
              </p>
              <div className="value-points">
                <div className="value-point" data-aos="fade-up" data-aos-delay="200">
                  <div className="check-icon">✅</div>
                  <span>Creative content that captures attention</span>
                </div>
                <div className="value-point" data-aos="fade-up" data-aos-delay="400">
                  <div className="check-icon">✅</div>
                  <span>Campaigns that convert followers into customers</span>
                </div>
                <div className="value-point" data-aos="fade-up" data-aos-delay="600">
                  <div className="check-icon">✅</div>
                  <span>Web & app solutions that grow with your business</span>
                </div>
              </div>
              <div className="value-promise" data-aos="fade-up" data-aos-delay="800">
                <strong>Shyara gives you the expertise of an agency with the flexibility of a freelance team, delivering real results without inflated costs.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Services */}
        <section className="scroll-section services-section">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">Your Brand, Supercharged – All Under One Roof</h2>
              <div className="services-grid">
                <div className="service-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <h3>Social Media Management</h3>
                  <p>From posts to reels, we handle it all.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3>Festive Post Designs</h3>
                  <p>Ready-to-share festival creatives for instant visibility.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="400">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <h3>Ads Campaign Management</h3>
                  <p>High-ROI campaigns with free creatives, for your targeted Audience.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="500">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <h3>Web Development</h3>
                  <p>Fast, responsive, SEO-ready sites.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="600">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  </div>
                  <h3>App Development</h3>
                  <p>Custom Android & iOS apps.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="700">
                  <div className="service-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <h3>Video & Reels Editing</h3>
                  <p>Professional edits for viral content.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Why Choose Shyara */}
        <section className="scroll-section why-shyara">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">The Shyara Advantage</h2>
              <div className="advantages-grid">
                <div className="advantage-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="advantage-icon">
                    <Users size={40} />
                  </div>
                  <h3>Freelancer-Driven</h3>
                  <p>Agile, creative, and handpicked experts.</p>
                </div>
                <div className="advantage-card" data-aos="fade-up" data-aos-delay="400">
                  <div className="advantage-icon">
                    <Zap size={40} />
                  </div>
                  <h3>Modular & Scalable</h3>
                  <p>Pay only for what you need.</p>
                </div>
                <div className="advantage-card" data-aos="fade-up" data-aos-delay="600">
                  <div className="advantage-icon">
                    <TrendingUp size={40} />
                  </div>
                  <h3>Results-Obsessed</h3>
                  <p>Focused on sales, engagement, and measurable growth.</p>
                </div>
              </div>
              <div className="stats-display" data-aos="fade-up" data-aos-delay="800">
                <div className="stat-item">
                  <span className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </span>
                  <span className="stat-text">100+ Brands Served</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </span>
                  <span className="stat-text">Avg. 35% Engagement Boost</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </span>
                  <span className="stat-text">4.9/5 Client Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Client Testimonials */}
        <section className="scroll-section testimonials">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">What Our Clients Say</h2>
              <div className="testimonials-grid">
                <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="testimonial-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <p>"Shyara's ads turned our slow season into our busiest quarter yet!"</p>
                  <div className="testimonial-author">— Priya S., Startup Founder</div>
                </div>
                <div className="testimonial-card" data-aos="fade-up" data-aos-delay="400">
                  <div className="testimonial-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <p>"Their festive posts made our brand instantly recognizable in local markets."</p>
                  <div className="testimonial-author">— Rahul M., Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Limited Time Offer */}
        <section className="scroll-section limited-offer">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">Your Brand Could Be the Next Success Story</h2>
              <p className="offer-description">
                Get a Free Brand Growth Plan—your personalized roadmap to more reach, sales, and visibility.
              </p>
              <p className="offer-timing">📅 Offer available for a limited time.</p>
              <div className="offer-cta">
                <Link to="/contact" className="btn-secondary">
                  🚀 Claim My Free Brand Growth Plan →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 - Contact */}
        <section className="scroll-section contact-section">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">Have Questions? Let's Talk.</h2>
              <div className="contact-info">
                <div className="contact-item" data-aos="fade-up" data-aos-delay="200">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <span>hello@shyara.in</span>
                </div>
                <div className="contact-item" data-aos="fade-up" data-aos-delay="400">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <span>+91-XXXXXXXXXX</span>
                </div>
                <div className="contact-item" data-aos="fade-up" data-aos-delay="600">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span>India (Serving clients worldwide)</span>
                </div>
              </div>
              <form className="contact-form" data-aos="fade-up" data-aos-delay="800">
                <div className="form-group">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn-secondary">
                  🔵 Send Message & Get a Reply Within 24 Hours
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Section 7 - Final Trust Close */}
        <section className="scroll-section trust-close">
          <div className="container">
            <div className="section-content" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-headline">Not Just a Service – A Growth Partner</h2>
              <p className="closing-message">
                At Shyara, we don't just deliver work; we invest in your success. Whether you're a startup, creator, or growing business, we're here to scale your digital presence—fast.
              </p>
            </div>
          </div>
        </section>

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
                           <a href="mailto:support@shyara.co.in" className="footer-icon" aria-label="Email">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>
               </a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default HomeNoLoading; 