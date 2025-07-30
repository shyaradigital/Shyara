import React, { useState, useEffect } from 'react';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';

const portfolioItems = [
  {
    title: 'Social Media for Fashion',
    category: 'Social Media',
    img: process.env.PUBLIC_URL + '/pics/fashion.jpg',
    description: '3-month social media management including 48 creative posts, festive campaigns, and reel creation.',
    results: 'Increased Instagram followers by 60%, engagement up by 45%.',
    services: 'Content creation, account management, analytics reporting.',
  },
  {
    title: 'Portfolio Website',
    category: 'Web Development',
    img: process.env.PUBLIC_URL + '/pics/porto.png',
    description: 'Responsive site with booking and payment features.',
    results: '40% more bookings in 2 months.',
    services: 'Design, SEO, CMS training.'
  },
  {
    title: 'Event Management App',
    category: 'App Development',
    img: process.env.PUBLIC_URL + '/pics/event.jpeg',
    description: 'Cross-platform MVP app for event management.',
    results: 'Launched within 8 weeks; secured initial funding based on prototype.',
    services: 'UI/UX design, development, testing, deployment.',
  },
  {
    title: 'Influencer Reels',
    category: 'Video Editing',
    img: process.env.PUBLIC_URL + '/pics/influencer.png',
    description: 'Monthly production of 20 reels with creative captions and hashtag strategy.',
    results: 'Tripled follower count and boosted engagement on Instagram.',
    services: 'Video editing, social media posting, performance analysis.',
  },
  {
    title: 'E-commerce Ad Campaign',
    category: 'Ad Campaigns',
    img: process.env.PUBLIC_URL + '/pics/adcampaign.jpg',
    description: 'Facebook and Instagram ad campaign with custom image design and video editing.',
    results: '30% increase in sales and 25% reduction in customer acquisition cost.',
    services: 'Ad design, budget management, campaign optimization.',
  },
  {
    title: 'Tech Startup Website',
    category: 'Web Development',
    img: process.env.PUBLIC_URL + '/pics/startup.png',
    description: 'Modern, responsive website for a tech startup.',
    results: 'Improved brand presence and lead generation.',
    services: 'Web design, development, SEO.',
  },
];

const PortfolioCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  // DEBUG: Log the image src
  console.log('Portfolio image src:', item.img);

  return (
    <div
      tabIndex={0}
      style={{
        background: hovered ? 'rgba(30,30,30,0.85)' : 'rgba(30,30,30,0.65)',
        border: hovered ? '2px solid var(--color-primary)' : '2px solid rgba(127,66,167,0.18)',
        boxShadow: hovered ? '0 8px 32px 0 var(--color-primary)99' : '0 8px 32px 0 rgba(80,80,120,0.18)',
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div style={{ width: '100%', height: 220, overflow: 'hidden', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* TEMP: Remove loading/error logic for debugging */}
        <img
          src={item.img}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: hovered ? 'none' : 'grayscale(1)', transition: 'all 0.5s', borderRadius: 0, display: 'block' }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: 24, flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-primary)', marginBottom: 4 }}>{item.category}</p>
        <h3 style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-text-primary)', marginBottom: 8 }}><FancyText text={item.title} /></h3>
        <div style={{ maxHeight: hovered ? 200 : 0, opacity: hovered ? 1 : 0, marginTop: hovered ? 8 : 0, overflow: 'hidden', transition: 'all 0.3s' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, marginBottom: 4 }}><span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Description:</span> {item.description}</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, marginBottom: 4 }}><span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Results:</span> {item.results}</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}><span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Services:</span> {item.services}</p>
        </div>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: '0 0 32px 8px #A259F7aa', borderRadius: 18, transition: 'box-shadow 0.3s' }} />}
    </div>
  );
};

const Portfolio = () => (
  <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0 0 3rem 0', marginTop:'-5rem', fontFamily: 'inherit' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
      <AnimatedHeading text="Our Work" />
      <p style={{ fontSize: '1.15rem', color: '#a7a7a7', textAlign: 'center', marginBottom: '2rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
        Explore some of our recent projects and success stories. We help brands grow with creative digital solutions, from social media to web and app development.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, marginBottom: 64 }}>
        {portfolioItems.map((item, idx) => (
          <PortfolioCard key={idx} item={item} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <p style={{ color: '#a7a7a7', fontSize: '1.08rem' }}>
          Want to see more? <a href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>Contact us</a> for a full portfolio or to discuss your project!
        </p>
      </div>
    </div>
  </div>
);

export default Portfolio; 