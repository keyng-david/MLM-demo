import React from "react";
import { ArrowUpRight, TrendingUp, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const StakingInfo = () => {
  return (
    <div className="relative overflow-hidden py-24">
      {/* Creative background with animated particles */}
      <div className="absolute inset-0 bg-slate-900 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-800/50 text-emerald-100 mb-6 backdrop-blur-sm border border-emerald-700/30">
              <TrendingUp className="mr-2 h-4 w-4" />
              Earn While You Build
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Supercharge Your Earnings With Crypto Staking
            </h2>

            <p className="text-lg text-emerald-100 mb-8">
              Don't let your commissions sit idle. Stake your earnings in our
              secure crypto pool and watch your wealth grow with
              industry-leading APY rates while you continue building your
              network.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="backdrop-blur-md bg-emerald-900/30 rounded-lg p-6 border border-emerald-700/20 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-bold">15%</div>
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    APY
                  </div>
                </div>
                <div className="text-sm text-emerald-200">Premium Tier</div>
              </div>

              <div className="backdrop-blur-md bg-teal-900/30 rounded-lg p-6 border border-teal-700/20 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-bold">10%</div>
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    APY
                  </div>
                </div>
                <div className="text-sm text-teal-200">Standard Tier</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                Learn More About Staking
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg blur-lg opacity-30 animate-pulse"></div>
            <div className="relative backdrop-blur-md bg-slate-800/40 rounded-lg p-8 border border-slate-700/50 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Staking Dashboard</h3>
                <Lock className="h-5 w-5 text-emerald-300" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Staked</span>
                    <span className="font-medium">12,500 USDT</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full animate-pulse"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Earned Rewards</span>
                    <span className="font-medium">1,875 USDT</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-emerald-300">Current APY</div>
                    <div className="text-xl font-bold">15.0%</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-emerald-300">Next Reward</div>
                    <div className="text-sm font-medium">In 2 days</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4 bg-slate-700/30 backdrop-blur-sm p-3 rounded-lg border border-slate-600/20">
                  <Shield className="h-5 w-5 text-emerald-300 mr-2" />
                  <span className="text-sm text-emerald-200">
                    Secured by industry-leading protocols
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInfo;