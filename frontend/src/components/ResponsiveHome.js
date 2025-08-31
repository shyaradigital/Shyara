import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import HomeTablet from '../pages/HomeTablet';
import HomeMobile from '../pages/HomeMobile';

const ResponsiveHome = () => {
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
      return <HomeMobile />;
    case 'tablet':
      return <HomeTablet />;
    case 'desktop':
    default:
      return <Home />;
  }
};

export default ResponsiveHome;
