import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
const Channels = lazy(() => import("./pages/Channels"));
const DirectMessages = lazy(() => import("./pages/DirectMessages"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Planner = lazy(() => import("./pages/Planner"));
const Profile = lazy(() => import("./pages/Profile"));
import DashboardSidebar from './components/dashboard/DashboardSidebar';
import MobileDashboardNav from './components/dashboard/MobileDashboardNav';

// Enhanced loading component with animation
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-sca-purple">
    <Loader />
  </div>
);

// Layout for public site pages (has Navbar + Footer)
const SiteLayout = () => (
  <div className="relative bg-gradient-to-b from-sca-purple-dark via-sca-purple to-sca-purple-dark text-white overflow-x-hidden min-h-screen">
    <ParticleBackground />
    <div className="sticky top-0 z-50">
      <Navbar />
    </div>
    <main className="relative pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Layout for dashboard pages (no Navbar/Footer)
const DashboardLayout = () => (
  <div className="h-screen bg-black text-white flex overflow-hidden">
    <DashboardSidebar />
    <main className="flex-1 min-h-0 pb-16 md:pb-0 flex flex-col overflow-hidden">
      <Outlet />
    </main>
    <MobileDashboardNav />
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
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public site routes (with Navbar/Footer) */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/robots" element={<Robots />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* Dashboard routes (no Navbar/Footer) */}
        <Route element={<DashboardLayout />}>
          <Route path="/channels" element={<Channels />} />
          <Route path="/messages" element={<DirectMessages />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          {/* Future dashboard pages can be added here */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
