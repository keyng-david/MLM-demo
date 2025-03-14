import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, BarChart2, DollarSign } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Grow Your Network with{" "}
            <span className="text-blue-600">ReferralTree</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            The most powerful binary MLM platform to build, manage, and grow
            your referral business with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ReferralTree?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-10 w-10 text-blue-500" />}
            title="Team Management"
            description="Easily manage your downline with our interactive binary tree visualization."
          />
          <FeatureCard
            icon={<BarChart2 className="h-10 w-10 text-green-500" />}
            title="Performance Analytics"
            description="Track your team's growth and performance with detailed reports and insights."
          />
          <FeatureCard
            icon={<DollarSign className="h-10 w-10 text-yellow-500" />}
            title="Commission Tracking"
            description="Monitor your earnings and commissions in real-time with detailed breakdowns."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Growing Your Network?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of successful entrepreneurs who are building their
            business with ReferralTree.
          </p>
          <Button size="lg" variant="secondary" className="px-8 gap-2">
            Sign Up Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">
            ReferralTree
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} ReferralTree. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
