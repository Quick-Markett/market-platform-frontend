'use client'

import { Container } from '@/components/toolkit/Container'
import { useAdminContext } from '@/contexts/AdminProvider'

import { ADMIN_TABS } from './data'
import type { AdminTabsProps } from './types'

export const AdminTabs: React.FC<AdminTabsProps> = () => {
  const { selectedTab } = useAdminContext()

  return (
    <Container
      as="section"
      className="flex w-full flex-col gap-6 lg:gap-12"
      data-cid="admin-tab"
      wrapperClassName="pt-12 lg:pt-20 relative z-40"
    >
      {ADMIN_TABS[selectedTab]}
    </Container>
  )
}
