"use client";

import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { useAppState } from "@/hooks/useAppState";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { APP_CONFIG } from "@/constants/app";

export default function Home() {
  const router = useRouter();
  const {
    cryptocurrencies,
    isLoading,
    error,
    shouldSpin,
    resolvedTheme,
    loadingBarRef,
    handleRefresh,
  } = useAppState();

  const handleCardClick = (id: string) => {
    router.push(`/crypto/${id}`);
  };

  const handleSearchSelect = (id: string) => {
    router.push(`/crypto/${id}`);
  };

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col ${
        resolvedTheme === "dark" ? "bg-black" : ""
      }`}
    >
      {/* Top Loading Bar */}
      <LoadingBar
        ref={loadingBarRef}
        color={
          resolvedTheme === "dark"
            ? APP_CONFIG.COLORS.DARK.LOADING_BAR
            : APP_CONFIG.COLORS.LIGHT.LOADING_BAR
        }
        height={APP_CONFIG.UI.LOADING_BAR_HEIGHT}
        shadow={true}
        className="z-50"
      />

      {/* Background */}
      <Background theme={resolvedTheme} />

      {/* Content */}
      <div className="relative z-10 pt-20 sm:pt-24 flex flex-col flex-1 pb-16 sm:pb-0">
        <Header
          onRefresh={handleRefresh}
          onSearchSelect={handleSearchSelect}
          shouldSpin={shouldSpin}
        />

        <MainContent
          cryptocurrencies={cryptocurrencies}
          isLoading={isLoading}
          error={error}
          shouldSpin={shouldSpin}
          onRefresh={handleRefresh}
          onCardClick={handleCardClick}
        />

        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation onRefresh={handleRefresh} shouldSpin={shouldSpin} />
    </div>
  );
}
