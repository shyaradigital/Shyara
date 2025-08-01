import React from 'react';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';

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

// Remove AboutCard, AboutHeading, and cardsRef if not used

const AboutPage = () => {
  // Refs for animation (not used in this static version)
  // const cardsRef = useRef([]);

  return (
    <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: 0, fontFamily: 'inherit', position: 'relative', background: 'none' }}>
      <div style={{ maxWidth: 900, width: '100%', margin: '-5rem auto 0', padding: '0 1.5rem', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <AnimatedHeading text="About Shyara" />
          <p style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2.5rem', marginTop: '-1rem', letterSpacing: 0.5 }}>
            {"We're a freelance-powered digital collective, here to empower your brand online."}
          </p>
        </div>
        <div className="about-content" style={{ display: 'flex', flexDirection: 'row', gap: 40, maxWidth: 1000, margin: '0 auto', marginBottom: 64, alignItems: 'stretch', flexWrap: 'wrap', background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <div className="about-text" style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 500, background: 'rgba(30,30,30,0.55)', borderRadius: 24, padding: 32, boxShadow: '0 2px 16px #0006', border: '1px solid rgba(127,66,167,0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'auto', overflow: 'hidden', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 18, letterSpacing: '-0.01em' }}><FancyText text="Our Story" /></h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 12, fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.6 }}>
              Shyara is more than just a digital service provider. What started as a two-person initiative has evolved into a hub of designers, marketers, developers, and strategists.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.6 }}>
              We are united by one goal: to offer powerful, flexible, and affordable solutions for brands, startups, and creators. We believe in quality work and building lasting partnerships.
            </p>
          </div>
          <div className="about-image" style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 400, background: 'rgba(30,30,30,0.95)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 2px 16px #0006', border: '1px solid #222', marginTop: 12 }}>
            <video
              src={process.env.PUBLIC_URL + '/pics/videoplayback.mp4'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 18, letterSpacing: '-0.01em' }}><FancyText text="Our Vision" /></h2>
          <p style={{ fontSize: '1.08rem', fontWeight: 400, color: 'var(--color-text-primary)', margin: '0 auto', maxWidth: 700, lineHeight: 1.5 }}>
            To become India's most trusted freelance-powered digital collective, enabling brands to scale online without the overhead of traditional agencies.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: 32, textAlign: 'center' }}><FancyText text="What Makes Us Different?" /></h2>
          <div className="about-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 1rem',
            background: 'none',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
          }}>
            {aboutCards.map((card, i) => (
              <div
                key={card.title}
                className="rounded-lg shadow-sm border transition-all duration-300 relative cursor-pointer"
                tabIndex={0}
                style={{
                  color: 'var(--color-text-primary)',
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
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.97rem', fontWeight: 400, lineHeight: 1.5 }}>{card.text}</p>
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