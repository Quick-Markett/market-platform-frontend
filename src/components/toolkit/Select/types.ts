import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'

import type { selectVariants } from './variance'

export interface SelectOption {
  label: ReactNode
  value: string
}

export interface SelectProps
  extends HTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  name: string
  options: SelectOption[]
  placeholder?: string
  value?: string
}
