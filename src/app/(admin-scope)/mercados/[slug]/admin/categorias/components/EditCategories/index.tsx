'use client'

import { Button } from '@/components/toolkit/Button'
import { Container } from '@/components/toolkit/Container'
import { useGetAllCategories } from '@/hooks/swr/useGetAllCategories'
import { useUserSession } from '@/hooks/useUserSession'
import { handleOpenCreateCategoryModal } from '@/utils/customEvents/@handlers/categories/handleOpenCreateCategoryModal'

import { AvailableCategories } from './AvailableCategories'
import { NoResults } from './NoResults'

export const EditCategories: React.FC = () => {
  const { token } = useUserSession()

  const { allCategories, isLoading } = useGetAllCategories({
    payload: token
  })

  const hasResults = !isLoading && allCategories?.length > 0

  return (
    <Container
      as="section"
      className="!mx-0 flex w-full !max-w-full flex-col gap-6 lg:gap-12"
      data-cid="categories-admin-tab"
      wrapperClassName="relative z-40 w-full"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full gap-8 lg:justify-between">
          <h2 className="w-full flex-1 text-xl font-medium lg:text-2xl">
            Editar Categorias do Mercado
          </h2>
          <Button
            className="w-auto md:text-sm"
            onClick={() => handleOpenCreateCategoryModal()}
            variant="primary"
          >
            Adicionar mais categorias
          </Button>
        </div>
        {hasResults ? <AvailableCategories categories={allCategories} /> : null}
        {!isLoading && !hasResults && <NoResults />}
      </div>
    </Container>
  )
}
