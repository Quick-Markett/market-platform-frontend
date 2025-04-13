import { Container } from '@/components/toolkit/Container'
import { instanceMotor } from '@/instances/instanceMotor'
import { getUserSession } from '@/utils/auth/getUserSession'

import { AvailableCategories } from './AvailableCategories'
import { NoResults } from './NoResults'

export const EditCategories: React.FC = async () => {
  const { token } = await getUserSession()

  const { data: categories } =
    await instanceMotor.categories.getMarketCategories({ token })

  const hasResults = categories.length > 0

  return (
    <Container
      as="section"
      className="!mx-0 flex w-full flex-col gap-6 lg:gap-12"
      data-cid="admin-tab"
      wrapperClassName="relative z-40 w-full"
    >
      <div className="flex w-full flex-col gap-6">
        <h2 className="text-xl font-medium lg:text-2xl">
          Editar Categorias do Mercado
        </h2>
        <div className="flex flex-col gap-3 rounded-md border border-neutral-200 bg-white p-8">
          {hasResults ? (
            <AvailableCategories categories={categories} />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </Container>
  )
}
