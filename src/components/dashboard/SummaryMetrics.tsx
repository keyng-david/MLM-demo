import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Users,
  UserPlus,
  DollarSign,
  Scale,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = "+0%",
  isPositive = true,
  icon = <Users className="h-5 w-5" />,
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-gray-100 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center text-xs">
          {isPositive ? (
            <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span className="text-gray-500 ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryMetricsProps {
  teamSize?: number;
  newSignups?: number;
  commissionEarned?: number;
  legBalance?: number;
  teamSizeChange?: string;
  newSignupsChange?: string;
  commissionChange?: string;
  legBalanceChange?: string;
  teamSizePositive?: boolean;
  newSignupsPositive?: boolean;
  commissionPositive?: boolean;
  legBalancePositive?: boolean;
}

const SummaryMetrics = ({
  teamSize = 256,
  newSignups = 24,
  commissionEarned = 4580,
  legBalance = 92,
  teamSizeChange = "+12%",
  newSignupsChange = "+18%",
  commissionChange = "+8%",
  legBalanceChange = "-3%",
  teamSizePositive = true,
  newSignupsPositive = true,
  commissionPositive = true,
  legBalancePositive = false,
}: SummaryMetricsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Team Size"
          value={teamSize.toString()}
          change={teamSizeChange}
          isPositive={teamSizePositive}
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <MetricCard
          title="New Signups"
          value={newSignups.toString()}
          change={newSignupsChange}
          isPositive={newSignupsPositive}
          icon={<UserPlus className="h-5 w-5 text-green-600" />}
        />
        <MetricCard
          title="Commission Earned"
          value={`$${commissionEarned.toLocaleString()}`}
          change={commissionChange}
          isPositive={commissionPositive}
          icon={<DollarSign className="h-5 w-5 text-yellow-600" />}
        />
        <MetricCard
          title="Leg Balance"
          value={`${legBalance}%`}
          change={legBalanceChange}
          isPositive={legBalancePositive}
          icon={<Scale className="h-5 w-5 text-purple-600" />}
        />
      </div>
    </div>
  );
};

export default SummaryMetrics;
