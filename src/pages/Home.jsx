import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Contact from "../components/home/Contact";

const Home = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Hero section */}
      <Hero />
      
      {/* About section */}
      <About />
      
      {/* Contact section */}
      <Contact />

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
      </div>
    </div>
  );
};

export default Home;