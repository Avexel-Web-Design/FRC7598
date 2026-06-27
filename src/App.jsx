import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import "./assets/styles/main.css";
import Footer from "./components/Footer";
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
const Impact = lazy(() => import("./pages/Impact"));
const DashboardSidebar = lazy(() => import('./components/dashboard/DashboardSidebar'));
const MobileDashboardNav = lazy(() => import('./components/dashboard/MobileDashboardNav'));

// No route loading screen: keep navigation feeling instant instead of showing a spinner.
const PageLoading = () => null;

// Layout for public site pages (has Navbar + Footer)
const SiteLayout = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    // If host resets path to '/', bounce back to last dashboard page if user has a saved session
    if (loc.pathname === '/') {
      try {
        const saved = localStorage.getItem('frc7598_last_dashboard_route');
        const auth = localStorage.getItem('frc7598_auth');
        const isDash = saved && (saved.startsWith('/channels') || saved.startsWith('/messages') || saved.startsWith('/calendar') || saved.startsWith('/planner') || saved.startsWith('/profile') || saved.startsWith('/admin'));
        if (auth && isDash) navigate(saved, { replace: true });
      } catch {}
    }
  }, [loc.pathname, navigate]);
  const isImpact = loc.pathname === '/impact';
  const hasNavbar = !isImpact;
  return (
    <div className={`relative text-white overflow-x-hidden min-h-screen min-h-lvh ${isImpact ? 'bg-black' : 'bg-gradient-to-b from-sca-purple-dark via-sca-purple to-sca-purple-dark'}`}>
      {!isImpact && <ParticleBackground />}
      {hasNavbar && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <main className={`relative ${hasNavbar ? 'pt-24 md:pt-28' : 'pt-0'}`}>
        <Outlet />
      </main>
      {!isImpact && <Footer />}
    </div>
  );
};

// Layout for dashboard pages (no Navbar/Footer)
const DashboardLayout = () => {
  // On first mount, if path is a dashboard path and we have a saved subpath, navigate there.
  useEffect(() => {
    const saved = localStorage.getItem('frc7598_last_dashboard_route');
    const p = window.location.pathname;
    const isDash = p.startsWith('/channels') || p.startsWith('/messages') || p.startsWith('/calendar') || p.startsWith('/planner') || p.startsWith('/profile') || p.startsWith('/admin');
    if (isDash && saved && saved !== p) {
      // replace to avoid history spam on reload
      window.history.replaceState(null, '', saved);
    }
  }, []);
  return (
  <div className="h-screen bg-black text-white flex overflow-hidden max-w-[100vw]">
      <DashboardSidebar />
      <main className="flex-1 min-h-0 min-w-0 pb-16 md:pb-0 flex flex-col overflow-hidden">
        <Outlet />
      </main>
      <MobileDashboardNav />
    </div>
  );
};

function App() {
  // Initialize scroll reveal animations without per-scroll layout work
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .stagger-reveal");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -120px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
          <Route path="/impact" element={<Impact />} />
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
