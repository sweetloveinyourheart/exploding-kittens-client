import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        wacky: `bg-primary text-black border border-transparent box-border font-bold text-primary-foreground leading-7
          px-[1.65rem] py-[0.75rem] md:px-12 md:text-md rotate-[-2deg] w-full max-w-[460px]
          relative before:content-[''] before:absolute before:border before:border-black
          before:bottom-1 before:left-1 before:w-[calc(100%-1px)] before:h-[calc(100%-1px)]
          hover:before:bottom-[2px] hover:before:left-[2px] transition-transform`,
        gradientGlow:
          `relative inline-flex items-center justify-center text-white font-extrabold text-base leading-6 
          min-h-[64px] px-[26px] py-[19px] md:px-8 cursor-pointer z-0 before:content-[''] before:absolute 
          before:inset-0 before:rounded-[80px] before:bg-[linear-gradient(92.83deg,#ff7426_0%,#f93a13_100%)] 
          before:z-[-2] after:content-[''] after:absolute after:inset-[4px] after:rounded-[80px] 
          after:bg-[linear-gradient(#541a0f_0%,#0c0d0d_100%)] after:transition-all after:duration-100 after:ease-out after:z-[-1] 
          hover:after:inset-0 hover:after:opacity-0 active:text-gray-300 
          active:before:bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(92.83deg,#ff7426_0%,#f93a13_100%)] 
          disabled:cursor-default disabled:opacity-25`,
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
