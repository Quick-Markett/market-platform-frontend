import { AdminContextProvider } from '@/contexts/AdminProvider'
import { instanceMotor } from '@/instances/instanceMotor'

import { CreateCategoryModal } from './admin/categorias/components/EditCategories/CreateCategoryModal'
import { Menu } from './admin/components/Menu'
import type { AdminScopeLayoutProps } from './types'

const AdminScopeLayout: React.FC<AdminScopeLayoutProps> = async ({
  params,
  children
}) => {
  const { slug } = await params

  const { data: market } = await instanceMotor.markets.getMarketBySlug({
    slug
  })

  return (
    <AdminContextProvider market={market}>
      <main className="relative min-h-[70vh] bg-neutral-50 pb-12 pt-8 lg:pb-16">
        <Menu />
        {children}
        <CreateCategoryModal />
      </main>
    </AdminContextProvider>
  )
}

export default AdminScopeLayout
