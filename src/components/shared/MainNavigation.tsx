import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, Users, LogIn } from "lucide-react";

const MainNavigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center space-x-4">
      <Link to="/">
        <Button
          variant={isActive("/") ? "default" : "ghost"}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button
          variant={isActive("/dashboard") ? "default" : "ghost"}
          className="flex items-center gap-2"
        >
          <BarChart2 className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link to="/team">
        <Button
          variant={isActive("/team") ? "default" : "ghost"}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Team
        </Button>
      </Link>
    </nav>
  );
};

export default MainNavigation;