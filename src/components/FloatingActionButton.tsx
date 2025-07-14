"use client";

import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface FloatingActionButtonProps {
  onRefresh: () => void;
  shouldSpin: boolean;
  onScrollToTop?: () => void;
  showScrollToTop?: boolean;
}

export function FloatingActionButton({
  onRefresh,
  shouldSpin,
  onScrollToTop,
  showScrollToTop = false,
}: FloatingActionButtonProps) {
  const { isMobile } = useMediaQuery();

  // Only show on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      {/* Refresh Button */}
      <Button
        onClick={onRefresh}
        disabled={shouldSpin}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200"
      >
        <RefreshCw className={`h-5 w-5 ${shouldSpin ? "animate-spin" : ""}`} />
      </Button>

      {/* Scroll to Top Button */}
      {showScrollToTop && onScrollToTop && (
        <Button
          onClick={onScrollToTop}
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg transition-all duration-200"
        >
          <TrendingUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
