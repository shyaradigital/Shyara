import React, { useState, useRef, useEffect } from 'react';
// Fallback FancyText: just renders text with a span for now
const FancyText = ({ text }) => <span style={{ color: 'var(--color-primary, #7f42a7)', fontWeight: 600 }}>{text}</span>;

const aboutCards = [
  {
    title: 'Freelancer-Driven',
    text: 'We operate as a curated team of skilled freelancers—agile, creative, and passionate.'
  },
  {
    title: 'Modular Services',
    text: 'Choose only what you need, from festive posts to full-scale app development.'
  },
  {
    title: 'Results First',
    text: 'Whether it\'s engagement, traffic, or conversions—we deliver outcomes that matter.'
  }
];

const AboutCard = React.forwardRef(({ title, text }, ref) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        padding: 24,
        background: 'rgba(30,30,30,0.95)',
        borderRadius: 16,
        boxShadow: hovered ? '0 4px 24px #7f42a755' : '0 2px 12px #0006',
        border: hovered ? '1.5px solid #7f42a7' : '1.5px solid transparent',
        transition: 'all 0.3s',
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.025) translateY(-4px)' : 'none',
        minHeight: 160,
        outline: 'none',
      }}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: '#e7e7e7' }}>{title}</h3>
      <p style={{ color: '#bdbdbd', fontSize: 16 }}>{text}</p>
      {/* Subtle overlay on hover */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: hovered ? 'rgba(255,255,255,0.04)' : 'none', borderRadius: 16, transition: 'background 0.3s' }}></div>
    </div>
  );
});

// Track animation state across navigations (per session)
let hasAboutHeadingAnimated = false;

const AboutHeading = () => {
  const LINE = 'About Shyara';
  const [displayed, setDisplayed] = useState(hasAboutHeadingAnimated ? LINE : '');

  useEffect(() => {
    if (hasAboutHeadingAnimated) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayed(LINE);
      hasAboutHeadingAnimated = true;
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
        hasAboutHeadingAnimated = true;
      }
    };
    typeLine();
    return () => {};
  }, []);

  return (
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e7e7e7', marginBottom: '1.5rem', minHeight: '2.5em', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
      <FancyText text={displayed} />
      <span style={{ display: 'inline-block', width: '0.5em', height: '1.2em', background: '#e7e7e7', marginLeft: 4, verticalAlign: '-0.2em', animation: 'pulse 1s infinite' }} aria-hidden="true"></span>
    </h1>
  );
};

const AboutPage = () => {
  // Refs for animation (not used in this static version)
  const cardsRef = useRef([]);

  return (
    <div style={{ minHeight: '100vh', color: '#e7e7e7', padding: '2rem 0 4rem 0', fontFamily: 'inherit', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', marginTop: '-8rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <AboutHeading />
          <p style={{ fontSize: '2rem', fontWeight: 600, color: '#fff', marginBottom: '2.5rem', marginTop: '-1rem', letterSpacing: 0.5 }}>
            {"We're a freelance-powered digital collective, here to empower your brand online."}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, maxWidth: 1000, margin: '0 auto', marginBottom: 64, alignItems: 'stretch', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 500, height: 256, background: 'rgba(30,30,30,0.95)', borderRadius: 24, padding: 32, boxShadow: '0 2px 16px #0006', border: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#a259f7', marginBottom: 18, letterSpacing: '-0.01em' }}><FancyText text="Our Story" /></h2>
            <p style={{ color: '#bdbdbd', marginBottom: 12, fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.6 }}>
              Shyara is more than just a digital service provider. What started as a two-person initiative has evolved into a hub of designers, marketers, developers, and strategists.
            </p>
            <p style={{ color: '#bdbdbd', fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.6 }}>
              We are united by one goal: to offer powerful, flexible, and affordable solutions for brands, startups, and creators. We believe in quality work and building lasting partnerships.
            </p>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 400, height: 256, background: 'rgba(30,30,30,0.95)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 2px 16px #0006', border: '1px solid #222' }}>
            <video
              src={require('../pics/videoplayback.mp4')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#a259f7', marginBottom: 18, letterSpacing: '-0.01em' }}><FancyText text="Our Vision" /></h2>
          <p style={{ fontSize: '1.08rem', fontWeight: 400, color: '#e7e7e7', margin: '0 auto', maxWidth: 700, lineHeight: 1.5 }}>
            To become India's most trusted freelance-powered digital collective, enabling brands to scale online without the overhead of traditional agencies.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e7e7e7', marginBottom: 32, textAlign: 'center' }}><FancyText text="What Makes Us Different?" /></h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 1rem',
          }}>
            {aboutCards.map((card, i) => (
              <div
                key={card.title}
                className="rounded-lg shadow-sm border transition-all duration-300 relative cursor-pointer"
                tabIndex={0}
                style={{
                  color: '#e7e7e7',
                  minHeight: 160,
                  padding: '2rem',
                  background: 'rgba(30,30,30,0.55)',
                  border: '1.5px solid rgba(127,66,167,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 24,
                  transition: 'box-shadow 0.3s, background 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(127,66,167,0.25)';
                  e.currentTarget.style.background = 'rgba(30,30,30,0.75)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(80,80,120,0.18)';
                  e.currentTarget.style.background = 'rgba(30,30,30,0.55)';
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#a259f7', marginBottom: 8, letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ color: '#bdbdbd', fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.5 }}>{card.text}</p>
                <div className="absolute inset-0 pointer-events-none transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 