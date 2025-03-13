import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  BarChart,
  LineChart,
  TrendingUp,
  Users,
  UserPlus,
  Calendar,
} from "lucide-react";

interface TeamGrowthData {
  period: string;
  newMembers: number;
  totalMembers: number;
  growthRate: number;
}

interface TeamGrowthAnalyticsProps {
  data?: TeamGrowthData[];
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

const TeamGrowthAnalytics = ({
  data = [
    { period: "Jan", newMembers: 12, totalMembers: 120, growthRate: 10 },
    { period: "Feb", newMembers: 18, totalMembers: 138, growthRate: 15 },
    { period: "Mar", newMembers: 22, totalMembers: 160, growthRate: 16 },
    { period: "Apr", newMembers: 15, totalMembers: 175, growthRate: 9 },
    { period: "May", newMembers: 25, totalMembers: 200, growthRate: 14 },
    { period: "Jun", newMembers: 30, totalMembers: 230, growthRate: 15 },
  ],
  selectedPeriod = "monthly",
  onPeriodChange = () => {},
}: TeamGrowthAnalyticsProps) => {
  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                Team Growth Analytics
              </CardTitle>
              <CardDescription>
                Track your team's growth over time
              </CardDescription>
            </div>
            <Tabs
              defaultValue={selectedPeriod}
              onValueChange={onPeriodChange}
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricCard
              title="Total Team Members"
              value={data[data.length - 1].totalMembers}
              change="+15%"
              icon={<Users className="h-5 w-5 text-blue-500" />}
            />
            <MetricCard
              title="New Signups"
              value={data[data.length - 1].newMembers}
              change="+23%"
              icon={<UserPlus className="h-5 w-5 text-green-500" />}
            />
            <MetricCard
              title="Growth Rate"
              value={`${data[data.length - 1].growthRate}%`}
              change="+5%"
              icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
            />
          </div>

          <Tabs defaultValue="growth" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="growth">Growth Chart</TabsTrigger>
              <TabsTrigger value="comparison">Period Comparison</TabsTrigger>
              <TabsTrigger value="forecast">Growth Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="growth" className="w-full">
              <div className="w-full h-[300px] bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <LineChart className="h-16 w-16 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">
                    Team Growth Chart Visualization
                  </p>
                  <div className="mt-4 w-full max-w-md">
                    <div className="flex justify-between items-center mb-2">
                      {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="text-xs text-slate-500">
                            {item.period}
                          </div>
                          <div
                            className="w-8 bg-blue-500 rounded-t-sm mt-1"
                            style={{ height: `${item.totalMembers / 3}px` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="h-[1px] w-full bg-slate-300" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="w-full">
              <div className="w-full h-[300px] bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <BarChart className="h-16 w-16 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">
                    Period Comparison Visualization
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-8 w-full max-w-md">
                    <div className="border border-slate-200 rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">
                        Current Period
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        230
                      </div>
                      <div className="text-xs text-slate-500">
                        Total Members
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">
                        Previous Period
                      </div>
                      <div className="text-2xl font-bold text-slate-600">
                        200
                      </div>
                      <div className="text-xs text-slate-500">
                        Total Members
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="w-full">
              <div className="w-full h-[300px] bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Calendar className="h-16 w-16 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">
                    Growth Forecast Visualization
                  </p>
                  <div className="mt-4 w-full max-w-md">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">
                        Projected Growth
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-green-600">
                          285
                        </div>
                        <div className="text-sm text-green-500 mb-1">
                          +24% in 3 months
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "65%" }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">
                          Current: 230
                        </span>
                        <span className="text-xs text-slate-500">
                          Target: 350
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Growth Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Strongest Growth</span>
                </div>
                <p className="text-sm text-slate-600">
                  Your right leg is growing 23% faster than your left leg.
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    Best Recruiting Month
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  June had the highest number of new signups (30).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-green-500 mt-1">
              {change} from last period
            </p>
          </div>
          <div className="p-2 bg-slate-100 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamGrowthAnalytics;
