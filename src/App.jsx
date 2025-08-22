import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import "./assets/styles/main.css";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ParticleBackground from "./components/ParticleBackground";

// Lazy load page components for better performance
const Home = lazy(() => import("./pages/Home"));
const Robots = lazy(() => import("./pages/Robots"));
const Team = lazy(() => import("./pages/Team"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Photos = lazy(() => import("./pages/Photos"));
const Login = lazy(() => import("./pages/Login"));

// Enhanced loading component with animation
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-sca-purple">
    <Loader />
  </div>
);

function App() {
  // Initialize scroll reveal animations when the page loads
  useEffect(() => {
    // Function to reveal elements as they enter the viewport
    const revealElements = () => {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
      
      // Also handle staggered reveals
      const staggeredElements = document.querySelectorAll(".stagger-reveal");
      staggeredElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };
    
    // Run once on load
    revealElements();
    
    // Add scroll event listener
    window.addEventListener("scroll", revealElements);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", revealElements);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-sca-purple-dark via-sca-purple to-sca-purple-dark text-white overflow-x-hidden min-h-screen">
      {/* Animated background particles */}
      <ParticleBackground />
      
      {/* Modern floating navbar with glass effect */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="relative pt-16">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/robots" element={<Robots />} />
            <Route path="/team" element={<Team />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </main>

      {/* Simplified footer with transparent background */}
      <Footer />
    </div>
  );
}

export default App;
