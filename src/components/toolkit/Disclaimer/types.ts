import type { VariantProps } from 'class-variance-authority'

import type { disclaimerVariants } from './variance'

export interface DisclaimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof disclaimerVariants> {}
