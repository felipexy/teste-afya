import { APP_CONFIG } from "@/constants/app";

/**
 * Footer Component
 *
 * Displays the footer with attribution and technology information.
 * Includes links to external resources and credits.
 */
export function Footer() {
  return (
    <footer className="border-t bg-card/50 mt-8 sm:mt-16">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            Data provided by{" "}
            <a
              href={APP_CONFIG.LINKS.COINGECKO_API}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CoinGecko API
            </a>
          </p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS, and React Query
          </p>
        </div>
      </div>
    </footer>
  );
}
