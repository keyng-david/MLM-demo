import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-cyan-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 mb-6 border border-emerald-100">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Revolutionizing MLM with Blockchain Technology
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Build Your Network,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
              Earn Crypto
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl">
            ReferralTree combines powerful MLM tools with crypto staking
            rewards, giving you the ultimate platform to grow your business and
            maximize your earnings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 rounded-lg font-medium text-lg shadow-lg shadow-emerald-200/50"
            >
              <Link to="/dashboard">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-6 rounded-lg font-medium text-lg"
            >
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;