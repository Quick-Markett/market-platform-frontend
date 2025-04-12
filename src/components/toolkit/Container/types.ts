import type { HTMLProps, PropsWithChildren } from 'react'
import type React from 'react'

type ClassName = HTMLProps<HTMLElement>['className']

export interface ContainerProps
  extends PropsWithChildren,
    HTMLProps<HTMLElement>,
    Omit<HTMLProps<HTMLElement>, 'as'> {
  as?: keyof React.JSX.IntrinsicElements
  className?: ClassName
  container?: 'fluid' | 'fixed'
  'data-cid': string
  disableSidePadding?: boolean
  wrapperClassName?: ClassName
}
