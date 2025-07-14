"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface PullToRefreshProps {
  onRefresh: () => void;
  children: React.ReactNode;
  threshold?: number;
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
}: PullToRefreshProps) {
  const { isMobile, isTouchDevice } = useMediaQuery();
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isPulling) return;

      currentY.current = e.touches[0].clientY;
      const distance = Math.max(0, currentY.current - startY.current);

      // Only allow pulling down when at the top
      if (containerRef.current?.scrollTop === 0) {
        setPullDistance(distance * 0.5); // Reduce pull resistance
      }
    },
    [isPulling]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    setIsPulling(false);
    setPullDistance(0);
  }, [isPulling, pullDistance, threshold, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only enable on mobile touch devices
    if (!isMobile || !isTouchDevice) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isMobile,
    isTouchDevice,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const rotation = pullProgress * 360;

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull indicator */}
      {isPulling && (
        <div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-200"
          style={{
            height: `${Math.min(pullDistance, threshold)}px`,
            transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
          }}
        >
          <div className="flex items-center space-x-2 text-muted-foreground">
            <RefreshCw
              className={`h-5 w-5 transition-transform duration-200 ${
                isRefreshing ? "animate-spin" : ""
              }`}
              style={{
                transform: isRefreshing
                  ? "rotate(360deg)"
                  : `rotate(${rotation}deg)`,
              }}
            />
            <span className="text-sm font-medium">
              {isRefreshing ? "Atualizando..." : "Puxe para atualizar"}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`transition-transform duration-200 ${
          isPulling ? "transform translate-y-0" : ""
        }`}
        style={{
          transform: isPulling
            ? `translateY(${Math.min(pullDistance, threshold)}px)`
            : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
