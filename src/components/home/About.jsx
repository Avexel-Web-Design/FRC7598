import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const About = () => {
  useScrollReveal();

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#471a67]/20 via-[#471a67]/30 to-[#471a67]/10"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header with staggered reveal animation */}
          <div className="text-center mb-16 stagger-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent">
                About Our Team
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Team 7598, the SCA Constellations, is an all-girls robotics team from St. Catherine of Siena Academy in Wixom, Michigan - 
              we're a community of future innovators, engineers, and leaders.
            </p>
          </div>

          {/* School and team logo section with modernized styling */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16 reveal">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full glass-panel backdrop-blur-sm shadow-neon p-2 transform hover:scale-105 transition-all duration-500">
                <img 
                  src="/SCA.png" 
                  alt="St. Catherine of Siena Academy Logo" 
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full glass-panel backdrop-blur-sm shadow-neon p-2 transform hover:scale-105 transition-all duration-500">
                <img 
                  src="/Logo.png" 
                  alt="SCA Constellations Team Logo" 
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Content grid with modernized cards */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Mission with modern card styling */}
            <div className="reveal">
              <div className="modern-card p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Our Mission</h3>
                
                <p className="mb-4 text-gray-300">
                  The SCA Constellations aims to inspire students in science, technology, 
                  engineering, and mathematics while building essential skills like 
                  teamwork, leadership, and problem-solving.
                </p>
                
                <p className="text-gray-300">
                  Through participation in FIRST Robotics Competition, we provide hands-on 
                  experience in designing, building, and programming robots, preparing 
                  students for future careers in STEM fields.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#471a67]/40 to-[#471a67]/20 rounded-full text-sm text-[#d3b840] border border-[#d3b840]/20">Innovation</span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#471a67]/40 to-[#471a67]/20 rounded-full text-sm text-[#d3b840] border border-[#d3b840]/20">Teamwork</span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#471a67]/40 to-[#471a67]/20 rounded-full text-sm text-[#d3b840] border border-[#d3b840]/20">Excellence</span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#471a67]/40 to-[#471a67]/20 rounded-full text-sm text-[#d3b840] border border-[#d3b840]/20">Gracious Professionalism</span>
                </div>
              </div>
            </div>

            {/* Right side - History with modern timeline */}
            <div className="reveal">
              <div className="modern-card p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Our Journey</h3>
                
                <div className="space-y-6 relative">
                  {/* Timeline connecting line */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#d3b840] via-[#d3b840]/50 to-[#d3b840]/20"></div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center shadow-neon z-10">
                      <span className="font-bold text-[#d3b840]">2019</span>
                    </div>
                    <div className="ml-6 transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white">Team Founding</h4>
                      <p className="text-sm text-gray-400">Established as the first FRC team at our school</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center shadow-neon z-10">
                      <span className="font-bold text-[#d3b840]">2020</span>
                    </div>
                    <div className="ml-6 transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white">Rookie Season</h4>
                      <p className="text-sm text-gray-400">Completed our first competition robot</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center shadow-neon z-10">
                      <span className="font-bold text-[#d3b840]">2023</span>
                    </div>
                    <div className="ml-6 transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white">Regional Competitors</h4>
                      <p className="text-sm text-gray-400">Advanced to the regional championship</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center shadow-neon z-10">
                      <span className="font-bold text-[#d3b840]">2025</span>
                    </div>
                    <div className="ml-6 transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white">New Horizons</h4>
                      <p className="text-sm text-gray-400">Expanding our team and reaching for the stars</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FIRST Values with modern glass panel styling */}
          <div className="mt-16 py-8 px-6 md:px-10 glass-panel rounded-2xl gradient-border reveal">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient">FIRST Core Values</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard 
                title="Discovery"
                description="We explore new skills and ideas."
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              />
              <ValueCard 
                title="Innovation"
                description="We use creativity to solve problems."
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
              />
              <ValueCard 
                title="Impact"
                description="We apply what we learn to improve the world."
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              />
              <ValueCard 
                title="Teamwork"
                description="We are stronger when we work together."
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modern decorative elements */}
      <div 
        className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-radial from-[#471a67]/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-radial from-[#d3b840]/10 to-transparent rounded-full filter blur-3xl animate-pulse-slow" 
        aria-hidden="true" 
        style={{animationDelay: '2s'}}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-gradient-radial from-[#471a67]/5 to-transparent rounded-full filter blur-3xl animate-pulse-slow" 
        aria-hidden="true"
        style={{animationDelay: '3s'}}
      ></div>
    </section>
  );
};

const ValueCard = ({ title, description, icon }) => (
  <div className="glass-panel p-6 rounded-xl hover:shadow-neon transition-all duration-300 hover:transform hover:scale-105">
    <div className="text-[#d3b840] mb-4">{icon}</div>
    <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default About;
