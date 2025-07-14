"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { CryptoChart } from "@/components/CryptoChart";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  useCryptocurrencyDetail,
  useCryptocurrencyChart,
} from "@/hooks/useCryptocurrency";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface CryptoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CryptoDetailPage({ params }: CryptoDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const {
    data: crypto,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useCryptocurrencyDetail(id);
  const {
    data: chartData = [],
    isLoading: isLoadingChart,
    error: chartError,
  } = useCryptocurrencyChart(id, 7);

  // Check if errors are related to rate limiting
  const isDetailRateLimitError =
    detailError?.message?.includes("Rate limit") ||
    detailError?.message?.includes("too many requests") ||
    detailError?.message?.includes("429");

  const isChartRateLimitError =
    chartError?.message?.includes("Rate limit") ||
    chartError?.message?.includes("too many requests") ||
    chartError?.message?.includes("429");

  if (isLoadingDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading size="lg" text="Loading cryptocurrency details..." />
      </div>
    );
  }

  if (detailError || !crypto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          {isDetailRateLimitError ? (
            <>
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500" />
              </div>
              <p className="text-base sm:text-lg font-semibold mb-2">
                Muitas requisições realizadas
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-4">
                A API do CoinGecko tem um limite de requisições por minuto. Por
                favor, aguarde alguns instantes antes de tentar novamente.
              </p>
            </>
          ) : (
            <p className="text-destructive text-base sm:text-lg mb-4">
              Error loading cryptocurrency details
            </p>
          )}
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isPositive = crypto.price_change_percentage_24h >= 0;
  const changeColor = isPositive
    ? "text-green-800 dark:text-green-400"
    : "text-red-800 dark:text-red-400";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 cursor-pointer h-9 sm:h-10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 pb-16 sm:pb-8">
        {/* Crypto Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Image
              src={crypto.image}
              alt={crypto.name}
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{crypto.name}</h1>
              <p className="text-muted-foreground text-base sm:text-lg uppercase font-medium">
                {crypto.symbol}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold">
              {formatCurrency(crypto.current_price)}
            </div>
            <div
              className={`flex items-center sm:justify-end space-x-1 text-base sm:text-lg ${changeColor}`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">
              Price Chart (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingChart ? (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                <Loading text="Loading chart data..." />
              </div>
            ) : chartError ? (
              <div className="h-60 sm:h-80 flex items-center justify-center">
                {isChartRateLimitError ? (
                  <div className="text-center px-4">
                    <div className="flex justify-center mb-4">
                      <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500" />
                    </div>
                    <p className="text-destructive font-semibold mb-2 text-sm sm:text-base">
                      Muitas requisições realizadas
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                      A API do CoinGecko tem um limite de requisições por
                      minuto. O gráfico será carregado automaticamente em alguns
                      instantes.
                    </p>
                  </div>
                ) : (
                  <div className="text-destructive text-sm sm:text-base">
                    Error loading chart data
                  </div>
                )}
              </div>
            ) : (
              <CryptoChart data={chartData} />
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg sm:text-2xl font-bold">
                {formatCurrency(crypto.market_cap)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Rank #{crypto.market_cap_rank}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg sm:text-2xl font-bold">
                {formatCurrency(crypto.total_volume)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                24h High/Low
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-semibold">
                {formatCurrency(crypto.high_24h)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatCurrency(crypto.low_24h)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                Circulating Supply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-semibold">
                {formatNumber(crypto.circulating_supply)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground uppercase">
                {crypto.symbol}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                All Time High/Low
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  All Time High
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {formatCurrency(crypto.ath)}
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
                    crypto.ath_change_percentage >= 0
                      ? "bg-green-600 text-white dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-600 text-white dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {crypto.ath_change_percentage >= 0 ? "+" : ""}
                  {crypto.ath_change_percentage.toFixed(2)}% from ATH
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  All Time Low
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {formatCurrency(crypto.atl)}
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
                    crypto.atl_change_percentage >= 0
                      ? "bg-green-600 text-white dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-600 text-white dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {crypto.atl_change_percentage >= 0 ? "+" : ""}
                  {crypto.atl_change_percentage.toFixed(2)}% from ATL
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Supply Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Circulating Supply
                </p>
                <p className="text-base sm:text-lg font-semibold">
                  {formatNumber(crypto.circulating_supply)}
                </p>
              </div>
              {crypto.total_supply && (
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Total Supply
                  </p>
                  <p className="text-base sm:text-lg font-semibold">
                    {formatNumber(crypto.total_supply)}
                  </p>
                </div>
              )}
              {crypto.max_supply && (
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Max Supply
                  </p>
                  <p className="text-base sm:text-lg font-semibold">
                    {formatNumber(crypto.max_supply)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {crypto.description?.en && (
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                About {crypto.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none text-sm sm:text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    crypto.description.en.slice(0, 500) +
                    (crypto.description.en.length > 500 ? "..." : ""),
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Links */}
        {crypto.links && (
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {crypto.links.homepage[0] && (
                  <a
                    href={crypto.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      Official Website
                    </span>
                  </a>
                )}
                {crypto.links.twitter_screen_name && (
                  <a
                    href={`https://twitter.com/${crypto.links.twitter_screen_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm sm:text-base">Twitter</span>
                  </a>
                )}
                {crypto.links.subreddit_url && (
                  <a
                    href={crypto.links.subreddit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm sm:text-base">Reddit</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation
        onRefresh={() => window.location.reload()}
        shouldSpin={isLoadingDetail || isLoadingChart}
      />
    </div>
  );
}
