import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FancyText from '../components/FancyText';
import AnimatedHeading from '../components/AnimatedHeading';
import { Heart, Zap, Target, Users, TrendingUp, Coffee, Globe, Clock, Award } from 'lucide-react';

const AboutMobile = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const workSteps = [
    {
      number: '01',
      title: 'We Listen First',
      description: 'Understanding your vision before we pitch ideas.',
      icon: <Users size={24} />
    },
    {
      number: '02',
      title: 'We Handpick the Right Team',
      description: 'Matching you with freelancers skilled for your exact needs.',
      icon: <Award size={24} />
    },
    {
      number: '03',
      title: 'We Stay Agile',
      description: 'No rigid systems, no unnecessary delays—just quick, quality delivery.',
      icon: <Zap size={24} />
    },
    {
      number: '04',
      title: 'We Measure What Matters',
      description: 'Tracking real growth, not just vanity metrics.',
      icon: <Target size={24} />
    }
  ];

  const teamCategories = [
    {
      title: 'The Creators',
      description: 'Crafting visuals that stop the scroll.',
      icon: <Target size={28} />,
      color: '#a259f7'
    },
    {
      title: 'The Strategists',
      description: 'Turning data into growth opportunities.',
      icon: <TrendingUp size={28} />,
      color: '#7f42a7'
    },
    {
      title: 'The Storytellers',
      description: 'Making your brand unforgettable.',
      icon: <Heart size={28} />,
      color: '#bb6aff'
    },
    {
      title: 'The Builders',
      description: 'Bringing your web & app ideas to life.',
      icon: <Globe size={28} />,
      color: '#6600c5'
    }
  ];

  const values = [
    {
      icon: <Heart size={24} />,
      title: 'Relationships over transactions',
      description: 'We aim to be your long-term partner.',
      color: '#ff6b6b'
    },
    {
      icon: <Zap size={24} />,
      title: 'Speed without compromise',
      description: 'Agility is our superpower.',
      color: '#4ecdc4'
    },
    {
      icon: <Target size={24} />,
      title: 'Impact-driven creativity',
      description: 'Every design and strategy serves a purpose.',
      color: '#45b7d1'
    }
  ];

  const impactStats = [
    {
      number: '100+',
      label: 'businesses',
      description: 'helped grow their digital presence'
    },
    {
      number: '5M+',
      label: 'targeted users',
      description: 'reached through managed campaigns'
    },
    {
      number: '800+',
      label: 'unique creatives',
      description: 'designed that built brand recognition'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: 'var(--color-text-primary)', 
      padding: '0 0 4rem 0', 
      fontFamily: 'inherit', 
      position: 'relative', 
      background: 'none' 
    }}>
      <div style={{ 
        maxWidth: '100%', 
        width: '100%', 
        margin: '-5rem auto 0', 
        padding: '0 1rem', 
        background: 'none', 
        border: 'none', 
        borderRadius: 0, 
        boxShadow: 'none', 
        position: 'relative' 
      }}>
        
        {/* Section 1: Our Story */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <AnimatedHeading text="About Shyara" />
            <p style={{ 
              fontSize: '1.4rem', 
              fontWeight: 500, 
              color: 'var(--color-text-primary)', 
              marginBottom: '2rem', 
              marginTop: '-1rem', 
              letterSpacing: 0.5,
              lineHeight: 1.4,
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              We're a freelance-powered digital collective, here to empower your brand online.
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(30,30,30,0.55)', 
            borderRadius: '20px', 
            padding: '2rem', 
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)', 
            border: '1.5px solid rgba(127,66,167,0.18)', 
            backdropFilter: 'blur(12px)', 
            WebkitBackdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: '100px', 
              height: '100px', 
              background: 'radial-gradient(circle, rgba(162,89,247,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)'
            }} />
            
            <div style={{ 
              position: 'relative', 
              zIndex: 1 
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: 'var(--color-primary)', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Our Story
              </h2>
              
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: 1.6, 
                color: 'var(--color-text-secondary)', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Shyara started as a simple idea: what if we could give growing brands the expertise of an agency without the overhead? 
                We're a collective of handpicked freelancers, each a specialist in their field, working together to deliver results that matter.
              </p>
              
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: 1.6, 
                color: 'var(--color-text-secondary)', 
                marginBottom: '0',
                textAlign: 'center'
              }}>
                Today, we're helping businesses across industries build their digital presence, one creative solution at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: How We Work */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '2.5rem', 
            textAlign: 'center'
          }}>
            <FancyText text="How We Work" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            {workSteps.map((step, index) => (
              <div 
                key={index}
                className="work-step-card"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  background: 'rgba(30,30,30,0.55)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1.5px solid rgba(127,66,167,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: hoveredStep === index ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredStep === index 
                    ? '0 12px 32px 0 rgba(80,80,120,0.25)' 
                    : '0 8px 32px 0 rgba(80,80,120,0.18)'
                }}
              >

                
                <div style={{
                  background: 'rgba(162,89,247,0.1)',
                  color: 'var(--color-primary)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem'
                }}>
                  {step.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '0.75rem'
                }}>
                  {step.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.5,
                  fontSize: '0.95rem'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Our Team */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '2.5rem', 
            textAlign: 'center'
          }}>
            <FancyText text="Meet Our Team" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            {teamCategories.map((category, index) => (
              <div 
                key={index}
                className="team-category-card"
                onMouseEnter={() => setHoveredTeam(index)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{
                  background: 'rgba(30,30,30,0.55)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1.5px solid rgba(127,66,167,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: hoveredTeam === index ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredTeam === index 
                    ? '0 12px 32px 0 rgba(80,80,120,0.25)' 
                    : '0 8px 32px 0 rgba(80,80,120,0.18)'
                }}
              >
                <div style={{
                  background: `rgba(${category.color}, 0.15)`,
                  color: category.color,
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {category.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '0.75rem'
                }}>
                  {category.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.5,
                  fontSize: '0.95rem'
                }}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Our Values */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '2.5rem', 
            textAlign: 'center'
          }}>
            <FancyText text="Our Values" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            {values.map((value, index) => (
              <div 
                key={index}
                className="value-card"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
                style={{
                  background: 'rgba(30,30,30,0.55)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1.5px solid rgba(127,66,167,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: hoveredValue === index ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredValue === index 
                    ? '0 12px 32px 0 rgba(80,80,120,0.25)' 
                    : '0 8px 32px 0 rgba(80,80,120,0.18)'
                }}
              >
                <div style={{
                  background: `rgba(${value.color}, 0.15)`,
                  color: value.color,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {value.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '0.75rem'
                }}>
                  {value.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.5,
                  fontSize: '0.9rem'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Impact Stats */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--color-primary)', 
            marginBottom: '2.5rem', 
            textAlign: 'center'
          }}>
            <FancyText text="Our Impact" />
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className="impact-stat-card"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  background: 'rgba(30,30,30,0.55)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1.5px solid rgba(127,66,167,0.18)',
                  boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: hoveredStat === index ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredStat === index 
                    ? '0 12px 32px 0 rgba(80,80,120,0.25)' 
                    : '0 8px 32px 0 rgba(80,80,120,0.18)'
                }}
              >
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  marginBottom: '0.75rem'
                }}>
                  {stat.number}
                </div>
                
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {stat.label}
                </div>
                
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.4,
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: CTA */}
        <div className="scroll-animate" style={{ marginBottom: '4rem' }}>
          <div style={{
            background: 'rgba(30,30,30,0.55)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(80,80,120,0.18)',
            border: '1.5px solid rgba(127,66,167,0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '600', 
              color: 'var(--color-text-primary)', 
              marginBottom: '1.5rem',
              lineHeight: 1.3
            }}>
              Ready to Work Together?
            </h2>
            
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Let's discuss how we can help your brand grow online. No pressure, just a conversation about possibilities.
            </p>
            
            <button
              onClick={handleContactClick}
              style={{
                background: 'linear-gradient(90deg,#7f42a7,#6600c5 80%)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '16px',
                padding: '1rem 2.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(162,89,247,0.3)',
                transform: 'scale(1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(162,89,247,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(162,89,247,0.3)';
              }}
            >
              Let's Talk →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMobile;
