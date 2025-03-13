import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calculator, Info } from "lucide-react";

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

interface StakingFormProps {
  asset: CryptoAsset;
  onSubmit: (amount: number, period: number) => void;
  onCancel: () => void;
}

const StakingForm: React.FC<StakingFormProps> = ({
  asset,
  onSubmit,
  onCancel,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    asset.stakingOptions[0].period.toString(),
  );

  const formSchema = z.object({
    amount: z
      .string()
      .min(1, { message: "Amount is required" })
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Amount must be a positive number",
      })
      .refine((val) => parseFloat(val) <= asset.balance, {
        message: `Amount cannot exceed your balance of ${asset.balance} ${asset.symbol}`,
      }),
    period: z.string({
      required_error: "Please select a staking period",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      period: asset.stakingOptions[0].period.toString(),
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(parseFloat(values.amount), parseInt(values.period));
  };

  // Calculate estimated rewards based on input amount and selected period
  const calculateRewards = () => {
    const amount = parseFloat(form.watch("amount") || "0");
    const period = parseInt(selectedPeriod);
    const option = asset.stakingOptions.find((o) => o.period === period);
    if (!amount || !option) return "0";

    const apy = option.apy;
    const rewards = (amount * apy * period) / (365 * 100);
    return rewards.toFixed(6);
  };

  // Calculate USD value of rewards
  const calculateRewardsValue = () => {
    const rewards = parseFloat(calculateRewards());
    return (rewards * asset.price).toFixed(2);
  };

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center p-2">
            <img
              src={asset.icon}
              alt={asset.symbol}
              className="w-full h-full"
            />
          </div>
          <DialogTitle>Stake {asset.name}</DialogTitle>
        </div>
        <DialogDescription>
          Earn up to {Math.max(...asset.stakingOptions.map((o) => o.apy))}% APY
          by staking your {asset.symbol}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 py-4"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to Stake</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="0.00"
                      {...field}
                      type="number"
                      step="any"
                      min="0"
                      max={asset.balance}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <span className="text-gray-500">{asset.symbol}</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription className="flex justify-between">
                  <span>
                    Available: {asset.balance} {asset.symbol}
                  </span>
                  <button
                    type="button"
                    className="text-blue-600 text-sm"
                    onClick={() =>
                      form.setValue("amount", asset.balance.toString())
                    }
                  >
                    Max
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staking Period</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedPeriod(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a staking period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {asset.stakingOptions.map((option) => (
                      <SelectItem
                        key={option.period}
                        value={option.period.toString()}
                      >
                        {option.period} days ({option.apy}% APY)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Calculator className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 mb-2">
                  Estimated Rewards
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rewards:</span>
                    <span className="font-medium">
                      {calculateRewards()} {asset.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-medium">
                      ${calculateRewardsValue()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">APY:</span>
                    <span className="font-medium text-green-600">
                      {asset.stakingOptions.find(
                        (o) => o.period === parseInt(selectedPeriod),
                      )?.apy || 0}
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-blue-600 flex items-start gap-1">
                  <Info className="h-3 w-3 mt-0.5" />
                  <span>
                    Rewards are calculated based on the current APY rate and may
                    vary.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Stake Now</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default StakingForm;
