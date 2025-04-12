import React, { createElement } from 'react'

import type { ContainerProps } from './types'

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  wrapperClassName,
  'data-cid': dataCid,
  disableSidePadding,
  container = 'fixed',
  as = 'div',
  ...props
}) => {
  const isValidElement = (tag): tag is keyof React.JSX.IntrinsicElements =>
    typeof tag === 'string'

  return createElement(
    isValidElement(as) ? as : 'div',
    {
      className: `scroll-mt-[100px] ${disableSidePadding ? '' : 'px-4'} ${wrapperClassName}`,
      'data-cid': dataCid,
      ...props
    },
    <div
      className={`${container === 'fixed' ? 'mx-auto max-w-7xl' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
