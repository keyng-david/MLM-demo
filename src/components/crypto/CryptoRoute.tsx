import React, { useState } from "react";
import CryptoStakingDashboard from "./CryptoStakingDashboard";
import DashboardHeader from "../dashboard/DashboardHeader";

interface CryptoRouteProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const CryptoRoute: React.FC<CryptoRouteProps> = ({
  isLoggedIn = true,
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        onMenuToggle={() => console.log("Menu toggled")}
      />
      <CryptoStakingDashboard isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default CryptoRoute;
