import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import ClientLoginPage from './pages/ClientLoginPage';
import HomeNoLoading from './pages/HomeNoLoading';
import SocialMediaManagementPage from './pages/services/SocialMediaManagementPage';
import FestivePostsPage from './pages/services/FestivePostsPage';
import AdsCampaignManagementPage from './pages/services/AdsCampaignManagementPage';
import WebsiteDevelopmentPage from './pages/services/WebsiteDevelopmentPage';
import AppDevelopmentPage from './pages/services/AppDevelopmentPage';
import VideoEditingReelsPage from './pages/services/VideoEditingReelsPage';
import PersonalizedServicesPage from './pages/services/PersonalizedServicesPage';
import Cart from './pages/Cart';
import AddItemsPage from './pages/AddItemsPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-alt" element={<HomeNoLoading />} />
          <Route path="/client-login" element={<Layout><ClientLoginPage /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/services/social-media-management" element={<Layout><SocialMediaManagementPage /></Layout>} />
          <Route path="/services/festive-posts" element={<Layout><FestivePostsPage /></Layout>} />
          <Route path="/services/ads-campaign-management" element={<Layout><AdsCampaignManagementPage /></Layout>} />
          <Route path="/services/website-development" element={<Layout><WebsiteDevelopmentPage /></Layout>} />
          <Route path="/services/app-development" element={<Layout><AppDevelopmentPage /></Layout>} />
          <Route path="/services/video-editing-reels" element={<Layout><VideoEditingReelsPage /></Layout>} />
          <Route path="/services/personalized" element={<Layout><PersonalizedServicesPage /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/add-items" element={<Layout><AddItemsPage /></Layout>} />
          {/* Optionally, add a 404 route here */}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
