import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import StakingInfo from "./StakingInfo";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <StakingInfo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;