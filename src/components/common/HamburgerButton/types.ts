import type { ButtonCopy } from '@/types/components/buttonCopy'

type Variants = 'primary' | 'secondary'

export interface Navigation {
  items: {
    title: string
    href: string
  }[]
  title?: string
}

export interface SideMenuProps {
  copy: {
    buttonLogin: ButtonCopy
    buttonSignUp: ButtonCopy
    buttonLogout: ButtonCopy
  }
  navigationList: Navigation[]
}

export interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  variant: Variants
}
