import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CommissionHistory from "./CommissionHistory";
import TeamGrowthAnalytics from "./TeamGrowthAnalytics";
import LegBalanceReports from "./LegBalanceReports";
import MemberActivityReports from "./MemberActivityReports";

interface PerformanceReportsProps {
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
  dateRange?: { from: Date; to: Date };
}

const PerformanceReports: React.FC<PerformanceReportsProps> = ({
  selectedTab = "commissions",
  onTabChange = () => {},
  dateRange = { from: new Date(2023, 4, 1), to: new Date(2023, 5, 30) },
}) => {
  const [timeFrame, setTimeFrame] = useState<string>("monthly");

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-2xl font-bold">
            Performance Reports
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs
          value={selectedTab}
          onValueChange={onTabChange}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="flex w-full justify-start rounded-none bg-transparent p-0 h-12">
              <TabsTrigger
                value="commissions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12"
              >
                Commission History
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12"
              >
                Team Growth
              </TabsTrigger>
              <TabsTrigger
                value="balance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12"
              >
                Leg Balance
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12"
              >
                Member Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="commissions" className="m-0">
              <CommissionHistory dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="growth" className="m-0">
              <TeamGrowthAnalytics
                selectedPeriod={timeFrame}
                onPeriodChange={handleTimeFrameChange}
              />
            </TabsContent>

            <TabsContent value="balance" className="m-0">
              <LegBalanceReports />
            </TabsContent>

            <TabsContent value="activity" className="m-0">
              <MemberActivityReports />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceReports;
