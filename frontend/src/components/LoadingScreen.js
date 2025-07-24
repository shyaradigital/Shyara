import React, { useEffect, useRef, useState } from 'react';

const LoadingScreen = ({ onFinish, message, keepLogoBg = true }) => {
  const screenRef = useRef(null);
  const textRef = useRef(null);
  const [phase, setPhase] = useState('loading'); // 'loading', 'zooming', 'done'
  const [showBgLogo, setShowBgLogo] = useState(false);

  useEffect(() => {
    const loadingScreen = screenRef.current;
    const loadingText = textRef.current;
    if (!loadingScreen || !loadingText) return;

    // Initial state
    loadingScreen.style.transform = 'scale(1)';
    loadingScreen.style.opacity = '1';
    loadingScreen.style.transition = 'none';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.zIndex = '9999';
    loadingScreen.style.pointerEvents = 'auto';
    loadingText.style.animation = 'none';
    void loadingText.offsetWidth;
    loadingText.style.animation = 'pulse 1.2s ease-in-out infinite, glow 1.8s ease-in-out infinite';

    let timer1, timer2;
    if (!message) {
      // Pulse, then zoom in
      timer1 = setTimeout(() => {
        setPhase('zooming');
        loadingScreen.style.transition = 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
        loadingScreen.style.transform = 'scale(7)';
        loadingScreen.style.opacity = '0.12';
        loadingText.style.animation = 'none';
        timer2 = setTimeout(() => {
          setPhase('done');
          if (keepLogoBg) setShowBgLogo(true);
          loadingScreen.style.display = 'none';
          if (onFinish) onFinish();
        }, 1100);
      }, 1100);
    } else {
      // Custom message: hold, then fade out smoothly
      timer1 = setTimeout(() => {
        setPhase('done');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s';
        timer2 = setTimeout(() => {
          loadingScreen.style.display = 'none';
          if (onFinish) onFinish();
        }, 500);
      }, 1100);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish, message, keepLogoBg]);

  // Faint logo background after loading
  if (phase === 'done' && showBgLogo && keepLogoBg) {
    return (
      <div className="logo-bg">
        <span className="logo-bg-text">SHYARA</span>
      </div>
    );
  }

  return (
    <div
      id="loading-screen"
      className={`loading-screen${phase === 'zooming' ? ' loading-zooming' : ''}`}
      ref={screenRef}
    >
      <div className="loading-content">
        <h1 className="loading-text" ref={textRef}>SHYARA</h1>
        {message && (
          <div style={{ marginTop: 24, fontSize: '1.25rem', color: '#fff', fontWeight: 500, letterSpacing: '0.02em', textAlign: 'center', textShadow: '0 2px 12px #0008' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen; 