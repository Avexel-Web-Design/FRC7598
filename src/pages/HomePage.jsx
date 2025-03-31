import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Hero section */}
      <Hero />
      
      {/* About section */}
      <About />
      
      {/* Contact section */}
      <Contact />
    </div>
  );
};

export default HomePage;