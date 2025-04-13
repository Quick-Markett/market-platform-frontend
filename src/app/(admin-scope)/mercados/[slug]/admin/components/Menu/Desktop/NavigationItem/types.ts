import type { AdminTabs } from '@/contexts/AdminProvider/types'

export interface NavigationItemProps {
  copy: NavigationItem
}

export interface NavigationItem {
  items: {
    id: AdminTabs
    label: string
  }[]
  title: string
}
