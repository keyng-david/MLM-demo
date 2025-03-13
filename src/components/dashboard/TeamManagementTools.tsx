import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, BarChart2 } from "lucide-react";
import AddMemberForm from "./AddMemberForm";
import TeamBalanceTools from "./TeamBalanceTools";

interface TeamManagementToolsProps {
  className?: string;
}

const TeamManagementTools: React.FC<TeamManagementToolsProps> = ({
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState("add-member");

  const handleAddMember = (values: any) => {
    // In a real implementation, this would send data to the server
    console.log("New member added:", values);
    // Could trigger a refresh of the binary tree visualization
  };

  const handleApplySuggestions = () => {
    // In a real implementation, this would apply the suggested changes
    console.log("Applied team balance suggestions");
    // Could trigger a refresh of the binary tree visualization
  };

  return (
    <Card className={`w-full h-full bg-white shadow-sm ${className}`}>
      <CardContent className="p-0">
        <Tabs
          defaultValue="add-member"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="add-member" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Member
            </TabsTrigger>
            <TabsTrigger
              value="team-balance"
              className="flex items-center gap-2"
            >
              <BarChart2 className="h-4 w-4" />
              Team Balance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-member" className="p-4">
            <AddMemberForm
              onSubmit={handleAddMember}
              isOpen={activeTab === "add-member"}
            />
          </TabsContent>

          <TabsContent value="team-balance" className="p-4">
            <TeamBalanceTools
              leftLegCount={24}
              rightLegCount={18}
              onApplySuggestions={handleApplySuggestions}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamManagementTools;
