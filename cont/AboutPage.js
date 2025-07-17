import React, { useState, useRef } from 'react';
import FancyText from '../components/FancyText';
import { useGsapReveal, splitTextToSpans } from '../components/gsapReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
      className={`p-6 bg-surface rounded-lg shadow-sm border border-transparent transition-all duration-300 relative cursor-pointer
        ${hovered ? 'scale-[1.025] -translate-y-1 bg-surface/95' : ''}
      `}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <h3 className="font-bold text-lg mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary">{text}</p>
      {/* Subtle overlay on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${hovered ? 'bg-white/5' : ''}`}></div>
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
    <h1 className="text-4xl font-bold text-center mb-4 text-text-primary min-h-[2.5em]">
      <FancyText text={displayed} />
      <span className="inline-block w-2 h-6 align-middle bg-text-primary animate-pulse ml-1" aria-hidden="true" style={{verticalAlign:'-0.2em'}}></span>
      <span className="sr-only">About Shyara</span>
    </h1>
  );
};

const AboutPage = () => {
  // Refs for animation
  const headingRef = useRef(null);
  const storySectionRef = useRef(null);
  const videoRef = useRef(null);
  const visionRef = useRef(null);
  // For animated heading
  const headingWords = 'About Shyara'.split(' ');
  const headingWordRefs = useRef([]);
  // For cards
  const cardsRef = useRef([]);
  const diffHeadingRef = useRef(null);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="max-4xl mx-auto">
          {/* Static heading with split text */}
          <h1 className="text-4xl font-bold text-center mb-4 text-text-primary min-h-[2.5em]">
            {headingWords.map((word, i) => (
              <span
                key={i}
                ref={el => (headingWordRefs.current[i] = el)}
                className="inline-block mx-1"
              >
                {word}
              </span>
            ))}
            <span className="inline-block w-2 h-6 align-middle bg-text-primary animate-pulse ml-1" aria-hidden="true" style={{verticalAlign:'-0.2em'}}></span>
            <span className="sr-only">About Shyara</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary drop-shadow-lg text-center max-w-5xl mx-auto px-0 mb-12">
            We're a freelance-powered digital collective, here to empower your brand online.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-surface rounded-2xl p-7 shadow-lg border border-border">
                <h2 className="text-2xl font-bold mb-3 text-text-primary">
                  <FancyText text="Our Story" />
                </h2>
                <p className="text-text-secondary mb-4">
                  Shyara is more than just a digital service provider. What started as a two-person initiative has evolved into a hub of designers, marketers, developers, and strategists.
                </p>
                <p className="text-text-secondary">
                  We are united by one goal: to offer powerful, flexible, and affordable solutions for brands, startups, and creators. We believe in quality work and building lasting partnerships.
                </p>
              </div>
            </div>
            <div className="bg-surface h-64 rounded-lg shadow-md border border-border flex items-center justify-center overflow-hidden">
              <video
                src={require('../pics/videoplayback.mp4')}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-3 text-text-primary">
              <FancyText text="Our Vision" />
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary drop-shadow-lg max-w-5xl mx-auto px-0">
              To become India's most trusted freelance-powered digital collective, enabling brands to scale online without the overhead of traditional agencies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">
              <FancyText text="What Makes Us Different?" />
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {aboutCards.map((card, i) => (
                <AboutCard key={card.title} title={card.title} text={card.text} ref={el => (cardsRef.current[i] = el)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 