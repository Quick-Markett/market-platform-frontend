import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/dist/types'

export const buttonVariants = cva<ClassValue>(
  [
    'h-[2px]',
    'w-5',
    'my-[2px]',
    'rounded-full',
    'transition',
    'ease',
    'transform',
    'duration-default'
  ],
  {
    variants: {
      primary: ['bg-slate-50'],
      secondary: ['bg-slate-700']
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)
