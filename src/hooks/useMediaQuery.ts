import { useState, useEffect } from "react";

/**
 * Custom hook to detect screen size and device type
 * Useful for conditional rendering and mobile-specific features
 */
export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore
          navigator.msMaxTouchPoints > 0
      );
    };

    // Initial check
    checkScreenSize();
    checkTouchDevice();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
  };
}
