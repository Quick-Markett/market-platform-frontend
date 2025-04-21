'use client'

import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { Modal } from '@/components/toolkit/Modal'
import { CATEGORY_DEFAULT_FIELDS } from '@/constants/forms/category-default-fields'
import { useGetAllCategories } from '@/hooks/swr/useGetAllCategories'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import type { Category } from '@/types/models/category'

export const RemoveCategoryModal: React.FC = () => {
  const { user } = useUserSession()
  const { mutate } = useGetAllCategories({ payload: user.token })

  const [categoryData, setCategoryData] = useState<Category>(
    CATEGORY_DEFAULT_FIELDS
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleRemoveCategory = async () => {
    try {
      const { status } = await axios.post('/api/categories/delete-category', {
        token: user.token,
        category_id: categoryData.id
      })

      if (status !== 200) {
        toast.error('Ops.. houve um erro ao remover a categoria!')
        return
      }

      await mutate().then(() => {
        toast.success('Categoria removida com sucesso!')
        setCategoryData(null)
        setIsModalOpen(false)
      })
    } catch (removeCategoryErr) {
      console.error(removeCategoryErr)
    }
  }

  useEventListener('remove-category', ({ action, data }) => {
    switch (action) {
      case 'open': {
        setIsModalOpen(true)
        setCategoryData(data)
        break
      }
      case 'close': {
        setIsModalOpen(false)
        setCategoryData(CATEGORY_DEFAULT_FIELDS)
        break
      }
    }
  })

  return (
    <Modal
      isOpen={isModalOpen && categoryData?.id !== 0}
      setIsOpen={setIsModalOpen}
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-md bg-white px-8 py-16 pb-12">
        <article className="flex w-full flex-col gap-2">
          <h2 className="text-left text-2xl font-semibold lg:text-3xl">
            Remover Categoria
          </h2>
          <p className="text-left text-sm text-neutral-500 lg:text-base">
            Tem certeza de que deseja remover essa categoria? Essa ação é
            irreversível, e você não poderá restaurar mais essa categoria caso
            seja removida.
          </p>
        </article>
        <Button
          className="min-w-full"
          onClick={() => handleRemoveCategory()}
          variant="primary"
        >
          Sim, desejo remover essa categoria
        </Button>
      </div>
    </Modal>
  )
}
