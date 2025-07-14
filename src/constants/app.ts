/**
 * Application Constants
 *
 * Centralized configuration values for the application.
 * This makes it easier to maintain and update common values.
 */

export const APP_CONFIG = {
  // API Configuration
  API: {
    CRYPTOCURRENCIES_LIMIT: 20,
    STALE_TIME: 0,
    RETRY_ATTEMPTS: 2,
    TIMEOUT: 10000,
  },

  // UI Configuration
  UI: {
    LOADING_BAR_HEIGHT: 3,
    REFRESH_DELAY: 500, // ms
    ANIMATION_DURATION: 2000, // ms
  },

  // Theme Colors
  COLORS: {
    LIGHT: {
      LOADING_BAR: "#000000",
      PRIMARY: "#6366f1",
    },
    DARK: {
      LOADING_BAR: "#ffffff",
      PRIMARY: "#6366f1",
    },
  },

  // Routes
  ROUTES: {
    HOME: "/",
    CRYPTO_DETAIL: "/crypto/[id]",
  },

  // External Links
  LINKS: {
    COINGECKO_API: "https://www.coingecko.com/api/documentation",
  },
} as const;

/**
 * Error Messages
 *
 * Centralized error messages for consistent user experience.
 */
export const ERROR_MESSAGES = {
  LOADING_ERROR: "Error loading cryptocurrencies",
  NETWORK_ERROR: "Network error. Please check your connection.",
  RATE_LIMIT: "Rate limit exceeded. Please try again later.",
  TIMEOUT: "Request timeout. Please check your connection.",
  UNKNOWN: "An unknown error occurred.",
} as const;

/**
 * Loading States
 *
 * Configuration for different loading states.
 */
export const LOADING_STATES = {
  SKELETON_COUNT: 6,
  REFRESH_TEXT: "Refreshing...",
  LOADING_TEXT: "Loading...",
} as const;
