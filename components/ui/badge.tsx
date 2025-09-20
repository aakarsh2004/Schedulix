import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-transparent rounded-md shadow-sm ' +
          'transition-colors duration-200 ease-in-out ' +
          'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ' +
          'disabled:opacity-50 disabled:pointer-events-none',

        secondary:
          'bg-secondary text-secondary-foreground border border-transparent rounded-md shadow-sm ' +
          'transition-colors duration-200 ease-in-out ' +
          'hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ' +
          'disabled:opacity-50 disabled:pointer-events-none',

        destructive:
          'bg-destructive text-destructive-foreground border border-transparent rounded-md shadow-sm ' +
          'transition-colors duration-200 ease-in-out ' +
          'hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 ' +
          'disabled:opacity-50 disabled:pointer-events-none',

        outline:
          'border border-input bg-transparent text-foreground rounded-md shadow-sm ' +
          'transition-colors duration-200 ease-in-out ' +
          'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ' +
          'disabled:opacity-50 disabled:pointer-events-none',
      },
    }
    ,
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
