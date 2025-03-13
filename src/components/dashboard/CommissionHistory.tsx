import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BarChart, LineChart, Calendar, Download, Filter } from "lucide-react";

interface CommissionData {
  id: string;
  date: string;
  amount: number;
  source: string;
  status: "Paid" | "Pending" | "Processing";
  level: number;
}

interface CommissionHistoryProps {
  data?: CommissionData[];
  dateRange?: { from: Date; to: Date };
}

const CommissionHistory: React.FC<CommissionHistoryProps> = ({
  data = [
    {
      id: "1",
      date: "2023-05-01",
      amount: 250.0,
      source: "Direct Referral",
      status: "Paid",
      level: 1,
    },
    {
      id: "2",
      date: "2023-05-05",
      amount: 125.0,
      source: "Team Bonus",
      status: "Paid",
      level: 2,
    },
    {
      id: "3",
      date: "2023-05-12",
      amount: 75.5,
      source: "Level Bonus",
      status: "Paid",
      level: 3,
    },
    {
      id: "4",
      date: "2023-05-18",
      amount: 200.0,
      source: "Direct Referral",
      status: "Paid",
      level: 1,
    },
    {
      id: "5",
      date: "2023-05-25",
      amount: 180.0,
      source: "Team Bonus",
      status: "Pending",
      level: 2,
    },
    {
      id: "6",
      date: "2023-06-01",
      amount: 95.0,
      source: "Level Bonus",
      status: "Processing",
      level: 3,
    },
    {
      id: "7",
      date: "2023-06-08",
      amount: 300.0,
      source: "Direct Referral",
      status: "Pending",
      level: 1,
    },
    {
      id: "8",
      date: "2023-06-15",
      amount: 150.0,
      source: "Team Bonus",
      status: "Paid",
      level: 2,
    },
  ],
  dateRange = { from: new Date(2023, 4, 1), to: new Date(2023, 5, 30) },
}) => {
  const [period, setPeriod] = useState<string>("monthly");
  const [view, setView] = useState<string>("table");

  // Calculate summary metrics
  const totalCommission = data.reduce((sum, item) => sum + item.amount, 0);
  const pendingCommission = data
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.amount, 0);
  const paidCommission = data
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">
              Commission History
            </CardTitle>
            <CardDescription>
              View your earnings from {dateRange.from.toLocaleDateString()} to{" "}
              {dateRange.to.toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
              <button
                className={`p-2 rounded ${view === "table" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("table")}
              >
                <Filter className="h-4 w-4" />
              </button>
              <button
                className={`p-2 rounded ${view === "bar" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("bar")}
              >
                <BarChart className="h-4 w-4" />
              </button>
              <button
                className={`p-2 rounded ${view === "line" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("line")}
              >
                <LineChart className="h-4 w-4" />
              </button>
              <button
                className={`p-2 rounded ${view === "calendar" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("calendar")}
              >
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">
                Total Commission
              </div>
              <div className="text-2xl font-bold">
                ${totalCommission.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">
                Paid Commission
              </div>
              <div className="text-2xl font-bold text-green-600">
                ${paidCommission.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">
                Pending Commission
              </div>
              <div className="text-2xl font-bold text-amber-600">
                ${pendingCommission.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Commissions</TabsTrigger>
            <TabsTrigger value="direct">Direct Referrals</TabsTrigger>
            <TabsTrigger value="team">Team Bonuses</TabsTrigger>
            <TabsTrigger value="level">Level Bonuses</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {view === "table" && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>
                          {new Date(commission.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{commission.source}</TableCell>
                        <TableCell>Level {commission.level}</TableCell>
                        <TableCell>${commission.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              commission.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : commission.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {commission.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {view === "bar" && (
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border p-4">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Bar chart visualization of commission data
                  </p>
                </div>
              </div>
            )}

            {view === "line" && (
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border p-4">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Line chart visualization of commission trends
                  </p>
                </div>
              </div>
            )}

            {view === "calendar" && (
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border p-4">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    Calendar view of commission events
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>
          </TabsContent>

          <TabsContent value="direct">
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border">
              <p className="text-gray-500">
                Direct referral commissions filtered view
              </p>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border">
              <p className="text-gray-500">
                Team bonus commissions filtered view
              </p>
            </div>
          </TabsContent>

          <TabsContent value="level">
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md border">
              <p className="text-gray-500">
                Level bonus commissions filtered view
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommissionHistory;
