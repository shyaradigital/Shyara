import React, { useEffect, useRef, useState } from 'react';

const LoadingScreen = ({ onFinish, message, keepLogoBg = true, canZoom = false }) => {
  const screenRef = useRef(null);
  const textRef = useRef(null);
  const [phase, setPhase] = useState('loading'); // 'loading', 'zooming', 'done'
  const [showBgLogo, setShowBgLogo] = useState(false);

  useEffect(() => {
    const loadingScreen = screenRef.current;
    const loadingText = textRef.current;
    if (!loadingScreen || !loadingText) return;

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
      // Pulse, then zoom in only when canZoom is true
      if (canZoom) {
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
            // Show navbar again after loading
            if (navbar) {
              navbar.style.display = '';
            }
            if (onFinish) onFinish();
          }, 1100);
        }, 1100);
      } else {
        // Keep pulsing indefinitely until canZoom becomes true
        // The zoom will be triggered by a separate effect when canZoom changes
      }
    } else {
      // Custom message: hold, then fade out smoothly
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
      }, 1100);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // Ensure navbar is shown if component unmounts
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, [onFinish, message, keepLogoBg]);

  // Separate effect to handle zoom when canZoom becomes true
  useEffect(() => {
    if (canZoom && phase === 'loading' && !message) {
      const loadingScreen = screenRef.current;
      const loadingText = textRef.current;
      if (!loadingScreen || !loadingText) return;

      setPhase('zooming');
      loadingScreen.style.transition = 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
      loadingScreen.style.transform = 'scale(7)';
      loadingScreen.style.opacity = '0.12';
      loadingText.style.animation = 'none';
      
      const timer = setTimeout(() => {
        setPhase('done');
        if (keepLogoBg) setShowBgLogo(true);
        loadingScreen.style.display = 'none';
        // Show navbar again after loading
        const navbar = document.querySelector('header, nav, .navbar');
        if (navbar) {
          navbar.style.display = '';
        }
        if (onFinish) onFinish();
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [canZoom, phase, message, keepLogoBg, onFinish]);

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