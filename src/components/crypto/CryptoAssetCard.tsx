import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

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

interface CryptoAssetCardProps {
  asset: CryptoAsset;
  onStakeClick: () => void;
}

const CryptoAssetCard: React.FC<CryptoAssetCardProps> = ({
  asset,
  onStakeClick,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center p-2">
              <img
                src={asset.icon}
                alt={asset.symbol}
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{asset.name}</h3>
              <p className="text-sm text-gray-500">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">
              $
              {asset.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={`text-sm flex items-center justify-end ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {asset.change24h >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(asset.change24h).toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Your Balance:</span>
            <span className="font-medium">
              {asset.balance} {asset.symbol} ($
              {(asset.balance * asset.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              )
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Staking APY:</span>
            <span className="font-medium text-green-600">
              Up to {Math.max(...asset.stakingOptions.map((o) => o.apy))}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Lock Periods:</span>
            <span className="font-medium">
              {asset.stakingOptions.map((o) => o.period).join(", ")} days
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button
          onClick={onStakeClick}
          className="w-full flex items-center justify-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Stake {asset.symbol}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CryptoAssetCard;
