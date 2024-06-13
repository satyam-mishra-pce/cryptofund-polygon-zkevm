import * as React from "react";
import { cn } from "./../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition ease-out duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        primaryPlain: "bg-background text-primary hover:border-primary",
        accent: "bg-accent text-primary hover:bg-primary hover:text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // secondary: "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
        workspaceSecondary: "border border-accent bg-background text-primary hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",

        ghost: "border border-transparent hover:text-primary hover:border-border",

        primary: "bg-primary text-primary-foreground border border-border hover:bg-primary/90",
        // secondary:
        // "bg-accent text-accent-foreground border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-border",
        tertiary:
          "bg-background/70 backdrop-blur-md text-primary border border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/10",
        primaryGhost: "border border-transparent text-primary hover:bg-background hover:border-primary/10",
        secondaryGhost: "border border-transparent text-secondary hover:bg-background hover:border-secondary/10",

        destructivePrimary: "bg-destructive text-destructive-foreground border border-border hover:bg-destructive/90",
        destructiveSecondary:
          "bg-destructive/20 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground hover:border-border",
        destructiveTertiary:
          "bg-background/70 backdrop-blur-md text-destructive border border-border hover:text-destructive hover:border-destructive/20",
        destructiveGhost:
          "border border-transparent text-destructive hover:bg-destructive/20 hover:border-destructive/20",

        systemDropdown:
          "border backdrop-blur-xl border-black/10 bg-background/40 text-foreground hover:bg-accent hover:text-accent-foreground",
        workspaceDropdown:
          "border backdrop-blur-xl border-black/10 bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground",
        systemErrorDropdown:
          "border backdrop-blur-xl border-black/10 bg-background/40 text-destructive hover:bg-destructive/10",
      },
      // variant: {
      //   default: "bg-primary text-primary-foreground hover:bg-primary/90 font-bold",
      //   destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      //   outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      //   // secondary: "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground",
      //   workspaceSecondary: "border border-accent bg-background text-primary hover:bg-accent",
      //   link: "text-primary underline-offset-4 hover:underline",

      //   ghost: "border border-transparent hover:text-primary hover:border-border",

      //   primary: "bg-primary text-primary-foreground border border-border hover:bg-primary/90",
      //   secondary:
      //     "bg-accent text-accent-foreground border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-border",
      //   tertiary:
      //     "bg-background/70 backdrop-blur-md text-primary border border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/10",
      //   accentGhost:
      //     "border border-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-primary/10",

      //   destructivePrimary: "bg-destructive text-destructive-foreground border border-border hover:bg-destructive/90",
      //   destructiveSecondary:
      //     "bg-destructive/20 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground hover:border-border",
      //   destructiveTertiary:
      //     "bg-background/70 backdrop-blur-md text-destructive border border-border hover:text-destructive hover:border-destructive/20",
      //   destructiveGhost:
      //     "border border-transparent text-destructive hover:bg-destructive/20 hover:border-destructive/20",

      //   systemDropdown:
      //     "border backdrop-blur-xl border-black/10 bg-background/40 text-foreground hover:bg-accent hover:text-accent-foreground",
      //   workspaceDropdown:
      //     "border backdrop-blur-xl border-black/10 bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground",
      //   systemErrorDropdown:
      //     "border backdrop-blur-xl border-black/10 bg-background/40 text-destructive hover:bg-destructive/10",
      // },
      size: {
        default: "h-[32px] px-3 py-2 text-sm",
        xs: "h-[24px] rounded-sm px-1 text-2xs",
        sm: "h-[28px] rounded-md px-2 text-xs",
        lg: "h-[36px] rounded-md px-8",
        dropdown: "h-[32px] rounded-md px-1",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
