"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
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
        <div className="text-center">
          {isDetailRateLimitError ? (
            <>
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-orange-500" />
              </div>
              <p className="text-lg font-semibold mb-2">
                Muitas requisições realizadas
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                A API do CoinGecko tem um limite de requisições por minuto. Por
                favor, aguarde alguns instantes antes de tentar novamente.
              </p>
            </>
          ) : (
            <p className="text-destructive text-lg mb-4">
              Error loading cryptocurrency details
            </p>
          )}
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="cursor-pointer"
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
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Crypto Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{crypto.name}</h1>
              <p className="text-muted-foreground text-lg uppercase font-medium">
                {crypto.symbol}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatCurrency(crypto.current_price)}
            </div>
            <div
              className={`flex items-center justify-end space-x-1 text-lg ${changeColor}`}
            >
              {isPositive ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Price Chart (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingChart ? (
              <div className="h-80 flex items-center justify-center">
                <Loading text="Loading chart data..." />
              </div>
            ) : chartError ? (
              <div className="h-80 flex items-center justify-center">
                {isChartRateLimitError ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Clock className="h-12 w-12 text-orange-500" />
                    </div>
                    <p className="text-destructive font-semibold mb-2">
                      Muitas requisições realizadas
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      A API do CoinGecko tem um limite de requisições por
                      minuto. O gráfico será carregado automaticamente em alguns
                      instantes.
                    </p>
                  </div>
                ) : (
                  <div className="text-destructive">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(crypto.market_cap)}
              </p>
              <p className="text-sm text-muted-foreground">
                Rank #{crypto.market_cap_rank}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(crypto.total_volume)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                24h High/Low
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {formatCurrency(crypto.high_24h)}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(crypto.low_24h)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Circulating Supply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {formatNumber(crypto.circulating_supply)}
              </p>
              <p className="text-sm text-muted-foreground uppercase">
                {crypto.symbol}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>All Time High/Low</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">All Time High</p>
                <p className="text-xl font-bold">
                  {formatCurrency(crypto.ath)}
                </p>
                <p
                  className={`text-sm ${
                    crypto.ath_change_percentage >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {crypto.ath_change_percentage >= 0 ? "+" : ""}
                  {crypto.ath_change_percentage.toFixed(2)}% from ATH
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">All Time Low</p>
                <p className="text-xl font-bold">
                  {formatCurrency(crypto.atl)}
                </p>
                <p
                  className={`text-sm ${
                    crypto.atl_change_percentage >= 0
                      ? "text-green-600"
                      : "text-red-600"
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
              <CardTitle>Supply Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Circulating Supply
                </p>
                <p className="text-lg font-semibold">
                  {formatNumber(crypto.circulating_supply)}
                </p>
              </div>
              {crypto.total_supply && (
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(crypto.total_supply)}
                  </p>
                </div>
              )}
              {crypto.max_supply && (
                <div>
                  <p className="text-sm text-muted-foreground">Max Supply</p>
                  <p className="text-lg font-semibold">
                    {formatNumber(crypto.max_supply)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {crypto.description?.en && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About {crypto.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none"
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
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {crypto.links.homepage[0] && (
                  <a
                    href={crypto.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Official Website</span>
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
                    <span>Twitter</span>
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
                    <span>Reddit</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
