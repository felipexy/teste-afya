import { RefreshCw, Menu, X } from "lucide-react";
import { useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/100">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <LogoTextFX
                text="CryptoTracker"
                fontSize="clamp(1.5rem, 4vw, 2rem)"
              />
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar onSelect={onSearchSelect} />
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={shouldSpin}
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  shouldSpin ? "animate-spin" : ""
                } cursor-pointer`}
              />
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={shouldSpin}
              className="h-9 w-9"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  shouldSpin ? "animate-spin" : ""
                } cursor-pointer`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-9 w-9"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-4">
            <SearchBar onSelect={onSearchSelect} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
