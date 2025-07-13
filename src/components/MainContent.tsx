import { RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CryptocurrencyCard } from "@/components/CryptocurrencyCard";
import { LoadingCard, Loading } from "@/components/ui/loading";
import { Cryptocurrency } from "@/types/crypto";
import { ERROR_MESSAGES, LOADING_STATES } from "@/constants/app";

interface MainContentProps {
  cryptocurrencies: Cryptocurrency[];
  isLoading: boolean;
  error: Error | null;
  shouldSpin: boolean;
  onRefresh: () => void;
  onCardClick: (id: string) => void;
}

/**
 * Main Content Component
 *
 * Displays the main content of the application including:
 * - Page title and description
 * - Error states
 * - Loading states with skeleton cards
 * - Cryptocurrency grid
 * - Refresh button
 */
export function MainContent({
  cryptocurrencies,
  isLoading,
  error,
  shouldSpin,
  onRefresh,
  onCardClick,
}: MainContentProps) {
  // Check if error is related to rate limiting
  const isRateLimitError =
    error?.message?.includes("Rate limit") ||
    error?.message?.includes("too many requests") ||
    error?.message?.includes("429");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Top 20 Cryptocurrencies</h2>
        <p className="text-muted-foreground">Sorted by market capitalization</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-destructive mb-4">
            {isRateLimitError ? (
              <>
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-orange-500" />
                </div>
                <p className="text-lg font-semibold mb-2">
                  Muitas requisições realizadas
                </p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  A API do CoinGecko tem um limite de requisições por minuto.
                  Por favor, aguarde alguns instantes antes de tentar novamente.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  {ERROR_MESSAGES.LOADING_ERROR}
                </p>
                <p className="text-sm">{error.message}</p>
              </>
            )}
          </div>
          <Button
            onClick={onRefresh}
            variant="outline"
            disabled={isRateLimitError}
            className={isRateLimitError ? "opacity-50 cursor-not-allowed" : ""}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {isRateLimitError ? "Aguarde..." : "Try Again"}
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !cryptocurrencies.length && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: LOADING_STATES.SKELETON_COUNT }).map((_, i) => (
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
              onClick={() => onCardClick(crypto.id)}
            />
          ))}
        </div>
      )}

      {/* Refresh Button at Bottom */}
      {cryptocurrencies.length > 0 && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={onRefresh}
            disabled={shouldSpin}
            variant="outline"
            size="lg"
          >
            {shouldSpin ? (
              <Loading size="sm" text={LOADING_STATES.REFRESH_TEXT} />
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
  );
}
