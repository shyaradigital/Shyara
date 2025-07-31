import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';

const portfolioServices = [
  {
    service: 'Social Media Management',
    description: 'Creative content, engaging posts, and strategic social media campaigns',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/1.jpg', title: 'Fashion Brand Campaign', description: '3-month social media management with 48 creative posts' },
      { img: process.env.PUBLIC_URL + '/pics/2.jpg', title: 'Influencer Content', description: 'Monthly reel production and engagement strategy' },
      { img: process.env.PUBLIC_URL + '/pics/fashion.jpg', title: 'Festive Posts', description: 'Holiday and special occasion content' },
    ],
    results: 'Average 60% increase in followers, 45% boost in engagement'
  },
  {
    service: 'Website Development',
    description: 'Modern, responsive websites that convert visitors into customers',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/web1.png', title: 'Portfolio Website', description: 'Responsive site with booking and payment features' },
      { img: process.env.PUBLIC_URL + '/pics/web2.png', title: 'Tech Startup Site', description: 'Modern website for tech startup' },
      { img: process.env.PUBLIC_URL + '/pics/web3.png', title: 'E-commerce Platform', description: 'Full-featured online store' },
    ],
    results: '40% more bookings, improved lead generation and conversion rates'
  },
  {
    service: 'App Development',
    description: 'Cross-platform mobile applications that solve real problems',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/event.jpeg', title: 'Event Management App', description: 'Cross-platform MVP for event management' },
      { img: process.env.PUBLIC_URL + '/pics/event.jpeg', title: 'Fitness Tracking App', description: 'Health and wellness mobile solution' },
      { img: process.env.PUBLIC_URL + '/pics/event.jpeg', title: 'E-commerce App', description: 'Mobile shopping experience' },
      { img: process.env.PUBLIC_URL + '/pics/event.jpeg', title: 'Social Networking App', description: 'Community building platform' },
    ],
    results: 'Launched within 8 weeks, secured initial funding'
  },
  {
    service: 'Video Editing & Reels',
    description: 'Engaging video content that captures attention and drives engagement',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/influencer.png', title: 'Influencer Reels', description: 'Monthly production of 20 engaging reels' },
      { img: process.env.PUBLIC_URL + '/pics/influencer.png', title: 'Product Showcase', description: 'Professional product demonstration videos' },
      { img: process.env.PUBLIC_URL + '/pics/influencer.png', title: 'Brand Story Videos', description: 'Compelling brand narrative content' },
      { img: process.env.PUBLIC_URL + '/pics/influencer.png', title: 'Event Highlights', description: 'Event recap and promotional videos' },
    ],
    results: 'Tripled follower count, boosted engagement significantly'
  },
  {
    service: 'Ad Campaign Management',
    description: 'Strategic advertising campaigns that deliver measurable results',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/3.jpg', title: 'E-commerce Campaign', description: 'Facebook and Instagram ad campaign' },
      { img: process.env.PUBLIC_URL + '/pics/4.jpg', title: 'Lead Generation', description: 'B2B lead generation campaigns' },
      { img: process.env.PUBLIC_URL + '/pics/adcampaign.jpg', title: 'Brand Awareness', description: 'Multi-platform brand awareness' },
    ],
    results: '30% increase in sales, 25% reduction in acquisition cost'
  },
  {
    service: 'Personalized Services',
    description: 'Custom solutions tailored to your specific business needs',
    samples: [
      { img: process.env.PUBLIC_URL + '/pics/fashion.jpg', title: 'Custom Branding', description: 'Complete brand identity development' },
      { img: process.env.PUBLIC_URL + '/pics/porto.png', title: 'Consultation Services', description: 'Strategic digital marketing consultation' },
      { img: process.env.PUBLIC_URL + '/pics/event.jpeg', title: 'Project Management', description: 'End-to-end project coordination' },
      { img: process.env.PUBLIC_URL + '/pics/influencer.png', title: 'Training & Support', description: 'Team training and ongoing support' },
    ],
    results: 'Customized solutions for unique business challenges'
  }
];

const PortfolioModal = ({ isOpen, onClose, service }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !service) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.samples.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.samples.length) % service.samples.length);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      <div className="portfolio-modal" style={{
        background: 'rgba(30,30,40,0.95)',
        borderRadius: 16,
        padding: '2rem',
        maxWidth: 900,
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        border: '1px solid rgba(162,89,247,0.2)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        scrollbarWidth: 'thin',
        scrollbarColor: '#a259f7 #1e1e28'
      }}>
        <style>
          {`
            .portfolio-modal::-webkit-scrollbar {
              width: 8px;
            }
            .portfolio-modal::-webkit-scrollbar-track {
              background: #1e1e28;
              border-radius: 4px;
            }
            .portfolio-modal::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #a259f7 0%, #7f42a7 100%);
              border-radius: 4px;
            }
            .portfolio-modal::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #b366ff 0%, #8f52b7 100%);
            }
          `}
        </style>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#a7a7a7',
            cursor: 'pointer',
            padding: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(162,89,247,0.2)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#a259f7', fontSize: '2.2rem', fontWeight: 700, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                {service.service}
              </h2>
              <p style={{ color: '#bdbdbd', fontSize: '1.1rem', margin: 0, lineHeight: 1.5, maxWidth: '600px' }}>
                {service.description}
              </p>
            </div>
            <div style={{ 
              background: 'rgba(76,175,80,0.1)',
              border: '1px solid rgba(76,175,80,0.2)',
              borderRadius: 8, 
              padding: '12px 16px',
              marginLeft: 24,
              marginTop: 40,
              minWidth: '200px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'fit-content'
            }}>
              <span style={{ color: '#4CAF50', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.3 }}>
                {service.results.split(', ').map((part, index) => (
                  <div key={index} style={{ marginBottom: index < service.results.split(', ').length - 1 ? '4px' : 0 }}>
                    {part}
                  </div>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', marginBottom: 24 }}>
          <div style={{
            width: '100%',
            height: 400,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            background: '#111'
          }}>
            <img
              src={service.samples[currentImageIndex].img}
              alt={service.samples[currentImageIndex].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
            
            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)',
                border: 'none',
                color: 'white',
                padding: 12,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
            >
              <ArrowLeft size={20} />
            </button>
            
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)',
                border: 'none',
                color: 'white',
                padding: 12,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Image counter */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: 20,
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            {currentImageIndex + 1} / {service.samples.length}
          </div>
        </div>

        <div style={{ 
          background: 'rgba(30,30,40,0.6)', 
          borderRadius: 12, 
          padding: '20px 24px', 
          marginBottom: 24,
          border: '1px solid rgba(162,89,247,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#e7e7e7', fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            {service.samples[currentImageIndex].title}
          </h3>
          <p style={{ color: '#bdbdbd', fontSize: '1rem', lineHeight: 1.6, textAlign: 'center', margin: 0 }}>
            {service.samples[currentImageIndex].description}
          </p>
        </div>

        {/* Thumbnail navigation */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          justifyContent: 'flex-start', 
          marginTop: 24,
          flexWrap: 'wrap',
          padding: '16px 0',
          borderTop: '1px solid rgba(162,89,247,0.1)'
        }}>
          {service.samples.map((sample, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                overflow: 'hidden',
                border: currentImageIndex === index ? '2px solid #a259f7' : '2px solid transparent',
                cursor: 'pointer',
                background: 'none',
                padding: 0
              }}
            >
              <img
                src={sample.img}
                alt={sample.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, onOpenModal }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      tabIndex={0}
      style={{
        background: hovered ? 'rgba(30,30,30,0.85)' : 'rgba(30,30,30,0.65)',
        border: '2px solid rgba(127,66,167,0.18)',
        boxShadow: hovered ? '0 12px 40px 0 rgba(0,0,0,0.4)' : '0 8px 32px 0 rgba(80,80,120,0.18)',
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onOpenModal(service)}
    >
      <div style={{ width: '100%', height: 220, overflow: 'hidden', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <img
          src={service.service === 'Website Development' ? process.env.PUBLIC_URL + '/pics/porto.png' : 
               service.service === 'Ad Campaign Management' ? process.env.PUBLIC_URL + '/pics/adcampaign.jpg' : 
               service.samples[0].img}
          alt={service.service}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', filter: hovered ? 'none' : 'grayscale(1)', transition: 'all 0.5s', borderRadius: 0, display: 'block' }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: '24px 24px 16px 24px', flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 120 }}>
        <h3 style={{ fontWeight: 700, fontSize: 22, color: 'var(--color-text-primary)', marginBottom: 8 }}><FancyText text={service.service} /></h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>{service.results}</p>
      </div>

    </div>
  );
};

const Portfolio = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
  <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', padding: '0 0 3rem 0', marginTop:'-5rem', fontFamily: 'inherit' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        <AnimatedHeading text="Our Portfolio" />
        <p style={{ fontSize: '1.15rem', color: '#a7a7a7', textAlign: 'center', marginBottom: '3rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          Explore our work across all services. Click on any service to view sample projects and designs.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 32, 
          marginBottom: 64 
        }}>
          {portfolioServices.map((service, idx) => (
            <ServiceCard key={idx} service={service} onOpenModal={handleOpenModal} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <p style={{ color: '#a7a7a7', fontSize: '1.08rem' }}>
          Want to see more? <a href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>Contact us</a> for a full portfolio or to discuss your project!
        </p>
      </div>
    </div>

      <PortfolioModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        service={selectedService} 
      />
  </div>
);
};

export default Portfolio; 