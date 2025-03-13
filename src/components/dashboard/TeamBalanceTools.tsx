import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart2, RefreshCw, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: "left" | "right";
  level: number;
  active: boolean;
}

interface TeamBalanceToolsProps {
  leftLegCount?: number;
  rightLegCount?: number;
  imbalancedMembers?: TeamMember[];
  onApplySuggestions?: () => void;
}

const TeamBalanceTools: React.FC<TeamBalanceToolsProps> = ({
  leftLegCount = 24,
  rightLegCount = 18,
  imbalancedMembers = [
    { id: "1", name: "John Smith", position: "left", level: 3, active: true },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "left",
      level: 4,
      active: true,
    },
    {
      id: "3",
      name: "Michael Brown",
      position: "left",
      level: 2,
      active: false,
    },
    { id: "4", name: "Emily Davis", position: "right", level: 5, active: true },
  ],
  onApplySuggestions = () => console.log("Applied suggestions"),
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const totalMembers = leftLegCount + rightLegCount;
  const leftPercentage = Math.round((leftLegCount / totalMembers) * 100);
  const rightPercentage = Math.round((rightLegCount / totalMembers) * 100);
  const imbalancePercentage = Math.abs(leftPercentage - rightPercentage);

  const suggestions = [
    "Move Sarah Johnson to right leg to improve balance",
    "Add new members to right leg for next 3 placements",
    "Consider restructuring Michael Brown's downline",
  ];

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Team Balance Tools</CardTitle>
        <CardDescription>
          View and optimize your team's leg balance for maximum performance
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>
              Left Leg: {leftLegCount} members ({leftPercentage}%)
            </span>
            <span>
              Right Leg: {rightLegCount} members ({rightPercentage}%)
            </span>
          </div>
          <div className="flex gap-2">
            <Progress value={leftPercentage} className="h-3 bg-blue-100" />
            <Progress value={rightPercentage} className="h-3 bg-green-100" />
          </div>
          <div className="flex items-center justify-center mt-2">
            <span
              className={`text-sm font-medium ${imbalancePercentage > 20 ? "text-red-500" : "text-amber-500"}`}
            >
              {imbalancePercentage}% Imbalance
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-md font-semibold flex items-center gap-2 mb-3">
            <Users size={18} />
            Imbalanced Members
          </h3>
          <div className="space-y-3 max-h-[150px] overflow-y-auto">
            {imbalancedMembers.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center p-2 bg-slate-50 rounded"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-slate-500">
                    Level {member.level} • {member.position} leg •{" "}
                    {member.active ? "Active" : "Inactive"}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {showSuggestions && (
          <div className="border rounded-lg p-4 bg-blue-50">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-3">
              <BarChart2 size={18} />
              Optimization Suggestions
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          {showSuggestions ? "Hide Suggestions" : "Get Suggestions"}
        </Button>

        {showSuggestions && (
          <Button onClick={onApplySuggestions}>Apply Suggestions</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TeamBalanceTools;
