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
import { BarChart, PieChart, Activity, Users, Calendar } from "lucide-react";

interface MemberActivityReportsProps {
  data?: {
    activeMembers: number;
    inactiveMembers: number;
    activityByMonth: Array<{
      month: string;
      active: number;
      inactive: number;
    }>;
    activityByRegion: Array<{
      region: string;
      percentage: number;
      count: number;
    }>;
    recentActivity: Array<{
      memberId: string;
      name: string;
      action: string;
      date: string;
    }>;
  };
}

const MemberActivityReports = ({
  data = {
    activeMembers: 245,
    inactiveMembers: 87,
    activityByMonth: [
      { month: "Jan", active: 180, inactive: 65 },
      { month: "Feb", active: 195, inactive: 70 },
      { month: "Mar", active: 210, inactive: 75 },
      { month: "Apr", active: 225, inactive: 80 },
      { month: "May", active: 240, inactive: 85 },
      { month: "Jun", active: 245, inactive: 87 },
    ],
    activityByRegion: [
      { region: "North America", percentage: 45, count: 149 },
      { region: "Europe", percentage: 30, count: 99 },
      { region: "Asia", percentage: 15, count: 50 },
      { region: "Other", percentage: 10, count: 34 },
    ],
    recentActivity: [
      {
        memberId: "M1001",
        name: "John Smith",
        action: "Completed Profile",
        date: "2023-06-15",
      },
      {
        memberId: "M1042",
        name: "Sarah Johnson",
        action: "Added New Member",
        date: "2023-06-14",
      },
      {
        memberId: "M1078",
        name: "Michael Brown",
        action: "Earned Commission",
        date: "2023-06-13",
      },
      {
        memberId: "M1103",
        name: "Emily Davis",
        action: "Updated Contact Info",
        date: "2023-06-12",
      },
      {
        memberId: "M1156",
        name: "Robert Wilson",
        action: "Completed Training",
        date: "2023-06-11",
      },
    ],
  },
}: MemberActivityReportsProps) => {
  const [timeRange, setTimeRange] = useState("last30days");

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Member Activity Reports</h2>
          <div className="w-48">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Active vs Inactive Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden">
                    {/* Placeholder for pie chart - in a real implementation, use a chart library */}
                    <div
                      className="absolute inset-0 bg-blue-500 opacity-75"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0, ${50 + 360 * (data.activeMembers / (data.activeMembers + data.inactiveMembers))}% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)`,
                      }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-gray-300 opacity-75"
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 360 * (data.activeMembers / (data.activeMembers + data.inactiveMembers))}% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)`,
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">
                            {Math.round(
                              (data.activeMembers /
                                (data.activeMembers + data.inactiveMembers)) *
                                100,
                            )}
                            %
                          </div>
                          <div className="text-sm text-gray-500">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Active ({data.activeMembers})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span>Inactive ({data.inactiveMembers})</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-500" />
                Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 pt-6">
                {data.activityByMonth.map((month, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex flex-col items-center w-12">
                      <div className="relative w-full">
                        <div
                          className="bg-gray-300 rounded-t-sm w-full"
                          style={{
                            height: `${(month.inactive / (month.active + month.inactive)) * 150}px`,
                          }}
                        ></div>
                        <div
                          className="bg-blue-500 rounded-t-sm w-full"
                          style={{
                            height: `${(month.active / (month.active + month.inactive)) * 150}px`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs mt-2">{month.month}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="breakdown">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="breakdown">Regional Breakdown</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="insights">Activity Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  Activity by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.activityByRegion.map((region, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{region.region}</span>
                        <span className="font-medium">
                          {region.count} members ({region.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Recent Member Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500">
                          {activity.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{activity.name}</div>
                          <div className="text-sm text-gray-500">
                            {activity.action}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Activity Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">
                      Engagement Opportunities
                    </h3>
                    <p className="text-sm text-blue-700">
                      {data.inactiveMembers} members are currently inactive.
                      Consider sending a re-engagement campaign to boost
                      participation.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">
                      Growth Trend
                    </h3>
                    <p className="text-sm text-green-700">
                      Active membership has grown by{" "}
                      {Math.round(
                        (data.activeMembers / data.activityByMonth[0].active -
                          1) *
                          100,
                      )}
                      % since {data.activityByMonth[0].month}. Keep up the good
                      work!
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-amber-800 mb-2">
                      Regional Focus
                    </h3>
                    <p className="text-sm text-amber-700">
                      {
                        data.activityByRegion[data.activityByRegion.length - 1]
                          .region
                      }{" "}
                      has the lowest member activity at{" "}
                      {
                        data.activityByRegion[data.activityByRegion.length - 1]
                          .percentage
                      }
                      %. Consider targeted outreach in this region.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MemberActivityReports;
