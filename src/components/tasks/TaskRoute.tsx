import React, { useState } from "react";
import TaskList from "./TaskList";
import KycVerification from "./KycVerification";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskRouteProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}

const TaskRoute: React.FC<TaskRouteProps> = ({
  isLoggedIn = true,
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}) => {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userAvatar={userAvatar}
        onMenuToggle={() => console.log("Menu toggled")}
      />
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="tasks" className="flex-1">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex-1">
              KYC Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <TaskList isLoggedIn={isLoggedIn} />
          </TabsContent>

          <TabsContent value="kyc">
            <KycVerification isLoggedIn={isLoggedIn} userStatus="not-started" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskRoute;
