import React, { useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import useScrollReveal from "../../hooks/useScrollReveal";

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
      className="relative min-h-[70vh] w-full flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:pt-16 pb-4 sm:pb-6 hero-animate"
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
      {/* Centered content with team focus */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 mt-48">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5 sm:mb-6 tracking-tight leading-tight">
          <span className="block bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent hero-animate" style={{ transitionDelay: '0.3s' }}>
              Our Sponsors
            </span>
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto hero-animate" style={{ transitionDelay: '0.4s' }}>
          Thank you to all of our amazing sponsors for supporting our journey and helping us achieve greatness!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
