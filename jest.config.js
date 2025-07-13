const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/index.{js,jsx,ts,tsx}",
    "!src/app/layout.tsx",
    "!src/app/globals.css",
  ],
  // Removed coverage thresholds temporarily
  coverageReporters: ["text", "lcov", "html"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage/",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testTimeout: 10000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
