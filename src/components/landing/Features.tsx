//src/components/landing/Features.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart2,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom"; 

const features = [
  {
    icon: <BarChart2 className="h-10 w-10 text-emerald-500" />,
    title: "Interactive Binary Tree",
    description:
      "Visualize your entire downline with our intuitive binary tree interface. Drag, zoom, and explore your network with ease.",
  },
  {
    icon: <Users className="h-10 w-10 text-teal-500" />,
    title: "Team Management",
    description:
      "Add new members, balance your legs, and optimize your team structure with powerful management tools.",
  },
  {
    icon: <Zap className="h-10 w-10 text-cyan-500" />,
    title: "Crypto Staking",
    description:
      "Earn passive income on your commissions with our secure crypto staking pool, offering up to 15% APY.",
  },
  {
    icon: <Shield className="h-10 w-10 text-emerald-500" />,
    title: "Secure Platform",
    description:
      "Enterprise-grade security with encrypted data storage and blockchain verification for all transactions.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-teal-500" />,
    title: "Performance Analytics",
    description:
      "Track your growth, commissions, and team balance with detailed reports and actionable insights.",
  },
  {
    icon: <Layers className="h-10 w-10 text-cyan-500" />,
    title: "Multi-Level Tracking",
    description:
      "Monitor performance across all levels of your organization with detailed breakdowns by rank and activity.",
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Tools for Network Marketers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build, manage, and grow your MLM business
            with blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            asChild  // Add asChild here
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            <Link to="/#pricing">  {/* Corrected to use Link */}
            <>
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;