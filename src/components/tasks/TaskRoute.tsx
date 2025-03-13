import React, { useState } from "react";
import TaskList from "./TaskList";
import KycVerification from "./KycVerification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskRouteProps {
  isLoggedIn?: boolean;
}

const TaskRoute: React.FC<TaskRouteProps> = ({ isLoggedIn = true }) => {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="min-h-screen bg-gray-50">
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
