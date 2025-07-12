"use client";

import { Cryptocurrency } from "@/types/crypto";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptocurrencyCardProps {
  crypto: Cryptocurrency;
  onClick?: () => void;
}

export function CryptocurrencyCard({
  crypto,
  onClick,
}: CryptocurrencyCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const changeColor = isPositive
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const bgChangeColor = isPositive
    ? "bg-green-50 dark:bg-green-900/20"
    : "bg-red-50 dark:bg-red-900/20";

  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left section: Logo, name, symbol */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-crypto.png";
                }}
              />
              <div className="absolute -top-1 -right-1 bg-muted text-muted-foreground text-xs px-1 py-0.5 rounded text-center min-w-[1.5rem]">
                {crypto.market_cap_rank}
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-lg truncate">{crypto.name}</h3>
              <p className="text-muted-foreground text-sm uppercase font-medium">
                {crypto.symbol}
              </p>
            </div>
          </div>

          {/* Right section: Price and change */}
          <div className="text-right space-y-1">
            <div className="font-semibold text-lg">
              {formatCurrency(crypto.current_price)}
            </div>
            <div
              className={`flex items-center justify-end space-x-1 text-sm px-2 py-1 rounded-full ${bgChangeColor}`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className={changeColor}>
                {isPositive ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section: Market cap and volume */}
        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Market Cap
            </p>
            <p className="text-sm font-medium">
              {formatCurrency(crypto.market_cap)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Volume 24h
            </p>
            <p className="text-sm font-medium">
              {formatCurrency(crypto.total_volume)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
