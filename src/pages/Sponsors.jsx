import React from "react";
import Hero from "../components/sponsors/Hero";
import SponsorList from "../components/sponsors/SponsorList";

const Sponsors = () => {
  return <div className="relative w-full overflow-hidden" style={{ margin: 0, padding: 0 }}>
    <Hero />
    <SponsorList />
  </div>;
};

export default Sponsors;