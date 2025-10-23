import React, { forwardRef } from "react";
import { cn } from "@/react-app/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            {
              "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
              "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
              "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
              "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            },
            {
              "h-10 px-4 py-2": size === "default",
              "h-9 rounded-md px-3": size === "sm",
              "h-11 rounded-md px-8": size === "lg",
            },
            className
          )}
          // props restantes (não estritamente tipados para div)
          {...(props as Record<string, unknown>)}
        >
          {children}
        </div>
      );
    }
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          },
            {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
