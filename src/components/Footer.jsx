// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "/Logo-nobg-sm.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent py-8 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <img src={logoImage} alt="SCA Constellations Logo" className="w-12 h-12 mr-2" />
          <h3 className="text-xl font-bold">SCA Constellations</h3>
        </div>
        <div className="flex space-x-4 mb-4">
          <Link to="/" className="text-gray-300 hover:text-sca-gold transition-colors">Home</Link>
          <Link to="/team" className="text-gray-300 hover:text-sca-gold transition-colors">Team</Link>
          <Link to="/sponsors" className="text-gray-300 hover:text-sca-gold transition-colors">Sponsors</Link>
          <Link to="/contact" className="text-gray-300 hover:text-sca-gold transition-colors">Contact</Link>
        </div>
        <p className="text-gray-400 text-sm">&copy; {currentYear} SCA Constellations. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
