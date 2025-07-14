import { useState, useRef, useEffect } from "react";
import { useTopCryptocurrencies } from "./useCryptocurrency";
import { useTheme } from "@/providers/ThemeProvider";
import LoadingBar from "react-top-loading-bar";
import { APP_CONFIG } from "@/constants/app";

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
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
