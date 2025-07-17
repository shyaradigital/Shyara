import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ShieldCheck, Zap, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary mb-2" />,
    title: 'For Modern Teams',
    desc: 'Empower your business with seamless digital solutions tailored for growth.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary mb-2" />,
    title: 'Secure & Reliable',
    desc: 'Enterprise-grade security and 99.99% uptime for peace of mind.'
  },
  {
    icon: <Zap className="w-8 h-8 text-primary mb-2" />,
    title: 'Lightning Fast',
    desc: 'Optimized performance for a smooth, engaging user experience.'
  },
  {
    icon: <Users className="w-8 h-8 text-primary mb-2" />,
    title: 'Loved by Clients',
    desc: 'Trusted by startups and enterprises alike for real results.'
  },
];

const testimonials = [
  {
    quote: 'Shyara transformed our online presence. The results were beyond our expectations!',
    name: 'Ritika Sharma',
    title: 'Founder, Boutique'
  },
  {
    quote: 'The team is responsive, creative, and truly understands SaaS needs.',
    name: 'Amit Verma',
    title: 'CTO, Fintech Startup'
  },
];

const HomePage = () => {
  // Refs for each section
  const heroRef = useRef(null);
  const heroSvgRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  const testimonialsRef = useRef(null);
  const testimonialCardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero SVG parallax
    if (heroSvgRef.current) {
      gsap.to(heroSvgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    // Features staggered pop-in
    if (featureCardsRef.current.length) {
      gsap.fromTo(
        featureCardsRef.current,
        { opacity: 0, y: 60, scale: 0.85, rotateZ: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 1.1,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Testimonials staggered pop-in
    if (testimonialCardsRef.current.length) {
      gsap.fromTo(
        testimonialCardsRef.current,
        { opacity: 0, y: 60, scale: 0.85, rotateZ: -8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 1.1,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // CTA section fade+pop
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans relative overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full px-4 pt-24 pb-16 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Powering <span className="text-primary">Growth</span> for Modern SaaS
        </h1>
        <p className="text-lg md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
          All-in-one digital solutions for ambitious brands. Elevate your business with our seamless, secure, and scalable platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link to="/services" className="btn btn-primary text-lg px-8 py-3">Get Started</Link>
          <Link to="/portfolio" className="btn btn-surface text-lg px-8 py-3 border border-primary/30">See Our Work</Link>
        </div>
        {/* Illustration/Icon */}
        <div className="mt-6 mb-2">
          <svg ref={heroSvgRef} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#2B1D4A" stroke="#9146FF" strokeWidth="4" />
            <path d="M40 70L60 50L80 70" stroke="#9146FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="60" cy="60" r="10" fill="#9146FF" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="w-full px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            ref={el => (featureCardsRef.current[i] = el)}
            className="bg-surface rounded-2xl p-6 text-center shadow-lg border border-border"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-text-secondary text-base">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="w-full px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={el => (testimonialCardsRef.current[i] = el)}
              className="bg-surface rounded-2xl p-8 shadow-lg border border-border flex-1"
            >
              <p className="italic text-lg text-text-secondary mb-4">"{t.quote}"</p>
              <p className="font-semibold text-text-primary">{t.name}</p>
              <p className="text-sm text-text-secondary">{t.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="w-full px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Accelerate Your Growth?</h2>
        <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
          Join leading brands who trust Shyara for their digital transformation. Let’s build something amazing together.
        </p>
        <Link to="/contact" className="btn btn-primary text-lg px-10 py-4">Contact Us</Link>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-black py-8 mt-8 text-center text-text-secondary">
        <div className="w-full px-4">
          <p className="mb-2">&copy; {new Date().getFullYear()} Shyara. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <Link to="/portfolio" className="hover:text-primary">Portfolio</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 