import type { VariantProps } from 'class-variance-authority'
import type { LabelHTMLAttributes } from 'react'

import type { labelVariants } from './variance'

export interface LabelFieldProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  id: string
  isRequired?: boolean
  label?: string
}
