'use client'

import { Button } from '@/components/toolkit/Button'
import { Container } from '@/components/toolkit/Container'
import { useGetAllProducts } from '@/hooks/swr/useGetAllProducts'
import { handleOpenCreateProductModal } from '@/utils/customEvents/@handlers/products/handleOpenCreateProductModal'

import { NoResults } from './NoResults'
import type { EditProductsProps } from './types'

export const EditProducts: React.FC<EditProductsProps> = async ({ slug }) => {
  const { allProducts, isLoading } = useGetAllProducts({ slug })

  const hasResults = !isLoading && allProducts?.length > 0

  return (
    <Container
      as="section"
      className="!mx-0 flex w-full !max-w-full flex-col gap-6 lg:gap-12"
      data-cid="products-admin-tab"
      wrapperClassName="relative z-40 w-full"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full gap-8 lg:justify-between">
          <h2 className="w-full flex-1 text-xl font-medium lg:text-2xl">
            Editar Categorias do Mercado
          </h2>
          <Button
            className="w-auto md:text-sm"
            onClick={() => handleOpenCreateProductModal()}
            variant="primary"
          >
            Adicionar mais categorias
          </Button>
        </div>
        {hasResults ? <p>Produtos</p> : null}
        {!isLoading && !hasResults && <NoResults />}
      </div>
    </Container>
  )
}
