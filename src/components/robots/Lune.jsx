import React, { useEffect } from 'react';
import { HashLink } from "react-router-hash-link";
import useScrollReveal from '../../hooks/useScrollReveal';
import '../../assets/styles/main.css';

const Lune = () => {
  useScrollReveal();

  useEffect(() => {
    const elements = document.querySelectorAll('.lune-animate');
    setTimeout(() => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animation-ready');
        }, index * 150);
      });
    }, 200);
  }, []);

  return (
    <section
      id="lune"
      className="relative min-h-screen flex items-center justify-center py-20 md:py-28 overflow-hidden"
      aria-label="Lune Robot Section"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute top-0 left-0 right-0 h-64 bg-sca-purple/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 left-0 h-64 bg-sca-gold/5 blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 lune-animate">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sca-purple to-sca-gold bg-clip-text text-transparent">
                Lune: Our 2025 Robot
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Engineered for the FIRST Robotics Competition REEFSCAPE challenge
            </p>
          </div>

          {/* Robot showcase with modern card style */}
          <div className="modern-card p-8 md:p-12 backdrop-blur-sm lune-animate" style={{ transitionDelay: '0.2s' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Robot image */}
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden border border-sca-gold/20 shadow-neon relative">
                  {/* Placeholder for robot image - replace with actual image when available */}
                  <img 
                    src="/baywatchLogo.png" 
                    alt="Lune - 2025 REEFSCAPE Robot"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-radial from-sca-gold/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-radial from-sca-purple/20 to-transparent rounded-full blur-xl"></div>
              </div>

              {/* Robot description */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Lune: Reaching New Depths</h3>
                
                <p className="text-gray-300">
                  Named after the French word for "moon," Lune represents our team's reach for new heights—or in this case, depths. 
                  Designed for the 2025 REEFSCAPE challenge, Lune combines precision control with innovative mechanisms to navigate 
                  the complex underwater-themed game elements.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                    <h4 className="text-sca-gold font-medium mb-2">Dimensions</h4>
                    <p className="text-sm text-gray-400">27" × 25" × 31"</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                    <h4 className="text-sca-gold font-medium mb-2">Weight</h4>
                    <p className="text-sm text-gray-400">115 lbs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical details */}
            <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-3 gap-6 lune-animate" style={{ transitionDelay: '0.4s' }}>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Drivetrain</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Custom swerve drive system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Dual-motor per module configuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Integrated absolute encoders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Maximum speed: 14 ft/s</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">Reef Collection</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Dual-stage telescoping arm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Pneumatic gripper with compliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Multi-axis wrist mechanism</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Integrated reef detection sensors</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">Electronics & Control</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>REV Robotics control system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Custom vision processing for autonomous</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>Gyroscopic stabilization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sca-gold mr-2">•</span>
                    <span>PID-controlled depth assessment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Competition performance */}
            <div className="mt-12 flex justify-center lune-animate" style={{ transitionDelay: '0.8s' }}>
              <div className="bg-gradient-to-r from-sca-purple/20 to-sca-gold/20 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center max-w-2xl">
                <h4 className="text-xl font-bold text-white mb-2">2025 Season Achievements</h4>
                <p className="text-gray-300 mb-4">
                  Lune led our team to the Championship at the Traverse City District Event, demonstrating exceptional performance throughout qualification and playoff matches.
                </p>
                <div className="inline-flex items-center justify-center gap-2 text-sca-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="font-bold">Traverse City Event Champions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lune;