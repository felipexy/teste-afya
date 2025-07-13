import { useState, useRef, useEffect } from "react";
import { useTopCryptocurrencies } from "./useCryptocurrency";
import { useTheme } from "@/providers/ThemeProvider";
import LoadingBar from "react-top-loading-bar";
import { APP_CONFIG } from "@/constants/app";

/**
 * Custom hook to manage application state
 *
 * This hook centralizes all the application state management including:
 * - Cryptocurrency data fetching
 * - Loading states
 * - Theme management
 * - Loading bar control
 * - Refresh functionality
 *
 * @returns Object containing all application state and handlers
 */
export function useAppState() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { resolvedTheme } = useTheme();
  const loadingBarRef = useRef<React.ElementRef<typeof LoadingBar>>(null);

  const {
    data: cryptocurrencies = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useTopCryptocurrencies(APP_CONFIG.API.CRYPTOCURRENCIES_LIMIT);

  // Control loading bar based on loading states
  useEffect(() => {
    if (isLoading || isFetching || isRefreshing) {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [isLoading, isFetching, isRefreshing]);

  /**
   * Handle refresh functionality
   *
   * Manages the refresh process including:
   * - Setting loading state
   * - Calling the refetch function
   * - Resetting state after completion
   */
  const handleRefresh = async () => {
    console.log("🔄 Refresh button clicked!");
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      // Reset the refreshing state after a short delay to show the animation
      setTimeout(() => setIsRefreshing(false), APP_CONFIG.UI.REFRESH_DELAY);
    }
  };

  const shouldSpin = isLoading || isFetching || isRefreshing;

  return {
    cryptocurrencies,
    isLoading,
    error,
    isRefreshing,
    shouldSpin,
    resolvedTheme,
    loadingBarRef,
    handleRefresh,
  };
}
