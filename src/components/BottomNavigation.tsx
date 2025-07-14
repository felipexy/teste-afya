"use client";

import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter, usePathname } from "next/navigation";

interface BottomNavigationProps {
  onRefresh: () => void;
  shouldSpin: boolean;
}

export function BottomNavigation({
  onRefresh,
  shouldSpin,
}: BottomNavigationProps) {
  const { isMobile } = useMediaQuery();
  const router = useRouter();
  const pathname = usePathname();

  // Only show on mobile
  if (!isMobile) {
    return null;
  }

  const isCryptoDetail = pathname.startsWith("/crypto/");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t">
      <div className="flex items-center justify-around px-4 py-2">
        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={shouldSpin}
          className="flex flex-col items-center space-y-1 h-auto py-2 px-3 cursor-pointer"
        >
          <RefreshCw
            className={`h-4 w-4 ${shouldSpin ? "animate-spin" : ""}`}
          />
          <span className="text-xs">Atualizar</span>
        </Button>

        {/* Trending Button (if on crypto detail) */}
        {isCryptoDetail && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 cursor-pointer"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Top 20</span>
          </Button>
        )}
      </div>
    </div>
  );
}
