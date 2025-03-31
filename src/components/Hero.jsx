import React, { useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import useScrollReveal from "../hooks/useScrollReveal";

const Hero = () => {
  useScrollReveal();

  // Add additional animation for hero elements
  useEffect(() => {
    const heroElements = document.querySelectorAll('.hero-animate');
    
    // Add a slight delay before starting animations
    setTimeout(() => {
      heroElements.forEach((element, index) => {
        // Staggered animation
        setTimeout(() => {
          element.classList.add('animation-ready');
        }, index * 150);
      });
    }, 200);
  }, []);

  return (
    <section
      className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-28 pb-8 sm:pb-12"
      aria-label="Hero section"
      style={{ 
        margin: 0,
        padding: 0,
        border: 'none',
        outline: 'none',
        width: '100vw',
        maxWidth: '100%'
      }}
    >
      {/* Advanced space-themed animated background with SCA colors */}
      <div className="absolute inset-0" style={{ width: '100vw', left: 0, right: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#471a67]/30 via-[#471a67]/20 to-[#471a67]/30 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(71,26,103,0.25),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(211,184,64,0.25),transparent_50%)]"></div>
        
        {/* Star field effect */}
        <div className="stars-bg"></div>
        
        {/* Animated orbital rings - removing borders */}
        <div className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-[10%] rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute inset-[20%] rounded-full animate-spin-slow" style={{ animationDuration: '80s' }}></div>
          <div className="absolute inset-[30%] rounded-full animate-spin-slow-reverse" style={{ animationDuration: '60s' }}></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-radial from-[#d3b840]/20 to-transparent rounded-full filter blur-xl animate-float-up-down"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-gradient-radial from-[#471a67]/20 to-transparent rounded-full filter blur-xl animate-float-up-down" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Centered content with team focus */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Team Logo with enhanced animation */}
          <div className="mb-6 flex justify-center hero-animate" style={{ transitionDelay: '0.1s' }}>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#471a67]/40 to-[#d3b840]/40 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
              <img 
                src="/Logo-nobg-sm.png" 
                alt="SCA Constellations Logo" 
                className="h-24 md:h-32 w-auto relative drop-shadow-glow-lg"
              />
            </div>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
          <span className="block bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent hero-animate" style={{ transitionDelay: '0.3s' }}>
              FRC Team 7598
            </span>
            <span className="block bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent hero-animate" style={{ transitionDelay: '0.3s' }}>
              SCA Constellations
            </span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto hero-animate" style={{ transitionDelay: '0.4s' }}>
            An all-girls high school robotics team from St. Catherine of Siena Academy in Wixom, Michigan.
            Building tomorrow's innovators through robotics, teamwork, and 
            hands-on engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 hero-animate" style={{ transitionDelay: '0.5s' }}>
            <HashLink
              smooth
              to="#about"
              className="btn-modern w-full sm:w-auto px-6 xs:px-8 sm:px-10 py-3 sm:py-4 text-white"
            >
              <span>About Our Team</span>
            </HashLink>

            <HashLink
              smooth
              to="robots"
              className="w-full sm:w-auto px-6 xs:px-8 sm:px-10 py-3 sm:py-4 bg-white/10 border border-[#d3b840]/50 rounded-full text-white font-semibold hover:bg-white/15 hover:border-[#d3b840] transition-all duration-300 mt-3 sm:mt-0 backdrop-blur-sm"
            >
              See Our Robots
            </HashLink>
          </div>
        </div>
      </div>

      {/* Enhanced mobile-friendly scroll indicator */}
      <div
        className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-0 w-full flex justify-center animate-bounce-slow hero-animate"
        aria-hidden="true"
        style={{ transitionDelay: '0.6s' }}
      >
        <HashLink
          smooth
          to="#about"
          aria-label="Scroll down"
          className="text-[#d3b840]/70 hover:text-[#d3b840] transition-colors p-2"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-[#d3b840]/20 rounded-full blur-md opacity-50"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-7 sm:w-7 relative"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </HashLink>
      </div>

      {/* Modern gradient transition to the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
