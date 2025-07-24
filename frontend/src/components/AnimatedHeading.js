import React, { useEffect, useState } from 'react';
import FancyText from './FancyText';

const AnimatedHeading = ({ text, as = 'h1', style = {}, className = '', ariaLabel }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }
    let i = 0;
    const speed = 55;
    const typeLine = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(typeLine, speed);
      }
    };
    typeLine();
    // eslint-disable-next-line
  }, [text]);

  const HeadingTag = as;
  return (
    <HeadingTag
      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1.5rem', minHeight: '2.5em', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1, ...style }}
      className={className}
      aria-label={ariaLabel || text}
    >
      <FancyText text={displayed} />
      <span style={{ display: 'inline-block', width: '0.5em', height: '1.2em', background: '#e7e7e7', marginLeft: 4, verticalAlign: '-0.2em', animation: 'pulse 1s infinite' }} aria-hidden="true"></span>
    </HeadingTag>
  );
};

export default AnimatedHeading; 