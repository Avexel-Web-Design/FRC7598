import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

// Function to get correct asset path
const getAssetPath = (path) => {
  return new URL(`/public/${path}`, import.meta.url).href;
};

// Placeholder image for sponsor logos - replace with actual sponsor logos
const placeholderImage = getAssetPath("Logo-nobg-sm.png");

const Sponsors = () => {
  useScrollReveal();

  // Define sponsors as a flat list
  const sponsors = [
    { name: "Superb Fabricating LLC", logo: getAssetPath("SuperbFabricating.png") },
    { name: "Special T's Packaging", logo: getAssetPath("SpecialTs.png") },
    { name: "SW Machines North America", logo: getAssetPath("SW.png") },
    { name: "FIRST in Michigan", logo: getAssetPath("FIRST.png") },
    { name: "Gene Haas Foundation", logo: getAssetPath("HAAS.png") },
    { name: "Autodesk", logo: getAssetPath("Autodesk.png") },
    { name: "Toyota4Good", logo: getAssetPath("Toyota.png") },
    { name: "Pratt and Miller", logo: getAssetPath("PrattMiller.png") },
    { name: "Michigan Council of Women in Technology Foundation", logo: getAssetPath("MCWT.png") },
    { name: "Kettering/GMI Alumni Association", logo: getAssetPath("Kettering.png") },
    { name: "Avexel", logo: getAssetPath("Avexel.png") }
  ];

  return (
    <section
      id="sponsors"
      className="relative py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Sponsors section */}
          <div className="reveal-bottom">            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {sponsors.map((sponsor, i) => (
                <div 
                  key={i}
                  className="p-6 bg-gradient-to-b from-purple-600/10 to-blue-600/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center"
                >
                  <div className="h-28 w-full flex items-center justify-center mb-4">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <h4 className="text-base font-medium text-center text-white">
                    {sponsor.name}
                  </h4>
                </div>
              ))}
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