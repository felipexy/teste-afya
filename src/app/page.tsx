"use client";

import { useRouter } from "next/navigation";
import { useTopCryptocurrencies } from "@/hooks/useCryptocurrency";
import { CryptocurrencyCard } from "@/components/CryptocurrencyCard";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingCard, Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: cryptocurrencies = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useTopCryptocurrencies(20);

  const handleCardClick = (id: string) => {
    router.push(`/crypto/${id}`);
  };

  const handleSearchSelect = (id: string) => {
    router.push(`/crypto/${id}`);
  };

  const handleRefresh = async () => {
    console.log("🔄 Refresh button clicked!");
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      // Reset the refreshing state after a short delay to show the animation
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const shouldSpin = isLoading || isFetching || isRefreshing;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">CryptoTracker</h1>
                <p className="text-sm text-muted-foreground">
                  Track top cryptocurrency prices in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <SearchBar onSelect={handleSearchSelect} />
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={shouldSpin}
              >
                <RefreshCw
                  className={`h-4 w-4 ${shouldSpin ? "animate-spin" : ""}`}
                />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Top 20 Cryptocurrencies</h2>
          <p className="text-muted-foreground">
            Sorted by market capitalization
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-destructive mb-4">
              <p className="text-lg font-semibold">
                Error loading cryptocurrencies
              </p>
              <p className="text-sm">{error.message}</p>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !cryptocurrencies.length && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {/* Cryptocurrency Grid */}
        {cryptocurrencies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cryptocurrencies.map((crypto) => (
              <CryptocurrencyCard
                key={crypto.id}
                crypto={crypto}
                onClick={() => handleCardClick(crypto.id)}
              />
            ))}
          </div>
        )}

        {/* Refresh Button at Bottom */}
        {cryptocurrencies.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleRefresh}
              disabled={shouldSpin}
              variant="outline"
              size="lg"
            >
              {shouldSpin ? (
                <Loading size="sm" text="Refreshing..." />
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Data provided by{" "}
              <a
                href="https://www.coingecko.com/api/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CoinGecko API
              </a>
            </p>
            <p className="mt-1">
              Built with Next.js, Tailwind CSS, and React Query
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
