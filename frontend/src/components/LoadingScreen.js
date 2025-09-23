import React, { useEffect, useRef, useState } from 'react';

const LoadingScreen = ({ onFinish, message, keepLogoBg = true }) => {
  const screenRef = useRef(null);
  const textRef = useRef(null);
  const initializedRef = useRef(false);
  const [phase, setPhase] = useState('loading'); // 'loading', 'zooming', 'done'
  const [showBgLogo, setShowBgLogo] = useState(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initializedRef.current) return;
    
    const loadingScreen = screenRef.current;
    const loadingText = textRef.current;
    if (!loadingScreen || !loadingText) return;
    
    initializedRef.current = true;

    // Hide navbar and ensure full screen coverage
    const navbar = document.querySelector('header, nav, .navbar');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Initial state - ensure full screen coverage
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100vw';
    loadingScreen.style.height = '100vh';
    loadingScreen.style.transform = 'scale(1)';
    loadingScreen.style.opacity = '1';
    loadingScreen.style.transition = 'none';
    loadingScreen.style.zIndex = '99999';
    loadingScreen.style.pointerEvents = 'auto';
    loadingText.style.animation = 'none';
    void loadingText.offsetWidth;
    loadingText.style.animation = 'pulse 1.2s ease-in-out infinite, glow 1.8s ease-in-out infinite';

    let timer1, timer2;
    if (!message) {
      // Pulse for 3 seconds, then zoom in
      console.log('LoadingScreen: Starting 3-second timer');
      timer1 = setTimeout(() => {
        console.log('LoadingScreen: 3 seconds elapsed, starting zoom');
        setPhase('zooming');
        loadingScreen.style.transition = 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
        loadingScreen.style.transform = 'scale(7)';
        loadingScreen.style.opacity = '0.12';
        loadingText.style.animation = 'none';
        timer2 = setTimeout(() => {
          console.log('LoadingScreen: Zoom complete, finishing');
          setPhase('done');
          if (keepLogoBg) setShowBgLogo(true);
          loadingScreen.style.display = 'none';
          // Show navbar again after loading
          if (navbar) {
            navbar.style.display = '';
          }
          if (onFinish) onFinish();
        }, 1100);
      }, 3000); // Exactly 3 seconds
    } else {
      // Custom message: hold for 3 seconds, then fade out smoothly
      timer1 = setTimeout(() => {
        setPhase('done');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s';
        timer2 = setTimeout(() => {
          loadingScreen.style.display = 'none';
          // Show navbar again after loading
          if (navbar) {
            navbar.style.display = '';
          }
          if (onFinish) onFinish();
        }, 500);
      }, 3000); // Exactly 3 seconds
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      initializedRef.current = false; // Reset for potential re-mount
      // Ensure navbar is shown if component unmounts
      if (navbar) {
        navbar.style.display = '';
      }
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999
      }}
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