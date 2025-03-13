import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Wallet,
  Clock,
  TrendingUp,
  BarChart,
  ArrowUpRight,
  Lock,
  Unlock,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StakingForm from "./StakingForm";
import CryptoAssetCard from "./CryptoAssetCard";

interface StakedAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  apy: number;
  startDate: string;
  endDate: string;
  rewards: number;
  status: "active" | "pending" | "completed";
  lockPeriod: number; // in days
  progress: number; // percentage of lock period completed
}

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  balance: number;
  apy: number;
  stakingOptions: {
    period: number; // in days
    apy: number;
  }[];
}

interface CryptoStakingDashboardProps {
  isLoggedIn?: boolean;
}

const CryptoStakingDashboard: React.FC<CryptoStakingDashboardProps> = ({
  isLoggedIn = true,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [stakingDialogOpen, setStakingDialogOpen] = useState(false);

  // Sample data
  const cryptoAssets: CryptoAsset[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025",
      price: 65432.21,
      change24h: 2.5,
      balance: 0.05,
      apy: 4.5,
      stakingOptions: [
        { period: 30, apy: 3.5 },
        { period: 60, apy: 4.5 },
        { period: 90, apy: 5.5 },
      ],
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
      price: 3521.67,
      change24h: 1.8,
      balance: 1.2,
      apy: 5.2,
      stakingOptions: [
        { period: 30, apy: 4.2 },
        { period: 60, apy: 5.2 },
        { period: 90, apy: 6.2 },
      ],
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      icon: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025",
      price: 0.45,
      change24h: -0.8,
      balance: 1000,
      apy: 6.8,
      stakingOptions: [
        { period: 30, apy: 5.8 },
        { period: 60, apy: 6.8 },
        { period: 90, apy: 7.8 },
      ],
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      icon: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=025",
      price: 142.35,
      change24h: 5.2,
      balance: 10,
      apy: 7.5,
      stakingOptions: [
        { period: 30, apy: 6.5 },
        { period: 60, apy: 7.5 },
        { period: 90, apy: 8.5 },
      ],
    },
  ];

  const stakedAssets: StakedAsset[] = [
    {
      id: "staked-eth-1",
      name: "Ethereum",
      symbol: "ETH",
      amount: 0.5,
      value: 1760.84,
      apy: 5.2,
      startDate: "2023-05-15",
      endDate: "2023-07-14",
      rewards: 0.0065,
      status: "active",
      lockPeriod: 60,
      progress: 65,
    },
    {
      id: "staked-sol-1",
      name: "Solana",
      symbol: "SOL",
      amount: 5,
      value: 711.75,
      apy: 7.5,
      startDate: "2023-06-01",
      endDate: "2023-08-30",
      rewards: 0.094,
      status: "active",
      lockPeriod: 90,
      progress: 40,
    },
  ];

  // Calculate total staked value and rewards
  const totalStakedValue = stakedAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );
  const totalRewards = stakedAssets.reduce(
    (sum, asset) =>
      sum +
      asset.rewards * cryptoAssets.find((a) => a.name === asset.name)?.price,
    0,
  );

  const handleStakeClick = (asset: CryptoAsset) => {
    setSelectedAsset(asset);
    setStakingDialogOpen(true);
  };

  const handleStakeSubmit = (amount: number, period: number) => {
    console.log(
      `Staking ${amount} ${selectedAsset?.symbol} for ${period} days`,
    );
    setStakingDialogOpen(false);
    // In a real app, this would call an API to process the staking transaction
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 p-8 rounded-lg">
        <Lock className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Please log in to access the crypto staking features and start earning
          rewards on your assets.
        </p>
        <Button size="lg">Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Crypto Staking</h1>
          <p className="text-gray-500 mt-1">
            Earn passive income by staking your crypto assets
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Staked Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {totalStakedValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+5.2% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Rewards Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {totalRewards.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+2.8% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Average APY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stakedAssets.length > 0
                    ? (
                        stakedAssets.reduce(
                          (sum, asset) => sum + asset.apy,
                          0,
                        ) / stakedAssets.length
                      ).toFixed(2)
                    : "0.00"}
                  %
                </div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Higher than market average</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Staked Assets</CardTitle>
              <CardDescription>
                Monitor your staking positions and earned rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stakedAssets.length > 0 ? (
                <div className="space-y-6">
                  {stakedAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <img
                              src={
                                cryptoAssets.find((a) => a.name === asset.name)
                                  ?.icon
                              }
                              alt={asset.symbol}
                              className="w-6 h-6"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{asset.name}</h3>
                            <p className="text-sm text-gray-500">
                              {asset.amount} {asset.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            $
                            {asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div className="text-sm text-green-500">
                            {asset.apy}% APY
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Lock period:</span>
                          <span>
                            {asset.lockPeriod} days ({asset.progress}% complete)
                          </span>
                        </div>
                        <Progress value={asset.progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Start date:</span>
                          <span>
                            {new Date(asset.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">End date:</span>
                          <span>
                            {new Date(asset.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Rewards earned:</span>
                          <span className="font-medium">
                            {asset.rewards} {asset.symbol} ($
                            {(
                              asset.rewards *
                              cryptoAssets.find((a) => a.name === asset.name)
                                ?.price
                            ).toFixed(2)}
                            )
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={asset.progress < 100}
                              >
                                <Unlock className="h-4 w-4 mr-2" />
                                Unstake
                              </Button>
                            </TooltipTrigger>
                            {asset.progress < 100 && (
                              <TooltipContent>
                                <p>Available after lock period ends</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No staked assets yet
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Start staking your crypto assets to earn passive income with
                    competitive APY rates.
                  </p>
                  <Button onClick={() => setActiveTab("assets")}>
                    Explore Staking Options
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Assets for Staking</CardTitle>
              <CardDescription>
                Choose from a variety of crypto assets to stake and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cryptoAssets.map((asset) => (
                  <CryptoAssetCard
                    key={asset.id}
                    asset={asset}
                    onStakeClick={() => handleStakeClick(asset)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staking History</CardTitle>
              <CardDescription>
                View your past and current staking transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>APY</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rewards</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakedAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <img
                                src={
                                  cryptoAssets.find(
                                    (a) => a.name === asset.name,
                                  )?.icon
                                }
                                alt={asset.symbol}
                                className="w-5 h-5"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-xs text-gray-500">
                                {asset.symbol}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {asset.amount} {asset.symbol}
                        </TableCell>
                        <TableCell>
                          {new Date(asset.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(asset.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{asset.apy}%</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              asset.status === "active"
                                ? "bg-green-100 text-green-800"
                                : asset.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {asset.status.charAt(0).toUpperCase() +
                              asset.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {asset.rewards} {asset.symbol}
                          </div>
                          <div className="text-xs text-gray-500">
                            $
                            {(
                              asset.rewards *
                              cryptoAssets.find((a) => a.name === asset.name)
                                ?.price
                            ).toFixed(2)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={stakingDialogOpen} onOpenChange={setStakingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedAsset && (
            <StakingForm
              asset={selectedAsset}
              onSubmit={handleStakeSubmit}
              onCancel={() => setStakingDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CryptoStakingDashboard;
