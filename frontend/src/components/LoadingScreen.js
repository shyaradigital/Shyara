import React, { useEffect, useRef } from 'react';

const LoadingScreen = ({ onFinish }) => {
  const screenRef = useRef(null);
  const textRef = useRef(null);

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
    loadingText.style.animation = '';

    const timer = setTimeout(() => {
      // Start zoom/fade animation
      loadingScreen.style.transition = 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1)';
      loadingScreen.style.transform = 'scale(3)';
      loadingScreen.style.opacity = '0.05';
      setTimeout(() => {
        // After zoom/fade, set as faint background
        loadingText.style.animation = 'none';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.zIndex = '-2';
        loadingScreen.style.pointerEvents = 'none';
        loadingScreen.style.transition = 'opacity 3s ease-in-out';
        loadingScreen.style.opacity = '0.15'; // Faint but visible
        if (onFinish) onFinish();
      }, 2500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="loading-screen" className="loading-screen" ref={screenRef}>
      <div className="loading-content">
        <h1 className="loading-text" ref={textRef}>SHYARA</h1>
      </div>
    </div>
  );
};

export default LoadingScreen; 