import React, { useEffect } from 'react';
import { HashLink } from "react-router-hash-link";
import useScrollReveal from '../../hooks/useScrollReveal';
import '../../assets/styles/main.css';

const Hero = () => {
  useScrollReveal();

  useEffect(() => {
    const heroElements = document.querySelectorAll('.hero-animate');
    setTimeout(() => {
      heroElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animation-ready');
        }, index * 150);
      });
    }, 200);
  }, []);

  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-28 pb-8 sm:pb-12 hero-animate robots-hero"
      aria-label="Robots Hero"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#471a67]/30 via-[#471a67]/20 to-[#471a67]/30 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(71,26,103,0.25),transparent_50%)]"></div>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 hero-animate" style={{ transitionDelay: '0.3s' }}>
          <span className="bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent">
            Our Robotics Showcase
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 hero-animate" style={{ transitionDelay: '0.4s' }}>
          Experience the fusion of technology and design with our outstanding robots.
        </p>
        <div className="flex justify-center gap-4 hero-animate" style={{ transitionDelay: '0.5s' }}>
          <HashLink smooth to="#lune" className="btn-modern px-6 py-3 bg-white/10 border border-[#d3b840]/50 rounded-full text-white">
            Discover Lune
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
