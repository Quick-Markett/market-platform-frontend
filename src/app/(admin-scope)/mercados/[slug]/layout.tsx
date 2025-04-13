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
      <main className="relative flex min-h-[70vh] gap-12 bg-neutral-50 pt-8 lg:pt-0 2xl:gap-16">
        <Menu />
        <section className="flex w-full justify-start py-4 pr-8 lg:py-8">
          {children}
        </section>
        <CreateCategoryModal />
      </main>
    </AdminContextProvider>
  )
}

export default AdminScopeLayout
