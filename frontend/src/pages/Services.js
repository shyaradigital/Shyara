import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Sparkles, Megaphone, Globe, Smartphone, Film } from 'lucide-react';
// Fallback FancyText: just renders text with a span for now
const FancyText = ({ text }) => <span style={{ color: '#a259f7', fontWeight: 600 }}>{text}</span>;

const services = [
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: 'Social Media Management',
    desc: 'Consistent, creative, and keyword-rich content for all major platforms. We handle everything from posts and reels to community engagement.',
    price: 'Starting at ₹10,500/month',
    route: '/services/social-media-management',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'Festive Post Designs',
    desc: 'Ready-to-share branded festival creatives to boost reach on special occasions. Includes your logo and contact info for brand recognition.',
    price: '₹1,000/month',
    route: '/services/festive-posts',
  },
  {
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    title: 'Ads Campaign Management',
    desc: 'Run powerful, high-ROI ads across Meta, Google, and more. Includes free ad creatives, strategic budget management, and transparent reporting.',
    price: '15% of Ad Spend',
    route: '/services/ads-campaign-management',
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: 'Web Development',
    desc: 'Fast, responsive, and SEO-friendly websites for portfolios, businesses, and e-commerce. Custom designs with complete development support.',
    price: 'Custom Quote',
    route: '/services/website-development',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: 'App Development',
    desc: 'Mobile apps for Android & iOS built by our skilled freelance developers. We handle UI/UX design, development, and deployment.',
    price: 'Custom Quote',
    route: '/services/app-development',
  },
  {
    icon: <Film className="w-8 h-8 text-primary" />,
    title: 'Video & Reels Editing',
    desc: 'Grow your brand with high-performing reels and video content. You provide the raw footage, and we handle the rest.',
    price: 'Starting at ₹25,000/month',
    route: '/services/video-editing-reels',
  },
];

const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={service.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => navigate(service.route)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(service.route); }}
      style={{
        background: hovered ? 'rgba(30,30,30,0.75)' : 'rgba(30,30,30,0.55)',
        border: '1.5px solid rgba(127,66,167,0.18)',
        boxShadow: hovered ? '0 12px 40px 0 rgba(127,66,167,0.25)' : '0 8px 32px 0 rgba(80,80,120,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 12,
        padding: '1.2rem 2.2rem',
        transition: 'box-shadow 0.3s, background 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 370,
        maxWidth: 440,
        minHeight: 120,
        height: '100%',
        position: 'relative',
      }}
    >
      <div style={{ marginBottom: 18 }}>{service.icon}</div>
      <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#a259f7', marginBottom: 10, letterSpacing: '-0.01em' }}>
        <FancyText text={service.title} />
      </h3>
      <p style={{ color: '#bdbdbd', fontSize: '0.97rem', fontWeight: 400, marginBottom: 14, flexGrow: 1 }}>{service.desc}</p>
      <p style={{ fontWeight: 600, color: '#a259f7', fontSize: '1.08rem' }}>{service.price}</p>
    </div>
  );
};

let hasServicesHeadingAnimated = false;

const ServicesHeading = () => {
  const LINE = 'Our Services';
  const [displayed, setDisplayed] = useState(hasServicesHeadingAnimated ? LINE : '');
  const [animating, setAnimating] = useState(!hasServicesHeadingAnimated);

  useEffect(() => {
    if (hasServicesHeadingAnimated) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayed(LINE);
      hasServicesHeadingAnimated = true;
      setAnimating(false);
      return;
    }
    let i = 0;
    const speed = 55;
    const typeLine = () => {
      if (i <= LINE.length) {
        setDisplayed(LINE.slice(0, i));
        i++;
        setTimeout(typeLine, speed);
      } else {
        hasServicesHeadingAnimated = true;
        setAnimating(false);
      }
    };
    typeLine();
    return () => {};
  }, []);

  return (
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e7e7e7', marginBottom: '1.5rem', minHeight: '2.5em', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
      <FancyText text={displayed} />
      {animating && (
        <span style={{ display: 'inline-block', width: '0.5em', height: '1.2em', background: '#e7e7e7', marginLeft: 4, verticalAlign: '-0.2em', animation: 'pulse 1s infinite' }} aria-hidden="true"></span>
      )}
    </h1>
  );
};

const ServicesPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '2rem 0 4rem 0', fontFamily: 'inherit', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', marginTop: '-7rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <ServicesHeading />
          <p style={{ fontSize: '1.08rem', fontWeight: 400, color: '#a7a7a7', marginBottom: '3rem' }}>
            Smart, scalable, and freelancer-powered digital solutions for every brand. Choose what you need.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 48,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 1rem',
          marginBottom: 64,
          justifyContent: 'center',
        }}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
          <div style={{
            background: 'rgba(30,30,30,0.55)',
            border: '1.5px solid rgba(127,66,167,0.18)',
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 32,
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 600,
            width: '100%',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: '#181818', borderRadius: '50%', padding: 10, boxShadow: '0 2px 12px #0006', border: '2px solid #a259f7' }}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="#a259f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#a259f7', marginBottom: 10, marginTop: 24, letterSpacing: '-0.01em', textAlign: 'center' }}>Want something truly unique?</h2>
            <p style={{ fontSize: '0.97rem', fontWeight: 400, color: '#e7e7e7', marginBottom: 18, textAlign: 'center' }}>
              Check out our <span style={{ fontWeight: 600, color: '#a259f7' }}>Personalized Services</span> for custom solutions, one-on-one consulting, and more. Let us bring your vision to life!
            </p>
            <button
              onClick={() => navigate('/services/personalized')}
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
            >
              Explore Personalized Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 