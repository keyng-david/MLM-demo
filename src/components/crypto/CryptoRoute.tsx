import React, { useState } from "react";
import CryptoStakingDashboard from "./CryptoStakingDashboard";

interface CryptoRouteProps {
  isLoggedIn?: boolean;
}

const CryptoRoute: React.FC<CryptoRouteProps> = ({ isLoggedIn = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CryptoStakingDashboard isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default CryptoRoute;
