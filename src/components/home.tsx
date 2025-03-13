import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import SummaryMetrics from "./dashboard/SummaryMetrics";
import BinaryTreeVisualization from "./dashboard/BinaryTreeVisualization";
import TeamManagementTools from "./dashboard/TeamManagementTools";
import PerformanceReports from "./dashboard/PerformanceReports";
import MobileNavigation from "./dashboard/MobileNavigation";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
}

const Home: React.FC<HomeProps> = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedReportTab, setSelectedReportTab] = useState("commissions");

  // Handle member click in the binary tree
  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    console.log("Member clicked:", member);
  };

  // Handle adding a new member
  const handleAddMember = (parentId: string, position: "left" | "right") => {
    console.log(`Adding member to ${parentId} on ${position} side`);
    // In a real implementation, this would open the add member form with pre-filled parent and position
  };

  // Handle contacting a member
  const handleContactMember = (memberId: string) => {
    console.log(`Contacting member ${memberId}`);
    // In a real implementation, this would open contact options
  };

  // Handle viewing a member's downline
  const handleViewDownline = (memberId: string) => {
    console.log(`Viewing downline for member ${memberId}`);
    // In a real implementation, this would focus the tree on that member
  };

  // Handle mobile navigation
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    console.log(`Navigating to ${section}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        onMenuToggle={() => console.log("Menu toggled")}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Summary Metrics */}
        <SummaryMetrics />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Binary Tree Visualization - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 h-[500px]">
            <BinaryTreeVisualization
              onMemberClick={handleMemberClick}
              onAddMember={handleAddMember}
              onContactMember={handleContactMember}
              onViewDownline={handleViewDownline}
            />
          </div>

          {/* Team Management Tools - Takes 1/3 of the space on large screens */}
          <div className="h-[500px]">
            <TeamManagementTools />
          </div>
        </div>

        {/* Performance Reports - Full width */}
        <div className="mt-6">
          <PerformanceReports
            selectedTab={selectedReportTab}
            onTabChange={setSelectedReportTab}
          />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Add padding at the bottom for mobile to account for the navigation bar */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Home;
