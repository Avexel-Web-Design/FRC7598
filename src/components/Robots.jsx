import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import logoImage from "/Logo-nobg-sm.png";

const Robots = () => {
  useScrollReveal();

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-sca-purple to-sca-purple-dark overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-radial from-sca-gold/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-radial from-sca-gold/10 to-transparent"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full border border-sca-gold/10 opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full border border-sca-gold/10 opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6 reveal-fade">
              <div className="w-20 h-20">
                <img src={logoImage} alt="SCA Constellations Logo" className="w-full h-full" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white reveal-bottom">
              Our <span className="text-sca-gold">Robots</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto reveal-bottom">
              Exploring the innovative machines built by our team for the FIRST Robotics Competition.
            </p>
          </div>
        </div>
      </div>

      {/* Current Season Robot Section */}
      <section className="py-20 bg-sca-purple">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal-bottom">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                <span className="text-sca-gold">2025</span> Season Robot
              </h2>
              <div className="w-20 h-1 bg-sca-gold mx-auto"></div>
            </div>
            
            <div className="bg-sca-purple-light/20 rounded-2xl overflow-hidden border border-sca-gold/20 reveal-bottom">
              <div className="grid md:grid-cols-2">
                <div className="aspect-square relative bg-sca-purple-dark/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-center px-4">
                      Current season robot image<br />
                      (Add robot photo here)
                    </p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Stellar Voyager</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Our 2025 competition robot is designed for the CRESCENDO℠ presented by HAAS challenge, combining precision, speed, and adaptability to excel in this season's unique game.
                    </p>
                    <div className="mt-6 space-y-3">
                      <h4 className="text-lg font-bold text-sca-gold">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Advanced vision-guided automation system</li>
                        <li>Precision note scoring mechanism</li>
                        <li>High-speed mecanum drivetrain</li>
                        <li>Expandable riser system for amplification</li>
                        <li>Compact and efficient design</li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <p>
                        <span className="text-sca-gold font-semibold">Top Speed:</span> 15 ft/s
                      </p>
                      <p>
                        <span className="text-sca-gold font-semibold">Weight:</span> 125 lbs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 reveal-left">
                <h4 className="text-xl font-bold text-white mb-4">Design Process</h4>
                <p className="text-gray-300">
                  Our iterative design process involved prototyping multiple mechanisms and extensive CAD work to optimize every aspect of the robot's performance.
                </p>
              </div>
              
              <div className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 reveal-bottom">
                <h4 className="text-xl font-bold text-white mb-4">Programming</h4>
                <p className="text-gray-300">
                  The robot features advanced autonomous routines using a combination of sensor feedback, path planning, and state machines for reliable performance.
                </p>
              </div>
              
              <div className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 reveal-right">
                <h4 className="text-xl font-bold text-white mb-4">Competition Strategy</h4>
                <p className="text-gray-300">
                  Our strategy emphasizes consistent scoring throughout matches, alliance cooperation, and adaptive play based on match conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Robots Section */}
      <section className="py-20 bg-gradient-to-b from-sca-purple to-sca-purple-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 reveal-bottom">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Previous <span className="text-sca-gold">Robots</span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Exploring our team's journey through the years with the robots we've built for each season.
              </p>
            </div>
            
            {/* Previous Robot - 2024 */}
            <div className="mb-20 reveal-bottom">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-white">2024 - Cosmic Explorer</h3>
                <div className="ml-4 h-px bg-sca-gold flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2 aspect-square bg-sca-purple-dark/70 rounded-xl border border-sca-gold/20 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    2024 robot image<br />
                    (Add robot photo here)
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <p className="text-gray-300 mb-4">
                    Built for the CRESCENDO℠ presented by HAAS challenge, Cosmic Explorer featured a unique scoring mechanism optimized for notes and an innovative trap mechanism for the endgame.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Features</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>High-speed swerve drivetrain</li>
                        <li>Dual-stage elevator</li>
                        <li>Automated scoring sequence</li>
                        <li>LED feedback system</li>
                      </ul>
                    </div>
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Achievements</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Semifinalist at Troy District</li>
                        <li>Industrial Design Award</li>
                        <li>Michigan District Championship Qualifier</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Previous Robot - 2023 */}
            <div className="mb-20 reveal-bottom">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-white">2023 - Aurora</h3>
                <div className="ml-4 h-px bg-sca-gold flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2 aspect-square bg-sca-purple-dark/70 rounded-xl border border-sca-gold/20 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    2023 robot image<br />
                    (Add robot photo here)
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <p className="text-gray-300 mb-4">
                    Aurora competed in the FIRST CHARGED UP℠ presented by Qualcomm challenge, featuring a balanced design capable of manipulating game pieces and traversing the charging station.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Features</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Tank drivetrain</li>
                        <li>Extendable arm mechanism</li>
                        <li>Auto-balancing capabilities</li>
                        <li>Multi-level scoring</li>
                      </ul>
                    </div>
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Achievements</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Quarter-finalist at Southfield District</li>
                        <li>Autonomous Award</li>
                        <li>Team Spirit Award</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Previous Robot - 2022 */}
            <div className="reveal-bottom">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-white">2022 - Celestial</h3>
                <div className="ml-4 h-px bg-sca-gold flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2 aspect-square bg-sca-purple-dark/70 rounded-xl border border-sca-gold/20 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    2022 robot image<br />
                    (Add robot photo here)
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <p className="text-gray-300 mb-4">
                    Celestial was our team's entry for the FIRST RAPID REACT℠ presented by Boeing challenge, designed to score cargo into upper and lower hubs and climb the hanging bar.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Features</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Six-wheel drive</li>
                        <li>Pneumatic cargo manipulator</li>
                        <li>Two-stage climbing mechanism</li>
                        <li>Vision-guided targeting</li>
                      </ul>
                    </div>
                    <div className="bg-sca-purple-light/20 rounded-lg p-4 border border-sca-gold/10">
                      <h4 className="text-lg font-semibold text-sca-gold mb-2">Achievements</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Rookie All-Star Award</li>
                        <li>Highest Rookie Seed</li>
                        <li>Safety Award</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Resources Section */}
      <section className="py-20 bg-sca-purple">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white reveal-bottom">
              Technical <span className="text-sca-gold">Resources</span>
            </h2>
            <p className="text-gray-300 mb-12 max-w-3xl mx-auto reveal-bottom">
              We're committed to sharing knowledge and resources with the FIRST community. 
              Check out our technical documentation and CAD models.
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 reveal-bottom">
              <a href="#" className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 hover:bg-sca-purple-light/50 transition-all duration-300">
                <div className="w-12 h-12 bg-sca-gold/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sca-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Technical Documents</h3>
                <p className="text-gray-300">Access our design documentation, build logs, and technical analyses.</p>
              </a>
              
              <a href="#" className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 hover:bg-sca-purple-light/50 transition-all duration-300">
                <div className="w-12 h-12 bg-sca-gold/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sca-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Code Repository</h3>
                <p className="text-gray-300">Explore our robot code, including autonomous routines and control systems.</p>
              </a>
              
              <a href="#" className="bg-sca-purple-light/30 backdrop-blur-sm rounded-xl border border-sca-gold/10 p-6 hover:bg-sca-purple-light/50 transition-all duration-300">
                <div className="w-12 h-12 bg-sca-gold/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sca-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">CAD Models</h3>
                <p className="text-gray-300">Download 3D models of our robot designs and mechanical components.</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-t from-sca-purple to-sca-purple-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-sca-purple-dark p-10 rounded-xl border border-sca-gold/20 text-center reveal-bottom">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Interested in <span className="text-sca-gold">Robotics</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Want to learn more about our robots or get involved with our team? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/contact"
                className="px-8 py-3 bg-sca-gold text-sca-purple-dark font-bold rounded-full hover:bg-sca-gold-light hover:scale-105 transition-all duration-300"
              >
                Contact Our Team
              </a>
              <a 
                href="/team"
                className="px-8 py-3 border-2 border-sca-gold text-sca-gold font-bold rounded-full hover:bg-sca-gold/10 hover:scale-105 transition-all duration-300"
              >
                Meet Our Members
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Robots;