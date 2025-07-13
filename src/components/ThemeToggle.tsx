"use client";

import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <div className="h-6 w-11 rounded-full bg-muted" />
        <Moon className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={handleThemeChange}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
}
