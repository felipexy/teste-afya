"use client";

import Image from "next/image";
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

  // Gradient overlay based on price change
  const gradientOverlay = isPositive
    ? "before:absolute before:inset-0 before:bg-gradient-to-tl before:from-green-500/8 before:via-green-400/3 before:to-transparent before:pointer-events-none before:rounded-lg"
    : "before:absolute before:inset-0 before:bg-gradient-to-tl before:from-red-500/8 before:via-red-400/3 before:to-transparent before:pointer-events-none before:rounded-lg";

  return (
    <Card
      className={`hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] relative overflow-hidden ${gradientOverlay} active:scale-[0.98]`}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left section: Logo, name, symbol */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full p-[1px] ${
                  isPositive
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/30"
                    : "bg-gradient-to-r from-red-400 to-pink-500 shadow-lg shadow-red-500/30"
                }`}
              >
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-crypto.png";
                  }}
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-muted text-muted-foreground text-xs px-1 py-0.5 rounded text-center min-w-[1.5rem]">
                {crypto.market_cap_rank}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg truncate">
                {crypto.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm uppercase font-medium">
                {crypto.symbol}
              </p>
            </div>
          </div>

          {/* Right section: Price and change */}
          <div className="flex flex-col items-end space-y-1 flex-shrink-0">
            <div className="font-semibold text-base sm:text-lg text-right">
              {formatCurrency(crypto.current_price)}
            </div>
            <div
              className={`flex items-center justify-center space-x-1 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full ${bgChangeColor} w-20 sm:w-24 min-h-[24px] sm:min-h-[28px]`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className={`${changeColor} text-xs sm:text-sm`}>
                {isPositive ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section: Market cap and volume */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Market Cap
            </p>
            <p className="text-xs sm:text-sm font-medium truncate">
              {formatCurrency(crypto.market_cap)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Volume 24h
            </p>
            <p className="text-xs sm:text-sm font-medium truncate">
              {formatCurrency(crypto.total_volume)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
