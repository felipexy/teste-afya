"use client";

import { useState } from "react";
import { Search, X, Clock } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCryptocurrencySearch,
  useDebounce,
} from "@/hooks/useCryptocurrency";
import { Loading } from "@/components/ui/loading";

interface SearchBarProps {
  onSelect?: (id: string) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const {
    data: results = [],
    isLoading,
    error,
  } = useCryptocurrencySearch(debouncedQuery);

  // Check if error is related to rate limiting
  const isRateLimitError =
    error?.message?.includes("Rate limit") ||
    error?.message?.includes("too many requests") ||
    error?.message?.includes("429");

  const handleSelect = (id: string) => {
    setQuery("");
    setIsOpen(false);
    onSelect?.(id);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search cryptocurrencies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(query.length > 0)}
          className="pl-10 pr-10 h-9 sm:h-10 text-sm sm:text-base"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 max-h-60 sm:max-h-80 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          {isLoading && (
            <div className="p-3 sm:p-4">
              <Loading text="Searching..." />
            </div>
          )}

          {error && (
            <div className="p-3 sm:p-4">
              {isRateLimitError ? (
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                  </div>
                  <p className="text-destructive text-xs sm:text-sm font-semibold mb-1">
                    Muitas requisições
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Aguarde alguns instantes
                  </p>
                </div>
              ) : (
                <div className="text-destructive text-xs sm:text-sm">
                  Error searching cryptocurrencies
                </div>
              )}
            </div>
          )}

          {!isLoading && !error && results.length === 0 && debouncedQuery && (
            <div className="p-3 sm:p-4 text-muted-foreground text-xs sm:text-sm">
              No cryptocurrencies found
            </div>
          )}

          {results.map((crypto) => (
            <div
              key={crypto.id}
              onClick={() => handleSelect(crypto.id)}
              className="p-2 sm:p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {crypto.name}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">
                    {crypto.symbol}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs sm:text-sm font-medium">
                    ${crypto.current_price.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      crypto.price_change_percentage_24h >= 0
                        ? "bg-green-600 text-white dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-600 text-white dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
