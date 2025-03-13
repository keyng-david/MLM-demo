import React, { useState } from "react";
import { Home, Users, BarChart2, Settings, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MobileNavigationProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  onNavigate = () => {},
  activeSection = "dashboard",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "team", label: "Team", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-2">
        {navigationItems.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="icon"
                  onClick={() => handleNavigate(item.id)}
                  className={`rounded-full ${activeSection === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <item.icon size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full text-muted-foreground"
              >
                <Menu size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>More Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {isMenuOpen && (
        <div className="absolute bottom-full left-0 right-0 bg-background border-t border-border p-4 shadow-lg animate-in slide-in-from-bottom-5">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleNavigate("profile")}
            >
              Profile
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleNavigate("notifications")}
            >
              Notifications
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleNavigate("help")}
            >
              Help & Support
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleNavigate("logout")}
            >
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Swipe indicator */}
      <div className="flex justify-center py-1">
        <div className="w-10 h-1 rounded-full bg-muted"></div>
      </div>
    </div>
  );
};

export default MobileNavigation;
