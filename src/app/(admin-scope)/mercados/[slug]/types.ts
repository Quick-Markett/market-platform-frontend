import type { PropsWithChildren } from 'react'

export interface AdminScopeLayoutProps extends PropsWithChildren {
  params: Promise<{ slug: string }>
}
