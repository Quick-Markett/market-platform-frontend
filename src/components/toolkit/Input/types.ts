import type { VariantProps } from 'class-variance-authority'
import type { InputHTMLAttributes } from 'react'

import type { inputVariants } from './variance'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}
