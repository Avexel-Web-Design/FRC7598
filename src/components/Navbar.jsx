import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
// Import the logo images
import logoImage from "/Logo-nobg-sm.png";
import scaLogo from "/SCA.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  
  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Robots", path: "/robots" },
    { name: "Team", path: "/team" },
    { name: "Outreach", path: "/outreach" },
    { name: "Sponsors", path: "/sponsors" },
  ];

  // Check if path is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname === path;
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full z-50 glass-morphism-nav backdrop-blur-md border-b border-sca-gold/10"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            ref={navRef}
            className="flex items-center justify-between py-4"
          >
            {/* Logo with modern hover effect */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center">
                <div className="relative w-16 h-16 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-glow">
                  <img
                    src={logoImage}
                    alt="SCA Constellations"
                    className="relative w-full h-full drop-shadow-md"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with modern pill buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-sca-gold to-sca-gold-light text-sca-purple-dark shadow-md"
                      : "text-white hover:bg-white/10 hover:shadow-sm border border-transparent hover:border-sca-gold/30"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button with improved animation */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  document.body.style.overflow = !menuOpen ? "hidden" : "";
                }}
                className={`p-2 text-white rounded-full transition-all duration-300 ${
                  menuOpen ? "bg-sca-gold text-sca-purple" : "hover:bg-white/10 border border-transparent hover:border-sca-gold/30"
                }`}
                aria-label="Toggle mobile menu"
              >
                {!menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        closeMenu={closeMenu}
        links={navLinks}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Navbar;
