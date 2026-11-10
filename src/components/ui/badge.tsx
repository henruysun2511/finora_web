import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/12 text-primary border border-primary/20",
        secondary:
          "bg-secondary/15 text-secondary border border-secondary/25",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/25",
        outline: "text-foreground border border-border",
        success:
          "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
        warning:
          "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

