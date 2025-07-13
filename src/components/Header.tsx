import { TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import LogoTextFX from "./LogoTextFX";

interface HeaderProps {
  onRefresh: () => void;
  onSearchSelect: (id: string) => void;
  shouldSpin: boolean;
}

export function Header({ onRefresh, onSearchSelect, shouldSpin }: HeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div className="flex items-center">
              <LogoTextFX text="CryptoTracker" fontSize="2rem" />
            </div>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer">
            <SearchBar onSelect={onSearchSelect} />
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={shouldSpin}
            >
              <RefreshCw
                className={`h-4 w-4 ${shouldSpin ? "animate-spin" : ""}`}
              />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
