import React, { useState, useEffect } from 'react';
import About from '../pages/About';
import AboutTablet from '../pages/AboutTablet';
import AboutMobile from '../pages/AboutMobile';

const ResponsiveAbout = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Render appropriate version based on device type
  switch (deviceType) {
    case 'mobile':
      return <AboutMobile />;
    case 'tablet':
      return <AboutTablet />;
    case 'desktop':
    default:
      return <About />;
  }
};

export default ResponsiveAbout;
