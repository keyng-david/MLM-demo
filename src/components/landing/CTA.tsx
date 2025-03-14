import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-3xl mx-auto">
          Ready to Transform Your MLM Business with Blockchain Technology?
        </h2>

        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
          Join thousands of successful network marketers who are growing their
          business and earning passive income with ReferralTree.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-6 rounded-lg font-medium text-lg shadow-lg shadow-emerald-900/20"
          >
            <Link to="/dashboard">
                <> {/* Fragment added */}
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
                </>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-300 text-white hover:bg-emerald-500 px-8 py-6 rounded-lg font-medium text-lg"
          >
            <Link to="/#pricing">  {/* Changed to Link */}
                <> {/* Fragment added */}
                  View Pricing
                </>
              </Link>
          </Button>
        </div>

        <p className="text-emerald-200 mt-6">
          No credit card required. Free plan available forever.
        </p>
      </div>
    </div>
  );
};

export default CTA;