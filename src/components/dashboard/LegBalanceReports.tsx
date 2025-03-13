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
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";

interface LegBalanceReportsProps {
  data?: {
    leftLeg: number;
    rightLeg: number;
    history: Array<{
      date: string;
      leftLeg: number;
      rightLeg: number;
      balance: number;
    }>;
  };
}

const LegBalanceReports = ({
  data = {
    leftLeg: 245,
    rightLeg: 198,
    history: [
      { date: "2023-01", leftLeg: 120, rightLeg: 100, balance: 20 },
      { date: "2023-02", leftLeg: 145, rightLeg: 115, balance: 30 },
      { date: "2023-03", leftLeg: 170, rightLeg: 130, balance: 40 },
      { date: "2023-04", leftLeg: 195, rightLeg: 150, balance: 45 },
      { date: "2023-05", leftLeg: 220, rightLeg: 175, balance: 45 },
      { date: "2023-06", leftLeg: 245, rightLeg: 198, balance: 47 },
    ],
  },
}: LegBalanceReportsProps) => {
  const [timeRange, setTimeRange] = useState<string>("6m");
  const [chartType, setChartType] = useState<string>("line");

  // Calculate the balance percentage
  const totalMembers = data.leftLeg + data.rightLeg;
  const leftPercentage = Math.round((data.leftLeg / totalMembers) * 100);
  const rightPercentage = Math.round((data.rightLeg / totalMembers) * 100);
  const balancePercentage = Math.abs(leftPercentage - rightPercentage);

  // Determine if the balance is improving or worsening
  const previousBalance = data.history[data.history.length - 2]?.balance || 0;
  const currentBalance = data.history[data.history.length - 1]?.balance || 0;
  const balanceTrend =
    currentBalance > previousBalance ? "increasing" : "decreasing";

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Leg Balance Reports</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex bg-gray-100 rounded-md p-1">
            <button
              className={`p-1 rounded ${chartType === "line" ? "bg-white shadow" : ""}`}
              onClick={() => setChartType("line")}
            >
              <LineChart className="h-5 w-5" />
            </button>
            <button
              className={`p-1 rounded ${chartType === "bar" ? "bg-white shadow" : ""}`}
              onClick={() => setChartType("bar")}
            >
              <BarChart className="h-5 w-5" />
            </button>
            <button
              className={`p-1 rounded ${chartType === "pie" ? "bg-white shadow" : ""}`}
              onClick={() => setChartType("pie")}
            >
              <PieChart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Balance Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500">
                    Left Leg
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">{data.leftLeg}</span>
                    <span className="ml-2 text-sm text-gray-500">members</span>
                    <span className="ml-auto text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+12%</span>
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${leftPercentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {leftPercentage}% of total
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500">
                    Right Leg
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">{data.rightLeg}</span>
                    <span className="ml-2 text-sm text-gray-500">members</span>
                    <span className="ml-auto text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+8%</span>
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${rightPercentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {rightPercentage}% of total
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500">
                    Balance Difference
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-3xl font-bold">
                      {Math.abs(data.leftLeg - data.rightLeg)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">members</span>
                    <span
                      className={`ml-auto flex items-center ${balanceTrend === "increasing" ? "text-red-500" : "text-green-500"}`}
                    >
                      {balanceTrend === "increasing" ? (
                        <>
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          <span>
                            +{Math.abs(currentBalance - previousBalance)}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                          <span>
                            -{Math.abs(currentBalance - previousBalance)}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${balanceTrend === "increasing" ? "bg-red-500" : "bg-green-500"} h-2.5 rounded-full`}
                      style={{ width: `${balancePercentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {balancePercentage}% imbalance
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Balance History</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Last updated: Today</span>
                </div>
              </div>

              {/* Chart placeholder - in a real implementation, this would be a recharts component */}
              <div className="w-full h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                {chartType === "line" && (
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Line chart showing leg balance trends over time
                    </p>
                  </div>
                )}
                {chartType === "bar" && (
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Bar chart comparing left and right leg growth
                    </p>
                  </div>
                )}
                {chartType === "pie" && (
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Pie chart showing leg distribution
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">
                Balance Trend Analysis
              </h3>
              <p className="text-gray-600 mb-4">
                Your team balance has been{" "}
                {balanceTrend === "increasing" ? "worsening" : "improving"} over
                the last period. The difference between your left and right legs
                is currently {Math.abs(data.leftLeg - data.rightLeg)} members.
              </p>

              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">
                  Monthly Balance History
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Left Leg
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Right Leg
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Difference
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.history.map((month, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {month.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {month.leftLeg}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {month.rightLeg}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {month.balance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${month.balance > 40 ? "bg-red-100 text-red-800" : month.balance > 20 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                            >
                              {month.balance > 40
                                ? "Needs Attention"
                                : month.balance > 20
                                  ? "Moderate"
                                  : "Good"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">
                Balance Recommendations
              </h3>
              <p className="text-gray-600 mb-4">
                Based on your current team structure, here are some
                recommendations to improve your leg balance:
              </p>

              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="font-medium text-blue-800">
                    Focus on Right Leg Growth
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your right leg has {data.rightLeg} members compared to{" "}
                    {data.leftLeg} in your left leg. Consider placing your next{" "}
                    {Math.abs(data.leftLeg - data.rightLeg)} new recruits in
                    your right leg.
                  </p>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                  <h4 className="font-medium text-purple-800">
                    Identify Potential Leaders
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Look for potential leaders in your right leg who can help
                    accelerate growth. Providing additional training and support
                    to these individuals can help balance your team faster.
                  </p>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="font-medium text-green-800">
                    Set Balance Goals
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Aim to reduce your leg difference to less than 20 members
                    within the next 3 months. This would improve your balance
                    percentage from {balancePercentage}% to under 5%.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LegBalanceReports;
