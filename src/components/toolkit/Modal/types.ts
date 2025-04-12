import type { Dispatch, SetStateAction } from 'react'
import type React from 'react'

export interface ModalProps {
  children: React.JSX.Element
  dismissible?: boolean
  fullScreen?: boolean
  hideCloseButton?: boolean
  isOpen: boolean
  onClose?: () => void
  onlyMobileFullScreen?: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  zIndex?: string
}
