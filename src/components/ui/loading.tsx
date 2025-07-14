import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeClasses = {
  sm: "w-3 h-3 sm:w-4 sm:h-4",
  md: "w-5 h-5 sm:w-6 sm:h-6",
  lg: "w-6 h-6 sm:w-8 sm:h-8",
};

export function Loading({ className, size = "md", text }: LoadingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size]
        )}
      />
      {text && (
        <span className="text-xs sm:text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-lg border bg-card p-4 sm:p-6 animate-pulse">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="rounded-full bg-muted h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"></div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-3 sm:h-4 bg-muted rounded w-1/4"></div>
          <div className="h-2 sm:h-3 bg-muted rounded w-1/2"></div>
        </div>
        <div className="space-y-2 flex-shrink-0">
          <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-20"></div>
          <div className="h-2 sm:h-3 bg-muted rounded w-12 sm:w-16"></div>
        </div>
      </div>
    </div>
  );
}
