'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { Modal } from '@/components/toolkit/Modal'
import { DEFAULT_PRODUCT_FIELDS } from '@/constants/forms/default-product-fields'
import { useAdminContext } from '@/contexts/AdminProvider'
import { useGetAllProducts } from '@/hooks/swr/useGetAllProducts'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import type { Product } from '@/types/models/product'

export const RemoveProductModal: React.FC = () => {
  const { user } = useUserSession()
  const { marketData } = useAdminContext()
  const { mutate } = useGetAllProducts({ slug: marketData.slug })

  const [productData, setProductData] = useState<Product>(
    DEFAULT_PRODUCT_FIELDS
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleRemoveProduct = async () => {
    try {
      setIsLoading(true)

      const { status } = await axios.delete(
        `/api/products/delete-product?token=${user.token}&product_id=${productData.id}`
      )

      if (status !== 200) {
        toast.error('Ops.. houve um erro ao remover o produto!')
        return
      }

      setIsLoading(false)

      await mutate().then(() => {
        toast.success('Produto removido com sucesso!')
        setProductData(DEFAULT_PRODUCT_FIELDS)
        setIsModalOpen(false)
      })
    } catch (removeProductErr) {
      console.error(removeProductErr)
    }
  }

  useEventListener('remove-product', ({ action, data }) => {
    switch (action) {
      case 'open': {
        setIsModalOpen(true)
        setProductData(data)
        break
      }
      case 'close': {
        setIsModalOpen(false)
        setProductData(DEFAULT_PRODUCT_FIELDS)
        break
      }
    }
  })

  return (
    <Modal
      isOpen={isModalOpen && productData?.id !== 0}
      setIsOpen={setIsModalOpen}
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-md bg-white px-8 py-16 pb-12">
        <article className="flex w-full flex-col gap-2">
          <h2 className="text-left text-2xl font-semibold lg:text-3xl">
            Remover Produto
          </h2>
          <p className="text-left text-sm text-neutral-500 lg:text-base">
            Tem certeza de que deseja remover esse produto? Essa ação é
            irreversível, e você não poderá restaurar mais esse produto caso
            seja removido.
          </p>
        </article>
        <Button
          className="min-w-full"
          isLoading={isLoading}
          onClick={() => handleRemoveProduct()}
          variant="primary"
        >
          Sim, desejo remover esse produto
        </Button>
      </div>
    </Modal>
  )
}
