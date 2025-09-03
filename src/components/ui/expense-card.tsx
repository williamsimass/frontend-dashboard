import { Card } from "./card";
import { cn } from "@/lib/utils";

interface ExpenseCardProps {
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function ExpenseCard({ 
  title, 
  value, 
  subtitle, 
  progress, 
  variant = "default",
  className 
}: ExpenseCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-success/10 to-success/5";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/10 to-warning/5";
      case "danger":
        return "border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5";
      default:
        return "border-border bg-gradient-card";
    }
  };

  const getProgressColor = () => {
    if (!progress) return "bg-primary";
    if (progress > 80) return "bg-destructive";
    if (progress > 60) return "bg-warning";
    return "bg-success";
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-card border backdrop-blur-sm",
      getVariantStyles(),
      className
    )}>
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-500", getProgressColor())}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.toFixed(1)}% da meta utilizada
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}