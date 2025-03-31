import React from "react";
import { Link } from "react-router-dom";
import logoImage from "/Logo-nobg-sm.png";

const MobileMenu = ({ isOpen, closeMenu, links, currentPath }) => {
  // Check if path is active
  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    return currentPath === path;
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeMenu}
      ></div>

      {/* Menu content */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-sm bg-sca-purple shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b border-sca-gold/30">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3">
              <img src={logoImage} alt="SCA Constellations" className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">SCA Constellations</h2>
              <p className="text-xs text-sca-gold">FRC Team 7598</p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 text-white/80 hover:text-white"
            aria-label="Close menu"
          >
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
          </button>
        </div>

        {/* Menu items */}
        <div className="pt-6 pb-12 px-6">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-sca-gold text-sca-purple font-medium"
                    : "text-white hover:bg-sca-purple-light"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Team info */}
          <div className="mt-10 pt-6 border-t border-sca-gold/20">
            <p className="text-white/80 text-sm">
              All-girls robotics team from St. Catherine of Siena Academy
            </p>
            <p className="text-white/60 text-xs mt-2">
              Wixom, Michigan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
