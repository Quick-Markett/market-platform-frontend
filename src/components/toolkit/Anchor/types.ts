import type { PropsWithChildren } from 'react'

type AnchorVariantProp =
  | 'primary'
  | 'secondary'
  | 'primaryOutline'
  | 'danger'
  | 'custom'

type AnchorSizeProp = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren {
  anchorSize?: AnchorSizeProp
  anchorStyle?: 'inlineText' | 'button'
  className?: string
  href: string
  variant?: AnchorVariantProp
}
