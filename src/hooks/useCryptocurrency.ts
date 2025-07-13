import { useQuery } from "@tanstack/react-query";
import { coinGeckoApi } from "@/services/coinGeckoApi";
import { useState, useMemo } from "react";

// Hook for top cryptocurrencies
export function useTopCryptocurrencies(limit: number = 20) {
  return useQuery({
    queryKey: ["cryptocurrencies", "top", limit],
    queryFn: async () => {
      console.log("🌐 Making API request for top cryptocurrencies...");
      const data = await coinGeckoApi.getTopCryptocurrencies(limit);
      console.log(
        "✅ API request completed, got",
        data.length,
        "cryptocurrencies"
      );
      return data;
    },
    staleTime: 0, // Always consider data stale - allows immediate refetch
  });
}

// Hook for cryptocurrency search
export function useCryptocurrencySearch(query: string) {
  return useQuery({
    queryKey: ["cryptocurrencies", "search", query],
    queryFn: () => coinGeckoApi.searchCryptocurrencies(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for cryptocurrency detail
export function useCryptocurrencyDetail(id: string) {
  return useQuery({
    queryKey: ["cryptocurrency", "detail", id],
    queryFn: () => coinGeckoApi.getCryptocurrencyDetail(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

// Hook for chart data
export function useCryptocurrencyChart(id: string, days: number = 7) {
  return useQuery({
    queryKey: ["cryptocurrency", "chart", id, days],
    queryFn: () => coinGeckoApi.getChartData(id, days),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for debounced search
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
