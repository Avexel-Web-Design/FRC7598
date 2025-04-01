import React from "react";
import { HashLink } from "react-router-hash-link";
import useScrollReveal from "../../hooks/useScrollReveal";

// Placeholder image for sponsor logos - replace with actual sponsor logos
const placeholderImage = "/Logo-nobg-sm.png";

const Sponsors = () => {
  useScrollReveal();

  // Define sponsors as a flat list
  const sponsors = [
    { name: "Superb Fabricating LLC", logo: "/SuperbFabricating.png" },
    { name: "Special T's Packaging", logo: "/SpecialTs.png" },
    { name: "SW Machines North America", logo: "/SW.png" },
    { name: "FIRST in Michigan", logo: "/FIRST.png" },
    { name: "Gene Haas Foundation", logo: "/HAAS.png" },
    { name: "Autodesk", logo: "/Autodesk.png" },
    { name: "Toyota4Good", logo: "/Toyota.png" },
    { name: "Pratt and Miller", logo: "/PrattMiller.png" },
    { name: "Michigan Council of Women in Technology Foundation", logo: "/MCWT.png" },
    { name: "Kettering/GMI Alumni Association", logo: "/Kettering.png" },
    { name: "Avexel", logo: "/Avexel.png" }
  ];

  return (
    <section
      id="sponsors"
      className="relative py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Become a sponsor CTA */}
          <div className="mt-24 reveal-bottom">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Become a Sponsor</h3>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Partner with Team 7598 and make a lasting impact on STEM education while gaining visibility 
                  for your organization. Your support helps us inspire the next generation of innovators and engineers.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <SponsorshipOption 
                  title="Financial Support"
                  description="Direct funding to help with registration fees, parts, travel expenses, and other operational costs."
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  } 
                />
                <SponsorshipOption 
                  title="Material Donations" 
                  description="Contribute tools, equipment, parts, software, or other items that our team can use to build and compete."
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  } 
                />
                <SponsorshipOption 
                  title="Mentorship" 
                  description="Share your expertise by mentoring students in engineering, programming, business, or other valuable skills."
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  } 
                />
              </div>

              <div className="mt-10 text-center">
                <HashLink 
                  to="/#contact"
                  className="btn-modern w-full sm:w-auto px-6 xs:px-8 sm:px-10 py-3 sm:py-4 text-white font-bold transition-all duration-300"
                >
                  Sponsor Us
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SponsorshipOption = ({ title, description, icon }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center text-center">
    <div className="text-purple-400 mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default Sponsors;